import { css, html } from "lit";
import { AbstractSingleFileAppElement } from "./AbstractSingleFileApp";

/**
 * Places left and right slot content beside the canvas, sized to their content.
 * Top, bottom and unnamed slot content span the full width.
 */
export class ThermalSlottedAppElement extends AbstractSingleFileAppElement {

    static styles = css`
    
        :host {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            grid-template-areas:
                "left top right"
                "left viewer right"
                "left bottom right"
                "extra extra extra";
            align-items: start;
        }

        slot {
            display: block;
            min-width: 0;
            grid-area: extra;
        }

        slot[name="top"] {
            grid-area: top;
        }

        slot[name="left"] {
            grid-area: left;
        }

        file-canvas {
            grid-area: viewer;
            min-width: 0;
        }

        slot[name="right"] {
            grid-area: right;
        }

        slot[name="bottom"] {
            grid-area: bottom;
        }
    
    `;

    
    render() {
        return html`
            <slot name="top"></slot>
            <slot name="left"></slot>
            <file-canvas></file-canvas>
            <slot name="right"></slot>
            <slot name="bottom"></slot>
            <slot></slot>
        `;
    }

}

