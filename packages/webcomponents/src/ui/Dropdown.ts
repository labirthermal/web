import { computePosition, flip, inline, offset, shift } from "@floating-ui/dom";
import type { PropertyValueMap } from "lit";
import { LitElement, css, html } from "lit";
import { property, queryAssignedElements } from 'lit/decorators.js';
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { BtnSizes, BtnVariants } from "./Btn";

export class ThermalDropdownElement extends AbstractThermalElement {

    static shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        // mode: "open"
    }

    @queryAssignedElements({ slot: 'option' })
    _options!: Array<HTMLElement>;

    protected dropdownRef: Ref<HTMLDialogElement> = createRef();
    protected invokerRef: Ref<HTMLDialogElement> = createRef();
    protected optionsRef: Ref<HTMLButtonElement> = createRef();

    @property({ type: String, reflect: true })
    public isOpen: string = "close";

    @property({ type: String, reflect: true, attribute: true })
    public interactive: "on" | "off" = "on";

    @property({ type: String, reflect: true })
    public variant?: BtnVariants;

    @property({ type: String, reflect: true, attribute: true })
    public size?: BtnSizes;

    @property({ type: Boolean })
    public plain?: boolean;

    @property({ type: String, attribute: true })
    public tooltip?: string;

    @property({ type: String, reflect: true })
    public icon?: string;

    @property({ type: String, reflect: true })
    public iconStyle?: string;

    setOpen() {
        this.isOpen = "open";
    }

    setClose() {
        this.isOpen = "close";
    }

    toggle() {
        if (this.interactive === "off") {
            return;
        }
        if (this.isOpen === "open")
            this.isOpen = "close";
        else
            this.isOpen = "open";
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    private placeOptions() {

        if (!this.invokerRef.value || !this.optionsRef.value) {
            return;
        }

        computePosition(this.invokerRef.value, this.optionsRef.value, {
            middleware: [offset(2), flip(), inline(), shift()],
            placement: "bottom-start",
            strategy: "fixed"
        })
            .then(({ x, y }) => {

                if (this.optionsRef.value) {
                    this.optionsRef.value.style.left = `${x}px`;
                    this.optionsRef.value.style.top = `${y}px`;
                }

            });

    }

    updated(_changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void {
        super.updated(_changedProperties);
        if (_changedProperties.has("isOpen")) {
            this.placeOptions();
        }

    }

    firstUpdated(_changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);
        this._options.forEach(option => {
            option.childNodes.forEach(child => child.addEventListener("click", () => {
                this.setClose();
            }));
        });
    }



    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {

        super.attributeChangedCallback(name, _old, value);

        if (name === "isopen") {
            if (value === "open") {
                this.optionsRef.value?.classList.add("dropdown-options__show");
                this.dropdownRef.value?.classList.add("dropdown__open");
            } else {
                this.optionsRef.value?.classList.remove("dropdown-options__show");
                this.dropdownRef.value?.classList.remove("dropdown__open");
            }
        }

    }



    static styles = css`

        .mayNot {
            opacity: .5;
            cursor: not-allowed;
        }

        .dropdown {
            width: max-content;
        }

        .dropdown-invoker {
            width: max-content;
            display: flex;
        }

        .dropdown-invoker-wrapper {
            display: flex;
            align-items: center;
        }

        .dropdown-invoker-wrapper-icon {
            width: calc( var( --thermal-gap ) * .856 );
            line-height: 0;
            padding-left: calc( var( --thermal-gap ) * .5 );
        }

        .dropdown-options {

            z-index: 9999;

            width: max-content;
            /** position: absolute; */
            position: fixed;
            top: 0;
            left: 0;
            
            padding: 5px 10px;

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );

            background-color: var( --thermal-slate-light );

            box-shadow: var( --thermal-shadow );

            display: none;

            ::slotted( div:not(:last-child) ) {
                margin-bottom: calc( var( --thermal-gap ) * .5 );
            }

        }

        .dropdown-options__show {
            display: block;
        }

        .clicker {
            display: none;
        }

        .dropdown__open {
        
            .clicker {
                z-index: 9998;
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
            }
        }

        slot[name="option"]::slotted(*) {

            width: 100%;

            margin-top: 5px;
            margin-bottom: 5px;
            width: 100%;

        }


    
    `;

    render() {

        const invokerClasses = {
            "dropdown-invoker": true,
            may: this.interactive === "on",
            mayNot: this.interactive === "off"
        };

        const disabled = this.interactive === "off";

        return html`

            <div class="dropdown" ${ref(this.dropdownRef)}>
                <thermal-btn 
                    ${ref(this.invokerRef)} 
                    class="${classMap(invokerClasses)}" 
                    @click=${this.toggle.bind(this)} 
                    variant=${ifDefined(this.variant)}
                    size=${ifDefined(this.size)}
                    icon="${ifDefined(this.icon)}"
                    iconStyle="${ifDefined(this.iconStyle)}"
                    ?plain=${this.plain}
                    ?disabled=${disabled}
                    tooltip="${this.tooltip !== undefined ? this.tooltip : ""}"
                    part="invoker"
                >
                    <div class="dropdown-invoker-wrapper">
                        <slot name="invoker">
                            <div>Dropdown</div>
                        </slot>
                        <div class="dropdown-invoker-wrapper-icon">
                        ${this.isOpen === "close"
                ? html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>`
                : html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>`
            }
                        </div>
                    </div>
                </thermal-btn>
                <div class="clicker" @click=${this.setClose}></div>
                <div class="dropdown-options" ${ref(this.optionsRef)} >
                    <slot name="option"></slot>
                </div>
            
            </div>
        `;

    }

}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-dropdown": ThermalDropdownElement;
    }
}
