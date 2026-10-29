
import type { ThermalBtnElement } from "@labirthermal/webcomponents";
import { booleanConverter } from "@labirthermal/webcomponents";
import type { CSSResultGroup } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { FolderInfo } from "../../../client/responseEntities";
import { T } from "../../../translations/Languages";
import { AbstractControlledConsumer } from "../../../abstraction/AbstractControlledConsumer";

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

export class ConnectedUploadForm extends AbstractControlledConsumer {

    @property({ type: Object })
    public folder!: FolderInfo;

    @property({ type: String })
    public label: string = this.t(T.upload);

    @property({ type: String })
    public prompt?: string;

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

        .stage {

            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            padding: var(--thermal-gap);
            box-sizing: border-box;
            position: relative;
        
        }

        .drop-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 100, 255, 0.1);
            border: 2px dashed var(--thermal-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            font-size: var(--thermal-fs-lg);
            color: var(--thermal-primary);
            z-index: 10;
        }

        .stage-label {
            font-weight: bold;
            margin: 0;
            padding: 0;
            padding-bottom: .5em;
            font-size: 1.3em;
            line-height: 1.2em;

            small {
                font-size: 1em;
                display: inline-block;
                opacity: .5;
                font-weight: normal;
            }
        }

        .stage-close {
            float: right;
        }

        .stage-preview {

            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 3em;
        
        }

        .stage-preview__actions {

            display: flex;
            flex-direction: column;
            gap: 1em;
            align-items: stretch;
            justify-content: stretch;
        
        }

        .stage-upload {
        
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            text-align: center;
            border: 2px dotted var(--thermal-slate);
            border-radius: var( --thermal-radius );
            
            cursor: pointer;

            transition: all .2s;

            label {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1em;
            }

            thermal-button {
                pointer-events: none;
            }
        
        }
        .stage-upload:hover {
            border-color: var(--thermal-primary);
            background: var(--thermal-background);
        }

        .stage-upload--inline {
            margin-top: var(--thermal-gap);
            min-height: 120px;
        }

        /* Highlight only the specific dropzone under drag */
        .stage-upload.drag-over,
        .missing-file-dropzone.drag-over {
            border-color: var(--thermal-primary);
            background: rgba(0, 100, 255, 0.1);
        }

        label {
            display: block;
            width: 100%;
            cursor: pointer;
        }

        input[type="file"] {
            display: none;
        }

        .file-item {
            font-size: calc(var(--thermal-fs) * 0.9);
            margin-bottom: calc(var(--thermal-gap) * 0.25);
            display: flex;
            align-items: center;
            gap: 1em;
        }

        .file-item img {
            max-width: 60px;
            max-height: 60px;
            border-radius: var(--thermal-radius);
            object-fit: cover;
        }

        .paired-file-group {
            background: var(--thermal-slate-light);
            border-radius: var(--thermal-radius);
            padding: var(--thermal-gap-half);
            margin-top: var(--thermal-gap-half);
        }

        .paired-file-group strong {
            display: block;
            margin-bottom: var(--thermal-gap-quarter);
        }

        .group-remove-btn {

            user-select: none;
        }
        .group-remove-btn:hover { background: var(--thermal-danger); }

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

        }

        .info {
            background: var(--thermal-primary-light, #eef);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-primary, #00f);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-primary-dark, #008);
            font-size: calc(var(--thermal-fs) * 0.9);
        }

        .error {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
            font-size: calc(var(--thermal-fs) * 0.9);
        }

        .paired-files-table {

            width: 100%;
            border-collapse: collapse;

            td:not(:first-child), 
            th:not(:first-child) {
                width: calc(100% / 3);
            }

            img, file-canvas {
                display: block;
                max-width: 100%;
                height: auto;
            }

            .paired-file-group {
            
                td {
                    padding: .5em;
                    vertical-align: top;
                }

                .centered {
                    display: flex;
                    align-items: center;
                    gap: 1em;
                }


                &.paired-file-group__header {

                    td {
                        vertical-align: middle;
                        border-radius: var(--thermal-radius);
                        background: var( --thermal-background );
                    }

                    thermal-icon {
                        display: inline-block;
                        width: 1.5em;
                        height: 1.5em;
                    }

                    .file-name {
                        font-weight: bold;
                        margin-left: var( --thermal-gap-half );
                    }

                }
            
            }

            .spacer-row {
                td {
                    height: 1em;
                }
            }

        }


.file-preview {

    display: grid;
    grid-template-columns: 5em 1fr;
    gap: .5em;
    position: relative;

    .missing-file-dropzone,
    .file-preview__icon,
    img {
        
        max-width: 5em;
        height: auto;
    }

    .missing-file-dropzone {
        aspect-ratio: 160 / 120;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        display: block;
    }

}

.file-preview__icon {

    color: var( --thermal-background );
    background: var( --thermal-slate-dark );
    border-radius: var( --thermal-radius );

    box-sizing: border-box;

    aspect-ratio: 160 / 120;

    display: flex;
    align-items: center;
    justify-content: center;

    thermal-icon {
        width: 1.5em;
        height: 1.5em;
        display: block;
    }
    
}

.file-preview__empty {
    .file-preview__icon {
        background: transparent;
        color: var( --thermal-slate );
        border: var(--thermal-border-width) dashed var( --thermal-slate );
    }
}


.file-preview__info {
    display: flex;
    flex-direction: column;
    gap: .2em;
}

.file-preview__info > div {
    font-size: .7em;
    color: var( --thermal-slate-dark );
}

.file-preview__label {
    font-size: var( --thermal-fs ) !important;
    color: var( --thermal-foreground );
}

.missing-file-dropzone {
    font-size: var(--thermal-fs-sm);
    color: var(--thermal-slate-dark);
    text-align: center;

    border-radius: var(--thermal-radius);
    border: 2px dotted var(--thermal-slate);

    cursor: pointer;
    
    transition: all .2s;

    thermal-icon {
        display: block;
        width: 1.5em;
        height: 1.5em;
        user-select: none;
        pointer-events: none;
    }
}
.missing-file-dropzone:hover {
    border-color: var(--thermal-primary);
    background: #fff;
}

.remove-btn {
    margin-left: auto;
    cursor: pointer;
}

.file-remove-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    user-select: none;
    transition: background .15s ease;
}


    `;

    public highlight(
        timeinms: number
    ): void {

        const element = this.renderRoot.querySelector( ".stage-upload thermal-btn" ) as ThermalBtnElement | null | undefined;
        console.info("Highlighting upload form button", { element, timeinms });
        if ( element ) {
            element.highlight( timeinms );
        }

    }

    protected async handleSubmit(): Promise<boolean> {

        if (this.pairedFiles.length === 0) {
            this.errorMessage = "Vyberte alespoň jeden .lrc soubor";
            return false;
        }

        // Clear previous error
        this.errorMessage = "";

        try {
            const uploadPromises = this.pairedFiles.map(async (pair) => {
                const upload = this.client.api.routes.post.uploadFile(this.folder.path, pair.lrc);

                if (pair.visual) {
                    upload.setVisual(pair.visual);
                }
                if (pair.preview) {
                    upload.setPreview(pair.preview);
                }

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

        const newFilesArray = Array.from(newFiles);

        const hasNewLrc = newFilesArray.some(file => file.name.toLowerCase().endsWith('.lrc'));
        const hasExistingLrc = this.allFiles.some(file => file.name.toLowerCase().endsWith('.lrc'));

        if (!hasExistingLrc && !hasNewLrc) {
            this.infoMessage = "Je třeba nahrávat primárně LRC soubory! PNG obrázky jsou jejich volitelný doplněk.";
            setTimeout(() => { this.infoMessage = ""; }, 5000);
            return;
        }

        this.infoMessage = ""; // Clear message if adding valid files

        const uniqueNewFiles = newFilesArray.filter(newFile => 
            !this.allFiles.some(existingFile => 
                existingFile.name === newFile.name && existingFile.size === newFile.size
            )
        );

        this.allFiles = [...this.allFiles, ...uniqueNewFiles];
        this.pairFiles();
    }

    private handleMainFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        this.addFiles(target.files);
        target.value = ''; // Reset input to allow selecting the same file again
    }

    private handleInlineFileChange(event: Event, lrcFile: File, type: 'visual' | 'preview') {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const originalFile = target.files[0];
            const lrcBaseName = lrcFile.name.replace(/\.lrc$/i, '');
            const key = lrcBaseName.includes('_thermal')
                ? lrcBaseName.substring(0, lrcBaseName.lastIndexOf('_thermal'))
                : lrcBaseName;
            
            const newFileName = type === 'visual'
                ? `${key}_visual.png`
                : `${key}_image_thermal.png`;

            const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });

            this.addFiles([renamedFile] as unknown as FileList);
        }
        target.value = '';
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
        const groupToRemove = this.pairedFiles.find(p => p.lrc === lrcFileToRemove);
        if (!groupToRemove) return;

        const filesToRemove = [groupToRemove.lrc, groupToRemove.visual, groupToRemove.preview].filter(Boolean) as File[];
        this.allFiles = this.allFiles.filter(f => !filesToRemove.includes(f));
        this.pairFiles();
    }

    private removePairedFile(fileToRemove: File) {
        this.allFiles = this.allFiles.filter(f => f !== fileToRemove);
        this.pairFiles();
    }

    private removeUnmatchedPng(pngFileToRemove: File) {
        this.allFiles = this.allFiles.filter(f => f !== pngFileToRemove);
        this.pairFiles();
    }

    private pairFiles() {
        // First, revoke all existing object URLs to prevent memory leaks
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

    // --- Drag and Drop Handlers ---

    private handleDragOver(e: DragEvent) {
        e.preventDefault();
        this.isDragging = true;
    }

    private handleDragLeave(e: DragEvent) {
        e.preventDefault();
        this.isDragging = false;
    }

    private handleDrop(e: DragEvent) {
        e.preventDefault();
        this.isDragging = false;
        this.addFiles(e.dataTransfer?.files ?? null);
    }

    // Dropzone-local highlighting helpers
    private handleZoneDragOver(e: DragEvent) {
        e.preventDefault();
        const el = e.currentTarget as HTMLElement;
        el.classList.add('drag-over');
    }

    private handleZoneDragLeave(e: DragEvent) {
        e.preventDefault();
        const el = e.currentTarget as HTMLElement;
        el.classList.remove('drag-over');
    }

    private handleMainDrop(e: DragEvent) {
        e.preventDefault();
        const el = e.currentTarget as HTMLElement;
        el.classList.remove('drag-over');
        this.addFiles(e.dataTransfer?.files ?? null);
    }

    private handleInlineDrop(e: DragEvent, lrcFile: File, type: 'visual' | 'preview') {
        e.preventDefault();
        e.stopPropagation(); // Prevent the main drop handler from firing
        (e.currentTarget as HTMLElement).classList.remove('drag-over');
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            const originalFile = files[0];
             const lrcBaseName = lrcFile.name.replace(/\.lrc$/i, '');
            const key = lrcBaseName.includes('_thermal')
                ? lrcBaseName.substring(0, lrcBaseName.lastIndexOf('_thermal'))
                : lrcBaseName;
            
            const newFileName = type === 'visual'
                ? `${key}_visual.png`
                : `${key}_image_thermal.png`;

            const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });
            const fileList = new FileList();
            fileList[0] = renamedFile;
            this.addFiles(fileList);
        }
    }

    private openFileSelector(id: string) {
        this.shadowRoot?.getElementById(id)?.click();
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.client.subscribeToIdentityChanges(this);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        // Clean up object URLs when the component is removed from the DOM
        this.clearAllFiles();
    }


    private get hasFiles(): boolean {
        return this.allFiles.length > 0;
    }

    private get maySubmit(): boolean {
        return this.pairedFiles.length > 0;
    }




    private renderDropinArea(): unknown {

        if (this.hasFiles) {
            return nothing;
        }

        return html`<div 
            class="stage-upload"
            @click=${() => this.openFileSelector('main-file-input')}
            @dragover=${(e: DragEvent) => this.handleZoneDragOver(e)}
            @dragleave=${(e: DragEvent) => this.handleZoneDragLeave(e)}
            @drop=${(e: DragEvent) => this.handleMainDrop(e)}
        >
            <label for="main-file-input">
                <div>Vyberte či přetáhněte sem LRC soubory a případně odpovídající PNG obrázky.</div>
                <thermal-btn
                    variant="primary"
                    icon="upload"
                    iconStyle="micro"
                >
                    Vybrat soubory
                </thermal-btn>
            </label>
            <input 
                type="file" 
                id="main-file-input"
                @change=${this.handleMainFileChange}
                multiple
                accept=".lrc,.png"
            />
        </div>`;

    }



    private renderFilePreview(
        label: string,
        file?: File,
        lrcFileForContext?: File,
        type?: 'visual' | 'preview'
    ): unknown {

        if (!file) {
            const inputId = `inline-input-${lrcFileForContext!.name}-${type}`;
            return html`
            <div class="file-preview file-preview__has-file">
                <div class="file-preview__preview">
                    <div 
                        class="missing-file-dropzone"
                        @click=${() => this.openFileSelector(inputId)}
                        @dragenter=${(e: DragEvent) => this.handleZoneDragOver(e)}
                        @dragover=${(e: DragEvent) => e.preventDefault()}
                        @dragleave=${(e: DragEvent) => this.handleZoneDragLeave(e)}
                        @drop=${(e: DragEvent) => this.handleInlineDrop(e, lrcFileForContext!, type!)}
                    >

                        <thermal-icon icon="upload" variant="micro"></thermal-icon>

                        <input 
                            type="file" 
                            id=${inputId}
                            @change=${(e: Event) => this.handleInlineFileChange(e, lrcFileForContext!, type!)}
                            accept=".png"
                        />
                    </div>
                </div>
                <div class="file-preview__info">
                    <div class="file-preview__label">${label}</div>
                    <div class="file-preview__name">Můžete nahrát ${type} obrázek.</div>
                </div>
            </div>
            `;
        }

        const kbsize = (file.size / 1024).toFixed(3);

        const preview = file.name.toLowerCase().endsWith('.png')
            ? html`<img src=${URL.createObjectURL(file)} alt="File preview" />`
            : html`<div class="file-preview__icon"><thermal-icon icon="document" variant="outline"></thermal-icon></div>`;

        const removeButton = (type === 'visual' || type === 'preview') || label.toLowerCase().includes('lrc')
            ? html`<thermal-btn 
                class="file-remove-btn" 
                tooltip="Odstranit" 
                icon="close"
                iconStyle="micro"
                plain="true"
                .variant="breadcrumb"
                @click=${() => this.removePairedFile(file)}></thermal-btn>`
            : nothing;

        return html`<div class="file-preview file-preview__has-file">
    ${removeButton}
    <div class="file-preview__preview">${preview}</div>
    <div class="file-preview__info">
        <div class="file-preview__label">${label}</div>
        <div class="file-preview__name">${file.name}</div>
        <div class="file-preview__size">${kbsize} kB</div>
    </div>
