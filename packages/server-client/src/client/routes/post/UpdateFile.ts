import type { FileInfo } from "../../responseEntities";
import { OperationWithFile } from "../OperationWithFile";
import type { ApiResponseType } from "../ResponseTypes";

export type UpdateFileDataType = {
    file: FileInfo
}

/**
 * Post route for updating metadata of a file on the server.
 * @package `@labirthermal/client`
 */
export class UpdateFile extends OperationWithFile<UpdateFileDataType> {

    protected _clearTags: boolean = false;
    protected _clearAnalyses: boolean = false;

    protected _tagsAdd: string[] = [];
    protected _tagsRemove: string[] = [];
    protected _analysisAdd: string[] = [];
    protected _analysisRemove: string[] = [];

    public init(): this {
        this.request.setMethod("POST");
        this.request.setAction("updatefile");
        return this;
    }



    public setLabel(value: string): this {
        this.request.addBodyParameter("label", value);
        return this;
    }

    public setDescription(value: string): this {
        this.request.addBodyParameter("description", value);
        return this;
    }

    public addTag(tag: string): this {
        this._tagsAdd.push(tag);
        return this;
    }

    public removeTag(tag: string): this {
        this._tagsRemove.push(tag);
        return this;
    }

    public addAnalysis(analysis: string): this {
        this._analysisAdd.push(analysis);
        return this;
    }

    public removeAnalysis(analysis: string): this {
        this._analysisRemove.push(analysis);
        return this;
    }

    public clearTags(): this {
        this._clearTags = true;
        return this;
    }

    public clearAnalyses(): this {
        this._clearAnalyses = true;
        return this;
    }



    public async execute(): Promise<ApiResponseType<UpdateFileDataType>> {

        this.request.addBodyParameter("clearTags", this._clearTags);

        // If tags should be cleared, add it to the request
        if (this._tagsAdd.length > 0)
            this.request.addBodyParameter("addTags", this._tagsAdd);
        if (this._tagsRemove.length > 0)
            this.request.addBodyParameter("removeTags", this._tagsRemove);


        // If analyses should be cleared, add it to the request
        this.request.addBodyParameter("clearAnalyses", this._clearAnalyses);
        // Otherwise, add the analyses to be added and removed
        if (this._analysisAdd.length > 0)
            this.request.addBodyParameter("addAnalyses", this._analysisAdd);
        if (this._analysisRemove.length > 0)
            this.request.addBodyParameter("removeAnalyses", this._analysisRemove);

        const response = await this.client.fetch<UpdateFileDataType>(this.request);

        return response;
    }
}