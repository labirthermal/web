import i18next, { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { cache } from "lit/directives/cache.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { map } from "lit/directives/map.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import { languagesObject, T } from "../translations/Languages";
import type { BtnVariants } from "./Btn";

// @customElement("thermal-app")
export class ThermalAppElement extends AbstractThermalElement {

    @state()
    language: string = i18next.language;

    @state()
    private _overflowCount: number = 0;

    @state()
    private _overflowOpen: boolean = false;

    @state()
    private _hasPre: boolean = false;

    @state()
    private _hasContent: boolean = false;

    @state()
    private _hasPreBar: boolean = false;

    @state()
    private _hasBarHeader: boolean = false;

    @property({ type: String, reflect: true })
    fullscreen: string = "off";

    @property({ type: Boolean, reflect: true, attribute: "show-fullscreen" })
    showFullscreen: boolean = false;

    @property()
    author?: string;

    @property()
    recorded?: string;

    @property()
    license?: string;

    @property()
    label?: string;

    @property()
    labelIcon?: string;
    
    @property()
    labelIconStyle?: string;

    @property()
    labelTooltip?: string;

    @property()
    labelVariant: BtnVariants = "foreground";

    @property({type: Object})
    onlabel?: () => void;



    protected headerRef: Ref<HTMLDivElement> = createRef();

    protected contentRef: Ref<HTMLDivElement> = createRef();

    protected barItemsRef: Ref<HTMLDivElement> = createRef();

    /** Owns host resize observation; not reactive and released when disconnected. */
    protected observer?: ResizeObserver;

    /** Owns toolbar resize observation; recreated after the component reconnects. */
    private _overflowObserver: ResizeObserver | null = null;

    /** Pending overflow measurement, coalesced and cancelled when disconnected. */
    private _rafId: number | null = null;

    /** Final slot assignments from our last measurement, used to ignore self-induced slotchange events. */
    private readonly _barSlotAssignments = new Map<string, Element[]>();

    /** Stable callback so language changes do not accumulate subscriptions on reconnect. */
    private readonly _handleLanguageChange = (language: string): void => {
        this.language = language;
    };

    private _handleFullscreenChange = (): void => {
        this.fullscreen = document.fullscreenElement === this ? "on" : "off";
    };

    connectedCallback(): void {
        super.connectedCallback();

        document.addEventListener("fullscreenchange", this._handleFullscreenChange);
        if (i18next.language !== undefined) {
            this.language = i18next.language;
        }
        i18next.on("languageChanged", this._handleLanguageChange);
        this.requestUpdate();

    }

    disconnectedCallback(): void {
        document.removeEventListener("fullscreenchange", this._handleFullscreenChange);
        i18next.off("languageChanged", this._handleLanguageChange);
        this.observer?.disconnect();
        this.observer = undefined;
        if (this._overflowObserver) {
            this._overflowObserver.disconnect();
            this._overflowObserver = null;
        }
        if (this._rafId !== null) {
            cancelAnimationFrame(this._rafId);
            this._rafId = null;
        }
        this._barSlotAssignments.clear();
        super.disconnectedCallback();
    }

    private _toggleOverflow(): void {
        this._overflowOpen = !this._overflowOpen;
    }

    private _setSlotFlag(name: string, has: boolean): void {
        switch (name) {
            case "pre":
                this._hasPre = has;
                break;
            case "content":
                this._hasContent = has;
                break;
            case "pre-bar":
                this._hasPreBar = has;
                break;
            case "bar-header":
                this._hasBarHeader = has;
                break;
        }
    }

    private _onSlotChange = (event: Event): void => {
        const slot = event.target as HTMLSlotElement;
        this._setSlotFlag(slot.name, slot.assignedElements({ flatten: true }).length > 0);
    };

    private _syncSlotFlags(): void {
        const shadow = this.shadowRoot;
        if (!shadow) return;

        for (const name of ["pre", "content", "pre-bar", "bar-header"]) {
            const slot = shadow.querySelector<HTMLSlotElement>(`slot[name="${name}"]`);
            const has = slot
                ? slot.assignedElements({ flatten: true }).length > 0
                : Array.from(this.children).some(child => {
                    if (child.slot !== name) return false;
                    return !(child instanceof HTMLSlotElement)
                        || child.assignedElements({ flatten: true }).length > 0;
                });
            this._setSlotFlag(name, has);
        }
    }

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);
        this._syncSlotFlags();
    }

    /** Ignores our own slot redistribution but measures externally changed toolbar contents. */
    private _onBarSlotChange = (): void => {
        for (const name of ["bar-pre", "bar-post", "bar-overflow"]) {
            const current = this.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)
                ?.assignedElements() ?? [];
            const previous = this._barSlotAssignments.get(name);
            if (!previous || previous.length !== current.length
                || current.some((item, index) => item !== previous[index])) {
                this._scheduleOverflowUpdate();
                return;
            }
        }
    };

    private _scheduleOverflowUpdate(): void {
        if (!this.isConnected || this._rafId !== null) return;
        this._rafId = requestAnimationFrame(() => {
            this._rafId = null;
            if (!this.isConnected) return;
            this._doOverflowUpdate();
            for (const name of ["bar-pre", "bar-post", "bar-overflow"]) {
                const items = this.shadowRoot?.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)
                    ?.assignedElements() ?? [];
                this._barSlotAssignments.set(name, items);
            }
        });
    }

    private _doOverflowUpdate(): void {
        const shadow = this.shadowRoot;
        if (!shadow) return;

        // Step 1: Restore all overflow items to their original slots
        const overflowSlot = shadow.querySelector('slot[name="bar-overflow"]') as HTMLSlotElement | null;
        if (overflowSlot) {
            const items = [...overflowSlot.assignedElements()] as HTMLElement[];
            for (const item of items) {
                item.slot = item.dataset.originalSlot ?? "bar-pre";
                delete item.dataset.originalSlot;
            }
        }

        // Step 2: Measure all items (forces synchronous layout reflow)
        const barItems = this.barItemsRef.value;
        if (!barItems) return;

        const preSlot = shadow.querySelector('slot[name="bar-pre"]') as HTMLSlotElement | null;
        const postSlot = shadow.querySelector('slot[name="bar-post"]') as HTMLSlotElement | null;
        const allItems = [
            ...(preSlot?.assignedElements({ flatten: true }) ?? []),
            ...(postSlot?.assignedElements({ flatten: true }) ?? []),
        ] as HTMLElement[];

        if (allItems.length === 0) {
            this._overflowCount = 0;
            this._overflowOpen = false;
            return;
        }

        const GAP = 5;
        const HAMBURGER_W = 44; // width of overflow toggle button + gap

        // Calculate total width of all items
        const totalItemsWidth = allItems.reduce(
            (sum, el, i) => sum + el.offsetWidth + (i > 0 ? GAP : 0), 0
        );
        const containerWidth = barItems.offsetWidth;

        if (totalItemsWidth <= containerWidth) {
            // Everything fits
            this._overflowCount = 0;
            this._overflowOpen = false;
            return;
        }

        // Find which items overflow (available = container - hamburger button)
        const availableWidth = containerWidth - HAMBURGER_W;
        let used = 0;
        let firstOverflow = allItems.length;

        for (let i = 0; i < allItems.length; i++) {
            const itemWidth = allItems[i].offsetWidth + (i > 0 ? GAP : 0);
            if (used + itemWidth > availableWidth) {
                firstOverflow = i;
                break;
            }
            used += itemWidth;
        }

        // Assign overflow items
        for (let i = firstOverflow; i < allItems.length; i++) {
            const item = allItems[i];
            item.dataset.originalSlot = item.slot;
            item.slot = "bar-overflow";
        }

        const newCount = allItems.length - firstOverflow;
        this._overflowCount = newCount;
        if (newCount === 0) {
            this._overflowOpen = false;
        }
    }

    toggleFullscreen() {
        if (this.fullscreen === "on") {
            this.fullscreen = "off";
        } else {
            this.fullscreen = "on";
        }
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (!this.isConnected) return;

        if (
            this.observer === undefined
            && this.contentRef.value !== undefined
        ) {

            this.observer = new ResizeObserver(() => {
                if (this.isConnected && this.fullscreen === "off" && this.contentRef.value) {
                    this.contentRef.value.removeAttribute( "style" );
                }
            });
            this.observer.observe(this);

        }

        // Set up overflow ResizeObserver once barItemsRef is available
        if (!this._overflowObserver && this.barItemsRef.value) {
            this._overflowObserver = new ResizeObserver(() => {
                this._scheduleOverflowUpdate();
            });
            this._overflowObserver.observe(this.barItemsRef.value);
            this._scheduleOverflowUpdate();
        }

    }


    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
        super.attributeChangedCallback(name, _old, value);

        if (name === "fullscreen" && _old !== value) {
            if (value === "on") {
                if (document.fullscreenElement === this) return;
                if (typeof this.requestFullscreen !== "function") {
                    this.log("Fullscreen API is unavailable");
                    this.fullscreen = "off";
                    return;
                }
                void this.requestFullscreen().catch(error => {
                    this.log("Unable to enter fullscreen", error);
                    this._handleFullscreenChange();
                });
            } else if (value === "off" && _old !== null) {
                if (document.fullscreenElement === this) {
                    void document.exitFullscreen().catch(error => {
                        this.log("Unable to exit fullscreen", error);
                        this._handleFullscreenChange();
                    });
                }
            }
        }

    }


    static styles = css`

        :host {
            font-family: sans-serif;
            font-weight: normal;
            font-size: var( --thermal-fs );
            line-height: 1em;
            color: var( --thermal-foreground );

            display: block;

            padding: calc( var( --thermal-gap ) / 3 );
            background-color: var( --thermal-slate-light );
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );    
            position: relative; 
        }

        .bar {
            padding-bottom: calc( var( --thermal-gap ) * 0.5 );
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .bar-label {
            flex: 0 1 auto;
            min-width: 50px;
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        .bar-header,
        .pre-bar {
            display: flex;
            gap: 5px;
            align-items: flex-start;
        }

        .pre-bar {
            width: 100%;
        }

        .bar-header[hidden],
        .pre-bar[hidden],
        .pre[hidden] {
            display: none;
        }

        .bar-items {
            flex: 1 1 0;
            min-width: 0;
            display: flex;
            gap: 5px;
            align-items: center;
            --thermal-direction: row;
        }

        .bar-items ::slotted([slot="bar-pre"]),
        .bar-items ::slotted([slot="bar-post"]) {
            flex-shrink: 0;
        }

        .bar-spacer {
            flex: 1 1 0;
            min-width: 0;
        }

        .bar-overflow-toggle {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            color: var(--thermal-foreground);
            cursor: pointer;
            padding: 0.3em 0.5em;
            line-height: 0;
        }

        .bar-overflow-toggle:hover {
            background-color: var(--thermal-slate-light);
        }

        .bar-overflow-panel {
            
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            align-items: center;
            padding: calc( var(--thermal-gap) * 0.4 ) 0;
            
            border-top: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            --thermal-direction: row;

            padding: .3em;
            
            background: var(--thermal-slate);
            border-radius: var(--thermal-radius);
            
            margin-bottom: .5em;

            > slot > * {
                width: 100%; 
            }

        }

        .bar-overflow-panel[hidden] {
            display: none;
        }

        :host([fullscreen="on"]) {
            box-sizing: border-box;
            width: 100vw;
            height: 100vh;
            overflow: auto;
            padding: calc( var( --thermal-gap ) / 3 );
            border: 0;
            border-radius: 0;
        }


        .credits {

            display: flex;
            width: 100%;
            flex-wrap: wrap;
            font-size: calc( var(--thermal-fs-sm) * 0.8 );

            & > div {
                padding-top: calc( var(--thermal-gap) * .5 );
                padding-right: var( --thermal-gap );
            }
        
        }

        .credits-field {
            display: inline;
            opacity: .5;
        }

        .credit-value {
            display: inline;
        }

        .content {
            width: 100%;
            box-sizing: border-box;
        }

        .has-content {
            margin-top: calc( var(--thermal-gap) * .5);
            &::before {
                opacity: .5;
                font-size: calc( var(--thermal-fs-sm) * 0.8 );
                display: block;
                padding-bottom: calc( var(--thermal-gap) * .5);
            }
        }

        .app-header {
            position: sticky;
            top: 0;
            z-index: 9999;
            background: var(--thermal-slate-light);
            background: linear-gradient(var(--thermal-slate-light) calc(100% - 10px), transparent);
        }
    
    `;



    private renderLabel(): unknown {

        const nonInteractive = !this.onlabel;

        const slotInner = this.label
            ? html`<thermal-btn
    variant="${this.labelVariant}"
    ?non-interactive=${nonInteractive}
    icon=${ifDefined(this.labelIcon)}
    iconStyle=${ifDefined(this.labelIconStyle)}
    tooltip=${ifDefined(this.labelTooltip)}
    @click=${this.onlabel}
>${this.label}</thermal-btn>`
            : nothing;

        return html`
    <slot name="label">
        ${slotInner}
    </slot>`;

    }


    private renderCreditField(label: string, value?: string): unknown {
        if ( value === undefined || value.trim().length === 0 ) return nothing;
        return html`<div>
    <div class="credits-field">${label}:</div>
    <div class="credit-value">${value}</div>
</div>`;
    }

    private renderCredits(): unknown {

        if ( this.author || this.license || this.recorded ) {

            return html`<div class="credits">
    ${this.renderCreditField(t(T.recordedat), this.recorded)}
    ${this.renderCreditField(t(T.author), this.author)}
    ${this.renderCreditField(t(T.license), this.license)}
</div>`;

        }

        return nothing;

    }

    private static readonly languages = [
        "en",
        "cs",
        "de",
        "fr",
        "cy",
    ];

    private renderLanguageSwitcher(): unknown {

        return html`<thermal-dropdown>
    <span slot="invoker">${this.language.toUpperCase()}</span>
    ${cache( map( ThermalAppElement.languages, lang => html`<div slot="option">
        <thermal-btn
            @click=${() => {
                i18next.changeLanguage( lang );
                this.language = lang;
            }}
        >${languagesObject[lang].flag} ${languagesObject[lang].name}</thermal-btn>
    </div>` ) )}
</thermal-dropdown>`;

    }

    private renderFullscreenButton(): unknown {

        if ( this.showFullscreen === false ) {
            return nothing;
        }

        return html`<thermal-btn
    class="app-fullscreen-button"
    @click=${this.toggleFullscreen.bind(this)}
    icon=${this.fullscreen === "on" ? "smaller" : "bigger"}
    iconStyle="mini"
    tooltip=${this.fullscreen === "on" ? t(T.close) : "Fullscreen"}
></thermal-btn>`;

    }

    private renderOverflowToggle(): unknown {

        if ( this._overflowCount === 0 ) {
            return nothing;
        }

        let icon = "adjustment";
        let iconStyle = "outline";
        let variant: BtnVariants = "default";

        if ( this._overflowOpen ) {
            icon = "close";
            iconStyle = "outline";
            variant = "background";
        }

        return html`<thermal-btn 
    @click=${this._toggleOverflow} 
    tooltip="${this.t("moreoptions")}" 
    icon=${icon} 
    iconStyle=${iconStyle} 
    variant=${variant}
></thermal-btn>`;


    }



    protected render(): unknown {

        return html`<header ${ref(this.headerRef)} class="app-header">

        <div class="bar">

            <div class="bar-label">
                ${ this.renderLabel() }
            </div>

            <div class="bar-header" ?hidden=${!this._hasBarHeader}>
                <slot name="bar-header" @slotchange=${this._onSlotChange}></slot>
            </div>

            <div class="bar-items" ${ref(this.barItemsRef)}>

                <slot name="bar-pre" @slotchange=${this._onBarSlotChange}></slot>
                <div class="bar-spacer"></div>
                <slot name="bar-post" @slotchange=${this._onBarSlotChange}></slot>

                ${this.renderOverflowToggle()}

            </div>

            <slot name="close"></slot>

            ${this.renderFullscreenButton()}

            ${this.renderLanguageSwitcher()}

        </div>

        <div class="bar-overflow-panel" ?hidden=${this._overflowCount === 0 || !this._overflowOpen}>
            <slot name="bar-overflow" @slotchange=${this._onBarSlotChange}></slot>
        </div>

        <div class="pre" ?hidden=${!this._hasPre}>
            <slot name="pre" @slotchange=${this._onSlotChange}></slot>
        </div>

        <div class="pre-bar" ?hidden=${!this._hasPreBar}>
            <slot name="pre-bar" @slotchange=${this._onSlotChange}></slot>
        </div>

    </header>

    <div class="content" part="app-content" ${ref(this.contentRef)}>
        <slot></slot>
    </div>

    <div class="post">
        <slot name="post"></slot>
    </div>

    ${this.renderCredits()}

    <div class="content ${this._hasContent ? "has-content" : ""}">
        <slot name="content" @slotchange=${this._onSlotChange}></slot>
    </div>
`
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-app": ThermalAppElement;
    }
}
