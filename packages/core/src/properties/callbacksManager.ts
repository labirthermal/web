
/**
 * Manage callbacks on optional property values. All callbacks are registered with a unique key. This class extends the built-in `Map` class.
 * 
 * @module @labirthermal/core
 * @author Jan Jáchim <jachim@zcu.cz>
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class CallbacksManager<CallbackType extends (...args: any[]) => any> extends Map<string,CallbackType> {

    /** An alternative to built-in `set` method enabling one-shot callbacks */
    add( 
        key: string, 
        callback: CallbackType, 
        oneShot: boolean = false
    ) {
        if ( oneShot ) {

            this.set(key, ((...args: Parameters<CallbackType>) => {
                callback(...args);
                this.delete(key);
            }) as CallbackType);

        } else {
            this.set(key, callback);
        }
    }

    /** Trigger all registered callbacks wuth the provided value(s) */
    call( ...args: Parameters<CallbackType> ) {
        this.forEach( fn => fn( ...args ) );
    }

}