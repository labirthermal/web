import { CallbacksManager } from "../../../callbacksManager";
import { AnalysisDrive } from "../AnalysisDrive";
import { AbstractAnalysis } from "../internals/AbstractAnalysis";
import { EllipsisAnalysis } from "../internals/area/ellipsis/EllipsisAnalysis";
import { PointAnalysis } from "../internals/point/PointAnalysis";
import { RectangleAnalysis } from "../internals/area/rectangle/RectangleAnalysis";
import { SlotInitialisationValue } from "../../slots/AnalysisSlotsDrive";


type AnalysisAddedCallback = (analysis: AbstractAnalysis, layers: AbstractAnalysis[]) => void;
type AnalysisRemovedCallback = (key: string) => void;
type SelectionChangeEvent = (selectedAnalysis: AbstractAnalysis[]) => void;

/** What kind of change occured with the given analysis? */
export enum AnalysisSerializableChangeType {
    /** The analysis was added */
    ADD = 0,
    /** The analysis was removed */
    REMOVE = 1,
    /** The analysis was resized or moved */
    RESIZEMOVE = 2,
    /** Other properties of the analysis were changed */
    PROPERTIESCHANGE = 3,
    /** Graph visibility changes */
    GRAPH = 4
}

type AnySerializableChangeCallback = ( analysis: AbstractAnalysis, change: AnalysisSerializableChangeType ) => void;

export type SlotUnion = "analysis1" | "analysis2" | "analysis3" | "analysis4" | "analysis5" | "analysis6" | "analysis7";
export type SlotNumber = 1|2|3|4|5|6|7;

export const availableAnalysisColors = [
    "Blue",
    "Red",
    "Lightblue",
    "Green",
    "Brown",
    "Yellow",
    "Navy",
    "Pink",
    "DarkGoldenRod",
    "GreenYellow",
    "SpringGreen",
    "SkyBlue"
];

export class AnalysisLayersStorage extends Map<string, AbstractAnalysis> {

    /** Array of all layers ordered from oldest to the newest */
    protected layers: Array<AbstractAnalysis> = [];


    /** Get the slots driver */
    protected get slots() {return this.drive.parent.slots;}


    /** Array of all analysis ordered from the oldest to the newest. */
    public get all() {
        return this.layers;
    }

    /** Array of all active analysis ordered from the oldest to the newest. */
    public get selectedOnly() {
        return this.all.filter(analysis => analysis.selected === true);
    }


    /** Fired whenever an analysis is added @deprecated */
    public readonly onAdd = new CallbacksManager<AnalysisAddedCallback>();

    /** Fired whenever an analysis is removed @deprecated */
    public readonly onRemove = new CallbacksManager<AnalysisRemovedCallback>();

    /** Fired whenever the selection list changes */
    public readonly onSelectionChange = new CallbacksManager<SelectionChangeEvent>();

    /** Fired whenever a serialisable change occurs:
     * - added
     * - removed
     * - moved/resized
     * - updated 
     */
    public readonly onAnySerializableChange = new CallbacksManager<AnySerializableChangeCallback>();


    /** Array of available colors */
    public readonly colors = availableAnalysisColors;

    public constructor(
        public readonly drive: AnalysisDrive
    ) {
        super();
    }


    // Adding analysis

    /**
     * Internal method for adding analyses
     * - adds it locally
     * - assign its slot if needed
     * - update the layers container
     * - call the analysis add function
     */
    private addAnalysis(
        analysis: AbstractAnalysis,
        slotNumber?: SlotInitialisationValue
    ) {

        // Remove the existing analysis with the same key if exists
        if (this.has(analysis.key)) {
            this.removeAnalysis(analysis.key);
        }

        // Add the color to the analysis
        analysis.setColor(analysis.initialColor);

        // Store the analysis
        this.set(analysis.key, analysis);

        // Add analysis to layer
        this.layers = [...this.layers, analysis];

        // Assign to slots

        // Get slot number
        const slotNum = slotNumber === true
            ? this.slots.getNextFreeSlotNumber()
            : slotNumber === false
                ? undefined
                : slotNumber;

        if ( slotNum !== undefined ) {

            this.slots.assignAnalysisToSlot( slotNum, analysis );

        }

        // Call callbacks
        this.onAdd.call(analysis, this.all);
        this.onAnySerializableChange.call(analysis, AnalysisSerializableChangeType.ADD);
        this.drive.dangerouslySetValueFromStorage(this.all);


        return this;

    }


