import type { ThermalGroup, ThermalRegistry } from "@labirthermal/core";
import { ThermalFileInstance, ThermalFileFailure } from "@labirthermal/core";
import type { PropertyValueMap } from "lit";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { HostReactiveProperties } from "./AbstractHierarchyController";
import { AbstractHierarchyController } from "./AbstractHierarchyController";
import type { FileController } from "./FileController";

type IHostProperties = {

    thermal: string | undefined,
    visible: string | undefined

}

/** 
 * An element that implements `FileLoadController` 
 * @see {@link FileLoadController}
 */
export interface IElementWithFileLoadController extends AbstractThermalElement, IHostProperties {
    fileController: FileController,
    fileLoadController: FileLoadController
}

/** 
 * When appended to an element with `FileController`, takes care of loading the file from the host attributes such as `thermal` and `visible`.
 * 
 * The element using `FileLoadController` needs to implement `IElementWithFileLoadController`
 * 
 * Public reactive properties of the host:
 * - `thermal`: The thermal file to be loaded.
 * - `visible`: The visibility setting for the thermal file.
 * 
 * @see {@link FileLoadController.HOST_PROPERTIES}
 * 
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@gmail.com>
 * */
export class FileLoadController extends AbstractHierarchyController<IElementWithFileLoadController> {

    private _UUID: string;

    public get UUID(): string {
        return this._UUID;
    }

    private get group(): ThermalGroup {
        return this.host.fileController.host.groupController.groupObject;
    }

    private get registry(): ThermalRegistry {
        return this.group.registry;
    }


    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        thermal: { type: String, reflect: true, attribute: "thermal" },
        visible: { type: String, reflect: true, attribute: "visible" }
    }

    constructor(
        host: IElementWithFileLoadController
    ) {
        super(host);
        this._UUID = host.UUID;
    }

    hostWillUpdateWatcher(value: PropertyValueMap<IElementWithFileLoadController>): void {
        if (value.has("thermal") && this.host.thermal) {
            this._load(this.host.thermal, this.host.visible);
        }
    }


    hostUpdatedWatcher(): void {
        // Do nothing for now
    }
    

    hostConnected(): void {
        // Do nothing for now
    }


    hostDisconnected(): void {
        // Do nothing for now
    }

    private async _load(
        lrc: string,
        visible: string | undefined
    ) {

        // If there is a file already, remove it from the group
        if (this.host.fileController.fileObject) {
            this.group.files.removeFile(this.host.fileController.fileObject);
        }

        this.host.fileController.startLoading();

        const result = this.registry.batch.request(
            lrc,
            visible,
            this.group,
            async (result) => {
                if (result instanceof ThermalFileInstance) {
                    this.host.fileController.receiveInstance(result);
                } else if (result instanceof ThermalFileFailure) {
                    this.host.fileController.receiveFailure(result);
                }
            }
        );

        return result;

    }




}