import type { ThermalFileInstance } from "@labirthermal/core";
import { BufferTarget, Mp4OutputFormat, Output, VideoSample, VideoSampleSource } from "mediabunny";
import type { AbstractSingleVideoExport } from "../AbstractSingleVideoExport";
import { RecordingPhase } from "../ISingleVideoExportElement";

/**
 * Atribut pro označení dynamických elementů, které se mění mezi framy.
 * Tyto elementy budou mít svůj textContent aktualizován z originálu.
 */
export const DYNAMIC_CONTENT_ATTRIBUTE = "data-video-dynamic";

/**
 * Atribut pro označení SVG elementů, které se mění mezi framy.
 * Celý innerHTML SVG bude aktualizován z originálu.
 */
export const DYNAMIC_SVG_ATTRIBUTE = "data-video-svg";

/**
 * Atribut pro označení elementů, jejichž styly se mění mezi framy.
 * Inline styly budou aktualizovány z originálu.
 */
export const DYNAMIC_STYLE_ATTRIBUTE = "data-video-style";

/**
 * Atribut pro označení elementů, které se mají kompletně překreslit při každém framu.
 * Element včetně jeho stylů a potomků bude znovu naklonován z originálu.
 * Použij pro elementy, které jsou vytvářeny asynchronně nebo se dynamicky mění.
 */
export const DYNAMIC_RERENDER_ATTRIBUTE = "data-video-rerender";

/**
 * Atribut pro označení elementů, které nemají být zahrnuty do exportu.
 * Tyto elementy budou odstraněny z klonu před exportem.
 */
export const IGNORE_ATTRIBUTE = "data-video-ignore";

export class VideoRecorder {

    private muxingCanvas?: OffscreenCanvas;
    private muxingContext?: OffscreenCanvasRenderingContext2D;

    private readonly file: ThermalFileInstance;
    private readonly exportedElement: HTMLElement;

    // === Připravené struktury pro rychlý export ===
    
    /** SVG wrapper obsahující foreignObject s klonovaným DOM */
    private preparedSvgWrapper?: SVGSVGElement;
    
    /** Klonovaný DOM element uvnitř foreignObject */
    private preparedClone?: HTMLElement;
    
    /** Šířka exportu v pixelech */
    private exportWidth: number = 0;
    
    /** Výška exportu v pixelech */
    private exportHeight: number = 0;

    /** Mapování: originální canvas -> <img> element v klonu */
    private canvasToImageMap: Map<HTMLCanvasElement, HTMLImageElement> = new Map();

    /** Mapování: originální dynamický element -> klonovaný element */
    private dynamicElementMap: Map<Element, Element> = new Map();

    /** Mapování: originální SVG -> klonované SVG (pro aktualizaci innerHTML) */
    private dynamicSvgMap: Map<SVGElement, SVGElement> = new Map();

    /** Mapování: originální element -> klonovaný element (pro kompletní překreslení) */
    private rerenderMap: Map<Element, Element> = new Map();

    /** Mapování: originální element -> klonovaný element (pro aktualizaci stylů) */
    private dynamicStyleMap: Map<HTMLElement, HTMLElement> = new Map();

    constructor(
        private readonly app: AbstractSingleVideoExport
    ) {
        this.file = app.innerFile!;
        this.exportedElement = app.exportedElement!;
    }

    private getMuxingCanvas(): OffscreenCanvas {

        if (this.muxingCanvas) return this.muxingCanvas;

        const bounds = this.exportedElement.getBoundingClientRect();

        const canvas = new OffscreenCanvas(bounds.width, bounds.height);

        this.muxingCanvas = canvas;

        return this.muxingCanvas;

    }

    private getMuxingContext(): OffscreenCanvasRenderingContext2D {

        if (this.muxingContext) return this.muxingContext;
        if (this.muxingCanvas === undefined) this.getMuxingCanvas();
        this.muxingContext = this.muxingCanvas!.getContext("2d", { alpha: false })!;
        
        // Vypni interpolaci - zachovej pixelovaný vzhled
        this.muxingContext.imageSmoothingEnabled = false;

        return this.muxingContext;
    }

    // =======================================================================
    // PŘÍPRAVA EXPORTU — volá se JEDNOU před začátkem renderování framů
    // =======================================================================

