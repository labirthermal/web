import { AbstractAnalysis } from "../analysis/internals/AbstractAnalysis";
import { CallbacksManager } from "../../callbacksManager";

/** 
 * Analysis slot takes care of serialisation
 * 
 * Slot is an independent object that applies on the first 7 analysis.
 * All the serialisation is perfoemed here. An analysis does not know
 * about its slots at all.
 * 
 * One analysis may be in one slot only. Never in two slots.
 */
export class AnalysisSlot {

    private _analysis: AbstractAnalysis;
    public get analysis() { return this._analysis; }

    private _serialized: string;
    public get serialized() { return this._serialized; }

    /** @deprecated Serialisation is emitted by the driver. This emitter is used mainly in tests, but not elsewhere. */
    public readonly onSerialize = new CallbacksManager<(serializedValue: string, analysis: AbstractAnalysis) => void>;

    /** Serialisation is done in the next tick */
    protected enqueuedSerialisation?: ReturnType<typeof setTimeout>;

    public constructor(
        public readonly slot: number,
        analysis: AbstractAnalysis
    ) {
        this._analysis = analysis;
        this.hydrate(analysis);
        this._serialized = this.analysis.toSerialized();
        this.propagateSerialisationUp( this._serialized );
    }

    /** Generate the listener key for this slot */
    private listenerKey(operation: string): string {
        return `slot ${this.slot} ${operation}`;
    }

    /** Remove all listeners created by this slot */
    private dehydrate(analysis: AbstractAnalysis) {

        analysis.onSerializableChange.delete(this.listenerKey("serializable change"));

    }


    /** Add all listeners to the analysis object */
    private hydrate(analysis: AbstractAnalysis) {

        // Serialize whenever name changes
        analysis.onSerializableChange.set(this.listenerKey("serializable change"), () => { 
            this.enqueueSerialisation();
        });

    }

    protected enqueueSerialisation() {
        if (!this.enqueuedSerialisation) {
            this.enqueuedSerialisation = setTimeout(() => {
                this.serialize();
                this.enqueuedSerialisation = undefined;
            }, 0);
        }
    }

    protected serialize() {
        this._serialized = this.analysis.toSerialized();
        
        this.onSerialize.call(this._serialized, this.analysis);

        this.propagateSerialisationUp( this._serialized );
        
    }

    public recieveSerialized(
        serialized: string
    ) {

        this.analysis.recievedSerialized(serialized);

        /** Serialize again for control */
        const newSerialized = this.analysis.toSerialized();

        if (newSerialized !== serialized) {

            this._serialized = newSerialized;

            this.onSerialize.call(this._serialized, this.analysis);

        }

    }


    /** Call global and particular callbacks */
    protected propagateSerialisationUp( value: string|undefined ) {

        const manager = this.analysis.file.slots.getOnSerializeManager( this.slot );

        if ( manager ) {
            manager.call( value );
            this.analysis.file.slots.markAsChanged();
        }

    }

}