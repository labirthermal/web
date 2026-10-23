import { ThermalRegistry } from "../../hierarchy/ThermalRegistry";
import { AbstractThermalFile } from "../AbstractThermalFile";

export abstract class AbstractRenderer {

    private _initialised: boolean = false;
    public get initialised(): boolean {
        return this._initialised;
    }


    protected get registry(): ThermalRegistry {
        return this.file.group.registry;
    }

    /** Alias vedoucí na šířku syrového termogramu */
    protected get width(): number {
        return this.file.width;
    }

    /** Alias vedoucí na výšku syrového termogramu */
    protected get height(): number {
        return this.file.height;
    }

    /** Alias vedoucí na současné FROM teplotního rozsahu */
    protected get from(): number {
        if ( this.registry.range.value === undefined ) {
            return this.file.min;
        }
        return this.registry.range.value.from;
    }

    /** Alias vedoucí na současné TO teplotního rozsahu */
    protected get to(): number {
        if ( this.registry.range.value === undefined ) {
            return this.file.max;
        }
        return this.registry.range.value.to;
    }

    protected get palette() {
        return this.registry.palette.currentPalette.pixels;
    }

    constructor(
        protected readonly file: AbstractThermalFile,
        /** Canvas musí být vytvořený před inicializací rendereru */
        protected readonly canvas: HTMLCanvasElement
    ) {}

    /** Inicializace rendereru - vytvoření patřičných listenerů či shaderů atd... */
    public async init(): Promise<void> {
        if ( this.initialised ) {
            console.warn( `Renderer of ${this.file.id} is already initialised` );
            return;
        }
        const initResult = await this.onInit();
        if ( initResult ) {
            this._initialised = true;
            await this.render();
            return;
        } else {
            console.warn( `Renderer of ${this.file.id} failed to initialise` );
        }
    }

    /** Vlastní inicializace je asynchronní a vrací boolean */
    protected abstract onInit(): Promise<boolean>;

    /** Vykreslení probíhá pouze pokud je rendererr inicializován */
    public async render(): Promise<void> {

        if ( ! this.initialised ) {
            console.warn( `Renderer of ${this.file.id} is not initialised` );
            return;
        }

        return await this.executeRender();

    }

    /** Vykonání vlastního renderu do canvasu */
    protected abstract executeRender(): Promise<void>;

    /** Funkce volaná při zničení canvasu */
    public abstract destroy(): Promise<void>;

}