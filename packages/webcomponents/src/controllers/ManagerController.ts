import type { AvailableThermalPalette, ThermalManager, ThermalPaletteType, ThermalRegistry, ThermalTool } from "@labirthermal/core";
import { CallbacksManager, ThermalPalettes, ThermalUnit } from "@labirthermal/core";
import { ContextProvider, createContext } from "@lit/context";
import type { PropertyValues } from "lit";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import { createOrGetManager } from "../hierarchy/providers/getters";
import { paletteConverter } from "../utils/converters/paletteConverter";
import { parseThermalUnit, unitConverter } from "../utils/converters/unitConverter";
import type { HostReactiveProperties } from "./AbstractHierarchyController";
import { AbstractHierarchyController, INTERNAL_STATE_DECLARATION } from "./AbstractHierarchyController";
import type { ThermalUnitDefinition } from "@labirthermal/core";

interface IHostProperties {

    /** Element property for the manager slug. It is absolutely required. Recommended property name: manager-slug */
    managerSlug: string;

    /** Core manager object. Exposed in managerContext. */
    managerObject: ThermalManager;

    /** Manager controoller exposed as context. Recommended property */
    managerController: ManagerController;

    /** Element property for thermal palette. Converted internally to a rich value and exposed in managerPaletteContext.Recommended property name: palette */
    palette: AvailableThermalPalette;

    /** Advances palettes property from the host element. Exposed as managerAdvancedPalettesContext. Recommended property: advanced-palettes */
    advancedPalettes: boolean;

    /** Smooth thermograms flag accessed directly from the host element. Recommended property name: smooth-thermograms */
    smoothThermograms: boolean;

    /** Smooth graph flag accessed directly from the host element. Recommended property name: smooth-graph */
    smoothGraph: boolean;

    /** Tool property accessed from the host element. Exposed in the toolContext. Recommended property name: tool */
    tool: keyof ThermalManager["tool"]["tools"];

    /** 
     * Thermal unit used for displaying values and reading user inputs in the webcomponents. Exposed in managerUnitContext. Recommended property name: unit
     * 
     * `undefined` means the host did not set it: a shared manager then keeps its current unit, a new one uses Celsius.
     * All internal values (core, contexts) stay in Celsius regardless of this unit.
     */
    unit: ThermalUnit | undefined

}

export interface IElementWithManagerController extends AbstractThermalElement, IHostProperties {}

export type ManagerPaletteContextType = {
    key: AvailableThermalPalette;
    data: ThermalPaletteType;
};

/** Exposes the main manager controller with all its setters and direct access to the host element values. */
export const managerControllerContext = createContext<ManagerController>("manager-controller-context");

export const managerContext = createContext<ThermalManager>("manager-instance");
export const managerPaletteContext = createContext<ManagerPaletteContextType>("manager-palette-context");
export const managerAdvancedPalettesContext = createContext<boolean>("manager-advanced-palettes-context");
export const managerSmoothContext = createContext<boolean>("manager-smooth-context");
export const managerGraphFunctionContext = createContext<boolean>("manager-graph-function-context");
export const managerToolContext = createContext<ThermalTool>("manager-tool-context");
export const managerInteractiveAnalysesContext = createContext<boolean>("manager-interactive-analysis-context");
export const managerUnitContext = createContext<ThermalUnit>( "manager-unit-context" );

export class ManagerController extends AbstractHierarchyController<IElementWithManagerController> {

    private _UUID: string;

    private lastAppliedPalette?: AvailableThermalPalette;

