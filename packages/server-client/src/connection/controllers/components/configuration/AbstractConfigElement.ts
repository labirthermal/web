import type { CSSResultGroup} from "lit";
import { css, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";

export abstract class AbstractConfigElement extends AbstractControlledConsumer {

    public static styles?: CSSResultGroup | undefined = css`
    
        :host {
        
            display: flex;
            color: var(--thermal-foreground);
            cursor: pointer;
            align-items: center;
            gap: .25em;
            font-size: var(--thermal-fs);
        
        }

        thermal-dropdown thermal-btn {
            display: block;
        }

        .radio {

            display: flex;
            align-items: center;
            gap: .25em;

            cursor: pointer;

            input,
            span {
                display: block;
            }

            span {
                font-size: .8em;
            }
        }
    
    `;


    protected renderToggle(
        label: string,
        checked: boolean,
        onChange: (checked: boolean) => void
    ): unknown {

        return html`<thermal-radio
            type="checkbox"
            .checked=${checked}
            .onChange=${(value: boolean) => {
                onChange(value);
            }}
        >${label}</thermal-radio>`;

    }

    protected renderToggleButton(
        active: boolean,
        onClick: () => void,
        icon?: string,
        label?: string,
        tooltip?: string,
    ): unknown {

        return html`
            <thermal-btn
                variant="${active ? "foreground" : "default"}"
                @click=${() => onClick()}
                icon=${ ifDefined( icon ) }
                iconStyle="micro"
                tooltip=${ ifDefined( tooltip ) }
                size="md"
            ></thermal-btn>
        `;

    }

}