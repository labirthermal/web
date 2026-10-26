import { t } from "i18next";
import type { CSSResultGroup, PropertyValues, TemplateResult } from "lit";
import { css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { BreadcrumbItem } from "../../client/responseEntities";
import { T } from "../../translations/Languages";
import { AbstractControlledConsumer } from "../abstraction/AbstractControlledConsumer";
import { DisplayState } from "../DisplayController";



type BreadcrumbItemInternal = {
    onClick?: () => void;
    icon: string;
    iconStyle: string;
    label: string;
    tooltip?: string;
}



@customElement("connected-breadcrumb")
export class ConnectedBreadcrumb extends AbstractControlledConsumer {

    @property({ type: Function })
    public onFolderClick?: (folder: BreadcrumbItem) => void;

    @property({ type: Function })
    public onUserClick?: () => void;

    @state()
    private items: BreadcrumbItemInternal[] = [];


    public static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: flex;
            align-items: center;
            gap: 0.5em;

            color: var(--thermal-slate);
            font-size: calc( var(--thermal-fs) * 0.8 );
        }

        .item {
            --color: var( --thermal-slate );
            --color-hover: var( --thermal-foreground );
        }

        .interactive {
            --color: var( --thermal-slate-dark );
            --color-hover: var( --thermal-primary );
        }

        .current {
            --color: var( --thermal-slate-dark );
            --cursor: help;
            text-decoration: underline;
        }
    
    `;


    connectedCallback(): void {
        super.connectedCallback();

        this.refreshItems();

        this.display.onAppModeUpdate.set(this.UUID, () => {

            this.refreshItems();
        });

        this.content.onBreadcrumbUpdate.set(this.UUID, () => {

            this.refreshItems();

        });

        this.client.onIdentity.set(this.UUID, () => {

            this.refreshItems();

        });

    }

    protected update(changedProperties: PropertyValues): void {
        super.update(changedProperties);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.content.onBreadcrumbUpdate.delete(this.UUID);
        this.client.onIdentity.delete(this.UUID);
    }

    private refreshItems(): void {

        this.items = this.calculateItems(
            this.content.breadcrumb || [],
        );

    }



    private calculateItems(
        breadcrumb: BreadcrumbItem[],
        lockedLocation?: string
    ) {

        const items: BreadcrumbItemInternal[] = [];

        // Odkaz na server přidáme vždy, s případnou ikonkou zamčení
        items.push({
            icon: "wifi",
            iconStyle: "micro",
            label: this.client.serverInfo?.name || "Server"
        });

        // Přidáme odkaz na uživatele, pokud je k dispozici
        if (this.client.identity) {


            const userItem: BreadcrumbItemInternal = {
                icon: "user",
                iconStyle: "micro",
                label: this.client.identity.meta.name || this.client.identity.user || "User",
            };

            // Pokud je odemčená lokace, přidáme funkci pro přechod na uživatelovo přehled
            if (!lockedLocation) {
                userItem.tooltip = t(T.overviewofyourfolders);
                userItem.onClick = () => {
                    this.onUserClick?.();
                };
            }

            items.push(userItem);

        }

        // Pokud je prohlížení uzamčeno na určitou lokaci, přidáme ještě ikonku zámku
        if (lockedLocation ) {

            const lockedLabel = breadcrumb.find(item => item.path === lockedLocation)?.name || lockedLocation;

            items.push({
                icon: "lock",
                iconStyle: "micro",
                label: "",
                tooltip: `V tomto zobrazení procházíte pouze složku "${lockedLabel}".`,
            });
        }

        // Přidáme složky z breadcrumbu, ale jen ty, které obsahují lockedlocation

        if (this.display.appState !== DisplayState.USER) {

            for (const item of breadcrumb) {

                if (item.type !== "folder") {
                    continue;
                }

                if (lockedLocation !== undefined && !item.path.includes(lockedLocation)) {
                    continue;
                }

                const folderItem: BreadcrumbItemInternal = {
                    icon: "folder",
                    iconStyle: "micro",
                    label: item.name || "Folder",
                    tooltip: item.path || "Folder",
                    onClick: () => this.onFolderClick?.(item),
                };

                items.push(folderItem);
            }

        }


        return items;


    }


    protected renderItem(
        item: BreadcrumbItemInternal,
        index: number
    ): TemplateResult {

        const isInteractive = item.onClick !== undefined && index < this.items.length - 1;

        const classNames = {
            item: true,
            [item.icon]: true,
            current: index === this.items.length - 1,
            interactive: isInteractive
        }

        return html`
        ${index > 0 ? html`<span>/</span>` : nothing}
        <thermal-btn 
            class="${classMap(classNames)}"
            @contextmenu=${(e: MouseEvent) => {
                if (item.tooltip) {
                    e.preventDefault();
                    navigator.clipboard.writeText(item.tooltip);
                }
            }}
            @click=${() => {
                if (item.onClick) {
                    item.onClick();
                }
            }}
            variant="text"
            icon="${item.icon}"
            iconStyle="${item.iconStyle}"
            interactive=${isInteractive ? "true" : "false"}
            tooltip=${item.tooltip ? item.tooltip : undefined}
        >
            ${item.label}
        </thermal-btn>`;
    }


    protected render(): unknown {

        return html`${this.items.map(this.renderItem.bind(this))}`;

    }

}