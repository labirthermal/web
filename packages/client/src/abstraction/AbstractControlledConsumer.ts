import { consume } from "@lit/context";
import type { ClientController } from "../controllers/ClientController";
import type { ContentController } from "../controllers/ContentController";
import { ControlledClientContext, ControlledContentContext, DisplayControllerContext, FileSelectionControllerContext, FolderSelectionControllerContext } from "../controllers/controllersContexts";
import type { DisplayController } from "../controllers/DisplayController";
import type { FileSelectionController } from "../controllers/FileSelectionController";
import type { FolderSelectionController } from "../controllers/FolderSelectionController";
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