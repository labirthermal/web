import type { CSSResultGroup, TemplateResult } from "lit";
import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { AbstractFolderThumbnail } from "./AbstractFolderThumbnail";

@customElement("connected-folder-thumbnail")
export class ConnectedFolderThumbnail extends AbstractFolderThumbnail {


    public static styles: CSSResultGroup = [
        AbstractFolderThumbnail.styles,
        css`

        :host {
        
            display: grid;
            grid-template-columns: 100px 1fr;

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );
            overflow: hidden;

            cursor: pointer;

            transition: all .2s ease-in-out;

        }

        figure.folder-thumbnail.folder-thumbnail_icon {
        
            background: var( --thermal-slate );

            thermal-icon {
                color: var( --thermal-slate-light );
            }
        
        }


        :host(:hover) {

            box-shadow: var( --thermal-shadow );
            border-color: var( --thermal-slate-dark );

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

        header {
            
            box-sizing: border-box;
            width: 100%;
            min-height: 75px;

            padding: calc( var(--thermal-gap) * .5);
            background: var( --thermal-background );

            .header-top {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: calc( var(--thermal-gap) * .5 );

                width: 100%;

                .header-top-icons {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    color: var( --thermal-slate );
                }
            }

            .header-bottom {
                display: flex;
                justify-content: flex-start;
                margin-top: auto;
            }

            h2 {
                font-size: calc( var(--thermal-fs) * 1 );
                margin: 0;
                padding: 0;
            }

            .description {
                margin-top: calc( var(--thermal-gap) * .25 );
                font-size: calc( var(--thermal-fs) * 0.8 );
                color: var( --thermal-slate );
            }



            .header-folder-icon {
                display: block;
                width: 1.4em;
            }   

        }

        .counter-with-icon {
            font-size: .8em;
        }

    `];

    

    render(): TemplateResult {

        const name = this.folder.name ?? this.folder.slug;

        return html`

            ${this.renderThumbnail()}

            <header>
                <div class="header-top">
                    <div class="header-top-text">
                        <h2>${name}</h2>
                        <div class="description">${this.folder.description}</div>
                    </div>
                    <div class="header-top-icons">

                        <thermal-icon icon="folder" variant="outline" class="header-folder-icon"></thermal-icon>
                        
                        ${this.renderCountWithIcon( this.folder.lrc_count, "image" )}

                        ${this.renderCountWithIcon( this.subfoldersCount ?? 0, "folder" )}

                        <connected-folder-selection-checkbox .folder=${this.folder}></connected-folder-selection-checkbox>

                    </div>
                </div>
                <div class="header-bottom" @click=${this.handleActionClick}>
                    <slot name="action"></slot>
                </div>
            </header>

        `;
    }



}