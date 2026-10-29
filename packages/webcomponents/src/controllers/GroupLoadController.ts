import type { ThermalGroup } from "@labirthermal/core";
import { ThermalFileFailure, ThermalFileReader } from "@labirthermal/core";
import type { PropertyValueMap } from "lit";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { HostReactiveProperties } from "./AbstractHierarchyController";
import { AbstractHierarchyController } from "./AbstractHierarchyController";
import type { GroupController } from "./GroupController";
import type { GroupListingController } from "./GroupListingController";

type IHostProperties = {
    /** 
     * The string of file requests for the `GroupLoadController`. Property name is `group-files`. Reactivity is defined by `GroupLoadController.HOST_PROPERTIES`. 
     * 
     * - Decoding of the attribute is handled internally by `GroupLoadController.decodeAttribute`.
     * - Encoding of the the attribute can be done using `GroupLoadController.encodeAttribute`.
     * 
     * How it works:
     * - The `group-files` attribute takes the encoded list of file requests.
     * - Whenever the `group-files` attribute changes, the `GroupLoadController` will load the files.
     * - Internal changes to the files ARE NOT synced to the `group-files` attribute. Meaning: any internal state changes will not be reflected to the attribute. But the attribute change will always trigger the reload.
     * 
     * Syntax:
     * - Records (files) are separated by `;`.
     * - Segments inside a record are separated by `|`.
     * - Key and value of a segment are separated by `~`.
     * - Keys: `thermal` (required), `visible` (optional), `label` (optional). Records without `thermal` are ignored.
     * 
     * @example Single thermal file
     * ```html
     * <thermal-group-app group-files="thermal~./record.lrc"></thermal-group-app>
     * ```
     * 
     * @example Two files, the first one with a visible image and a label, the second one with a label only
     * ```html
     * <thermal-group-app
     *   group-files="thermal~./t1.lrc|visible~./v1.jpg|label~Pre-test;thermal~./t2.lrc|label~Post-test">
     * </thermal-group-app>
     * ```
     * 
     * @example Setting the property programmatically
     * ```ts
     * element.filesString = "thermal~https://example.com/a.lrc|label~Motor;thermal~https://example.com/b.lrc";
     * ```
     */
    filesString?: string;
};

/** 
 * An element with `GroupLoadController` needs to implement the host properties of a `GroupController`. To implement this controller properly, the class needs to have the following:
 * @example 
 * ```ts
 * class MyClass extends AbstractThermalElement implements IElementWithGroupLoadController {
 * 
 *     filesString?: string;
 * 
 *     groupController: GroupController; // Created here or inherited from parent context
 *     groupListingController: GroupListingController; // Created here or inherited from parent context
 *     groupLoadController = new GroupLoadController(this);
 * 
 * 
 * }
 * ```
 */
export interface IElementWithGroupLoadController extends AbstractThermalElement, IHostProperties {
    groupController: GroupController;
    groupListingController: GroupListingController;
    groupLoadController: GroupLoadController;
}

/** One file request - internal object for the purpose of `GroupLoadController` */
type GroupLoaderFileRequest = {
    thermal: string,
    visible?: string,
    label?: string
}