</div>`;

    }



    private renderPairedFileRow(pair: PairedFiles, index: number): unknown {
        return html`
<tr class="paired-file-group paired-file-group__header">
    <td colspan="4">
        <div style="display:flex;align-items:center;gap:1em;">
            <span>${index + 1}. snímek</span>
            <thermal-btn 
            class="group-remove-btn" 
            tooltip="Odstranit celou skupinu" 
            icon="close"
            iconStyle="micro"
            ?plain=${true}
            @click=${() => this.removePairedGroup(pair.lrc)}></thermal-btn>
        </div>
    </td>
</tr>
<tr class="paired-file-group">
    <td></td>
    <td>${this.renderFilePreview("LRC termogram", pair.lrc)}</td>
    <td>${this.renderFilePreview("Snímek ve viditelném spektru", pair.visual, pair.lrc, 'visual')}</td>
    <td>${this.renderFilePreview("Printscreen displeje termokamery", pair.preview, pair.lrc, 'preview')}</td>
</tr>`;
    }


    private renderPairedFiles(): unknown {

        if (this.pairedFiles.length === 0) {
            return nothing;
        }

        const lrcCount = this.pairedFiles.length;

        const pngCount = this.pairedFiles.reduce( (state, current) => {
            return state + (current.visual ? 1 : 0) + (current.preview ? 1 : 0);
        }, 0 );

        let titleSuffix = `${lrcCount}x LRC`;
        if (pngCount > 0) titleSuffix +=` + ${pngCount}x PNG`;

        return html`
