import type { AbstractEntity } from "./AbstractEntity";

type MutablePropertyType = string | number | boolean;

/** A property that may accept changes and generates its report when changed */
export class MutableProperty<
    E extends AbstractEntity<any, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
    T extends MutablePropertyType
> {

    constructor(
        protected entity: E,
        public readonly name: string
    ) {}

    protected pending?: T;

    /** Is there a pending change in this property? */
    public isPending(): boolean {
        return this.pending !== undefined;
    }
    
    /** Gets the value that shall be persisted. */
    public getEnqueued(): T | undefined{
        return this.pending;
    }

    /** Enqueue a change of the new value */
    public enqueue(
        newValue: T
    ) {
        this.pending = newValue;
    }

    /** Reset any mutations */
    public reset() {
        this.pending = undefined;
    }

    /** Generate the report entry for mutations message */
    public report(
        updatedValue: T | undefined = undefined
    ): [string, T] | false {
        if ( updatedValue !== undefined ) {
            return [this.name, updatedValue];
        }
        return false;
    }



}