import { consume } from "@lit/context";
import i18next, { t } from "i18next";
import type { PropertyValues } from "lit";
import { html, LitElement } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { T } from "../translations/Languages";
import { localeContext } from "../translations/localeContext";
import { generateShortId } from "../utils/shortId";
import { HierarchyUpdatesHub } from "../controllers/HierarchyUpdatesHub";

/** 
 * All the webcomponents of \@labirthermal/embed (and its extensions) should be based on the abstract class `AbstractThermalElement`. 
 * 
 * Functionality:
 * - listens to the locale context for rerender
 * - is able to handle hierarchy controllers through the `HierarchyUpdatesHub` mechanism
 * - generates a short unique identifier (`UUID`) for each instance
 * - provides helpers such as:
 *   - `t` for translation
 *   - `i` for rendering SVG strings safely
 *   - `log` for standardized logging with tag name and UUID
 *   - `getUUID` for generating unique identifiers with a message
 * 
 * @see {@link HierarchyUpdatesHub}
 * 
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@ntc.zcu.cz>
 */
export abstract class AbstractThermalElement extends LitElement {

    private _hierarchy?: HierarchyUpdatesHub;

    /** 
     * Get the hierarchy for the purpose of managing updates using hierarchy controllers 
     * @see {@link HierarchyUpdatesHub}
     * @internal
     */
    public initHierarchy(): HierarchyUpdatesHub {
        if (!this._hierarchy) {
            this._hierarchy = new HierarchyUpdatesHub();
        }
        return this._hierarchy;
    }


    // declare public requestUpdate

    private _UUID?: string

    /** 
     * A short identifier of this instance, generated lazily. 
     * It is guaranteed to be unique within the current document.
     * @see {@link generateShortId}
     */
    public get UUID() {
        if (this._UUID === undefined) {
            this._UUID = generateShortId();
        }
        return this._UUID;
    };

    public getUUID(
        msg: string
    ): string {
        return this.UUID + "_" + msg;
    }

    /** A standardised way to log messages to the console prepending this webcomponent's tag name and UUID for easier identification */
    public log(...args: unknown[]) {
        console.log(this.tagName, this.UUID, ...args);
    }

    static shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: "open"
    }

    /** Consume the locale context for rerendering whenever a language changes globally. */
    @consume({ context: localeContext, subscribe: true })
    private _locale?: string;

    /** Stable callback so the global language subscription can be removed on disconnect. */
    private readonly languageChanged = (locale: string): void => {
        this._locale = locale;
    };

    connectedCallback(): void {
        super.connectedCallback();
        // Sync the locale context from the global to this webcomponent
        this._locale = i18next.language;
        // Subscribe to global language changes to keep the locale context updated.
        i18next.on("languageChanged", this.languageChanged);
    }

    disconnectedCallback(): void {
        // Unsubscribe from global language changes to avoid memory leaks
        i18next.off("languageChanged", this.languageChanged);
        super.disconnectedCallback();
    }

    /** 
     * Renders an SVG string safely using the unsafeSVG directive 
     * @see {@link unsafeSVG}
     */
    protected i(str: string): unknown {
        return html`${unsafeSVG(str)}`;
    }

    /** 
     * Returns a translated string 
     * @see {@link T}
     */
    protected t(key: keyof typeof T): string {
        return t(T[key]);
    }

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate?.(changedProperties);
        this._hierarchy?.willUpdate(changedProperties);
    }

    updated(changedProperties: PropertyValues): void {
        super.updated?.(changedProperties);
        this._hierarchy?.updated(changedProperties);
    }

}
