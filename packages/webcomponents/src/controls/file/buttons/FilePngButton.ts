import { consume } from "@lit/context";
import { state } from "lit/decorators.js";
import type { ConfigController } from "../../../controllers/ConfigController";
import { configContext } from "../../../controllers/ConfigController";
import { AbstractFileButton } from "./AbstractFileButton";

export class FilePngButton extends AbstractFileButton {

    tooltip: undefined = undefined;

    @state()
    @consume({ context: configContext, subscribe: true })
    protected configController?: ConfigController;

    public onInstanceCreated(): void { }

    public enter() { }
    public leave() { }

    public action() {
        if (this.file) {
            const png = this.configController?.settings.export.png;
            this.file.export.downloadPng({
                width: png?.width,
                fontSize: png?.fontSize,
                showAnalysis: png?.analyses,
                showThermalScale: png?.thermalScale,
                showFileName: png?.fileName,
                showFileDate: png?.fileDate
            });
        }

    }

    public getDefaultLabel(): string {
        return "png";
    }



}

declare global {
    interface HTMLElementTagNameMap {
        "file-download-png": FilePngButton;
    }
}
