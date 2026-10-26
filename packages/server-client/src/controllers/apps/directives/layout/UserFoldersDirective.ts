import { directive } from "lit/directive.js";
import type { AbstractConnectedApp } from "../../../abstraction/AbstractConnectedApp";
import { AbstractLayoutDirective } from "./AbstractLayoutDirective";
import { html } from "lit";
import type { Identity } from "../../../../client/responseEntities";

class UserFoldersDirective extends AbstractLayoutDirective {

    private renderUserDetail(
        identity: Identity
    ): unknown {

        const rows: string[][] = [
            [ "Login", identity.meta.login ],
            [ this.t("user"), identity.meta.name || "-" ],
            [ "Email", identity.meta.email || "-" ],
            [ "Instituce", identity.meta.institution || "-" ],
            // [ "createdat", new Date( identity.meta.createdAt ).toLocaleString() ],
        ];


        return html`<div>
            <dl>
                ${rows.map(row => this.renderDef(...row))}
            </dl>
        
            <p>Pro změnu hesla kontaktujte administrátora serveru.</p>
        </div>`;
    }

    render(
        app: AbstractConnectedApp
    ): unknown {

        const inner: unknown[] = [];

        const list: unknown[] = [];

        app.content.userFolders.sort( (a, b) => a.name.localeCompare(b.name) ).forEach( folder => {
            list.push( html`<connected-folder-thumbnail
                .folder=${folder}
                @click=${ () => app.display.navigateToFolderAndLoad( folder.path ) }
            ></connected-folder-thumbnail>` );
        } );

        console.log( list );

        inner.push( html`<div class="cLayout__user_folders_list">
            <h2>Máte přístup ke ${app.content.userFolders.length} složkám:</h2>
            ${list}
        </div>` );

        if ( app.client.identity ) {
            inner.push( this.renderUserDetail(
                    app.client.identity
            ) );
        }

        const layout = html`${this.renderBreadcrumb( app )}
        <div class="cLayout cLayout--user_folders">
            ${inner}
        </div>`;

        return layout;
    }
}

export const userFolders = directive(UserFoldersDirective);