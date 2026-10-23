import type { AbstractAnalysis, ThermalFileInstance, PlaybackSpeeds, ThermalFileFailure } from "@labirthermal/core";
import { CallbacksManager } from "@labirthermal/core";
import { FileAnalysisSynchronisators } from "./FileAnalysisSynchronisators";
import { ContextProvider, createContext } from "@lit/context";
import type { PropertyDeclaration, PropertyValueMap } from "lit";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { HostReactiveProperties} from "./AbstractHierarchyController";
import { AbstractHierarchyController, INTERNAL_STATE_DECLARATION } from "./AbstractHierarchyController";
import type { GroupController } from "./GroupController";
import type { ManagerController } from "./ManagerController";
import type { RegistryController } from "./RegistryController";

type IHostProperties = {

    managerController: ManagerController;
    registryController: RegistryController;
    groupController: GroupController;
    fileController: FileController;


    file?: ThermalFileInstance;
    failure?: ThermalFileFailure;
    loading: boolean;

    ms: number;

    playbackSpeed: PlaybackSpeeds;

    analysis1?: string;
    analysis2?: string;
    analysis3?: string;
    analysis4?: string;
    analysis5?: string;
    analysis6?: string;
    analysis7?: string;

    autoHighlight: boolean;

}

export interface IElementWithFileController extends AbstractThermalElement, IHostProperties { }

/** A crucial context for exporting the `FileController` object. */
export const fileControllerContext = createContext<FileController>("file-controller-context");

/** A crucial context exposing the `ThermalFileInstance` object from `FileController`. */
export const fileContext = createContext<ThermalFileInstance | undefined>("file-object-context");

/** Expose the file error value from the `FileController`. */
export const fileFailureContext = createContext<ThermalFileFailure | undefined>("file-failure-object");

/** Whether a file request is in progress; independent of readiness or an existing instance. */
export const fileLoadingContext = createContext<boolean>("file-loading");

/** File ready value from the `FileController` */
export const fileReadyContext = createContext<boolean>("file-ready-context");

/**. Current file MS value exposed as context. */
export const fileMsContext = createContext<number>("file-ms-context");

/** File time cursor indicvates the MS on which an arbitrary HTML may be recplaced. Undended to share across elements such as timeline ang graph. In those, the context shall be set on hover using `FileController.setFileTimeCursorPercentage()` */
export const fileTimeCursorContext = createContext<number | undefined>("file-time-cursor");

/** The `FileController` exposes the current file frame values as context. Current time is not possible to set by modification of this context. To change the current frame, it is necessary to use either:
 * - a) the `FileController.setMs()`
 * - b) the internal methods of `@labirthermal/core` `ThermalFileInstance["timeline"]` methods such as play, pause, setTimeRelative etc..
 */
export type FileControllerCurrentFrameType = {
    index: number;
    ms: number;
    time: string;
    percentage: number;
    absolute: number;
};
export const fileCurrentFrameContext = createContext<FileControllerCurrentFrameType | undefined>("file-current-frame-context");

/** The duration of the file is exposed from the `FileController` with the value pre-calculated for consumers */
export type FileControllerDurationContextType = {
    /** The file duration in ms */
    ms: number;
    /** The file formatted duration as string */
    time: string;
};

/** Exposes the current file duration from `FileController` */
export const fileDurationContext = createContext<FileControllerDurationContextType | undefined>("file-duration-context");

/** Exposes the current playing state from `FileController`.  */
export const filePlayingContext = createContext<boolean>("file-playing-context");

/** Exposes the current playback speed value from `FileController`. */
export const filePlaybackSpeedContext = createContext<PlaybackSpeeds | undefined>("file-playback-speed");

/** Exposes the current recording state from `FileController`. */
export const fileRecordingContext = createContext<boolean>("file-is-recording-state");

/** Exposes the current may stop state from the `FileController` */
export const fileMayStopContext = createContext<boolean>("file-may-stop-state");

/** Exposes the array of current analyses from the `FileController` */
export const fileAnalysisListContext = createContext<AbstractAnalysis[]>("file-analysis-list");



/** Unified properties of an analysis attribute of the host webcomponent */
const ANALYSIS_STATE_DECLARATION: PropertyDeclaration = { type: String, reflect: true };

/** The `FileController` is responsible for managing the state and interactions related to a file within the hierarchy. 
 * 
 * @author Jan Jáchim <jachim@zcu.cz>
 * @module @labirthermal/webcomponents
*/
export class FileController extends AbstractHierarchyController<IElementWithFileController> {


