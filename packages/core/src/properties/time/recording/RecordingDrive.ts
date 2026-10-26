import { ThermalFileInstance } from "../../../file/ThermalFileInstance";
import { AbstractProperty } from "../../abstractProperty";
import { CallbacksManager } from "../../callbacksManager";

export class RecordingDrive extends AbstractProperty<boolean, ThermalFileInstance> {

    declare parent: ThermalFileInstance;

    protected stream?: MediaStream;
    protected recorder?: MediaRecorder;
    protected mimeType?: string;
    protected fileExt?: string;

    protected _isRecording: boolean = false;
    protected _mayStop: boolean = true;
    public get mayStop() {return this._mayStop;}
    protected set mayStop( value: boolean ) {
        this._mayStop = value;
        this.callbackMayStop.call( this.mayStop );
    }

    protected recordedChunks: Blob[] = [];

    public readonly callbackMayStop = new CallbacksManager<(value: boolean)=>void>();



    protected validate(value: boolean): boolean {
        return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected afterSetEffect(value: boolean): void {}

    public start() {

        if (this.value === true) {
            throw new Error("Recording already in process - can not start another one");
        }

        const { stream, recorder } = this.initRecording();

        this.stream = stream;
        this.recorder = recorder;

        this.value = true;

        this.recorder.addEventListener("dataavailable", event => {
            if (event.data.size > 0) {
                this.recordedChunks.push(event.data);
                this.download();
                this.clearRecording();
            }

        });

        this.recorder.start();

    }

    public end() {

        if (this.value === false) {
            throw new Error("Recording has not started yet - can not end it!");
        }

        if (this.recorder === undefined) {
            throw new Error("Error ending recording - no MediaRecorder instance created.");
        }

        this.recorder.stop();
        this.value = false;
        this.mayStop = true;

    }

    /** Records the entire file from start to the end. */
    public async recordEntireFile() {

        if ( this.value === true ) {
            throw new Error( "Already recording the entire file. Can not start until the current recording ends." );
        }

        await this.parent.timeline.setValueByPercent(0);

        this.mayStop = false;

        const cllbackId = "recording entire file";

        this.parent.timeline.callbacksEnd.add(cllbackId, () => {
            this.end();
            this.parent.timeline.callbacksEnd.delete(cllbackId);
        });

        this.parent.timeline.play();

        this.start();

    }


    public getOutputMimeType() {

        let value: {
            mime: string,
            ext: string
        } | undefined = undefined;

        const tp: { mime: string, ext: string }[] = [
            { mime: "video/webm;codecs=vp9", ext: "webm" },
            { mime: "video/webm;codecs=vp8", ext: "webm" },
            { mime: "video/webm;codecs=vp9,opus", ext: "webm" },
            { mime: "video/webm;codecs=vp8,opus", ext: "webm" },
            { mime: "video/webm", ext: "webm" },
            { mime: "video/mp4;codecs=h264", ext: "mp4" },
            { mime: "video/mp4", ext: "mp4" }
        ];

        for ( const t of tp ) {

            if ( MediaRecorder.isTypeSupported( t.mime ) ) {
                value = t;
            }

        }

        return value;

    }


    protected initRecording() {

        if (this.stream || this.recorder) {
            throw new Error("Recording was already initialised! Can not initialise it again until it stops!");
        }

        const canvasLayer = this.parent.dom?.canvasLayer;

        if ( ! canvasLayer ) {
            throw new Error("Canvas layer not found - can not initialise recording.");
        }

        const stream = canvasLayer.canvas.captureStream(25);

        const output = this.getOutputMimeType();

        if (output === undefined) {
            throw new Error("No supported mime type found for MediaRecorder!");
        }

        this.mimeType = output.mime;
        this.fileExt = output.ext;

        const options: MediaRecorderOptions = {
            mimeType: this.mimeType
        }

        const recorder = new MediaRecorder(stream, options);

        return {
            stream,
            recorder,
            options
        }

    }

    private createRecordingFileName() {


        const originalFileName = this.parent.fileName;
        
        const segments = [
            "from_" + this.parent.group.registry.range.value!.from.toFixed(2),
            "to_" + this.parent.group.registry.range.value!.to.toFixed(2),
        ].join("__");

        const extension = this.fileExt ? this.fileExt : "webm";

        const replaceWithText = "__" + segments + "." + extension;

        return originalFileName.replace( /\.(lrc|jpe?g)$/i, replaceWithText );


    }

    protected download() {
        const blob = new Blob(this.recordedChunks, {
            type: this.mimeType
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.style.display = "none";
        a.href = url;
        a.download = this.createRecordingFileName();
        /**
         * this.parent.fileName
        .replace(".lrc", `__${this.parent.group.registry.palette.value}__from-${this.parent.group.registry.range.value!.from.toFixed(2)}_to-${this.parent.group.registry.range.value!.to.toFixed(2)}.webm`);
        */
        document.body.appendChild(a);

        a.click();
        window.URL.revokeObjectURL(url);

        document.body.removeChild(a);
    }

    protected clearRecording() {
        if (this.recorder) {
            this.recorder.stop();
            delete this.recorder;
        }

        if (this.stream) {
            delete this.stream;
        }

        if (this.recordedChunks.length > 0) {
            this.recordedChunks = [];
        }

        this.value = false;
        this.mimeType = undefined;
    }

}