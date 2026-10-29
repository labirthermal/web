import { t } from "i18next";
import type { CSSResultGroup } from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { AbstractGroupConsumer } from "../../hierarchy/consumers/AbstractGroupConsumer";
import { T } from "../../translations/Languages";

export class GroupAnalysisSyncButton extends AbstractGroupConsumer {

    @property({ type: Boolean, reflect: true })
    public on: boolean = false;

    connectedCallback(): void {
        super.connectedCallback();

        if (this.on) {
            const id = this.UUID + "__initial";
            this.groupObject.files.addListener(id, value => {
                if (value.length > 0) {
                    this.groupObject.analysisSync.turnOn(value[0]);
                    this.groupObject.files.removeListener(id);
                }
            });
        } else {
            this.on = this.groupObject.analysisSync.value;
        }

        this.groupObject.analysisSync.addListener(this.UUID, value => {
            this.on = value;
        });

        this.addEventListener("click", () => {
            this.toggle();
        });
    }

    public turnOn() {
        if (this.groupObject.files.value.length > 0) {
            this.groupObject.analysisSync.turnOn(this.groupObject.files.value[0]);
        }
    }

    public turnOff() {
        this.groupObject.analysisSync.turnOff();
    }

    public toggle() {
        if (this.on) {
            this.turnOff();
        } else {
            this.turnOn();
        }
    }

    public static styles?: CSSResultGroup | undefined = css`
    
        :host {
            font-size: var(--thermal-fs);
            cursor: pointer;
        }

        :host(:hover) {
            span {

            }

        }

        :host([on=true]) {
            span i {
                background: var(--thermal-primary);
            }
        }

        :host([on=false]) {
            span i {
                background: var(--thermal-slate);
            }
        }

        span {
            transition: all .3s ease-in-out;
            display: inline-block;
            width: .8em;
            height: .8em;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            position: relative;
            overflow: hidden;
        }

        i {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid var(--thermal-background);
            box-sizing: border-box;
        }

        input {
            display: none;
        }

        div {
            font-size: .9em;
            pointer-events: visible;
            display: inline-block;
        }
    
    `;

    public render(): unknown {
        return html`  
        <span><i></i></span>      
        <div>${t(T.analysissync)}</div>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "group-analysis-sync-button": GroupAnalysisSyncButton;
    }
}