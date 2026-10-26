import type { AppWithClientController } from "./ClientController";

export abstract class AbstractConnectedController {

    declare host: AppWithClientController;

    protected log(...args: any[]): void {
        this.host.log( this.constructor.name, ...args);
    }

}