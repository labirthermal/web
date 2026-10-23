import type { PlaybackSpeeds } from "@labirthermal/core";
import { playbackSpeed } from "@labirthermal/core";
import { consume } from "@lit/context";
import { t } from "i18next";
import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractFileConsumer } from "../../hierarchy/consumers/AbstractFileConsumer";
import { filePlaybackSpeedContext } from "../../controllers/FileController";
import { T } from "../../translations/Languages";
import { ThermalDropdownElement } from "../../ui/Dropdown";

export class FilePlaybackSpeedDropdown extends AbstractFileConsumer {

    @property({type: String, reflect: true})
    public enabled: "on"|"off" = "on";

    @state()
    @consume({context: filePlaybackSpeedContext, subscribe: true})
    protected playbackSpeed: PlaybackSpeeds = 1;
    
    public onInstanceCreated(): void {}

    public onFailure(): void {}

    protected handleEntryClick(
        event: MouseEvent,
        key: string
    ): void {

        // Impose the value
        if ( this.file ) {
            this.file.timeline.playbackSpeed = parseFloat(key) as keyof typeof playbackSpeed;
        }

        // Close the drondown
        const target = event.target as HTMLElement;

        if ( 
            target 
            && target.parentElement
            && target.parentElement instanceof ThermalDropdownElement 
        ) {
            target.parentElement.setClose();
        }

    }


    protected renderEntry(
        key: string
    ): unknown {
        return html`<thermal-btn
            style="width: 100%;"
            slot="option"
            variant="${ this.playbackSpeed.toString() === key ? "background" : "default" }"
            @click="${(event: MouseEvent) => this.handleEntryClick( event, key )}"
        >
            ${key}x
        </thermal-btn>`;
    }

    protected render(): unknown {

        if ( this.file === undefined ) {
            return nothing;
        }

        return html`<thermal-dropdown 
            interactive="${this.enabled}" 
            .tooltip=${t(T.playbackspeed)}
        >

            <div slot="invoker" class="button">
                ${this.playbackSpeed}x
            </div>

            ${Object.entries( playbackSpeed ).map( ([key]) => {
                return this.renderEntry( key );
            } )}
            
        </thermal-dropdown>`
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-playback-speed-dropdown": FilePlaybackSpeedDropdown;
    }
}
