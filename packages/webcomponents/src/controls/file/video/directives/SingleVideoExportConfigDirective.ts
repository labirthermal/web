import { css, html } from "lit";
import { directive, Directive } from "lit/directive.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { QUALITY_HIGH, QUALITY_LOW, QUALITY_MEDIUM, QUALITY_VERY_HIGH, QUALITY_VERY_LOW } from "mediabunny";
import { slotOrNothing } from "../../../../directives/SlotOrNothing";
import { T } from "../../../../translations/Languages";
import type { AbstractSingleVideoExport } from "../AbstractSingleVideoExport";
import type { VideoExportSkin } from "../ISingleVideoExportElement";

export class SingleVideoExportConfigDirective extends Directive {

    private renderRadio(
        label: string,
        checked: boolean,
        onChange: (value: boolean) => void
    ): unknown {
        return html`<thermal-radio
            .checked=${checked}
            .onChange=${onChange}
        >${label}</thermal-radio>`;
    }

    private renderText(
        label: string,
        suffix: string,
        value: string,
        onChange: (value: string) => void
    ): unknown {
        return html`<div class="export-config-field export-config-field--text">

            <div class="export-config-field--label">
                <label>${label}</label>
            </div>

            <div class="export-config-field--value">

                <div class="">
                    <input
                        type="text"
                        .value=${value}
                        @input=${(event: InputEvent) => {
                const target = event.target as HTMLInputElement;
                onChange(target.value);
            }}
                    />
                    <span class="unit">${suffix}</span>
                </div>

            </div>

        </div>`;
    }

    private renderDropdown(
        value: string,
        options: string[],
        onChange: (value: string) => void
    ): unknown {

        const elements: unknown[] = options.map(option => html`<thermal-btn
            slot="option"
            @click=${() => onChange(option)}
        >${option}</thermal-btn>`);

        return html`<thermal-dropdown>
            <span slot="invoker">${value}</span>
            ${elements}
        </thermal-dropdown>`;

    }

    private renderNumber(
        label: string,
        unit: string,
        value: number,
        onChange: (value: number) => void,
        min?: number,
        max?: number,
        step?: number
    ): unknown {
        return html`<div class="export-config-field">

            <div class="export-config-field--label">
                <label>${label}</label>
            </div>

            <div class="export-config-field--value">

                <div class="">
                    <input
                        type="number"
                        .value=${value === undefined || value === null ? "" : String(value)}
                        min=${ifDefined(min)}
                        max=${ifDefined(max)}
                        step=${ifDefined(step)}
                        @input=${(event: InputEvent) => {
                const target = event.target as HTMLInputElement;
                const raw = target.value.trim();
                if (raw === "") {
                    // empty - signal with NaN
                    onChange(NaN);
                    return;
                }
                let num = parseFloat(raw);
                if (min !== undefined && !isNaN(num) && num < min) num = min;
                if (max !== undefined && !isNaN(num) && num > max) num = max;
                onChange(num);
            }}
                    />
                    <span class="unit">${unit}</span>
                </div>

            </div>

        </div>`;
    }

