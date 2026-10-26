import { css, html, nothing } from "lit";
import type { AbstractConnectedApp } from "../../../abstraction/AbstractConnectedApp";
import { AbstractConnectedDirective } from "../AbstractConnectedDirective";
import type { BreadcrumbItem } from "../../../../client/responseEntities";

export abstract class AbstractLayoutDirective extends AbstractConnectedDirective {


    static readonly styles = css`

        .cLayout__header {
            display: flex;
            flex-direction: column;
            gap: .5em;
        }

        .cLayout__content {
            
            width: 100%;
            position: relative;
            padding-top: .5em;

            &.cLayout__content--with-toolbar {
                display: grid;
                grid-template-columns: 2em 1fr;
                gap: 1em;
            }

        }

        .clayout__content__toolbar {
            position: relative;
            & > * {
                position: sticky;
                top: 0px;
            }
        }

        .clayout__content__inner {
            width: 100%;
            display: grid;
            gap: 1em;
            position: relative;
        }

        .cLayout__user_folders_list {
            display: flex;
            flex-direction: column;
            gap: .5em;
        }

        .cLayout--user_folders {

            margin-top: 1em;
        
            display: grid;
            gap: 1em;

            grid-template-columns: 1fr 200px;
            grid-template-rows: auto;

            dl {
                dt {
                    
                }
                dd {
                    margin-left: 0;
                    font-weight: bold;
                    margin-bottom: 1em;
                }
            }

            h2,
            dt {
                margin-bottom: .25em;
                font-size: .8em;
                color: var(--thermal-slate-dark);
                text-transform: uppercase;
                font-weight: normal;
            }
        
        }
    
    `;

    protected renderBreadcrumb(
        app: AbstractConnectedApp
    ): unknown {

        return html`<connected-breadcrumb 
            slot="pre"
            .onFolderClick=${ ( folder: BreadcrumbItem ) => app.display.navigateToFolderAndLoad( folder.path ) }
            .onUserClick=${ () => app.display.navigateToUserFoldersAndLoad()}
        ></connected-breadcrumb>`;

    }

    protected renderHeader(
        content: unknown
    ): unknown {
        return html`<header class="cLayout__header" slot="pre">${content}</header>`;
    }

    protected renderContent(
        hasToolbar: boolean = false,
        gridTemplateColumns: string,
        classes: string | undefined,
        content: unknown
    ): unknown {

        const toolbarClass = hasToolbar 
            ? "cLayout__content--with-toolbar" : "";

        return html`<div class="cLayout__content ${toolbarClass}">
            ${hasToolbar
                ? html`<div class="clayout__content__toolbar" >
                    <manager-tool-bar></manager-tool-bar>
                </div>`
                : nothing
            }
            <div class="clayout__content__inner ${classes}" style="grid-template-columns: ${gridTemplateColumns}">
                ${content}
            </div>
        </div>`;

    }

    protected renderThermalScaleSlot(): unknown {
        return html`<thermal-slot
            label=${this.t("thermalscale")}
        >
            <manager-palette-dropdown></manager-palette-dropdown>
            <registry-range-form></registry-range-form>
        </thermal-slot>`;
    }

    protected renderLoading(
        message: string
    ): unknown {
        return html`<thermal-poster
            .message=${ message }
        ></thermal-poster>`;
    }

    protected renderError(
        message: string
    ): unknown {
        return html`<thermal-poster
            .message=${ message }
            icon="warning"
            iconStyle="outline"
            .loading=${ false }
        ></thermal-poster>`;
    }

}