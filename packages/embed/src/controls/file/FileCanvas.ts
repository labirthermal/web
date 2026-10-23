import type { ThermalFileInstance } from "@labirthermal/core";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from 'lit/directives/class-map.js';
import type { Ref } from 'lit/directives/ref.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { AbstractFileConsumer } from "../../hierarchy/consumers/AbstractFileConsumer";
import { T } from "../../translations/Languages";

/**
 * The component rendering the file canvas through `@labirthermal/core` functionality.
 * 
 * Extends `AbstractFileConsumer`, therefore needs to be in a webcomponent providing the necessary contexts.
 * 
 * @package @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@ntc.zcu.cz>
 */
export class FileCanvasElement extends AbstractFileConsumer {

    /** Dedicated core-owned mount target; must not contain any Lit-managed child parts. */
    public container: Ref<HTMLDivElement> = createRef();

    /** Actual DOM-mounted instance, retained for cleanup even before a pending file update completes. Not reactive. */
    private mountedInstance?: ThermalFileInstance;

    /** Indicates whether the component prefers to use GPU for rendering... */
    @property({ type: Boolean, attribute: "prefers-gpu" })
    public prefersGpu: boolean = true;

    public onInstanceCreated(): void {
        this.requestUpdate();
    }

    public onFailure(): void { }


    connectedCallback(): void {
        super.connectedCallback();
        this.requestUpdate();
    }



    updated(_changedProperties: PropertyValues<FileCanvasElement>): void {

        super.updated(_changedProperties);
        
        // Do nothing when the component is not connected or the container is not yet available.
        if (!this.isConnected || !this.container.value) return;

        // Synchronize the mount after rendering, including reconnection without a file property change.
        if (this.mountedInstance !== this.file) {
            this.unmountInstance();
            if (this.file) {
                this.file.setPreferWebGl(this.prefersGpu);
                this.file.mountToDom(this.container.value);
                this.mountedInstance = this.file;
                this.file.draw();
            }
        } 
        // Apply GPU changes after rendering without drawing twice when a new file is mounted.
        else if (_changedProperties.has("prefersGpu") && this.mountedInstance) {
            this.mountedInstance.setPreferWebGl(this.prefersGpu);
            this.mountedInstance.draw();
        }
    }


    /** Releases the actual mount rather than a possibly newer file context value. */
    private unmountInstance(): void {
        this.mountedInstance?.unmountFromDom();
        this.mountedInstance = undefined;
    }

    public disconnectedCallback(): void {
        this.unmountInstance();
        super.disconnectedCallback();
    }

    public static readonly styles = css`

        :host {
            display: block;
            width: 100%;
            font-size: var( --thermal-fs );
        }

        :host,
        .canvas-container {
            box-sizing: border-box;
        }

        .canvas-container {

            width: 100%;

            background-color: var( --thermal-slate );
            color: var( --thermal-background );

            transition: color .3s ease-in-out, background-color .3s ease-in-out;

            &.is-loading {

                aspect-ratio: 4 / 3;
                display: flex;
                align-items: center;
                justify-content: center;

            }

            &.is-loaded {
        
            }

            &.is-success {

            }

            &.is-error {

                display: flex;
                align-items: center;
                justify-content: center;
                padding: var( --thermal-gap );
                box-sizing: border-box;
            }

        }

        

        .error-wrapper {

            display: flex;
            gap: calc( var( --thermal-gap ) * 0.5 );
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            box-sizing: border-box;
            width: 100%;
            height: 100%;

            border: 2px dashed currentcolor;
            border-radius: var( --thermal-radius );

            padding: var( --thermal-gap );

            thermal-icon {
                width: 2em;
                height: 2em;
            }

            .error-message {
                font-size: small;
                opacity: .5;
            }

        }
    `;

    private renderPlaceholder() {

        if (this.fileIsLoading === false) {
            return nothing;
        }

        return html`<div class="file-canvas-loading">
    <thermal-spinner color="var(--thermal-background)"></thermal-spinner>
</div>`;

    }

    private renderError() {

        if (this.failure === undefined) {
            return nothing;
        }

        return html`<div class="error-wrapper">
    <thermal-icon 
        icon="warning"
        variant="outline"
    ></thermal-icon>

    <div class="error-title">
        ${t(T.fileloadingerror)}
    </div>
    <div class="error-url">
        ${this.failure?.thermalUrl}
    </div>
    <div class="error-message">
        ${this.failure?.message}
    </div>
</div>`;

    }

    protected render(): unknown {

        const isError = this.fileIsLoading === false && this.failure !== undefined;

        const isSuccess = this.fileIsLoading === false && this.file !== undefined;

        const classes = {
            "canvas-container": true,
            "is-loading": this.fileIsLoading,
            "is-loaded": this.fileIsLoading === false,
            "is-success": isSuccess,
            "is-error": isError
        } as const;

        return html`<div class=${classMap(classes)} part="file-canvas-container">
    <div ${ref(this.container)}></div>
    ${this.renderPlaceholder()}
    ${this.renderError()}
</div>`;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-canvas": FileCanvasElement;
    }
}
