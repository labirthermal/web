import type { FileInfo } from "../../responseEntities";
import { OperationWithPath } from "../OperationWithPath";
import type { ApiResponseType } from "../ResponseTypes";

export type UploadFileDataType = {
    file: FileInfo
};

/**
 * Post route for uploading a file to a server folder.
 * @package `@labirthermal/client`
 */
export class UploadFile extends OperationWithPath<UploadFileDataType> {
    public init(): this {
        this.request.setMethod("POST");
        this.request.setAction("uploadfile");
        return this;
    }

    public setLrc(file: File): this {
        this.request.addFile("lrc", file);
        return this;
    }

    public setVisual(file: File): this {
        this.request.addFile("visual", file);
        return this;
    }

    public setPreview(file: File): this {
        this.request.addFile("preview", file);
        return this;
    }


    /**
     * Nastaví label pro uploadovaný soubor
     */
    public setLabel(label: string): this {
        this.request.addBodyParameter("label", label);
        return this;
    }

    /**
     * Nastaví description pro uploadovaný soubor
     */
    public setDescription(description: string): this {
        this.request.addBodyParameter("description", description);
        return this;
    }

    /**
     * Nastaví tagy pro uploadovaný soubor
     */
    public setTags(tags: string[]): this {
        this.request.addBodyParameter("tags", tags);
        return this;
    }

    public async execute(): Promise<ApiResponseType<UploadFileDataType>> {
        const response = await this.client.fetch<UploadFileDataType>(this.request);
        return response;
    }
}