    private renderConfigHeader(
        element: AbstractSingleVideoExport
    ): unknown {


        const isSequence = element.innerFile?.timeline.isSequence;
        const hasAnalyses = element.parentHasAnalyses;

        const slots: unknown[] = [];

        const thermalScale: unknown[] = [
            html`<manager-palette-dropdown ></manager-palette-dropdown>`,
            html`<registry-range-form></registry-range-form>`
        ];

        slots.push(slotOrNothing("thermalscale", thermalScale));

        const components: unknown[] = [
            this.renderRadio(
                element.t(T.histogram),
                element.renderProps.hasHistogram,
                element.setHasHistogram.bind(element)
            ),
            this.renderRadio(
                element.t(T.thermalscale),
                element.renderProps.hasThermalScale,
                element.setHasThermalScale.bind(element)
            ),

        ];

        if (hasAnalyses) {
            components.push(
                this.renderRadio(
                    element.t(T.analysis),
                    element.renderProps.hasAnalysis,
                    element.setHasAnalysis.bind(element)
                )
            );
        }

        if ( isSequence ) {
            components.push(
                this.renderRadio(
                    element.t(T.timeline),
                    element.renderProps.hasTimeline,
                    element.setHasTimeline.bind(element)
                )
            );
        }

        slots.push(slotOrNothing("exportcontent", components));

        const appearance: unknown[] = [];

        if (hasAnalyses && element.renderProps.hasAnalysis) {
            appearance.push(
                this.renderRadio(
                    "Is Vertical",
                    element.renderProps.isVertical,
                    element.setIsVertical.bind(element)
                ),
            );
        }

        appearance.push(
            this.renderDropdown(
                element.renderProps.skin,
                ["light", "dark", "solarized"],
                (value: string) => element.setSkin(value as VideoExportSkin)
            )
        );

        slots.push(slotOrNothing("display", appearance));

        slots.push(
            this.renderNumber(
                element.t(T.exportwidth),
                "px",
                element.renderProps.exportFrameWidth,
                element.setExportFrameWidth.bind(element),
                500,
                1920,
                10
            )
        );

        slots.push(
            this.renderNumber(
                element.t(T.exportmargin),
                "px",
                element.renderProps.exportFramePadding,
                element.setExportFramePadding.bind(element),
                0,
                100,
                1
            )
        );


        if (hasAnalyses && element.renderProps.hasAnalysis) {

            slots.push(
                this.renderNumber(
                    element.t(T.exportgap),
                    "px",
                    element.renderProps.exportFrameGap,
                    element.setExportFrameGap.bind(element),
                    0,
                    100,
                    1
                )
            );

            slots.push(
                this.renderNumber(
                    element.t(T.exportgrahpheight),
                    "px",
                    element.renderProps.exportGraphHeight,
                    element.setExportGraphHeight.bind(element),
                    200,
                    700,
                    1
                )
            );

        }


        const ext = isSequence ? ".mp4 / .png" : ".png"


        // Název souboru
        slots.push(
            this.renderText(
                element.t(T.name),
                ext,
                element.renderProps.fileName,
                element.setFileName.bind(element)
            )
        );


        if (isSequence) {

            const options = [
                {
                    label: "VERY_HIGH",
                    value: QUALITY_VERY_HIGH
                },
                {
                    label: "HIGH",
                    value: QUALITY_HIGH
                },
                {
                    label: "MEDIUM",
                    value: QUALITY_MEDIUM
                },
                {
                    label: "LOW",
                    value: QUALITY_LOW
                },
                {
                    label: "VERY_LOW",
                    value: QUALITY_VERY_LOW
                }
            ];

            const choices = options.map(option => option.label);
            const setter = (label: string) => {
                const found = options.find(o => o.label === label);
                if (found) {
                    element.setMp4Quality(found.value);
                    console.log(found.value);
                }
            }

            const value = options.find(o => o.value === element.renderProps.mp4Quality)?.label ?? "UNKNOWN";

            const output: unknown[] = [

                this.renderDropdown(
                    value,
                    choices,
                    setter.bind(this)
                )

            ];

            slots.push(slotOrNothing(T.videoquality, output));

        }






        return slots;

    }

    public static readonly styles = css`
    
        .export-bar {

            width: 100%;

            .export-bar-part {
            }

            .export-bar-part--config {
                display: flex;
                flex-wrap: wrap;
                gap: 1em 2em;

                background: var( --thermal-background );
                padding: 1em;

                border-radius: var( --thermal-radius );

                thermal-slot {
                    box-sizing: border-box;
                }
            }

            .export-bar-part--actions {
            }
        

            .export-config-field {

                &:hover,
                &:focus-within {
                    .export-config-field--label {
                        color: var( --thermal-foreground );
                        &::after {
                            background: var( --thermal-foreground );
                        }
                    }
                }
                
                .export-config-field--label {

                    margin: 0px 0px 0.5em;
                    padding: 0px;
                    font-weight: normal;
                    font-size: 0.7em;
                    text-transform: uppercase;
                    color: var(--thermal-slate);
                    display: flex;
                    align-items: center;
                    gap: 0.5em;

                    &::after {
                        content: "";
                        flex-grow: 1;
                        height: 1px;
                        background: var( --thermal-slate-light );
                    }

                }

                .export-config-field--value {

                    input {
                        border: var( --thermal-slate-light ) solid 1px;
                        text-align: right;
                        font-family: var( --thermal-ff );
                        padding: .3em .1em .3em .3em;
                        width: 5em;
                        display: inline-block;
                    }

                    .unit {
                        font-size: 0.7em;
                    }

                }

                &.export-config-field--text {
                    .export-config-field--value input {
                        width: 200px;
                        text-align: left;
                    }
                }
            
            }

        
        }
    
    `;


    public render(element: AbstractSingleVideoExport): unknown {

        return html`<div class="export-bar">

            <div class="export-bar-part export-bar-part--config">
                ${this.renderConfigHeader(element)}
            </div>
        
        </div>`;

    }

}

export const exportConfigDirective = directive(SingleVideoExportConfigDirective);