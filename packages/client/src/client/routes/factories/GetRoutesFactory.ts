import type { ApiClient } from "../../ApiClient";
import { GetConnect } from "../get/GetConnect";
import { GetCurrentUserTree } from "../get/GetCurrentUserTree";
import { GetInto } from "../get/GetInfo";
import { GetFile } from "../get/GetFile";
import { GetFiles } from "../get/GetFiles";
import { GetGrid } from "../get/GetGrid";

/**
 * Factory for creating GET routes
 * 
 * @package `@labirthermal/webcomponents`
 */
export class GetRoutesFactory {

    constructor(
        protected readonly client: ApiClient
    ) { }
    
    /**
     * Connects to a server, eventually returning the existing identity of the currently logged-in user.
     * 
     * If you want to load existing user identity, you need to pass the PHPSESSID to the client before calling this method using `auth.setSession()`.
     * 
     * ```typescript
     * const client = new Client("http://localhost:8080");
     * await client.auth.setSession("PHPSESSID=1234567890abcdef"); // Set the session ID
     * await client.connect(); // This method is accessible from the Client object itself
     * ```
     */
    public connect(): GetConnect {
        return (new GetConnect(this.client)).init();
    }

    /**
     * Get information about a folder.
     * 
     * ```typescript
     * const client = new Client("http://localhost:8080");
     * await client.connect();
     * const request = client.routes.get.info("path/to/folder");
     * // Configure request:
     * request.setPath("path/to/folder"); // already set by factory
     * const result = await request.execute();
     * ```
     * 
     * @param path Path of the folder.
     */
    public info(
        path: string
    ): GetInto {
        return (new GetInto(this.client))
            .init()
            .setPath(path);
    }

    /**
     * List of files in the given folder.
     * 
     * ```typescript
     * const client = new Client("http://localhost:8080");
     * await client.connect();
     * const request = client.routes.get.files("path/to/folder");
     * request
     *  .setFrom(new Date("2023-01-01")) // Optional filter
     *  .setTo(new Date("2023-12-31")) // Optional filter
     *  .addTag("tag-slug"); // Optional filter
     * const result = await request.execute();
     * ```
     * 
     * @param path Path to the folder from which you want to get the files
     */
    public files(
        path: string
    ): GetFiles {
        return (new GetFiles(this.client))
            .init()
            .setPath( path );
    }

    /**
     * List of files in the given folder.
     * 
     * ```typescript
     * const client = new Client("http://localhost:8080");
     * await client.connect();
     * const request = client.routes.get.files("path/to/folder");
     * // Configure request:
     * request.setFrom(new Date("2023-01-01")); // Optional filter
     * request.setTo(new Date("2023-12-31"));   // Optional filter
     * request.addTag("tag-slug");              // Optional filter
     * const result = await request.execute();
     * ```
     * 
     * @param path Path to the folder from which you want to get the files
     */
    public grid(
        path: string
    ): GetGrid {
        return (new GetGrid(this.client))
            .init()
            .setPath( path );
    }

    /**
     * Generate the grid from subfolders inside the given directory.
     * 
     * ```typescript
     * const client = new Client("http://localhost:8080");
     * await client.connect();
     * const request = client.routes.get.grid("path/to/folder");
     * const result = await request.execute();
     * ```
     * 
     * @param path Path to the folder from which you want the grid to be generated
     * @param filename Name of the LRC file
     */
    public file(
        path: string,
        filename: string
    ): GetFile {
        return (new GetFile(this.client))
            .init()
            .setPath( path )
            .setFileName( filename );
    }

    /**
     * Get list of folders accessible by the currently logged-in user.
     * 
     * ```typescript
     * const client = new Client("http://localhost:8080");
     * await client.connect();
     * const request = client.routes.get.currentUserTree();
     * const result = await request.execute();
     * ```
     */
    public currentUserTree(): GetCurrentUserTree {
        return (new GetCurrentUserTree(this.client)).init();
    }

}