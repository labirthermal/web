import { ThermalFileInstance } from "../../../../file/ThermalFileInstance";
import { AreaAnalysisData, PointAnalysisData } from "../../../../loading/workers/parsers/structure";
import { AnalysisGraph } from "../../data/graphs/AnalysisGraph";
import { CallbacksManager } from "../../../callbacksManager";
import { AbstractPoint } from "./AbstractPoint";
import { AnalysisSerializableChangeType } from "../storage/AnalysisLayersStorage";


type AnalysisEvent = (analysis: AbstractAnalysis) => void;

export abstract class AbstractAnalysis {


    /** Return a string representing the type of the analysis */
    public abstract getType(): string;

    private static LISTENER_PROMOTE_PROPERTIES_CHANGE = "pch";
    private static LISTENER_PROMOTE_MOVE_RESIZE = "mvr";
    private static SERIALISABLE_CHANGES = [
        "name",
        "color",
        "min",
        "max",
        "avg"
    ];
    private static VALID_ANALYSIS_TYPES = ["point","ellipsis","rectangle"]

    public static readonly COLOR_ACTIVE = "yellow";
    public static readonly COLOR_INACTIVE = "black";

    private _ready: boolean = false;
    /** Indicating whether the analysis in the state of its creation (by the user's mouse) or if it is already finalised. */
    public get ready(): boolean { return this._ready; }
    /** Mark the analysis as ready (finalised) */
    public setReady() {
        if (this.ready) {
            throw new Error("Trying to set ready an analysis that is already ready!");
        }
        this._ready = true;
    }




    /** The main DOM element of this analysis. Is placed in `this.renderRoot` */
    public readonly layerRoot: HTMLDivElement;

    /** Alias of the file's canvasLayer root. The analysis DOM will be placed here. */
    public get renderRoot(): HTMLElement {
        return this.file.dom!.canvasLayer!.getLayerRoot();
    }



    /** 
     * Map of the analysis control points
     * - key is the role of the point
     * - value is the point instance
     */
    public readonly points: Map<string, AbstractPoint> = new Map;

    /** Create a new array containing all the points */
    public get arrayOfPoints() {
        return Array.from(this.points.values());
    }

    /** Create a new array containing all the active points */
    public get arrayOfActivePoints() {
        return this.arrayOfPoints.filter(point => point.active);
    }



    /** Access all the file's analysis layers object. */
    public get layers() {
        return this.file.analysis.layers;
    }
    


    /** Accessor to the related graph control node */
    public abstract get graph(): AnalysisGraph;


    /** Selection status */
    protected _selected: boolean = false;
    public get selected() { return this._selected; }
    public readonly onSelected = new CallbacksManager<AnalysisEvent>;
    public readonly onDeselected = new CallbacksManager<AnalysisEvent>;

    /** 
     * Actions taken on any change that should trigger serialisation:
     * - modification of position or dimensions
     * - change of name or color
     */
    public readonly onSerializableChange = new CallbacksManager<(analysis: AbstractAnalysis, change: string) => void>

    /** Actions taken when the value changes. Called internally by `this.recalculateValues()` */
    public readonly onValues = new CallbacksManager<(min?: number, max?: number, avg?: number) => void>;

    /** Actions taken when the analysis moves or resizes anyhow. This is very much important and it is called from the edit tool. */
    public readonly onMoveOrResize = new CallbacksManager<(analysis: AbstractAnalysis) => void>

    /** Actions taken whenever the initial color changes. */
    public readonly onSetInitialColor = new CallbacksManager<(value: string) => void>;

    /** Actions taken whenever the color changes. */
    public readonly onSetColor = new CallbacksManager<(value: string) => void>;

    /** Actions taken whenever the name changes. */
    public readonly onSetName = new CallbacksManager<(value: string) => void>;

    


    protected _min?: number;
    protected _max?: number;
    protected _avg?: number;

    /** The current minimal value of this analysis */
    public get min() { return this._min; }
    /** The current maximal value of this analysis */
    public get max() { return this._max; }
    /** The current avarage value of this analysis */
    public get avg() { return this._avg; }



    

