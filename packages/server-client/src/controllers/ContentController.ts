import { CallbacksManager } from "@labirthermal/core";
import type { ReactiveController } from "lit";
import type { AppWithClientController, ClientController } from "./ClientController";
import { AbstractConnectedController } from "./AbstractConnectedController";
import type { AbstractThermalElement } from "@labirthermal/webcomponents";
import type { BreadcrumbItem, FileInfo, FolderInfo, TreeItem } from "../client/responseEntities";
import type { GetGridDataType } from "../client/routes/get/GetGrid";
import type { ApiResponseType } from "../client/routes/ResponseTypes";

/** 
 * Public parameters of an application
 */
export interface AppWithContentController extends AppWithClientController {

    /** @property The main parameter indicating the current folder path */
    folderPath?: string;

    /** @property The main parameter indicating the current file name */
    fileName?: string;

    /** @property The view is locked to a specific path */
    lockedPath?: string;

    /** @property The folders to be displayed in the grid */
    gridFolders?: string[];

    client: ClientController

}

/**
 * This controller takes care of the entire content state management:
 * - fetching data from the server
 * - updates everywhere
 * - loading state (separate from the client controller who has a loading state of its own)
 */
export class ContentController extends AbstractConnectedController implements ReactiveController {

    host: AppWithContentController;

    
    private _folder?: FolderInfo;
    private _subfolders: FolderInfo[] = [];
    private _files?: FileInfo[];
    private _file?: FileInfo;
    private _grid?: GetGridDataType;
    private _breadcrumb?: BreadcrumbItem[];
    private _tree: TreeItem[] = [];
    private _userFolders: FolderInfo[] = [];

    private _gridFolders: FolderInfo[] = [];

    public get folder(): FolderInfo | undefined { return this._folder; }
    public get subfolders(): FolderInfo[] { return this._subfolders; }
    public get files(): FileInfo[] | undefined { return this._files; }
    public get file(): FileInfo | undefined { return this._file; }
    public get grid(): GetGridDataType | undefined { return this._grid; }
    public get breadcrumb(): BreadcrumbItem[] | undefined { return this._breadcrumb; }
    public get tree(): TreeItem[] { return this._tree; }
    public get userFolders(): FolderInfo[] { return this._userFolders; }

    public get gridFolders(): FolderInfo[] { return this._gridFolders; }



    public readonly onFolderUpdate: CallbacksManager<( folder?: FolderInfo ) => void> = new CallbacksManager();
    public readonly onSubfoldersUpdate: CallbacksManager<( subfolders?: FolderInfo[] ) => void> = new CallbacksManager();
    public readonly onFilesUpdate: CallbacksManager<( files?: FileInfo[] ) => void> = new CallbacksManager();
    public readonly onFileUpdate: CallbacksManager<( file?: FileInfo ) => void> = new CallbacksManager();
    public readonly onGridUpdate: CallbacksManager<( grid?: GetGridDataType ) => void> = new CallbacksManager();
    public readonly onBreadcrumbUpdate: CallbacksManager<( breadcrumb?: BreadcrumbItem[] ) => void> = new CallbacksManager();
    public readonly onTree: CallbacksManager<( tree?: TreeItem[] ) => void> = new CallbacksManager();
    public readonly onUserFoldersUpdate: CallbacksManager<( userFolders?: FolderInfo[] ) => void> = new CallbacksManager();

    public readonly onError: CallbacksManager<( error: string ) => void> = new CallbacksManager();


    private _isLoading: boolean = false;
    public get isLoading(): boolean { return this._isLoading; }

    private _whatIsLoading?: string;
    public get whatIsLoading(): string | undefined { return this._whatIsLoading; }

    /** Triggered whenever loading status changes */
    public readonly onLoadingChange: CallbacksManager<( isLoading: boolean, whatIsLoading?: string ) => void> = new CallbacksManager();


    

    constructor(
        host: AppWithContentController
    ) {
        super();
        this.host = host;
        host.addController(this);
    }

    hostConnected(): void {

        this.host.client.api.auth.onIdentity.set(
            this.host.UUID + "___USER_FOLDERS",
            ( identity, userFolders ) => {

                this._userFolders = userFolders || [];
                this.onUserFoldersUpdate.call( this._userFolders );
                this.host.requestUpdate();
            
            }
        )

    }

    hostDisconnected(): void {

    }

    hostUpdate(): void {


    }

    hostUpdated(): void {

    }

