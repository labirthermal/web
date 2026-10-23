import domtoimage from 'dom-to-image';
import { CallbacksManager } from "../properties/callbacksManager";

export type AbstractExportProps = {
    fileName?: string,
    width?: number,
    fontSize?: number,
    textColor?: string,
    backgroundColor?: string,
    showAnalysis?: boolean,

    showFileName?: boolean,
    showFileDate?: boolean,

    showThermalScale?: boolean,
    author?: string,
    license?: string,
}

export type AbstractExportTypeMandatory = {
    fileName: string,
    width: number,
    fontSize: number,
    textColor: string,
    backgroundColor: string,
    showAnalysis: boolean,
    showFileName: boolean,
    showFileDate: boolean,
    showThermalScale: boolean,
    author?: string,
    license?: string,
}

export abstract class AbstractPngExport<
    O extends AbstractExportProps,
    M extends AbstractExportTypeMandatory
> {

    public static FONT_SIZE_NORMAL = "16px";
    public static FONT_SIZE_SMALL = "12px";
    public static COLOR_BASE = "black";
    public static COLOR_GRAY = "gray";
    public static COLOR_LIGHT = "lightgray";
    public static WIDTH = "1600px";
    public static FONT_FAMILY = "sans-serif";
    public static GAP_BASE = "10px";
    public static GAP_SMALL = "5px";

    public static DEBUG: boolean = false;


    protected wrapper?: HTMLDivElement;
    protected container?: HTMLDivElement;

    private _exporting: boolean = false;
    public get exporting() { return this._exporting; }
    public readonly onExportingStatusChange = new CallbacksManager<(status: boolean) => void>();



    /** 
     * Indicate the exporting status. Internal method only! 
     */
    private setExporting(
        value: boolean
    ) {
        this._exporting = value;
        this.onExportingStatusChange.call(this._exporting);
    }

    /** 
     * A helper function creating a DIV with default styles 
     */
    protected createElementWithText<E extends HTMLElement>(
        element: string,
        text: string,
        fontSize: string = AbstractPngExport.FONT_SIZE_NORMAL,
        fontWeight: CSSStyleDeclaration["fontWeight"] = "normal",
        color: string = AbstractPngExport.COLOR_BASE
    ): E {
        const el = document.createElement(element) as E;
        el.innerHTML = text;
        el.style.fontSize = fontSize;
        el.style.lineHeight = "1em";
        el.style.fontWeight = fontWeight;
        el.style.color = color;
        return el;

    }

    private buildWrapper(): HTMLDivElement {
        const element = document.createElement("div");

        if (AbstractPngExport.DEBUG === false) {
            element.style.position = "absolute";
            element.style.width = "0px";
            element.style.height = "0px";
            element.style.overflow = "hidden";
        }

        return element;
    }

    private buildContainer(
        width: number,
        backgroundColor: string
    ): HTMLDivElement {

        const element = document.createElement("div");
        element.style.width = width.toFixed(0) + "px";
        element.style.fontSize = AbstractPngExport.FONT_SIZE_NORMAL;
        element.style.fontFamily = AbstractPngExport.FONT_FAMILY;
        element.style.color = AbstractPngExport.COLOR_BASE;
        element.style.backgroundColor = backgroundColor;

        return element;

    }

    /** Actions taken before the wrapper element is removed */
    protected abstract beforeDomRemoved(): void;

    /** Actions taken before the wrapper element is removed */
    protected abstract afterDomRemoved(): void;

    private clear() {

        this.beforeDomRemoved();

        if (this.wrapper) {
            document.body.removeChild(this.wrapper);
        }

        this.afterDomRemoved();

        delete this.container;
        delete this.wrapper;

    }

    /** Action taken after the wrapper and container are built */
    protected abstract onBuildDom(params: M): void;

    /** Create the core DOM and append it to body */
    private buildDom(
        params: M
    ): void {

        // Create the internal elements
        this.wrapper = this.buildWrapper();
        this.container = this.buildContainer(params.width, params.backgroundColor);
        this.wrapper.appendChild(this.container);

        // Create the implementation elements
        this.onBuildDom(params);

        // Append the wrapper to the document.body
        document.body.prepend(this.wrapper);
    }

    /**
     * Get final parameters from optional provided parameters
     */
    protected abstract getFinalParams(params?: O): M;

    /**
     * Make sure the file name has a valid extension
     */
    private makeSureFileNameIsValid(
        fileName: string
    ): string {

        if (fileName.endsWith(".PNG")) {
            fileName = fileName.replaceAll(".PNG", ".png");
        }

        if (!fileName.endsWith(".png")) {
            fileName = fileName + ".png";
        }

        return fileName;

    }

    /** 
     * This is the main method that shall create all the logic, append it to DOM and trigger a download via setTimeout. The download itself needs to be done through `this.downloadImage`.
     */
    protected abstract onDownload(params: M): void;

    async downloadPng(
        params?: O
    ) {

        const options = this.getFinalParams(params);

        options.fileName = this.makeSureFileNameIsValid(options.fileName);

        if (this.exporting === true) {
            console.warn(`PNG export of ${options.fileName} is already working. New requests are allowed after the export finishes.`);
            return;
        }

        this.setExporting(true);

        this.buildDom(options);

        this.onDownload(options);

    }

    /** A unified way to download an image */
    protected downloadImage(
        fileName: string,
        container: HTMLDivElement
    ) {

        domtoimage.toPng(container).then((dataUrl: string) => {

            const link = document.createElement("a");
            link.download = fileName;
            link.href = dataUrl;
            link.click();

            if (AbstractPngExport.DEBUG === false) {
                this.clear();
            }

            this.setExporting(false);

        });

    }

    buildHorizontalScale(
        element: HTMLDivElement,
        min: number,
        max: number,
        from: number,
        to: number,
        gradient: string,
        bgColor: string,
        text: string,
        highlight?: { from: number, to: number }
    ): HTMLDivElement {

        const elementWidth = element.clientWidth;

        const singleItemWidth = 60;

        const elementOffset = 40;

        const numElements = elementWidth / (singleItemWidth + elementOffset);

        // Build scale

        const box = document.createElement("div");
        box.style.width = "100%";
        box.style.position = "relative";
        box.style.paddingLeft = (singleItemWidth / 2) + "px";
        box.style.paddingRight = (singleItemWidth / 2) + "px";
        box.style.boxSizing = "border-box";

        const scale = document.createElement("div");
        scale.style.width = "100%";
        scale.style.position = "relative";
        scale.style.backgroundColor = bgColor;
        scale.style.height = "30px"//`calc( AbstractPngExport.GAP_BASE * 2)`;
        // scale.style.border = `1px solid ${text}`;

        const minmax = max - min;

        const fromClamped = from - min;
        const toClamped = to - min;

        const rangeFromPercent = fromClamped / minmax * 100;
        const rangeToErcent = toClamped / minmax * 100;

        const range = document.createElement("div");
        range.style.position = "absolute";
        range.style.backgroundImage = gradient;
        range.style.height = "100%";
        range.style.top = "0px";
        range.style.left = rangeFromPercent + "%";
        range.style.width = rangeToErcent - rangeFromPercent + "%";

        scale.appendChild(range);
        box.appendChild(scale);






        // Build ticks

        const ticks = document.createElement("div");
        ticks.style.width = "100%";
        ticks.style.height = "40px";
        ticks.style.position = "relative";

        const buildTick = (
            value: number,
            highlightTick: boolean = false,
            color: string,
            background: string
        ) => {

            const percent = value / minmax * 100;

            const tick = document.createElement("div");
            tick.style.position = "absolute";
            tick.style.top = "0px";
            tick.style.left = `calc( ${percent}% - ${singleItemWidth / 2}px )`;//percent + "%";
            tick.style.width = singleItemWidth + "px";
            tick.style.textAlign = "center";
            tick.style.lineHeight = "0px";


            const val = document.createElement("div");
            const pointer = document.createElement("div");
            const pointerInner = document.createElement("div");

            const pointerScale = 7;
            const pointerScalePx = pointerScale + "px";

            val.innerHTML = (min + value).toFixed(2) + " °C";
            val.style.display = "inline-block";
            val.style.fontSize = AbstractPngExport.FONT_SIZE_SMALL;
            val.style.lineHeight = "1em";
            val.style.padding = "3px";
            val.style.position = "relative";

            pointer.style.width = "100%";
            pointer.style.height = pointerScalePx;
            pointer.style.textAlign = "center";
            pointer.style.position = "relative";
            pointer.style.lineHeight = "0px";

            pointerInner.style.content = "";
            pointerInner.style.display = "inline-block";

            if (highlightTick) {

                pointerInner.style.width = (pointerScale * 2) + "px";
                pointerInner.style.height = (pointerScale * 2) + "px";
                pointerInner.style.rotate = "45deg";
                pointerInner.style.backgroundColor = background;

                val.style.backgroundColor = background;
                val.style.zIndex = "99";

                val.style.color = color;

            } else {

                pointerInner.style.width = "1px";
                pointerInner.style.height = pointerScalePx;
                pointerInner.style.backgroundColor = color;

            }

            pointer.appendChild(pointerInner);
            tick.appendChild(pointer);

            tick.appendChild(val);


            ticks.appendChild(tick);

        }

        if (highlight) {

            const area = document.createElement("div");
            area.style.position = "absolute";
            area.style.border = `2px solid ${text}`;
            area.style.height = "100%";
            area.style.boxSizing = "border-box";

            const areaFromPercent = (highlight.from - min) / minmax * 100;
            const areaToPercent = ((highlight.to - min) / minmax * 100) - areaFromPercent;

            area.style.left = areaFromPercent + "%";
            area.style.width = areaToPercent + "%";

            scale.appendChild(area);

            buildTick(highlight.from - min, true, "white", bgColor);
            buildTick(highlight.to - min, true, "white", bgColor);


        }





        const onePart = minmax / numElements;

        let currentTickValue = 0;

        while (currentTickValue <= minmax) {

            buildTick(currentTickValue, false, text, "transparent");

            currentTickValue = currentTickValue + onePart;

        }

        buildTick(fromClamped, true, "white", text);
        buildTick(toClamped, true, "white", text);


        box.appendChild(ticks);


        return box;



    }



}