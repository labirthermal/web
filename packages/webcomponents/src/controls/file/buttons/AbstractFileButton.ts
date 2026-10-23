import type { CSSResultGroup } from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref } from "lit/directives/ref.js";
import { AbstractFileConsumer } from "../../../hierarchy/consumers/AbstractFileConsumer";
import type { BtnSizes, BtnVariants } from "../../../ui/Btn";

export abstract class AbstractFileButton extends AbstractFileConsumer {

    @property({ type: String, reflect: false })
    public variant?: BtnVariants;

    @property({ type: String, reflect: true })
    public size?: BtnSizes = "sm";

    @property({ type: String})
    public icon?: string;

    @property({type: String})
    public iconStyle?: string;

    @property({ type: Boolean })
    public plain?: boolean;

    protected abstract tooltip?: string;

    protected ref = createRef<HTMLElement>();

    abstract getDefaultLabel(): string;

    abstract enter(): void;

    abstract action(): void;

    abstract leave(): void;

    public onFailure(): void { }

    private isWithinButton(target: EventTarget | null): boolean {
        return target instanceof Node
            && (this.contains(target) || this.renderRoot.contains(target));
    }

    private handleMouseOver = (event: MouseEvent): void => {
        if (!this.isWithinButton(event.relatedTarget)) {
            this.enter();
        }
    }

    private handleMouseOut = (event: MouseEvent): void => {
        if (!this.isWithinButton(event.relatedTarget)) {
            this.leave();
        }
    }

    private handleFocusIn = (event: FocusEvent): void => {
        if (!this.isWithinButton(event.relatedTarget)) {
            this.enter();
        }
    }

    private handleFocusOut = (event: FocusEvent): void => {
        if (!this.isWithinButton(event.relatedTarget)) {
            this.leave();
        }
    }

    static styles?: CSSResultGroup | undefined = css`
slot {
    display: content;
}`;

    protected render(): unknown {
        return html`<slot 
    @click=${this.action} 
    @mouseover=${this.handleMouseOver}
    @mouseout=${this.handleMouseOut}
    @focusin=${this.handleFocusIn}
    @focusout=${this.handleFocusOut}
    ${ref(this.ref)}
>
    <thermal-btn 
        variant=${this.variant || "default"}
        size=${this.size || "sm"}
        plain="${this.plain || false}"
        class="default"
        tooltip=${this.tooltip}
        icon=${ifDefined(this.icon)}
        iconStyle=${ifDefined(this.iconStyle)}
    >${this.getDefaultLabel()}</thermal-btn>
</slot>`;
    }

}