import { InstanceDOM } from "../InstanceDom";
import ThermalDomFactory from "../domFactories";
import { AbstractLayer } from "./AbstractLayer";

/** Contains the visible image. Needs to be placed on the bottom. */
export class VisibleLayer extends AbstractLayer {

    protected container: HTMLDivElement;
    protected image?: HTMLImageElement;

    public get url() {
        return this._url;
    }
    public set url(value: string|undefined) {
        this._url = value;
        if ( this.image && value ) {
            this.image.src = value;
        }
    }

    public get exists() {
        return this._url !== undefined;
    }

    public constructor(
        dom: InstanceDOM,
        public _url?: string
    ) {
        super(dom);
        this.container = ThermalDomFactory.createVisibleLayer();
        if (this._url) {
            this.image = ThermalDomFactory.createVisibleImage();
            this.url = this._url;
            this.container.appendChild(this.image);
        }
    }

    public getLayerRoot(): HTMLElement {
        return this.container;
    }

    protected onDestroy(): void {
        if (this.image) this.image.remove();
        this.container.remove();
    }



}