    protected _top!: number;
    protected _left!: number;
    protected _width!: number;
    protected _height!: number;

    public get left() { return this._left; }
    public get top() { return this._top; }
    /** This dimension does not count the last pixel. */
    public get width() { return this._width; }
    /** This dimension does not count the last pixel. */
    public get height() { return this._height; }
    public get right() { return this._left + this._width; }
    public get bottom() { return this._top + this._height; }

    protected abstract onSetTop(validatedValue: number): void;
    protected abstract onSetLeft(validatedValue: number): void;
    protected abstract onSetWidth(validatedValue: number): void;
    protected abstract onSetHeight(validatedValue: number): void;

    protected abstract validateWidth(value: number): number;
    protected abstract validateHeight(value: number): number;

    protected abstract getVerticalDimensionFromNewValue(bottom: number, preferredSide: "top" | "bottom"): { top: number, bottom: number, height: number };
    protected abstract getHorizontalDimensionsFromNewValue(value: number, preferredSide: "left" | "right"): { left: number, right: number, width: number }

    public setTop(value: number) {

        if (isNaN(value)) {
            return;
        }

        if (value === this.top) {
            return;
        }

        const { top, height } = this.getVerticalDimensionFromNewValue(value, "top");

        let shouldEmit = false;

        if (top !== this.top) {
            this._top = top;
            this.onSetTop(top);
            shouldEmit = true;
        }

        if (height !== this.height) {
            this._height = height;
            this.onSetHeight(height);
            shouldEmit = true;
        }

        if (shouldEmit) {
            this.onSerializableChange.call(this, "top");
        }

    }

    public setLeft(value: number) {

        if (isNaN(value)) {
            return;
        }

        if (value === this.left) {
            return;
        }

        const { left, width } = this.getHorizontalDimensionsFromNewValue(value, "left");

        let shouldEmit = false;

        if (left !== this.left) {
            this._left = left;
            this.onSetLeft(left);
            shouldEmit = true;
        }

        if (width !== this.width) {
            this._width = width;
            this.onSetWidth(width);
            shouldEmit = true;
        }

        if (shouldEmit) {
            this.onSerializableChange.call(this, "left");
        }

    }

    public setWidth(value: number) {
        if (value === this.height) {
            return;
        }
        const val = this.validateWidth(value);
        if (!isNaN(val) && val !== this.width) {
            this._width = val;
            this.onSetWidth(val);
            this.onSerializableChange.call(this, "width");
        }
    }

    public setHeight(value: number) {
        if (value === this.height) {
            return;
        }
        const val = this.validateHeight(value);
        if (!isNaN(val) && val !== this.height) {
            this._height = val;
            this.onSetHeight(val);
            this.onSerializableChange.call(this, "height");
        }
    }

    public setBottom(value: number) {

        if (isNaN(value)) {
            return;
        }

        if (value === this.bottom) {
            return;
        }

        // Calculate the height from the bottom value
        const { top, height } = this.getVerticalDimensionFromNewValue(value, "bottom");

        let shouldEmit = false;

        // Use existing setters to set vertical properties
        if (top !== this.top) {
            this._top = top;
            this.onSetTop(top);
            shouldEmit = true;
        };

        if (height !== this.height) {
            this._height = height;
            this.onSetHeight(height);
            shouldEmit = true;
        }

        if (shouldEmit) {
            this.onSerializableChange.call(this, "bottom");
        }

    }

    public setRight(value: number) {

        if (isNaN(value)) {
            return;
        }

        if (value === this.right) {
            return;
        }

        // Calculate the width from the right value
        const { left, width } = this.getHorizontalDimensionsFromNewValue(value, "right");

        let shouldEmit = false;

        // Use existing setters to set horizontal properties
        if (left !== this.left) {
            this._left = left;
            this.onSetLeft(left);
            shouldEmit = true;
        }
        if (width !== this.width) {
            this._width = width;
            this.onSetWidth(width);
            shouldEmit = true;
        }

        if (shouldEmit) {
            this.onSerializableChange.call(this, "right");
        }

    }

    

