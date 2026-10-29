import type { ThermalFileInstance } from "@labirthermal/core";
import { consume } from "@lit/context";
import { format } from "date-fns";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { Ref} from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractFileConsumer } from "../../hierarchy/consumers/AbstractFileConsumer";
import type { FileControllerCurrentFrameType, FileControllerDurationContextType} from "../../controllers/FileController";
import { fileDurationContext, fileMayStopContext, fileCurrentFrameContext, filePlayingContext, fileTimeCursorContext } from "../../controllers/FileController";
import { T } from "../../translations/Languages";
import type { Tick} from "../../utils/timelineTicks";
import { calculateTicks, renderTicks, ticksCss } from "../../utils/timelineTicks";

export class FileTimelineElement extends AbstractFileConsumer {

    @consume({ context: filePlayingContext, subscribe: true })
    @state()
    protected playing: boolean = false;

    @consume({ context: fileCurrentFrameContext, subscribe: true })
    @state()
    protected currentFrame?: FileControllerCurrentFrameType;

    @consume({ context: fileDurationContext, subscribe: true })
    @state()
    protected duration?: FileControllerDurationContextType;

    @consume({ context: fileMayStopContext, subscribe: true })
    @state()
    protected mayStop: boolean = true;

    @consume({ context: fileTimeCursorContext, subscribe: true })
    protected cursor: typeof fileTimeCursorContext["__context__"];

    protected timelineRef: Ref<HTMLDivElement> = createRef()
    protected barRef: Ref<HTMLDivElement> = createRef();
    protected containerRef: Ref<HTMLElement> = createRef();

    protected observer?: ResizeObserver;

    private observedContainer?: HTMLElement;

    /**
     * Hides the playback controls when present. Defaults to `false` and
     * reflects as a boolean attribute. Replaces `hasPlayButton` with inverted meaning.
     */
    @property({ type: Boolean, reflect: true, attribute: "disable-play-button" })
    public disablePlayButton: boolean = false;

    /**
     * Hides the frame information when present. Defaults to `false` and
     * reflects as a boolean attribute. Replaces `hasInfo` with inverted meaning.
     */
    @property({ type: Boolean, reflect: true, attribute: "disable-info" })
    public disableInfo: boolean = false;

    @state()
    protected collapsed: boolean = false;

    public static collapseWidth = 500;

    @state()
    protected ticks: Tick[] = [];

    @state()
    protected pointerMs?: number;

    public onInstanceCreated(instance: ThermalFileInstance): void {
        if (this.containerRef.value) {
            this.ticks = calculateTicks(this.containerRef.value.clientWidth, instance.duration);
        }

    }
    public onFailure(
        // error: ThermalFileFailure
    ): void {
        this.file?.timeline.removeListener(this.UUID);
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.requestUpdate();
    }

    disconnectedCallback(): void {
        this.observer?.disconnect();
        this.observer = undefined;
        this.observedContainer = undefined;
        super.disconnectedCallback();
    }

    update(changedProperties: PropertyValues): void {
        super.update(changedProperties);

        const container = this.containerRef.value;
        if (container === this.observedContainer) {
            return;
        }

        this.observer?.disconnect();
        this.observer = undefined;
        this.observedContainer = undefined;

        if (!this.isConnected || !container) {
            return;
        }

        this.observedContainer = container;
        this.observer = new ResizeObserver((entries) => {
            if (!this.isConnected || this.observedContainer !== container) {
                return;
            }

            const entry = entries.find(entry => entry.target === container);
            if (!entry) {
                return;
            }

            if (this.file) {
                this.ticks = calculateTicks(entry.contentRect.width, this.file.duration);
            }
            this.collapsed = entry.contentRect.width < FileTimelineElement.collapseWidth;
        });
        this.observer.observe(container);
    }


    /** Handlers */


