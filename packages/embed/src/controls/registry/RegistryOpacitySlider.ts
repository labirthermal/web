import { consume } from "@lit/context";
import { css, html } from "lit";
import { live } from "lit/directives/live.js";
import type { Ref} from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { registryOpacityContext } from "../../controllers/RegistryController";

export class RegistryOpacitySlider extends AbstractRegistryConsumer {

    @consume({
        context: registryOpacityContext, 
        subscribe: true
    })
    public value!: number;

    protected containerRef: Ref<HTMLElement> = createRef();

    /** Handle user input events */
    handleUserChangeEvent( event: {target: {value: string}} ) {
        const value = parseFloat( event.target.value );
        this.registryObject.opacity.imposeOpacity( value );
    }


    static styles = css`

        :host {
        }

        .thermal-opacity-handler {
            display: block;
            width: 100%;
            max-width: 100px;
            min-width: 75px;
            cursor: pointer;
            accent-color: var(--thermal-primary);
            
        }
        
        .thermal-opacity-container {
            display: flex;
            width: 100%;
            align-items: space-between;
            justify-content: space-between;
            color: var( --thermal-slate-dark );
            font-size: calc( var( --thermal-fs-sm ) * .7 );
            max-width: 100px;
            min-width: 75px;
        }
    
    `;

    protected render(): unknown {
        return html`
            <div ${ref(this.containerRef)}>
                <input
                    id="handler"
                    class="thermal-opacity-handler"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    .value=${live(String(this.value))}
                    @input="${this.handleUserChangeEvent}"
                />
                <div class="thermal-opacity-container">
                    <div>VIS</div>
                    <div>${this.value}</div>
                    <div>IR</div>
                </div>
            </div>
            <slot></slot>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "registry-opacity-slider": RegistryOpacitySlider;
    }
}