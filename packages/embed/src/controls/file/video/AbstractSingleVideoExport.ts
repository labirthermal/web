import type { ThermalFileInstance } from "@labirthermal/core";
import type { PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef } from "lit/directives/ref.js";
import type { Quality} from "mediabunny";
import { QUALITY_VERY_HIGH } from "mediabunny";
import { AbstractFileConsumer } from "../../../hierarchy/consumers/AbstractFileConsumer";
import type { FileCopyElement } from "../../../hierarchy/providers/FileCopy";
import { VideoRecorder } from "./internals/VideoRecorder";
import type { ISingleVideoExportElement, SingleVideoRenderProps} from "./ISingleVideoExportElement";
import { RecordingPhase, VideoExportSkin } from "./ISingleVideoExportElement";

export abstract class AbstractSingleVideoExport extends AbstractFileConsumer implements ISingleVideoExportElement {

    public fileCopyElementRef: Ref<FileCopyElement> = createRef();
    public exportedDivRef: Ref<HTMLElement> = createRef();

    public get slug(): string {
        return [
            "single-video-export",
            this.file?.fileName ?? "no-file",
            this.UUID
        ].join("__")
    }

    public get outerFile(): ThermalFileInstance | undefined {
        return this.file;
    }


    public get innerFile(): ThermalFileInstance | undefined {
        return this.fileCopyElementRef.value?.file;
    }

    public get exportedElement(): HTMLElement | undefined {
        return this.exportedDivRef.value;
    }

    @property({ type: Boolean, reflect: true }) public parentHasAnalyses: boolean = false;

    @state()
    public recordingPhase: RecordingPhase = RecordingPhase.IDLE;

    @state()
    public recordingPhaseProgress: number = 0;

    public setRecordingPhase(phase: RecordingPhase): void {
        this.recordingPhase = phase;
    }

    public setRecordingPhaseProgress(progress: number): void {
        this.recordingPhaseProgress = progress;
    }

    @state()
    public renderProps: SingleVideoRenderProps = {

        hasHistogram: true,
        hasThermalScale: true,
        hasAnalysis: false,
        hasTimeline: false,
        isVertical: false,

        exportFrameWidth: 1200,
        exportFramePadding: 15,
        exportFrameGap: 30,
        exportGraphHeight: 300,

        fileName: "exported-video",
        mp4Quality: QUALITY_VERY_HIGH,

        skin: VideoExportSkin.LIGHT,

        previewScale: 0.45,
        autoScale: true,
    }

    /** Voláno při změně vlastností ovlivňujících layout exportu.
     *  Lze přepsat v potomcích pro reakci na změny (např. přepočet autoScale).
     */
    protected onLayoutAffectingPropertyChanged(): void {
        // Prázdná implementace - přepíše se v potomcích
    }

    public setHasHistogram(value: boolean): void {
        this.renderProps.hasHistogram = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setHasThermalScale(value: boolean): void {
        this.renderProps.hasThermalScale = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setPreviewScale(value: number): void {
        this.renderProps.previewScale = value;
        this.requestUpdate();
    }

    public setAutoScale(value: boolean): void {
        this.renderProps.autoScale = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    /** The analyses are mirrored to the copy by the `withAnalyses` property of the `file-copy` element (see the providers directive). */
    public setHasAnalysis(value: boolean): void {
        this.renderProps.hasAnalysis = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setHasTimeline(value: boolean): void {
        this.renderProps.hasTimeline = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setIsVertical(value: boolean): void {
        this.renderProps.isVertical = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setExportFramePadding(value: number): void {
        this.renderProps.exportFramePadding = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setExportFrameGap(value: number): void {
        this.renderProps.exportFrameGap = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setExportFrameWidth(value: number): void {
        this.renderProps.exportFrameWidth = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setExportGraphHeight(value: number): void {
        this.renderProps.exportGraphHeight = value;
        this.requestUpdate();
        this.onLayoutAffectingPropertyChanged();
    }

    public setFileName(value: string): void {
        this.renderProps.fileName = value;
        this.requestUpdate();
    }

    public setMp4Quality(value: Quality): void {
        this.renderProps.mp4Quality = value;
        this.requestUpdate();
    }

    public setSkin(value: VideoExportSkin): void {
        this.renderProps.skin = value;
        this.requestUpdate();
    }

    updated(_changedProperties: PropertyValues): void {
        super.updated(_changedProperties);

        // Nastav výchozí název souboru z .lrc souboru
        if (_changedProperties.has("file") && this.file) {
            this.parentHasAnalyses = this.file.analysis.value.length > 0;

            const lrcFileName = this.file.fileName;
            // Odstraň .lrc příponu
            const baseName = lrcFileName.replace(/\.lrc$/i, "");
            this.renderProps.fileName = baseName;
            this.requestUpdate();
        }
    }


    public async record(): Promise<void> {

        const recorder = new VideoRecorder(this);

        await recorder.captureVideo();


    }

    public async currentFrame(): Promise<void> {

        const recorder = new VideoRecorder(this);
        await recorder.captureCurrentFrameAsPng();
    }






}