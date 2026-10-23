import { ThermalFileInstance } from "../../../../../file/ThermalFileInstance";
import { PointAnalysisData } from "../../../../../loading/workers/parsers/structure";
import { AnalysisGraph } from "../../../data/graphs/AnalysisGraph";
import { AbstractAnalysis } from "../AbstractAnalysis";
import { PointPoint } from "./PointPoint";
import { PointPlacement } from "../AbstractPoint";

export class PointAnalysis extends AbstractAnalysis {

    public getType(): string {
        return "point";
    }

    public readonly center!: PointPoint;

    protected _graph: AnalysisGraph|undefined;

    public get graph(): AnalysisGraph {
        if (!this._graph) {
            this._graph = new AnalysisGraph(this);
        }
        return this._graph;
    }

    public static addAtPoint(
        key: string,
        color: string,
        file: ThermalFileInstance,
        top: number,
        left: number
    ): PointAnalysis {
        const item = new PointAnalysis(
            key,
            color,
            file,
            top,
            left
        );

        return item;
    }

    protected constructor(
        key: string,
        color: string,
        file: ThermalFileInstance,
        top: number,
        left: number
    ) {
        super( key, file, color );

        this._top = top;
        this._left = left;
        this._width = 0;
        this._height = 0;

        this.center = new PointPoint( "center", top, left, this, color );

        this.points.set( "center", this.center );

        this.recalculateValues();

    }


    public setColorCallback(value: string): void {
        this.center.setColor( value );
    }

    public isWithin(x: number, y: number): boolean {
        return this.center.isWithin( y, x );
    }
    protected getValues(): { min?: number; max?: number; avg?: number; } {
        const value = this.file.getTemperatureAtPoint( this.center.x, this.center.y );
        return {
            min: value,
            max: value,
            avg: value
        }
    }

    public async getAnalysisData(): Promise<PointAnalysisData> {
        
        return await this.file.reader.pointAnalysisData( this.center.x, this.center.y );

    }




    protected validateWidth(): number {
        return 0;
    }

    protected validateHeight(): number {
        return 0;
    }



    protected onSetLeft(validatedValue: number): void {
        this.center.setXDirectly( validatedValue, PointPlacement.MIDDLE );
        this.onSerializableChange.call( this, "left" );
    }

    protected onSetTop(validatedValue: number): void {
        this.center.setYDirectly( validatedValue, PointPlacement.MIDDLE );
        this.onSerializableChange.call( this, "top" );
    }

    public onSetWidth(): void {}

    public onSetHeight(): void {}


    protected getVerticalDimensionFromNewValue(value: number): { top: number; height: number; bottom: number } {
        const val = Math.min(
            this.file.height - 1,
            Math.max(
                0,
                Math.round( value )
            )
        );

        return { top: val, bottom: val, height: 0};
    }


    protected getHorizontalDimensionsFromNewValue(value: number): { left: number; right: number, width: number; } {

        const val = Math.min(
            this.file.width - 1,
            Math.max(
                0,
                Math.round( value )
            )
        );

        return { left: val, right: val, width: 0 };
    }



    public recievedSerialized( input: string ): void {

        if ( ! this.serializedIsValid( input ) ) {
            return;
        }

        const splitted = input
            .split( ";" )
            .map( segment => segment.trim() );

        let shouldRecalculate: boolean = false;

        const name = splitted[0];

        if ( name !== this.name ) {
            this.setName( name );
        }

        const graphOn = AbstractAnalysis.serializedSegmentsHasExact( splitted, "avg" );

        if ( graphOn !== this.graph.state.AVG ) {
            this.graph.setAvgActivation( graphOn );
            shouldRecalculate = true;
        }

        const color = AbstractAnalysis.serializedGetStringValueByKey( splitted, "color" );

        if ( color === undefined ) {
            //
        } else if ( color !== this.initialColor ) {
            this.setInitialColor( color );
        }

        const top = AbstractAnalysis.serializedGetNumericalValueByKey( splitted, "top" );
        const left = AbstractAnalysis.serializedGetNumericalValueByKey( splitted, "left" );

        if ( top !== undefined ) {
            this.setTop( top );
            shouldRecalculate = true;
        }

        if ( left !== undefined ) {
            this.setLeft( left );
            shouldRecalculate = true;
        }

        if ( shouldRecalculate ) {
            this.recalculateValues();
        }

        
    }

    public toSerialized(): string {
        
        const output: string[] = [];

        output.push( this.name );
        output.push( "point" );
        output.push( `top:${this.top}` );
        output.push( `left:${this.left}` );
        output.push( `color:${this.initialColor}` );
        if ( this.graph.state.AVG ) {
            output.push("avg");
        }

        return output.join( ";" );

    }


}