    private loadingStart( what?: string ): void {
        if ( what ) {
            this._whatIsLoading = what;
            this.host.requestUpdate();
        }
        if ( ! this._isLoading ) {
            this._isLoading = true
            this.onLoadingChange.call( true, what );
            this.host.requestUpdate();
        }
    }

    private loadingEnded(): void {
        if ( this._isLoading ) {
            this._isLoading = false;
            this._whatIsLoading = undefined;
            this.onLoadingChange.call( false );
            this.host.requestUpdate();
        }
    }



    /** Set the current folder state. Intended for API calls, but can be used by routers & buttons as well. This method tries to modify the current folder path property */
    public dangerouslySetFolder(
        folder: FolderInfo | undefined
    ): void {
        
        // If the object is identical, do nothing
        if (this._folder === folder) return;

        // If both objects are defined, merge them
        if ( this.folder && folder ) {
            Object.assign( this.folder, folder );
        } 
        // Otherwise just reassign the internal state
        else {
            this._folder = folder;
        }

        // Try to update the folder path property of the component
        if ( this.host.folderPath !== folder?.path ) {
            this.host.folderPath = folder?.path;
        }

        this.onFolderUpdate.call( this._folder! );

        this.host.requestUpdate();
    }

    /** Set the current subfolders state. Intended for API calls */
    public dangerouslySetSubfolders(
        subfolders: FolderInfo[] | undefined
    ): void {
        if (this._subfolders === subfolders) return;

        const orderedSubfolders = subfolders ? subfolders.sort( (a, b) => a.name.localeCompare( b.name ) ) : [];

        this._subfolders = orderedSubfolders;
        this.onSubfoldersUpdate.call( this._subfolders );
        this.host.requestUpdate();
    }

    /** Update the current state of the file. Intended for API calls. */
    public dangerouslySetFiles(
        files: FileInfo[] | undefined
    ): void {
        if (this._files === files) return;
        this._files = files;
        this.onFilesUpdate.call( this._files );
        this.host.requestUpdate();
    }

    /** Update the inner state of of the current file. Intended for API calls but can be used by routers or the UI as well. */
    public dangerouslySetFileState(
        file: FileInfo | undefined
    ): void {

        // Do nothing if the object is identical
        // if (this._file === file) return;

        // If both variables are defined, merge the both objects
        if ( this.file && file ) {
            Object.assign( this.file, file );
        } 
        // Otherwise, just override the internal state
        else {
            this._file = file;
        }

        // Update the fileName property of the host component
        if ( this.file ) {
            this.host.fileName = this.file.fileName;
        } else {
            this.host.fileName = undefined;
        }


        if ( this.files && this.files.length > 0 ) {

            let hasChanged = false;

            this.files.forEach( currentFile => {
                if ( currentFile.url === file?.url ) {
                    Object.assign( currentFile, file );
                    hasChanged = true;
                }
            } );

            if ( hasChanged ) {
                this.onFilesUpdate.call( this._files );
            }

        }


        this.onFileUpdate.call( this._file );

        // Call the update on the host
        this.host.requestUpdate();

    }

    /** Update the current grid state. Intended for API calls only. */
    public dangerouslySetGridState(
        grid?: GetGridDataType
    ): void {
        if (this._grid === grid) return;
        this._grid = grid;
        this.onGridUpdate.call( this._grid );
        this.host.requestUpdate();
    }

    private dangerouslySetTree(
        tree: TreeItem[]
    ): void {
        if ( this._tree === tree ) return;
        this._tree = tree;
        this.onTree.call( this._tree );
        this.host.requestUpdate();
    }

    private dangerouslySetBreadcrumb(
        breadcrumb: BreadcrumbItem[] | undefined
    ): void {

        this._breadcrumb = breadcrumb;
        this.onBreadcrumbUpdate.call( this._breadcrumb );
        this.host.requestUpdate();

    }

