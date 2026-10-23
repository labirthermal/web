import type { ThermalFileInstance } from "@labirthermal/core";
import { property } from "lit/decorators.js";
import { AbstractFileButton } from "./AbstractFileButton";

export class FileButtonElement extends AbstractFileButton {


    public tooltip: undefined = undefined;

    @property({type: String})
    public label!: string;

    @property({type: Object})
    public onEnter?: (instance: ThermalFileInstance) => void;

    @property({type: Object})
    public onLeave?: (instance: ThermalFileInstance) => void;;

    @property({type: Object})
    public onAction?: (instance: ThermalFileInstance) => void;;

    public onInstanceCreated(): void { }

    public enter() { if (this.onEnter && this.file) this.onEnter(this.file); }
    public leave() { if ( this.onLeave && this.file ) this.onLeave(this.file);  }

    public action() {
        if ( this.onAction && this.file ) {
            this.onAction( this.file );
        }

    }

    public getDefaultLabel(): string {
        return this.label;
    }

    

}

declare global {
    interface HTMLElementTagNameMap {
        "file-button": FileButtonElement;
    }
}
