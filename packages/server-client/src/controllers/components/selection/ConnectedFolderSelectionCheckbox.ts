import type { CSSResultGroup} from "lit";
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";
import type { FolderInfo } from "../../../client/responseEntities";

/** Connected folder selection checkbox component */
export class ConnectedFolderSelectionCheckbox extends AbstractControlledConsumer {

    @property({ type: Object })
    public folder!: FolderInfo;

    connectedCallback(): void {
        super.connectedCallback();
        this.selectionFolder.subscribeToSelectionChange(this);
    }



    private renderCheckbox(
        isSelected: boolean
    ): unknown {

        return html`<input 
            type="checkbox" 
            .checked=${isSelected} 
            @change=${(e: Event) => {
                e.preventDefault();
                const target = e.target as HTMLInputElement;
                if (target.checked) {
                    this.selectionFolder.addToSelection(this.folder);
                }
                else {
                    this.selectionFolder.removeFromSelection(this.folder);
                }
            }}
        />`;

    }

    private renderButton(
        isSelected: boolean
    ): unknown {

        const callback = isSelected
            ? () => this.selectionFolder.removeFromSelection(this.folder)
            : () => this.selectionFolder.addToSelection(this.folder);

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

            transition: all .2s ease-in-out;

            &:hover {

                box-shadow: var( --thermal-shadow );
            
            }
        
        }
    
    `;



    protected render(): unknown {

        const isSelected = this.selectionFolder.folderIsSelected(this.folder);

        return this.renderCheckbox(isSelected);

    }


}