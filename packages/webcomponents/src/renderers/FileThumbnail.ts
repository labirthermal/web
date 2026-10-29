import type { ThermalFileInstance } from "@labirthermal/core";
import { t } from "i18next";
import type { CSSResultGroup } from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { AbstractFileConsumer } from "../hierarchy/consumers/AbstractFileConsumer";
import { T } from "../translations/Languages";
import { booleanConverter } from "../utils/converters/booleanConverter";

export class FileThumbnailElement extends AbstractFileConsumer {

    @property({ type: Object })
    ondetail?: (file: ThermalFileInstance) => void;

    @property({ converter: booleanConverter(false) })
    public norender: boolean = false;

    @property({ type: String })
    public label?: string;

    public onInstanceCreated(): void {}

    public onFailure(): void {}

    static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        header {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            padding-bottom: 5px;
            color: var(--thermal-foreground);
            
            h2 {
                margin: 0;
                padding: 0;
                flex-grow: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: var( --thermal-fs-sm );

                file-label {
                    white-space: preserve nowrap;
                }

                &:hover {
                    cursor: pointer;
                    color: var( --thermal-primary );
                }
            }

            & > div {
                display: flex;
                flex-wrap: nowrap;
                gap: 5px;
            }

        }
    
    `;

    protected render(): unknown {

        return html`

            <header>
                <h2
                    @click=${() => this.ondetail?.(this.file!)}
                >
                    <file-label label="${ifDefined(this.label)}"></file-label>
                </h2>
                <div>
                    <thermal-btn size="sm" variant="background" @click=${() => this.ondetail?.(this.file!)}>${t(T.detail).toLocaleLowerCase()}</thermal-btn>
                    <file-range-propagator></file-range-propagator>
                    <file-dropdown>
                        <file-info-button>
                            <file-button slot="invoker" label=${t(T.info).toLowerCase()}></file-button>
                        </file-info-button>
                        <file-download-lrc></file-download-lrc>
                        <file-download-png></file-download-png>
                    </file-dropdown>
                </div>
            </header>

            <main>
                <file-canvas norender="${this.norender}"></file-canvas>
                <file-timeline></file-timeline>
                <file-analysis-table mode="compact"></file-analysis-table>
            </main>
        
    `;
    }

}