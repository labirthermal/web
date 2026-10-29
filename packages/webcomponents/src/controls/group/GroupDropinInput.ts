import type { DropinElementListener } from "@labirthermal/core";
import { t } from "i18next";
import type { PropertyValues } from "lit";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Ref } from 'lit/directives/ref.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { T } from "../../translations/Languages";
import type { BtnVariants } from "../../ui/Btn";
import { AbstractGroupDropin } from "./AbstractGroupDropin";

export class GroupDropinInputElement extends AbstractGroupDropin {

  @property({ type: String, reflect: true })
  public icon?: string;

  @property({ type: String, reflect: true })
  public iconStyle?: string;

  @property({ type: String, reflect: true })
  public tooltip?: string;

  @property({ type: String, reflect: true })
  public variant?: BtnVariants;

  @state()
  protected container: Ref<HTMLVideoElement> = createRef();

  @state()
  protected hover: boolean = false;

  @state()
  protected uploading: boolean = false;

  listener?: DropinElementListener;

  public static styles = css`

        .container {
            display: none;
        }

        .dropin {
            background: var( --thermal-slate );
            width: 100%;
            aspect-ratio: 4 / 3;
        }

        .hover {
            background: var( --thermal-slate-light );
        }

        svg {
            width: 1em;
        }



.lds-ellipsis,
.lds-ellipsis div {
  box-sizing: border-box;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 21px;
  height: 1em;
}
.lds-ellipsis div {
  position: absolute;
  top: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 0px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 7px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 14px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 21px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0px, 0);
  }
}


    
    `;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    if (this.container.value !== undefined) {

      this.listener = this.managerObject.service.handleDropzone(this.container.value, true);

      this.listener.onMouseEnter.add(this.UUID, () => {
        this.hover = true;
      });

      this.listener.onMouseLeave.add(this.UUID, () => {
        this.hover = false;
      });

      this.listener.onDrop.set(this.UUID, () => {
        this.uploading = true;
      });


      this.listener.onProcessingEnd.add(this.UUID, async (results) => {

        if ( this.onDrop !== undefined ) {
            await this.onDrop(results);
        }

        this.uploading = false;

        return;

      });

    }

  }

  render() {

    const title = this.uploading === false
      ? t(T.uploadafile)
      : html`<div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;

    return html`
            <thermal-btn 
              icon="${ifDefined( this.icon )}"
              iconStyle="${ifDefined( this.iconStyle )}"
              tooltip="${ifDefined( this.tooltip )}"
              variant="${ifDefined( this.variant )}"
            @click="${() => {
        if (this.listener) {
          this.listener.openFileDialog(true);
        }
      }}"><slot>${title}</slot></thermal-btn>

            <div class="container">
            
                <div ${ref(this.container)}></div>

            </div>
        
        `;

  }


}

declare global {
    interface HTMLElementTagNameMap {
        "group-dropin-input": GroupDropinInputElement;
    }
}