import type { ApiClient } from "../ApiClient";
import type { FolderInfo } from "../responseEntities";
import type { EntityObserver } from "./AbstractEntity";
import { AbstractEntity } from "./AbstractEntity";
import { MutableProperty } from "./MutableProperty";

export type ConnectsToFolder = EntityObserver & {
    onFolderChanged(
        message: string,
        currentState?: FolderInfo,
        changes?: { [key: string]: any; } // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void;
}

export class Folder extends AbstractEntity<FolderInfo, ConnectsToFolder> {

    protected info?: FolderInfo;

    public readonly update: {
        name: MutableProperty<Folder, string>,
        description: MutableProperty<Folder, string>,
    };


    public constructor(
        client: ApiClient,
        protected path: string
    ) {
        super(client);

        this.update = {
            name: new MutableProperty<Folder, string>(this, "name"),
            description: new MutableProperty<Folder, string>(this, "description"),
        };

    }


    private forEveryUpdate(
        fn: (property: MutableProperty<any, any>) => void // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void {
        Object.values(this.update).forEach(fn);
    }


    public resetUpdaates() {
        this.forEveryUpdate(property => property.reset());
    }


    public async persist(): Promise<FolderInfo|void> {

        // 1. Create the update request
        const request = this.client.routes.post.updateFolder( this.path );


        // 2. Enqueue all pending updates

        // 2.1. Name
        if (this.update.name.isPending()) {
            request.setName(this.update.name.getEnqueued()!);
        }

        // 2.2. Description
        if (this.update.description.isPending()) {
            request.setDescription(this.update.description.getEnqueued()!);
        }


        // 3. Execute the mutation
        const result = await request.execute();

        // 4. If the change was successfull, assamble record and emit
        if (result.success === true) {

            // 4.1. Assign the new state
            this.info = result.data!.result.info;

            // 4.2. Assamble changes
            const mutations: [string, any][] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

            this.forEveryUpdate(property => {

                if (this.info !== undefined && property.isPending()) {

                    // 4.2.1. If the property has a pending change, report it
                    const report = property.report(this.info[property.name as keyof FolderInfo]);

                    if (report !== false) {
                        mutations.push(report);
                    }

                    property.reset();

                }

            });

            const report = Object.fromEntries( mutations );

            this.emit("updated", true, report);

            return this.info;

        }

        return;

    }


    public current(): FolderInfo | undefined {
        return this.info;
    }


    public async connect(): Promise<boolean> {

        const request = this.client.routes.get.info( this.path );

        const response = await request.execute();

        if (response.success === true) {

            this.info = response.data.folder;

            this.connected = true;

            this.emit("connected", true);

            return true;
        }

        return false;

    }


    public disconnect() {
        this.connected = false;
        this.emit("disconnected", false);
    }


    protected onEmit(
        message: string,
        includeState: boolean,
        customData?: { [key: string]: any; } // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void {

        this.observers.forEach(observer => {

            const info = includeState
                ? this.current()
                : undefined;

            observer.onFolderChanged(message, info, customData);

        });

    }


}