import type { AvailableThermalPalette, ThermalPaletteType } from "@labirthermal/core";
import { t } from "i18next";
import { css, html } from "lit";
import { T } from "../../translations/Languages";
import { AbstractPaletteSwitch } from "./AbstractPaletteSwitch";

export class ManagerPaletteButtons extends AbstractPaletteSwitch {

    static styles = css`
:host {
    display: flex;
    width: content-width;
    gap: 5px;
}

.palette {
    width: calc( var( --thermal-gap ) * 2 );
    height: calc( var( --thermal-fs ) * .8 );
    border-radius: var( --thermal-fs-small );
}`;

    private paletteTemplate(
        palette: ThermalPaletteType
    ) {
        return html`<span class="palette" style="background:${palette.gradient}"></span>`;
    }

    protected render(): unknown {

        return this.palettes.map((palette => html`<thermal-btn 
    @click=${() => this.onSelect(palette.slug as AvailableThermalPalette)} 
    variant="${palette.name === this.managerObject.palette.currentPalette.name ? "background" : "default"}"
    tooltip="${t(T.palettename, { name: palette.name })}"
>
    ${this.paletteTemplate(palette)}
</thermal-btn>`));
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "manager-palette-buttons": ManagerPaletteButtons;
    }
}
