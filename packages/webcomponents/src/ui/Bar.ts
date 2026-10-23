import type { PropertyValueMap} from "lit";
import { LitElement, css, html, nothing } from "lit";
import { state } from 'lit/decorators.js';
import type { Ref} from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";

export class ThermalBarElement extends LitElement {

    static styles = css`

        .container {
            // width: 100%;
            display: flex;
            gap: 5px;
            position: relative;
        }


        .ruler {
            width: 100%;
            position: absolute;
            height: 0;
            top: 0;
            left: 0;
        }

        .ruler-item {}

        .ruler-item__current {
            border: var(--thermal-border-width) var(--thermal-border-style) transparent;
            height: 0;
            margin-top: -1px;
            content: "";
        }

        .ruler-item__content {
            border: var(--thermal-border-width) var(--thermal-border-style) red;
            position: absolute;
            display: none;
        }


        .content {
            
            display: flex;
            gap: calc( 5px );
            width: max-content;

            align-items: center;
        
        }



        .icon {
            width: var( --thermal-gap );
            line-height: 0;
        }

        .collapsed-menu {
            --thermal-direction: column;
            --thermal-collapsible-display: block !important;
            --thermal-collapsible-width: 100%;
            --thermal-collapsible-grow: 1;
        }

    `;

    @state()
    protected collapsed: boolean = false;

    @state()
    protected lastContentWidth!: number;

    protected drawerRef: Ref<HTMLDivElement> = createRef();
    protected contentRef: Ref<HTMLDivElement> = createRef();
    protected rulerContentRef: Ref<HTMLDivElement> = createRef();

    protected observer!: ResizeObserver;

    connectedCallback(): void {

        super.connectedCallback();

    }

    protected firstUpdated(_changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void {
        super.firstUpdated(_changedProperties);

        this.hydrateObserver();

    }


    private hydrateObserver() {

        if (this.drawerRef.value && this.observer === undefined) {

            this.observer = new ResizeObserver((entries) => {

                // if the bar is not collapsed, store the content width
                if (this.collapsed === false) {
                    const contentWidth = this.contentRef.value!.clientWidth;
                    this.lastContentWidth = contentWidth;
                }

                const entry = entries[0];

                // If content is larger, expand it
                if (this.lastContentWidth < entry.contentRect.width) {
                    if (this.collapsed) {
                        this.collapsed = false;
                    }
                }

                // If content is smaller, collapse it
                else {
                    if (this.collapsed === false) {
                        this.collapsed = true;
                    }
                }

            });


            this.observer.observe(this.drawerRef.value);


        }

    }


    disconnectedCallback(): void {
        super.disconnectedCallback();
        if (this.drawerRef.value) {
            this.observer.unobserve(this.drawerRef.value);
        }
        if (this.observer) {
            this.observer.disconnect();
        }

    }


    protected render(): unknown {
        return html`

            <div class="container">

                <div class="ruler">
                    <div class="ruler-item ruler-item__current" ${ref(this.drawerRef)}></div>
                    <div class="ruler-item ruler-item__content" ${ref(this.rulerContentRef)} style="width: ${this.lastContentWidth + 1}px"></div>
                </div>
                <div class="content" ${ref(this.contentRef)}>

                    ${this.collapsed === false ? html`
                        <slot></slot>    
                    ` : nothing}
                
                </div>

            </div>

            ${this.collapsed ? html`
                <thermal-dropdown class="collapsed-menu">
                    <div slot="invoker" class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    </div>

                    <slot slot="option" stacked="true"></slot>
                </thermal-dropdown>
            ` : nothing}
        
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-bar": ThermalBarElement;
    }
}
