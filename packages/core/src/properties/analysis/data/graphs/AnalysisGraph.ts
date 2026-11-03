import { AreaAnalysisData, PointAnalysisData } from "../../../../parsers/structure";
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

    /** The analysis values are derived from the graph data, so they are refreshed before the graph listeners are called. */
    protected set value( value: GraphDataTypes|undefined ) {
        this._value = value;
        this.analysis.recalculateValues();
        this.onGraphData.call( value, this.analysis );
    }

    /** True while a data job is running. Guards the coalescing in `fetchGraphData`. */
    protected _fetching: boolean = false;

    /** Set when a request arrives while a job runs. The running loop then performs one trailing refetch. */
    protected _refetchRequested: boolean = false;

    /** The currently running (or last finished) fetch, including its eventual trailing refetches. */
    protected _fetchPromise?: Promise<void>;

    /**
     * Fetch the analysis data from the parser job and store them.
     *
     * Requests are **coalesced**: at most one job runs per analysis at any time.
     * Reading the data means handing the whole working buffer to the parser job
     * (and cloning it when the job runs in the worker pool), so an unthrottled
     * source of requests - typically `onMoveOrResize` firing on every mouse move
     * while dragging - must not start one job per event.
     *
     * - When no job is running, the job starts immediately.
     * - When a job is already running, only a *trailing* refetch is noted and the
     *   in-flight promise is returned. Once the running job finishes, a single
     *   refetch reads the latest geometry, no matter how many requests arrived.
     *
     * The returned promise resolves after the data settle, i.e. after the eventual
     * trailing refetch. Intermediate results are applied as they arrive, so the
     * graph updates progressively even during a long drag.
     */
    protected fetchGraphData(): Promise<void> {

        // A job is already running - note the request and let the running loop handle it.
        if ( this._fetching ) {
            this._refetchRequested = true;
            return this._fetchPromise!;
        }

        const promise = (async () => {

            this._fetching = true;

            try {

                do {

                    // Consume the pending request before reading, so that any request
                    // arriving *during* the read triggers one more trailing iteration.
                    this._refetchRequested = false;

                    // Jobs run serially, therefore the result is always the newest one.
                    this.value = await this.getGraphData();

                } while ( this._refetchRequested );

            } finally {
                // Always release the guard - a failed job must not block future requests.
                this._fetching = false;
            }

        })();

        this._fetchPromise = promise;

        return promise;

    }

    /**
     * Resolve once the graph data are available.
     *
     * The graph data are fetched asynchronously from the parser jobs whenever the analysis
     * is created, moved or resized. Consumers reading `analysis.min/max/avg` or `graph.value`
     * right after creating an analysis (e.g. exports working on a copied file) must await
     * this method first - otherwise they read the values before the jobs resolve.
     *
     * When a fetch is in flight, the promise resolves after the data settle,
     * including the eventual trailing refetch (see `fetchGraphData`).
     */
    public async whenData(): Promise<GraphDataTypes|undefined> {

        await ( this._fetchPromise ?? this.fetchGraphData() );

        return this.value;

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
        this.analysis.onMoveOrResize.set( "__graphs", async () => {

            await this.fetchGraphData();

        } );

        // Initial graph data
        await this.fetchGraphData();

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