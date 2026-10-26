import { booleanConverter, t } from "@labirthermal/webcomponents";
import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";
import type { FolderInfo } from "../../../client/responseEntities";
import { T } from "../../../translations/Languages";

interface PairedFiles {
    lrc: File;
    lrcUrl: string;
    visual?: File;
    visualUrl?: string;
    preview?: File;
    previewUrl?: string;
}

interface UnmatchedPng {
    file: File;
    url: string;
}

export class ConnectedUploadDialog extends AbstractControlledConsumer {

    @property({ type: Object })
    public folder!: FolderInfo;

    @property({ type: String })
    public label: string = t(T.uploadafile);

    @property({ type: String })
    public variant: string = "primary";

    @state()
    private errorMessage: string = "";

    @property({ type: String, converter: booleanConverter(false) })
    private plain: boolean = false;

    @property({ type: String })
    public tooltip?: string;

    @state()
    private allFiles: File[] = [];

    @state()
    private pairedFiles: PairedFiles[] = [];

    @state()
    private unmatchedPngs: UnmatchedPng[] = [];

    @state()
    private isDragging = false;

    @state()
    private infoMessage: string = "";

    @property({ type: Function })
    public onSuccess?: (files: File[]) => void;

    public static styles?: CSSResultGroup = css`

        :host {
            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);
        }

        .content {
            position: relative;
            box-sizing: border-box;
        }

        .stage-label {

            small {
                font-size: 1em;
                font-weight: normal;
                display: inline-block;
                opacity: .5;
            }
        
        }

        .stage-upload {
            min-height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            border: 2px dotted var(--thermal-slate);
            border-radius: var(--thermal-radius);
            cursor: pointer;
            transition: all .2s;
            padding: var(--thermal-gap);
            label {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1em;
                cursor: pointer;
            }
        }
        .stage-upload:hover,
        .stage-upload.drag-over { 
            border-color: var(--thermal-primary); 
            background: var(--thermal-background); 
        }

        input[type="file"] { 
            display: none; 
        }

        .paired-files-table { 
            width: 100%; 
            max-width: 100%;
            overflow-x: auto;
            border-collapse: collapse; 
        }
        .paired-files-table td { 
            padding: .5em; 
            vertical-align: top; 
        }
        .paired-files-table td:not(:first-child) { 
            width: calc(100% / 3); 
        }

        .paired-file-group {
        }

        .paired-file-group__header td { 
            background: var(--thermal-background); 
            border-radius: var(--thermal-radius); 
        }

        .file-preview { 
            display: grid; 
            grid-template-columns: 5em 1fr; 
            gap: .5em; 
            position: relative; 
        }

        .file-preview img, 
        .file-preview .file-preview__icon { 
            max-width: 5em; 
            height: auto; 
            display: block; 
        }
        .file-preview__icon { 
            background: var(--thermal-slate-dark); 
            color: var(--thermal-background); 
            border-radius: var(--thermal-radius); 
            aspect-ratio: 160 / 120; 

            display: flex !important; 
            align-items: center; 
            justify-content: center; 

            thermal-icon {
                display: block;
                width: 2em;
                height: 2em;
            }
        }

        .file-preview__preview {
            position: relative;
        }
    
        .file-preview__info { 
            display: flex; 
            flex-direction: column; 
            gap: .2em; 
            font-size: .8em;

            & > *:not(.file-preview__label) {
                opacity: .5;
            }
        }
        .file-preview__label { 
            font-size: 1.2em; 
            font-weight: 500; 
        }
        .file-preview__name {
            max-width: 10em; /* nebo jiná vhodná šířka */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
        }
        .file-remove-btn { 
            position: absolute; 
            top: -4px; 
            left: -4px; 
            cursor: pointer;
            --padding: .3em;
        }

        .missing-file-dropzone { 
            aspect-ratio: 160 / 120; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            border: 2px dotted var(--thermal-slate); 
            border-radius: var(--thermal-radius); 
            cursor: pointer; 
            transition: all .2s; 
            font-size: var(--thermal-fs-sm); 
            color: var(--thermal-slate-dark); 
            text-align: center; 

            thermal-icon {
                display: block;
                width: 1em;
                height: 1em;
            }
        }
        .missing-file-dropzone.drag-over, 
        .missing-file-dropzone:hover { 
            border-color: var(--thermal-primary); 
            background: #fff; 
        }

        .file-remove-btn thermal-btn, 
        .group-remove-btn thermal-btn { 
            pointer-events: auto; 
        }

        .group-header { 
            display: flex; 
            align-items: center; 
            gap: 1em; 
        }

        .unmatched-files { 
            margin-top: var(--thermal-gap);

            thermal-expandable {
                --font-size: .9em;
            }

            h2 {
                margin: 0;
                font-size: 1em;
            }

            p:last-child,
            li::last-child {
                margin-bottom: 0;
            }

            table {
                img {
                    width: 5em;
                    height: auto;
                }
                td {
                    padding-right: .5em;
                }
            }

        }

        .bottom-dropzone-wrapper { 
            margin-top: 2em; 
        }

        .info, .error { 
            border-radius: var(--thermal-radius); 
            padding: calc(var(--thermal-gap) * .5); 
            margin-top: var(--thermal-gap); 
            font-size: calc(var(--thermal-fs) * .9); 
        }
        .info { 
            background: var(--thermal-primary-light,#eef); 
            border:1px var(--thermal-border-style)var(--thermal-primary,#00f); 
            color: var(--thermal-primary-dark,#008); 
        }
        .error { 
            background: var(--thermal-danger-light,#fee); 
            border:1px var(--thermal-border-style)var(--thermal-danger,#f00); 
            color: var(--thermal-danger-dark,#800); 
        }
    `;