    /** Handle playback buttons */
    protected handlePlayButtonClick() {

        if (this.playing === true && this.mayStop === false) {
            return;
        }

        if (this.playing) {
            this.file?.timeline.stop();
        } else {
            this.file?.timeline.play();
        }

    }

    handleBarClick(event: MouseEvent) {

        event.preventDefault();

        if (this.mayStop === false) {
            return;
        }

        const eventValues = this.getValueFromEvent(event);

        if (eventValues && this.file) {
            this.file.timeline.setValueByPercent(eventValues.percent);
        }
    }

    /** Take a MouseEvent on `this.timelineRef` and calculate the percentage out of it. */
    protected getValueFromEvent(event: MouseEvent) {

        if (this.timelineRef.value && this.file) {
            const rect = this.timelineRef.value.getBoundingClientRect();
            if (rect.width === 0) {
                return;
            }
            const x = event.clientX - rect.left;
            const percent = Math.max(0, Math.min(100, x / rect.width * 100));
            const ms = this.file.duration * (percent / 100);
            return {
                percent,
                ms
            };
        }

    }

    handleBarEnter(event: MouseEvent) {

        const eventValues = this.getValueFromEvent(event);

        if (eventValues) {
            this.pointerMs = eventValues.ms;
        }

        if (eventValues) {
            this.fileController.setTimeCursorPercentage(eventValues.percent);
        }
    }

    handleBarHover(event: MouseEvent) {

        event.preventDefault();

        const eventValues = this.getValueFromEvent(event);

        if (eventValues) {
            this.pointerMs = eventValues.ms;
        }

        if (eventValues) {
            this.fileController.setTimeCursorPercentage(eventValues.percent);
        }
    }

    handleBarMouseLeave() {
        this.fileController.setTimeCursorPercentage(undefined);
        this.pointerMs = undefined;
    }

    static styles = css`
    
        .container {

            padding-top: calc( var( --thermal-gap ) * .2 );

            width: 100%;

            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: calc( var( --thermal-gap ) * .5 );

            color: var( --thermal-foreground );

        }

        .cursor {
            width: 70px;
        }

        .duration {
        
        }

        .small {
            font-size: calc( var( --thermal-fs ) * .7 );
            color: var( --thermal-foreground );
        }

        .real {
            display: flex;
            gap: var( --thermal-fs-small );
            align-items: center;
            padding-top: 5px;
            justify-content: space-between;
            width: 100%;

            .label { opacity: .5; }
        }

        .real.collapsed {
            flex-direction: column;
            align-items: flex-start;
        }

        .inline {
            white-space: nowrap;
        }

        .timeline {
            flex-grow: 1;
            cursor: pointer;
        }

        .timeline-bar {
            width: 100%;
            height: var( --thermal-fs );
            background: var( --thermal-slate );
            transition: background-color .2s ease-in-out;
            position: relative;
        }

        .timeline-marks {
            width: 100%;
        }

        .mark {
            background: red;
            height: 5px;
            position: relative;
        }

        .bar {
            height: 100%;
            background: var( --thermal-primary-dark );
            content: "";
            border-right: 1px solid var( --thermal-foreground );
            transition: background-color .3s ease-in-out;
            &:hover {
                background: var(--thermal-primary);
            }
        }

        .mayNot {
            opacity: .5;
            cursor: not-allowed;
        }

        .pointer {
            position: absolute;
            width: 1px;
            background: var( --thermal-background );
            height: 100%;
            top: 0;
        }

        ${ticksCss}


        .controls {

            display: flex;
            align-items: stretch;
            justify-content: center;
            gap: 5px;

            padding-top: 5px;

        }

        .container.collapsed .controls {
            flex-wrap: wrap;
        }

        .chrome {
            width: 1em;
            color: var(--thermal-primary-dark);
            transition: all .3s ease-in-out;
            cursor: pointer;
            &:hover {
                color: var(--thermal-primary);
            }
        }
    
    `;



