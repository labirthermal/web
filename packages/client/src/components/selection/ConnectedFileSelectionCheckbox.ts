import type { CSSResultGroup } from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";
import type { FileInfo } from "../../client/responseEntities";

/** Connected file selection checkbox component */
export class ConnectedFileSelectionCheckbox extends AbstractControlledConsumer {

    @property({ type: Object })
    public file!: FileInfo;

    connectedCallback(): void {
        super.connectedCallback();
        this.selectionFile.subscribeToSelectionChange(this);
    }



    private renderCheckbox(
        isSelected: boolean
    ): unknown {

        return html`<input 
            type="checkbox" 
            .checked=${isSelected} 
            @change=${(e: Event) => {
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    this.selectionFile.addToSelection(this.file);
                }
                else {
                    this.selectionFile.removeFromSelection(this.file);
                }
            }}
        />`;

    }

    private renderButton(
        isSelected: boolean
    ): unknown {

        const callback = isSelected
            ? () => this.selectionFile.removeFromSelection(this.file)
            : () => this.selectionFile.addToSelection(this.file);

        return html`<thermal-btn @click=${callback.bind(this)}>${isSelected ? 'Odstranit' : 'Přidat'}</thermal-btn>`;

    }


    static styles?: CSSResultGroup | undefined = css`
    
        :host {

            &:hover {
                cursor: pointer;
            }
        
        }

        input {
        
            accent-color: var( --thermal-primary );
            background-color: var( --thermal-slate-light );
            cursor: pointer;
        
        }
    
    `;



    protected render(): unknown {

        const isSelected = this.selectionFile.fileIsSelected(this.file);

        return this.renderCheckbox(isSelected);

    }


}

declare global {
    interface HTMLElementTagNameMap {
        "connected-file-selection-checkbox": ConnectedFileSelectionCheckbox;
    }
}