    protected async handleSubmit(): Promise<boolean> {

        if (this.pairedFiles.length === 0) {
            this.errorMessage = "Vyberte alespoň jeden .lrc soubor";
            return false;
        }

        this.errorMessage = "";

        try {
            const uploadPromises = this.pairedFiles.map(async (pair) => {
                const upload = this.client.api.routes.post.uploadFile(this.folder.path, pair.lrc);

                if (pair.visual) upload.setVisual(pair.visual);
                if (pair.preview) upload.setPreview(pair.preview);

                const result = await upload.execute();

                if (!result?.success) {
                    throw new Error(`Nepodařilo se nahrát soubor ${pair.lrc.name}: ${result?.message}`);
                }

                return pair.lrc;
            });

            const uploadedFiles = await Promise.all(uploadPromises);

            if (this.onSuccess) {
                this.onSuccess(uploadedFiles);
            }

            this.clearAllFiles();
            return true;

        } catch (error) {
            this.errorMessage = error instanceof Error ? error.message : "Nepodařilo se nahrát soubory";
            return false;
        }
    }

    private addFiles(newFiles: FileList | null) {
        if (!newFiles || newFiles.length === 0) return;
        const newArray = Array.from(newFiles);
        const hasNewLrc = newArray.some(f => f.name.toLowerCase().endsWith('.lrc'));
        const hasExistingLrc = this.allFiles.some(f => f.name.toLowerCase().endsWith('.lrc'));
        if (!hasExistingLrc && !hasNewLrc) {
            this.infoMessage = "Je třeba nahrávat primárně LRC soubory! PNG obrázky jsou jejich volitelný doplněk.";
            setTimeout(() => { this.infoMessage = ""; }, 4500);
            return;
        }
        this.infoMessage = "";
        const unique = newArray.filter(nf => !this.allFiles.some(ef => ef.name === nf.name && ef.size === nf.size));
        this.allFiles = [...this.allFiles, ...unique];
        this.pairFiles();
    }

    private handleMainFileChange(e: Event) {
        const input = e.target as HTMLInputElement;
        this.addFiles(input.files);
        input.value = '';
    }

