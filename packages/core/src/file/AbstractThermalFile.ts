import { BaseStructureObject } from "../base/BaseStructureObject";
import { ThermalGroup } from "../hierarchy/ThermalGroup";
import { ParsedFileBaseInfo } from "../loading/workers/parsers/structure";
import { AnalysisDrive } from "../properties/analysis/analysis/AnalysisDrive";
import { CallbacksManager } from "../properties/callbacksManager";
import { CursorValueDrive } from "../properties/cursor/CursorValueDrive";
import { TimelineDrive } from "../properties/time/playback/TimelineDrive";
import { RecordingDrive } from "../properties/time/recording/RecordingDrive";
import { InstanceDOM } from "./dom/InstanceDom";
import { AbstractRenderer } from "./render/AbstractRenderer";
import { CpuRenderer } from "./render/CpuRenderer";
import { GlRenderer } from "./render/GlRenderer";
import { FileMeta } from "./utils/FileMeta";

/** 
 * Displayable object for every file type.
 * 
 * This class takes care of the display fundamentals.
 * 
 * Most drivers are set in individual implementations, not here.
 */
export abstract class AbstractThermalFile extends BaseStructureObject {

    private _label?: string;
    public get label(): string | undefined {
        return this._label;
    }

    public setLabel(label: string | undefined) {
        if (this._label === label) {
            return;
        }
        this._label = label;
        this.onLabelChange.call(label);
    }

    public readonly onLabelChange = new CallbacksManager<(label: string | undefined) => void>();


    public readonly id: string;

    /** Internal limit for cursor label position */
    public readonly horizontalLimit: number;

    /** Internal limit for cursor label position */
    public readonly verticalLimit: number;

    /** Every file instance belongs to a group */
    public readonly group: ThermalGroup;

    /** Alias to the file group's registry */
    public get registry() { return this.group.registry; }

    /** Alias to the file group's registry's manager */
    public get manager() { return this.group.registry.manager; }

    /** Alias to the manager's pool object */
    public get pool() {
        return this.manager.pool;
    }

    /** The full URL of the thermal file */
    public readonly thermalUrl: string;

    private _visibleUrl?: string;
    public get visibleUrl(): string | undefined {
        return this._visibleUrl;
    }
    public readonly fileName: string;

    signature: string = "unknown";
    version: number = -1;
    streamCount: number = -1;
    fileDataType: number = -1;
    unit: number = -1;

    /** Stored core information. They may change in time because of filters. */
    public readonly meta: FileMeta;

    /** @deprecated Use meta instead */
    public get width(): number { return this.meta.current.width; }
    /** @deprecated Use meta instead */
    public get height(): number { return this.meta.current.height; }
    /** @deprecated Use meta instead */
    public get timestamp(): number { return this.meta.current.timestamp; }
    /** @deprecated Use meta instead */
    public get duration(): number { return this.meta.current.duration; }
    /** @deprecated Use meta instead */
    public get min(): number { return this.meta.current.min; }
    /** @deprecated Use meta instead */
    public get max(): number { return this.meta.current.max; }
    /** @deprecated Use meta instead */
    public get bytesize(): number { return this.meta.current.bytesize; }
    /** @deprecated Use meta instead */
    public get averageEmissivity(): number { return this.meta.current.averageEmissivity; }
    /** @deprecated Use meta instead */
    public get averageReflectedKelvins(): number { return this.meta.current.averageReflectedKelvins; }
    /** @deprecated Use meta instead */
    public get fps(): number { return this.meta.current.fps; }
    /** @deprecated Use meta instead */
    public get frameCount(): number { return this.meta.current.frameCount; }

    protected _dom?: InstanceDOM;
    public get dom() { return this._dom; }

    public readonly onMount = new CallbacksManager<() => void>();
    public readonly onUnmount = new CallbacksManager<() => void>();


    /** Renderer pro vykreslování do canvasu */
    protected renderer?: AbstractRenderer;


    public get hover() {
        if (this.dom)
            return this.dom.hover;
        return false;
    }

    // Drives
    public timeline!: TimelineDrive;
    public cursorValue!: CursorValueDrive;
    public analysis!: AnalysisDrive;
    public recording!: RecordingDrive;


    private _preferWebGl: boolean = true;
    public get preferWebGl() { return this._preferWebGl; }

    public switchToCPURenderer(): void {

        if ( this.renderer instanceof CpuRenderer ) {
            return;
        }

        this.renderer?.destroy();

        const container = this.dom?.root;

        this.unmountFromDom();

        this.mountToDom( container! );

        this.renderer = new CpuRenderer(this, this.dom!.canvasLayer!.canvas);

        this.renderer.init();

    }


