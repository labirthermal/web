import type { AbstractAnalysis, ThermalFileInstance, PlaybackSpeeds, ThermalFileFailure } from "@labirthermal/core";
import { html } from "lit";
import { AbstractGroupConsumer } from "../consumers/AbstractGroupConsumer";
import type { IElementWithFileController } from "../../controllers/FileController";
import { FileController } from "../../controllers/FileController";

export abstract class AbstractFileProvider extends AbstractGroupConsumer implements IElementWithFileController {

    public static properties = {
        ...FileController.HOST_PROPERTIES
    };

    public fileController: FileController = new FileController(this);

    public file?: ThermalFileInstance;

    public failure?: ThermalFileFailure;

    /** Loading is managed and published by FileController, independently of file presence. */
    public loading: boolean = false;

    protected ready: boolean = false;

    public ms: number = 0;

    public playbackSpeed: PlaybackSpeeds = 1;

    public recording: boolean = false;

    public playing: boolean = false;

    /** List of all analyses taken from the `ThermalFileInstance.analysis.layers.all` */
    public analyses: AbstractAnalysis[] = [];


    public analysis1?: string;
    public analysis2?: string;
    public analysis3?: string;
    public analysis4?: string;
    public analysis5?: string;
    public analysis6?: string;
    public analysis7?: string;

    public autoHighlight: boolean = false;


    /** Register instance callback listeners. @deprecated */
    public recieveInstance(
        instance: ThermalFileInstance
    ) {

        this.fileController.receiveInstance(instance);

    }


    /** @deprecated */
    public removeInstance() {

        this.fileController.removeInstance();

    }


    public deleteFile() {
        if (this.file) {
            this.removeInstance();
        }
    }


    protected render(): unknown {
        return html`
            <slot></slot>
            <slot name="mark"></slot>
            <slot name="analysis"></slot>
        `;
    }

}