    protected _color: string = AbstractAnalysis.COLOR_INACTIVE;
    public get color() { return this._color; }
    public setColor(value: string) {
        this._color = value;
        this.setColorCallback(value);
        this.onSetColor.call(value);
    }
    protected abstract setColorCallback(value: string): void;
    


    protected _initialColor: string;
    public get initialColor() { return this._initialColor; }
    public setInitialColor(value: string) {
        if (value === this.initialColor) {
            return;
        }
        this._initialColor = value;
        this.onSetInitialColor.call(value);
        this.onSerializableChange.call(this, "color");
        if (this.selected === true) {
            this.setColor(value);
        }

    }

    

    public readonly nameInitial: string;
    protected _name: string;
    public get name() { return this._name; }
    public setName(value: string) {
        if (value === this.name) {
            return;
        }
        this._name = value;
        this.onSerializableChange.call(this, "name");
        this.onSetName.call(value);
    }
    


    



    public constructor(
        public readonly key: string,
        public readonly file: ThermalFileInstance,
        initialColor: string
    ) {

        this._initialColor = initialColor;
        this.nameInitial = key;
        this._name = key;

        // Create the layer root
        this.layerRoot = document.createElement("div");
        this.layerRoot.style.position = "absolute";
        this.layerRoot.style.top = "0px";
        this.layerRoot.style.left = "0px";
        this.layerRoot.style.width = "100%";
        this.layerRoot.style.height = "100%";
        this.layerRoot.style.overflow = "hidden";
        this.layerRoot.id = `analysis_${this.key}`;

        this.renderRoot.appendChild(this.layerRoot);

        // This callback is absolutely crucial and may never be removed!
        /** @todo what happend if the callback key is set rendomly? I do not want this callback to be overriden anyhow! */
        this.onMoveOrResize.set(
            AbstractAnalysis.LISTENER_PROMOTE_MOVE_RESIZE,
            () => {
                this.recalculateValues();
                /** @todo */
                // ... probably here should be serialisation
                this.onSerializableChange.call(this, "moveOrResize");

                // Trigger the event in the layers storage
                this.layers.onAnySerializableChange.call(this, AnalysisSerializableChangeType.RESIZEMOVE);

            });

        /** Anytime a seralisable change occures, promote it to the layers storage */
        this.onSerializableChange.set(
            AbstractAnalysis.LISTENER_PROMOTE_PROPERTIES_CHANGE,
            (analysis, change) => {

                if (AbstractAnalysis.SERIALISABLE_CHANGES.includes(change)) {
                    this.layers.onAnySerializableChange.call(analysis, AnalysisSerializableChangeType.PROPERTIESCHANGE);
                }

            });

    }






    // Serialisation






    /** Recieved a serialized representation of the analysis, parse it and change the internal state accordingly */
    public abstract recievedSerialized(input: string): void;

    /** Convert the internal state of an analysis to a serialized representation */
    public abstract toSerialized(): string;


    /**
     * Performs the basic validation of a serialised input string
     * - correct number of segments?
     * - correct type of analysis?
     * - the type matches this analysis instance?
     */
    public serializedIsValid( input: string ): boolean {
        const splitted = input
            .split( ";" )
            .map( segment => segment.trim() );

        if ( splitted.length < 2 ) {
            return false;
        }

        if ( ! AbstractAnalysis.VALID_ANALYSIS_TYPES.includes( splitted[1]) ) {
            return false;
        }

        if ( splitted[1] !== this.getType() ) {
            return false;
        }

        return true;
    }



    /** When parsing incoming serialized attribute, look if segments have an exact value */
    public static serializedSegmentsHasExact(
        segments: string[],
        lookup: string
    ): boolean {
        return segments.find(segment => segment === lookup) ? true : false;
    }

    /** When parsing incooming serialized attribute, try to extract it by its key as string */
    public static serializedGetStringValueByKey(
        segments: string[],
        key: string
    ): string | undefined {
        const regexp = new RegExp(`${key}:*`);
        const item = segments.find(s => {
            if (s.match(regexp)) {
                return isNaN(parseInt(s.split(":")[1]));
            }
        });
        return item?.split(":")[1].trim();
    }