    /** 
     * Update the information about the folder wherever it is:
     * - in the main folder state if the path matches
     * - in the subfolders list if the path matches
     * - in the grid groups if the path matches
     * - in the grid header if the slug matches
     * - in the grid all_subdirectories if the slug matches
     */
    public updateFolderState(
        folder: FolderInfo
    ): void {

        // if the current folder is defined and matches, update it
        if ( this.folder && this.folder.path === folder.path ) {
            Object.assign( this.folder, folder );
            this.onFolderUpdate.call( this._folder );
        }

        // Iterate over current subfolders and update the all matching ones
        if ( this.subfolders ) {

            let hasChanged = false;

            this.subfolders.forEach( subfolder => {
                if ( subfolder.path === folder.path ) {
                    Object.assign( subfolder, folder );
                    hasChanged = true;
                };
            } );

            if ( hasChanged ) {
                this.onSubfoldersUpdate.call( this._subfolders );
            }

        }

        // Try to find the folder in the current grid and update it as well
        if ( this.grid && this.grid.folder && this.grid.folder.path !== folder.path ) {
            Object.assign( this.grid.folder, folder );
            this.onGridUpdate.call( this._grid );
        }

        // Look into the grid header as well
        if ( 
            this.grid 
            && this.grid.header 
            && this.grid.header[folder.slug] !== undefined
        ) {
            Object.assign( this.grid.header[folder.slug], folder );
            this.onGridUpdate.call( this._grid );
        }

        // Try to look in the all subdirectories of the grid
        if ( 
            this.grid 
            && this.grid.all_subdirectories 
            && this.grid.all_subdirectories[folder.slug] !== undefined
        ) {
            Object.assign( this.grid.all_subdirectories[folder.slug], folder );
        }

        // Look into the breadcrumb and eventually update the folder name there as well
        if ( this._breadcrumb ) {
            this._breadcrumb.forEach( item => {
                if ( item.path === folder.path ) {
                    item.name = folder.name;
                }
            })
        }

        // Let the host know about the update
        this.host.requestUpdate();

    }

    /** 
     * Update the information about a file wherever it is:
     * - in the main file state if the URL matches
     * - in the files list if the URL matches
     * - in the grid groups if the URL matches
     * - in the grid tags if the URL matches
    */
    public updateFileState(
        file: FileInfo
    ): void {

        // Update the main file state if necessary
        if ( this.file ) {
            Object.assign( this.file, file );
        }

        // Look at the current files and update the one that matches
        if ( this.files ) {
            this.files.forEach( currentFile => {
                if ( currentFile.url === file.url ) {
                    Object.assign( currentFile, file );
                    this.onFilesUpdate.call();
                }} 
            );
        }

        // Look into the grid of subfolders and update the matching file there
        if ( this.grid ) {

            // Update the file in the grid files
            for ( const group of Object.values( this.grid.groups ) ) {

                Object.values( group.folders ).forEach( folder => {

                    folder.forEach( fileInFolder => {
                        if ( fileInFolder.url === file.url ) {
                            Object.assign( fileInFolder, file );
                        }
                    } );

                } );

            }

            // Update the file in the tags as well
            for ( const tag of Object.values( this.grid.tags ) ) {

                for ( const folder of Object.values( tag.folders ) ) {
                    folder.forEach( fileInFolder => {
                        if ( fileInFolder.url === file.url ) {
                            Object.assign( fileInFolder, file );
                        }
                    } );

                }

            }

        }

        this.onFileUpdate.call( this._file );

        // Let the host know about the update
        this.host.requestUpdate();

    }

    /** Clear the entire content in this controller */
    public purgeContentState(): void {

        this._folder = undefined;
        this._subfolders = [];
        this._files = undefined;
        this._file = undefined;
        this._grid = undefined;

    }

    private throwIfNot200(
        response: ApiResponseType
    ): void {

        if ( response.success === false || response.code !== 200 ) {

            this.onError.call( response.message || "Neznámá chyba při komunikaci se serverem" );

            throw new Error(
                response.message,
                {
                    cause: {
                        code: response.code
                    }
                }
            )
        }

    }


    /** Request and update a folder information, storing also all subfolders */
    public async fetchFolder(
        folderPath: string
    ): Promise<void> {

        const result = await this.host.apiClient.routes.get
            .info( folderPath )
            .execute();

        this.throwIfNot200(result);

        if ( result.success ) {
            // Store loaded data right away
            this.dangerouslySetFolder( result.data.folder );
            this.dangerouslySetSubfolders( Object.values( result.data.subfolders ) );
            this.dangerouslySetBreadcrumb( result.data.breadcrumb );
        }

    }

    /** Request all files in a folder */
    public async fetchFiles(
        folderPath: string
    ): Promise<void> {

        const result = await this.host.apiClient.routes.get
            .files(folderPath)
            .execute();

        this.throwIfNot200(result);

        if ( result.success ) {
            this.dangerouslySetFiles( Object.values( result.data.files ) );
        }

    }

