import { t } from "i18next";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import { T } from "../translations/Languages";

export class ThermalDialogElement extends LitElement {

    static shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: "open"
    }

    @property( { type: String, reflect: false } )
    public button: string = t(T.close);

    protected dialogRef: Ref<HTMLDialogElement> = createRef();
    protected closeButtonRef: Ref<HTMLButtonElement> = createRef();
    protected invokerRef: Ref<HTMLSlotElement> = createRef();

    @property({
        type: Boolean, 
        reflect: true, 
        attribute: "is-fullscreen"
    })
    public isFullscreen: boolean = false;

    @property( {type: String, reflect: true} )
    public label?: string;

    @property( { 
        type: Object
    } )
    public beforeClose?: () => Promise<boolean>;

    @state()
    private _open: boolean = false;

    public get open(): boolean {
        return this._open;
    }

    @property({
        type: Object
    })
    public onCloseEveryTime?: () => void;

    setClose() {
        this.dialogRef.value?.close();
        window.document.body.style.removeProperty("overflow-y");
        window.document.body.style.removeProperty( "height" );
        this.removeAttribute("open");
        this._open = false;

        if ( this.onCloseEveryTime ) {
            this.onCloseEveryTime();
        }
    }

    setOpen() {
        this.dialogRef.value?.showModal();
        window.document.body.style.overflowY = "hidden";
        window.document.body.style.height = "100vh";
        this.setAttribute("open", "true");
        this._open = true;
    }

    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {

        super.attributeChangedCallback( name, _old, value );

        if ( name === "open") {

            const val = value === "true";

            if ( val ) {
                this.setOpen();
            } else {
                this.setClose();
            }

        } 

    }

    connectedCallback(): void {
        super.connectedCallback();
    }
    
    static styles = css`

        :host {

            display: contents;

        }

        .dialog {
            background: var( --thermal-slate-light );
            color: var( --thermal-foreground );
            border-style: var( --thermal-border-style );
            border-radius: var( --thermal-radius );
            border-color: var( --thermal-slate );
            border-width: var(--thermal-border-width);
            padding: calc( var( --thermal-gap ) * 1.5 );
            font-size: var( --thermal-fs-small );

            &::backdrop {
                backdrop-filter: blur(3px);
            }

            min-width: 150px;
            box-sizing: border-box;

            @media ( min-width: 300px ) {
                min-width: 250px;
            }

            @media ( min-width: 600px ) {
                min-width: 450px;
            }
        }

        .dialog-header {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between; 
        }

        .dialog-title {
            margin: 0;
            padding: 0;
        }

        .dialog-content {
            padding: var( --thermal-gap ) 0;
            white-space: normal;
        }

        .dialog-footer {

            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;

        }

        

        .dialog-close {

            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: var( --thermal-foreground );
            cursor: pointer;

            width: calc( var( --thermal-gap ) * 1.5);

            &:hover {
                color: var( --thermal-primary );
            }
        
        }

        :host([is-fullscreen="true"][open]) .dialog {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            display: grid;
            grid-template-rows: auto 1fr auto;

            .dialog-content {
                overflow: auto;
            }
        }

        
    
    `;

    render() {
        return html`
            <slot name="invoker" ${ref( this.invokerRef )} @click=${this.setOpen}></slot>
            <dialog ${ref( this.dialogRef )} class="dialog">

                <header class="dialog-header">

                    <h2 class="dialog-title">${this.label}</h2>

                    <button class="dialog-close" ${ref( this.closeButtonRef )} @click=${this.setClose}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                    </button>
                
                
                </header>
                	
                <div class="dialog-content">
                    ${this._open ? html`<slot name="content"></slot>` : nothing}
                </div>

                <div class="dialog-footer">
                    <slot name="button"></slot>
                    <thermal-btn variant="foreground" @click=${async() => {
                        if ( this.beforeClose ) {
                            const result = await this.beforeClose();
                            if ( result ) {
                                this.setClose();
                            }
                        } else {
                            this.setClose();
                        }
                    }}>
                        ${this.button}
                    </thermal-btn>
                </div>
                
            
            </dialog>
        `
    }

    public async closeFromTheOutside() {

        if ( this.beforeClose ) {
            const result = await this.beforeClose();
            if ( result ) {
                this.setClose();
            }
        } else {
            this.setClose();
        }

    }

}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-dialog": ThermalDialogElement;
    }
}
