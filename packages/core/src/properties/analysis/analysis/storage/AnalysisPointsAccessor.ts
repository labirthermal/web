import { AnalysisDrive } from "../AnalysisDrive";
import { AbstractAnalysis } from "../internals/AbstractAnalysis";
import { AbstractPoint } from "../internals/AbstractPoint";


/** Access list of points from analysis layers */
export class AnalysisPointsAccessor {

    public constructor(
        public readonly drive: AnalysisDrive
    ) {}


    /** Get all points from all layers */
    public get all() {
        return this.extractPointsFromLayers( this.drive.layers.all );
    }


    /** Get all points from selected layers */
    public get allInSelectedLayers() {
        return this.extractPointsFromLayers( this.drive.layers.selectedOnly );
    }


    /** Get only active points from selected layers */
    public get activeInSelectedLayers() {
        return this.extractPointsFromLayers( this.drive.layers.selectedOnly, true );
    }


    /** Extract points from all provided layers */
    protected extractPointsFromLayers( 
        layers: AbstractAnalysis[],
        activeOnly: boolean = false
    ) {
        return layers.reduce( (state,current) => {

            const currentPoints = activeOnly
                ? current.arrayOfActivePoints
                : current.arrayOfPoints

            return [...state, ...currentPoints]
        }, [] as AbstractPoint[] );
    }

}