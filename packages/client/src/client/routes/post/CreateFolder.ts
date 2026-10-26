import { OperationWithPath } from "../OperationWithPath";
import type { ApiResponseType } from "../ResponseTypes";


export type CreateDataType = {
    result: {
        slug?: string,
        name?: string,
        description?: string,
        info?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    }
}

/**
 * Vytvoření nové složky (viz actionCreate v PHP)
 * Parametry: name (povinné), description (volitelné), meta (volitelné), tags (volitelné), access (volitelné)
 *
 * @package `@labirthermal/client`
 */
export class CreateFolder extends OperationWithPath<CreateDataType> {

    // Tag buffer for accumulating tags one by one
    protected tagBuffer: Record<string, any> = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    protected accessBuffer: { show?: boolean; may_have_files?: boolean } = {};


    public init(): this {
        this.request.setMethod("POST");
        this.request.setAction("create");
        return this;
    }



    public setName(name: string): this {
        this.request.addBodyParameter("name", name);
        return this;
    }

    public setDescription(description: string): this {
        this.request.addBodyParameter("description", description);
        return this;
    }

    public setMeta(meta: Record<string, any>): this { // eslint-disable-line @typescript-eslint/no-explicit-any
        this.request.addBodyParameter("meta", meta);
        return this;
    }

    /**
     * Přidej jeden tag (klíčem je název, hodnotou objekt s name, description, color)
     */
    public addTag(name: string, description?: string, color?: string): this { 
        this.tagBuffer[name] = { name };
        if (description !== undefined) this.tagBuffer[name].description = description;
        if (color !== undefined) this.tagBuffer[name].color = color;
        return this;
    }

    /**
     * Nastaví access.show (viditelnost složky)
     */
    public setShow(show: boolean): this {
        this.accessBuffer.show = show;
        return this;
    }

    /**
     * Nastaví access.may_have_files (zda složka může obsahovat soubory)
     */
    public setMayHaveFiles(mayHaveFiles: boolean): this {
        this.accessBuffer.may_have_files = mayHaveFiles;
        return this;
    }



    public async execute(): Promise<ApiResponseType<CreateDataType>> {
        // Přidej tagy, pokud nějaké jsou
        if (Object.keys(this.tagBuffer).length > 0) {
            this.request.addBodyParameter("tags", this.tagBuffer);
        }
        // Přidej access, pokud je nastaven
        if (Object.keys(this.accessBuffer).length > 0) {
            this.request.addBodyParameter("access", this.accessBuffer);
        }
        const response = await this.client.fetch<CreateDataType>(this.request);
        return response;
    }
}