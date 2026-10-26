import { consume } from "@lit/context";
import type { ClientController } from "../ClientController";
import type { ContentController } from "../ContentController";
import { ControlledClientContext, ControlledContentContext, DisplayControllerContext, FileSelectionControllerContext, FolderSelectionControllerContext } from "../controllersContexts";
import type { DisplayController } from "../DisplayController";
import type { FileSelectionController } from "../FileSelectionController";
import type { FolderSelectionController } from "../FolderSelectionController";
import { AbstractThermalElement } from "@labirthermal/webcomponents";

export abstract class AbstractControlledConsumer extends AbstractThermalElement {

    /**  */
    @consume({ context: ControlledClientContext, subscribe: true })
    protected client!: ClientController;

    @consume({ context: ControlledContentContext, subscribe: true })
    protected content!: ContentController;

    @consume({ context: DisplayControllerContext, subscribe: true })
    protected display!: DisplayController;

    @consume({ context: FileSelectionControllerContext, subscribe: true })
    protected selectionFile!: FileSelectionController;

    @consume({ context: FolderSelectionControllerContext, subscribe: true })
    protected selectionFolder!: FolderSelectionController;


    disconnectedCallback(): void {
        super.disconnectedCallback();

        this.content.unsubscribeFromAll(this);
        this.display.unsubscribeFromAll(this);

    }



}