    /**
     * Jednorázová příprava exportu:
     * 1. Klonuje DOM (pouze jednou)
     * 2. Inlinuje computed styles do klonu
     * 3. Embeduje obrázky jako data URI
     * 4. Vytváří SVG wrapper s foreignObject
     * 5. Mapuje dynamické elementy a canvasy pro rychlou aktualizaci
     */
    private async prepareExport(): Promise<void> {

        const element = this.exportedElement;
        this.exportWidth = element.clientWidth;
        this.exportHeight = element.clientHeight;

        console.log("[VideoRecorder] Preparing export...", this.exportWidth, "x", this.exportHeight);

        // 1. Klonuj DOM (pouze jednou!)
        const clone = element.cloneNode(true) as HTMLElement;

        // 2. Inlinuj computed styles z originálu do klonu
        console.log("[VideoRecorder] Inlining styles...");
        this.inlineStylesRecursive(element, clone);

        // 2.5 Zploštění custom elementů — nahradí je za statický HTML
        console.log("[VideoRecorder] Flattening custom elements...");
        this.flattenCustomElements(element, clone);

        // 3. Odstraň elementy s data-video-ignore (po flatteningu, aby se našly i v shadow DOM)
        console.log("[VideoRecorder] Removing ignored elements...");
        this.removeIgnoredElements(clone);

        // 3. Embeduj obrázky jako data URI
        console.log("[VideoRecorder] Embedding images...");
        await this.embedImages(clone);

        // 3.5. Odstran Lit komentare a oprav xmlns
        console.log("[VideoRecorder] Cleaning up clone...");
        this.removeLitComments(clone);
        this.ensureXmlnsAttributes(clone);

        // 4. Vytvoř mapování canvasů (všechny canvasy automaticky)
        console.log("[VideoRecorder] Mapping canvases...");
        this.createCanvasMap(element, clone);

        // 5. Vytvoř mapování dynamických elementů
        console.log("[VideoRecorder] Mapping dynamic elements...");
        this.createDynamicElementMap(element, clone);

        // 5.1 Vytvoř mapování dynamických SVG
        console.log("[VideoRecorder] Mapping dynamic SVGs...");
        this.createDynamicSvgMap(element, clone);

        // 5.2 Vytvoř mapování elementů s dynamickými styly
        console.log("[VideoRecorder] Mapping dynamic style elements...");
        this.createDynamicStyleMap(element, clone);

        // 5.3 Vytvoř mapování elementů pro kompletní překreslení
        console.log("[VideoRecorder] Mapping rerender elements...");
        this.createRerenderMap(element, clone);

        // 6. Připrav SVG wrapper
        console.log("[VideoRecorder] Creating SVG wrapper...");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", String(this.exportWidth));
        svg.setAttribute("height", String(this.exportHeight));

        const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreignObject.setAttribute("width", "100%");
        foreignObject.setAttribute("height", "100%");
        foreignObject.setAttribute("x", "0");
        foreignObject.setAttribute("y", "0");

        // Nastav XHTML namespace pro HTML obsah
        clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        
        foreignObject.appendChild(clone);
        svg.appendChild(foreignObject);

        this.preparedSvgWrapper = svg;
        this.preparedClone = clone;

        console.log("[VideoRecorder] Export prepared. Canvas count:", this.canvasToImageMap.size, "Dynamic elements:", this.dynamicElementMap.size, "Rerender elements:", this.rerenderMap.size);
    }

    /**
     * Odstraní elementy s atributem data-video-ignore z klonu.
     * Tyto elementy nebudou zahrnuty do exportu.
     */
    private removeIgnoredElements(clone: Element): void {
        const ignored = clone.querySelectorAll(`[${IGNORE_ATTRIBUTE}]`);
        console.log("[VideoRecorder] Removing ignored elements:", ignored.length);
        
        for (const el of ignored) {
            el.parentNode?.removeChild(el);
        }
    }

    /**
     * Rekurzivně inlinuje computed styles z originálu do klonu.
     * Kopíruje pouze důležité CSS vlastnosti pro zrychlení.
     */
    private inlineStylesRecursive(original: Element, clone: Element): void {

        if (!(original instanceof HTMLElement) || !(clone instanceof HTMLElement)) {
            return;
        }

        const computed = getComputedStyle(original);

        // Seznam důležitých CSS vlastností k inlinování
        const importantProperties = [
            // Layout
            "display", "position", "top", "left", "right", "bottom",
            "width", "height", "min-width", "min-height", "max-width", "max-height",
            "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
            "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
            "box-sizing", "overflow", "overflow-x", "overflow-y",
            
            // Flexbox
            "flex", "flex-direction", "flex-wrap", "justify-content", "align-items", "align-content",
            "flex-grow", "flex-shrink", "flex-basis", "order", "gap",
            
            // Grid
            "grid", "grid-template-columns", "grid-template-rows", "grid-gap", "grid-column", "grid-row",
            
            // Background
            "background", "background-color", "background-image", "background-size", "background-position",
            
            // Border
            "border", "border-width", "border-style", "border-color", "border-radius",
            "border-top", "border-right", "border-bottom", "border-left",
            
            // Text
            "color", "font", "font-family", "font-size", "font-weight", "font-style",
            "line-height", "text-align", "text-decoration", "text-transform", "white-space",
            "letter-spacing", "word-spacing",
            
            // Visual
            "opacity", "visibility", "z-index", "transform", "box-shadow", "text-shadow",
            
            // Table
            "table-layout", "border-collapse", "border-spacing"
        ];

        for (const prop of importantProperties) {
            const value = computed.getPropertyValue(prop);
            if (value && value !== "none" && value !== "normal" && value !== "auto") {
                clone.style.setProperty(prop, value);
            }
        }

        // Rekurzivně pro děti
        const origChildren = Array.from(original.children);
        const cloneChildren = Array.from(clone.children);

        for (let i = 0; i < origChildren.length && i < cloneChildren.length; i++) {
            this.inlineStylesRecursive(origChildren[i], cloneChildren[i]);
        }
    }

