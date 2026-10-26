import type { FileInfo } from "../../responseEntities";
import { OperationWithFile } from "../OperationWithFile";
import type { ApiResponseType } from "../ResponseTypes";

export type FileAddCommentDataType = {
    file: FileInfo
}

/**
 * Post route for adding a comment to a file on the server.
 * @package `@labirthermal/client`
 */
export class FileAddComment extends OperationWithFile<FileAddCommentDataType> {

    public init(): this {
        this.request.setMethod("POST");
        this.request.setAction("fileaddcomment");
        return this;
    }

    /**
     * Nastaví text komentáře, který bude odeslán na server.
     *
     * @param message Text komentáře
     */
    public setMessage(
        message: string
    ): this {
        this.request.addBodyParameter("message", message);
        return this;
    }

    public execute(): Promise<ApiResponseType<FileAddCommentDataType>> {
        return this.client.fetch<FileAddCommentDataType>(this.request);
    }

}