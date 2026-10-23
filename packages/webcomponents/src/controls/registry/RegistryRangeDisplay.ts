import { consume } from "@lit/context";
import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { registryRangeToContext } from "../../controllers/RegistryController";
import { registryRangeFromContext } from "../../controllers/RegistryController";

export class RegistryRangeDisplay extends AbstractRegistryConsumer {

    @consume( {context: registryRangeFromContext, subscribe: true} )
    protected from?: number;

    @consume({context: registryRangeToContext, subscribe: true})
    protected to?: number;

    @property({type: String, reflect: true, attribute: true, converter: {
        fromAttribute: (value: string) => {
            return Math.round( parseFloat( value ) )
        },
        toAttribute: (value: number) => {
            return value.toString();
        }
    }})
    public fixed: number = 2;

    @property({type: String, reflect: true, attribute: true})
    public separator: string = "-";

    protected render(): unknown {

        if ( this.from === undefined || this.to === undefined ) {
            return nothing;
        }

        return html`
            <div>
                <span>${this.from?.toFixed(this.fixed)} °C</span>
                <span>${this.separator}</span>
                <span>${this.to?.toFixed(this.fixed)} °C</span>
            </div>
        `;
    }

    

}

declare global {
    interface HTMLElementTagNameMap {
        "registry-range-display": RegistryRangeDisplay;
    }
}