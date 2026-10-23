import { ParsedFileFrame, ParsedTimelineFrame } from "../../../../loading/workers/parsers/structure";
import { TimelineChangedStatusType, TimelineDrive } from "../TimelineDrive";

export class FrameBuffer {

    /** @internal use accessors to get and set with side effects */
    protected _currentFrame!: ParsedFileFrame;

    /** The current frame data @readonly */
    public get currentFrame() { return this._currentFrame; }

    /** Upon every update of current frame, propagate current pixels to the instance */
    protected set currentFrame( frame: ParsedFileFrame ) {
        this._currentFrame = frame;
        this.drive.parent.setPixels( this.currentFrame.pixels );
    }

    /** Get the current step value calculated from _currentFrame */
    public get currentStep() {
        return this.drive.stepsByAbsolute.get( this._currentFrame.timestamp)!;
    }

    /** Number of images to preload at once */
    readonly bufferSize:number =  3;
    /** The actual buffer holding pair of step & frame */
    protected buffer: Map<ParsedTimelineFrame,ParsedFileFrame> = new Map;
    /** Accessor to array of steps preloaded in the given moment */
    public get preloadedSteps() {
        return Array.from( this.buffer.keys() );
    }
    /** Accessor to array of relative timestamps preloaded in the given moment */
    public get preloadedTimestampsRelative() {
        return this.preloadedSteps.map( step => step.relative );
    }


    constructor(
        protected readonly drive: TimelineDrive,
        firstFrame: ParsedFileFrame
    ) {
        this.currentFrame = firstFrame;
    }

    public async init() {
        return await this.preloadAfterFrameSet( this.currentStep );
    }



    /**
     * Activate a step
     * - look for the buffer for the corresponding frame
     * - if there is a corresponding frame, apply it
     * - if there is none, fetch it
     * - if sequence, fetch buffer
     * 
     * **THIS IS THE MAIN SETTER**
     */
    public async recieveStep(
        step: ParsedTimelineFrame
    ): Promise<TimelineChangedStatusType> {

        // CURRENT FRAME

        // Look if the frame is already buffered
        let frame = this.buffer.get( step );

        // If the frame is not buffered, fetch it)
        if ( frame === undefined ) {
            frame = await this.drive.parent.reader.frameData( step.index );
        }


        // Store the new frame and trigger the callback
        this.currentFrame = frame;

        
        // BUFFER NEEDS TO BE UPDATED LAST

        // Preload the nearest frames
        const status = await this.preloadAfterFrameSet( step );

        return status;


    }


    /** Preload frame data to the buffer based on the provided step */
    protected async preloadAfterFrameSet( step: ParsedTimelineFrame ): Promise<TimelineChangedStatusType> {

        // Get steps that should be in the buffer

        // Select steps from this index
        const subsetStart = step.index + 1 < this.drive.relativeSteps.length
            ? step.index + 1
            : NaN;

        // Select steps to this index
        const subsetEnd = isNaN( subsetStart )
            ? NaN
            : this.drive._validateIndex( subsetStart + this.bufferSize );

        // Do nothing if subset is invalid
        if (
            ( isNaN( subsetStart ) || isNaN( subsetEnd ) )
            || subsetStart > subsetEnd
            || subsetStart === subsetEnd
        ) {

            if ( step.relative === this.drive.parent.duration ) {
                this.buffer.clear();
            }

            return {
                absoluteTime: this.drive.currentStep.absolute,
                relativeTime: this.drive.value,
                currentFrame: this.currentFrame,
                currentStep: this.currentStep,
                buffer: this.preloadedSteps,
                preloaded: false,
                hasChanged: true
            };

        }

        // Steps that should be in the buffer
        const stepsThatShouldBe = Array.from( this.drive.stepsByIndex.values() ).filter( step => {
            return step.index >= subsetStart && step.index < subsetEnd
        } );


        // Get only those new steps that are not in the buffer
        const newSteps = stepsThatShouldBe.filter( step => ! this.preloadedSteps.includes( step ) );

        // Asynchronously read the frames
        const newFrames = await Promise.all( newSteps.map( step => {
            return this.drive.parent.reader.frameData( step.index )
        } ) );

        // Add new steps to the registry
        newFrames.forEach( ( frame, index ) => {
            const step = newSteps[index];
            this.buffer.set( step, frame );
        } );

        // Remove all values that are not in new Steps
        this.preloadedSteps.forEach( (step) => {
            if ( ! stepsThatShouldBe.includes( step ) ) {
                this.buffer.delete( step );
            }
        } );

        return {
            absoluteTime: this.drive.currentStep.absolute,
            currentFrame: this.currentFrame,
            currentStep: this.currentStep,
            relativeTime: this.drive.value,
            buffer: this.preloadedSteps,
            preloaded: true,
            hasChanged: true
        }

    }

}