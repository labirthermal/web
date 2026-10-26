import { CallbacksManager } from "@labirthermal/core";
import { version } from "../../package.json";
import { Auth } from "./authentication/Auth";
import { Entities } from "./entities/Entities";
import { RequestFactory } from "./request/RequestFactory";
import type { ServerInfo } from "./responseEntities";
import { Routes } from "./routes/factories/Routes";
import type { GetConnectDataType } from "./routes/get/GetConnect";
import type { ApiResponseDataType, ApiResponseType } from "./routes/ResponseTypes";

/**
 * The client for accessing a remote LabIR server.
 * 
 * - needs to call the asynchronouse method `connect()` method before any other request
 * 
 * - if `auth.setSession()` is called before connection, the session ID shall be passed to the connected server. In case there is a logged-in user in the given session its credentials will be sent back and the user will be logged in automatically right after the connection.
 * 
 * - otherwise, a standard login request needs to be performed via the `routes.post.login()`
 * 
 * @package `@labirthermal/client`
 * 
 */
export class ApiClient {

    /**
     * Version of the API === version of the NPM package.
     */
    public static readonly VERSION: string = version;

    /** 
     * The core server URL ending with a slash 
     */
    private serverUrl: string;

    private _serverInfo?: ServerInfo;
    public get serverInfo(): ServerInfo | undefined {
        return this._serverInfo;
    }

    /**
     * The authentication service stores the session ID and also the identity of the currently logged in user.
     * - The authentication itself is provided by the operation `PostLogin` which is accessible through the `routes.post.login()` method.
     */
    public readonly auth: Auth;

    /**
     * The factories for creating requests to the API.
     * 
     * ```typescript
     * // Create a client
     * const client = new Client("http://localhost:8080");
     * 
     * // Connect it to the server
     * await client.connect();
     * 
     * // Create a request to list files inside a folder
     * const request = client.routes.get.files("path/to/folder");
     * 
     * request
     *  .setFrom( new Date("2023-01-01") ) // Set optional filter
     *  .setTo( new Date("2023-12-31") ) // Set optional filter
     *  .addTag( "tag-slug" ); // Set optional filter
     * 
     * // Execute the request
     * const result = await request.execute();
     * ```
     * 
     * All requests are created as instances of `Operation`, or one of its subclasses.
     * 
     * A request contains a hidden `RequestFactory` that is used to create the actual `Request` object. This object shall never be exposed nor manipulated publically.
     * Every individual `Operation` has its own methods for setting parameters, such as `setPath()`, `addTags()`, etc. 
     * 
     * These methods will store the data in the internal `RequestFactory` object. The `Operation` instance needs to be executed using its asynchronous `execute()` method, which will return a promise that resolves to an `ApiResponseType` object.
     * 
     * Note:
     * - upon creation of the `Client` instance, the route `connect` needs to be called
     * - after connection to the server, other requests are available
     */
    public readonly routes: Routes;


    /**
     * Access server entities directly and manipulate them using a comfortable API.
     * 
     * All entities are observable by their consuming objects, so there should be only one instance of every entity by its given identification.
     */
    public readonly entities: Entities = new Entities(this);

    /**
     * Needs to be set to `true` before any requests are made (with the exception of the `connect()` route).
     */
    private connected: boolean = false;

    public readonly onConnection: CallbacksManager<(status: false | ServerInfo) => void> = new CallbacksManager();

    public readonly onResult: CallbacksManager<(
        timestamp: number,
        success: boolean,
        code: boolean,
        message: boolean,
        method: string
    ) => void> = new CallbacksManager();

    private activeRequests: number = 0;

    public readonly onLoading: CallbacksManager<(loading: boolean) => void> = new CallbacksManager();

    public get loading(): boolean {
        return this.activeRequests > 0;
    }

    constructor(
        serverUrl: string,
        private readonly apiRoot: string = "/api/"
    ) {

        let composedUrl = serverUrl.trim()
        if (composedUrl.endsWith("/")) {
            composedUrl = composedUrl.slice(0, -1);
        }
        composedUrl += apiRoot.trim();

        this.serverUrl = composedUrl;
        if (!this.serverUrl.endsWith("/")) {
            this.serverUrl += "/";
        }

        this.auth = new Auth(this);
        this.routes = new Routes(this);

    }

