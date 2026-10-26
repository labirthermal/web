import type { BreadcrumbItem, FolderInfo, TagDefinition } from "../../responseEntities";
import { OperationWithPath } from "../OperationWithPath";
import type { ApiResponseType } from "../ResponseTypes";

export type GetInfoDataType = {
    breadcrumb: BreadcrumbItem[]
    folder: FolderInfo,
    subfolders: false | {
        [index: string]: FolderInfo
    },
    tags: {
        [index: string]: TagDefinition
    }
}

/**
 * Get route for retrieving folder information from the server.
 * @package `@labirthermal/client`
 */
export class GetInto extends OperationWithPath<GetInfoDataType> {

    public init(): this {
        this.request.setMethod( "GET" );
        return this;
    }


    public async execute(): Promise<ApiResponseType<GetInfoDataType>> {
        const response = await this.client.fetch<GetInfoDataType>(this.request);
        return response;
    }


}