/**
 * Reactive controller for loading thermal and visible files into a {@link ThermalGroup}
 * driven by the host element's `group-files` attribute.
 *
 * ### Functionality & Data Flow
 * - **Declarative & Reactive:** Watches the host property `filesString` (reflected from `group-files`).
 *   Whenever the attribute or property value changes, this controller parses the request string and loads
 *   all requested files through the registry's `FilesService`.
 * - **Unidirectional Synchronization:** Changes to the `group-files` attribute/property are propagated
 *   inward to the group's internal files collection. Subsequent runtime changes to the group (such as files
 *   added via drag-and-drop, deleted via UI, or reordered) are intentionally **NOT** reflected back to
 *   the attribute, preventing unwanted update loops.
 * - **Clearing on Empty:** If the attribute is removed or set to empty, all instances are removed from the group.
 * - **Backup & Listing Integration:** Automatically backs up file readers into the host's
 *   {@link GroupListingController} and restores them so that the group listing stays synchronized.
 *
 * ### Attribute Format (`group-files`)
 * The attribute encodes an array of file requests into a compact delimited string without requiring JSON:
 * - Records are delimited by `;` ({@link GroupLoadController.FILE_RECORD_SEPARATOR}).
 * - Key-value segments inside each record are delimited by `|` ({@link GroupLoadController.FILE_SEGMENT_SEPAROATOR}).
 * - Keys and values are separated by `~` ({@link GroupLoadController.FILE_COMPONENT_SEPAROATOR}).
 * - Recognized keys:
 *   - `thermal` (required): URL of the thermal file (`.lrc`).
 *   - `visible` (optional): URL of the corresponding visible spectrum image.
 *   - `label` (optional): Human-readable label assigned to the file instance.
 *
 * @example Format syntax
 * ```text
 * thermal~<url>[|visible~<url>][|label~<text>];thermal~<url>[|label~<text>]
 * ```
 *
 * @example Single file
 * ```html
 * <thermal-group-app group-files="thermal~./record.lrc|label~Engine"></thermal-group-app>
 * ```
 *
 * @example Multiple files with visual pairs and labels
 * ```html
 * <thermal-group-app
 *   group-files="thermal~./t1.lrc|visible~./v1.jpg|label~Pre-test;thermal~./t2.lrc|label~Post-test">
 * </thermal-group-app>
 * ```
 *
 * @example Programmatic encoding and decoding
 * ```ts
 * // Decode an attribute string to structured requests:
 * const requests = GroupLoadController.decodeAttribute("thermal~file.lrc|label~Motor");
 *
 * // Encode structured requests back into an attribute string:
 * const attrValue = GroupLoadController.encodeFileRequests([
 *   { thermal: "file1.lrc", visible: "file1.png", label: "Front" },
 *   { thermal: "file2.lrc", label: "Rear" }
 * ]);
 * host.setAttribute("group-files", attrValue!);
 * ```
 *
 * @see {@link IElementWithGroupLoadController} for host requirements.
 * @see {@link GroupListingController} for how the loaded files are displayed and ordered.
 */
export class GroupLoadController extends AbstractHierarchyController<IElementWithGroupLoadController> {
    
    private _UUID: string;

    public get UUID(): string {
        return this._UUID;
    }