    /**
     * Zploštění custom elementů — nahradí custom elementy za statický HTML.
     * Tím se zabrání spouštění jejich lifecycle (connectedCallback atd.)
     * při vložení klonu do dokumentu.
     * 
     * DŮLEŽITÉ: Canvasy jsou označeny data-canvas-index atributem pro pozdější mapování.
     */
    private flattenCustomElements(original: Element, clone: Element): void {

        // Nejdřív označ všechny canvasy v originálu indexem (včetně shadow DOM!)
        const originalCanvases = this.querySelectorAllDeep(original, "canvas");
        originalCanvases.forEach((canvas, index) => {
            canvas.setAttribute("data-canvas-index", String(index));
        });
        
        console.log("[VideoRecorder] Marked canvases with index (including shadow DOM):", originalCanvases.length);

        // Najdi všechny custom elementy v originálu (mají pomlčku v názvu)
        const originalElements = Array.from(original.querySelectorAll("*"));
        const cloneElements = Array.from(clone.querySelectorAll("*"));

        // Iteruj od konce, abychom mohli bezpečně nahrazovat
        for (let i = originalElements.length - 1; i >= 0; i--) {
            const origEl = originalElements[i];
            const cloneEl = cloneElements[i];

            if (!cloneEl) continue;

            // Detekuj custom element (má pomlčku v názvu)
            const isCustomElement = origEl.tagName.includes("-");

            if (isCustomElement && origEl instanceof HTMLElement) {
                
                // Vytvoř náhradní <div> element
                const replacement = document.createElement("div");
                replacement.setAttribute("data-flattened-from", origEl.tagName.toLowerCase());
                
                // Zkopíruj computed styles
                const computed = getComputedStyle(origEl);
                replacement.style.display = computed.display;
                replacement.style.width = computed.width;
                replacement.style.height = computed.height;
                replacement.style.position = computed.position;
                replacement.style.margin = computed.margin;
                replacement.style.padding = computed.padding;
                replacement.style.boxSizing = computed.boxSizing;
                replacement.style.background = computed.background;
                replacement.style.backgroundColor = computed.backgroundColor;

                // Pokud má shadow root, vezmi jeho obsah
                if (origEl.shadowRoot) {
                    // Přidej HTML obsah ze shadow DOM
                    for (const child of origEl.shadowRoot.children) {
                        if (child.tagName !== "STYLE") {
                            const childClone = child.cloneNode(true) as Element;
                            // Inlinuj styly i pro tento obsah
                            this.inlineStylesRecursive(child, childClone);
                            replacement.appendChild(childClone);
                        }
                    }
                } else {
                    // Není shadow DOM — zkopíruj light DOM obsah
                    for (const child of origEl.children) {
                        const childClone = child.cloneNode(true) as Element;
                        this.inlineStylesRecursive(child, childClone);
                        replacement.appendChild(childClone);
                    }
                }

                // Rekurzivně zpracuj i vnořené custom elementy v replacement
                const nestedCustom = replacement.querySelectorAll("*");
                for (const nested of nestedCustom) {
                    if (nested.tagName.includes("-")) {
                        // Najdi odpovídající originální element
                        const nestedOrig = origEl.shadowRoot?.querySelector(nested.tagName.toLowerCase()) 
                            || origEl.querySelector(nested.tagName.toLowerCase());
                        if (nestedOrig) {
                            // Rekurzivně zploštit
                            this.flattenSingleElement(nestedOrig as HTMLElement, nested as HTMLElement);
                        }
                    }
                }

                // Nahraď custom element za replacement
                cloneEl.parentNode?.replaceChild(replacement, cloneEl);

                console.log(`[VideoRecorder] Flattened: <${origEl.tagName.toLowerCase()}>`);
            }
        }
    }

    /**
     * Zploští jeden custom element
     */
    private flattenSingleElement(original: HTMLElement, clone: HTMLElement): void {
        
        const replacement = document.createElement("div");
        replacement.setAttribute("data-flattened-from", original.tagName.toLowerCase());

        const computed = getComputedStyle(original);
        replacement.style.display = computed.display;
        replacement.style.width = computed.width;
        replacement.style.height = computed.height;

        if (original.shadowRoot) {
            for (const child of original.shadowRoot.children) {
                if (child.tagName !== "STYLE") {
                    const childClone = child.cloneNode(true) as Element;
                    this.inlineStylesRecursive(child, childClone);
                    replacement.appendChild(childClone);
                }
            }
        }

        clone.parentNode?.replaceChild(replacement, clone);
    }

