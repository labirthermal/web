import type { ApiClient } from "../ApiClient";
import type { Identity } from "../responseEntities";
import type { FolderInfo } from "../responseEntities";
import { CallbacksManager } from "@labirthermal/core";

export class Auth {

    protected identity?: Identity;
    protected session?: string;

    public readonly onIdentity: CallbacksManager<(identity: Identity|undefined, userFolders?: FolderInfo[]) => void> = new CallbacksManager();

    constructor(
        protected readonly client: ApiClient
    ) {
    }

    public isLoggedIn(): boolean {
        return this.identity !== undefined;
    }

    public login(
        identity: Identity,
        userFolders?: FolderInfo[]
    ): void {
        this.identity = identity;
        this.onIdentity.call(this.identity, userFolders);
    }

    public logout(): void {
        this.identity = undefined;
        this.onIdentity.call(undefined);
    }

    public setSession(
        value: string | undefined
    ) {
        this.session = value;
    }

    public getSession(): string | undefined {
        return this.session;
    }

    public getIdentity(): Identity | undefined {
        return this.identity;
    }

    public getAuthorisationHeader(): string | undefined {
        if (this.identity) {
            // Cross-platform base64 encoding that works in both Node.js and browser
            const credentials = this.toBase64(`${this.identity.user}:${this.identity.token}`);
            return `Basic ${credentials}`;
        }
        return undefined;
    }

    private toBase64(str: string): string {
        // Check if we're in Node.js environment
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(str).toString('base64');
        }
        
        // Browser fallback using btoa
        if (typeof btoa !== 'undefined') {
            return btoa(str);
        }
        
        // Manual base64 implementation as last resort
        return this.manualBase64Encode(str);
    }

    private manualBase64Encode(str: string): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let result = '';
        
        for (let i = 0; i < str.length; i += 3) {
            const chunk = (str.charCodeAt(i) << 16) | 
                         (i + 1 < str.length ? str.charCodeAt(i + 1) << 8 : 0) | 
                         (i + 2 < str.length ? str.charCodeAt(i + 2) : 0);
            
            result += chars[(chunk >> 18) & 63] +
                     chars[(chunk >> 12) & 63] +
                     chars[(chunk >> 6) & 63] +
                     chars[chunk & 63];
        }
        
        // Add padding
        const padding = str.length % 3;
        if (padding > 0) {
            result = result.slice(0, -padding) + '='.repeat(padding);
        }
        
        return result;
    }

}