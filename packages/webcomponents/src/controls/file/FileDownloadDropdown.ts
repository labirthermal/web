import type { ThermalFileInstance } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import type { Ref } from "lit/directives/ref.js";
import { AbstractFileConsumer } from "../../hierarchy/consumers/AbstractFileConsumer";
import { configContext } from "../../controllers/ConfigController";
import type { ConfigController } from "../../controllers/ConfigController";
import { T } from "../../translations/Languages";
import type { ThermalDialogElement } from "../../ui/Dialog";
import type { ThermalDropdownElement } from "../../ui/Dropdown";
import { ifDefined } from "lit/directives/if-defined.js";

export class FileDownloadButton extends AbstractFileConsumer {

    @state()
    @consume({ context: configContext, subscribe: true })
    protected configController?: ConfigController;

    @state()
    protected hasGraphs: boolean = false;

    @property({ type: String, reflect: true })
    public variant?: string;

    @property({ type: String, reflect: true })
    public icon?: string;

    @property({ type: String, reflect: true })
    public iconStyle?: string;

    protected recordingGraphRef: Ref<ThermalDialogElement> = createRef();
    protected dropdownRef: Ref<ThermalDropdownElement> = createRef();

    public onInstanceCreated(instance: ThermalFileInstance): void {
        instance.analysisData.onGraphsPresence.set(this.UUID, value => {
            this.hasGraphs = value;
        });
        this.hasGraphs = instance.analysisData.hasActiveGraphs;
    }

    public onFailure(): void {
        // throw new Error("Method not implemented.");
    }


    protected render(): unknown {

        if (this.file === undefined) {
            return nothing;
        }

        return html`

            <thermal-dropdown ${ref(this.dropdownRef)} class="download"
                icon=${ifDefined( this.icon )}
                iconStyle=${ifDefined( this.iconStyle )}
                variant=${ifDefined( this.variant )}
            >

                <slot name="invoker" slot="invoker">
                    <div class="button">
                        ${this.file
                ? t(T.download)
                : "..."
            }
                    </div>
                </slot>

                <thermal-btn 
                    slot="option"
                    @click="${() => window.open(this.file!.thermalUrl)}"
                    pre=${this.file.reader.parser.extensions[0].extension.toUpperCase()}
                    align="left"
                >
                    ${t(T.downloadoriginalfile, { type: this.file.reader.parser.extensions[0].extension.toUpperCase() })}
                </thermal-btn>

                <thermal-btn 
                    slot="option"
                    @click=${() => this.file!.export.downloadPng({
                        width: this.configController?.settings.export.png.width ?? 1350,
                        fontSize: this.configController?.settings.export.png.fontSize,
                        showAnalysis: this.configController?.settings.export.png.analyses,
                        showThermalScale: this.configController?.settings.export.png.thermalScale,
                        showFileDate: this.configController?.settings.export.png.fileDate,
                        showFileName: this.configController?.settings.export.png.fileName
                    })}
                    pre="PNG"
                    align="left"
                >
                    ${t(T.exportcurrentframeaspng)}
                </thermal-btn>

                <file-video-export-button 
                    pre="${this.file.timeline.isSequence ? "MP4 / PNG" : "PNG"}" 
                    label="Pokročilý export" 
                    slot="option"
                    style="width: 100%"
                ></file-video-export-button>



                    ${this.hasGraphs === true
                ? html`<thermal-btn 
                            slot="option"
                            @click=${() => this.file?.analysisData.downloadData()}
                            pre="CSV"
                            align="left"
                    >
                        ${t(T.csvofanalysisdata)}
                    </thermal-btn>`
                : nothing
            }
            
            </thermal-dropdown>

            <thermal-dialog 
                ${ref(this.recordingGraphRef)}
                label="Export souboru do videa"
                button="Začít nahrávat"
                .beforeClose=${ async () => {
                    this.file?.recording.recordEntireFile();
                    return true;
                }}
            >

                <div slot="content">

                    <p>Export probíhá tak, že sekvenci ve Vašem prohlížeči přehrajeme a zaznamenáme do video souboru.</p>

                    <p>Součástí exportu <i>nejsou analýzy ani teplotní škála</i>.</p>

                    <p><strong>Při nahrávání bude použito aktuální nastavení:</strong></p>

                    <table>

                        <tr>
                            <td>Barevná paleta</td>
                            <td>
                                <manager-palette-dropdown></manager-palette-dropdown>
                            </td>
                        </tr>

                        <tr>
                            <td>Teplotní rozsah</td>
                            <td>
                                <registry-range-form></registry-range-form>
                            </td>
                        </tr>

                        <tr>
                            <td>Rychlost přehrávání</td>
                            <td>
                                <file-playback-speed-dropdown></file-playback-speed-dropdown>
                            </td>
                        </tr>

                    </table>

                    <p>Chcete zahájit nahrávání?</p>


                </div>

                <thermal-btn slot="button" @click=${() => this.dropdownRef.value?.setClose()}>
                    Zrušit
                </thermal-btn>

            </thermal-dialog>

        
        `
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-download-dropdown": FileDownloadButton;
    }
}
