import type { ThermalFileInstance } from "@labirthermal/core";
import type { Quality } from "mediabunny";

export enum VideoExportSkin {
    LIGHT = "light",
    DARK = "dark",
    SOLARIZED = "solarized"
}

export type SingleVideoRenderProps = {

    hasHistogram: boolean,
    hasThermalScale: boolean,
    hasAnalysis: boolean,
    hasTimeline: boolean,
    isVertical: boolean,

    previewScale: number;
    autoScale: boolean;

    exportFrameWidth: number,
    exportFramePadding: number,
    exportFrameGap: number,
    exportGraphHeight: number,

    fileName: string,
    mp4Quality: Quality,

    skin: VideoExportSkin
}

export enum RecordingPhase {
    IDLE,
    RECORDING,
    ENCODING,
    CLEANUP
}

export interface ISingleVideoExportElement {

    recordingPhase: RecordingPhase;
    recordingPhaseProgress: number;

    setRecordingPhase( phase: RecordingPhase ): void;
    setRecordingPhaseProgress( progress: number ): void;

    get innerFile(): ThermalFileInstance | undefined;
    get exportedElement(): HTMLElement | undefined;

    renderProps: SingleVideoRenderProps;

    setHasHistogram( value: boolean ): void;
    setHasThermalScale( value: boolean ): void;
    setHasTimeline( value: boolean ): void;
    setHasAnalysis( value: boolean ): void;
    setIsVertical( value: boolean ): void;

    setExportFrameWidth( value: number ): void;
    setExportFramePadding( value: number ): void;
    setExportFrameGap( value: number ): void;
    setExportGraphHeight( value: number ): void;
    
    setFileName( value: string ): void;
    setMp4Quality( value: Quality ): void;
    setSkin( value: VideoExportSkin ): void;

    setPreviewScale( value: number ): void;
    setAutoScale( value: boolean ): void;

}