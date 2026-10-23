import { AbstractAnalysis } from "../AbstractAnalysis";

export abstract class AbstractArea {

    private pxX: number;
    private pxY: number;

    public get fileWidth() {
        return this.analysis.file.width;
    }

    public get fileHeight() {
        return this.analysis.file.height;
    }

    public get root() {
        return this.analysis.layerRoot;
    }

    protected element!: HTMLDivElement;


    protected _top!: number;
    protected _width!: number;
    protected _left!: number;
    protected _height!: number;

    public get top() {return this._top;}
    public set top( value: number ) {
        this._top = value;
        if ( this.element ) {
            this.element.style.top = `${this._top / this.fileHeight * 100}%`;
        }
    }


    public get left() { return this._left; }
    public set left( value: number ) {
        this._left = value;
        if ( this.element ) {
            this.element.style.left = `${this._left / this.fileWidth * 100}%`;
        }
    }

    public get height() {
        return this._height;
    }
    public set height( value ) {
        this._height = value;
        if ( this.element ) {
            this.element.style.height = `calc( ${( this.height ) / this.fileHeight * 100 }% + ${this.pxY}% )`;
        }
    }

    public get width() {
        return this._width;
    }
    public set width( value: number ) {
        this._width = value;
        if ( this.element ) {
            this.element.style.width = `calc( ${(this.width) / this.fileWidth * 100}% + ${this.pxX}% )`;
        }
    }


    public get center() {
        return {
            x: this.left + (this.width / 2),
            y: this.top + (this.height / 2)
        }
    }

    constructor(
        public readonly analysis: AbstractAnalysis,
        top: number,
        right: number,
        left: number,
        bottom: number
    ) {

        this.pxX = 100 / this.analysis.file.width;
        this.pxY = 100 / this.analysis.file.height;

        this.build();

        this.top = top;
        this.left = left;
        this.width = right;
        this.height = bottom;

    }

    public build() {

        this.element = document.createElement( "div" );

        this.element.style.position = "absolute";

        this.onBuild();

        this.root.appendChild( this.element );



    }

    abstract onBuild(): void;

    setColor( value: string ) {
        this.onSetColor(value);
    }

    abstract onSetColor( value: string ): void;

}