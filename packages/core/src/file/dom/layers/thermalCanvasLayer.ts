import ThermalDomFactory from "../domFactories";
import { InstanceDOM } from "../InstanceDom";
import { AbstractLayer } from "./AbstractLayer";


/** Displays the canvas and renders it */
export class ThermalCanvasLayer extends AbstractLayer {

    private container: HTMLDivElement;
    public readonly canvas: HTMLCanvasElement;

    private _opacity: number = 1;
    public get opacity() { return this._opacity; }
    public set opacity(value: number) {

        if ( 
            this.instance.visibleUrl === null 
            || this.instance.visibleUrl === undefined
            || this.instance.visibleUrl.trim().length === 0
        ) {
            return;
        }


        this._opacity = Math.max(Math.min(value, 1), 0);
        if (this._opacity !== 1)
            this.canvas.style.opacity = this._opacity.toString();
        else {
            this.canvas.style.removeProperty("opacity");
        }
    }

    public constructor(
        dom: InstanceDOM
    ) {

        super(dom);

        this.container = ThermalDomFactory.createCanvasContainer();

        this.canvas = ThermalDomFactory.createCanvas();
        this.canvas.width = this.instance.width;
        this.canvas.height = this.instance.height;
        this.canvas.setAttribute("data-video-canvas", "");
        this.canvas.setAttribute( "crossorigin", "anonymous" );
        this.canvas.setAttribute( "crossOrigin", "Anonymous" );


        this.container.appendChild(this.canvas);

        this.opacity = this.instance.group.registry.opacity.value;

    }

    public getLayerRoot(): HTMLElement {
        return this.container;
    }

    protected onDestroy(): void {
        this.canvas.remove();
        this.container.remove();
    }


}