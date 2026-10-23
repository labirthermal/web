import { html, nothing } from "lit";
import { T } from "../translations/Languages";
import { AbstractThermalDirective } from "./AbstractThermalDirective";
import { t } from "i18next";
import { directive } from "lit/directive.js";

class SlotOrNothing extends AbstractThermalDirective {

    render( 
        label: keyof typeof T,
        content: unknown
    ): unknown {

        if ( ! this.unknownContainsSomething( content ) ) {
            return nothing;
        }

        return html`<thermal-slot
            label=${t(T[ label ])}
        >${content}</thermal-slot>`;

    }
    
}

export const slotOrNothing = directive(SlotOrNothing);