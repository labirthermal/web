import { BaseStructureObject } from "../base/BaseStructureObject";
import { ThermalFileInstance } from "../file/ThermalFileInstance";
import { FilterContainer } from "../filters/FilterContainer";
import { Batch } from "../loading/batch/Batch";
import { AnalysisGroupGraph } from "../properties/analysis/group/AnalysisGroupGraph";
import { AnalysisSyncDrive } from "../properties/analysis/sync/analysisSync";
import { ToolDrive } from "../properties/analysis/tool/ToolDrive";
import { CursorPositionDrive } from "../properties/cursor/CursorPositionDrive";
import { FilesState } from "../properties/lists/filesState";
import { MinmaxGroupProperty } from "../properties/scale/MinmaxGroupProperty";
import { GroupPlayback } from "../properties/time/group/GroupPlayback";
import { ThermalRegistry } from "./ThermalRegistry";

/**
 * Group of thermal images
 */
export class ThermalGroup extends BaseStructureObject {


    public readonly hash = Math.random();

    /** Human readable label = name or id or hasn */
    public get label() {
        return this.name ?? this.id ?? this.hash;
    }

    public get pool() {
        return this.registry.manager.pool;
    }

    public constructor(
        public readonly registry: ThermalRegistry,
        public readonly id: string,
        public readonly name?: string,
        public readonly description?: string
    ) {
        super();
    }


    public readonly minmax: MinmaxGroupProperty = new MinmaxGroupProperty(this, undefined);

    /** Tool drive from above */
    public get tool(): ToolDrive {
        return this.registry.manager.tool;
    }

    public readonly files: FilesState = new FilesState( this, [] );

    public readonly cursorPosition: CursorPositionDrive = new CursorPositionDrive(this, undefined);

    public readonly analysisSync: AnalysisSyncDrive = new AnalysisSyncDrive(this, false);

    public readonly analysisGraph: AnalysisGroupGraph = new AnalysisGroupGraph(this);

    protected _playback?: GroupPlayback;
    public get playback() {
        if ( ! this._playback ) {
            this._playback = new GroupPlayback( this, 0 );
        }
        return this._playback;
    }



    /** Iteration */
    public forEveryInstance = ( fn: ( (instance: ThermalFileInstance) => void ) ) => {
        this.files.value.forEach( instance => fn( instance ) );
    }


    /** Remove all instances, reset the minmax */
    public destroySelfAndBelow() {
        this.removeAllChildren();
        this.minmax.reset();
    }


    public removeAllChildren() {
        this.files.removeAllInstances();
    }

    public reset() {
        this.files.reset();
        this.minmax.reset();
        this.cursorPosition.reset();
        this.analysisSync.reset();
    }

    public readonly filters = new FilterContainer( this );

    public getInstances() {
        return this.files.value;
    }

    public startBatch(
        id: string
    ): Batch {
        return this.registry.batch.getBatchById( id );
    }


}