<div class="paired-files">

<h3 class="stage-label">Soubory k uploadu <small>${titleSuffix}</h3>

<table class="paired-files-table">
<tbody>
${this.pairedFiles.map((pair, index) => this.renderPairedFileRow(pair, index))}
</tbody>
</table>

</div>`;
    }

    private renderUnmatchedFiles(): unknown {

        if (this.unmatchedPngs.length === 0) {
            return nothing;
        }

        const titleStart = this.pairedFiles.length === 0
            ? "Nespárované obrázky"
            : "Další nespárované obrázky";

        const title = `${titleStart} (${this.unmatchedPngs.length}) nebudou nahrány`;

        return html`<div class="unmatched-files">

    <thermal-expandable
        label="${title}"
        icon="info"
        iconStyle="outline"
        variantExpanded="foreground"
        closeIcon="true"
    >

        <div class="unmatched-files__list">

            <table>
                <tbody>
                ${this.unmatchedPngs.map(item => html`
            <tr class="file-item">
                <td>
                    <thermal-btn tooltip="${this.t(T.remove)}" ?plain=${true} variant="background" icon="close" iconStyle="micro" @click=${() => this.removeUnmatchedPng(item.file)}></thermal-btn>
                </td>
                <td style="position:relative;">
                    <img src=${item.url} alt="Unmatched file preview" />
                </td>
                <td>${item.file.name}</td>
            </tr>`)}
                </tbody>
            </table>

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

        </div>
    </thermal-expandable>

