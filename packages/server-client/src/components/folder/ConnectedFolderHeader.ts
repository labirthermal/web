import { icons } from "@labirthermal/webcomponents";
import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import type { BreadcrumbItem } from "../../client/responseEntities";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";

export class ConnectedFolderHeader extends AbstractControlledConsumer {


    @property({ type: Function })
    public onParentClick?: (folder: BreadcrumbItem) => void;

    protected icon = icons.folder.outline("icon");

    public static styles?: CSSResultGroup | undefined = css`
        :host {
            display: flex;
            flex-wrap: no-wrap;
            font-size: var(--thermal-fs);
            gap: .5em;
        }


        .part {

            display: block;
            background: var(--thermal-background);
            color: var(--thermal-foreground);
            border-radius: var(--thermal-radius);
            padding: var(--thermal-gap);
            box-sizing: border-box;
        
        }


        section {
            display: grid !important;
            grid-template-columns: 2em 1fr;
            grid-template-rows: auto auto;
            gap: 0 var(--thermal-gap);
            flex-grow: 1;
        }

        .icon {
            grid-row: 1;
            grid-column: 1;
            width: 2em;
            display: block;
            color: var(--thermal-slate);
        }

        .content {
            grid-row: 1;
            grid-column: 2;
        }

        h1 {
            font-size: var(--thermal-fs);
            margin: 0;
            padding: 0;
        }

        .description {
            font-size: .8em;
            color: var(--thermal-slate);
        }

        .actions {
            grid-row: 2;
            grid-column: 1 / -1;
            display: flex;
            flex-wrap: wrap;
            gap: 0 2em;
            align-items: center;

            slot::slotted(*) {
                padding-top: 1em;
            }
        }

        .actions:not(:has(*)) {
            display: none;
        }

        /* Fallback for browsers without :has() support */
        .actions:empty {
            display: none;
        }
    `;

    connectedCallback(): void {
        super.connectedCallback();
        this.client.subscribeToIdentityChanges(this);
        this.content.subscribeToFolderUpdates(this);
        this.content.subscribeToBreadcrumbUpdates(this);
    }


    protected renderUpButton(): unknown {

        if (!this.content.breadcrumb || this.content.breadcrumb.length === 0) {
            return nothing;
        }

        const folders = this.content.breadcrumb.filter(item => item.type === "folder");
        if (folders.length <= 1) {
            return nothing;
        }

        const parent = folders[folders.length - 2];
        const lockedPath = this.display.host.lockedPath;

        if (lockedPath && !parent.path.includes(lockedPath)) {
            return nothing;
        }

        const callback = this.onParentClick || (() => { });

        return html`
            <thermal-btn 
                variant="background" 
                @click=${() => callback(parent)} 
                icon="upwards" 
                iconStyle="outline" 
                size="xl"
                tooltip="Jít o úroveň výš do složky '${parent.name}'."
            >
            </thermal-btn>
        `;


    }

    protected render(): unknown {
        return html`

        ${this.renderUpButton()}
        
        <section class="part">

            ${this.i(this.icon)}

            <div class="content">

                <h1>
                    ${this.content.folder?.name}
                </h1>

                ${this.content.folder?.description ? html`<div class="description">${this.content.folder?.description}</div>` : nothing}
            </div>
            
            <div class="actions">
                <slot></slot>
            </div>
        </section>
        `;
    }

}