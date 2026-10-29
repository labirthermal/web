
import { format } from "date-fns";
import { ThermalFileInstance } from "../../../file/ThermalFileInstance";
import { ParsedFileBaseInfo, ParsedFileFrame, ParsedTimelineFrame } from "../../../parsers/structure";
import { AbstractProperty } from "../../abstractProperty";
import { CallbacksManager } from "../../callbacksManager";
import { FrameBuffer } from "./internals/FrameBuffer";

type FramesMap = Map<number, ParsedTimelineFrame>

export type ReTimelineFrameChangedEventListener = (frame: ParsedTimelineFrame) => void

export type TimelineChangedStatusType = {
    absoluteTime: number,
    relativeTime: number;
    currentFrame: ParsedFileFrame;
    currentStep: ParsedTimelineFrame;
    buffer: ParsedTimelineFrame[];
    preloaded: boolean;
    hasChanged: boolean;
};

export const playbackSpeed = {
    1: 1,
    0.5: 2,
    2: 0.5,
    3: 0.333333333333,
    5: 0.25,
    10: 0.1
}

export type PlaybackSpeeds = keyof typeof playbackSpeed;

/** Stores the frames and the time pointer which is in the miliseconds */
export class TimelineDrive extends AbstractProperty<number, ThermalFileInstance> {

    declare public readonly parent: ThermalFileInstance;


    protected _playbackSpeed: PlaybackSpeeds = 1;
    public get playbackSpeed() {
        return this._playbackSpeed;
    }
    public set playbackSpeed( value: PlaybackSpeeds ) {
        this._playbackSpeed = value;
        this.callbackdPlaybackSpeed.call( this._playbackSpeed );
    }
    public get playbackSpeedAspect() {
        return playbackSpeed[this.playbackSpeed];
    }

    public readonly onFrame = new CallbacksManager< (currentFrame: ParsedTimelineFrame) => void >();
    

    public get duration() { return this.parent.duration; }
    public get frameCount() { return this.steps.length; }
    public readonly startTimestampRelative: number;
    /** @deprecated not in use? */
    public readonly endTimestampRelative: number;

    public readonly stepsByAbsolute: FramesMap = new Map();
    public readonly stepsByRelative: FramesMap = new Map();
    public readonly stepsByIndex: FramesMap = new Map();
    public readonly relativeSteps: number[] = [];

    protected _currentStep: ParsedTimelineFrame;
    public get currentStep() { return this._currentStep; }
    

    public readonly isSequence: boolean;

    protected _isPlaying: boolean = false;
    public get isPlaying() { return this._isPlaying; }
    protected timer?: ReturnType<typeof setTimeout>;

    public readonly buffer: FrameBuffer;

    // Callbacks & Listeners

    public readonly callbackdPlaybackSpeed = new CallbacksManager<( value: PlaybackSpeeds ) => void>();
    public readonly callbacksPlay = new CallbacksManager<() => void>();
    public readonly callbacksPause = new CallbacksManager<() => void>();
    public readonly callbacksStop = new CallbacksManager<() => void>();
    public readonly callbacksEnd = new CallbacksManager<() => void>();
    public readonly callbacksChangeFrame = new CallbacksManager<(frame: ParsedTimelineFrame) => void>();

    public get currentMs() {
        return this.currentStep.relative;
    }

    public get currentPercentage() {
        return this._convertRelativeToPercent( this.currentStep.relative );
    }

    public get currentFrameIndex() {
        return this.currentStep.index;
    }

    public get currentTime() {
        return this.formatDuration( this.currentStep.relative );
    }

    public get frames() {
        return this.parent.meta.current.timeline;
    }

    public constructor(
        parent: ThermalFileInstance,
        initial: number,
        public readonly steps: ParsedFileBaseInfo["timeline"],
        initialFrameData: ParsedFileFrame
    ) {
        super(parent, Math.max(Math.min(initial, steps.length), 0));

        this._currentStep = this.steps[this.valueInitial];
        this.startTimestampRelative = 0;
        this.endTimestampRelative = this.steps[this.steps.length - 1].relative;

        this.isSequence = this.parent.meta.current.timeline.length > 1;

        this.steps.forEach(step => {
            this.stepsByIndex.set(step.index, step);
            this.stepsByAbsolute.set(step.absolute, step);
            this.stepsByRelative.set(step.relative, step);
            this.relativeSteps.push(step.relative);
        });

        this.buffer = new FrameBuffer(this, initialFrameData);

    }

    public init() {
        this.buffer.init();
    }

    protected afterSetEffect(): void {

        this.onFrame.call(this._currentStep);

        // Do nothing if no sequence
        if ( this.steps.length === 1 ) {
            return;
        }

    }

    protected validate(value: number): number {
        if ( this.steps === undefined ) {
            return value;
        }
        if (this.steps.length === 1) {
            return 0;
        }
        return this._validateRelativeTime(value);
    }

    public _validateRelativeTime(value: number): number {
        return Math.max(Math.min(value, this.steps[this.steps.length - 1].relative), 0);
    }

    public _validateIndex(value: number): number {
        return Math.max(Math.min(value, this.steps.length), 0);
    }