</div>`;
    }

    private renderErrorMessage(): unknown {
        if (!this.errorMessage) {
            return nothing;
        }
        return html`<div class="error">${this.errorMessage}</div>`
    }

    private renderSubmitButton(): unknown {
        if (!this.hasFiles) {
            return nothing
        }

        return html`
            <div style="display:flex;flex-direction:column;gap:1em;">
                <thermal-btn
                    @click=${() => this.handleSubmit()}
                    ?disabled=${!this.maySubmit}
                    variant=${this.maySubmit ? "primary" : "foreground"}
                    icon="upload"
                    iconStyle="micro"
                    size="lg"
                >${this.label}</thermal-btn>
                <thermal-btn
                    @click=${() => { this.clearAllFiles(); }}
                    variant="foreground"
                    icon="close"
                    iconStyle="micro"
                    size="lg"
                >Vybrat jiné soubory</thermal-btn>
            </div>
        `;
    }


    protected renderPreviewAndSubmit(): unknown {

        if (!this.hasFiles) {
            return nothing;
        }

        return html`<div class="stage stage-preview">
    <div class="stage-preview__files">
        ${this.renderPairedFiles()}
        ${this.renderUnmatchedFiles()}
    </div>
    <div class="stage-preview__actions">
        ${this.renderErrorMessage()}
        ${this.renderSubmitButton()}
    </div>
