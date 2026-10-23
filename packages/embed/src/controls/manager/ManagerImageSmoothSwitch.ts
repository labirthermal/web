import { consume } from "@lit/context";
import { t } from "i18next";
import { css, html } from "lit";
import { AbstractManagerConsumer } from "../../hierarchy/consumers/AbstractManagerConsumer";
import { managerSmoothContext } from "../../controllers/ManagerController";
import { T } from "../../translations/Languages";

export class ManagerImageSmoothSwitch extends AbstractManagerConsumer {

    @consume({context: managerSmoothContext, subscribe: true})
    smooth!: boolean;

    public static styles = css`
    
        :host {
            display: block;
        }

    `;

    protected render(): unknown {
        return html`<thermal-btn-group>
            <thermal-btn
    variant=${this.smooth ? "default" : "foreground"}
    @click=${() => this.managerObject.smooth.setSmooth(false)}
>${t(T.pixelated)}</thermal-btn>

<thermal-btn
    variant=${this.smooth ? "foreground" : "default"}
    @click=${() => this.managerObject.smooth.setSmooth(true)}
>${t(T.smooth)}</thermal-btn>
        </thermal-btn-group>`;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "manager-image-smooth-switch": ManagerImageSmoothSwitch;
    }
}