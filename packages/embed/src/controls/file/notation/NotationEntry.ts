import type { PropertyValues } from "lit";
import { html } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import { AbstractThermalElement } from "../../../hierarchy/AbstractThermalElement";
import { durationConverter } from "../../../utils/converters/durationConverter";

@customElement("notation-entry")
export class NotationEntry extends AbstractThermalElement {

    @property({type: Number, reflect: true, converter: durationConverter})
    public from?: number;

    @property({type: Number, reflect: true, converter: durationConverter})
    public to?: number;

    @property({type: Number, reflect: true, converter: durationConverter})
    public duration?: number;

    @property({type: String, reflect: true})
    public label?: string;

    @property({type: String})
    public image?: string;

    @property({type: String, reflect: true})
    public say?: string;

    @property({type: String, reflect: true})
    public color?: string;

    @state()
    public _active: boolean = false;

    public get active() { return this._active; }

    @queryAssignedElements() 
    slotContent!: Element[];


    willUpdate(_changedProperties: PropertyValues): void {
        super.willUpdate(_changedProperties);

        // If DURATION changed, propagate it to TO
        if ( _changedProperties.has( "duration" ) ) {
            if ( this.from !== undefined && this.duration !== undefined ) {
                this.to = this.from + this.duration;
            }
        }

        // If TO changed but not DURATION, propagate the change to DURATION
        if ( _changedProperties.has("to") && !_changedProperties.has("duration") ) {
            if ( this.from !== undefined && this.to !== undefined ) {
                this.duration = this.to - this.from;
            }
        }

        // If FROM changed but not therest, propagate the change to DURATION
        if ( _changedProperties.has("from") && !_changedProperties.has("to") && !_changedProperties.has("duration") ) {
            if ( this.from !== undefined && this.to !== undefined ) {
                this.duration = this.to - this.from;
            }
        }

        if ( _changedProperties.has("from") || _changedProperties.has("to") || _changedProperties.has("duration") ) {
            this.dispatchEvent( new CustomEvent("modified", {
                bubbles: true,
                cancelable: false,
                composed: true
              }) );
        }
    }



    public activate() {
        if ( this._active === false ) {
            this._active = true;
        }
    }

    public deactivate() {
        if ( this._active === true ) {
            this._active = false;
        }
    }

    public setMs( ms: number ) {

        if ( this.from !== undefined && this.to !== undefined ) {
            if ( ms >= this.from && ms < this.to) {
                this.activate();
            } else {
                this.deactivate();
            }
        }

    }

    public getRenderContent() {
        return Array.from(this.slotContent);
    }

    public getTTSString() {}

    protected render(): unknown {
        return html`
            <slot style="display: none;"></slot>
        `;
    }

}