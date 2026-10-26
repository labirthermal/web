import type { ApiClient } from "../ApiClient";
import type { ApiEditableEntity } from "../responseEntities";


export interface EntityObserver {}

export abstract class AbstractEntity<
    E extends ApiEditableEntity, 
    C extends EntityObserver
> {

    protected observers: Set<C> = new Set();
    protected connected: boolean = false;

    constructor(
        protected readonly client: ApiClient
    ) {}

    public abstract connect(): Promise<boolean>;
    public abstract disconnect(): void;

    public abstract persist(): Promise< E | void >;

    public abstract current(): E | undefined;

    public observe(observer: C): this {

        if ( ! this.observers.has(observer) ) {
            this.observers.add(observer);   
        }
        return this;
    }

    public unobserve(observer: C): this {

        if ( this.observers.has(observer) ) {
            this.observers.delete(observer);
        }
        return this;
    }


    protected emit(
        message: string,
        includeState: boolean = false,
        customData?: {[key: string]: any; } // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {

        this.onEmit( message, includeState, customData );

    }

    protected abstract onEmit(
        message: string,
        includeState: boolean,
        customData?: { [key: string]: any; } // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void;

}