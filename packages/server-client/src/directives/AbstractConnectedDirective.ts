import { t } from "@labirthermal/webcomponents";
import type { Part } from "lit";
import { html } from "lit";
import { Directive } from "lit/directive.js";
import { T } from "../translations/Languages";
import { DirectiveHelpers } from "./DirectiveHelpers";

export abstract class AbstractConnectedDirective extends Directive {

    protected t(
        key: keyof typeof T
    ): string {
        return t( T[ key ] );
    }

    update(_part: Part, props: Array<unknown>): unknown {
        return this.render( ...props );
    }

    protected unknownContainsSomething( content: unknown ): boolean {

        return DirectiveHelpers.unknownContainsSomething( content );

    }

    protected renderThermalScale(): unknown {
        return html`<div>
        <registry-histogram expandable="true"></registry-histogram>
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>
    </div>`;
    }

    protected renderDef(...args: unknown[]): unknown {

        const content: unknown[] = [];

        const first = args.shift();
        if ( first ) {
            content.push( html`<dt>${first}</dt>` );
        }

        args.forEach( item => {
            content.push( html`<dd>${item}</dd>` );
        } );

        return content;

    }

}