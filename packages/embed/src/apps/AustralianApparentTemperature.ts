import { provide } from "@lit/context";
import { t } from "i18next";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import { T } from "../translations/Languages";
import type { IWithlocale, Locales } from "../translations/localeContext";
import { initLocalesInTopLevelElement, localeContext, localeConverter } from "../translations/localeContext";

enum VUNIT {
    mps = "mps",
    kph = "kph"
}

const converters = {
    fromAttribute(value: string | null) {

        if (typeof value === "string") {
            const trimmedValue = value.trim();
            if (trimmedValue.length > 0) {
                return parseFloat(trimmedValue);
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    },
    toAttribute(value: number | undefined) {
        if (value !== undefined) {
            return value.toString();
        } else {
            return undefined;
        }
    },
};

export class AatAppElement extends AbstractThermalElement implements IWithlocale {

    tRef: Ref<HTMLInputElement> = createRef();
    vRef: Ref<HTMLInputElement> = createRef();
    vunitsRef: Ref<HTMLSelectElement> = createRef();
    haRef: Ref<HTMLInputElement> = createRef();

    /** Air temperature in degree celsius */
    @property({ type: String, reflect: true, attribute: "t", converter: converters })
    public temperature?: number;

    /** Wind speed in m/s */
    @property({ type: String, reflect: true, attribute: true, converter: converters })
    public v?: number;

    /** Air humidity in percent */
    @property({ type: String, reflect: true, attribute: true, converter: converters })
    public ha?: number;

    /** Result apparent temperature */
    @state()
    protected ta?: number;

    @property({ type: String, reflect: true, attribute: true })
    public vunits: VUNIT = VUNIT.mps;

    @provide({ context: localeContext })
    @property({ reflect: true, converter: localeConverter })
    public locale!: Locales;



    protected kphToMps(kph: number): number {
        return kph * 0.2778;
    }



    protected calculateE(
        h: number,
        t: number
    ) {

        return h * (6.105 / 100) * Math.exp(17.27 * t / (237.7 + t));

    }

    protected calculateTa(
        t: number,
        e: number,
        v: number
    ) {
        return t + (0.33 * e) - (0.7 * v) - 4;
    }


    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        initLocalesInTopLevelElement(this);

        if (this.tRef.value) {
            this.tRef.value.addEventListener("change", event => {

                const target = event.target as HTMLInputElement;
                const value = parseFloat(target.value);

                if (!isNaN(value)) {

                    this.temperature = Math.min(100, Math.max(-275.4, value));

                }

            })
        }

        if (this.haRef.value) {
            this.haRef.value.addEventListener("change", event => {

                const target = event.target as HTMLInputElement;
                const value = parseFloat(target.value);

                if (!isNaN(value)) {

                    this.ha = Math.min(100, Math.max(0, value));

                }

            })
        }

        if (this.vRef.value) {
            this.vRef.value.addEventListener("change", event => {

                const target = event.target as HTMLInputElement;
                const value = parseFloat(target.value);

                if (!isNaN(value)) {

                    this.v = Math.max(0, value);

                }

            })
        }
    }


    protected processValueChange(
        _changedProperties: PropertyValues<AatAppElement>,
        key: keyof AatAppElement,
    ) {

        if (_changedProperties.has(key)) {

            const newValue: number | undefined = this[key] as number | undefined;

            // Assign the new Value
            const inputRef = this[`${key}Ref` as keyof this] as Ref<HTMLInputElement>;

            // Propagate the value
            if (inputRef.value) {

                if (newValue !== undefined && newValue !== null) {
                    inputRef.value.value = newValue.toString();
                } else {
                    inputRef.value.value = "";
                }

            }

            this.recalculateVa();

        }

    }

    protected recalculateVa() {
        if (this.temperature !== undefined && this.ha !== undefined && this.v !== undefined) {

            const v = this.vunits === VUNIT.mps
                ? this.v
                : this.kphToMps(this.v);

            const e = this.calculateE(this.ha, this.temperature);
            const ta = this.calculateTa(this.temperature, e, v);

            this.ta = ta;

        } else {
            this.ta = undefined;
        }
    }

    protected shouldUpdate(_changedProperties: PropertyValues<AatAppElement>): boolean {

        super.shouldUpdate(_changedProperties);


        // Validate the HA
        if (this.ha) {
            if (this.ha < 0) {
                this.ha = 0;
                if (this.haRef.value) {
                    this.haRef.value.value = "0";
                }

            }

            if (this.ha > 100) {
                this.ha = 100;
                if (this.haRef.value) {
                    this.haRef.value.value = "100";
                }
            }
        }

        return true;
    }

    public willUpdate(_changedProperties: PropertyValues<AatAppElement>): void {
        super.willUpdate(_changedProperties);

        // Listen to values change
        this.processValueChange(_changedProperties, "temperature");
        this.processValueChange(_changedProperties, "v");
        this.processValueChange(_changedProperties, "ha");


        // Propagate the VUNITS change to the DOM
        if (_changedProperties.has("vunits")) {

            if (this.vunitsRef.value) {
                this.vunitsRef.value.value = this.vunits;
                this.recalculateVa();
            }

        }
    }


    static styles?: CSSResultGroup | undefined = css`

        .table {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }
    
        .field {

            width: 100%;
            display: table-row;

        }

        .column {
            display: table-cell;
            padding: calc( var(--thermal-gap) * .5 );
        }

        .column__label {
            text-align: right;
        }

        .column__value {
        
        }

        .input_wrapper {

            background: var( --thermal-background );

            width: 200px;
            padding: calc( var( --thermal-gap ) / 2 );

            border-radius: var( --thermal-radius );
        
        }

        input {

            font-size: var(--thermal-fs);
            width: 120px;
            text-align: right;
            border: 0;
            border-bottom: 1px var(--thermal-border-style)var( --thermal-slate-light );
            background: transparent;
            color: var( --thermal-foreground );

            -moz-appearance: textfield;

            &:focus {
                outline: 0;
                border-bottom: 1px var(--thermal-border-style)var( --thermal-primary );
            }
        
        }

        select, option, input {
            font-size: var(--thermal-fs);
            color: var( --thermal-foreground );
            background: var( --thermal-background );
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate-light );
            border-radius: var( --thermal-radius );
        }



        .result {

            padding: calc(var(--thermal-gap) * .7);
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );
            text-align: center;

            & > p {
                margin: 0;
                padding: calc( var( --thermal-gap ) * .25 );
            }

        }

        .result_value {
            font-weight: bold;
            font-size: calc( var(--thermal-fs) * 1.2 )
        }

        .result_label {
        }

        .result_comment {
            font-size: calc( var(--thermal-fs) * .8 )
        }

        .tabindex {
            border-radius: var( --thermal-radius );
            &:focus {
                outline: 3px var(--thermal-border-style)var(--thermal-primary);
            }
        }


    `;


    protected renderNumberField(
        inputRef: Ref<HTMLInputElement>,
        id: "temperature" | "v" | "ha",
        label: string,
        unit: string | ReturnType<typeof html> | typeof nothing,
        value?: number,
        min?: number,
        max?: number,
        step?: number,
        hint?: string
    ) {

        const u = typeof unit === "string"
            ? unsafeHTML(unit)
            : unit;

        return html`
            <div class="field">

                <div class="column column__label">
                    <label for=${id}>
                        ${label}
                    </label>
                </div>
                <div class="column column__value">

                    <div class="input_wrapper">
                        <input 
                            ${ref(inputRef)} 
                            id=${id}
                            name=${id}
                            value=${ifDefined(value)}
                            min=${ifDefined(min)}
                            max=${ifDefined(max)}
                            step=${ifDefined(step)}
                            type="number"
                            @blur=${(event: InputEvent) => {

                const target = event.target as HTMLInputElement;

                const value = target.value.trim();

                if (value === "" || value === undefined || value === null) {
                    this[id] = undefined;
                } else {
                    this[id] = parseFloat(target.value);
                }

            }}
                        ></input>
                        <span>${u}</span>
                    </div>

                    ${hint
                ? html`<label for=${id}>${hint}</label>`
                : nothing
            }

                </div>

            </div>

            
        `;

    }

    protected renderResult(
        apparentTemperature: number,
        temperature: number
    ) {

        const diff = apparentTemperature - temperature;

        const prop = {
            diff: Math.abs(diff).toFixed(2),
            app: apparentTemperature.toFixed(2),
            t: temperature
        };

        const summary = t(T.apparenttemperatureverbose, prop);

        const comment = diff < 0
            ? t(T.youfeelcolder, prop)
            : t(T.youfeelwarmer, prop);

        const result = apparentTemperature.toFixed(2);

        return html`<div class="result">

            <p class="result_label">${t(T.apparenttemperature)}</p>

            <p class="result_value">
                ${result} °C
            </p>

            <p class="result_comment">${summary}</p>

            <p class="result_comment">${comment}</p>
        
        </div>`;


    }


    protected render() {
        return html`
            <thermal-app 
                label=${t(T.apparenttemperature)} 
                author="LabIR Edu" 
                license="CC BY-SA 4.0"
            >

                <thermal-dialog label=${t(T.info)} slot="bar-pre">
                    <thermal-btn slot="invoker">${t(T.info)}</thermal-btn>
                    <div slot="content">
                        ${unsafeHTML(t(T.apparenttemperaturehint, { href: "https://en.wikipedia.org/wiki/Wind_chill#Australian_apparent_temperature" }))}
                    </div>
                </thermal-dialog>

                ${this.t !== undefined || this.v !== undefined || this.ha !== undefined
                ? html`<thermal-btn 
                slot="bar-pre"
                @click=${() => {
                    this.temperature = undefined;
                    this.ha = undefined;
                    this.ta = undefined;
                    this.v = undefined;
                }}>Reset</thermal-btn>`
                : nothing
            }


                <section class="table">

                ${this.renderNumberField(
                this.tRef,
                "temperature",
                t(T.airtemperature),
                "°C",
                this.temperature,
                -273.15,
                100,
                0.1
            )}

                ${this.renderNumberField(
                this.vRef,
                "v",
                t(T.windspeed),
                html`<select 
                    @change=${(event: InputEvent) => {
                        const target = event.target as HTMLSelectElement;
                        const value = target.value as VUNIT;
                        this.vunits = value;
                    }} 
                    value=${this.vunits}
                    ${ref(this.vunitsRef)}
                >
                    <option value="mps">m/s</option>
                    <option value="kph">km/h</option>
                </select>`,
                this.v,
                0,
                undefined,
                0.1
            )}

                ${this.renderNumberField(
                this.haRef,
                "ha",
                t(T.relativeairhumidity),
                "%",
                this.ha,
                0,
                100,
                0.1
            )}

                </section>
                <div  class="tabindex" tabindex="0">
                ${this.ta !== undefined && this.temperature !== undefined
                ? this.renderResult(this.ta, this.temperature)
                : nothing
            }
                </div>
                

            </thermal-app>
        `
    }

}