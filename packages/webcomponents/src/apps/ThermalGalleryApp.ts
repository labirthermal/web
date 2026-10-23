import type { AvailableThermalPalette, ThermalManager } from "@labirthermal/core";
import { provide } from "@lit/context";
import { t } from "i18next";
import type { CSSResultGroup, PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import type { RegistryProviderElement } from "../hierarchy/providers/RegistryProvider";
import { T } from "../translations/Languages";
import type { Locales } from "../translations/localeContext";
import { initLocalesInTopLevelElement, localeContext, localeConverter } from "../translations/localeContext";
import { ThermalFileElement } from "../utils/multipleFiles/ThermalFile";
import { ThermalGroup } from "../utils/multipleFiles/ThermalGroup";
import { AbstractApp } from "./AbstractApp";

type ParsedFile = {
    lrc: string;
    png?: string;
    label?: string;
};

type ParsedGroup = {
    label?: string,
    description?: string,
    lat?: string,
    lon?: string,
    files: ParsedFile[]
};

type ParsedStructure = ParsedGroup[];

enum STATE {
    MAIN = "main",
    GROUP = "group",
    FILE = "file"
}

export class ThermalGalleryApp extends AbstractApp {

    public get manager(): ThermalManager {
        return this.registryRef.value!.registryObject.manager;
    }


    // Presentational attributes
    @property({ type: String, reflect: true })
    public author?: string;

    @property({ type: String, reflect: true })
    public label: string = "Gallery of IR images";

    @property({ type: String, reflect: true })
    public license?: string;

    @property({ type: String, reflect: true, attribute: true })
    public palette: AvailableThermalPalette = "jet";

    @state()
    @queryAssignedElements({ flatten: true })
    protected slottedElements!: Array<Element>;

    @state()
    protected structure?: ParsedStructure;

    @state()
    protected state: STATE = STATE.MAIN;

    @state()
    protected group?: ParsedGroup;

    @state()
    protected file?: ParsedFile;

    protected registryRef: Ref<RegistryProviderElement> = createRef();


    @provide({ context: localeContext })
    @property({ reflect: true, converter: localeConverter })
    public locale!: Locales;

    @state()
    columns: number = 3;

    connectedCallback(): void {

        super.connectedCallback();

        initLocalesInTopLevelElement(this);

        this.addEventListener("slotchange", () => {
            this.processSlots();
        });

    }

    firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        this.processSlots();

        this.resetRegistry();

        if (this.registryRef.value) {

            this.registryRef.value?.registryObject.palette.setPalette(this.palette);

            this.registryRef.value.registryObject.batch.onBatchComplete.set(this.UUID, () => {
                if (this.registryRef.value) {
                    const registry = this.registryRef.value.registryObject;
                    registry.range.applyMinmax();
                }
            });

            this.registryRef.value.registryObject.groups.addListener(this.UUID, () => {
                if (this.registryRef.value) {
                    const registry = this.registryRef.value.registryObject;
                    registry.range.applyMinmax();
                }
            });
        }
    }

    protected processSlots(): void {
        setTimeout(() => {
            this.structure = this.slottedElements
                .filter(element => element instanceof ThermalGroup)
                .map(element => {
                    return {
                        label: element.getAttribute("label"),
                        description: element.getAttribute("description"),
                        lat: element.getAttribute("lat"),
                        lon: element.getAttribute("lon"),
                        files: Array.from(element.children)
                            .filter(child => {
                                return child instanceof ThermalFileElement
                                    && child.hasAttribute("lrc")
                            })
                            .map(child => {
                                return {
                                    lrc: child.getAttribute("lrc"),
                                    png: child.getAttribute("png"),
                                    label: child.getAttribute("label")
                                } as ParsedFile
                            })
                    } as ParsedGroup;
                })
                .filter(element => element.files.length > 0);
        }, 1000);

    }


    protected actionMainOpen() {
        this.state = STATE.MAIN;
        this.resetRegistry();
        setTimeout(() => {
            this.group = undefined;
            this.file = undefined;
        }, 0);
    }


    protected actionGroupOpen(group: ParsedGroup) {

        this.resetRegistry();
        setTimeout(() => {
            this.group = group;
            this.columns = Math.min(4, group.files.length);

            if (group.files.length > 1) {
                this.state = STATE.GROUP;
            } else {
                this.state = STATE.FILE;
                this.file = group.files[0];
            }

        }, 0);
    }


    protected actionDetailOpen(file: ParsedFile) {
        if (this.group === undefined) {
            throw new Error("Group not yet set");
        }
        this.state = STATE.FILE;
        this.resetRegistry();
        setTimeout(() => {
            this.file = file;
        }, 0);
    }


    protected actionDetailClose() {
        this.state = STATE.GROUP;
        this.resetRegistry();
        setTimeout(() => {
            this.file = undefined;
        }, 0);
    }


    protected resetRegistry() {
        if (this.registryRef.value) {

            this.registryRef.value.registryObject.forEveryInstance(instance => instance.unmountFromDom());

            // this.registryRef.value.registry.reset();

            this.registryRef.value.registryObject.batch.onBatchComplete.set(this.UUID, () => {
                this.registryRef.value?.registryObject.range.applyMinmax();
            });
        }
    }



    protected renderMain() {

        if (this.structure === undefined) {
            return html`<thermal-poster label="Načítám data"></thermal-poster>`;
        }

        const preview = this.structure.map(group => {
            const { files, ...rest } = group;
            return {
                ...rest,
                file: files[0],
                group
            }
        });

        const groups = preview.map((group, index) => {
            const slug = group.label ?? `group_preview_${index}`;
            return html`<registry-provider slug="${slug}" autoclear="true">
            <group-provider slug="${slug}" autoclear="true" batch="true">
                <button class="group-thumbnail" @click="${() => this.actionGroupOpen(group.group)}">
                    <div class="header">
                        <div class="info">
                            <div class="title">${group.label}</div>
                            <div class="count">${t(T.numfiles, { num: group.group.files.length })}</div>
                        </div>
                        <div class="button">
                            ${group.group.files.length > 1
                    ? html`<thermal-icon icon="folder" variant="outline"></thermal-icon>`
                    : html`<thermal-icon icon="image" variant="outline"></thermal-icon>`
                }
                        </div>
                    </div>
                    <file-provider thermal="${group.file.lrc}" batch="true" autoclear="true">
                        <file-canvas></file-canvas>
                    </file-provider>
                </button>
            </group-provider>
            </registry-provider>
            `;
        });


        return html`
            <div class="main">
                ${groups}
            </div>
        `;

    }


    protected renderGroup() {

        if (this.structure === undefined || this.group === undefined) {
            return html`<thermal-poster></thermal-poster>`;
        }

        return this.renderBrowser(html`
            <group-provider slug="${this.group.label ?? `group_detail_${Math.random()}`}" autoclear="true">

                <group-chart slot="pre"></group-chart>

                <header>

                    <thermal-btn variant="foreground" @click="${() => this.actionMainOpen()}" tooltip="Zavřít skupinu" icon="close" iconStyle="micro"></thermal-btn>

                    <thermal-dropdown>
                        <span slot="invoker">${this.group.label}</span>
                        ${this.structure.filter(group => group.label !== this.group?.label).map(group => {
            return html`<div slot="option">
                                <thermal-btn @click="${() => this.actionGroupOpen(group)}">${group.label}</thermal-btn>
                            </div>`;
        })}
                    </thermal-dropdown>

                    <group-download-dropdown></group-download-dropdown>

                    <div>
                        <input type="range" min="1" max="4" step="1" value=${this.columns} @input=${(event: InputEvent) => {

                const target = event.target as null | { value: string }
                const value = target?.value;
                if (value !== undefined) {
                    this.columns = parseInt(value);
                }
            }}></input>
                        <div style="color: var( --thermal-slate-dark );font-size: calc( var( --thermal-fs-sm ) * .7 ); line-height: 1em;">${t(T.columns, { num: this.columns })}</div>
                    </div>
                    
                    <group-analysis-sync-button></group-analysis-sync-button>

                </header>

                ${this.group.description
                ? html`<section class="group-description">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <p>${this.group.description}</p>
                    </section>`
                : nothing
            }

                <section class="files columns_${this.columns}">
            
                    ${this.group.files.map(file => html`<file-provider thermal="${file.lrc}" batch="true" autoclear="true">
                        <file-thumbnail .ondetail="${() => this.actionDetailOpen(file)}"></file-thumbnail>
                    </file-provider>`)}
            
                </section>

            </group-provider>
        ` );

    }


    protected renderFile() {

        if (this.structure === undefined || this.group === undefined || this.file === undefined) {
            return html`<thermal-poster></thermal-poster>`;
        }



        return this.renderBrowser(html`<group-provider slug="${this.file.lrc}" autoclear="true">

            <file-provider batch="true" autoclear="true" thermal="${this.file.lrc}">
                <file-detail label="${this.group.label}" .onback="${() => {
                    if (this.group?.files.length === 1) {
                        this.actionMainOpen();
                    } else {
                        this.actionDetailClose();
                    }
            }}"></file-detail>
            </file-provider>

        </group-provider>`);

    }



    protected renderBrowser(content: ReturnType<typeof html>) {

        return html`<div class="browser state_${this.state}">
            <section>
                <manager-tool-bar></manager-tool-bar>
            </section>
            <section>
                ${content}
            </section>
        </div>`;

    }



    public static styles?: CSSResultGroup | undefined = css`
        .group-thumbnail {
            
            margin: 0;
            padding: 0;
            cursor: pointer;

            overflow: hidden;
            width: 100%;

            border-radius: var(--thermal-radius);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);

            background: var(--thermal-slate-light);
            color: var(--thermal-foreground);

            transition: all .4s ease-in-out;

            box-shadow: 0 0 5px var(--thermal-slate);

            div.header {

                display: grid;
                grid-template-columns: auto 1.5em;
                padding: var(--thermal-gap);
                gap: var(--thermal-gap);
                text-align: left;

                .title {
                    font-weight: bold;
                    font-size: 1.2em;
                    margin-bottom: .5em;
                }

                .count {
                    font-size: .9em;
                    opacity: .8;
                }

                .button {
                    opacity: .8;
                }
            }

            file-provider {
                overflow: hidden;
                display: block;
            }

            file-canvas {
                overflow: hidden;
                display: block;
                transition: all .4s ease-in-out;
            }

            &:hover,
            &:focus {
                background: var(--thermal-background);
                box-shadow: 0 0 15px var(--thermal-slate-dark);
                file-canvas {
                    transform: scale(1.1);
                }
            }
        }

        .browser {
            display: grid;
            grid-template-columns: 3em 1fr;

            &.state_file {
                file-provider {
                    display: block;
                    background: var(--thermal-background);
                    padding: var(--thermal-gap);
                    border-radius: var(--thermal-radius);
                    border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                }
            }
        
            &.state_group {
                group-provider {

                    display: block;
                    width: 100%;
                    box-sizing: border-box;
                    padding: var(--thermal-gap);
                    border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                    border-radius: var(--thermal-radius);

                    header {
                        display: flex;
                        gap: 5px;
                        margin-bottom: var(--thermal-gap);
                    }

                    .group-description {
                        border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                        border-radius: var(--thermal-radius);
                        padding: var(--thermal-gap);
                        box-sizing: border-box;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        gap: var(--thermal-gap);
                        margin-bottom: var(--thermal-gap);

                        svg {
                            opacity: .8;
                            width: 1em;
                        }

                        p {
                            margin: 0;
                            padding: 0;
                            font-size: calc(var(--thermal-gap) * .8);
                        }
                    }

                    .files {

                        display: grid;
                        margin: calc( var(--thermal-gap) * .5 * -1);

                        &.columns_1 { grid-template-columns: 100%; }
                        &.columns_2 { grid-template-columns: repeat( 2, 50% ); }
                        &.columns_3 { grid-template-columns: repeat( 3, calc(100% / 3) ); }
                        &.columns_4 { grid-template-columns: repeat( 4, calc(100% / 4) ); }
                        &.columns_5 { grid-template-columns: repeat( 5, calc(100% / 5) ); }
                        &.columns_6 { grid-template-columns: repeat( 6, calc(100% / 6) ); }
                        &.columns_7 { grid-template-columns: repeat( 7, calc(100% / 7) ); }
                        &.columns_8 { grid-template-columns: repeat( 8, calc(100% / 8) ); }
                        &.columns_9 { grid-template-columns: repeat( 9, calc(100% / 9) ); }
                        &.columns_10 { grid-template-columns: repeat( 10, calc(100% / 10) ); }

                        file-thumbnail {
                            padding: calc( var(--thermal-gap) * .5);
                        }
                    }
                }
            }
        }


        .main {

            display: grid;
            grid-template-columns: repeat( auto-fill, minmax(300px, 1fr) );
            gap: var(--thermal-gap);

            group-provider {
                width: 100%;
            }
        }
    `;



    protected render(): unknown {
        return html`<manager-provider slug="${this.UUID}">
            <registry-provider slug="${this.UUID}" ${ref(this.registryRef)} palette="${this.palette}">
                <thermal-app 
                    author="${ifDefined(this.author)}" 
                    license="${this.license}" 
                    showfullscreen="true"
                    label="${this.label}"
                    .onlabel="${() => this.actionMainOpen()}"
                >


                    <manager-palette-dropdown slot="bar-post"></manager-palette-dropdown>

                    ${this.structure !== undefined && this.state !== STATE.MAIN
                ? html`
                        <registry-range-form slot="bar-pre"></registry-range-form>
                        <registry-histogram slot="pre" expandable="true"></registry-histogram>
                        <registry-range-slider slot="pre"></registry-range-slider>
                        <registry-ticks-bar slot="pre"></registry-ticks-bar>
                        `
                : nothing
            }
                    

                    <thermal-dialog label="${t(T.config)}" slot="close">
                            
                        <thermal-btn slot="invoker" icon="settings" iconStyle="solid" tooltip="${t(T.config)}"></thermal-btn>

                        <div slot="content">
                            <table>
                                <manager-export-panel></manager-export-panel>
                                <display-panel></display-panel>
                            </table>
                        </div>
                    </thermal-dialog>

                    ${this.state === STATE.MAIN ? this.renderMain() : nothing}
                    ${this.state === STATE.GROUP ? this.renderGroup() : nothing}
                    ${this.state === STATE.FILE ? this.renderFile() : nothing}

                    <slot></slot>


                </thermal-app>
            </registry-provider>
        </manager-provider>`;
    }

}