    /** When parsing incooming serialized attribute, try to extract it by its key as number */
    public static serializedGetNumericalValueByKey(
        segments: string[],
        key: string
    ): number | undefined {
        const regexp = new RegExp(`${key}:\\d+`);
        const item = segments.find(s => s.match(regexp));
        if (item === undefined) {
            return undefined;
        }
        return parseInt(item.split(":")[1]);
    }







    

    /**
     * Remove the analysis from the file and from the DOM
     * - removes from the DOM
     * - DOES NOT REMOVE THE SLOT
     * - DOES NOT REMOVE FROM THE STORAGE
     * @internal Does not remove from broader context, so do not call this method from aywhere else than from the layers storage
     */
    public destroyDom() {
        this.setDeselected();
        this.renderRoot.removeChild(this.layerRoot);
    }

    
    




    // Selection management




    /**
     * Mark the analysis as selected
     * => inable its listeners
     * => change the color of its controls to its current color
     */
    public setSelected(
        exclusive: boolean = false,
        emitGlobalEvent: boolean = true
    ) {

        if (this.selected === true) {
            return;
        }

        // Internal mechanisms
        this._selected = true;
        this.onSelected.call(this);
        this.setColor(this.initialColor);

        // Eventually disable all other analysis
        if (exclusive === true) {
            this.layers.all
                .filter(analysis => analysis.key !== this.key)
                .forEach(analysis => {
                    if (analysis.selected) {
                        analysis.setDeselected(false);
                    }
                })
        }

        // Call selected listener
        if (emitGlobalEvent === true) {
            this.layers.onSelectionChange.call(this.layers.selectedOnly);
        }

        const slot = this.file.slots.getAnalysisSlot(this);

        if (slot) {
            this.file.group.analysisSync.setSlotSelected(this.file, slot);
        }

    }

    /** 
     * Mark the analysis as deselected
     * => disable its listeners
     * => change the color to inactive
     */
    public setDeselected(emitGlobalEvent: boolean = true) {

        if (this.selected === false) {
            return;
        }

        // Internal mechanisms
        this._selected = false;
        this.onDeselected.call(this);
        this.setColor(AbstractAnalysis.COLOR_INACTIVE);

        // Deactivate all points
        this.arrayOfActivePoints.forEach(point => point.deactivate());

        // Eventually call global mechanisms
        if (emitGlobalEvent === true) {
            this.file.analysis.layers.onSelectionChange.call(this.file.analysis.layers.selectedOnly);
        }

        // Synchronise the selection state in the entire group
        const slot = this.file.slots.getAnalysisSlot(this);
        if (slot) {
            this.file.group.analysisSync.setSlotDeselected(this.file, slot);
        }
    }







    // Utilities








    /** Detect whether a coordinate is withing the analysis. */
    public abstract isWithin(x: number, y: number): boolean;












    // Values










    /** Recalculate the analysis' values from the current position and dimensions. Called whenever the analysis is resized or whenever file's `pixels` change. */
    public recalculateValues() {

        const { min, max, avg } = this.getValues();
        this._min = min;
        this._max = max;
        this._avg = avg;
        this.onValues.call(this.min, this.max, this.avg);

    }

    /** Obtain the current values of the analysis using current position and dimensions */
    protected abstract getValues(): { min?: number, max?: number, avg?: number }

    /** Override this method to get proper analysis data. */
    public abstract getAnalysisData(): Promise<PointAnalysisData | AreaAnalysisData>;

    /**
     * @deprecated Use with caution! This method forcefully sets the analysis values. The calculation mechanisms should happen elsewhere. Now they happen in the canvas layer wich calculates them upon rendering. That is not good at all!
     * @internal
     * @todo Remove this method, move the calculation of values elsewhere from the canvas layer!
     */
    public dangerouslySetValues(
        avg: number,
        min: number | undefined = undefined,
        max: number | undefined = undefined,
    ) {
        this._avg = avg;
        this._min = min;
        this._max = max;

        this.onValues.call(this.min, this.max, this.avg);
    }


    

}