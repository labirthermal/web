import type { CSSResultGroup} from "lit";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";
import type { FolderInfo } from "../../../../client/responseEntities";

export class AbstractFolderThumbnail extends AbstractControlledConsumer {

    @property({ type: Object })
    public folder!: FolderInfo;

    @property({ type: Function })
    onClick?: (folder: FolderInfo) => void;

    @property({ type: Function })
    onUpdate?: (folder: FolderInfo) => void;

    @property({ type: Number })
    public subfoldersCount?: number;


    public get internalSlug() {
        return this.folder.path.replaceAll("/", "-").replaceAll(" ", "_") + "___thumbnail";
    }

    static readonly styles: CSSResultGroup = css`
    
        :host {
            font-size: var( --thermal-fs );
            color: var( --thermal-foreground );
        }

        figure.folder-thumbnail {

            display: block;
            margin: 0;
            padding: 0;

        }

        figure.folder-thumbnail.folder-thumbnail_lrc {

            object-position: center center;

            overflow: hidden;

            manager-provider,
            registry-provider,
            group-provider,
            file-provider {
                display: contents;
                
            }

            file-canvas {
                display: block;
                height: 100%;
                width: auto;
                pointer-events: none;
            }

            file-canvas::part(file-canvas-container),
            file-canvas::part(thermal-canvas-wrapper) {
                width: 100% !important;
                height: 100% !important;
                transition: all .2s ease-in-out;
            }

            file-canvas::part(thermal-file-canvas) {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center center;
            }

        }

        figure.folder-thumbnail.folder-thumbnail_image {

            overflow: hidden;

            img {
                transition: all .2s ease-in-out;
                object-fit: cover;
                object-position: center center;
                width: 100%;
                height: 100%;

            }

        }

        figure.folder-thumbnail.folder-thumbnail_icon {

            display: flex;
            align-items: center;
            justify-content: center;

            thermal-icon {
                transition: all .2s ease-in-out;
                color: var( --thermal-slate );
                width: 2em;
                display: block;
            }
        
        }


        .counter-with-icon {
            display: flex;
            gap: .3em;
            align-items: center;
            thermal-icon {
                display: block;
                width: 1em;
                transform: translateY(.1em);
            }
        }

    `;

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("click", this.handleActionClick.bind(this));
    }

    protected handleActionClick(event: MouseEvent) {
        event.stopPropagation();

        const innerTarget = "originalTarget" in event ? (event as any).originalTarget : event.target;

        console.log(innerTarget);

        if (innerTarget instanceof HTMLInputElement) {

        } else {
            // event.stopPropagation();
            this.log(this.onClick);
            this.onClick && this.onClick(this.folder);
        }
    }

    protected renderCountWithIcon(
        count: number,
        icon: string,
        variant: string = "micro"
    ): unknown {
        if (count <= 0) return nothing;
        return html`<div class="counter-with-icon">
                <span>${count}x</span>
                <thermal-icon icon=${icon} variant=${variant}></thermal-icon>
            </div>`;
    }

    protected renderThumbnail() {

        // If thumbnail is image, render it
        if (this.folder.thumb && this.shouldRenderThumbnailImage()) {
            return this.renderThumbnailWrapper(
                this.renderThumbnailImage(this.folder.thumb, this.folder.name),
                "image"
            );
        }

        // if thumbnail is LRC, render it
        if (this.folder.thumb && this.shouldRenderThumbnailLrc()) {
            return this.renderThumbnailWrapper(
                this.renderThumbnailLrc(this.folder.thumb),
                "lrc"
            );
        }

        // Otherwise, render icon
        return this.renderThumbnailWrapper(
            this.renderThumbnailIcon(),
            "icon"
        );

    }

    private shouldRenderThumbnailLrc(): boolean {
        return this.folder.thumb?.toLowerCase().endsWith(".lrc") ?? false;
    }

    private shouldRenderThumbnailImage(): boolean {
        if (!this.folder.thumb) return false;
        const lower = this.folder.thumb.toLowerCase();
        return lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".gif") || lower.endsWith(".webp");
    }

    private renderThumbnailWrapper(
        content: unknown,
        typeClass: string
    ) {
        return html`<figure class="folder-thumbnail folder-thumbnail_${typeClass}">${content}</figure>`;
    }

    private renderThumbnailIcon() {

        return html`<thermal-icon icon="folder" variant="outline"></thermal-icon>`;

    }

    private renderThumbnailImage(
        src: string,
        alt: string
    ) {
        return html`<img src="${src}" alt="${alt}" />`;
    }

    private renderThumbnailLrc(
        thermalUrl: string
    ) {
        return html`<registry-provider
            autoclear="true"
            batch="true"
            slug="${this.internalSlug}"
        >
            <group-provider 
                slug="${this.internalSlug}"
                autoclear="true"
                batch="true"
            >
                <file-provider
                    thermal="${thermalUrl}"
                    batch="true"
                    autoclear="true"
                >
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>`;
    }

}