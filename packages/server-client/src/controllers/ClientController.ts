import { CallbacksManager } from "@labirthermal/core";
import type { ReactiveController } from "lit";
import type { AbstractThermalElement } from "@labirthermal/webcomponents";
import { AbstractConnectedController } from "./AbstractConnectedController";
import type { ApiClient } from "../client/ApiClient";
import type { Identity, ServerInfo } from "../client/responseEntities";

/** Public properties for application elements using ClientController */
export interface AppWithClientController extends AbstractThermalElement {
    /** URL Address of the webserver */
    serverUrl: string;
    /** API root path of the server. */
    serverApiRoot: string;
    /** The main client instance*/
    apiClient: ApiClient;
    /** Authentication url */
    authUrl?: string;
    /** Authentication token */
    authToken?: string;
}

/** 
 * Basic reactive controller for applications connected to the API 
 */
export class ClientController extends AbstractConnectedController implements ReactiveController {

    host: AppWithClientController;

    // Internal states

    private _isLoading: boolean = false;
    private _whatIsLoading?: string;
    private _loadingError?: string;
    private _isClientConnected: boolean = false;
    private _isLoggedIn: boolean = false;
    private _isRoot: boolean = false;
    private _identity?: Identity;
    private _serverInfo?: ServerInfo;

    // Public accessors
    public get isLoading(): boolean { return this._isLoading; }
    public get whatIsLoading(): string | undefined { return this._whatIsLoading; }
    public get loadingError(): string | undefined { return this._loadingError; }
    public get isClientConnected(): boolean { return this._isClientConnected; }
    public get isLoggedIn(): boolean { return this._isLoggedIn; }
    public get isRoot(): boolean { return this._isRoot; }
    public get identity(): Identity | undefined { return this._identity; }
    public get serverInfo(): ServerInfo | undefined { return this._serverInfo; }

    public get api(): ApiClient {
        return this.host.apiClient;
    }

    public readonly onLoadingChange = new CallbacksManager<(value: boolean) => void>();

    public readonly onIdentity: CallbacksManager<(
        identity?: Identity,
        isRoot?: boolean
    ) => void> = new CallbacksManager();

    private _hasCalledReadyForContentRequests: boolean = false;

    /** Callbacks that needs will be triggered after the client is ready for content requests:
     * - after connection
     * - after the eventual login
     */
    public readonly onReadyForContentRequests = new CallbacksManager<() => void>();

    public readonly onServerInfoUpdate = new CallbacksManager<() => void>();

    

    /** Unique identificator for the purpose of event listeners */
    private UUID: string;

    constructor(
        host: AppWithClientController
    ) {

        super();

        this.host = host;

        this.UUID = this.host.UUID + "__client_controller"

        host.addController(this);

    }

    async hostConnected(): Promise<void> {

        const shouldLogin = this.host.authUrl && this.host.authToken;

        /** After the server responds and is connected */
        this.host.apiClient.onConnection.set(
            this.UUID,
            async status => {

                // Setup connection state
                this.setIsClientConnected(status !== false);

                // Ulož server info
                this.setServerInfo( status || undefined )

                /** @todo Zde by mělo být přihlašování postaru, ale uděláme to pak přes cookie... */

                await this.initialLogin();

                if ( !shouldLogin ) {
                    this.onIdentity.call( this.identity, this.isRoot );
                    this.callReadyForContentRequestsIfNotAllready();
                }

                this.host
                    .log( 
                        "Client connection status changed:", 
                        status
                    );


            }
        );

        this.host.apiClient.auth.onIdentity.set(
            this.UUID,
            identity => {

                if ( identity ) {
                    this.setIdentity(identity);
                    this.setIsLoggedIn(true);
                    this.setIsRoot(identity.meta.is_root);
                } else {
                    this.setIdentity(undefined);
                    this.setIsLoggedIn(false);
                    this.setIsRoot(false);
                }

                if ( shouldLogin ) {
                    this.callReadyForContentRequestsIfNotAllready();
                }

                this.onIdentity.call( this.identity, this.isRoot );

            }

        );

        this.loadingStart();

        await this.host.apiClient.connect();

        this.loadingSuccessfull();

    }

    hostDisconnected(): void {

    }

    hostUpdate(): void {

    }

    hostUpdated(): void {

    }

    private async initialLogin(): Promise<void> {

        if ( this.isClientConnected ) {

            if ( this.host.authUrl && this.host.authToken ) {

                this.loadingStart(
                    "Přihlašuji se k serveru..."
                );

                // Pokud jsme přihlášení, tak odhlásit
                if ( this.host.apiClient.auth.isLoggedIn() ) {
                    await this.host.apiClient.routes.post.logout().execute();
                }

                const request = new Request(
                    this.host.authUrl,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            token: this.host.authToken
                        })
                    }
                );

                const response = await fetch( request );

                const body = await response.json();

                if ( !body.success ) {

                    this.loadingFailed( "Nepodařilo se ověřit uživatele." );
                    return;

                }

                const user = body.data.user;
                const pass = body.data.pass;

                await this.host.apiClient.routes.post
                    .login( user, pass )
                    .execute();

            }

        }

    }

    public loadingStart(
        what?: string
    ): void {
        this._whatIsLoading = what;
        this._loadingError = undefined;
        if ( this._isLoading ) return;
        this._isLoading = true;
        this.onLoadingChange.call( true );
        this.host.requestUpdate();
    }

    public loadingSuccessfull(): void {
        if ( !this._isLoading ) return;
        this._isLoading = false;
        this._whatIsLoading = undefined;
        this._loadingError = undefined;
        this.onLoadingChange.call( false );
        this.host.requestUpdate();
    }

    public loadingFailed(
        error?: string
    ): void {
        if ( !this._isLoading ) return;
        this._isLoading = false;
        this._whatIsLoading = undefined;
        this._loadingError = error;
        this.onLoadingChange.call( false );
        this.host.requestUpdate();
    }

    // Internal setters

    private setIsClientConnected(value: boolean): void {
        if (this._isClientConnected === value) return;
        this._isClientConnected = value;
        this.host.requestUpdate();
    }

    private setIsLoggedIn(value: boolean): void {
        if (this._isLoggedIn === value) return;
        this._isLoggedIn = value;
        this.host.requestUpdate();
    }

    private setIsRoot(value: boolean): void {
        if (this._isRoot === value) return;
        this._isRoot = value;
        this.host.requestUpdate();
    }

    private setIdentity(value: Identity | undefined): void {
        if (this._identity === value) return;
        this._identity = value;
        this.host.requestUpdate();
    }

    private setServerInfo(value: ServerInfo | undefined): void {
        if (this._serverInfo === value) return;
        this._serverInfo = value;
        this.host.requestUpdate();
    }


    /**
     * This event will be called once, when the client is connected and logged in eventually.
     * It is used by other controllers who will then fire their content requests.
     */
    private callReadyForContentRequestsIfNotAllready(): void {
        if ( this._hasCalledReadyForContentRequests ) return;

        this._hasCalledReadyForContentRequests = true;
        this.onReadyForContentRequests.call();
    }




    public subscribeToIdentityChanges(
        element: AbstractThermalElement
    ): void {
        this.onIdentity.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

    public subscribeToLoadingChanges(
        element: AbstractThermalElement
    ): void {
        this.onLoadingChange.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

    public subscribeToServerInfoUpdates(
        element: AbstractThermalElement
    ): void {
        this.onServerInfoUpdate.set(
            element.UUID,
            () => {
                element.requestUpdate();
            }
        );
    }

}