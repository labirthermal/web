import { ThermalFileInstance } from "../../../../../file/ThermalFileInstance";
import { AnalysisGraph } from "../../../data/graphs/AnalysisGraph";
import { AbstractAnalysis } from "../AbstractAnalysis";
import { PointPlacement } from "../AbstractPoint";
import { AbstractArea } from "./AbstractArea";
import { CornerPoint } from "./CornerPoint";
import { RectangleArea } from "./rectangle/RectangleArea";

export abstract class AbstractAreaAnalysis extends AbstractAnalysis {

    declare points: Map<string, CornerPoint>;

    protected readonly wPx = (100 / this.file.width / 2).toString() + "%";
    protected readonly hPx = (100 / this.file.height / 2).toString() + "%";


    public readonly tl: CornerPoint;
    public readonly tr: CornerPoint;
    public readonly bl: CornerPoint;
    public readonly br: CornerPoint;

    public readonly area: RectangleArea;

    protected _graph: AnalysisGraph | undefined;

    public get graph(): AnalysisGraph {
        if (!this._graph) {
            this._graph = new AnalysisGraph(this);
        }
        return this._graph;
    }


    public isWithin(x: number, y: number): boolean {
        return x >= this.left
            && x <= this.left + this.width
            && y >= this.top
            && y <= this.top + this.height
    }

    protected abstract buildArea(left: number, top: number, width?: number, height?: number): AbstractArea;



    public static calculateDimensionsFromCorners(
        top: number,
        left: number,
        right: number,
        bottom: number
    ) {

        const t = Math.min(top, bottom);
        const b = Math.max(top, bottom);
        const l = Math.min(left, right);
        const r = Math.max(left, right);

        const w = r - l;
        const h = b - t;

        return {
            top: t,
            left: l,
            width: w,
            height: h
        }

    }



    protected constructor(
        key: string,
        color: string,
        file: ThermalFileInstance,
        top: number,
        left: number,
        width?: number,
        height?: number
    ) {
        super(key, file, color);


        let right = left;
        let bottom = top;

        if (width !== undefined && height !== undefined) {
            right = left + width;
            bottom = top + height;
        }

        this.area = this.buildArea(top, left, width, height);


        // Create points
        this.tl = this.addPoint(
            "tl", 
            top, 
            left, 
            PointPlacement.START, 
            PointPlacement.START
        );
        this.tr = this.addPoint(
            "tr", 
            top, 
            right,
            PointPlacement.END,
            PointPlacement.START
        );
        this.bl = this.addPoint(
            "bl", 
            bottom, 
            left,
            PointPlacement.START,
            PointPlacement.END
        );
        this.br = this.addPoint(
            "br", 
            bottom, 
            right,
            PointPlacement.END,
            PointPlacement.END
        );

        this.tl.setPairX(this.bl);
        this.tl.setPairY(this.tr);

        this.tr.setPairX(this.br);
        this.tr.setPairY(this.tl);

        this.bl.setPairX(this.tl);
        this.bl.setPairY(this.br);

        this.br.setPairX(this.tr);
        this.br.setPairY(this.bl);

        this.calculateBounds();

        this.onMoveOrResize.set("sync the area", () => {
            this.calculateBounds();
        });

    }

    public setColorCallback(value: string): void {
        this.points.forEach(point => point.setColor(value));
        this.area.setColor(value)
    }

    protected calculateBounds() {

        let leftMost: number = this.file.width;
        let rightMost: number = 0;
        let topMost: number = this.file.height;
        let bottomMost: number = 0;

        this.points.forEach(point => {
            if (point.x > rightMost) {
                rightMost = point.x;
            }
            if (point.x < leftMost) {
                leftMost = point.x;
            }
            if (point.y < topMost) {
                topMost = point.y;
            }
            if (point.y > bottomMost) {
                bottomMost = point.y;
            }
        });

        this._left = leftMost;
        this._top = topMost;
        this._width = rightMost - leftMost;
        this._height = bottomMost - topMost;

        this.area.left = this.left;
        this.area.top = this.top;
        this.area.height = this.height;
        this.area.width = this.width;

    }

