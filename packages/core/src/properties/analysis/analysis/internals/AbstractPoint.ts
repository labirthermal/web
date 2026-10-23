import { CallbacksManager } from "../../../callbacksManager";
import { AbstractAnalysis } from "./AbstractAnalysis";
import { PointAnalysis } from "./point/PointAnalysis";


export enum PointPlacement {
    START = 1,
    MIDDLE = 2,
    END = 3
}

export abstract class AbstractPoint {

    public get file() {
        return this.analysis.file;
    }

    private pxX: number;
    private _x: number;
    public get x() {
        return this._x;
    }
    public onX = new CallbacksManager<(x: number, prev: number) => void>
    public abstract mayMoveToX(value: number): boolean;




    private pxY: number;
    private _y: number;
    public get y() {
        return this._y;
    }
    public onY = new CallbacksManager<(y: number, prev: number) => void>
    public abstract mayMoveToY(value: number): boolean;


    /** 
     * Recieves X from the tool. 
     * 
     * Needs to determine the placement using `analyzeXFromTool`. 
     * Calls `sideEffectOnXFromTool`.
     */
    public setXFromTool( value: number ): void {

        const { x, placement } = this.analyzeXFromTool( value );


        if ( this.mayMoveToX( x ) ) {

            const prev = this.x;
            this._x = x;

            const style = this.getXStyle( x, placement );
            this.container.style.left = style;

            this.sideEffectOnXFromTool( x, placement );

            this.onX.call( this.x, prev );

        }

    }


    /** Recieves the X directly, along with the placement, with no side effects. */
    public setXDirectly( value: number, placement: PointPlacement ): void {

        if ( this.mayMoveToX( value ) ) {

            const prev = this.x;
            this._x = value;

            const style = this.getXStyle(value, placement);

            this.container.style.left = style;

            this.onX.call( this.x, prev );

        }
    }


    /** 
     * Recieves Y from the tool. 
     * 
     * Needs to determine the placement using `analyzeYFromTool`. 
     * Calls `sideEffectOnYFromTool`.
     */
    public setYFromTool( value: number ): void {

        const { y, placement } = this.analyzeYFromTool( value );

        if ( this.mayMoveToY( y ) ) {

            const prev = this.y;
            this._y = y;

            const style = this.getYStyle( y, placement );
            this.container.style.top = style;

            this.sideEffectOnYFromTool( y, placement );

            this.onY.call( this.y, prev );

        }

    }

    /** Recieves the Y directly, along with the placement, with no side effects. */
    public setYDirectly( value: number, placement: PointPlacement ): void {
        if ( this.mayMoveToY( value ) ) {

            const prev = this.y;
            this._y = value;

            const style = this.getYStyle(value, placement);
            this.container.style.top = style;

            this.onY.call( this.y, prev );

        }
    }

    /** Format the `left` style from given position and placement */
    private getXStyle( value: number, placement: PointPlacement ): string {

        const percent = this.calculatePercentageX( value );
        const offset = placement === PointPlacement.START
            ? 0
            : placement === PointPlacement.END
                ? this.pxX
                : this.pxX / 2;

        return this.formatPositionStyle( percent, offset );

    }

    private getYStyle( value: number, placement: PointPlacement): string {

        const percent = this.calculatePercentageY( value );
        const offset = placement === PointPlacement.START
            ? 0
            : placement === PointPlacement.END
                ? this.pxY
                : this.pxY / 2;

        return this.formatPositionStyle( percent, offset );

    }

    /** Convert a percentage and a offset in pixels into a CSS style string */
    private formatPositionStyle(
        percent: number,
        offsetInPx: number
    ): string {

        if ( offsetInPx === 0 || isNaN( offsetInPx ) ) {
            return `${percent}%`;
        }

        return `calc( ${percent}% + ${offsetInPx}% )`;

    }

    protected abstract analyzeXFromTool(value: number): { x: number, placement: PointPlacement };
    protected abstract sideEffectOnXFromTool( value: number, placement: PointPlacement ): void;

    protected abstract analyzeYFromTool( value: number ): { y: number, placement: PointPlacement };
    protected abstract sideEffectOnYFromTool(value: number, placement: PointPlacement): void;



