import type { ThermalGroup, ThermalRangeOrUndefined, ThermalRegistry } from "@labirthermal/core";
import { CallbacksManager } from "@labirthermal/core";
import { ContextProvider, createContext } from "@lit/context";
import type { PropertyValues } from "lit";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { HostReactiveProperties } from "./AbstractHierarchyController";
import { AbstractHierarchyController, INTERNAL_STATE_DECLARATION } from "./AbstractHierarchyController";
import type { ManagerController } from "./ManagerController";

type IHostProperties = {

    /** This object is obligatory and it comes either from:
     * - directly from the host's `ManagerController` instance - in case this `RegistryController` is on the same element as the `ManagerController`
     * - from the `managerControllerContext` - for elements that are nested lower in the hierarchy, under an element with `ManagerController`
     */
    managerController: ManagerController;

    registrySlug: string;

    registryObject: ThermalRegistry;

    registryController: RegistryController;

    opacity: number;

    min?: number;
    max?: number;

    from?: number;
    to?: number;

    highlight?: ThermalRangeOrUndefined;

    loading: boolean;

}

export interface IElementWithRegistryController extends AbstractThermalElement, IHostProperties { }

/** Exposes the current `RegistryController`. This is very important. */
export const registryControllerContext = createContext<RegistryController>("registry-controller-context");

/** Exposes the current `ThermalRegistry` object from the `RegistryController`. */
export const registryObjectContext = createContext<ThermalRegistry>("registry-object-context");

/** Exposes the current opacity value context from the `RegistryController`. */
export const registryOpacityContext = createContext<number>("registry-opacity");

/** Exposes the current range from value from the `RegistryController`. */
export const registryRangeFromContext = createContext<undefined | number>("registry-range-from");

/** Exposes the current range to value from the `RegistryController`. */
export const registryRangeToContext = createContext<undefined | number>("registry-range-to");

/** Exposes the current registry loading value from the `RegistryController`. */
export const registryLoadingContext = createContext<boolean>("registry-loading");

/** Exposes the current registry min context from the `RegistryController` */
export const registryMinContext = createContext<number | undefined>("registry-min");

/** Exposes the current registry max value from the `RegistryController` */
export const registryMaxContext = createContext<number | undefined>("registry-max");

/**
 * Highlight is an optional range of temperatures highlighted graphically on the thermal scale. It is used to indicate for example:
 * - what is the range of a file within min/max of the entire group
 * - what is the range of an analysis within the min/max of a file
 * - what is the min/max of a group of files within multiple groups of files
 *
 * This context is exposed by a registry provider. It need to be consumed manually.
 */

export const registryHighlightContext = createContext<ThermalRangeOrUndefined>("registry-highlight");


export class RegistryController extends AbstractHierarchyController<IElementWithRegistryController> {

    private _UUID: string;