    public _convertRelativeToAspect(relativeTimeInMs: number) {
        return relativeTimeInMs / this.duration;
    }

    public _convertRelativeToPercent(relativeTimeInMs: number) {
        return this._convertRelativeToAspect(relativeTimeInMs) * 100;
    }

    public _convertPercenttRelative(percent: number) {
        return (this.duration * percent) / 100;
    }

    public formatDuration(
        ms: number
    ): string {
        const date = new Date(0);
        date.setMilliseconds( ms );
        return format( date, "mm:ss:SSS" );
    }


    public next() {

        const next = this.findNextRelative( this.value );

        if ( next ) {
            this.setRelativeTime( next.relative );
        }

    }

    public prev() {
        const prev = this.findPreviousRelative( this.value );
        this.setRelativeTime( prev.relative );
    }


    protected findPreviousOrThis( relativeTimeInMs: number ) {

        if ( this.stepsByRelative.has( relativeTimeInMs ) ) {
            return this.stepsByRelative.get( relativeTimeInMs ) as ParsedTimelineFrame;
        }

        return this.findPreviousRelative( relativeTimeInMs );

    }



    /**
     * Find previous frame by relative ms.
     */
    public findPreviousRelative(relativeTimeInMs: number) {

        // Return The first step if no sequence
        if ( this.steps.length === 1 ) {
            return this.steps[0] as ParsedTimelineFrame;
        }

        // Make sure the lookup time is 
        relativeTimeInMs = this._validateRelativeTime(relativeTimeInMs);

        const aspect = this._convertRelativeToAspect(relativeTimeInMs);

        let index = Math.max( Math.ceil(aspect * this.steps.length) + 5, this.steps.length );

        let previous: undefined|ParsedTimelineFrame = undefined;

        while ( index >= 0 && previous === undefined ) {

            const step = this.stepsByIndex.get( index );

            if ( step !== undefined ) {

                if ( step.relative < relativeTimeInMs ) {
                    previous = step;
                }

            }
            index = index - 1;

        }

        const result = previous !== undefined 
            ? previous
            : this.steps[0];

        return result;


    }

    public findNextRelative(relativeTimeInMs: number) {

        // Return The first step if no sequence
        if ( this.steps.length === 1 ) {
            return this.steps[0];
        }

        const aspect = this._convertRelativeToAspect(relativeTimeInMs);

        const index = Math.floor(aspect * this.steps.length) - 5;

        const subarrayStart = this._validateIndex(index);
        const subarrayEnd = this._validateIndex(index + 40);

        const subarray = this.steps.slice(subarrayStart, subarrayEnd);

        const frame = subarray.find(f => {
            return f.relative > relativeTimeInMs
        });

        return frame !== undefined
            ? frame
            : false;

    }

    public async setRelativeTime(relativeTimeInMs: number): Promise<TimelineChangedStatusType> {

        relativeTimeInMs = this._validateRelativeTime(relativeTimeInMs);

        // The value is stored as it came
        this.value = relativeTimeInMs;

        
        // The current (previous) step is stored 
        const currentStep = this.findPreviousOrThis(this.value);

        // Store propagate the step only when it changed
        if ( currentStep !== this._currentStep ) {

            this._currentStep = currentStep;

            const result = await this.buffer.recieveStep( this._currentStep );

            this.callbacksChangeFrame.call(this._currentStep);

            return result;

        }

        return {
            absoluteTime: this._currentStep.absolute,
            relativeTime: this.value,
            currentStep: this._currentStep,
            currentFrame: this.buffer.currentFrame,
            buffer: [],
            preloaded: false,
            hasChanged: false
        }

    }

    public async setValueByPercent(percent: number) {

        // Normalize the percent value
        percent = Math.max(Math.min(percent, 100), 0);

        // Convert the percent value to relative time
        const convertedToRelativeTime = this._convertPercenttRelative( percent );

        // Call the primary setter
        return await this.setRelativeTime( convertedToRelativeTime );
    }


    /** This is the main play method */
    protected createNextStepTimer() {

        if (this.timer !== undefined) {
            clearTimeout(this.timer);
        }

        if ( 
            ! this.isSequence
            || this._isPlaying === false
        ) {
            return;
        }

        this.timer = setTimeout( () => {
            const next = this.findNextRelative( this._currentStep.relative );

            if ( next ) {
                this.value = next.relative;
                if ( this._isPlaying ) {

                    this.value = next.relative;
                    this._currentStep = next;
                    this.buffer.recieveStep( next );

                    this.callbacksChangeFrame.call( next );

                    this.createNextStepTimer();
                }

            } else {
                this._isPlaying = false;
                this.callbacksEnd.call();
            }

        }, this._currentStep.offset * this.playbackSpeedAspect )

    }

    play() {

        if ( this.steps.length > 1 ) {
            this._isPlaying = true;
            this.createNextStepTimer();
            this.callbacksPlay.call();
        }

    }

    pause() {
        this._isPlaying = false;
        clearTimeout( this.timer );
        this.callbacksPause.call();
    }

    stop() {
        this.pause();
        this.value = 0;
        this.callbacksStop.call();
    }





}