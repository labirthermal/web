import { TimeFormat } from "@labirthermal/core";
import type { CSSResultGroup} from "lit";
import { css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";

@customElement("connected-file-header")
export class ConnectedFileHeader extends AbstractControlledConsumer {

    connectedCallback(): void {
        super.connectedCallback();
        this.content.subscribeToFileUpdates(this);
        this.content.subscribeToFolderUpdates(this);
        this.client.subscribeToIdentityChanges(this);
    }

    public static styles?: CSSResultGroup | undefined = css`
:host {
    display: flex;
    flex-wrap: no-wrap;
    gap: .5em;

    color: var(--thermal-foreground);
    font-size: var(--thermal-fs);
}

.part {

    display: block;
    background: var(--thermal-background);
    color: var(--thermal-foreground);
    border-radius: var(--thermal-radius);
    padding: var(--thermal-gap);
    box-sizing: border-box;
}

h1 {
    font-size: 1em;
    margin: 0;
    padding: 0;
    margin-bottom: .5em;
}


section {
    display: grid !important;
    grid-template-columns: 2em 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--thermal-gap);
    flex-grow: 1;
}

thermal-icon {
    grid-row: 1;
    grid-column: 1;
    width: 2em;
    display: block;
    color: var(--thermal-slate);
}

.time-info {
    grid-row: 1;
    grid-column: 2;
}

.label-info {
    grid-row: 1;
    grid-column: 3;
}

.colophon {
    grid-row: 1;
    grid-column: 4;
    text-align: right;

    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    gap: .3em;

    thermal-btn {
        opacity: .5;
        transition: opacity .3s ease-in-out;
        cursor: help !important;

        &:hover,
        &:focus {
            opacity: 1;
        }
    }

}

.actions {
    grid-row: 2;
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
}

.actions:not(:has(*)) {
    display: none;
}

/* Fallback for browsers without :has() support */
.actions:empty {
    display: none;
}

.small {
    font-size: calc(var(--thermal-fs) * 0.8);
}

.slate {
    color: var(--thermal-slate);
}

.slate-dark {
    color: var(--thermal-slate-dark);
}

.slate-light {
    color: var(--thermal-slate-light);
}

`;

    protected renderColophon(): unknown {

        if (this.content.file === undefined) {
            return nothing;
        }

        const uploaded = TimeFormat.human(this.content.file.uploaded);

        return html`<div class="colophon small slate">
    <thermal-btn 
        variant="text"
        tooltip="Čas nahrání souboru"
        icon="upload"
        iconStyle="micro"
        interactive="false"
    >${uploaded}</thermal-btn>

    ${this.content.file.uploadedby
                ? html`<thermal-btn 
                variant="text"
                tooltip="Nahráno uživatelem"
                icon="user"
                iconStyle="micro"
                interactive="false"
            >${this.content.file.uploadedby.name}</thermal-btn>`
                : nothing}
</div>`;

    }

    protected renderUpButton(): unknown {

        if (!this.content.folder) {
            return nothing;
        }

        return html`<thermal-btn 
    variant="background" 
    @click=${() => {
                if (this.content.folder !== undefined) {
                    this.display.navigateToFolderAndLoad(this.content.folder.path)
                };
            }} 
    icon="close" 
    iconStyle="outline" 
    size="xl"
    tooltip="Zpět do složky '${this.content.folder.name}'."
></thermal-btn>`;


    }

    protected render(): unknown {

        if (this.content.file === undefined) {
            return nothing;
        }

        const time = TimeFormat.human(this.content.file.timestamp);

        return html`

${this.renderUpButton()}

<section class="part">

    <thermal-icon icon="image" variant="outline"></thermal-icon>

    <div class="time-info">
        <h1>${time}</h1>
        <div class="small slate">${this.content.file.fileName}</div>
    </div>

    <div class="label-info">
        ${this.content.file.label
                ? html`<h1>${this.content.file.label}</h1>`
                : nothing}
        ${this.content.file.description ? html`<div class="small slate">${this.content.file.description}</div>` : nothing}
    </div>

    ${this.renderColophon()}
                
    <div class="actions">
        <slot></slot>
    </div>
</section>`;
    }


}