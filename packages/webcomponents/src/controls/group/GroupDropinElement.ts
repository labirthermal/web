import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { Ref } from 'lit/directives/ref.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { T } from "../../translations/Languages";
import { AbstractGroupDropin } from "./AbstractGroupDropin";

export class GroupDropinElement extends AbstractGroupDropin {

    @state()
    protected container: Ref<HTMLVideoElement> = createRef();

    @state()
    protected hover: boolean = false;

    @state()
    protected uploading: boolean = false;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        if (this.container.value !== undefined) {

            const listener = this.managerObject.service.handleDropzone(this.container.value, true);

            listener.onMouseEnter.add(this.UUID, () => {
                console.log("mouseenter");
                this.hover = true;
            });

            listener.onMouseLeave.add(this.UUID, () => {
                console.log("mouseleave");
                this.hover = false;
            });

            listener.onDrop.set(this.UUID, () => {
                this.uploading = true;
            });


            listener.onProcessingEnd.add(this.UUID, async (results) => {

                if ( this.onDrop !== undefined ) {
                    await this.onDrop(results);
                }

                this.uploading = false;

                return;

            });

        }

    }


    public static styles = css`

        .container {
            color: var(--thermal-foreground);
        }

        .dropin {
            width: 100%;
            aspect-ratio: 4 / 3;
            max-height: 700px;
            transition: background .5s ease-in-out;
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );
            cursor: pointer;
            background: var( --thermal-slate );
            position: relative;
            overflow: hidden;

        }

        .dropin-gradient {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, var(--thermal-slate-light) 0%, var(--thermal-slate) 100%);
            opacity: 0;
            transition: opacity .5s ease-in-out;
        }

        .hover,
        .dropin:hover {
            .dropin-gradient {
                opacity: .5;
            }
        }

        .dropin-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var( --thermal-gap );
            transition: all .3s ease-in-out;
        }

        @-webkit-keyframes action {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
        }

        @keyframes action {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
        }

        .dropin-uploading {
            transition: all .3s ease-in-out;
            position: absolute;
            
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            transform: translateY(100px);
            opacity: 0;

            color: var(--thermal-foreground);

            svg {
                width: 100px;
                -webkit-animation: action .5s infinite  alternate;
                animation: action .5s infinite  alternate;
            }

        }

        .dropin.uploading {
            .dropin-content {
                opacity: 0;
                transform: translateY( -100px );
            }
            .dropin-uploading {
                opacity: 1;
                transform: translateY(0);
            }
        }

    `;


    render() {

        const dropinClasses = {
            dropin: true,
            hover: this.hover,
            uploading: this.uploading
        }

        return html`

            <div class="container">
            
                <div ${ref(this.container)} class="${classMap(dropinClasses)}">

                    <div class="dropin-gradient"></div>

                    <div class="dropin-content">
                        <div>${t(T.dragorselectfile)}</div>
                        <thermal-btn 
                            variant="foreground"
                            icon="upload"
                            iconStyle="micro"
                        >${t(T.selectfile)}</thermal-btn>
                    </div>

                    <div class="dropin-uploading">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </div>
                
                </div>

            </div>
        
        `;

    }


}

declare global {
    interface HTMLElementTagNameMap {
        "group-dropin-element": GroupDropinElement;
    }
}