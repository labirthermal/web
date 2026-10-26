import { AbstractConfigElement } from "./AbstractConfigElement";

export class ConnectedConfigFileContentMode extends AbstractConfigElement {

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