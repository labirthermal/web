import type { FileInfo, FolderInfo, TagsWithContent } from "../../responseEntities";
import { OperationWithFilters } from "../OperationWithPathAndFilters";
import type { ApiResponseType } from "../ResponseTypes";

export type GetFilesDataType = {
    folder: FolderInfo,
    subfolders: {
        [index: string]: FolderInfo
    },
    time: {
        files: {
            from: number,
            to: number
        }
    },
    count: {
        displayed: number,
        omitted: number,
        total: number
    },
    files: FileInfo[],
    tags: TagsWithContent
}

/**
 * Get route for retrieving files information from a folder on the server.
 * @package `@labirthermal/client`
 */
export class GetFiles extends OperationWithFilters<GetFilesDataType> {

    public init(): this {
        this.request.setMethod("GET");
        this.request.setAction("files");
        return this;
    }


    public async execute(): Promise<ApiResponseType<GetFilesDataType>> {
        const response = await this.client.fetch<GetFilesDataType>(this.request);
        return response;
    }


}