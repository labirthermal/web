import type { ThermalGroup } from "@labirthermal/core";
import { CallbacksManager } from "@labirthermal/core";
import { ContextProvider, createContext } from "@lit/context";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { HostReactiveProperties } from "./AbstractHierarchyController";
import { AbstractHierarchyController, INTERNAL_STATE_DECLARATION } from "./AbstractHierarchyController";
import type { ManagerController } from "./ManagerController";
import type { RegistryController } from "./RegistryController";

type IHostProperties = {

    managerController: ManagerController;

    registryController: RegistryController;

    groupSlug: string;

    groupObject: ThermalGroup;

    groupController: GroupController;

    autoclearGroup: boolean;

}
/**
 * Host properties required by the `GroupController`.
 * 
 * @see {@link GroupController}
 * @see {@link GroupController.HOST_PROPERTIES}
 */
export interface IElementWithGroupController extends IHostProperties, AbstractThermalElement {}

/**
 * Exposes the `GroupController` instance to the `AbstractGroupConsumer` elements.
 * @see {@link GroupController}
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export const groupControllerContext = createContext<GroupController>("group-controller-context");

/**
 * Exposes the internal `ThermalGroup` object from the `GroupController`.
 * 
 * @see {@link GroupController}
 * @see {@link ThermalGroup}
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export const groupObjectContext = createContext<ThermalGroup>("group-object-context");

export class GroupController extends AbstractHierarchyController<IElementWithGroupController> {
    

    private _UUID: string;

    public get UUID(): string {
        return this._UUID;
    }

    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        managerController: INTERNAL_STATE_DECLARATION,
        registryController: INTERNAL_STATE_DECLARATION,
        groupSlug: { type: String, reflect: false, attribute: "group-slug" },
        groupObject: INTERNAL_STATE_DECLARATION,
        autoclearGroup: { type: Boolean, reflect: true, attribute: "autoclear-group"},
        groupController: INTERNAL_STATE_DECLARATION
    }

    public get groupObject(): ThermalGroup {
        return this.host.groupObject;
    }

    public get registryController(): RegistryController { return this.host.registryController; }

    // Accessors to the host attributes
    public get slug(): string { return this.host.groupSlug; }
    public get autoclearGroup(): boolean { return this.host.autoclearGroup; }

    // Context providers

    private groupControllerContextProvider: ContextProvider<typeof groupControllerContext, IElementWithGroupController>;

    private groupObjectContextProvider: ContextProvider<typeof groupObjectContext, IElementWithGroupController>;

    public readonly onInternalObject = new CallbacksManager< (manager: ThermalGroup) => void >();


    constructor(
        host: IElementWithGroupController
    ) {
        super(host);
        
        this._UUID = host.UUID + "_group-controller";

        this.groupControllerContextProvider = new ContextProvider(
            this.host, 
            { context:  groupControllerContext, initialValue: this }
        );

        this.groupObjectContextProvider = new ContextProvider(
            this.host,
            { context: groupObjectContext }
        );

    }

    hostConnected() {

        const slug = this._getDefaultSlugFromHost( "group-slug" );
        this.host.groupSlug = slug;

        this.host.groupObject = this.host.registryController.addOrGetGroup(slug);
        this.onInternalObject.call(this.host.groupObject);
        
        this.groupObjectContextProvider.setValue(this.host.groupObject);

    }

    hostDisconnected() {

        if ( this.autoclearGroup && this.host.groupObject ) {
            this.host.registryController.removeGroup(this.host.groupObject);
        }

    }

    hostWillUpdateWatcher(): void {
        // Do nothing
    }

    hostUpdatedWatcher(): void {
        // Do nothing
    }




}