    private _UUID: string;

    public get UUID(): string {
        return this._UUID;
    }

    public static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties> = {
        managerController: INTERNAL_STATE_DECLARATION,
        registryController: INTERNAL_STATE_DECLARATION,
        groupController: INTERNAL_STATE_DECLARATION,
        fileController: INTERNAL_STATE_DECLARATION,
        file: INTERNAL_STATE_DECLARATION,
        failure: INTERNAL_STATE_DECLARATION,
        loading: INTERNAL_STATE_DECLARATION,
        ms: { type: Number, reflect: true, attribute: "ms" },
        playbackSpeed: { type: Number, reflect: true, attribute: "speed" },
        analysis1: ANALYSIS_STATE_DECLARATION,
        analysis2: ANALYSIS_STATE_DECLARATION,
        analysis3: ANALYSIS_STATE_DECLARATION,
        analysis4: ANALYSIS_STATE_DECLARATION,
        analysis5: ANALYSIS_STATE_DECLARATION,
        analysis6: ANALYSIS_STATE_DECLARATION,
        analysis7: ANALYSIS_STATE_DECLARATION,
        autoHighlight: { type: Boolean, reflect: true, attribute: "autohighlight" }
    }

    // Accessors to the host's file-related properties
    public get fileObject() { return this.host.file; }
    public get failure() { return this.host.failure; }
    public get ms() { return this.host.ms; }
    public get playbackSpeed() { return this.host.playbackSpeed; }
    public get analysis1() { return this.host.analysis1; }
    public get analysis2() { return this.host.analysis2; }
    public get analysis3() { return this.host.analysis3; }
    public get analysis4() { return this.host.analysis4; }
    public get analysis5() { return this.host.analysis5; }
    public get analysis6() { return this.host.analysis6; }
    public get analysis7() { return this.host.analysis7; }
    public get autoHighlight() { return this.host.autoHighlight; }

    // Local state accessors
    public get ready() { return this.readyContextProvider.value; }
    public get recording() { return this.fileRecordingContextProvider.value; }
    public get playing() { return this.filePlayingContextProvider.value; }
    public get mayStop() { return this.fileMayStopContextProvider.value; }
    public get cursor() { return this.fileCursorContextProvider.value; }
    public get currentFrame() { return this.fileCurrentFrameContextProvider.value; }
    public get analyses() { return this.fileAnalysesContextProvider.value; }
    public get duration() { return this.fileDurationContextProvider.value; }

    // Callbacks managers
    public readonly onLoadingStart = new CallbacksManager<() => void>();
    public readonly onSuccess = new CallbacksManager<(instance: ThermalFileInstance) => void>();
    public readonly onFailure = new CallbacksManager<(error: ThermalFileFailure) => void>();



    // Context providers

    private fileControllerContextProvider: ContextProvider<typeof fileControllerContext, IElementWithFileController>;

    private fileContextProvider: ContextProvider<typeof fileContext, IElementWithFileController>;

    private fileFailureContextProvider: ContextProvider<typeof fileFailureContext, IElementWithFileController>;
    private readonly loadingContextProvider: ContextProvider<typeof fileLoadingContext, IElementWithFileController>;

    private readyContextProvider: ContextProvider<typeof fileReadyContext, IElementWithFileController>;

    private fileDurationContextProvider: ContextProvider<typeof fileDurationContext, IElementWithFileController>;

    private fileCurrentFrameContextProvider: ContextProvider<typeof fileCurrentFrameContext, IElementWithFileController>;

    private fileCursorContextProvider: ContextProvider<typeof fileTimeCursorContext, IElementWithFileController>;

    private fileMsContextProvider: ContextProvider<typeof fileMsContext, IElementWithFileController>;

    private filePlaybackSpeedContextProvider: ContextProvider<typeof filePlaybackSpeedContext, IElementWithFileController>;

    private filePlayingContextProvider: ContextProvider<typeof filePlayingContext, IElementWithFileController>;

    private fileRecordingContextProvider: ContextProvider<typeof fileRecordingContext, IElementWithFileController>;

    private fileMayStopContextProvider: ContextProvider<typeof fileMayStopContext, IElementWithFileController>;

    private fileAnalysesContextProvider: ContextProvider<typeof fileAnalysisListContext, IElementWithFileController>;

    
    // Analysis synchronisation
    private _analysisSynchronisators = new FileAnalysisSynchronisators(this); 


