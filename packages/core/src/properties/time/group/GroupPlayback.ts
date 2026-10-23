import { ThermalFileInstance } from "../../../file/ThermalFileInstance";
import { ThermalGroup } from "../../../hierarchy/ThermalGroup";
import { AbstractProperty } from "../../abstractProperty";
import { CallbacksManager } from "../../callbacksManager";


/** 
 * Control coordinated playback of files within a group. 
 * 
 * The value is actual time in relative MS (from start, to the end of the latest sequence).
 * 
 * This functionality depends on batch analysis of all group files.
 * 
 * @todo Group should have its own loading method for batch processing. This method should provide its own callbacks.
 */
export class GroupPlayback extends AbstractProperty<number, ThermalGroup> {

    protected _hasAnyPlayback: boolean = false;
    /** Does this group include any sequence? */
    public get hasAnyPlayback() {
        return this._hasAnyPlayback;
    }
    protected set hasAnyPlayback(value: boolean) {
        if (this._hasAnyPlayback !== value) {
            this._hasAnyPlayback = value;
            this.onHasAnyCallback.call(value);
        }
    }
    public readonly onHasAnyCallback = new CallbacksManager<(value: boolean) => void>
    protected recalculateHasAnyPlayback(
        instances: ThermalFileInstance[]
    ) {
        let temporaryHas = false;

        instances.forEach(i => {
            if (i.timeline.isSequence) {
                temporaryHas = true;
            }
        });

        this.hasAnyPlayback = temporaryHas;
    }

    protected _playing: boolean = false;
    public get playing() { return this._playing; }
    protected set playing(value: boolean) {
        if (this._playing !== value) {
            this._playing = value;
            this.onPlayingStatusChange.call(this._playing);
        }
    }
    public readonly onPlayingStatusChange = new CallbacksManager<(value: boolean) => void>

    /** Internal pointer holding the current loop iteration*/
    protected loopStep: number = 0;

    /** Internal setTimeout for playback. */
    protected loopTimer?: ReturnType<typeof setTimeout>;

    protected _loopInterval: number = 20;
    /** Interval upon which the main loop triggers. In MS. */
    public get loopInterval() { return this._loopInterval; }
    /** @deprecated The playback interval should not change during playback */
    public setLoopInterval(
        value: number
    ) {
        this._loopInterval = Math.round(value);
        this.onLoopIntervalChanged.call(this._loopInterval);
    }
    /** @deprecated The loop playback should not change during playback */
    public readonly onLoopIntervalChanged = new CallbacksManager<(value: number) => void>

    protected _duration: number = 0;
    public get duration() { return this._duration; }
    protected set duration(value: number) {
        if (value !== this._duration) {
            this._duration = value;
            this.onDurationChanged.call(this._duration);
        }
    }
    public readonly onDurationChanged = new CallbacksManager<(value: number | undefined) => void>
    protected recalculateDuration(
        instances: ThermalFileInstance[]
    ) {
        let temporaryDuration = 0;

        instances.forEach(instance => {
            if (instance.timeline.duration > temporaryDuration) {
                temporaryDuration = instance.timeline.duration;
            }
        });

        this.duration = temporaryDuration;
    }


    protected UUID = this.parent.id + "__listener";

    constructor(
        parent: ThermalGroup,
        initial: number
    ) {
        super(parent, initial);

        this.recalculateDuration(this.parent.files.value);
        this.recalculateHasAnyPlayback(this.parent.files.value);

        /**
         * Listen to completed batches to retrieve 
         * the maximal duration
         */
        this.parent.registry.batch.onBatchComplete.set(
            this.UUID,
            results => {

                // Filter only affected items
                const instances = results.filter(res => res instanceof ThermalFileInstance) as ThermalFileInstance[];

                // Update local attributes
                this.recalculateDuration(instances);
                this.recalculateHasAnyPlayback(instances);

                // Assign new value
                const newVal = this.value;
                this.value = newVal;

            }
        );

    }


    protected validate(value: number): number {
        // Make sure the value in MS is within valid duration
        return Math.min(Math.max(value, 0), this.duration)
    }


    protected afterSetEffect(value: number): void {
        // Whenever the value changes, set the time to individual images
        this.parent.files.forEveryInstance(instance => instance.timeline.setRelativeTime(value));

    }


    /** Set time value by percent. The actual MS is calculated depending on the duration. */
    public setValueByPercent(
        percent: number
    ) {

        // Convert to MS
        const ms = this.percentToMs(percent);

        // Set only if different
        if (ms !== this.value) {
            this.value = ms;

            // Calculate the step value = it is the closest lover number divided by interval
            this.loopStep = Math.floor(this.duration / this.value);

            // Create new timer for playback
            if (this.playing) {
                this.createTimerStep(true);
            }
        }

    }

    /** Set the time value by MS. */
    public setValueByRelativeMs(
        relativeMs: number
    ) {

        this.value = relativeMs;

        // Calculate the step value = it is the closest lover number divided by interval
        this.loopStep = Math.floor(this.duration / this.value);

        // Create new timer for playback
        if (this.playing) {
            this.createTimerStep(true);
        }

    }


    /** Convert percent value to relative time in MS */
    protected percentToMs(
        percent: number
    ) {
        return Math.floor(this.duration * (percent / 100));
    }

    /** Convert relative time in MS to percent value */
    protected msToPercent(
        ms: number
    ) {
        return (ms / this.duration) * 100;
    }



    /**
     * The main method that shall create a timer leading to the next step.
     * 
     * It might be called recursively to ensure fluent playback.
     */
    protected createTimerStep(
        recursive: boolean = false
    ) {

        if (this.duration === undefined || this.playing === false) {
            return;
        }

        const nextStep = this.loopStep + 1;
        const nextValue = nextStep * this.loopInterval;
        this.loopStep = nextStep;

        if (nextValue <= this.duration) {

            if (this.loopTimer) {
                clearTimeout(this.loopTimer);
            }

            this.loopTimer = setTimeout(() => {
                this.createTimerStep(recursive);
                this.value = nextValue;

            }, this.loopInterval);

        } else {
            this.playing = false;
        }


    }

    /**
     * Play the entire group
     */
    play() {

        if (this.playing === false) {
            this.playing = true;
            this.createTimerStep(true);
        }

    }

    /**
     * Stop the entire group
     */
    stop() {

        if (this.playing === true) {
            this.playing = false;
            if (this.loopTimer) {
                clearTimeout(this.loopTimer);
            }
        }

    }

    /**
     * Set the MS value to 0
     */
    reset() {
        if (this.value !== 0) {
            this.value = 0;
            this.loopStep = 0;
        }
    }









}