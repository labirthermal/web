import type { ThermalFileInstance } from "@labirthermal/core";
import { ThermalFileFailure } from "@labirthermal/core";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { state } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractGroupConsumer } from "../../hierarchy/consumers/AbstractGroupConsumer";
import type { Tick } from "../../utils/timelineTicks";
import { calculateTicks, renderTicks, ticksCss } from "../../utils/timelineTicks";



export class GroupTimelineElement extends AbstractGroupConsumer {

    public static TICK_WIDTH = 50;
    public static TICK_POINTER_HEIGHT = 3;

    @state()
    longestDurationInMs?: number;

    @state()
    ms: number = 0;

    @state()
    pointerMs?: number;

    @state()
    playing: boolean = false;

    @state()
    instances: ThermalFileInstance[] = [];

    @state()
    has: boolean = false;

    @state()
    ticks: Tick[] = [];

    protected timelineRef: Ref<HTMLDivElement> = createRef();
    protected indicatorRef: Ref<HTMLDivElement> = createRef();

    @state()
    listener?: ReturnType<typeof setTimeout>;


    connectedCallback(): void {

        super.connectedCallback();

        this.groupObject.registry.batch.onBatchComplete.set(
            this.UUID,
            this.onRegistryBatchEnded.bind(this)
        );

        this.groupObject.files.addListener(this.UUID, (value) => {
            if ( this.listener !== undefined ) {
                clearTimeout( this.listener );
            }
            this.listener = setTimeout( async () => {
               this.onRegistryBatchEnded( value );
            }, 0 );
        });

        this.groupObject.playback.addListener(this.UUID, value => this.ms = value);

        this.groupObject.playback.onPlayingStatusChange.set(this.UUID, value => this.playing = value);

        this.groupObject.playback.onHasAnyCallback.set(this.UUID, value => this.has = value);

    }

    updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);


        // Project the local status to the affected instances
        if (_changedProperties.has("ms")) {
            if (this.ms !== undefined) {

                if (this.ms !== this.groupObject.playback.value)
                    this.groupObject.playback.setValueByRelativeMs(this.ms);

                if (this.indicatorRef.value) {
                    this.indicatorRef.value.style.width = this.msToPercent(this.ms) + "%";
                }

            }
        }

    }


    protected onRegistryBatchEnded(
        results: (ThermalFileInstance | ThermalFileFailure)[]
    ): void {

        let length = 0;

        this.instances = results
            .filter(result => {
                if (result instanceof ThermalFileFailure)
                    return false;
                return result.group.id === this.groupObject.id
            }) as ThermalFileInstance[];

        this.instances.forEach(result => {

            if (result.timeline.duration > length) {
                length = result.timeline.duration;
            }
        });

        this.longestDurationInMs = length;

        setTimeout(() => {

            const timeline = this.getTimelineElement();

            if (timeline && this.longestDurationInMs !== undefined) {

                this.calculateTicks(timeline.clientWidth, this.longestDurationInMs);


                const resizeObserver = new ResizeObserver((entries) => {

                    const e = entries[0];

                    if (this.longestDurationInMs) {
                        this.calculateTicks(e.contentRect.width, this.longestDurationInMs);
                    }

                });

                resizeObserver.observe(timeline);

            }

        }, 0);



    }



    protected calculateTicks(
        width: number,
        duration: number
    ) {
        this.ticks = calculateTicks( width, duration );
    }

    protected forEveryAffectedInstance(fn: (instance: ThermalFileInstance) => void) {
        this.instances.forEach(fn);
    }

    protected percentToMs(
        percent: number
    ) {

        if (this.longestDurationInMs === undefined) {
            return undefined;
        }

        return Math.floor(this.longestDurationInMs * (percent / 100));

    }

    protected msToPercent(
        ms: number
    ) {

        if (this.longestDurationInMs === undefined) {
            return undefined;
        }

        return (ms / this.longestDurationInMs) * 100;

    }

    protected getValueFromEvent(event: MouseEvent): {
        ms: number | undefined,
        percent: number
    } {

        const layerX = event.layerX;
        const target = event.target as HTMLDivElement;
        const layerWidth = target.clientWidth;

        const percent = layerX / layerWidth * 100;

        const ms = this.percentToMs(percent);

        return { percent, ms }

    }

    protected handlePlayButtonClick() {
        if (this.groupObject.playback.playing) {
            this.groupObject.playback.stop();
        } else {
            this.groupObject.playback.play();
        }
    }

    protected handleTimelineClick(event: MouseEvent) {
        const layerX = event.layerX;
        const target = event.target as HTMLDivElement;
        const layerWidth = target.clientWidth;

        const percent = layerX / layerWidth * 100;

        const ms = this.percentToMs(percent);

        if (ms) {
            this.ms = ms;
        }
    }

    protected handleTimelineEnter(event: MouseEvent) {
        const { ms } = this.getValueFromEvent(event);
        this.pointerMs = ms;
    }

    protected handleTimelineMove(event: MouseEvent) {
        const { ms } = this.getValueFromEvent(event);
        this.pointerMs = ms;
    }

    protected handleTimelineLeave() {
        this.pointerMs = undefined;
    }


    static styles?: CSSResultGroup | undefined = css`


        :host {

            --tick-color: var( --thermal-slate );
            --tick-opacity: 1;

            --cursor-color: var( --thermal-primary );
            --cursor-bg: var( --thermal-background );

            --fs-sm: calc( var(--thermal-fs) * .7 );

        }

        .container {

            padding-top: calc( var(--thermal-fs) + 6px);

        }

        .timeline {
            width: 100%;
            height: var( --thermal-fs );
            position: relative;
            cursor: pointer;
            box-sizing: border-box;
        }

        .background {
            width: 100%;
            height: 100%;
            background-color: var( --thermal-slate );
            pointer-events: none;
        }

        .indicator {
            height: 100%;
            position: absolute;
            content:"";
            top: 0;
            left: 0;
            background-color: var( --thermal-primary );
            pointer-events: none;
        }


        ${ticksCss}
    
    `;

    protected getTimelineElement(): HTMLDivElement | null {
        return this.renderRoot.querySelector(".timeline");
    }


    protected render(): unknown {

        if (this.has === false) {
            return nothing;
        }

        return html`<div class="container ticks-horizontal-indent">

            <div 
                class="timeline" 
                ${ref(this.timelineRef)}
                @click=${(event: MouseEvent) => this.handleTimelineClick(event)}
                @mouseenter=${this.handleTimelineEnter}
                @mouseleave=${this.handleTimelineLeave}
                @mousemove=${this.handleTimelineMove}
            >
                <div class="background"></div>
                <div class="indicator" ${ref(this.indicatorRef)}></div>
            </div>

            ${this.longestDurationInMs !== undefined 
                ? renderTicks( this.longestDurationInMs, this.ticks, this.ms, this.pointerMs )
                : nothing
            }

        </div>`;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "group-timeline": GroupTimelineElement;
    }
}