import { customElement } from "lit/decorators.js";
import { AbstractConfigElement } from "./AbstractConfigElement";

@customElement("connected-config-file-content-mode")
export class ConnectedConfigFileMode extends AbstractConfigElement {

    connectedCallback(): void {

        super.connectedCallback();

        this.display.subscribeToEditTags( this );
        this.display.subscribeToDisplayComments( this );
        
    }


    protected render(): unknown {

        const items = [
            this.renderToggle(
                "Edit tags",
                this.display.editTags,
                ( value: boolean ) => this.display.setEditTags( value)
            ),
            this.renderToggle(
                "Display Comments",
                this.display.displayComments,
                ( value: boolean ) => this.display.setDisplayComments( value)
            )
        ];

        return items;

    }

}