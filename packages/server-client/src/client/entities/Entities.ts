import type { ApiClient } from "../ApiClient";
import type { ConnectsToFolder} from "./Folder";
import { Folder } from "./Folder";

export class Entities {

    protected readonly folders: Map<string, Folder> = new Map();

    constructor(
        protected readonly client: ApiClient
    ) {}


    /** 
     * Creates a connection to a folder
    */
    public async connectToFolder(
        path: string,
        observer: ConnectsToFolder
    ): Promise<Folder> {


        if ( this.folders.has( path ) ) {
            const entity = this.folders.get( path ) as Folder;
            entity.observe( observer );
            return entity;
        }

        const folder = new Folder( this.client, path );

        folder.observe( observer );
        this.folders.set( path, folder );

        const connected = await folder.connect();
        if ( ! connected ) {
            throw new Error(`Could not connect to folder at path: ${path}`);
        }

        return folder;

    }


    

}