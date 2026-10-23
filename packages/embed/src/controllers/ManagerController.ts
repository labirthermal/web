import type { AvailableThermalPalette, ThermalManager, ThermalPaletteType, ThermalRegistry, ThermalTool } from "@labirthermal/core";
import { CallbacksManager, ThermalPalettes } from "@labirthermal/core";
import { ContextProvider, createContext } from "@lit/context";
import type { PropertyValues } from "lit";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import { createOrGetManager } from "../hierarchy/providers/getters";
import { booleanConverter } from "../utils/converters/booleanConverter";
import { paletteConverter } from "../utils/converters/paletteConverter";
import type { HostReactiveProperties } from "./AbstractHierarchyController";
import { AbstractHierarchyController, INTERNAL_STATE_DECLARATION } from "./AbstractHierarchyController";

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

export class ManagerController extends AbstractHierarchyController<IElementWithManagerController> {

    private _UUID: string;

    public get UUID(): string {
        return this._UUID;
    }

    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        managerSlug: { type: String, reflect: false, attribute: "manager-slug" },
        managerObject: INTERNAL_STATE_DECLARATION,
        managerController: INTERNAL_STATE_DECLARATION,
        palette: { type: String, reflect: true, attribute: "palette", converter: paletteConverter },
        advancedPalettes: { reflect: true, attribute: "advanced-palettes", converter: booleanConverter(false) },
        smoothThermograms: { reflect: true, attribute: "smooth-thermograms", converter: booleanConverter(false) },
        smoothGraph: { reflect: true, attribute: "smooth-graph", converter: booleanConverter(false) },
        tool: { type: String, reflect: true, attribute: "tool"}
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

    }


    hostConnected(): void {

        // Make sure the slug is set for the host element
        const slug = this._getDefaultSlugFromHost("manager-slug");
        this.host.managerSlug = slug;

        // Create or get the manager object and set it in the context provider
        this.host.managerObject = createOrGetManager(slug);
        this.managerObjectContextPtovider.setValue(this.host.managerObject);

        this.onInternalObject.call(this.host.managerObject);


        // Palette

        // Set the initial palette value
        const initialPaletteValue = paletteConverter.fromAttribute(this.host.palette);
        this.setPalette(initialPaletteValue);

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
        return this.managerObject.addOrGetRegistry(slug);
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
     * This is the recommended way to set the advanced palettes flag - updates the value in the context provider and the host element. All updates are performed only when the new value differs from the current one. 
     */
    public setAdvancedPalettes(
        value: boolean
    ): void {

        if (this.host.advancedPalettes !== value) {
            this.host.advancedPalettes = value;
        }

        if (this.advancedPalettesContextProvider.value !== value) {
            this.advancedPalettesContextProvider.setValue(value);
        }

    }


    /** 
     * This is the recommended way to set the palette - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one. 
     */
    public setPalette(
        value: AvailableThermalPalette
    ): void {

        const sanitizedValue = paletteConverter.fromAttribute(value);

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

}