    protected _color: string;
    protected get color() { return this._color; }
    public setColor(value: string) {
        this._color = value;
        this.onSetColor(value);
    }
    protected abstract onSetColor(value: string): void;
    public get initialColor(): string {
        return this.analysis.initialColor;
    }
    public get activeColor() {
        return PointAnalysis.COLOR_ACTIVE;
    };
    public get inactiveColor() {
        return PointAnalysis.COLOR_INACTIVE;
    };


    protected _active: boolean = false;
    public get active() {
        return this._active;
    }

    protected _isHover: boolean = false;
    public get isHover() {
        return this._isHover;
    }

    protected _isDragging: boolean = false;
    public get isDragging() {
        return this._isDragging;
    }

    public get root() {
        return this.analysis.layerRoot;
    }

    /** Get the size of the point's area in the file's listener layer. The active area serves for emulation of PointerEvents of this point. */
    public abstract getRadius(): number;

    /** The container is allways positioned by percents. The container dimension is allways 1x1. The container contains the inner element which handles the display. */
    container: HTMLDivElement;

    /** The display element. */
    innerElement: HTMLDivElement;

    public constructor(
        public readonly key: string,
        top: number,
        left: number,
        public readonly analysis: AbstractAnalysis,
        color: string,
        placementX: PointPlacement,
        placementY: PointPlacement
    ) {

        this.pxX = 100 / this.analysis.file.width;
        this.pxY = 100 / this.analysis.file.height;

        // Set values internally first
        this._x = left;
        this._y = top;
        this._color = color;

        // Create the container
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.id = `analysis_${this.analysis.key}_${this.key}_${this.file.id}`;


        // Create the inner element
        this.innerElement = this.createInnerElement();
        this.container.appendChild(this.innerElement);

        // Set the color again once the inner element is created
        this.setColor(color);

        // Call the position setter initially
        this.setXDirectly(left, placementX);
        this.setYDirectly(top, placementY);

        // Display the point
        this.root.appendChild(this.container);


    }

    public isWithin(top: number, left: number): boolean {

        const offset = this.getRadius() / 2;

        const minX = this.x - offset;
        const maxX = this.x + offset;
        const minY = this.y - offset;
        const maxY = this.y + offset;

        return left >= minX
            && left <= maxX
            && top >= minY
            && top <= maxY;

    }

    public isInSelectedLayer() {
        return this.analysis.selected;
    }



    private calculatePercentageX(value: number) {
        return value / this.analysis.file.width * 100;
    }

    private calculatePercentageY(value: number) {
        return value / this.analysis.file.height * 100;
    }



    /** @deprecated */
    protected getPercentageX() {
        return this.x / this.analysis.file.width * 100;
    }

    /** @deprecated */
    protected getPercentageY() {
        return this.y / this.analysis.file.height * 100;
    }

    protected getPercentageCoordinates() {
        const x = this.getPercentageX();
        const y = this.getPercentageY();
        return {
            x,
            y
        }
    }

    /** Create the display element */
    abstract createInnerElement(): HTMLDivElement;

    public mouseEnter() {
        if (this.isHover === false) {
            this._isHover = true;
            this.actionOnMouseEnter();
            this.onMouseEnter.call(this);
        }
    }

    public mouseLeave() {
        if (this.isHover === true) {
            this._isHover = false;
            this.actionOnMouseLeave();
            this.onMouseLeave.call(this);
        }
    }

    public readonly onMouseEnter = new CallbacksManager<(point: ThisType<AbstractPoint>) => void>;
    public readonly onMouseLeave = new CallbacksManager<(point: ThisType<AbstractPoint>) => void>;

    public readonly onActivate = new CallbacksManager<(point: ThisType<AbstractPoint>) => void>;
    public readonly onDeactivate = new CallbacksManager<(point: ThisType<AbstractPoint>) => void>;

    protected abstract actionOnMouseEnter(): void;

    protected abstract actionOnMouseLeave(): void;

    protected abstract actionOnActivate(): void;

    protected abstract actionOnDeactivate(): void;

    public activate() {
        this._active = true;
        this.actionOnActivate();
    }

    public deactivate() {
        this._active = false;
        this.actionOnDeactivate();
    }

}