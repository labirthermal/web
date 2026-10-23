import { InstanceDOM } from "../InstanceDom";

export abstract class AbstractLayer {

    public get instance() { return this.dom.parent; }

    public constructor(
        public readonly dom: InstanceDOM
    ) {}

    public abstract getLayerRoot(): HTMLElement;

    protected _mounted = false;
    public get mounted() { return this._mounted; }

    public mount() {
        if ( !this._mounted )
        if ( this.dom.root !== null ) {
            this._mounted = true;
            this.dom.root.appendChild( this.getLayerRoot() );
        }
    }

    public unmount() {
        if ( this._mounted )
        if ( this.dom.root !== null ) {
            this._mounted = false;
            this.dom.root.removeChild( this.getLayerRoot() );
        }
    }

    public destroy(): void {
        this.onDestroy();
    }

    protected abstract onDestroy(): void;

}