    public get UUID(): string {
        return this._UUID;
    }

    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        managerController: INTERNAL_STATE_DECLARATION,
        registrySlug: { type: String, reflect: false, attribute: "registry-slug" },
        registryObject: INTERNAL_STATE_DECLARATION,
        registryController: INTERNAL_STATE_DECLARATION,
        opacity: { type: Number, reflect: true, attribute: "opacity" },
        min: { type: Number, reflect: false, state: true },
        max: { type: Number, reflect: false, state: true },
        from: { type: Number, reflect: true, attribute: "from" },
        to: { type: Number, reflect: true, attribute: "to" },
        loading: { type: Boolean, attribute: "is-loading", reflect: true },
        highlight: { type: Object, reflect: false, state: true },
    }

    public get registryObject(): ThermalRegistry {
        return this.host.registryObject;
    }

    /** Callbacks called upon the internal registry object creation */
    public readonly onInternalObject = new CallbacksManager< (manager: ThermalRegistry) => void >();


    // Accessors to the host attributes

    public get slug(): string { return this.host.registrySlug; }
    public get opacity(): number { return this.host.opacity; }
    public get min(): number | undefined { return this.host.min; }
    public get max(): number | undefined { return this.host.max; }
    public get from(): number | undefined { return this.host.from; }
    public get to(): number | undefined { return this.host.to; }
    public get loading(): boolean { return this.host.loading; }



    // Context providers

    private readonly registryControllerContextProvider: ContextProvider<typeof registryControllerContext, IElementWithRegistryController>;

    private readonly registryObjectContextProvider: ContextProvider<typeof registryObjectContext, IElementWithRegistryController>;

    private readonly opacityContextProvider: ContextProvider<typeof registryOpacityContext, IElementWithRegistryController>;

    private readonly minContextProvider: ContextProvider<typeof registryMinContext, IElementWithRegistryController>;

    private readonly maxContextProvider: ContextProvider<typeof registryMaxContext, IElementWithRegistryController>;

    private readonly fromContextProvider: ContextProvider<typeof registryRangeFromContext, IElementWithRegistryController>;

    private readonly toContextProvider: ContextProvider<typeof registryRangeToContext, IElementWithRegistryController>;

    private readonly loadingContextProvider: ContextProvider<typeof registryLoadingContext, IElementWithRegistryController>;

    private readonly highlightContextProvider: ContextProvider<typeof registryHighlightContext, IElementWithRegistryController>;



    constructor(host: IElementWithRegistryController) {
        super(host);

        // host.addController(this);

        this._UUID = host.UUID + "_registry-controller";

        // Create the manager context provider for this registry controller
        this.registryControllerContextProvider = new ContextProvider(
            this.host,
            {
                context: registryControllerContext,
                initialValue: this
            }
        );


        // Create the registry core object
        this.registryObjectContextProvider = new ContextProvider(
            this.host,
            { context: registryObjectContext }
        );


        // Create the opacity context provider
        this.opacityContextProvider = new ContextProvider(
            this.host,
            { context: registryOpacityContext }
        );

        // Create the min context provider
        this.minContextProvider = new ContextProvider(
            this.host,
            { context: registryMinContext }
        );

        // Create the max context provider
        this.maxContextProvider = new ContextProvider(
            this.host,
            { context: registryMaxContext }
        );

        // Create the range from context provider
        this.fromContextProvider = new ContextProvider(
            this.host,
            { context: registryRangeFromContext }
        );

        // Create the range to context provider
        this.toContextProvider = new ContextProvider(
            this.host,
            { context: registryRangeToContext }
        );

        // Create the loading context provider
        this.loadingContextProvider = new ContextProvider(
            this.host,
            { context: registryLoadingContext }
        );

        // Create the highlight context provider
        this.highlightContextProvider = new ContextProvider(
            this.host,
            { context: registryHighlightContext }
        );


    }



    hostConnected(): void {

        const slug = this._getDefaultSlugFromHost("registry-slug");
        this.host.registrySlug = slug;

        // Create the registry object for this element and store it in the host's registryObject property
        this.host.registryObject = this.host.managerController.createRegistry(slug);
        this.registryObjectContextProvider.setValue(this.host.registryObject);

        this.onInternalObject.call(this.host.registryObject);


        // Opacity

        // Set the opacity default value
        this.setOpacity(this.host.opacity ?? 1);

        // Add the opacity listener
        this.registryObject.opacity.addListener(this.UUID, this.setOpacity.bind(this));


        // Minmax

        // Add the minmax listener
        this.registryObject.minmax.addListener(
            this.UUID,
            value => {

                if (value === undefined) {
                    this.host.min = undefined;
                    this.host.max = undefined;
                    this.minContextProvider.setValue(undefined);
                    this.maxContextProvider.setValue(undefined);
                } else {
                    if (value.min !== this.host.min) { this.host.min = value.min; }
                    if (value.max !== this.host.max) { this.host.max = value.max; }
                    if (value.min !== this.minContextProvider.value) { this.minContextProvider.setValue(value.min); }
                    if (value.max !== this.maxContextProvider.value) { this.maxContextProvider.setValue(value.max); }
                }

            }
        );



        // Range

        // Add the range listener
        this.registryObject.range.addListener(
            this.UUID,
            this._rangeListener.bind(this)
        );


        // Loading
        this.registryObject.loading.addListener(this.UUID, this._loadingListener.bind(this));


    }

    hostDisconnected(): void {

        this.registryObject.opacity.removeListener(this.UUID);
        this.registryObject.minmax.removeListener(this.UUID);
        this.registryObject.range.removeListener(this.UUID);
        this.registryObject.loading.removeListener(this.UUID);

    }

    hostWillUpdateWatcher(
        value: PropertyValues<IElementWithRegistryController>
    ): void {

        if (value.has("opacity")) {
            this.setOpacity(this.host.opacity ?? 1);
        }

        if (value.has("from") || value.has("to")) {

            if (
                this.host.from === undefined
                || this.host.to === undefined
            ) {
                this._clearRange();
            } else {
                this.setRange(this.host.from, this.host.to);
            }

        }
        
    }

    hostUpdatedWatcher(): void {
        // Do nothing
    }

    public addOrGetGroup(
        slug: string
    ): ThermalGroup {
        return this.registryObject.groups.addOrGetGroup(slug);
    }

    public removeGroup(
        group: ThermalGroup
    ): void {
        this.registryObject.groups.removeGroup(group.id);
    }


    /**
     * This is the recommended way to set the opacity. Calling this method will 
     * - update the context provider element's attribute `opacity`
     * - set the internal value to `@labirthermal/core`
     * - update the context provider
     */
    setOpacity(
        value: number
    ): void {

        const safeValue = isNaN(value) ? 1 : Math.max(0, Math.min(1, value));

        // Set the element attribute if different from the current value
        if (this.host.opacity !== safeValue) {
            this.host.opacity = safeValue;
        }

        // Set the inner value if different from the currrent one
        if (this.registryObject && this.registryObject.opacity.value !== safeValue) {
            this.registryObject.opacity.imposeOpacity(safeValue);
        }

        // Set the value to the context if different from the current value
        if (this.opacityContextProvider.value !== safeValue) {
            this.opacityContextProvider.setValue(safeValue);
        }

    }

    setRange(
        from: number,
        to: number
    ): void {

        // Set the range to the registry object if it has changed
        if (
            this.registryObject.range.value === undefined
            || this.registryObject.range.value.from !== from
            || this.registryObject.range.value.to !== to
        ) {
            this.registryObject.range.imposeRange({ from, to });
        }

        // Now the value should be changed, so impose its current internal value to attribute

        const currentInternalRange = this.registryObject.range.value;

        if (currentInternalRange === undefined) {
            this._clearRange();
        } else {
            this.host.from = currentInternalRange.from;
            this.host.to = currentInternalRange.to;
            this.fromContextProvider.setValue(currentInternalRange.from);
            this.toContextProvider.setValue(currentInternalRange.to);
        }

    }

    setRangeFull() {
        if (this.host.min !== undefined && this.host.max !== undefined) {
            this.setRange(this.host.min, this.host.max);
        }
    }

    private _rangeListener(
        value: ThermalRangeOrUndefined
    ) {
        if (value !== undefined) {
            this.setRange(value.from, value.to);
        } else {
            this._clearRange();
        }
    }

    private _clearRange() {
        this.host.from = undefined;
        this.host.to = undefined;
        this.fromContextProvider.setValue(undefined);
        this.toContextProvider.setValue(undefined);
    }

    private _loadingListener(
        value: boolean
    ) {

        if (value !== this.host.loading) {
            this.host.loading = value;
        }

        if (value !== this.loadingContextProvider.value) {
            this.loadingContextProvider.setValue(value);
        }

    }

    public setHighlight(value: ThermalRangeOrUndefined): void {
        if (this.highlightContextProvider.value !== value) {
            this.highlightContextProvider.setValue(value);
        }
    }



}