    private _propagateHighlightCache: (event: MouseEvent|FocusEvent) => void | undefined;
    private _unpropagateHighlightCache: (event: MouseEvent|FocusEvent) => void | undefined;


    constructor(
        host: IElementWithFileController
    ) {
        super(host);
        this._UUID = host.UUID + "_file-controller";

        // Expose self as file context provider
        this.fileControllerContextProvider = new ContextProvider(
            this.host,
            { context: fileControllerContext, initialValue: this }
        );

        // Create the file context provider
        this.fileContextProvider = new ContextProvider(
            this.host,
            { context: fileContext }
        );

        this.fileFailureContextProvider = new ContextProvider(
            this.host,
            { context: fileFailureContext }
        );

        this.loadingContextProvider = new ContextProvider(
            this.host,
            { context: fileLoadingContext, initialValue: false }
        );

        this.readyContextProvider = new ContextProvider(
            this.host,
            { context: fileReadyContext, initialValue: false }
        );

        this.fileDurationContextProvider = new ContextProvider(
            this.host,
            { context: fileDurationContext }
        );

        this.fileCurrentFrameContextProvider = new ContextProvider(
            this.host,
            { context: fileCurrentFrameContext }
        );

        this.fileCursorContextProvider = new ContextProvider(
            this.host,
            { context: fileTimeCursorContext }
        );

        this.fileMsContextProvider = new ContextProvider(
            this.host,
            { context: fileMsContext }
        );

        this.filePlaybackSpeedContextProvider = new ContextProvider(
            this.host,
            { context: filePlaybackSpeedContext }
        );

        this.filePlayingContextProvider = new ContextProvider(
            this.host,
            { context: filePlayingContext }
        );

        this.fileRecordingContextProvider = new ContextProvider(
            this.host,
            { context: fileRecordingContext }
        );

        this.fileMayStopContextProvider = new ContextProvider(
            this.host,
            { context: fileMayStopContext }
        );

        this.fileAnalysesContextProvider = new ContextProvider(
            this.host,
            { context: fileAnalysisListContext, initialValue: [] }
        );

        this._propagateHighlightCache = () => this._propagateHighlight();
        this._unpropagateHighlightCache = () => this._unpropagateHighlight();


    }



    hostConnected(): void {

        // Register propagation events
        this.host.addEventListener("mouseenter", this._propagateHighlightCache);
        this.host.addEventListener("focus", this._propagateHighlightCache);
        this.host.addEventListener("mouseleave", this._unpropagateHighlightCache);
        this.host.addEventListener("blur", this._unpropagateHighlightCache);

        // After moving, refresh the core links
        if ( this._attached ) {
            this._propagateContexts( this._attached );
            this._bindListeners(this._attached, true);
        }

    }

    hostDisconnected(): void {
        
        this.host.removeEventListener("mouseenter", this._propagateHighlightCache);
        this.host.removeEventListener("focus", this._propagateHighlightCache);
        this.host.removeEventListener("mouseleave", this._unpropagateHighlightCache);
        this.host.removeEventListener("blur", this._unpropagateHighlightCache);

        this._unpropagateHighlight();

        if ( this._attached ) {
            this._unbindListeners(this._attached);
        }

    }

    hostWillUpdateWatcher(value: PropertyValueMap<IElementWithFileController>): void {
        
        // Update the file assignment
        if (value.has("file")) this._syncAssignment();

        // Notify the analysis synchronisators about the host update
        this._analysisSynchronisators.handleHostUpdate(value);

        // Update the MS
        if ( value.has("ms")  ) {
            this.setMs(this.host.ms);
        }

        // Update the playback speed
        if ( value.has("playbackSpeed") && this.host.file && this.host.file.timeline.isSequence ) {

            if ( this.host.playbackSpeed !== this.host.file.timeline.playbackSpeed ) {
                this.host.file.timeline.playbackSpeed = this.host.playbackSpeed;
            }

        }
    }


    hostUpdatedWatcher(): void {}

    private _propagateContexts(
        instance: ThermalFileInstance
    ): void {
        this.fileContextProvider.setValue(instance);
        this.readyContextProvider.setValue(true);
        this.fileDurationContextProvider.setValue({
            ms: instance.timeline.duration,
            time: instance.timeline.formatDuration(instance.timeline.duration)
        });
        this._propagateInstanceCurrentFrame(instance);
        this._propagateInstanceAnalysesArray(instance);
        this.fileMsContextProvider.setValue(instance.timeline.currentMs);
        this.filePlaybackSpeedContextProvider.setValue(instance.timeline.playbackSpeed);
        this.filePlayingContextProvider.setValue(instance.timeline.isPlaying);
        this.fileMayStopContextProvider.setValue(instance.recording.mayStop);
        this.fileRecordingContextProvider.setValue(instance.recording.value);
    }

