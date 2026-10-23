import { AbstractAnalysis } from "../AbstractAnalysis";
import { AbstractPoint, PointPlacement } from "../AbstractPoint";

export class PointPoint extends AbstractPoint {
    

    public static size = 20;
    public static sizePx( aspect: number = 1 ) {
        return Math.round( PointPoint.size * aspect ).toString() + "px";
    }

    protected axisX?: HTMLDivElement;
    protected axisY?: HTMLDivElement;
    protected center?: HTMLDivElement;

    protected analyzeXFromTool(value: number): { x: number; placement: PointPlacement; } {
        return {
            x: value,
            placement: PointPlacement.MIDDLE
        }
    }

    protected analyzeYFromTool(value: number): { y: number; placement: PointPlacement; } {
        return {
            y: value,
            placement: PointPlacement.MIDDLE
        }
    }

    protected sideEffectOnXFromTool(): void {
        this.analysis.setLeft( this.x );
    }

    protected sideEffectOnYFromTool(): void {
        this.analysis.setTop( this.y );
    }


    public constructor(
        key: string,
        top: number,
        left: number,
        analysis: AbstractAnalysis,
        color: string
    ) {
        super(
            key,
            top,
            left,
            analysis,
            color,
            PointPlacement.MIDDLE,
            PointPlacement.MIDDLE
        )

        this.axisX = this.buildAxisX();
        this.axisY = this.buildAxisY();
        this.center = this.buildCenter();

        this.innerElement.appendChild( this.axisX );
        this.innerElement.appendChild( this.axisY );
        this.innerElement.appendChild( this.center );

        // Update the center color whenever the values move
        this.analysis.onValues.set( this.key, () => {
            
            const colorFromCurrentPalette = this.analysis.file.getColorAtPoint(this.x, this.y);
            
            if ( this.center && colorFromCurrentPalette ) {
                this.center.style.backgroundColor = colorFromCurrentPalette;
            }

        } );

    }


    public mayMoveToX(value: number): boolean {
        return value <= this.file.width && value >= 0;
    }


    public mayMoveToY(value: number): boolean {
        return value <= this.file.height && value >= 0;
    }


    createInnerElement(): HTMLDivElement {
        const element = document.createElement( "div" );

        element.classList.add( "innerElement" );

        element.style.position = "absolute";
        element.style.top = PointPoint.sizePx( -.5 );
        element.style.left = PointPoint.sizePx( -.5 );
        element.style.width = PointPoint.sizePx();
        element.style.height = PointPoint.sizePx();

        return element;
    }


    protected buildAxisX(): HTMLDivElement {
        const axis = document.createElement( "div" );
        axis.style.position = "absolute";
        axis.style.width = "100%";
        axis.style.height = "1px";
        axis.style.left = "0px";
        axis.style.top = PointPoint.sizePx( .5 );
        return axis;
    }


    protected buildAxisY(): HTMLDivElement {
        const axis = document.createElement( "div" );
        axis.style.position = "absolute";
        axis.style.width = "1px";
        axis.style.height = "100%";
        axis.style.left = PointPoint.sizePx( .5 );
        axis.style.top = "0px";
        return axis;
    }


    protected buildCenter(): HTMLDivElement {
        
        const center = document.createElement( "div" );
        center.style.position = "absolute";
        center.style.top = `calc( ${PointPoint.sizePx(.5)} - 3px )`;
        center.style.left = `calc( ${PointPoint.sizePx(.5)} - 3px )`;;
        center.style.width = "5px";
        center.style.height = "5px";
        center.style.borderStyle = "solid";
        center.style.borderWidth = "1px";

        const currentColor = this.analysis.file.getColorAtPoint( this.x, this.y )
        if ( currentColor )
            center.style.backgroundColor = currentColor;

        return center;
    }


    protected onSetColor(value: string): void {
        if ( this.axisX ) {
            this.axisX.style.backgroundColor = value;
        }
        if ( this.axisY ) {
            this.axisY.style.backgroundColor = value;
        }
        if ( this.center ) {
            this.center.style.borderColor = value;
        }
    }


    protected actionOnMouseEnter(): void {
        if ( this.isInSelectedLayer() ) {
            this.setColor( this.activeColor);
            this.setBoxShadow( "white")
        }
        
    }


    protected actionOnMouseLeave(): void {
        if (this.isInSelectedLayer()) {
            this.setColor( this.analysis.initialColor );
        } else {
            this.setColor( this.inactiveColor );
        }
        this.setBoxShadow( undefined)
    }


    protected actionOnActivate(): void {
        if ( this.innerElement ) {
            this.setColor( this.activeColor );
        }
    }


    protected actionOnDeactivate(): void {
        if ( this.innerElement ) {
            this.setColor( this.inactiveColor );
        }
    }
    

    public getRadius(): number {
        return 10;
    }


    protected setBoxShadow(
        color: string | undefined = undefined
    ) {
        if ( color === undefined ) {
            this.axisX?.style.removeProperty( "box-shadow" );
            this.axisY?.style.removeProperty( "box-shadow" );
            this.center?.style.removeProperty( "box-shadow" );
        } else {
            const shadow = `0 0 5px 2px ${color}`;
            if ( this.axisX ) this.axisX.style.boxShadow = shadow;
            if ( this.axisY ) this.axisY.style.boxShadow = shadow;
            if ( this.center ) this.center.style.boxShadow = shadow;
        }
    }


}