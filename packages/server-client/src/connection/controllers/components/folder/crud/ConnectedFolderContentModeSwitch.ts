import type { CSSResultGroup} from "lit";
import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import type { T } from "../../../../../translations/Languages";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";
import { DirectiveHelpers } from "../../../apps/directives/DirectiveHelpers";

@customElement("connected-folder-content-mode-switch")
export class ConnectedFolderContentModeSwitch extends AbstractControlledConsumer {

    connectedCallback(): void {
        super.connectedCallback();

        this.content.subscribeToFolderUpdates( this );
        this.content.subscribeToSubfoldersUpdates( this );
    }

    private userMayEdit(): boolean {
        if ( !this.content.folder ) {
            return false;
        }

        return DirectiveHelpers.userMayEditFolder( 
            this.client, 
            this.content.folder 
        );
    }

    private folderIsEditable(): boolean {
        if ( !this.content.folder ) {
            return false;
        }

        return this.getFilesCount() === 0 && this.getSubfoldersCount() === 0;

    }

    private renderCounts(): unknown {

        this.log("rendering counts", this.content.folder);

        if ( !this.content.folder ) {
            return nothing;
        }

        return html`Files: ${ this.content.folder.lrc_count } Subfolders: ${ this.content.subfolders.length }`;

    }

    private getFilesCount(): number {
        if ( !this.content.folder ) { return 0; }
        return this.content.folder.lrc_count;
    }

    private getSubfoldersCount(): number {
        if ( !this.content.subfolders ) { return 0; }
        return this.content.subfolders.length;
    }


    private renderSlot(
        label: keyof typeof T,
        count: number,
        icon: string,
        iconStyle: string,
        variant: string,
        onClick?: () => Promise<void>
    ): unknown {

        return html`<thermal-btn
            .icon=${icon}
            .iconStyle=${iconStyle}
            .tooltip=${this.t(label)}
            @click=${onClick}
            variant=${variant}
            plain="true"
        >${count}x</thermal-btn>`;
    }

    private async updateFolderMayHaveFiles(
        value: boolean
    ): Promise<void> {

        this.log( "updating", this.content.folder );

        if ( !this.content.folder ) {
            return;
        }

        const request = this.client.api.routes.post
            .updateFolder( this.content.folder.path )
            .setMayHaveFiles( value );

        const result = await request.execute();

        const info = result.data?.result.info;

        if ( info ) {
            this.log( "updated", info );
            this.content.updateFolderState( info );
            this.display.reloadCurrentState();
            // this.content.host.requestUpdate();
        }
    }



    private renderFiles( 
        interactive: boolean,
        active: boolean
    ): unknown {

        let callback: undefined | ( () => Promise<void> ) = undefined;

        if ( interactive && !active && this.userMayEdit() ) {

            callback = async () => {

                await this.updateFolderMayHaveFiles( true );

            }

        }

        const variant = active ? "default" : "background";

        return this.renderSlot(
            "foldermayhavefiles",
            this.getFilesCount(),
            "image",
            "micro",
            variant,
            callback
        );

    }

    

    private renderSubfolders(
        interactive: boolean,
        active: boolean
    ): unknown {


        let callback: undefined | ( () => Promise<void> ) = undefined;

        if ( interactive && !active && this.userMayEdit() ) {

            callback = async () => {

                await this.updateFolderMayHaveFiles( false );

            }

        }

        const variant = active ? "default" : "background";

        return this.renderSlot(
            "foldermayhavesubfolders",
            this.getSubfoldersCount(),
            "folder",
            "micro",
            variant,
            callback
        );

    }

    private renderSwitch(): unknown {

        if ( !this.content.folder ) {
            return nothing;
        }

        const result: unknown[] = [];

        if ( this.folderIsEditable() && this.userMayEdit() ) {

            const mayHaveFiles = this.content.folder.may_have_files ?? false;

            result.push( this.renderSubfolders( true, !mayHaveFiles ) );

            result.push( this.renderFiles( true, mayHaveFiles ) );

        } else {

            if ( this.getFilesCount() > 0 ) {
                return this.renderFiles( false, true );
            } else {
                return this.renderSubfolders( false, true );
            }

        }

        return result;

    }

    static styles?: CSSResultGroup | undefined = css`
    
    :host {
    
        display: flex;
        background: var(--thermal-background);

        border: 1px solid var( --thermal-slate );
        border-radius: var( --thermal-radius );

        gap: .5em;
    
    }
    
    `;

    protected render(): unknown {

        return this.renderSwitch();

    }


}