import type { AppWithClientController } from "./ClientController";

export abstract class AbstractConnectedController {

    declare host: AppWithClientController;

    protected log(...args: any[]): void { // eslint-disable-line @typescript-eslint/no-explicit-any
        this.host.log( this.constructor.name, ...args);
    }

}