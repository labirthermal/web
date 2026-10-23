import { consume } from "@lit/context";
import { t } from "i18next";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { AbstractThermalElement } from "../../hierarchy/AbstractThermalElement";
import type { ConfigController } from "../../controllers/ConfigController";
import { configContext } from "../../controllers/ConfigController";
import { T } from "../../translations/Languages";

export class ManagerExportPanel extends AbstractThermalElement {

    @state()
    @consume({ context: configContext, subscribe: true })
    protected configController?: ConfigController;



    protected renderRow(
        label: string,
        content: ReturnType<typeof html>,
        hint?: ReturnType<typeof html> | string
    ) {
        return html`<thermal-field label="${label}">
                <div>${content}</div>
                ${hint ? hint : nothing}
            </thermal-field>`;
    }

    protected renderGroup(
        label: string,
        content: ReturnType<typeof html>,
    ) {
        return html`<fieldset>
            <legend>${label}</legend>
            ${content}
        </fieldset>`;
    }

    protected formatTip(
        value?: ReturnType<typeof html> | string,
    ) {
        return value ? html`<div class="hint">${value}</div>` : "";
    }

    protected renderCheckbox(
        key: string,
        label: string,
        value: boolean,
        onChange: (value: boolean) => void
    ) {
        const content = html`<input name="${key}" type="checkbox" ?checked="${value}" @input=${(event: InputEvent) => {
            const target = event.target as HTMLInputElement;
            const value = target.checked;
            onChange(value);
        }}>`;
        return html`<div>${content}<label for="${key}">${label}</label></div>`;
    }

    protected renderSlider(
        key: string,
        label: string,
        value: number,
        unit: string,
        min: number,
        max: number,
        step: number,
        onChange: (value: number) => void,
        hint?: ReturnType<typeof html> | string

    ) {

        const content = html`<input 
                name="${key}"
                value="${value}"
                min="${min}"
                max="${max}"
                step="${step}"
                type="range"
                @input="${(event: { target: { value: string } }) => {
                const value = Math.min(max, Math.max(0, parseFloat(event.target.value)));
                onChange(value);
            }}"
            ></input>`;

        const help = html`<strong>${value} ${unit}</strong> (${min} - ${max} ${unit})${hint ? "<br />" + hint : ""}`;
        const tip = this.formatTip(help);

        return this.renderRow(label, content, tip);
    }



    static styles?: CSSResultGroup | undefined = css`
        
            :host {
                display: contents;
            }

            .hint {
                font-size: calc( var( --thermal-fs-sm ) * .75 );
                padding-top: .2em;
            }

            fieldset {
                border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                border-radius: var(--thermal-radius);
                margin-bottom: var(--thermal-gap);

                legend {
                    border-radius: var(--thermal-radius);
                    border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                    padding: 0.3em 0.5em;
                }

            }

            
        
        `;

    updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);

        if (!this.configController || !_changedProperties.has("config")) {
            return;
        }

        const settings = this.configController.settings.export.png;
        const values = [
            ["pngWidth", settings.width],
            ["pngFs", settings.fontSize]
        ] as const;

        for (const [key, value] of values) {
            const element = this.shadowRoot?.querySelector(`input[name="${key}"]`) as HTMLInputElement | null;
            if (element && Number(element.value) !== value) {
                element.value = value.toString();
            }
        }
    }

    protected render(): unknown {

        if (!this.configController) {
            return nothing;
        }

        const { png, group } = this.configController.settings.export;

        return html`

        ${this.renderGroup(t(T.exportcontent), html`
            ${this.renderCheckbox("pngExportAnalyses", t(T.analyses), png.analyses, value => this.configController!.setPngAnalyses(value))}
            ${this.renderCheckbox("pngExportScale", t(T.thermalscale), png.thermalScale, value => this.configController!.setPngThermalScale(value))}
            ${this.renderCheckbox("pngExportFileName", t(T.exportfilenames), png.fileName, value => this.configController!.setPngFileName(value))}
            ${this.renderCheckbox("pngExportFileDate", t(T.filedate), png.fileDate, value => this.configController!.setPngFileDate(value))}
        ` )}

        ${this.renderGroup(t(T.exportdimensions), html`
            ${this.renderSlider("pngWidth", t(T.exportimagewidth), png.width, "px", 500, 2000, 50, value => this.configController!.setPngWidth(value))}

            ${this.renderSlider("pngFs", t(T.exportimagefontsize), png.fontSize, "px", 10, 50, 1, value => this.configController!.setPngFontSize(value))}
        ` )}

        ${this.renderGroup(t(T.exportgroup), html`
            ${this.renderCheckbox("pngExportGroupName", t(T.exportgroupname), group.groupName, value => this.configController!.setGroupGroupName(value))}
            ${this.renderSlider("pngColumns", t(T.exportfilenames), group.columns, "sloupců", 1, 5, 1, value => this.configController!.setGroupColumns(value))}
        ` )}

        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "manager-export-panel": ManagerExportPanel;
    }
}