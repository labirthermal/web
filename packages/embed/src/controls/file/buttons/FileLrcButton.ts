import { AbstractFileButton } from "./AbstractFileButton";

export class FileLrcButton extends AbstractFileButton {

    tooltip: undefined = undefined;

    public onInstanceCreated(): void { }

    public enter() {}
    public leave() {}

    public action() {
        if ( this.file ) {
            const link = document.createElement( "a" );
            link.href = this.file.thermalUrl;
            link.download = this.file.fileName;
            link.click();
        }

    }

    public getDefaultLabel(): string {
        return "lrc";
    }

    

}

declare global {
    interface HTMLElementTagNameMap {
        "file-download-lrc": FileLrcButton;
    }
}
