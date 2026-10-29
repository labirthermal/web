import { t } from "i18next";
import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { AbstractFileConsumer } from "../hierarchy/consumers/AbstractFileConsumer";
import { T } from "../translations/Languages";

export class FileDetailElement extends AbstractFileConsumer {

    @property({ type: Object })
    onback?: () => void;

    @property({ type: Boolean, reflect: true })
    public norender: boolean = false;

    @property({ type: String })
    public label?: string;

    public onInstanceCreated(): void {}

    public onFailure(): void { }

    static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        main {
            display: grid;
            gap: var(--thermal-gap);
            grid-template-columns: 1fr;
            @media ( min-width: 900px ) {
                grid-template-columns: 2fr 1fr;
            }
            @media ( min-width: 1300px ) {
                grid-template-columns: 1fr 1fr;
            }
        }

        header {
            width: 100%;
            display: flex;
            gap: 5px;
            margin-bottom: var(--thermal-gap);
            align-items: stretch;
        }
    
    `;

    protected render(): unknown {

        return html`<header>
    <thermal-btn 
        variant="foreground" 
        @click=${() => {
            if (this.onback)
                this.onback();
            }}
        tooltip=${t(T.back)}
        icon="close"
        iconStyle="micro"
    ></thermal-btn>

    ${this.label !== undefined ? html`
    <thermal-btn variant="background" non-interactive>${this.label}</thermal-btn>` : nothing}

    <thermal-btn variant="background" non-interactive>
        <file-label></file-label>
    </thermal-btn>

    <file-info-button></file-info-button>
    <file-download-dropdown></file-download-dropdown>
</header>

<main>
    <section>
        <file-canvas norender="${this.norender}"></file-canvas>
        <file-timeline></file-timeline>
    </section>
    <section>
        <file-analysis-complex></file-analysis-complex>
    </section>
</main>`;}

}