    private handleInlineFileChange(e: Event, lrcFile: File, type: 'visual' | 'preview') {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const original = input.files[0];
            const base = lrcFile.name.replace(/\.lrc$/i, '');
            const key = base.includes('_thermal') ? base.substring(0, base.lastIndexOf('_thermal')) : base;
            const fileName = type === 'visual' ? `${key}_visual.png` : `${key}_image_thermal.png`;
            const renamed = new File([original], fileName, { type: original.type });
            // Construct a synthetic FileList-like array for addFiles
            this.addFiles({ 0: renamed, length: 1, item: (i: number) => i === 0 ? renamed : null } as unknown as FileList);
        }
        input.value = '';
    }

    private clearAllFiles() {
        this.pairedFiles.forEach(pair => {
            if (pair.lrcUrl) URL.revokeObjectURL(pair.lrcUrl);
            if (pair.visualUrl) URL.revokeObjectURL(pair.visualUrl);
            if (pair.previewUrl) URL.revokeObjectURL(pair.previewUrl);
        });
        this.unmatchedPngs.forEach(unmatched => URL.revokeObjectURL(unmatched.url));

        this.allFiles = [];
        this.pairedFiles = [];
        this.unmatchedPngs = [];
    }

    private removePairedGroup(lrcFileToRemove: File) {
        const group = this.pairedFiles.find(p => p.lrc === lrcFileToRemove);
        if (!group) return;
        const toRemove = new Set<File>([group.lrc]);
        if (group.visual) toRemove.add(group.visual);
        if (group.preview) toRemove.add(group.preview);
        this.allFiles = this.allFiles.filter(f => !toRemove.has(f));
        this.pairFiles();
    }

    private removePairedFile(file: File) {
        this.allFiles = this.allFiles.filter(f => f !== file);
        this.pairFiles();
    }

    private removeUnmatchedPng(pngFileToRemove: File) {
        this.allFiles = this.allFiles.filter(f => f !== pngFileToRemove);
        this.pairFiles();
    }

    private pairFiles() {
        this.pairedFiles.forEach(pair => {
            if (pair.lrcUrl) URL.revokeObjectURL(pair.lrcUrl);
            if (pair.visualUrl) URL.revokeObjectURL(pair.visualUrl);
            if (pair.previewUrl) URL.revokeObjectURL(pair.previewUrl);
        });
        this.unmatchedPngs.forEach(unmatched => URL.revokeObjectURL(unmatched.url));

        const lrcFiles = this.allFiles.filter(file => file.name.toLowerCase().endsWith('.lrc'));
        const pngFiles = this.allFiles.filter(file => file.name.toLowerCase().endsWith('.png'));

        const paired: PairedFiles[] = [];
        const usedPngs = new Set<File>();

        lrcFiles.forEach(lrcFile => {
            const lrcBaseName = lrcFile.name.replace(/\.lrc$/i, '');
            const key = lrcBaseName.includes('_thermal')
                ? lrcBaseName.substring(0, lrcBaseName.lastIndexOf('_thermal'))
                : lrcBaseName;

            const visualKey = `${key}_visual`;
            const previewKey = `${key}_image_thermal`;

            const visualFile = pngFiles.find(png => !usedPngs.has(png) && png.name.replace(/\.png$/i, '').startsWith(visualKey));
            const previewFile = pngFiles.find(png => !usedPngs.has(png) && png.name.replace(/\.png$/i, '').startsWith(previewKey));

            const pair: PairedFiles = { lrc: lrcFile, lrcUrl: URL.createObjectURL(lrcFile) };
            if (visualFile) {
                pair.visual = visualFile;
                pair.visualUrl = URL.createObjectURL(visualFile);
                usedPngs.add(visualFile);
            }
            if (previewFile) {
                pair.preview = previewFile;
                pair.previewUrl = URL.createObjectURL(previewFile);
                usedPngs.add(previewFile);
            }
            paired.push(pair);
        });

        this.pairedFiles = paired;
        this.unmatchedPngs = pngFiles
            .filter(png => !usedPngs.has(png))
            .map(file => ({ file, url: URL.createObjectURL(file) }));
    }

    // Localized dropzone highlight helpers
    private handleZoneDragOver(e: DragEvent) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).classList.add('drag-over');
    }
    private handleZoneDragLeave(e: DragEvent) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).classList.remove('drag-over');
    }
    private handleMainDrop(e: DragEvent) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).classList.remove('drag-over');
        this.addFiles(e.dataTransfer?.files ?? null);
    }

    private handleInlineDrop(e: DragEvent, lrcFile: File, type: 'visual' | 'preview') {
        e.preventDefault();
        e.stopPropagation();
        (e.currentTarget as HTMLElement).classList.remove('drag-over');
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            const original = files[0];
            const base = lrcFile.name.replace(/\.lrc$/i, '');
            const key = base.includes('_thermal') ? base.substring(0, base.lastIndexOf('_thermal')) : base;
            const fileName = type === 'visual' ? `${key}_visual.png` : `${key}_image_thermal.png`;
            const renamed = new File([original], fileName, { type: original.type });
            this.addFiles({ 0: renamed, length: 1, item: (i: number) => i === 0 ? renamed : null } as unknown as FileList);
        }
    }

    private openFileSelector(id: string) {
        this.shadowRoot?.getElementById(id)?.click();
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.clearAllFiles();
    }

    protected render(): unknown {
        const label = this.label ?? t(T.uploadafile);
        if (!this.client.isLoggedIn || !this.folder.may_manage_files_in) return nothing;

        return html`<thermal-dialog
            .label="${this.tooltip ? this.tooltip : this.label}"
            .beforeClose=${() => this.handleSubmit()}
            button=${t(T.upload)}
        >
            <slot name="invoker" slot="invoker">
                <thermal-btn 
                    size="md" 
                    .variant=${this.variant}
                    plain=${this.plain ? true : false}
                    icon="upload" 
                    iconStyle="micro"
                    .tooltip=${this.tooltip ?? ""}
                >${label}</thermal-btn>
            </slot>
            <div class="content" slot="content">
                ${this.renderInitialDropzone()}
                ${this.infoMessage ? html`<div class="info">${this.infoMessage}</div>` : nothing}
                ${this.renderPreview()}
                ${this.pairedFiles.length + this.unmatchedPngs.length > 0 ? this.renderBottomDropzone() : nothing}
                ${this.errorMessage ? html`<div class="error">${this.errorMessage}</div>` : nothing}
            </div>
            ${this.pairedFiles.length > 0
                ? html`<thermal-btn
                    slot="button"
                    @click=${() => this.clearAllFiles()}
                >Zrušit výběr</thermal-btn>`
                : nothing
            }
        </thermal-dialog>`;
    }

    private renderInitialDropzone() {
        if (this.allFiles.length > 0) return nothing;
        return html`<div 
            class="stage-upload"
            @click=${() => this.openFileSelector('dialog-main-input')}
            @dragenter=${(e: DragEvent) => this.handleZoneDragOver(e)}
            @dragover=${(e: DragEvent) => this.handleZoneDragOver(e)}
            @dragleave=${(e: DragEvent) => this.handleZoneDragLeave(e)}
            @drop=${(e: DragEvent) => this.handleMainDrop(e)}
        >
            <label for="dialog-main-input">
                <div>Vyberte či přetáhněte sem LRC soubory a odpovídající PNG obrázky.</div>
                <thermal-btn variant="primary" icon="upload" iconStyle="micro">Vybrat soubory</thermal-btn>
            </label>
            <input id="dialog-main-input" type="file" multiple accept=".lrc,.png" @change=${this.handleMainFileChange} />
        </div>`;
    }

    private renderPreview() {
        if (this.pairedFiles.length === 0 && this.unmatchedPngs.length === 0) return nothing;
        const lrcCount = this.pairedFiles.length;

        const pngCount = this.pairedFiles.reduce((state, current) => {
            return state + (current.visual ? 1 : 0) + (current.preview ? 1 : 0);
        }, 0);

        let titleSuffix = `${lrcCount}x LRC`;
        if (pngCount > 0) titleSuffix += ` + ${pngCount}x PNG`;
        return html`<div class="paired-files">
            <h3 class="stage-label">Soubory k uploadu <small>${titleSuffix}</small></h3>
            ${this.renderPairedTable()}
            ${this.renderUnmatchedFiles()}
        </div>`;
    }

    private renderPairedTable() {
        if (this.pairedFiles.length === 0) return nothing;
        return html`<table class="paired-files-table"><tbody>
            ${this.pairedFiles.map((p, i) => this.renderPairedRow(p, i))}
        </tbody></table>`;
    }

    private renderPairedRow(pair: PairedFiles, index: number) {
        return html`<tr class="paired-file-group paired-file-group__header">
            <td colspan="4">
                <div class="group-header">
                    <span>${index + 1}. snímek</span>
                    <thermal-btn variant="default" plain="true" icon="close" iconStyle="micro" tooltip="Odstranit celou skupinu" @click=${() => this.removePairedGroup(pair.lrc)}></thermal-btn>
                </div>
            </td>
        </tr>
        <tr class="paired-file-group">
            <td></td>
            <td>${this.renderFilePreview('LRC termogram', pair.lrc)}</td>
            <td>${this.renderFilePreview('Snímek ve viditelném spektru', pair.visual, pair.lrc, 'visual', pair.visualUrl)}</td>
            <td>${this.renderFilePreview('Printscreen displeje termokamery', pair.preview, pair.lrc, 'preview', pair.previewUrl)}</td>
        </tr>`;
    }

    private renderFilePreview(label: string, file?: File, lrcContext?: File, type?: 'visual' | 'preview', url?: string) {
        if (!file) {
            const inputId = `dialog-inline-${lrcContext!.name}-${type}`;
            return html`<div class="file-preview file-preview__has-file">
                <div class="file-preview__preview">
                    <div class="missing-file-dropzone"
                        @click=${() => this.openFileSelector(inputId)}
                        @dragenter=${(e: DragEvent) => this.handleZoneDragOver(e)}
                        @dragover=${(e: DragEvent) => e.preventDefault()}
                        @dragleave=${(e: DragEvent) => this.handleZoneDragLeave(e)}
                        @drop=${(e: DragEvent) => this.handleInlineDrop(e, lrcContext!, type!)}>
                        <thermal-icon icon="upload" variant="micro"></thermal-icon>
                        <input id=${inputId} type="file" accept=".png" @change=${(e: Event) => this.handleInlineFileChange(e, lrcContext!, type!)} />
                    </div>
                </div>
                <div class="file-preview__info">
                    <div class="file-preview__label">${label}</div>
                    <div class="file-preview__name">Volitelně nahrajte ${type} obrázek.</div>
                </div>
            </div>`;
        }
        const kb = (file.size / 1024).toFixed(2);
        const isImg = file.name.toLowerCase().endsWith('.png');
        const preview = isImg && url
            ? html`<img src=${url} alt="File preview" />`
            : (isImg ? html`<div class="file-preview__icon"><thermal-icon icon="image" variant="outline"></thermal-icon></div>`
                : html`<div class="file-preview__icon"><thermal-icon icon="document" variant="outline"></thermal-icon></div>`);
        const removable = (type === 'visual' || type === 'preview') || label.toLowerCase().includes('lrc');
        const removeBtn = removable ? html`<thermal-btn class="file-remove-btn" variant="primary" plain="true" size="sm" icon="close" iconStyle="micro" tooltip="${t(T.remove)}" @click=${() => this.removePairedFile(file)}></thermal-btn>` : nothing;
        return html`<div class="file-preview file-preview__has-file">
            <div class="file-preview__preview">${preview}${removeBtn}</div>
            <div class="file-preview__info">
                <div class="file-preview__label">${label}</div>
                <div class="file-preview__name">${file.name}</div>
                <div class="file-preview__size">${kb} kB</div>
            </div>
        </div>`;
    }

    private renderUnmatchedFiles() {
        if (this.unmatchedPngs.length === 0) return nothing;
        const titleStart = this.pairedFiles.length === 0 ? 'Nerozpoznané obrázky' : 'Další nespárované obrázky';
        const title = `${titleStart} (${this.unmatchedPngs.length}) nebudou nahrány`;
        return html`<div class="unmatched-files">

            <thermal-expandable
                label="${title}"
                variantExpanded="foreground"
                closeIcon="true"
                icon="info"
                iconStyle="outline"
                tooltip="Obrázky PNG, které se nám dle jejich jména nepodařilo spárovat s žádným LRC souborem"
            >

                <table><tbody>
                    ${this.unmatchedPngs.map(u => html`<tr class="file-item">
                        <td>
                            <thermal-btn 
                                variant="background"
                                plain="true" 
                                icon="close" 
                                iconStyle="micro" 
                                tooltip="${t(T.remove)}" 
                                @click=${() => this.removeUnmatchedPng(u.file)}></thermal-btn>
                        </td>
                        <td>
                            <img src=${u.url} alt="Unmatched file preview" />
                        </td>
                        <td>${u.file.name}</td>
                    </tr>`)}
                </tbody></table>

                <thermal-tip
                    variant="info"
                    style="--font-size: 1em; margin-top: 1em;"
                >
                    <h2>Jak párujeme soubory</h2>
                    <p>Termokamery TIMI Edu od roku 2024 ukládají soubory v tomto formátu:</p>
                    <ul>
                        <li><strong>[datum]_thermal.lrc</strong> - klíčový termogram, který potřebujeme</li>
                        <li><strong>[datum]_visual.png</strong> - snímek ve viditelném spektru (volitelný)</li>
                        <li><strong>[datum]_image_thermal.png</strong> - printscreen displeje termokamery (volitelný, v online aplikaci nemá žádné užití)</li>
                    </ul>
                    <p>Co jsme schopni spárovat:</p>
                    <ul>
                        <li><strong>[datum]</strong>_cokolivdalsiho<strong>_thermal</strong>_neco<strong>.lrc</strong></li>
                        <li><strong>[datum]</strong>_neco_jineho<strong>_visible.png</strong></li>
                        <li><strong>[datum]</strong>_zase_neco_jineho_<strong>_image_thermal</strong> (1)<strong>.png</strong></li>
                    </ul>
                    <p>Pokud jsou Vaše soubory pojmenovány jinak, můžete k LRC snímkům přiřadit PNG soubory ručně v tabulce výše.</p>
                </thermal-tip>
            
            </thermal-expandable>

            
        </div>`;
    }

    private renderBottomDropzone() {
        return html`<div class="bottom-dropzone-wrapper">
            <div class="stage-upload"
                @click=${() => this.openFileSelector('dialog-bottom-input')}
                @dragenter=${(e: DragEvent) => this.handleZoneDragOver(e)}
                @dragover=${(e: DragEvent) => this.handleZoneDragOver(e)}
                @dragleave=${(e: DragEvent) => this.handleZoneDragLeave(e)}
                @drop=${(e: DragEvent) => this.handleMainDrop(e)}
            >
                <label for="dialog-bottom-input">
                    <div>Přidat další soubory LRC či PNG</div>
                    <thermal-btn variant="primary" icon="upload" iconStyle="micro">Vybrat soubory</thermal-btn>
                </label>
                <input id="dialog-bottom-input" type="file" multiple accept=".lrc,.png" @change=${this.handleMainFileChange} />
            </div>
        </div>`;
    }

    // (Legacy helpers removed in favor of unified preview functions.)

    protected shouldRenderDialog(): boolean {

        if (
            !this.client.isLoggedIn
            || !this.client.identity
            || !this.folder
            || !this.folder.may_manage_files_in
        ) {
            return false;
        }

        return true;

    }
}

declare global {
    interface HTMLElementTagNameMap {
        "connected-upload-dialog": ConnectedUploadDialog;
    }
}