    /**
     * Removes an analysis by its key
     * - removes the assigned slot
     * - updates the layers container
     * - call the analysis remove function
     */
    public removeAnalysis(key: string) {
        if (this.has(key)) {

            const analysis = this.get( key );

            if ( analysis ) {

                // Remove from slots
                this.slots.unassignAnalysisFromItsSlot( analysis );
                

                // Call the analysis's remove fn
                analysis.destroyDom();

                // Delete here
                this.delete( key );

                // Update layers here
                this.layers = this.layers.filter(analysis => analysis.key !== key);

                // Update the parent value
                this.drive.dangerouslySetValueFromStorage(this.all);

                // Call the callback
                this.onRemove.call(key);
                this.onAnySerializableChange.call(analysis, AnalysisSerializableChangeType.REMOVE);

            }
        }
    }


    /** This is the proper way to remove all analyses */
    public removeAllAnalyses() {
        this.forEach(analysis => {
            this.removeAnalysis(analysis.key);
        });
    }




    /** 
     * Create a rectangular analysis in the given position and start editing it. 
     */
    public createRectFrom(top: number, left: number) {

        const newAnalysis = RectangleAnalysis.startAddingAtPoint(
            this.getNextName("Rectangle"),
            this.getNextColor(),
            this.drive.parent,
            top,
            left
        );

        this.addAnalysis(newAnalysis, false);

        return newAnalysis;

    }


    /** 
     * Place an ellyptical analysis at the given position, providing optionally its color & slot number
     */
    public placeRectAt(
        name: string,
        top: number,
        left: number,
        right: number,
        bottom: number,
        color?: string,
        slotNumber?: SlotInitialisationValue
    ) {

        const newAnalysis = RectangleAnalysis.build(
            name,
            color ?? this.getNextColor(),
            this.drive.parent,
            top,
            left,
            right,
            bottom
        );

        newAnalysis.setReady();

        this.addAnalysis(newAnalysis, slotNumber);

        return newAnalysis;
    }


    /** 
     * Create an ellyptical analysis in the given position and start editing it 
     */
    public createEllipsisFrom(
        top: number,
        left: number
    ) {

        const newAnalysis = EllipsisAnalysis.startAddingAtPoint(
            this.getNextName("Ellipsis"),
            this.getNextColor(),
            this.drive.parent,
            top,
            left
        );

        this.addAnalysis(newAnalysis, false);

        return newAnalysis;

    }


    /** 
     * Build an ellyptical analysis at the given position. 
     */
    public placeEllipsisAt(
        name: string,
        top: number,
        left: number,
        right: number,
        bottom: number,
        color?: string,
        slotNumber?: SlotInitialisationValue
    ) {
        const newAnalysis = EllipsisAnalysis.build(
            name,
            color ?? this.getNextColor(),
            this.drive.parent,
            top,
            left,
            right,
            bottom
        );

        newAnalysis.setReady();

        this.addAnalysis(newAnalysis, slotNumber);

        return newAnalysis;
    }


    /**
     * Create a new point analysis at the given position
     * @returns 
     */
    public createPointAt(
        top: number,
        left: number
    ) {

        const newAnalysis = PointAnalysis.addAtPoint(
            this.getNextName("Point"),
            this.getNextColor(),
            this.drive.parent,
            top,
            left
        );

        this.addAnalysis(newAnalysis, true);

        return newAnalysis;

    }

    /** 
     * Build a point analysis at the given position, providing optionally its color & slot number 
     */
    public placePointAt(
        name: string,
        top: number,
        left: number,
        color?: string,
        slotNumber?: SlotInitialisationValue
    ) {
        const newAnalysis = PointAnalysis.addAtPoint(
            name,
            color ?? this.getNextColor(),
            this.drive.parent,
            top,
            left
        );

        newAnalysis.setReady();

        this.addAnalysis(newAnalysis,slotNumber);

        return newAnalysis;
    }


    /**
     * Mark all analyses as selected
     */
    public selectAll() {
        // Select unselected analysis without any emission
        this.all.filter(analysis => {
            if (analysis.selected === false) {
                analysis.setSelected(false, false);
            }
        });
        // Call the selection change event
        this.onSelectionChange.call(this.selectedOnly);
    }

    /**
     * Mark all analyses as deselected
     */
    public deselectAll() {

        // Deselect all selected
        this.selectedOnly.forEach(analysis => {
            analysis.setDeselected(false);
        });

        // Call the selection change event
        this.onSelectionChange.call(this.selectedOnly);

    }



    



    /** Get color for the next analysis */
    private getNextColor() {

        const usedColors = this.all.map(analysis => analysis.initialColor);

        const availableColors = availableAnalysisColors.filter(color => !usedColors.includes(color));

        if (availableColors.length > 0) {
            return availableColors[0];
        } else {
            return availableAnalysisColors[0];
        }

    }


    /** Get name for the next analysis. The number is the lowest one not occupied by an existing analysis of the same type. */
    private getNextName(type: string) {
        let index = this.all.length;
        while (this.has(`${type} ${index}`)) {
            index++;
        }
        return `${type} ${index}`;
    }


}