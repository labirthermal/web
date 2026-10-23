import type { CSSResultGroup} from "lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";

export class ThermalDropinElement extends AbstractThermalElement {

    @property({type: String})
    public prompt?: string;

    static styles?: CSSResultGroup | undefined = css`
    
        :host {
            display: block;
            box-sizing: border-box;

            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);

            

            border: var(--thermal-border-width) var(--thermal-slate)var(--thermal-border-style);
            border-radius: var(--thermal-radius);

            transition: all .5s ease-in-out;

            position: relative;
            overflow: hidden;

            cursor: pointer;
            
        }

        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transition: all .3s ease-in-out;

            background: radial-gradient(circle, var(--thermal-slate-light) 0%, var(--thermal-slate) 100%);
        }

        .content {
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            padding: var(--thermal-gap);
            box-sizing: border-box;
        }

        :host {
        
            &:hover,
            &:focus {
            
                .bg {
                    transform: scale(1.05);
                }
            
            }
        
        }

        :host(:hover),
        :host(:focus) {
        
            .bg {
                transform: scale(1.05);
            }

        
        }
    
    `;



    protected render(): unknown {
        return html`
            <div class="bg"></div>
            <div class="content">
                <div>Thermal Dropin Component</div>
            </div>
        `;
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "thermal-dropin": ThermalDropinElement;
    }
}
