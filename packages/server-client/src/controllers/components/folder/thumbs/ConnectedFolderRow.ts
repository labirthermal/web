import type { CSSResultGroup, TemplateResult } from "lit";
import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { AbstractFolderThumbnail } from "./AbstractFolderThumbnail";

@customElement("server-folder-row")
export class ConnectedFolderRow extends AbstractFolderThumbnail {


    public static styles: CSSResultGroup = [
        AbstractFolderThumbnail.styles,
        css`

        :host {
        
            display: table-row;

            cursor: pointer;

            transition: all .2s ease-in-out;

            filter: drop-shadow(0px 0px 1px var(--thermal-slate));

            & > td {

                display: table-cell;
                vertical-align: middle;

                min-width: 1em;
                position: relative;

                border-bottom: .5em var(--thermal-border-style)transparent;

                background: var(--thermal-background);
            

                & > * {

                    display: block;

                    height: 100%;

                    overflow: hidden;

                }
                

                &:first-child {

                    border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );

                    & > * {
                        border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
                    }

                }

                &:last-child {

                    border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;

                    & > * {
                        border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
                    }

                }
            }

        }

        figure.folder-thumbnail.folder-thumbnail_icon {
        
            background: var( --thermal-slate );

            thermal-icon {
                color: var( --thermal-slate-light );
            }
        
        }


        :host(:hover) {

            filter: drop-shadow( var( --thermal-shadow ) );

            figure.folder-thumbnail.folder-thumbnail_icon thermal-icon {
                color: var( --thermal-background );
                scale: 1.1;
            }

            figure.folder-thumbnail.folder-thumbnail_lrc {
            
                file-canvas::part(file-canvas-container),
                file-canvas::part(thermal-canvas-wrapper) {
                    scale: 1.05;
                }
            
            }

            figure.folder-thumbnail.folder-thumbnail_image {
            
                img {
                    scale: 1.05;
                }
            
            }
            
        }

        td {
            padding: 0;
        }

        .cell-texts {

            width: 50% !important;

            min-width: 200px;
            max-width: 500px;
        
        }

        .texts {
            padding: .5em 1em;
            height: 100%;
            box-sizing: border-box;
            
            h3 {
                font-size: 1em;
                margin: 0;
            }
            
            .description,
            .path {
                margin-top: .5em;
            }

            .description { 
                color: var(--thermal-slate); 
                font-size: .8em;
            }
            .path { 
                color: var(--thermal-slate); 
                font-size: .7em;
            }
        }

        .cell-thumbnail,
        figure.folder-thumbnail {

            height: 100px;
            width: 120px;
        
        }

        .cell-count {

            width: 4em;

            box-sizing: border-box;
            padding: .5em;

            vertical-align: middle !important;

            color: var(--thermal-slate);
            

            & > div {
                display: inline-block; 
                
            }
        
        }

        .cell-actions {
            text-align: right;
            box-sizing: border-box;
            padding: .5em 1em;

            & > div {
                display: inline-block;
            }
        }

        

    `];

    

    

    render(): TemplateResult {

        const name = this.folder.name ?? this.folder.slug;

        return html`
            <td class="cell cell-thumbnail">
                ${this.renderThumbnail()}
            </td>

            <td class="cell cell-texts">
                <div class="texts">
                    <h3>${name}</h3>
                    ${this.folder.description ? html`<div class="description">${this.folder.description.substring(0, 80)}${this.folder.description.length > 80 ? '...' : ''}</div>` : nothing}

                    <div class="path">
                        /${this.folder.path}
                    </div>
                </div>
            </td>

            <td class="cell cell-count">
                <div>
                    ${this.renderCountWithIcon( this.folder.lrc_count, "image" )}
                </div>
            </td>

            <td class="cell cell-count">
                <div>
                    ${this.renderCountWithIcon( this.subfoldersCount ?? 0, "folder" )}
                </div>
            </td>

            <td class="cell cell-actions" @click="${this.handleActionClick}">
                <div>
                    <slot name="actions"></slot>
                </div>
            </td>

        `;
    }



}