    private _resetAllContexts(): void {
        this.readyContextProvider.setValue(false);
        this.fileDurationContextProvider.setValue(undefined);
        this.fileCurrentFrameContextProvider.setValue(undefined);
        this.fileAnalysesContextProvider.setValue([]);
        this.fileContextProvider.setValue(undefined);
        this.fileRecordingContextProvider.setValue(false);
        this.filePlayingContextProvider.setValue(false);
        this.fileMayStopContextProvider.setValue(true);
        this.fileMsContextProvider.setValue(0);
        this.fileCursorContextProvider.setValue(undefined);
    }

    private _attached?: ThermalFileInstance;

    private _syncAssignment(): void {

        const next = this.host.file;
        
        // Do nothing if file is the same
        if ( next === this._attached ) return;

        const previous = this._attached;

        // If there is an attached instance, detach it first
        if ( previous ) this._detach(previous);

        // If there is a new instance, attach it
        if ( next ) this._attach( next, previous !== undefined );

        // If there is no new instance, reset all contexts
        else { 
            this._resetAllContexts(); 
            this.host.ms = 0;
        }

    }

    private _attach(
        instance: ThermalFileInstance,
        isReplacement: boolean
    ): void {

        this._attached = instance;

        // Propagate the context
        this.fileContextProvider.setValue(instance);

        // Clear the failure
        this.host.failure = undefined;
        this.fileFailureContextProvider.setValue(undefined);

        if ( this.host.playbackSpeed !== undefined ) {
            instance.timeline.playbackSpeed = this.host.playbackSpeed;
        }

        this._propagateContexts(instance);
        this._bindListeners(instance);

        if ( !isReplacement && this.host.ms > 0 && instance.timeline.isSequence ) {
            this.setMs(this.host.ms);
        } else {
            this.host.ms = instance.timeline.currentMs;
        }

        this.setLoading(false);
        this.onSuccess.call(instance);


    }


    private _detach(
        instance: ThermalFileInstance
    ): void {

        this._unbindListeners(instance);
        this._unpropagateHighlight();

        this._attached = undefined;

        instance.unmountFromDom();

    }



    private _bindListeners(
        instance: ThermalFileInstance,
        coreWins: boolean = false
    ): void {

        // Add listeners for the instance's timeline events

        instance.timeline.callbacksPlay.set(this.UUID, () => {
            this.filePlayingContextProvider.setValue(true);
        });

        instance.timeline.callbacksPause.set(this.UUID, () => {
            this.filePlayingContextProvider.setValue(false);
        });

        instance.timeline.callbacksStop?.set(this.UUID, () => {
            this.filePlayingContextProvider.setValue(false);
        });

        instance.timeline.callbacksEnd?.set(this.UUID, () => {
            this.filePlayingContextProvider.setValue(false);
        });

        // Frame changes
        instance.timeline.callbacksChangeFrame.set(this.UUID, (frame) => {
            const value = {
                ms: frame.relative,
                time: instance.timeline.currentTime,
                percentage: instance.timeline.currentPercentage,
                index: frame.index,
                absolute: frame.absolute
            };
            this.fileCurrentFrameContextProvider.setValue(value);
            this.host.ms = frame.relative;
            this.fileMsContextProvider.setValue(frame.relative);
        });

        // Playback speed changes
        instance.timeline.callbackdPlaybackSpeed.set(this.UUID, (speed) => {
            this.host.playbackSpeed = speed;
            this.filePlaybackSpeedContextProvider.setValue(speed);
        });

        // May stop changes
        instance.recording.callbackMayStop.set(this.UUID, (value) => {
            this.fileMayStopContextProvider.setValue(value);
        });

        // Recording
        instance.recording.addListener(this.UUID, value => {
            this.fileRecordingContextProvider.setValue(value);
        });


        // Analyses list listener
        instance.analysis.addListener(this.UUID, value => {
            this.fileAnalysesContextProvider.setValue(value);
        });

        

        this._analysisSynchronisators.handleFileAssigned(instance, coreWins);

    }


