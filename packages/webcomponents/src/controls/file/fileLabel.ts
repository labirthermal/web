import { css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { AbstractFileConsumer } from "../../hierarchy/consumers/AbstractFileConsumer";

export class FileLabelElement extends AbstractFileConsumer {

    @property({ type: String })
    public label?: string;

    public onInstanceCreated(): void { }

    public onFailure(): void { }

    static styles = css`
        :host {
            display: contents;
        }

    `;

    protected render(): unknown {

        if ( ! this.file ) {
            return nothing;
        }

        return this.file.fileName;

    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-label": FileLabelElement;
    }
}