    /**
     * Převede všechny <img> a background-image na data URI
     */
    private async embedImages(element: Element): Promise<void> {

        // <img> elementy
        const images = element.querySelectorAll("img");
        const imagePromises: Promise<void>[] = [];

        for (const img of images) {
            if (img.src && !img.src.startsWith("data:")) {
                imagePromises.push(
                    this.fetchAsDataUri(img.src)
                        .then(dataUri => { img.src = dataUri; })
                        .catch(e => console.warn("[VideoRecorder] Failed to embed image:", img.src, e))
                );
            }
        }

        // background / background-image
        const bgElements = element.querySelectorAll<HTMLElement>("*");
        for (const el of bgElements) {
            const bg = el.style.background || "";
            const bgImg = el.style.backgroundImage || "";
            const combined = [bg, bgImg].filter(Boolean).join(" ");
            if (!combined.includes("url(")) continue;

            const urls = Array.from(combined.matchAll(/url\((['"]?)(.*?)\1\)/g))
                .map(m => m[2])
                .filter(u => u && !u.startsWith("data:"));

            if (urls.length === 0) continue;

            imagePromises.push((async () => {
                let newBg = bg;
                let newBgImg = bgImg;

                for (const url of urls) {
                    const dataUri = await this.fetchAsDataUri(url);
                    newBg = newBg.replaceAll(url, dataUri);
                    newBgImg = newBgImg.replaceAll(url, dataUri);
                }

                if (bg) el.style.background = newBg;
                if (bgImg) el.style.backgroundImage = newBgImg;
            })().catch(e => console.warn("[VideoRecorder] Failed to embed background:", e)));
        }

        await Promise.all(imagePromises);
    }

    /**
     * Načte URL jako data URI
     */
    private async fetchAsDataUri(url: string): Promise<string> {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    /**
     * Vytvoří mapování mezi originálními canvasy a <img> elementy v klonu.
     * Nahrazuje <canvas> elementy za <img> elementy v klonu.
     * Používá data-canvas-index atribut pro správné mapování po zploštění.
     */
    private createCanvasMap(original: Element, clone: Element): void {

        this.canvasToImageMap.clear();

        // Najdi všechny canvasy v originálu včetně shadow DOM
        const originalCanvases = this.querySelectorAllDeep(original, "canvas");
        
        // Najdi všechny canvasy v klonu (po zploštění už jsou v normálním DOM)
        const cloneCanvases = clone.querySelectorAll("canvas");

        console.log("[VideoRecorder] Found canvases in original:", originalCanvases.length);
        console.log("[VideoRecorder] Found canvases in clone:", cloneCanvases.length);

        // Mapuj canvasy podle data-canvas-index
        for (const origCanvas of originalCanvases) {
            const index = origCanvas.getAttribute("data-canvas-index");
            if (index === null) continue;

            // Najdi odpovídající canvas v klonu
            const cloneCanvas = clone.querySelector(`canvas[data-canvas-index="${index}"]`) as HTMLCanvasElement | null;
            
            if (!cloneCanvas) {
                console.warn(`[VideoRecorder] Canvas with index ${index} not found in clone`);
                continue;
            }

            const origCanvasEl = origCanvas as HTMLCanvasElement;
            
            // Vytvoř <img> element jako náhradu za canvas
            const img = document.createElement("img");
            img.width = origCanvasEl.width;
            img.height = origCanvasEl.height;
            img.style.width = cloneCanvas.style.width || `${origCanvasEl.width}px`;
            img.style.height = cloneCanvas.style.height || `${origCanvasEl.height}px`;
            img.style.display = "block";
            
            // Zachovej pixelovaný vzhled - žádná interpolace
            img.style.imageRendering = "pixelated";
            
            img.setAttribute("data-canvas-index", index);
            
            // Inicializuj s aktuálním obsahem canvasu
            // Diagnostic: check if canvas is tainted before getting dataURL
            try {
                const dataUrl = this.getCanvasDataUrl(origCanvasEl);
                if (dataUrl) {
                    img.src = dataUrl;
                    console.log(`[VideoRecorder] Canvas ${index} converted to data URL (${dataUrl.length} chars)`);
                } else {
                    console.warn(`[VideoRecorder][taint] Canvas ${index} returned null dataURL - possibly tainted!`, origCanvasEl);
                }
            } catch (e) {
                console.warn(`[VideoRecorder][taint] Canvas ${index} TAINTED - cannot get dataURL:`, e, origCanvasEl);
            }
            
            // Nahraď canvas za img v klonu
            cloneCanvas.parentNode?.replaceChild(img, cloneCanvas);
            
            this.canvasToImageMap.set(origCanvasEl, img);
            console.log(`[VideoRecorder] Mapped canvas ${index}: ${origCanvasEl.width}x${origCanvasEl.height}`);
        }

        console.log("[VideoRecorder] Total canvas mappings:", this.canvasToImageMap.size);
    }

    /**
     * Vytvoří mapování mezi originálními a klonovanými dynamickými elementy.
     * Hledá elementy s atributem DYNAMIC_CONTENT_ATTRIBUTE včetně shadow DOM.
     */
    private createDynamicElementMap(original: Element, clone: Element): void {

        this.dynamicElementMap.clear();

        // Hledej v celém stromu včetně shadow DOM
        const originalDynamic = this.querySelectorAllDeep(original, `[${DYNAMIC_CONTENT_ATTRIBUTE}]`);
        const cloneDynamic = clone.querySelectorAll(`[${DYNAMIC_CONTENT_ATTRIBUTE}]`);

        console.log("[VideoRecorder] Found dynamic elements (including shadow DOM):", originalDynamic.length);
        console.log("[VideoRecorder] Found dynamic elements in clone:", cloneDynamic.length);

        // Mapuj podle data-dynamic-index
        originalDynamic.forEach((origEl, index) => {
            origEl.setAttribute("data-dynamic-index", String(index));
        });

        // Po zploštění bychom měli mít odpovídající elementy v klonu
        for (let i = 0; i < originalDynamic.length && i < cloneDynamic.length; i++) {
            this.dynamicElementMap.set(originalDynamic[i], cloneDynamic[i]);
        }
    }

    /**
     * Vytvoří mapování pro dynamické SVG elementy.
     * Hledá SVG s atributem DYNAMIC_SVG_ATTRIBUTE včetně shadow DOM.
     */
    private createDynamicSvgMap(original: Element, clone: Element): void {

        this.dynamicSvgMap.clear();

        const originalSvgs = this.querySelectorAllDeep(original, `svg[${DYNAMIC_SVG_ATTRIBUTE}]`);
        const cloneSvgs = clone.querySelectorAll(`svg[${DYNAMIC_SVG_ATTRIBUTE}]`);

        console.log("[VideoRecorder] Found dynamic SVGs (including shadow DOM):", originalSvgs.length);

        for (let i = 0; i < originalSvgs.length && i < cloneSvgs.length; i++) {
            this.dynamicSvgMap.set(originalSvgs[i] as SVGElement, cloneSvgs[i] as SVGElement);
        }
    }

    /**
     * Vytvoří mapování pro elementy s dynamickými styly.
     * Hledá elementy s atributem DYNAMIC_STYLE_ATTRIBUTE včetně shadow DOM.
     */
    private createDynamicStyleMap(original: Element, clone: Element): void {

        this.dynamicStyleMap.clear();

        const originalStyled = this.querySelectorAllDeep(original, `[${DYNAMIC_STYLE_ATTRIBUTE}]`);
        const cloneStyled = clone.querySelectorAll(`[${DYNAMIC_STYLE_ATTRIBUTE}]`);

        console.log("[VideoRecorder] Found dynamic style elements (including shadow DOM):", originalStyled.length);

        for (let i = 0; i < originalStyled.length && i < cloneStyled.length; i++) {
            this.dynamicStyleMap.set(originalStyled[i] as HTMLElement, cloneStyled[i] as HTMLElement);
        }
    }

    /**
     * Vytvoří mapování pro elementy, které se mají kompletně překreslit při každém framu.
     * Hledá elementy s atributem DYNAMIC_RERENDER_ATTRIBUTE včetně shadow DOM.
     */
    private createRerenderMap(original: Element, clone: Element): void {

        this.rerenderMap.clear();

        const originalRerender = this.querySelectorAllDeep(original, `[${DYNAMIC_RERENDER_ATTRIBUTE}]`);
        const cloneRerender = clone.querySelectorAll(`[${DYNAMIC_RERENDER_ATTRIBUTE}]`);

        console.log("[VideoRecorder] Found rerender elements (including shadow DOM):", originalRerender.length);

        for (let i = 0; i < originalRerender.length && i < cloneRerender.length; i++) {
            this.rerenderMap.set(originalRerender[i], cloneRerender[i]);
        }
    }

    /**
     * querySelector pro celý DOM strom včetně shadow DOM
     */
    private querySelectorAllDeep(root: Element, selector: string): Element[] {
        const results: Element[] = [];

        // Hledej v aktuálním elementu
        const matches = root.querySelectorAll(selector);
        results.push(...Array.from(matches));

        // Hledej v shadow DOM všech custom elementů
        const allElements = root.querySelectorAll("*");
        for (const el of allElements) {
            if (el.shadowRoot) {
                const shadowMatches = el.shadowRoot.querySelectorAll(selector);
                results.push(...Array.from(shadowMatches));

                // Rekurzivně hledej v shadow DOM
                const nestedResults = this.querySelectorAllDeepInShadow(el.shadowRoot, selector);
                results.push(...nestedResults);
            }
        }

        return results;
    }

    /**
     * Rekurzivní helper pro hledání v shadow DOM
     */
    private querySelectorAllDeepInShadow(shadowRoot: ShadowRoot, selector: string): Element[] {
        const results: Element[] = [];

        const allElements = shadowRoot.querySelectorAll("*");
        for (const el of allElements) {
            if (el.shadowRoot) {
                const shadowMatches = el.shadowRoot.querySelectorAll(selector);
                results.push(...Array.from(shadowMatches));
                
                const nestedResults = this.querySelectorAllDeepInShadow(el.shadowRoot, selector);
                results.push(...nestedResults);
            }
        }

        return results;
    }

    // =======================================================================
    // AKTUALIZACE DYNAMICKÉHO OBSAHU — volá se pro KAŽDÝ frame
    // =======================================================================

    /**
     * Aktualizuje pouze dynamický obsah v klonu:
     * 1. Aktualizuje src <img> elementů z originálních canvasů
     * 2. Aktualizuje textContent dynamických elementů
     * 3. Aktualizuje innerHTML dynamických SVG
     * 4. Aktualizuje inline styly dynamických elementů
     * 5. Kompletně překreslí rerender elementy
     * 
     * Toto je MNOHEM rychlejší než klonování celého DOM!
     */
    private updateDynamicContent(): void {

        // 1. Aktualizuj src <img> elementů z originálních canvasů
        for (const [origCanvas, img] of this.canvasToImageMap) {
            try {
                const dataUrl = this.getCanvasDataUrl(origCanvas);
                if (dataUrl) {
                    img.src = dataUrl;
                }
            } catch (e) {
                console.warn("[VideoRecorder] Failed to update canvas image:", e);
            }
        }

        // 2. Aktualizuj textContent dynamických elementů
        for (const [origEl, cloneEl] of this.dynamicElementMap) {
            if (cloneEl.textContent !== origEl.textContent) {
                cloneEl.textContent = origEl.textContent;
            }
        }

        // 3. Aktualizuj innerHTML dynamických SVG
        for (const [origSvg, cloneSvg] of this.dynamicSvgMap) {
            if (cloneSvg.innerHTML !== origSvg.innerHTML) {
                cloneSvg.innerHTML = origSvg.innerHTML;
            }
        }

        // 4. Aktualizuj inline styly dynamických elementů
        for (const [origEl, cloneEl] of this.dynamicStyleMap) {
            const origStyle = origEl.getAttribute("style") || "";
            const cloneStyle = cloneEl.getAttribute("style") || "";
            if (cloneStyle !== origStyle) {
                cloneEl.setAttribute("style", origStyle);
            }
        }

        // 5. Kompletně překresli rerender elementy (včetně stylů a potomků)
        for (const [origEl, cloneEl] of this.rerenderMap) {
            this.rerenderElement(origEl, cloneEl);
        }
    }

    /**
     * Kompletně překreslí element - znovu naklonuje obsah z originálu
     * včetně všech stylů a potomků.
     */
    private rerenderElement(original: Element, clone: Element): void {
        
        // Pokud je to custom element, musíme zpracovat shadow DOM
        if (original instanceof HTMLElement && original.tagName.includes("-")) {
            // Custom element - zpracuj shadow DOM
            if (original.shadowRoot) {
                // Vymaž obsah klonu
                while (clone.firstChild) {
                    clone.removeChild(clone.firstChild);
                }
                
                // Znovu naklonuj obsah shadow DOM
                for (const child of original.shadowRoot.children) {
                    if (child.tagName !== "STYLE") {
                        const childClone = child.cloneNode(true) as Element;
                        this.inlineStylesRecursive(child, childClone);
                        clone.appendChild(childClone);
                    }
                }
            }
        } else {
            // Standardní element - nahraď innerHTML a styly
            if (clone.innerHTML !== original.innerHTML) {
                clone.innerHTML = original.innerHTML;
            }
            
            // Aktualizuj inline styly
            if (original instanceof HTMLElement && clone instanceof HTMLElement) {
                const origStyle = original.getAttribute("style") || "";
                clone.setAttribute("style", origStyle);
                
                // Znovu inlinuj computed styles
                this.inlineStylesRecursive(original, clone);
            }
        }
    }



    /**
     * Odstraní Lit framework komentáře z klonu.
     * Tyto komentáře mohou způsobovat problémy v SVG foreignObject.
     */
    private removeLitComments(element: Element): void {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_COMMENT,
            null
        );
        
        const commentsToRemove: Comment[] = [];
        let node: Comment | null;
        
        while ((node = walker.nextNode() as Comment | null)) {
            // Lit používá komentáře jako ?lit$, <!---->  atd.
            commentsToRemove.push(node);
        }
        
        for (const comment of commentsToRemove) {
            comment.parentNode?.removeChild(comment);
        }
    }

    /**
     * Zkontroluje a opraví xmlns atributy v klonu pro foreignObject.
     * Všechny HTML elementy musí mít xmlns="http://www.w3.org/1999/xhtml"
     */
    private ensureXmlnsAttributes(element: Element): void {
        const XHTML_NS = "http://www.w3.org/1999/xhtml";
        
        const checkAndFix = (el: Element) => {
            if (el instanceof HTMLElement) {
                const currentXmlns = el.getAttribute("xmlns");
                
                if (!currentXmlns || currentXmlns !== XHTML_NS) {
                    el.setAttribute("xmlns", XHTML_NS);
                }
            }
            
            for (const child of el.children) {
                checkAndFix(child);
            }
        };
        
        checkAndFix(element);
    }



    /**
     * Získá data URL z canvasu - podporuje i WebGL kontexty
     */
    private getCanvasDataUrl(canvas: HTMLCanvasElement): string | null {
        
        // Zkus zjistit typ kontextu
        const webgl2 = canvas.getContext("webgl2");
        const webgl = canvas.getContext("webgl");
        const ctx2d = canvas.getContext("2d");

        if (webgl2 || webgl) {
            // WebGL canvas - musíme číst pixels a překreslit na 2D canvas
            try {
                return this.webglCanvasToDataUrl(canvas, webgl2 || webgl!);
            } catch (e) {
                console.warn("[VideoRecorder] WebGL canvas unreadable:", e);
                return null;
            }
        } else if (ctx2d) {
            // Standardní 2D canvas
            try {
                return canvas.toDataURL("image/png");
            } catch (e) {
                console.warn("[VideoRecorder] 2D canvas unreadable:", e);
                return null;
            }
        } else {
            // Zkus přímo toDataURL (může fungovat pro některé případy)
            try {
                return canvas.toDataURL("image/png");
            } catch (e) {
                console.warn("[VideoRecorder] Canvas unreadable:", e);
                return null;
            }
        }
    }

    /**
     * Konvertuje WebGL canvas na data URL pomocí readPixels
     */
    private webglCanvasToDataUrl(
        canvas: HTMLCanvasElement, 
        gl: WebGLRenderingContext | WebGL2RenderingContext
    ): string | null {

        const width = canvas.width;
        const height = canvas.height;

        // Přečti pixels z WebGL
        const pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

        // Vytvoř pomocný canvas pro konverzi
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext("2d")!;

        // Vytvoř ImageData a vlož pixels (WebGL má Y osu obráceně)
        const imageData = tempCtx.createImageData(width, height);
        
        // Překopíruj pixels s obrácenou Y osou
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const srcIdx = ((height - y - 1) * width + x) * 4;
                const dstIdx = (y * width + x) * 4;
                imageData.data[dstIdx] = pixels[srcIdx];         // R
                imageData.data[dstIdx + 1] = pixels[srcIdx + 1]; // G
                imageData.data[dstIdx + 2] = pixels[srcIdx + 2]; // B
                imageData.data[dstIdx + 3] = pixels[srcIdx + 3]; // A
            }
        }

        tempCtx.putImageData(imageData, 0, 0);
        
        return tempCanvas.toDataURL("image/png");
    }

    // =======================================================================
    // HLAVNÍ METODA PRO ZÁZNAM A ENKÓDOVÁNÍ FRAMŮ
    // =======================================================================

    /**
     * Hlavní metoda pro export videa.
     * Kombinuje rasterizaci a enkódování do jednoho průchodu.
     * Framy se posílají přímo do encoderu bez mezitřídy do IndexedDB.
     */
    private async recordAndEncode(): Promise<Blob> {

        this.app.setRecordingPhase( RecordingPhase.RECORDING );

        // === PŘÍPRAVA EXPORTU ===
        await this.prepareExport();

        // === PŘÍPRAVA ENCODERU ===
        const output = new Output({
            target: new BufferTarget(),
            format: new Mp4OutputFormat()
        });

        console.log("[VideoRecorder] Supported video codecs:", output.format.getSupportedVideoCodecs());

        const source = new VideoSampleSource({
            codec: "vp9",
            bitrate: this.app.renderProps.mp4Quality
        });

        output.addVideoTrack(source);
        output.start();

        const totalFrames = this.file.timeline.frames.length;
        console.log("[VideoRecorder] Starting recording & encoding. Total frames:", totalFrames);

        let frameCount = 0;

        // === HLAVNÍ SMYČKA - RASTERIZACE + ENKÓDOVÁNÍ ===
        for (const frame of this.file.timeline.frames) {

            // 1. Nastav čas a překresli thermal data
            await this.file.timeline.setRelativeTime(frame.relative);
            await this.file.draw();

            // 2. Aktualizuj dynamický obsah v klonu
            this.updateDynamicContent();

            // 3. Rasterizuj do muxing canvasu (přímo, bez JPEG mezikroku)
            const success = await this.rasterizeToCanvas();

            if (!success) {
                console.warn("[VideoRecorder] Failed to rasterize frame:", frame.index);
                continue;
            }

            // 4. Vytvoř VideoFrame přímo z canvasu a pošli do encoderu
            const videoFrame = new VideoFrame(
                this.getMuxingCanvas(),
                {
                    timestamp: frame.relative * 1000 // ms → μs
                }
            );

            const sample = new VideoSample(videoFrame);

            await source.add(sample, {
                keyFrame: frameCount % 30 === 0 // Keyframe každých 30 framů
            });

            videoFrame.close();
            sample.close();

            frameCount++;
            if (frameCount % 10 === 0) {
                console.log(`[VideoRecorder] Progress: ${frameCount}/${totalFrames} frames`);
            }

            const percent = (frameCount / totalFrames) * 100;

            this.app.setRecordingPhaseProgress( percent );

        }

        this.app.setRecordingPhase( RecordingPhase.ENCODING );

        console.log("[VideoRecorder] Recording & encoding complete.");

        // === FINALIZACE ===
        source.close();
        await output.finalize();

        this.app.setRecordingPhase( RecordingPhase.IDLE );

        return new Blob([output.target.buffer!], { type: "video/mp4" });
    }

    /**
     * Rasterizuje připravené SVG přímo do muxing canvasu.
     * Vrací true při úspěchu, false při chybě.
     */
    private async rasterizeToCanvas(): Promise<boolean> {

        if (!this.preparedSvgWrapper) {
            console.error("[VideoRecorder] SVG wrapper not prepared!");
            return false;
        }

        // Serializuj SVG
        const serialized = new XMLSerializer().serializeToString(this.preparedSvgWrapper);
        
        // Vytvoř data: URL místo Blob URL (může obejít některé security checky)
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`;

        try {
            // Načti jako Image s data: URL
            // let imageToDraw: HTMLImageElement;
            
            const imageToDraw = await new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.width = this.exportWidth;
                img.height = this.exportHeight;
                img.onload = () => resolve(img);
                img.onerror = (e) => {
                    console.error("[VideoRecorder] Image load error:", e);
                    reject(new Error(`Failed to load SVG image`));
                };
                img.src = dataUrl;
            });

            // Nakresli na muxing canvas
            const canvas = this.getMuxingCanvas();
            canvas.width = this.exportWidth;
            canvas.height = this.exportHeight;

            const ctx = this.getMuxingContext();
            ctx.clearRect(0, 0, this.exportWidth, this.exportHeight);
            ctx.drawImage(imageToDraw, 0, 0);

            return true;

        } catch (e) {
            console.error("[VideoRecorder] Rasterization error:", e);
            return false;
        }
    }

    /**
     * Vyčistí připravené struktury po dokončení exportu.
     * Důležité pro uvolnění paměti a možnost opakovaného exportu.
     */
    private cleanup(): void {
        
        // Odstraň data-canvas-index atributy z originálních canvasů
        for (const origCanvas of this.canvasToImageMap.keys()) {
            origCanvas.removeAttribute("data-canvas-index");
        }
        
        // Odstraň data-dynamic-index atributy z originálních elementů
        for (const origEl of this.dynamicElementMap.keys()) {
            origEl.removeAttribute("data-dynamic-index");
        }
        
        // Vyčisti všechny mapy (uvolní reference)
        this.canvasToImageMap.clear();
        this.dynamicElementMap.clear();
        this.dynamicSvgMap.clear();
        this.dynamicStyleMap.clear();
        this.rerenderMap.clear();
        
        // Uvolni SVG wrapper a klon (GC je sebere)
        this.preparedSvgWrapper = undefined;
        this.preparedClone = undefined;
        
        // Uvolni muxing canvas
        this.muxingCanvas = undefined;
        this.muxingContext = undefined;
        
        // Reset rozměrů
        this.exportWidth = 0;
        this.exportHeight = 0;
        
        console.log("[VideoRecorder] Cleanup complete.");
    }

    /**
     * Hlavní veřejná metoda pro spuštění exportu videa.
     */
    public async captureVideo(): Promise<void> {

        // Store the initial preview scale
        const initialScale = this.app.renderProps.previewScale;

        // Set the scale to 1 for export
        this.app.setPreviewScale(1);

        // Allow scale change to take effect
        await Promise.resolve(); 

        const start = performance.now();

        try {
            const videoBlob = await this.recordAndEncode();

            const end = performance.now();
            console.log("[VideoRecorder] Total export time:", end - start, "ms");

            // Stáhni video
            const blobUrl = URL.createObjectURL(videoBlob);
            const a = document.createElement("a");
            a.href = blobUrl;
            
            // Název souboru s .mp4 příponou
            const baseName = this.app.renderProps.fileName || "exported-video";
            a.download = baseName.endsWith(".mp4") ? baseName : `${baseName}.mp4`;
            
            a.click();
            a.remove();
            
            // Uvolni blob URL po kliknutí (s malým zpožděním pro jistotu)
            setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
                console.log("[VideoRecorder] Video blob URL revoked.");
            }, 1000);

        } finally {
            this.cleanup();
            this.app.setPreviewScale(initialScale);
        }
    }

    /**
     * Hlavní metoda pro export současného snímku jako PNG
     */
    public async captureCurrentFrameAsPng(): Promise<void> {

        const initialScale = this.app.renderProps.previewScale;

        await Promise.resolve();

        

        try {

            await this.prepareExport();

            await this.file.draw();

            this.updateDynamicContent();

            await this.rasterizeToCanvas();

            const canvas = this.getMuxingCanvas();

            const blob = await canvas.convertToBlob({ type: "image/png" });
        
            if (blob) {
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                const baseName = this.app.renderProps.fileName || "exported-frame";

                const finalName = [baseName, "frame", this.file.timeline.currentFrameIndex + 1].join("_");
                a.download = finalName.endsWith(".png") ? baseName : `${finalName}.png`;
                a.click();
                a.remove();
                setTimeout(() => {
                    URL.revokeObjectURL(blobUrl);
                    console.log("[VideoRecorder] PNG blob URL revoked.");
                }, 1000);
            }

        } finally {
            this.cleanup();
            this.app.setPreviewScale(initialScale);
        }


    }

}