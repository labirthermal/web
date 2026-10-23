import { CallbacksManager } from "../properties/callbacksManager";

export type AbstractFilterParameters = {
    key: number,
    text: string
}

export abstract class AbstractFilter<T extends AbstractFilterParameters = AbstractFilterParameters> {

    protected _bypass = false;
    public get bypass() { return this._bypass; }
    public setBypass( value: boolean ) {
        if ( value !== this._bypass ) {
            this._bypass = value;
            this.onBypass.call( value );
        }
    }
    
    public readonly onBypass = new CallbacksManager<( value: boolean )=>void>();

    public readonly onParameterChanged = new CallbacksManager<(parameters: T ) => void>;

    protected parameterChanged() {
        this.onParameterChanged.call( this.getParameters() );
    }

    protected abstract getParameters(): T;

    public abstract apply( 
        buffer: ArrayBuffer
    ): Promise<ArrayBuffer>

}