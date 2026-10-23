import type { ReactiveController } from "lit";
import type {  AbstractThermalElement } from "../hierarchy/AbstractThermalElement";


/** 
 * This is the abstract class for all reactive controllers from the `@labirthermal/webcomponents` package. 
 * @module @labirthermal/webcomponents
 */
export abstract class AbstractReactiveController<T extends AbstractThermalElement> implements ReactiveController {

    host: T;

    /** Implement this method somehow to combine the host UUID and a unique marker of the controller. */
    public abstract get UUID(): string;

    constructor(host: T) {
        this.host = host;
        host.addController(this);
    }

    abstract hostConnected(): void;

    abstract hostDisconnected(): void;

    /** Logs anything using the host's logging mechanism. Adds the controller's className as the first argument. */
    protected log(...args: any[]): void { // eslint-disable-line @typescript-eslint/no-explicit-any
        this.host.log(
            this.constructor.name,
            ...args
        );
    }

}