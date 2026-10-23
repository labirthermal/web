import { AbstractThermalFile } from "../AbstractThermalFile";
import { ThermalCanvasLayer } from "./layers/thermalCanvasLayer";
import ThermalCursorLayer from "./layers/thermalCursorLayer";
import { ThermalListenerLayer } from "./layers/thermalListenerLayer";
import { VisibleLayer } from "./layers/VisibleLayer";

export class InstanceDOM {

    static CLASS_BASE = "thermalImageRoot";
    static CLASS_BUILT = InstanceDOM.CLASS_BASE + "__built";
    static CLASS_HYDRATED = InstanceDOM.CLASS_BASE + "__mounted";
    static CLASS_HOVER = InstanceDOM.CLASS_BASE + "__hover";

    protected _built = false;
    public get built() { return this._built; }
    protected setBuilt(value: boolean) {
        this._built = value;

        if (value === true) {

            // Identification
            this.root.classList.add(InstanceDOM.CLASS_BUILT);
            this.root.dataset.built = "true";

            // Style
            this.root.style.transition = "border-color .1s ease-in-out";
            this.root.style.zIndex = "10";
            this.root.style.position = "relative";
            this.root.style.lineHeight = "0";

            this.parent.onMount.call();

        } else {

            // Identification
            this.root.classList.remove(InstanceDOM.CLASS_BUILT);
            delete this.root.dataset.built;

            // Styles
            this.root.style.removeProperty("transition");
            this.root.style.removeProperty("zIndex");
            this.root.style.removeProperty("position");
            this.root.style.removeProperty("lineHeight");

            this.parent.onUnmount.call();

        }

    }

    protected _hydrated = false;
    public get hydrated() { return this._hydrated; }
    protected setHydrated(value: boolean) {
        this._hydrated = value;
        if (value === true) {
            this.root.classList.add(InstanceDOM.CLASS_HYDRATED);
            this.root.dataset.hydrated = "true";
        } else {
            this.root.classList.remove(InstanceDOM.CLASS_HYDRATED);
            delete this.root.dataset.hydrated;
        }
    }

    private _hover: boolean = false;
    public get hover() { return this._hover; }
    public setHover(value: boolean) {
        this._hover = value;
        if (value === true) {
            this.root.classList.add(InstanceDOM.CLASS_HOVER);
            this.root.dataset.hover = "true";
        } else {
            this.root.classList.remove(InstanceDOM.CLASS_HOVER);
            delete this.root.dataset.hover;
        }
    }

    // Layers

    /** The layer holding the canvas element and also analysis DOM */
    protected _canvasLayer?: ThermalCanvasLayer;
    public get canvasLayer() { return this._canvasLayer; }

    /** Visible layer holding an eventual visible object */
    protected _visibleLayer?: VisibleLayer;
    public get visibleLayer() { return this._visibleLayer; }

    /** Cursor layer will draw the cursor and its label on top of everything */
    protected _cursorLayer?: ThermalCursorLayer;
    public get cursorLayer() { return this._cursorLayer; }

    /** Listener layer is on top of everything and it handles all mouse events */
    protected _listenerLayer?: ThermalListenerLayer;
    public get listenerLayer() { return this._listenerLayer; }



    public constructor(
        public readonly parent: AbstractThermalFile,
        public readonly root: HTMLDivElement
    ) {

        this.root.classList.add(InstanceDOM.CLASS_BASE);
        this.root.dataset.thermalInstanceId = this.parent.id;
        this.root.dataset.thermalInstanceUrl = this.parent.thermalUrl;

    }

    /**
     * Use the parent's create inner method to build and assign all inner DOM
     */
    public build() {

        if (this.root !== null && this.built === true) {
            console.info(`Building instance ${this.parent.id} which is already built. Destroying any previous DOM and creating a new one in a new container ${this.root.nodeName}`);
            this.destroy();
        }


        // Build the DOM
        this._canvasLayer = new ThermalCanvasLayer(this);
        this._visibleLayer = new VisibleLayer(this, this.parent.visibleUrl);
        this._cursorLayer = new ThermalCursorLayer(this);
        this._listenerLayer = new ThermalListenerLayer(this);
        

        // Mounting layers internals
        this._canvasLayer.mount();
        this._visibleLayer.mount();
        this._cursorLayer.mount();
        this._listenerLayer.mount();


        // Append DOM
        this.root.appendChild(this._visibleLayer.getLayerRoot());
        this.root.appendChild(this._canvasLayer.getLayerRoot());
        this.root.appendChild(this._cursorLayer.getLayerRoot());
        this.root.appendChild(this._listenerLayer.getLayerRoot());

        // Mark as built
        this.setBuilt(true);

    }

    /** Destroy the entire DOM and remove all listeners */
    public destroy() {

        // Do the action only when the DOM is already built
        if (this.built === true) {

            if (this._canvasLayer) {
                this._canvasLayer.unmount();
                delete this._canvasLayer;
                this._canvasLayer = undefined;
            }

            if (this._visibleLayer) {
                this._visibleLayer.unmount();
                delete this._visibleLayer;
                this._visibleLayer = undefined;
            }

            if (this._cursorLayer) {
                this._cursorLayer.unmount();
                delete this._cursorLayer;
                this._cursorLayer = undefined;
            }

            if (this._listenerLayer) {

                // Dehydrate first
                if (this.hydrated === true) {
                    this.dehydrate();
                }

                // Then remove the DOM and attribute
                this._listenerLayer.unmount();
                delete this._listenerLayer;
                this._listenerLayer = undefined;
            }

            // Mark as not-built
            this.setBuilt(false);

            this.root.classList.remove(InstanceDOM.CLASS_BASE);
            delete this.root.dataset.thermalInstanceId;
            delete this.root.dataset.thermalInstanceUrl;

            this.root.innerHTML = "";

        }

    }

    /** Activate all listeners */
    public hydrate() {

        // Indicate if listener layer is not yet active
        if (this.listenerLayer === undefined) {
            console.error(`Instance ${this.parent.thermalUrl} does not have a listener layer yet when trying to hydrate! Stopping hydration.`);
            return;
        }

        // If already hydrated, dehydrate first
        if (this.hydrated === true) {
            this.dehydrate();
        }

        this.parent.hydrateListener(this);


        this.setHydrated(true);
    }

    /** Deactivate all listeners */
    public dehydrate() {

        // Indicate if not hydrated
        if (this.hydrated === false) {
            console.error(`Trying to dehydrate the instance ${this.parent.thermalUrl} which is not yet hydrated!}`);
            return;
        }

        // Indicate if thermal listener is not yet created
        if (this.listenerLayer === undefined) {
            console.error(`Trying to dehydrate the instance ${this.parent.thermalUrl} which does not have a listener layer yet!`);
            return;
        }

        this.parent.dehydrateListener(this);

        this.setHydrated(false);

    }

}