    private _unbindListeners(instance: ThermalFileInstance): void {
        instance.timeline.callbacksPlay.delete(this.UUID);
        instance.timeline.callbacksPause.delete(this.UUID);
        instance.timeline.callbacksStop.delete(this.UUID);
        instance.timeline.callbacksEnd.delete(this.UUID);
        instance.timeline.callbacksChangeFrame.delete(this.UUID);
        instance.timeline.callbackdPlaybackSpeed.delete(this.UUID);
        instance.recording.removeListener(this.UUID);
        instance.recording.callbackMayStop?.delete(this.UUID);
        instance.analysis.removeListener(this.UUID);

        this._analysisSynchronisators.handleFileUnassigned();
    }


    /** 
     * This is crucial - once the instance is loaded or retrieved somewhere, all the magic happens. Existence of this method enables controller to change the instance at any time. 
     */
    public receiveInstance(
        instance: ThermalFileInstance
    ): void {

        // Store the instance in the host
        this.host.file = instance;
        this._syncAssignment();
        this.setLoading(false);

    }

    public removeInstance(): void {

        this.host.file = undefined;
        this._syncAssignment();
        this.setLoading(false);

    }

    public receiveFailure(failure: ThermalFileFailure): void {

        this.removeInstance();
        this.host.failure = failure;
        this.fileFailureContextProvider.setValue( failure );
        this.setLoading(false);
        this.onFailure.call(failure);

    }

    private _propagateInstanceCurrentFrame(instance: ThermalFileInstance): void {

        this.fileCurrentFrameContextProvider.setValue({
            ms: instance.timeline.currentMs,
            time: instance.timeline.currentTime,
            percentage: instance.timeline.currentPercentage,
            index: instance.timeline.currentStep.index,
            absolute: instance.timeline.currentStep.absolute
        });
    }

    private _propagateInstanceAnalysesArray(instance: ThermalFileInstance): void {
        // Implement the propagation of other instance-related contexts here
        this.fileAnalysesContextProvider.setValue(instance.analysis.layers.all);
    }


    // Setters of local states

    public setTimeCursorPercentage(percentage: number | undefined): void {
        if (percentage !== undefined && !Number.isFinite(percentage)) {
            return;
        }

        const value = percentage === undefined
            ? undefined
            : Math.max(0, Math.min(percentage, 100));

        if (value !== this.fileCursorContextProvider.value) {
            this.fileCursorContextProvider.setValue(value);
        }
    }

    public setTimePercentage(
        percentage: number
    ): void {
        const file = this._attached;

        if (!file?.timeline.isSequence) return;

        const clampedPercentage = Math.max(
            0,
            Math.min(
                percentage,
                100
            )
        );

        if ( clampedPercentage !== file.timeline.currentPercentage ) {
            file.timeline.setValueByPercent(clampedPercentage);
        }

    }

    public play(): void {
        this._attached?.timeline.play();
    }

    public stop(): void {
        this._attached?.timeline.stop();
    }

    public pause(): void {
        this._attached?.timeline.pause();
    }

    public setMs(value: number): void {

        const file = this._attached;

        if (!file?.timeline.isSequence) return;

        const clampedRelativeTime = Math.max(
            0,
            Math.min(
                value,
                file.timeline.duration
            )
        )

        if ( clampedRelativeTime !== file.timeline.currentMs ) {
            file.timeline.setRelativeTime(clampedRelativeTime);
        }

    }

    /** Impose this file's highlight into the registry */
    private _propagateHighlight() {
        if (this.autoHighlight && this.fileObject) {
            this.host.setAttribute("is-highlight", "true");
            this.host.registryController.setHighlight({
                from: this.fileObject.min,
                to: this.fileObject.max
            })
        }
    }

    /** Remove the highlight from the registry */
    private _unpropagateHighlight() {
        if (this.host.hasAttribute("is-highlight")) {
            this.host.removeAttribute("is-highlight");
            this.host.registryController.setHighlight(undefined);
        }
    }

    public startLoading(): void {
        this.host.failure = undefined;
        this.fileFailureContextProvider.setValue(undefined);
        this.setLoading(true);
        this.onLoadingStart.call();
        this.readyContextProvider.setValue(false);
    }

    /** Publishes loading independently of whether an old file is still available. */
    private setLoading(loading: boolean): void {
        if (this.host.loading !== loading) {
            this.host.loading = loading;
        }
        this.loadingContextProvider.setValue(loading);
    }

    private endLoading(): void {
        this.readyContextProvider.setValue(true);
    }


}


