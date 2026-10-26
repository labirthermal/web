import type { FileInfo } from "../../responseEntities";
import { OperationWithPath } from "../OperationWithPath";
import type { ApiResponseType } from "../ResponseTypes";

export type GetFileDataType = {
    file: FileInfo
}

/**
 * Get route for retrieving a file's information from the server.
 * @package `@labirthermal/client`
 */
export class GetFile extends OperationWithPath<GetFileDataType> {

    public init(): this {
        this.request.setMethod("GET");
        this.request.setAction("file");
        return this;
    }

    public setFileName(
        value: string
    ) {
        this.request.addQueryParameter("file", value);
        return this;
    }


    public execute(): Promise<ApiResponseType<GetFileDataType>> {
        const result = this.client.fetch<GetFileDataType>(this.request);
        return result;
    }


}