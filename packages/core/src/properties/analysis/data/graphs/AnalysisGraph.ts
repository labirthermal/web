import { AreaAnalysisData, PointAnalysisData } from "../../../../loading/workers/parsers/structure";
import { CallbacksManager } from "../../../callbacksManager";
import { AbstractAnalysis } from "../../analysis/internals/AbstractAnalysis";
import { PointAnalysis } from "../../analysis/internals/point/PointAnalysis";

type GraphDataTypes = PointAnalysisData | AreaAnalysisData;

export class AnalysisGraph {

    public constructor(
        public readonly analysis: AbstractAnalysis
    ) {

        this.hydrate();

    }

    protected _min: boolean = false;
    protected _max: boolean = false;
    protected _avg: boolean = false;

    public get state() {
        return {
            "MIN": this._min,
            "MAX": this._max,
            "AVG": this._avg
        }
    }

    protected _value?: GraphDataTypes;

    public get value() {
        return this._value;
    }

    protected set value( value: GraphDataTypes|undefined ) {
        this._value = value;
        this.onGraphData.call( value, this.analysis );
    }

    setMinActivation( active: boolean ) {
        if ( this._min !== active ) {
            this._min = active;
            this.emitGraphActivation();
            this.analysis.onSerializableChange.call( this.analysis, "min" );
        }
    }

    setMaxActivation( active: boolean ) {
        if ( this._max !== active ) {
            this._max = active;
            this.emitGraphActivation();
            this.analysis.onSerializableChange.call( this.analysis, "max" );
        }
    }

    setAvgActivation( active: boolean ) {
        if ( this._avg !== active ) {
            this._avg = active;
            this.emitGraphActivation();
            this.analysis.onSerializableChange.call( this.analysis, "avg" );
        }
    }

    public readonly onGraphActivation = new CallbacksManager<(
        min: boolean,
        max: boolean,
        avg: boolean
    ) => void>()

    public readonly onGraphData = new CallbacksManager<(
        data: GraphDataTypes|undefined,
        analysis: AbstractAnalysis
    )=>void>

    public readonly onAnalysisSelection = new CallbacksManager<(
        activated: boolean,
        analysis: AbstractAnalysis
    )=>void>

    protected emitGraphActivation() {
        this.onGraphActivation.call(
            this._min,
            this._max,
            this._avg
        );
    }


    protected async hydrate() {


        // Refresh the output whenever the initial color changes
        this.analysis.onSetInitialColor.set( "__graphs", () => {
            this.analysis.file.analysisData.listeners.refreshOutput();
        } );

        // Listen to analysis selection
        // This is perhaps redundant, but for the purpose of encapsulation it seems reasonable
        this.analysis.onSelected.set( "__graphs", ( analysis ) => {

            this.onAnalysisSelection.call( true, analysis );
            
        } );

        // Listen to analysis move or resize and fetch data
        this.analysis.onMoveOrResize.set( "__graphs", async ( analysis ) => {

            const data = await analysis.getAnalysisData();
            this.value = data;

        } );

        // Initial graph data
        const data = await this.getGraphData();
        this.value = data;

    }

    protected async getGraphData(): Promise<GraphDataTypes> {
        const data = await this.analysis.getAnalysisData() as GraphDataTypes;
        return data;
    }

    public getGraphColors(): string[] {

        // Return only one color if it is a point analysis
        if ( this.analysis instanceof PointAnalysis ) {
            // point analysis are controlled by the AVG
            if ( this._avg ) {
                return [this.analysis.initialColor];
            } else return [];
        }

        // For area analysis, return only the active scopes
        const output: string[] = [];

        Object.values( this.state ).forEach( value => {

            if ( value ) {
                output.push( this.analysis.initialColor );
            }
            
        } );

        return output;
        
    }

    public getGraphLabels(): string[] {

        // Return only one color if it is a point analysis
        if ( this.analysis instanceof PointAnalysis ) {
            // point analysis are controlled by the AVG
            if ( this._avg ) {
                return [this.analysis.name];
            } else return [];
        }

        // For area analysis, return only the active scopes
        const output: string[] = [];

        Object.entries( this.state ).forEach( ([key, value]) => {

            if ( value ) {
                output.push( `${this.analysis.name} ${key}` );
            }
        } );

        return output;

    }

    public hasDataToPrint(): boolean {
        if ( this.analysis instanceof PointAnalysis ) {
            return this._avg;
        }
        return this._min || this._max || this._avg;
    }

    public getDtaAtTime( timestamp: number ): number[] {
        
        if ( this.analysis instanceof PointAnalysis ) {
            if ( this._avg ) {
                const value = this.value as PointAnalysisData;
                return [ value[timestamp] ];
            } else return  [];
        }

        const output: number[] = [];

        const value = this.value as AreaAnalysisData;

        if ( this._min ) {
            output.push( value[timestamp].min );
        }
        if ( this._max ) {
            output.push( value[timestamp].max );
        }
        if ( this._avg ) {
            output.push( value[timestamp].avg );
        }

        return output;
    
    }





    

}