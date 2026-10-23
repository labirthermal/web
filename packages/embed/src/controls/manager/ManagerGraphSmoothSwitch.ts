import { consume } from "@lit/context";
import { t } from "i18next";
import { css, html } from "lit";
import { AbstractManagerConsumer } from "../../hierarchy/consumers/AbstractManagerConsumer";
import { managerGraphFunctionContext } from "../../controllers/ManagerController";
import { T } from "../../translations/Languages";

export class ManagerGraphSmoothSwitch extends AbstractManagerConsumer {

    @consume({context: managerGraphFunctionContext, subscribe: true})
    smooth!: boolean;

    public static styles = css`
    
        :host {
            display: inline-block;
        }

    `;

    protected render(): unknown {
        return html`
            <thermal-btn-group>
                <thermal-btn
                    variant=${this.smooth ? "default" : "foreground"}
                    @click=${() => this.managerObject.graphSmooth.setGraphSmooth(false)}
                >${t(T.straightlines)}</thermal-btn>
                <thermal-btn
                    variant=${this.smooth ? "foreground" : "default"}
                    @click=${() => this.managerObject.graphSmooth.setGraphSmooth(true)}
                >${t(T.smoothlines)}</thermal-btn>
            </thermal-btn-group>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "manager-graph-smooth-switch": ManagerGraphSmoothSwitch;
    }
}