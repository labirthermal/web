import { consume } from "@lit/context";
import { t } from "i18next";
import type { CSSResultGroup } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractGroupConsumer } from "../../hierarchy/consumers/AbstractGroupConsumer";
import type { ConfigController } from "../../controllers/ConfigController";
import { configContext } from "../../controllers/ConfigController";
import { T } from "../../translations/Languages";

export class GroupDownloadButtons extends AbstractGroupConsumer {

    @property({type: String})
    public label?: string;

    @state()
    @consume({ context: configContext, subscribe: true })
    protected configController?: ConfigController;

    static styles?: CSSResultGroup | undefined = css`

        :host {
        
            display: flex;
            flex-direction: column;
            gap: 5px;

        }

        button.default {
            font-size: calc( var(--thermal-fs) * .8 );
            color: var(--thermal-foreground);
            border-color: var(--thermal-slate);
            border-style: solid;
            border-width: 1px;
            border-radius: var( --thermal-radius );
            background-color: var(--thermal-slate-light);
            white-space: preserve nowrap;
            &:hover {
                cursor: pointer;
                background: var(--thermal-background);
            }
        }
    
    `;


    protected render(): unknown {

        const png = this.configController?.settings.export.png;
        const group = this.configController?.settings.export.group;

        return html`
        
                <button class="default" @click=${() => this.groupObject.files.downloadAllFiles()}>${t(T.downloadoriginalfiles)}</button>
            
                <button class="default" @click=${() => this.groupObject.forEveryInstance(instance => instance.export.downloadPng())}>${t(T.pngofindividualimages)}</button>
            
            
                <button class="default" @click=${() => this.groupObject.analysisSync.png.downloadPng({
                    columns: group?.columns,
                    showAnalysis: png?.analyses,
                    showFileDate: png?.fileDate,
                    showFileName: png?.fileName,
                    showThermalScale: png?.thermalScale,
                    showGroupName: group?.groupName,
                    label: this.label,
                    fontSize: png?.fontSize
        })}>${t(T.pngofentiregroup)}</button>
            
                <button class="default" @click=${() => { this.groupObject.analysisSync.csv.downloadAsCsv() }}>${t(T.csvofanalysisdata)}</button>
        
        `;

    }



}

declare global {
    interface HTMLElementTagNameMap {
        "group-download-buttons": GroupDownloadButtons;
    }
}