    /** Necessary reactive properties of the host element needed by `GroupLoadController` */
    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        filesString: { type: String, reflect: true, attribute: "group-files" }
    }

    public static readonly FILE_RECORD_SEPARATOR = ";";
    public static readonly FILE_SEGMENT_SEPAROATOR = "|";
    public static readonly FILE_COMPONENT_SEPAROATOR = "~";
    public static readonly FILE_THERMAL_KEY = "thermal";
    public static readonly FILE_VISIBLE_KEY = "visible";
    public static readonly FILE_LABEL_KEY = "label";
    public static readonly FILE_NOTE_KEY = "note";

    private get group(): ThermalGroup {
        return this.host.groupController.groupObject;
    }

    public errors: string[] = [];

    /** Makes sure the value is either a non-empty string or undefined. */
    private static stringOrUndefined(value?: string): string | undefined {
        // if the value is a string, trim it
        if (typeof value === "string") {
            value = value.trim();
        }
        return value ?? undefined;
    }

    /** Encodes one attribute to a string segment. */
    private static encodeAttribute(key: string, value?: string): string {
        return `${key}${this.FILE_COMPONENT_SEPAROATOR}${value ?? ""}`;
    }

    /** Encodes a file request into a string suitable for the fileString attribute (publically known as `group-files`) */
    private static encodeFileRequest(
        thermalUrl: string,
        visibleUrl?: string,
        label?: string
    ): string | undefined {

        const thermal = this.stringOrUndefined(thermalUrl);
        visibleUrl = this.stringOrUndefined(visibleUrl);
        label = this.stringOrUndefined(label);

        if (!thermal) {
            return undefined;
        }

        if ( !visibleUrl || !label ) {
            return this.encodeAttribute(this.FILE_THERMAL_KEY, thermalUrl);
        }

        let value = this.encodeAttribute(this.FILE_THERMAL_KEY, thermalUrl);

        if (visibleUrl) {
            value += this.FILE_SEGMENT_SEPAROATOR + this.encodeAttribute(this.FILE_VISIBLE_KEY, visibleUrl);
        }
        if (label) {
            value += this.FILE_SEGMENT_SEPAROATOR + this.encodeAttribute(this.FILE_LABEL_KEY, label);
        }

        return value;

    }

    /** Encode multiple files into a string suitable for the public attribute `group-files` of a webcomponent with `GroupLoadController` */
    public encodeFileRequests(
        requests: GroupLoaderFileRequest[]
    ): string | undefined {
        if (!requests || requests.length === 0) {
            return undefined;
        }

        return requests
            .map(request => GroupLoadController.encodeFileRequest(request.thermal, request.visible, request.label))
            .filter(encoded => encoded !== undefined)
            .join(GroupLoadController.FILE_RECORD_SEPARATOR) || undefined;
    }

    /** Takes a string and convert it into an array of `GroupLoaderFileRequest` that can be used by `GroupLoadController._load( requests )` */
    public static decodeAttribute(
        value: string
    ): GroupLoaderFileRequest[] {

        return value
            .split(GroupLoadController.FILE_RECORD_SEPARATOR)
            .map( record => {

                let thermal: string | undefined;
                let visible: string | undefined;
                let label: string | undefined;

                record
                    .trim()
                    .split(GroupLoadController.FILE_SEGMENT_SEPAROATOR)
                    .forEach(segment => {

                        let [key, value] = segment.split(GroupLoadController.FILE_COMPONENT_SEPAROATOR);
                        key = key.trim();
                        value = value?.trim();

                        switch(key) {
                            case GroupLoadController.FILE_THERMAL_KEY:
                                thermal = value;
                                break;
                            case GroupLoadController.FILE_VISIBLE_KEY:
                                visible = value;
                                break;
                            case GroupLoadController.FILE_LABEL_KEY:
                                label = value;
                                break;
                        }

                    });

                if ( !thermal ) {
                    return undefined;
                }

                return { thermal, visible, label };

            } )
            .filter(item => item !== undefined) as GroupLoaderFileRequest[];

    }

    

    constructor(
        host: IElementWithGroupLoadController
    ) {
        super(host);

        this._UUID = host.UUID + "_group-load-controller";

    }


    hostConnected(): void {
        // this._loadFromAttributes();
    }

    hostDisconnected(): void {
        // Do nothing for now
    }

    hostWillUpdateWatcher(value: PropertyValueMap<IElementWithGroupLoadController>): void {
        if (value.has("filesString")) {
            this._loadFromAttributes();
        }
    }

    hostUpdatedWatcher(): void {
        // Do nothing for now
    }

    private _loadFromAttributes(): void {

        const requests = this.host.filesString ? GroupLoadController.decodeAttribute(this.host.filesString) : [];
        this._load( requests );
        
    }



    
    /** Loads the files  specified in the `requests` array. */
    private async _load(
        requests: GroupLoaderFileRequest[]
    ) {

        // If no files are requested, clear the group
        if ( requests.length === 0 ) {
            this.group.files.removeAllInstances();
            return;
        }

        const registry = this.group.registry;
        const service = registry.service;
        this.errors = [];
        registry.loading.markAsLoading();

        try {
            const results = await Promise.all(requests.map(async request => ({
                result: await service.loadFile(request.thermal, request.visible),
                label: request.label
            })));

            for (const item of results) {
                if (item.result instanceof ThermalFileFailure) {
                    this.errors.push(`${item.result.thermalUrl}: ${item.result.message}`);
                }
            }

            const filteredResults = results.filter(
                (item): item is { result: ThermalFileReader; label: string | undefined } =>
                    item.result instanceof ThermalFileReader
            );

            this.host.groupListingController.backupReaders(filteredResults.map(item => item.result));
            await this.host.groupListingController.restoreTheEntireBackup();

            for (const file of this.group.files.value) {
                const matchingResult = filteredResults.find(item => item.result === file.reader);
                if (matchingResult?.label !== undefined) {
                    file.setLabel(matchingResult.label);
                }
            }

            await registry.postLoadedProcessing();
            registry.range.applyMinmax();
        } catch (error) {
            this.errors.push(error instanceof Error ? error.message : String(error));
        } finally {
            registry.loading.markAsLoaded();
            this.host.requestUpdate();
        }

    }


}