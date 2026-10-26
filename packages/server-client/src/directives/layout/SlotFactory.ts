import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { T } from "../../translations/Languages";
import { DirectiveHelpers } from "../DirectiveHelpers";

export class SlotFactory {

    private items: unknown[] = [];

    private constructor(
        private readonly label: keyof typeof T,
        private readonly slot: string|undefined = undefined,
        private readonly classes: string[] = []
    ) {}

    public static section(
        label: keyof typeof T,
        slot?: string,
        classes?: string[]
    ): SlotFactory {

        return new SlotFactory( label, slot, classes );

    }

    addClass(
        value: string
    ): SlotFactory {
        if ( !this.classes.includes( value ) ) {
            this.classes.push( value );
        }
        return this;
    }

    removeClass(
        value: string
    ): SlotFactory {
        this.classes.splice( this.classes.indexOf( value ), 1 );
        return this;
    }

    addChild( item: unknown ): SlotFactory {
        this.items.push( item );
        return this;
    }

    render(): unknown {

        if ( ! DirectiveHelpers.unknownContainsSomething( this.items ) ) {
            return nothing;
        }

        const cls = this.classes.length > 0
            ? this.classes.join( ' ' )
            : undefined;

        return html`<thermal-slot
            label=${ this.label }
            slot${ ifDefined(this.slot) }
            class=${ ifDefined( cls ) }
        >
            ${ this.items }
        </thermal-slot>`;

    }



}