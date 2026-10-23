import { consume } from "@lit/context";
import type { CSSResultGroup} from "lit";
import { css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { AbstractFileConsumer } from "../../../hierarchy/consumers/AbstractFileConsumer";
import { durationConverter } from "../../../utils/converters/durationConverter";
import { notationDurationContext, notationListContext } from "./NotationContext";
import type { NotationEntry } from "./NotationEntry";

@customElement("notation-timeline")
export class NotationContent extends AbstractFileConsumer {

    protected durationConverter = durationConverter;
    public onInstanceCreated(): void {}
    public onFailure(): void {}

    @state()
    @consume({ context: notationListContext, subscribe: true })
    protected entries!: NotationEntry[];

    @consume({ context: notationDurationContext, subscribe: true })
    protected duration!: number;

    protected renderEntry( entry: NotationEntry ) {

        if ( entry.from !== undefined && entry.to !== undefined ) {

            const left = entry.from / this.duration * 100;
            const right = entry.to / this.duration * 100;
            const width = right - left;

            return html`<button class="entry" style="left: ${left}%; width: ${width}%; ${entry.color ? `background-color: ${entry.color};` : "" }}" @click=${() => this.file?.timeline.setRelativeTime(entry.from! + 1)}>
                ${entry.label !== undefined ? html`<div class="entry-tooltip">
                    <div class="time">${this.durationConverter.toAttribute( entry.from )} - ${this.durationConverter.toAttribute( entry.to )}</div>
                    <div class="label">${entry.label}</div>
                </div>` : nothing }
            </button>`;

        }

        return nothing;

    }

    static styles?: CSSResultGroup | undefined = css`
    
        ::host {
            width: 100%;
            box-sizing: border-box;
            height: 5px;
            position: relative;
            margin-bottom: 5px;
            margin-top: 3px;
            display: block;
            overflow: hidden;
        }

        .container {
            width: 100%;
            position: relative;
            height: 5px;
            top: 0px;
        }

        .entry {
            height: 7px;
            background: var(--thermal-foreground);
            position: absolute;
            top: -2px;
            cursor: pointer;
            border: 0;
            border-left: 1px solid var(--thermal-foreground);
            box-sizing: border-box;
        }

        .entry:nth-child(2n) {
            background-color: var(--thermal-slate-dark);
        }

        .entry-tooltip {
            display: none;
            z-index: 99999;
        }

        .entry:hover,
        .entry:focus {

            background: var(--thermal-primary);
            box-shadow: var(--thermal-shadow);

            .entry-tooltip {

                display: block;
                position: absolute;
                left: -1px;
                bottom: 7px;
                width: 0px;
                text-align: center;

                > div {

                    display: inline-block;
                    padding: 5px 7px;
                    white-space: preserve nowrap;
                    background: var(--thermal-primary-dark);
                    color: var(--thermal-background);
                    text-align: center;
                    
                    border-left: 1px solid var(--thermal-foreground);

                    &.time {
                        border-radius: var(--thermal-radius) var(--thermal-radius) var(--thermal-radius) 0px;
                        font-size: 0.7em;
                        background: var(--thermal-foreground);
                        color: var(--thermal-background);
                    }
                    &.label {
                        border-radius: 0px var(--thermal-radius) var(--thermal-radius) 0px;
                        border-bottom: 1px solid var(--thermal-foreground);
                    }

                    

                }
            }

        }

    `;

    protected render() {
        return html`<div class="container">
            ${map(this.entries, this.renderEntry.bind(this))}
        </div>`;
    }

}