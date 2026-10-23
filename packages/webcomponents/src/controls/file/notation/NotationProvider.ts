import type { ThermalFileInstance } from "@labirthermal/core";
import { AbstractFileConsumer } from "../../../hierarchy/consumers/AbstractFileConsumer";
import type { IWithNotationContext, NotationCurrentContext, NotationListContext } from "./NotationContext";
import { getCurrentNotationsByMs, grabNotationsFromSlot, notationCurrentContext, notationDurationContext, notationListContext } from "./NotationContext";
import type { PropertyValues } from "lit";
import { html } from "lit";
import { provide } from "@lit/context";
import { customElement, queryAssignedElements, state } from "lit/decorators.js";

@customElement("notation-provider")
export class NotationProvider extends AbstractFileConsumer implements IWithNotationContext {

    @state()
    @queryAssignedElements({ slot: "notation", flatten: true })
    _notationSlot!: Array<HTMLElement>;

    @state()
    ms: number = 0;

    @state()
    @provide({ context: notationDurationContext })
    duration: number = 0;

    @state()
    @provide({ context: notationListContext })
    notationList: NotationListContext = [];

    @state()
    @provide({ context: notationCurrentContext })
    notationCurrent: NotationCurrentContext;

    private observer: MutationObserver | null = null;


    public onInstanceCreated(instance: ThermalFileInstance): void {
        this.duration = instance.timeline.duration;

        setTimeout( () => {
            this.observeSlotChanges();
            this.updateNotationsMs(this.ms);
        }, 0 );

        instance.timeline.addListener( this.UUID, value => this.ms = value );

        this.shadowRoot?.addEventListener("modified", () => {
            this.notationList = grabNotationsFromSlot(this._notationSlot);
        });
    }
    public onFailure(): void { }


    observeSlotChanges() {

        const slot = this.renderRoot?.querySelector('slot') as HTMLSlotElement | null | undefined;

        if (!slot) return;

        this.notationList = grabNotationsFromSlot(this._notationSlot);


        this.observer = new MutationObserver(() => {
            this.notationList = grabNotationsFromSlot(this._notationSlot);
        });

        slot.addEventListener('slotchange', () => {
            this.observer?.disconnect();
            this.notationList = grabNotationsFromSlot(this._notationSlot);
        });

    }

    protected update(changedProperties: PropertyValues): void {
        super.update(changedProperties);
        if ( changedProperties.has("ms") && this.ms ) {
            this.updateNotationsMs(this.ms);
        }
    }

    updateNotationsMs(ms: number) {
        this.notationCurrent = getCurrentNotationsByMs(ms, this);
    }

    protected render(): unknown {
        return html`<slot name="notation"></slot>
        <slot></slot>`;
    }



}