    /** Request the grid data for a folder */
    public async fetchGridData(
        folderPath: string,
        inclidedSubfolderPaths?: string[]
    ): Promise<void> {

        const request = this.host.apiClient.routes.get.grid( folderPath );

        if (  inclidedSubfolderPaths && inclidedSubfolderPaths.length > 0 ) {

            for ( const folder of inclidedSubfolderPaths ) {

                request.addFolder(folder);
            };

        }

        const result = await request.execute();

        this.host.requestUpdate();

        this.throwIfNot200(result);

        if ( result.success ) {
            this.dangerouslySetFolder( result.data.folder );
            this.dangerouslySetGridState( result.data );
        } else {
            this.dangerouslySetGridState( undefined );
        }

    }

    /** Fetch information about a file */
    public async fetchFile(
        folderPath: string,
        fileName: string
    ): Promise<void> {

        const result = await this.host.apiClient.routes.get
            .file(
                folderPath,
                fileName
            )
            .execute();

        this.throwIfNot200(result);
        
        if ( result.success ) {

            this.dangerouslySetFileState( result.data.file )

        }

    }

    /** Fetch the complete tree for the given user */
    public async fetchUserTree(): Promise<void> {

        const response = await this.host.apiClient.routes.get.currentUserTree().execute();

        this.throwIfNot200(response);

        const tree = response.data?.tree || [];

        this.dangerouslySetTree( tree );

    }



    public async fetchDeleteFile(
        folderPath: string,
        fileName: string
    ): Promise<void> {

        const result = await this.host.apiClient.routes.post.deleteFile(
            folderPath,
            fileName
        ).execute();

        this.throwIfNot200(result);

        // Delete the file from the current state if necessary
        if ( 
            this.file 
            && this.file.path === folderPath
            && this.file.fileName === fileName
        ) {
            this.dangerouslySetFileState( undefined );
        }

        // Delete the file from the list of files if necessary
        if ( 
            this.files 
            && this.files.length > 0 
        ) {
            const newFiles = this.files.filter( f => {

                if ( f.path.includes( folderPath ) || folderPath.includes( f.path ) ) {
                    return f.fileName !== fileName;
                }
                return true;
            });
            this.dangerouslySetFiles( newFiles );
        }

        // Delete the file from the grid if necessary
        if ( 
            this.grid
        ) {

            let hasChanged = false;

            Object.entries( this.grid.groups ).forEach( ( [groupKey, group] ) => {

                Object.entries( group.folders ).forEach( ([folderKey, folder]) => {
                    const newFiles = folder.filter( f => {
                        if ( f.path === folderPath ) {
                            return f.fileName !== fileName;
                        }
                        return true;
                    } );

                    if ( newFiles.length !== folder.length ) {
                        hasChanged = true;
                        this.grid!.groups[groupKey].folders[folderKey] = newFiles;
                    }

                } );

            } );

            if ( hasChanged ) {
                this.host.requestUpdate();
            }

        }



    }




    public subscribeToFolderUpdates(
        element: AbstractThermalElement
    ): void {

        this.onFolderUpdate.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );

    }

    public subscribeToFileUpdates(
        element: AbstractThermalElement
    ): void {
        this.onFileUpdate.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

    public subscribeToFilesUpdates(
        element: AbstractThermalElement
    ): void {
        this.onFilesUpdate.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

    public subscribeToSubfoldersUpdates(
        element: AbstractThermalElement
    ): void {
        this.onSubfoldersUpdate.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

    public subscribeToBreadcrumbUpdates(
        element: AbstractThermalElement
    ): void {
        this.onBreadcrumbUpdate.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

    public subscribeToGridUpdates(
        element: AbstractThermalElement
    ): void {
        this.onGridUpdate.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

    public subscribeToTreeUpdates(
        element: AbstractThermalElement
    ): void {
        this.onTree.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

    public subscribeToContentLoading(): void {
        this.onLoadingChange.set(
            this.host.UUID,
            () => {
                this.host.requestUpdate();
            }
        );
    }

    public unsubscribeFromAll(
        element: AbstractThermalElement
    ): void {
        this.onFolderUpdate.delete( element.UUID );
        this.onSubfoldersUpdate.delete( element.UUID );
        this.onFilesUpdate.delete( element.UUID );
        this.onFileUpdate.delete( element.UUID );
        this.onGridUpdate.delete( element.UUID );
        this.onBreadcrumbUpdate.delete( element.UUID );
        this.onTree.delete( element.UUID );
        this.onUserFoldersUpdate.delete( element.UUID );
    }

    public getRegistrySlug(): string {

        const items = [
            this.host.UUID
        ];

        if ( this.folder !== undefined ) {
            items.push( this.folder.path );
        }

        if ( this.file !== undefined ) {
            items.push( this.file.fileName );
        }

        if ( this.grid !== undefined ) {
            items.push( "grid" );
        }

        return items.join("__");

    }

    



}