    /** 
     * Tests the availability of the server, establishes the connection and stores the following data crucial for all subsequent requests:
     * - PHPSESSID is stored in `Auth.setSesson()` 
     * - if a logged-in user was found on the session, its credentials will be stored in `Auth.login()`
     */
    public async connect(): Promise<ApiResponseType<GetConnectDataType>> {

        // If already connected, throw an error
        if (this.connected) {
            throw new Error("Client is already connected.");
        }

        // Perform the connection request
        const request = this.routes.get.connect();

        try {
            const response = await request.execute();

            // Mark self as connected if the response was successful
            if (response.success === true) {
                this.connected = true;
                this._serverInfo = response.colophon.server;
                this.onConnection.call(response.colophon.server);
            } else {
                this.onConnection.call(false);
                this.onLoading.call(false);
            }

            return response;

        } catch (error) {

            this.onConnection.call(false);
            this.onLoading.call(false);

            const response: ApiResponseType<GetConnectDataType> = {
                success: false,
                code: 404,
                message: "Server is not available or network error occurred.",
                data: undefined,
                raw: {
                    request: {} as Request,
                    response: {} as Response, // No response because the server is not available
                },
                colophon: {
                    time: Date.now(),
                    server: {
                        name: "Unknown",
                        version: "unknown",
                        url: "unknown"
                    },
                    action: "connect",
                    path: "/",

                },
            }

            return response;

        }


    }

    /** 
     * Was this `Client` already connected using `Client.connect()`? 
     */
    public isConnected(): boolean {
        return this.connected;
    }

    /**
     * Creates a new RequestFactory instance
     * - do not use this method directly, use the `routes` property instead
     */
    public createRequest(): RequestFactory {
        return new RequestFactory(this);
    }

    /**
     * @returns The server URL with a trailing slash
     */
    public getServerUrl(): string {
        return this.serverUrl;
    }

    /**
     * @returns The API root path with slashes (e.g. '/api/')
     */
    public getApiRoot(): string {
        if (this.apiRoot.endsWith("/") && this.apiRoot.startsWith("/")) {
            return this.apiRoot;
        }
        else if (this.apiRoot.endsWith("/")) {
            return "/" + this.apiRoot;
        }
        else if (this.apiRoot.startsWith("/")) {
            return this.apiRoot + "/";
        }
        return "/" + this.apiRoot + "/";
    }

    public getPublicUrl(): string {

        if (this.serverUrl.endsWith(this.apiRoot)) {
            return this.serverUrl.slice(0, -this.apiRoot.length);
        }

        return this.serverUrl;

    }


    /** 
     * Automatically process every incoming response. 
     * - store the session ID in Auth class
     */
    private processResponse(
        response: Response
    ): void {

        const setCookie = response.headers.get("set-cookie") || "";
        const match = setCookie.match(/PHPSESSID=([^;]+)/);
        this.auth.setSession(match ? match[0] : undefined);

    }


    /** 
     * Processes a request factory created using `routes` 
     * 
     * All request factories need to be executed this way because there are necessary checks & processes upon every request:
     * - request is refused until the client is connected
     * - handling of unavailable server errors
     * - storage of the PHPSESSID in the `Auth` class
     * 
     * @todo implement emission of events using the `EventEmitter` class
     * @param factory The request factory to execute
     */
    public async fetch<R extends ApiResponseDataType>(
        factory: RequestFactory
    ): Promise<ApiResponseType<R>> {

        if (this.activeRequests === 0) {
            this.onLoading.call(true);
        }

        this.activeRequests++;


        if (factory.getAction() !== "connect" && this.connected === false) {
            throw new Error("Client is not connected to the server!");

        }

        const request = factory.createRequest();
        if (!request) {
            throw new Error("Invalid request configuration");
        }

        let response: Response;
        try {
            response = await fetch(request);
        } catch (error) {
            throw new Error("Server is not available or network error occurred.");
        }

        // Process the response
        this.processResponse(response);

        try {

            const json = await response.clone().json();

            json.raw = {
                request: request,
                response: response
            }

            // If the response failed completely, throw an error
            if (!response.ok) {
                throw new Error("Request was not successfull at all!");
            }

            this.activeRequests--;
            if (this.activeRequests === 0) {
                this.onLoading.call(false);
            }

            this.onResult.call(
                json.colophon.time,
                json.success,
                json.code,
                json.message,
                request.method
            )

            return json as ApiResponseType<R>;

        } catch (error) {

            const text = await response.clone().text();

            console.error("API Call ended with an error!", {
                request: request.url,
                JSerror: error,
                responseText: text
            });

            return {
                success: false
            } as ApiResponseType<R>

        }

    }

}