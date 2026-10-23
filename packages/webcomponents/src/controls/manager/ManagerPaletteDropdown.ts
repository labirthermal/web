import type { AvailableThermalPalette, ThermalPaletteType } from "@labirthermal/core";
import { t } from "i18next";
import { css, html } from "lit";
import { T } from "../../translations/Languages";
import { AbstractPaletteSwitch } from "./AbstractPaletteSwitch";

export class ManagerPaletteDropdown extends AbstractPaletteSwitch {

    static styles = css`

    .palette {
        display: block;
        width: calc( var( --thermal-gap ) * 2 );
        height: calc( var( --thermal-fs ) * .8 );
        border-radius: var( --thermal-fs-small );
    }

    thermal-btn {
        width: 100%;
        justify-content: flex-start;
    }

    `;

    protected paletteTemplate(
        palette: ThermalPaletteType
    ) {
        return html`<span class="palette" style="background:${palette.gradient}"></span><span>${palette.name}</span>`;
    }

    protected render(): unknown {
        return html`

            <thermal-dropdown .tooltip=${t(T.colourpalette)}>
                    <span slot="invoker" class="palette" style="background:${this.managerObject.palette.currentPalette.gradient}"></span>

                ${this.palettes.map( palette => html`
                    <div slot="option"><thermal-btn @click=${() => this.onSelect(palette.slug as AvailableThermalPalette)} variant="${palette.name === this.managerObject.palette.currentPalette.name ? "background" : "slate"}">
                        ${this.paletteTemplate(palette)}
                    </thermal-btn></div>
                `)}
            
            </thermal-dropdown>

            <slot></slot>

        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "manager-palette-dropdown": ManagerPaletteDropdown;
    }
}