import type { ApiClient } from "../ApiClient";

type AvailableMethod = "GET" | "POST";

/**
 * An universal factory of requests to LabIR servers.
 * 
 * It is intended to be used in the `routes` factories, such as `GetRoutesFactory` or `PostRoutesFactory`. 
 * 
 * These classes take care of all the parameters settings and this RequestFactory shall never be exposed publically.
 * 
 * **Functionality**
 * - accepts the query parameters, body and header contents
 * - creates a `Request` object that is used internally by `Client.fetch()`
 * - takes care of passing credentials and session ID to the request
 * 
 */
export class RequestFactory {

    protected path?: string = undefined;
    protected method: AvailableMethod = "GET";
    protected action?: string = undefined;
    protected query: Map<string, string> = new Map<string, string>();
    protected body: { [key: string]: any } = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    protected headers: { [key: string]: string } = {};
    protected files: { [key: string]: File } = {};


    constructor(
        protected readonly client: ApiClient
    ) {}

    public setPath(
        value: string
    ): RequestFactory {
        value = value.replace(/^\/+|\/+$/g, "");
        this.path = value;
        return this;
    }

    public setMethod(
        value: AvailableMethod
    ): RequestFactory {
        this.method = value;
        return this;
    }

    public setAction(
        value: string
    ): RequestFactory {
        this.action = value;
        return this;
    }

    public addQueryParameter(
        key: string,
        value: string
    ): RequestFactory {
        this.query.set(key, value);
        return this;
    }

    public addBodyParameter(
        key: string,
        value: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): RequestFactory {
        this.body[key] = value;
        return this;
    }

    public addHeader(
        key: string,
        value: string
    ): RequestFactory {
        this.headers[key] = value;
        return this;
    }

    public addFile(
        key: string,
        file: File
    ): RequestFactory {
        this.files[key] = file;
        return this;
    }


    protected createRequestInit(): {
        url: URL;
        options: RequestInit;
    }|false {

        const isValidRequestToRoot = [
            "connect",
            "login",
            "logout",
            "currentusertree"
        ].includes(this.action || "");

        if (this.path === undefined && !isValidRequestToRoot) {
            return false;
        }

        let address = this.client.getServerUrl();
        if (!isValidRequestToRoot) {
            address += this.path;
        }

        const queryString: { [key: string]: string } = {};
        if (this.action !== undefined) {
            queryString["action"] = this.action;
        }
        if (this.query.size > 0) {
            this.query.forEach((value, key) => {
                queryString[key] = value;
            });
        }
        if (Object.keys(queryString).length > 0) {
            address += "?";
            address += new URLSearchParams(queryString).toString();
        }
        const url = new URL(address);

        const headers: Record<string, string> = { ...this.headers };

        if (this.client.auth.isLoggedIn()) {
            headers["Authorization"] = this.client.auth.getAuthorisationHeader() || "";
        }

        const session = this.client.auth.getSession();
        if (session) {
            headers["Cookie"] = session;
        }

        const options: RequestInit = {
            method: this.method,
            headers,
            credentials: "include",
        };
        
        return {
            url,
            options
        };

    }


    /**
     * Vytvoří Request s application/json body (bez souborů)
     */
    protected createRequestJson(): Request|false {

        const init = this.createRequestInit();

        if ( init !== false ) {

            const { url, options } = init;

            if ( this.method === "POST" && Object.keys(this.body).length > 0 ) {
                options.body = JSON.stringify(this.body);
            }

            const finaleOptions = {
                ...options,
                headers: {
                    ...options.headers,
                    "Content-Type": "application/json",
                }
            }

            return new Request(url, finaleOptions);

        }

        return false;
        

    }

    /**
     * Vytvoří Request s multipart/form-data (pro upload souborů)
     */
    protected createRequestFormData(): Request|false {
        // Využij společnou logiku pro URL, hlavičky atd.
        const init = this.createRequestInit();
        if (init === false) {
            return false;
        }
        const { url, options } = init;

        // Vytvoř FormData a naplň ji body parametry a soubory
        const formData = new FormData();
        for (const [key, value] of Object.entries(this.body)) {
            formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
        }
        for (const [key, file] of Object.entries(this.files)) {
            formData.append(key, file, file.name);
        }

        // Content-Type NENASTAVUJEME! FormData jej nastaví automaticky včetně boundary.
        const finaleOptions: RequestInit = {
            ...options,
            body: formData,
        };
        // Pokud by v headers zůstal Content-Type, odstraníme ho (pro jistotu)
        if (
            finaleOptions.headers 
            && typeof finaleOptions.headers === 'object' 
            && !Array.isArray(finaleOptions.headers) 
            && "Content-Type" in finaleOptions.headers 
        ) {
            delete finaleOptions.headers["Content-Type"];
        }

        return new Request(url, finaleOptions);
    }

    public createRequest(): Request|false {

        // Rozhodnutí, kterou metodu použít, bude doplněno později
        // (zatím zachováme původní chování pro zpětnou kompatibilitu)

        if (Object.keys(this.files).length > 0) {
            // Pokud předáváme soubory, použijeme multipart/form-data
            return this.createRequestFormData();
        } else {
            // Jinak použijeme application/json
            return this.createRequestJson();
        }
    }

    public getAction(): string|undefined {
        return this.action;
    }


}