import { icons, t } from "@labirthermal/webcomponents";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { FileInfo, FolderInfo, TagInfo } from "../../client/responseEntities";
import { T } from "../../translations/Languages";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";

type TagSizes = "sm" | "md";

export class ControlledFileTags extends AbstractControlledConsumer {

    @property({ type: String, reflect: true })
    public editable: boolean = false;

    @property({type: String, reflect: true})
    public inline?: boolean;

    @property({ type: String, reflect: true})
    public size?: TagSizes;

    @property({ type: Object })
    public file!: FileInfo;

    @property({ type: Object })
    public folder!: FolderInfo;

    @property({ type: Function })
    public onChange: (file: FileInfo) => void = () => { };

    protected check = icons.check.micro( "icon" );


    connectedCallback(): void {
        super.connectedCallback();

        this.content.subscribeToFilesUpdates( this );
    }



    protected async handleTagClick(slug: string, tag: TagInfo) {

        // Pokud není editable, nedělej nic
        if (!this.editable) {
            return;
        }

        if (this.client) {

            const request = this.client.api.routes.post.updateFile(this.folder.path, this.file.fileName)!;

            if (this.hasTag(slug)) {
                request?.removeTag(slug);
            } else {
                request?.addTag(slug);
            }

            const result = await request.execute();

            if ( result.success ) {

                this.content.updateFileState(
                    result.data.file
                );

            }

        }

    }


    protected hasTag(slug: string) {
        return this.file.tags.includes(slug);
    }

    protected getContrastColor(backgroundColor: string): string {
        // Převod hex na RGB
        let hex = backgroundColor.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Výpočet jasu podle W3C formulky
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // Pokud je jas > 128, použij černou, jinak bílou
        return brightness > 128 ? '#000000' : '#FFFFFF';
    }

    protected renderTagButton(slug: string, tag: TagInfo) {

        const has = this.hasTag(slug);

        const backgroundColor = has
            ? tag.color || "var(--thermal-slate-light)"
            : this.inline 
                ? "var(--thermal-slate-light)"
                : "var(--thermal-background)";

        const textColor = has
            ? tag.color 
                ? this.getContrastColor(tag.color) 
                : 'inherit'
            : 'var(--thermal-slate)';

        // Vypočítej invert hodnotu pro ikonu
        const iconInvert = has && tag.color && this.getContrastColor(tag.color) === '#FFFFFF' ? 1 : 0;
        
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.handleTagClick(slug, tag);
            }
        };

        return html`<button
            class="tag-button ${has ? 'has' : ''}"
            tabindex="${this.editable ? '0' : '-1'}"
            @click=${() => this.handleTagClick(slug, tag)}
            @keydown=${handleKeydown}
        >
            <div class="tag-button-content" style="background-color: ${backgroundColor}; color: ${textColor}; --icon-invert: ${iconInvert};">
                ${has
                    ? this.i(this.check)
                    : nothing
                }
                <span>${tag.name}</span>
            </div>
        </button>`;
    }

    public static styles = css`

        :host {
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs);

            display: flex;
            flex-wrap: wrap;
            gap: 1em;
            flex-direction: column;
            align-items: flex-start;
        }

        /* Inline layout - tags side by side */
        :host([inline]) {
            flex-direction: row;
            gap: .5em;
        }

        :host([inline]) .tag-group {
            flex-direction: row;
            gap: .5em;
        }

        :host([inline]) .tag-list {
            flex-direction: row;
            gap: .5em;
        }

        .tag-group {
            display: flex;
            flex-direction: column;
            gap: .5em;
            align-items: flex-start;
        }

        .tag-group-label {
            font-size: .8em;
            color: var(--thermal-slate-dark);
            margin-bottom: .25em;
        }

        /* Hide labels in inline mode */
        :host([inline]) .tag-group-label {
            display: none;
        }

        .tag-list {
            display: flex;
            flex-wrap: wrap;
            gap: .5em;
            flex-direction: column;
            align-items: flex-start;
        }
    
        .tag-button {
            border: 0;
            cursor: default;
            background: transparent;
            padding: 0;
            transition: all .2s ease-in-out;
            outline: none;
        }

        .tag-button:focus,
        .tag-button:focus-visible {
            outline: 2px var(--thermal-border-style)var(--thermal-primary, #007bff);
            outline-offset: 2px;
        }

        .tag-button-content {
            border-radius: 0 var(--thermal-radius) var(--thermal-radius) 0;
            padding: .5em 1em .5em 2em;
            display: flex;
            align-items: center;
            gap: .5em;
            position: relative;

            /* Simulace trojúhelníka s hladce zakulaceným hrotem */
            clip-path: polygon(1.5em 0%, 100% 0%, 100% 100%, 1.5em 100%, 0.4em 65%, 0.3em 55%, 0.3em 45%, 0.4em 35%);

            transition: all .2s ease-in-out;
        }

        /* Editable styling */
        :host([editable="true"]) .tag-button {
            cursor: pointer;
        }

        :host([editable="true"]) .tag-button:hover  {
            filter: drop-shadow(0 0 3px var(--thermal-slate));
        }

        .tag-button-content::before {
            content: '';
            position: absolute;
            left: 1em;
            top: 50%;
            transform: translateY(-50%);
            width: .5em;
            height: .5em;
            background: var(--thermal-slate-light);
            border-radius: 50%;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        }

        /* Small size styling */
        :host([size="sm"]) .tag-button-content {
            padding: .25em .5em .25em 1em;
            font-size: .7em;
            clip-path: polygon(1em 0%, 100% 0%, 100% 100%, 1em 100%, 0.2em 65%, 0.15em 55%, 0.15em 45%, 0.2em 35%);
        }

        /* Hide dot and checkbox in small size */
        :host([size="sm"]) .tag-button-content::before {
            display: none;
        }

        :host([size="sm"]) .tag-button-content .icon {
            display: none;
        }

        .tag-button:not(.has):hover .tag-button-content {
            color: var(--thermal-foreground) !important;
        }

        .tag-button-content .icon {
            width: 1em;
            height: 1em;
            filter: brightness(0) invert(var(--icon-invert, 0));
        }
    
    `;

    protected render(): unknown {

        const allTags = {
            ...this.folder.parent_tags,
            ...this.folder.own_tags
        }

        // Rozdělit tagy na přiřazené a nepřiřazené
        const assignedTags = Object.entries(allTags).filter(([slug]) => this.hasTag(slug));
        const unassignedTags = Object.entries(allTags).filter(([slug]) => !this.hasTag(slug));

        return html`

            ${assignedTags.length > 0 ? html`
                <div class="tag-group">
                    <div class="tag-group-label">${t(T.assignedtags)}</div>
                    <div class="tag-list">
                        ${assignedTags.map(([slug, info]) => this.renderTagButton(slug, info))}
                    </div>
                </div>
            ` : ''}

            ${unassignedTags.length > 0 && this.editable? html`
                <div class="tag-group">
                    <div class="tag-group-label">${t(T.availabletags)}</div>
                    <div class="tag-list">
                        ${unassignedTags.map(([slug, info]) => this.renderTagButton(slug, info))}
                    </div>
                </div>
            ` : ''}
        `;

    }


}