</div>`;

    }

    private renderBottomDropzone(): unknown {
        return html`
            <div 
                class="stage-upload stage-upload--bottom"
                style="margin-top:2em;"
                @click=${() => this.openFileSelector('bottom-file-input')}
                @dragenter=${(e: DragEvent) => this.handleZoneDragOver(e)}
                @dragover=${(e: DragEvent) => this.handleZoneDragOver(e)}
                @dragleave=${(e: DragEvent) => this.handleZoneDragLeave(e)}
                @drop=${(e: DragEvent) => this.handleMainDrop(e)}
            >
                <label for="bottom-file-input">
                    <div>Přidat další soubory LRC či PNG</div>
                    <thermal-btn
                        variant="primary"
                        icon="upload"
                        iconStyle="micro"
                    >Vybrat soubory</thermal-btn>
                </label>
                <input 
                    type="file" 
                    id="bottom-file-input"
                    @change=${this.handleMainFileChange}
                    multiple
                    accept=".lrc,.png"
                />
            </div>
        `;
    }


    protected render(): unknown {

        if (!this.client.isLoggedIn || !this.folder.may_manage_files_in) {
            return nothing
        }


        return html`
            <div>
                ${this.renderDropinArea()}

                ${this.infoMessage ? html`<div class="info">${this.infoMessage}</div>` : ''}

                ${this.renderPreviewAndSubmit()}
                ${this.hasFiles ? this.renderBottomDropzone() : nothing}
            </div>
        `;

    }
}

declare global {
    interface HTMLElementTagNameMap {
        "connected-upload-form": ConnectedUploadForm;
    }
}