    private renderControls(
        file: ThermalFileInstance,
        disabled: boolean,
        playButtonClasses: { [key: string]: boolean }
    ): unknown {

        return html`<nav class="controls">

    <thermal-btn 
        ?disabled=${disabled}
        @click=${() => {
                file.timeline.prev();
            }}
    >${t(T.prev)}</thermal-btn>


    <thermal-btn 
        class="${classMap(playButtonClasses)}" 
        @click=${this.handlePlayButtonClick.bind(this)}
        icon="${this.playing ? "pause" : "play"}"
        iconStyle="solid"
        ?disabled=${disabled}
    ></thermal-btn>

    <thermal-btn 
        @click=${() => file.timeline.next()}
        ?disabled=${disabled}
    >${t(T.next)}</thermal-btn>

    <thermal-btn 
        @click=${() => file.timeline.setRelativeTime(0)}
        ?disabled=${disabled}
    >${t(T.back)}</thermal-btn>

    <file-playback-speed-dropdown enabled="${this.mayStop ? "on" : "off"}" class="item"></file-playback-speed-dropdown>

</nav>`

    }


    protected render(): unknown {

        const file = this.file as ThermalFileInstance;

        if (file === undefined) {
            return nothing;
        }

        else if (file.duration === 0) {
            return nothing;
        }

        const containerClasses = {
            container: true,
            collapsed: this.collapsed
        }

        const mayClasses = {
            may: this.mayStop === true,
            mayNot: this.mayStop === false
        }

        const playButtonClasses = {
            item: true,
            button: true,
            playback: true,
            ...mayClasses
        }

        const barClasses = {
            item: true,
            timeline: true,
            ...mayClasses
        }

        const disabled = this.mayStop;

        return html`
<section class="${classMap(containerClasses)}" ${ref(this.containerRef)}>

    <aside class="ticks-horizontal-indent">

        <notation-timeline></notation-timeline>

        <div class="${classMap(barClasses)}"  ${ref(this.timelineRef)}>

            <div 
                class="timeline-bar" 
                @click=${this.handleBarClick}
                @mouseenter=${this.handleBarEnter.bind(this)}
                @mousemove=${this.handleBarHover} 
                @mouseleave=${this.handleBarMouseLeave.bind(this)}
            >
                <div class="bar" data-video-rerender style="width: ${this.currentFrame ? this.currentFrame.percentage : 0}%" ${ref(this.barRef)}></div>
                    ${this.cursor !== undefined ? html`<div class="pointer" style="left: ${this.cursor}%"></div>` : ""}
                </div>

            </div>


${(this.currentFrame)
                ? renderTicks(
                    file.duration,
                    this.ticks,
                    this.currentFrame.ms,
                    this.pointerMs
                )
                : nothing}


${this.disablePlayButton === false
                ? this.renderControls(
                    file,
                    disabled,
                    playButtonClasses
                )
                : nothing}

    </aside>

</section>



${this.currentFrame !== undefined && this.disableInfo === false
                ? html`<div class="small real ${this.collapsed ? "collapsed" : ""}">
        <div>
            <span class="label">${t(T.date)}:</span> 
            <span class="inline" data-video-dynamic>${format(this.currentFrame.absolute, "d. L. y")}</span>
        </div>
        <div>
            <span class="label">${t(T.time)}:</span> 
            <span class="inline" data-video-dynamic>${format(this.currentFrame.absolute, "H'h' mm'm' ss:SSS")}</span>
        </div>
        <div>
            <span class="label">${t(T.frame)}:</span> 
            <span class="inline" data-video-dynamic>${this.currentFrame.index + 1} / ${this.file?.frameCount}</span>
        </div>
    </div>`
                : nothing}
    `;
    }
}

export type TimelineHighlightData = {
    fromMs: number,
    toMs: number,
    text: string
}

declare global {
    interface HTMLElementTagNameMap {
        "file-timeline": FileTimelineElement;
    }
}
