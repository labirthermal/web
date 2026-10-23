import { PointPlacement } from "../AbstractPoint";
import { AbstractHandlePoint } from "./AbstractHandlePoint";

export class CornerPoint extends AbstractHandlePoint {


    protected _pairX!: CornerPoint;
    protected _pairY!: CornerPoint;

    public get pairX(): CornerPoint { return this._pairX; };
    public get pairY(): CornerPoint { return this._pairY; };

    public setPairX(point: CornerPoint): void {
        this._pairX = point;
    }

    public setPairY(point: CornerPoint): void {
        this._pairY = point;
    }



    public getRadius(): number {
        return 10;
    }

    public mayMoveToX(value: number): boolean {
        return value <= this.file.width && value >= 0;
    }

    public mayMoveToY(value: number): boolean {
        return value <= this.file.height && value >= 0;
    }

    private getCenterX() {
        return this.analysis.left + (this.analysis.width / 2);
    }

    private getCenterY() {
        return this.analysis.top + (this.analysis.height / 2);
    }





    public get isLeftSide() {
        return this.x <= this.getCenterX();
    }

    public get isTopSide() {
        return this.y <= this.getCenterY();
    }

    public get isRightSide() {
        return this.x > this.getCenterX();
    }

    public get isBottomSide() {
        return this.y > this.getCenterY();
    }


    protected analyzeXFromTool(value: number): { x: number; placement: PointPlacement; } {

        const placement = this.isLeftSide
            ? PointPlacement.START
            : PointPlacement.END;

        return {
            x: value,
            placement
        }
    }

    protected analyzeYFromTool(value: number): { y: number; placement: PointPlacement; } {

        const placement = this.isTopSide
            ? PointPlacement.START
            : PointPlacement.END
        return {
            y: value,
            placement
        }
    }

    protected sideEffectOnXFromTool(value: number, placement: PointPlacement): void {
        
        this.pairX.setXDirectly(value, placement);

        if (value > this.pairY.x) {

            this.analysis.leftSidePoints.forEach( p => {
                p.setXDirectly( p.x, PointPlacement.START );
            } );

        } else {
            this.analysis.rightSidePoints.forEach( p => {
                p.setXDirectly( p.x, PointPlacement.END );
            } );
        }

    }

    protected sideEffectOnYFromTool(value: number, placement: PointPlacement): void {

        this.pairY.setYDirectly(value, placement);

        if ( value > this.pairX.y ) {

            this.analysis.topSidePoints.forEach( p => {
                p.setYDirectly( p.y, PointPlacement.START );
            } );

        } else {

            this.analysis.bottomSidePoints.forEach( p => {
                p.setYDirectly( p.y, PointPlacement.END );
            } );

        }
    }







    public isMoving: boolean = false;
    protected onSetColor(value: string): void {
        if (this.innerElement)
            this.innerElement.style.backgroundColor = value;
    }

    protected actionOnActivate(): void {
        if (this.innerElement) {
            this.setColor(this.activeColor);
        }
    }


    protected actionOnDeactivate(): void {
        if (this.innerElement) {
            this.setColor(this.isInSelectedLayer()
                ? this.initialColor
                : this.inactiveColor
            );
        }
    }



}