    public get UUID(): string {
        return this._UUID;
    }

    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        managerSlug: { type: String, reflect: false, attribute: "manager-slug" },
        managerObject: INTERNAL_STATE_DECLARATION,
        managerController: INTERNAL_STATE_DECLARATION,
        palette: { type: String, reflect: true, attribute: "palette", converter: paletteConverter },
        advancedPalettes: { reflect: true, attribute: "advanced-palettes", type: Boolean },
        smoothThermograms: { reflect: true, attribute: "smooth-thermograms", type: Boolean},
        smoothGraph: { reflect: true, attribute: "smooth-graph", type: Boolean },
        tool: { type: String, reflect: true, attribute: "tool"},
        unit: { type: String, reflect: true, attribute: "unit", converter: unitConverter }
    }



    /** Accessor to the manageer slug from the host */
    public get slug(): string { return this.host.managerSlug; }


    private readonly managerControllerContextProvider: ContextProvider<typeof managerControllerContext, IElementWithManagerController>;


    /** Accessor to the manager object from the host */
    public get managerObject(): ThermalManager { return this.host.managerObject; }

    private readonly managerObjectContextPtovider: ContextProvider<typeof managerContext, IElementWithManagerController>;


    /** Palette property value accessed from the host element */
    public get palette(): AvailableThermalPalette { return this.host.palette; }

    private readonly paletteContextProvider: ContextProvider<typeof managerPaletteContext, IElementWithManagerController>;


    public readonly advancedPalettesContextProvider: ContextProvider<typeof managerAdvancedPalettesContext, IElementWithManagerController>;

    /** Listen to the advanced palettes change - the callback is here because this attribute is not managed by the `@labirthermal/core`. */
    public readonly onAdvancedPalettesChange = new CallbacksManager< (advancedPalettes: boolean) => void >();


    /** Smooth thermograms flag accessed from the host element */
    public get smoothThermograms(): boolean { return this.host.smoothThermograms; }

    private readonly smoothThermogramsContextProvider: ContextProvider<typeof managerSmoothContext, IElementWithManagerController>;


    /** Tool property accessed from the host element */
    public get tool(): keyof ThermalManager["tool"]["tools"] { return this.host.tool; }

    public get toolObject(): ThermalTool { return this.managerObject.tool.value; }

    private readonly toolContextProvider: ContextProvider<typeof managerToolContext, IElementWithManagerController>;


    /** Graph smoothing flag accessed from the host element */
    public get smoothGraph(): boolean { return this.host.smoothGraph; }

    private readonly smoothGraphContextProvider: ContextProvider<typeof managerGraphFunctionContext, IElementWithManagerController>;

    private readonly unitContextProvider: ContextProvider< typeof managerUnitContext, IElementWithManagerController>;

    /** Callbacks called upon the internal registry object creation */
    public readonly onInternalObject = new CallbacksManager< (manager: ThermalManager) => void >();

    constructor(host: IElementWithManagerController) {

        super(host);

        this._UUID = host.UUID + "_manager-controller";

        // Create the manager controller context provider
        this.managerControllerContextProvider = new ContextProvider(
            this.host,
            {
                context: managerControllerContext,
                initialValue: this
            }
        )

        // Create the manager object context provider
        this.managerObjectContextPtovider = new ContextProvider(
            this.host,
            { context: managerContext }
        );

        // Create the palette context provider
        this.paletteContextProvider = new ContextProvider(
            this.host,
            { context: managerPaletteContext }
        );

        // Create the advanced palettes context provider
        this.advancedPalettesContextProvider = new ContextProvider(
            this.host,
            { context: managerAdvancedPalettesContext }
        );

        // Create the smooth thermograms context provider
        this.smoothThermogramsContextProvider = new ContextProvider(
            this.host,
            { context: managerSmoothContext }
        );

        // Create the tool context provider
        this.toolContextProvider = new ContextProvider(
            this.host,
            { context: managerToolContext }
        );

        // Create the smooth graph context provider
        this.smoothGraphContextProvider = new ContextProvider(
            this.host,
            { context: managerGraphFunctionContext }
        );

        this.unitContextProvider = new ContextProvider(
            this.host,
            { context: managerUnitContext }
        )

        

    }


    hostConnected(): void {

        // Make sure the slug is set for the host element
        const slug = this._getDefaultSlugFromHost("manager-slug");
        this.host.managerSlug = slug;

        // A manager with the same slug may already exist (shared by more providers)
        const managerExisted = window.Thermal.managers.has(slug);

        // A missing palette, or an unchanged palette on reconnection, adopts the shared manager's value.
        const requestedUnit = parseThermalUnit(this.host.unit);
        const requestedPalette = this.host.palette === undefined
            || (managerExisted && this.host.palette === this.lastAppliedPalette)
            ? undefined
            : paletteConverter.fromAttribute(this.host.palette);

        // Create or get the manager object and set it in the context provider.
        // A new manager is created directly with the host's values, so it never exists with defaults.
        this.host.managerObject = createOrGetManager(slug, {
            unit: requestedUnit ?? ThermalUnit.C,
            palette: requestedPalette
        });
        this.managerObjectContextPtovider.setValue(this.host.managerObject);

        this.onInternalObject.call(this.host.managerObject);


        // Unit

        // Pick the initial unit:
        // - the unit requested by the host always wins
        // - without it, a shared manager keeps its current unit (another provider may have set it)
        // - otherwise Celsius is the default
        const initialUnit = requestedUnit
            ?? (managerExisted ? this.managerObject.unit.value : ThermalUnit.C);

        // Impose the unit to the host, the context and the core manager
        this.setUnit(initialUnit);

        // Follow the unit changes made in the core manager (e.g. by another provider of the same manager)
        this.managerObject.unit.addListener(this.UUID, this.setUnit.bind(this));




        // Palette

        // An explicit request wins; otherwise keep the existing manager's palette or its default.
        this.setPalette(requestedPalette ?? this.managerObject.palette.value);

        // Add the palette listeners
        this.managerObject.palette.addListener(this.UUID, this.setPalette.bind(this));


        // Advanced palette

        // Set the initial advanced palettes value
        this.setAdvancedPalettes(this.host.advancedPalettes);


        // Smooth thermograms flag

        // Set the initial smooth thermograms value
        this.setSmoothThermograms(this.host.smoothThermograms);

        // Add the smooth thermograms listener
        this.managerObject.smooth.addListener(this.UUID, this.setSmoothThermograms.bind(this));


        // Smooth graph flag

        // Set the initial smooth graph value
        this.setSmoothGraph(this.host.smoothGraph);

        // Add the listener to the internal property
        this.managerObject.graphSmooth.addListener(this.UUID, this.setSmoothGraph.bind(this));


        // Tool

        // Set the initial tool value
        this._setToolByKey(this.host.tool);

        // Add the tool listener
        this.managerObject.tool.addListener(this.UUID, this.setTool.bind(this));



    }


    hostDisconnected(): void {

        this.managerObject.palette.removeListener(this.UUID);
        this.managerObject.smooth.removeListener(this.UUID);
        this.managerObject.graphSmooth.removeListener(this.UUID);
        this.managerObject.tool.removeListener(this.UUID);
        this.managerObject.unit.removeListener(this.UUID);

    }

    hostUpdate(): void {

    }

    hostWillUpdateWatcher(
        value: PropertyValues<IElementWithManagerController>
    ): void {

        if (!value) return;

        // If the palette property changed in the element, update it internally
        if (value.has("palette")) {
            this.setPalette(this.host.palette);
        }

        // If the advanced paletttes flag changed in the element, update it internally
        if (value.has("advancedPalettes")) {
            this.setAdvancedPalettes(this.host.advancedPalettes);
        }

        // If the smooth thermograms flag changed in the element, update it internally
        if (value.has("smoothThermograms")) {
            this.setSmoothThermograms(this.host.smoothThermograms);
        }

        /// If the smooth graph option changed in the element, update it internally
        if (value.has("smoothGraph")) {
            this.setSmoothGraph(this.host.smoothGraph);
        }

        // If the tool property changed in the element, update it internally
        if (value.has("tool")) {
            this._setToolByKey(this.host.tool);
        }

        if (value.has("unit")) {
            this.setUnit(this.host.unit);
        }

    }


    hostUpdatedWatcher(): void {
        // Do nothing
    }


    /** 
     * Create or get a registry by its slug from the internal manager object. 
     */
    public createRegistry(
        slug: string
    ): ThermalRegistry {
        return this.managerObject.registries.addOrGetRegistry(slug);
    }


    private _paletteStringToContextValue(
        palette: AvailableThermalPalette
    ): ManagerPaletteContextType {

        return {
            key: palette,
            data: ThermalPalettes[palette]
        }
    }


    /**
     * Update the host and local context. Notify listeners once when an initialized value changes,
     * including changes made through the host property or attribute.
     */
    public setAdvancedPalettes(
        value: boolean
    ): void {

        const previousValue = this.advancedPalettesContextProvider.value;

        if (this.host.advancedPalettes !== value) {
            this.host.advancedPalettes = value;
        }

        if (previousValue !== value) {
            this.advancedPalettesContextProvider.setValue(value);
            if (previousValue !== undefined) {
                this.onAdvancedPalettesChange.call(value);
            }
        }

    }


    /** 
     * This is the recommended way to set the palette - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one. 
     */
    public setPalette(
        value: AvailableThermalPalette
    ): void {

        const sanitizedValue = paletteConverter.fromAttribute(value);
        this.lastAppliedPalette = sanitizedValue;

        // If the internal value differs, set it
        if (this.managerObject.palette.value !== sanitizedValue) {
            this.managerObject.palette.setPalette(sanitizedValue);
        }

        if ( !this.paletteContextProvider.value ) {
            this.paletteContextProvider.setValue(
                this._paletteStringToContextValue(sanitizedValue)
            );
        } else if ( this.paletteContextProvider.value.key !== sanitizedValue ) {
            this.paletteContextProvider.setValue(
                this._paletteStringToContextValue(sanitizedValue)
            );
        }

        // If the host's parameter differs, set it
        if (this.host.palette !== sanitizedValue) {
            this.host.palette = sanitizedValue;
        }

    }


    /** 
     * This is the recommended way to set the smooth thermograms flag - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one. 
     */
    public setSmoothThermograms(
        value: boolean
    ): void {

        // If the host value differs, do change it
        if (this.host.smoothThermograms !== value) {
            this.host.smoothThermograms = value;
        }

        // If the context value differs, set it in the context provider
        if (this.smoothThermogramsContextProvider.value !== value) {
            this.smoothThermogramsContextProvider.setValue(value);
        }

        // If the internal manager object's value differs, set it
        if (this.managerObject.smooth.value !== value) {
            this.managerObject.smooth.setSmooth(value);
        }

    }


    /** 
     * This is the recommended way to set the tool - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one. 
     */
    public setTool(
        value: ThermalTool
    ): void {

        // Make sure the value belongs to this manager's available tools
        value = this._toolStringToObject(value.key);

        // If the host's property differs from the new tool, update it
        if (value && value.key !== this.host.tool) {
            this.host.tool = value.key;
        }

        // If the context value differs, set it in the context provider
        if (this.toolContextProvider.value !== value) {
            this.toolContextProvider.setValue(value);
        }

        // If the internal manager object's value differs, set it
        if (this.managerObject.tool.value !== value) {
            this.managerObject.tool.selectTool(value);
        }

    }


    private _setToolByKey(
        value?: string
    ): void {
        const toolObject = this._toolStringToObject(value);
        this.setTool(toolObject);
    }


    private _toolStringToObject(
        value: string = "inspect"
    ): ThermalTool {

        const selectedTool = this.managerObject.tool.tools[value];

        // If the invalid tool was selected, return the current tool instead
        if (!selectedTool) {
            return this.managerObject.tool.tools["inspect"];
        }

        return selectedTool;

    }


    /**
     * This is the recommended way to set the smooth graph option - updates the value and the context provider. All updates are performed only when the new value differs from the current one.
     */
    public setSmoothGraph(
        value: boolean
    ): void {

        // If the host value differs, do change it
        if (this.host.smoothGraph !== value) {
            this.host.smoothGraph = value;
        }

        // If the context value differs, set it in the context provider
        if (this.smoothGraphContextProvider.value !== value) {
            this.smoothGraphContextProvider.setValue(value);
        }

        if ( this.managerObject.graphSmooth.value !== value ) {
            this.managerObject.graphSmooth.setGraphSmooth(value);
        }

    }

    /** 
     * This is the recommended way to set the unit - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one.
     * 
     * The value is normalized case-insensitively; a missing or invalid value falls back to Celsius.
     * The unit affects only the display and the user inputs. All internal values stay in Celsius.
     */
    public setUnit(
        value: ThermalUnit | string | undefined
    ): void {

        const unit = parseThermalUnit(value) ?? ThermalUnit.C;

        // If the value differs, set it to the property
        if (this.host.unit !== unit) {
            this.host.unit = unit;
        }

        // If the context differs, set it in context provider
        if (this.unitContextProvider.value !== unit) {
            this.unitContextProvider.setValue(unit);
        }

        // Impose the value internally
        if (this.managerObject.unit.value !== unit) {
            this.managerObject.unit.set(unit);
        }
    }

    /** Format a single value in current unit and output it along with its unit symbol. */
    public formatSingle(
        valueInCurrentUnit: number
    ): string {
        return this.managerObject.unit.formatSingle(valueInCurrentUnit);
    }

    /** Format a range of values in the current unit and output it along with its unit symbol. */
    public formatRange(
        fromInCurrentUnit: number,
        toInCurrentUnit: number
    ): string {
        return this.managerObject.unit.formatRange(fromInCurrentUnit, toInCurrentUnit);
    }

    /** Convert a value in Celsius unit to the current unit and return the number. */
    public toCurrentUnit(
        valueInCelsius: number
    ): number {
        return this.managerObject.unit.celsiusToCurrent(valueInCelsius);
    }

    /** Convert a value in the current unit to Celsius. */
    public fromCurrentUnit(
        valueInCurrentUnit: number
    ): number {
        return this.managerObject.unit.currentToCelsius(valueInCurrentUnit);
    }

    public get currentUnit(): ThermalUnitDefinition {
        return this.managerObject.unit.current;
    }

}


