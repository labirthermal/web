import type { ThermalMinmaxOrUndefined, ThermalRangeOrUndefined, ThermalRegistry } from "@labirthermal/core";
import { consume } from "@lit/context";
import type { PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { Ref} from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractRegistryConsumer } from "../../hierarchy/consumers/AbstractRegistryConsumer";
import { registryHighlightContext } from "../../controllers/RegistryController";

type TickType = {
    percentage: number,
    value: number
}

export class RegistryTicksBar extends AbstractRegistryConsumer {

    static TICK_WIDTH = 40;
    static TICK_FIXED = 2;

    protected ticksRef: Ref<HTMLDivElement> = createRef();

    /** Owns DOM size observation; not reactive because the observer itself is not rendered. */
    protected observer?: ResizeObserver;

    /** Actual subscription target, retained to remove listeners even after the provided registry changes. */
    private boundRegistry?: ThermalRegistry;

    /** Actual observed DOM node, retained for cleanup and observer restoration after reconnecting. */
    private observedTicks?: HTMLDivElement;

    @state()
    private ticksWidth: number = 0;

    @consume({context: registryHighlightContext, subscribe: true})
    protected highlight?: ThermalRangeOrUndefined;

    @property({ type: String, reflect: true })
    public placement: string = "top";

    @state()
    protected minmax: ThermalMinmaxOrUndefined = undefined;

    @state()
    protected ticks: TickType[] = [];

    protected containerRef: Ref<HTMLElement> = createRef();

    connectedCallback(): void {
        super.connectedCallback();
        this.bindRegistry();
        this.minmax = this.boundRegistry?.minmax.value;
        this.ticksWidth = this.ticksRef.value?.clientWidth ?? 0;
        this.requestUpdate();
    }

    disconnectedCallback(): void {
        this.unbindRegistry();
        this.disconnectObserver();
        super.disconnectedCallback();
    }

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        // Side effect of the provided registry changing - synchronize its range and subscriptions before rendering.
        if (this.boundRegistry !== this.registryController?.registryObject && this.isConnected) {
            this.bindRegistry();
            this.minmax = this.boundRegistry?.minmax.value;
        }

        // Side effect of minmax or ticksWidth changing - derive tick positions and labels for the current render.
        if (changedProperties.has("minmax") || changedProperties.has("ticksWidth")) {
            this.calculateTicks(this.minmax, this.ticksWidth);
        }
    }

    updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.observeTicks();
    }

    /** Subscribes once to the current registry while connected, replacing the previous range listener. */
    private bindRegistry(): void {
        const registry = this.registryController?.registryObject;
        if (!this.isConnected || registry === this.boundRegistry) {
            return;
        }
        this.unbindRegistry();
        this.boundRegistry = registry;
        registry?.minmax.addListener(this.UUID, value => {
            this.minmax = value;
        });
    }

    /** Removes the listener from the actual subscribed registry rather than the current context value. */
    private unbindRegistry(): void {
        this.boundRegistry?.minmax.removeListener(this.UUID);
        this.boundRegistry = undefined;
    }

    /** Observes the rendered ticks container and restores observation after reconnecting. */
    private observeTicks(): void {
        const ticks = this.isConnected ? this.ticksRef.value : undefined;
        if (ticks === this.observedTicks) {
            return;
        }
        this.disconnectObserver();
        if (!ticks) {
            return;
        }
        this.observedTicks = ticks;
        this.observer = new ResizeObserver(entries => {
            if (!this.isConnected || this.observedTicks !== ticks) {
                return;
            }
            const entry = entries.find(entry => entry.target === ticks);
            if (entry) {
                this.ticksWidth = entry.contentRect.width;
            }
        });
        this.observer.observe(ticks);
    }

    /** Releases observation without requiring the old node to remain in the Lit ref. */
    private disconnectObserver(): void {
        this.observer?.disconnect();
        this.observer = undefined;
        this.observedTicks = undefined;
    }

    protected clamp(input: number, min: number, max: number): number {
        return input < min ? min : input > max ? max : input;
    }


    protected map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
        const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
        return this.clamp(mapped, out_min, out_max);
    }


    protected calculateTicks(minmax: ThermalMinmaxOrUndefined, width: number) {
        if (minmax === undefined) {
            this.ticks = [];
        } else {

            const ticksPercentageBuffer = [0];

            const numTicks = Math.floor(width / RegistryTicksBar.TICK_WIDTH) - 2;

            const step = 100 / numTicks;

            for (let i = 1; i < numTicks; i++) {

                ticksPercentageBuffer.push(step * i);

            }

            ticksPercentageBuffer.push(100);

            this.ticks = ticksPercentageBuffer.map(percent => this.calculateOneTick(minmax, percent) as TickType).filter(value => value !== undefined);

        }
    }


    protected calculateOneTick(
        minmax: ThermalMinmaxOrUndefined,
        percent: number

    ) {
        if (minmax === undefined) {
            return undefined;
        } else {
            const value = this.map(percent, 0, 100, minmax.min, minmax.max);
            return {
                percentage: percent,
                value: value
            } as TickType
        }

    }


    static styles = css`

        .container {
            padding: 0 calc( var( --thermal-gap ) * .5 );
            height: var( --thermal-fs );
            
        }

        .skeleton {
            height: 100%;
            background: var( --thermal-slate-light );
        }

        .ready {
            .skeleton {
                display: none;
            }
        }

        .ticks {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            width: 100%;
            position: relative;
            color: var( --thermal-slate-dark );
            font-family: sans-serif;
            height: 1em;
        }

        .tick {

            position: relative;

        }

        .tick-marker {
            display: block;
            width: 1px;
            height: 10px;
            background: var(--thermal-slate);
        }

        .placement-top {
            margin-top: 10x;
            padding-bottom: var( --thermal-gap );
        }

        .placement-bottom {
            .tick-marker {
                height: 5px;
                background: currentcolor;
                position: absolute;
                top: 12px;
            }
        }

        .tick-value {

            position: absolute;
            width: 40px;
            left: -20px;
            text-align: center;
        
        }


    `;


    protected render(): unknown {

        let highlightLeft: number | undefined = undefined;
        let highlightWidth: number | undefined = undefined;

        if ( this.minmax && this.highlight ) {

            const min = this.minmax.min;
            const minmax = this.minmax.max - min;

            highlightLeft = (this.highlight.from - min) / minmax * 100;
            highlightWidth = (this.highlight.to - min) / minmax * 100 - highlightLeft;

        }

        return html`

            <div class="container ${this.minmax !== undefined ? "ready" : "loading"} placement-${this.placement}" ${ref(this.containerRef)}>

                <div class="skeleton" data-video-ignore></div>

                <div class="ticks" ${ref(this.ticksRef)}>

                    ${highlightLeft !== undefined && highlightWidth !== undefined
                ? html`<div class="highlight" style="position: absolute; top: 0px; height: 5px; left:${highlightLeft}%; width: ${highlightWidth}%; background-color: var(--thermal-foreground)"></div>`
                : nothing
            }

                    ${this.ticks.map(tick => {
                return html`
                    <div class="tick" >
                        <div class="tick-marker"></div>
                        <div class="tick-value">
                            ${tick.value.toFixed(RegistryTicksBar.TICK_FIXED)}
                        </div>
                    </div>
                        `;
            })}

                </div>                

            </div>
        
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "registry-ticks-bar": RegistryTicksBar;
    }
}