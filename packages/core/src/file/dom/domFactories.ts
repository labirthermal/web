
export default class ThermalDomFactory {

    public static createCanvasContainer(): HTMLDivElement {
        const container = document.createElement( "div" );
        container.classList.add( "thermalCanvasWrapper" );
        // container.style.transition = "opacity 300ms ease-in-out";
        container.style.position = "relative";
        // container.part.add( "thermal-canvas" );
        container.style.userSelect = "none";
        container.part = "thermal-canvas-wrapper";
        return container;
    }

    public static createCanvas(): HTMLCanvasElement {
        const canvas = document.createElement( "canvas" );
        canvas.classList.add( "thermalCanvas" );
        canvas.style.padding = "0px";
        canvas.style.margin = "0px";
        canvas.style.objectFit = "contain";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.objectPosition = "top left";
        canvas.style.imageRendering = "pixelated";
        // canvas.style.cursor = "crosshair";
        //canvas.style.transition = "opacity 300ms ease-in-out";
        canvas.style.userSelect = "none";
        canvas.part ="thermal-file-canvas";
        return canvas;
    }

    public static createDateLayerInner(): HTMLDivElement {
        const inner = document.createElement( "div" );
        inner.classList.add("dateLayerInner" );
        inner.style.margin = "0px";
        inner.style.padding = ".3rem 0rem";
        inner.style.backgroundColor = "black";
        inner.style.color = "white";
        inner.style.borderRadius = ".5rem .5rem 0 0";
        inner.style.width = "calc(100% + 4px )";
        inner.style.position = "absolute";
        inner.style.top = "0rem";
        inner.style.left = "-2px";
        // inner.style.transform = "scale(.5)";
        inner.style.opacity = "0";
        inner.style.transition = "opacity .1s ease-in-out";
        inner.style.textAlign = "center";
        inner.style.userSelect = "none";
        return inner;
    }

    public static createVisibleLayer(): HTMLDivElement {
        const layer = document.createElement( "div" );
        layer.classList.add( "visibleLayer" );
        layer.style.margin = "0px";
        layer.style.padding = "0px";
        layer.style.height = "100%";
        layer.style.width = "100%";
        layer.style.position = "absolute";
        layer.style.top = "0px";
        layer.style.left = "0px";
        layer.style.userSelect = "none";
        // layer.style.transition = "opacity 300ms ease-in-out";
        return layer;
    }

    public static createVisibleImage(): HTMLImageElement {
        const img = document.createElement( "img" );
        img.classList.add( "visibleLayerImage" );
        img.style.padding = "0px";
        img.style.margin = "0px";
        img.style.objectFit = "contain";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectPosition = "top left";
        img.style.userSelect = "none";
        // canvas.style.cursor = "crosshair";
        return img;
    }



    public static createListener(): HTMLDivElement {
        const listener = document.createElement( "div" );
        listener.classList.add( "thermalListener" );
        listener.style.margin = "0px";
        listener.style.padding = "0px";
        listener.style.height = "100%";
        listener.style.width = "100%";
        listener.style.position = "absolute";
        listener.style.top = "0px";
        listener.style.left = "0px";
        listener.style.cursor = "pointer";
        listener.style.touchAction = "none";
        listener.style.userSelect = "none";
        listener.setAttribute( "id", ( Math.random() ).toString() );

        return listener;
    }


    public static createCursorLayerRoot(): HTMLDivElement {
        const layer = document.createElement( "div" );
        layer.classList.add( "cursorLayerRoot" );
        layer.style.width = "100%";
        layer.style.height = "100%";
        layer.style.position = "absolute";
        layer.style.top = "0";
        layer.style.left = "0";
        layer.style.opacity = "0";
        layer.style.overflow = "hidden";
        layer.style.lineHeight = "1rem";
        layer.style.userSelect = "none";
        return layer;
    }

    public static createCursorLayerCenter(): HTMLDivElement {
        const container = document.createElement( "div" );
        container.classList.add( "cursorLayerCenter" );
        container.style.position = "absolute";
        container.style.top = "0px";
        container.style.left = "0px";
        container.style.width = "0px";
        container.style.height = "0px";
        container.style.userSelect = "none";
        // container.style.transition = "all 50ms ease-in-out";
        return container;
    }

    protected static createCursorLayerAxeBase(): HTMLDivElement {
        const axe = document.createElement( "div" );
        axe.classList.add( "cursorLayerAxe" );
        axe.style.backdropFilter = "invert(100)";
        axe.style.position = "absolute";
        axe.style.top = "0px";
        axe.style.left = "0px";
        axe.style.content = "";
        axe.style.userSelect = "none";
        return axe;
    }

    public static createCursorLayerX(): HTMLDivElement {
        const axeX = ThermalDomFactory.createCursorLayerAxeBase();
        axeX.classList.add( "cursorLayerAxeX" );
        axeX.style.width = "1px";
        axeX.style.height = "20px";
        axeX.style.top = "-10px";
        axeX.style.userSelect = "none";
        return axeX;
    }

    public static createCursorLayerY(): HTMLDivElement {
        const axeY = ThermalDomFactory.createCursorLayerAxeBase();
        axeY.classList.add( "cursorLayerAxeY" );
        axeY.style.width = "20px";
        axeY.style.height = "1px";
        axeY.style.left = "-10px";
        axeY.style.userSelect = "none";
        return axeY;
    }

    public static createCursorLayerLabel(): HTMLDivElement {
        const axeLabel = document.createElement( "div" );
        axeLabel.classList.add( "cursorLayerLabel" );
        axeLabel.style.position = "absolute";
        axeLabel.style.padding = "1px 3px";
        axeLabel.style.backgroundColor = "rgba( 0,0,0,0.5 )";
        axeLabel.style.color = "white";
        axeLabel.style.whiteSpace = "nowrap";
        axeLabel.style.fontSize = "small";
        axeLabel.style.borderRadius = "5px";
        axeLabel.style.userSelect = "none";
        return axeLabel;
    }

}