    protected addPoint(
        role: string,
        top: number,
        left: number,
        placementX: PointPlacement,
        placementY: PointPlacement
    ) {
        const point = new CornerPoint(role, top, left, this, this.color, placementX, placementY);
        this.points.set(role, point);
        return point;
    }



    protected validateWidth(value: number): number {
        const max = this.file.width - 1 - this.left;
        return Math.max(0, Math.min(max, Math.round(value)));
    }

    protected validateHeight(value: number): number {
        const max = this.file.height - 1 - this.top;
        return Math.max(0, Math.min(max, Math.round(value)));
    }




    protected onSetLeft(validatedValue: number): void {
        
        this.area.left = validatedValue;

        // Place left points
        this.forPoints(this.leftSidePoints, point => {
            point.setXDirectly( validatedValue, PointPlacement.START );
        });

        // Update right points
        this.forPoints( this.rightSidePoints, point => {
            point.setXDirectly( this.right, PointPlacement.END );
        } )

    }

    protected onSetTop(validatedValue: number): void {
        
        this.area.top = validatedValue;

        this.forPoints(this.topSidePoints, point => {
            point.setYDirectly( validatedValue, PointPlacement.START );
        });

        this.forPoints( this.bottomSidePoints, point => {
            point.setYDirectly( this.bottom, PointPlacement.END );
        } );
    }

    protected onSetWidth(validatedValue: number): void {

        this.area.width = validatedValue;
        
        this.forPoints(this.leftSidePoints, point => {
            point.setXDirectly( this.left, PointPlacement.START );
        });

        this.forPoints( this.rightSidePoints, point => {
            point.setXDirectly( this.right, PointPlacement.END );
        } );


    }

    protected onSetHeight(validatedValue: number): void {

        this.area.height = validatedValue;
        
        this.forPoints( this.topSidePoints, point => {
            point.setYDirectly( this.top, PointPlacement.START );
        } );

        this.forPoints( this.bottomSidePoints, point => {
            point.setYDirectly( this.bottom, PointPlacement.END );
        } );


    }

    protected getVerticalDimensionFromNewValue(
        value: number,
        preferredSide: "top" | "bottom"
    ): { top: number, bottom: number, height: number } {

        const val = Math.round(value);

        const maxW = this.file.height - 1;

        const theOtherSide = preferredSide === "top"
            ? this.bottom
            : this.top

        // Negative value is allways 0
        if (val <= 0) {
            return {
                top: 0,
                bottom: theOtherSide,
                height: theOtherSide
            }
        }
        // Too large value is allways width - 1
        else if (val > maxW) {
            return {
                top: theOtherSide,
                bottom: maxW,
                height: maxW - theOtherSide
            }
        }
        // If prefers moving the right point...
        else if (preferredSide === "bottom") {

            if (val <= this.top) {
                return {
                    top: val,
                    bottom: this.top,
                    height: this.top - val
                }
            } else {
                return {
                    top: this.top,
                    bottom: val,
                    height: val - this.top
                }
            }

        }
        // If prefers moving the left point
        else {
            if (val >= this.bottom) {
                return {
                    top: this.bottom,
                    bottom: val,
                    height: val - this.bottom
                }
            } else {
                return {
                    top: val,
                    bottom: this.bottom,
                    height: this.bottom - val
                }
            }
        }

    }