    private _pixels: number[];
    private _pixelsVersion: number = 0;
    public get pixels() { return this._pixels; }
    /** Changes whenever pixels are supplied through setPixels, including reused arrays. */
    public get pixelsVersion() { return this._pixelsVersion; }
    public setPixels(value: number[]) {
        this._pixels = value;
        this._pixelsVersion++;
        this.onSetPixels(value);
    }

    public abstract getPixelsForHistogram(): number[];


    constructor(
        group: ThermalGroup,
        baseInfo: ParsedFileBaseInfo,
        initialPixels: number[],
        thermalUrl: string,
        visibleUrl?: string
    ) {
        super();
        this.group = group;
        this.id = this.formatId(thermalUrl);

        this.meta = new FileMeta(baseInfo);

        this.thermalUrl = thermalUrl;
        this._visibleUrl = visibleUrl;
        this.fileName = this.thermalUrl.substring(this.thermalUrl.lastIndexOf("/") + 1);

        this.horizontalLimit = (this.width / 4) * 3;
        this.verticalLimit = (this.height / 4) * 3;

        this._pixels = initialPixels;

    }


    /** 
     * Hotfix - remove the visible file
     * @used in FilePngExport - the PNG files are not being included in the PNG export. Since the data are transferred all to the export, I need to remove the visible file here.
     * @todo 
     */
    public removeVisibleFile(): this {
        this._visibleUrl = undefined;
        return this;
    }

    /**
     * Hotfix - set renderer preference to WebGl.
     * - true = prefer WebGl, 
     * - false = prefer CPU
     * This needs to be set before calling `mountToDom()` which creates the renderer.
     */
    public setPreferWebGl(
        value: boolean
    ): this {
        this._preferWebGl = value;
        return this;
    }


    /** Build properties for the thermal file */
    public abstract buildInternalProperties(): ThisType<AbstractThermalFile>;


    protected abstract onSetPixels(value: number[]): void;

    protected abstract formatId(thermalUrl: string): string;


    public abstract hydrateListener(
        dom: InstanceDOM
    ): void;

    public abstract dehydrateListener(
        dom: InstanceDOM
    ): void;







    private rendererFactory(
        canvas: HTMLCanvasElement
    ): AbstractRenderer {

        // If WebGL is preferred, try to return the renderer
        if (this._preferWebGl === true) {
            
            // Check if WebGL2 is available
            const gl = canvas.getContext('webgl2');
            if (gl) {
                return new GlRenderer(this, canvas);
            }

        }

        // Return the CPU renderer as fallback
        return new CpuRenderer(this, canvas);
    }



    public mountToDom(container: HTMLDivElement): void {

        // Delete any existing DOM binding
        if (this._dom !== undefined) {
            this._dom.destroy();
            this._dom = undefined;
        }

        // Append a new DOM binding
        this._dom = new InstanceDOM(this, container);

        this._dom.build();

        this.renderer = this.rendererFactory(this._dom.canvasLayer!.canvas);
        this.renderer.init();

        this._dom.hydrate();

    }

    public unmountFromDom(): void {

        this.renderer?.destroy();

        if (this.dom) {
            this.dom.destroy();
        }

        delete this._dom;
        this._dom = undefined;

    }

    /**
     * @todo The render needs to be a little delayed. This should be foxed so that the render happens immediately.
     */
    public async draw() {

        if (this.dom && this.dom.canvasLayer) {

            // The render needs to be delayed one tick to ensure all properties are updated
            await Promise.resolve();

            return await this.renderer?.render();

        }
    }

    /** Remove the entire DOM structure */
    public destroySelfAndBelow() {
        if (this.dom) {
            this.dom.destroy();
        }
    };

    /** Remove the entire DOM structure */
    public removeAllChildren() {
        this.destroySelfAndBelow();
    };



    public getTemperatureAtPoint(
        x: number,
        y: number
    ): number {

        const xx = Math.min(this.meta.width - 1, Math.max(0, x));
        const yy = Math.min(this.meta.height - 1, Math.max(0, y))


        const index = (yy * this.width) + xx;
        return this.pixels[index];

    }

    public getColorAtPoint(
        x: number,
        y: number
    ): string | undefined {

        const temperature = this.getTemperatureAtPoint(x, y);

        const min = this.group.registry.range.value?.from;
        const max = this.group.registry.range.value?.to;

        if (min !== undefined && max !== undefined) {
            const temperatureRelative = temperature - min;
            const temperatureAspect = temperatureRelative / (max - min);
            const colorIndex = Math.round(255 * temperatureAspect);
            return this.group.registry.palette.currentPalette.pixels[colorIndex]
        }

        return undefined;
    }

    public reset() { }

}
