import { html, nothing } from "lit";
import type { AbstractConnectedApp } from "../../../abstraction/AbstractConnectedApp";
import { slotOrNothing } from "../SlotOrNothing";

import { directive } from "lit/directive.js";
import { AbstractFolderLayoutDirective } from "./AbstractFolderLayoutDirective";
import type { BreadcrumbItem, FolderInfo } from "../../../../client/responseEntities";

class ConnectedFolderSubfoldersDirective extends AbstractFolderLayoutDirective {

    
    private renderSelectionSlot(
        app: AbstractConnectedApp
    ): unknown {

        if ( app.folderSelection.array.length === 0 ) {
            return nothing;
        }

        return slotOrNothing(
            "edit",
            html`<connected-folder-selection-actions></connected-folder-selection-actions>`
        );

    }


    private renderFolderHeader(
        app: AbstractConnectedApp
    ): unknown {

        if ( ! app.content.folder ) {
            return nothing;
        }

        const slots = [
            this.renderFolderContentStatsSlot(app),
            this.renderHeaderFolderSlot( app ),
            this.renderDisplaySlot( app ),
            this.renderSelectionSlot( app )
        ];

        const content: unknown[] =  [
            this.renderBreadcrumb( app ),
            html`<connected-folder-header
                .onParentClick=${ ( folder: BreadcrumbItem ) => {
                    app.display.navigateToFolderAndLoad( folder.path );
                } }
            >
                ${slots}
            </connected-folder-header>`
        ];

        return this.renderHeader( content );

    }

    private renderSubfolders(
        app: AbstractConnectedApp
    ): unknown {

        if ( 
            app.content.folder === undefined 
        ) {
            return nothing;
        }

        const cont: unknown[] = [];

        if ( app.content.subfolders && app.content.subfolders.length > 0 ) {
            cont.push( html`<connected-subfolder-list
                .onFolderClick=${ ( folder: FolderInfo ) => app.display.navigateToFolderAndLoad( folder.path ) }
                folder-mode=${ app.display.folderListDisplayMode }
            ></connected-subfolder-list>` );
        }

        return this.renderContent( 
            false, 
            "100%", 
            undefined,
            cont
        );

    }

    
    render(app: AbstractConnectedApp): unknown {

        if ( app.client.isLoading ) {
            return nothing;
        }

        return [ 
            this.renderFolderHeader( app ),
            this.renderSubfolders( app )
         ]

    }

}

export const connectedFolderSubfolders = directive( ConnectedFolderSubfoldersDirective );