    protected getHorizontalDimensionsFromNewValue(
        value: number,
        preferredSide: "left" | "right"
    ): { left: number, right: number, width: number } {

        const val = Math.round(value);

        const maxW = this.file.width - 1;

        const theOtherSide = preferredSide === "left"
            ? this.right
            : this.left

        // Negative value is allways 0
        if (val <= 0) {
            return {
                left: 0,
                right: theOtherSide,
                width: theOtherSide
            }
        }
        // Too large value is allways width - 1
        else if (val > maxW) {
            return {
                left: theOtherSide,
                right: maxW,
                width: maxW - theOtherSide
            }
        }
        // If prefers moving the right point...
        else if (preferredSide === "right") {

            if (val <= this.left) {
                return {
                    left: val,
                    right: this.left,
                    width: this.left - val
                }
            } else {
                return {
                    left: this.left,
                    right: val,
                    width: val - this.left
                }
            }

        }
        // If prefers moving the left point
        else {
            if (val >= this.right) {
                return {
                    left: this.right,
                    right: val,
                    width: val - this.right
                }
            } else {
                return {
                    left: val,
                    right: this.right,
                    width: this.right - val
                }
            }
        }

    }

    public get leftSidePoints(): CornerPoint[] {
        return Array.from( this.points.values() ).filter( point => point.isLeftSide );
    }

    public get rightSidePoints(): CornerPoint[] {
        return Array.from( this.points.values() ).filter( point => point.isRightSide );
    }

    public get topSidePoints(): CornerPoint[] {
        return Array.from( this.points.values() ).filter( point => point.isTopSide );
    }

    public get bottomSidePoints(): CornerPoint[] {
        return Array.from( this.points.values() ).filter( point => point.isBottomSide );
    }

    protected forPoints(points: CornerPoint[], fn: (point: CornerPoint) => void): void {
        points.forEach(point => fn(point));
    }


    public recievedSerialized(input: string): void {

        if ( ! this.serializedIsValid( input ) ) {
            return;
        }

        const splitted = input
            .split(";")
            .map(segment => segment.trim());

        let shouldRecalculate: boolean = false;

        const name = splitted[0];

        if (name !== this.name) {
            this.setName(name);
        }

        const avgOn = AbstractAnalysis.serializedSegmentsHasExact(splitted, "avg");

        if (avgOn !== this.graph.state.AVG) {
            this.graph.setAvgActivation(avgOn);
        }

        const minOn = AbstractAnalysis.serializedSegmentsHasExact(splitted, "min");

        if (minOn !== this.graph.state.MIN) {
            this.graph.setMinActivation(minOn);
        }

        const maxOn = AbstractAnalysis.serializedSegmentsHasExact(splitted, "max");

        if (maxOn !== this.graph.state.MAX) {
            this.graph.setMaxActivation(maxOn);
        }

        const color = AbstractAnalysis.serializedGetStringValueByKey(splitted, "color");

        if (color === undefined) {
            //
        } else if (color !== this.initialColor) {
            this.setInitialColor(color);
        }

        const top = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "top");
        const left = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "left");
        const width = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "width");
        const height = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "height");

        if (top !== undefined && top !== this.top) {

            this.setTop(top);
            shouldRecalculate = true;
        }

        if (left !== undefined && left !== this.left) {
            this.setLeft(left);
            shouldRecalculate = true;
        }

        if (width !== undefined && width !== this.width) {
            this.setWidth(width);
            shouldRecalculate = true;
        }

        if (height !== undefined && height !== this.height) {
            this.setHeight(height);
            shouldRecalculate = true;
        }

        if (shouldRecalculate) {
            this.recalculateValues();
        }


    }

    public toSerialized(): string {

        const output: string[] = [];

        output.push(this.name);
        output.push(this.getType());
        output.push(`color:${this.initialColor}`);
        output.push(`top:${this.top}`);
        output.push(`left:${this.left}`);
        output.push(`width:${this.width}`);
        output.push(`height:${this.height}`);

        if (this.graph.state.AVG) output.push("avg");
        if (this.graph.state.MIN) output.push("min");
        if (this.graph.state.MAX) output.push("max");

        return output.join(";");

    }


}