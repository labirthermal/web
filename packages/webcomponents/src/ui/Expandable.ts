import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { BtnSizes, BtnVariants } from "./Btn";

export class ThermalExpandableElement extends AbstractThermalElement {

    @property({ type: String})
    public label?: string;

    @property({ type: Boolean,attribute: "close-icon", reflect: true})
    public closeIcon: boolean = false;

    @property({ type: String, attribute: true, reflect: true })
    public variant?: BtnVariants;

    @property({ type: String, attribute: true, reflect: true})
    public variantExpanded?: BtnVariants;

    @property({ type: String, attribute: true, reflect: true })
    public size?: BtnSizes;

    @property({ type: String })
    public icon?: string;

    @property({ type: String })
    public iconStyle: string = "outline";

    @property({ type: Boolean, reflect: true })
    public disabled: boolean = false;

    @property({ type: Boolean, reflect: true, attribute: "non-interactive"})
    public nonInteractive: boolean = false;

    @property({ type: Boolean, attribute: true })
    public plain: boolean = false;

    @property({ type: String })
    public tooltip?: string;

    @property({ type: Boolean, reflect: true })
    public expanded: boolean = false;

    static styles?: CSSResultGroup | undefined = css`
:host {
    --color: var(--thermal-foreground);
    --background: var(--thermal-slate-light);
    --font-size: var(--thermal-fs);
    --border-color: var(--thermal-slate);
    --border-radius: var(--thermal-radius);
    --display: block;
    --position: relative;
    --width: 100%;
    --padding: var(--thermal-gap);
    --spacing: var(--thermal-gap);
    --box-shadow: none;

    font-size: var(--font-size);
    color: var(--color);
}

aside.content {

    display: none;
    position: var(--position);

    box-sizing: border-box;
    width: var(--width);
    box-sizing: border-box;

    background: var(--background);
    border: var(--thermal-border-width) var(--thermal-border-style) var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--padding);
    box-shadow: var(--box-shadow);

}

:host([expanded="true"]) aside.content {
    display: var(--display);
    margin-top: var(--spacing);
}

thermal-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
}
`;

    protected render(): unknown {

        const variant = this.expanded && this.variantExpanded 
            ? this.variantExpanded 
            : this.variant;

        return html`<thermal-btn
    variant=${ifDefined( variant )}
    size=${ifDefined( this.size )}
    icon=${ifDefined( this.icon )}
    iconStyle=${this.iconStyle}
    ?disabled=${this.disabled}
    ?plain=${this.plain}
    tooltip=${ifDefined( this.tooltip )}
    ?non-interactive=${this.nonInteractive}
    @click=${() => this.expanded = !this.expanded}
>${ifDefined(this.label)}${this.closeIcon && this.expanded ? html`<thermal-icon
    icon="close"
    variant="micro"
></thermal-icon>` : nothing}</thermal-btn>
<aside class="content">
    <slot></slot>
</aside>
`;

    }

}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-expandable": ThermalExpandableElement;
    }
}
