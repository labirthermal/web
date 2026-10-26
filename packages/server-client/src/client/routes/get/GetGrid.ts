import type { FileInfo, FolderInfo, TagsWithContent } from "../../responseEntities";
import { OperationWithFilters } from "../OperationWithPathAndFilters";
import type { ApiResponseType } from "../ResponseTypes";

export type GetGridDataType = {
    folder: FolderInfo,
    all_subdirectories: {
        [index: string]: FolderInfo
    },
    header: {
        [index: string]: FolderInfo
    },
    groups: {
        [index: string]: {
            label: string,
            from: number,
            to: number,
            folders: {
                [index: string]: FileInfo[]
            }
        }
    }
    time: {
        selection: {
            from: number,
            to: number
        },
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
    tags: TagsWithContent
}

/** 
 * Keys of grid grouping types 
 * @package `@labirthermal/client`
*/
export enum GridGrouping {
    HOUR = "hour",
    DAY = "day",
    WEEK = "week",
    MONTH = "month",
    YEAR = "year"
}

/**
 * Get route for retrieving grid content from the server, grouped by time intervals.
 * @package `@labirthermal/client`
 */
export class GetGrid extends OperationWithFilters<GetGridDataType> {

    protected folders: string[] = [];

    protected by: GridGrouping = GridGrouping.HOUR;

    public init(): this {
        this.request.setMethod("GET");
        this.request.setAction("grid");
        this.request.addQueryParameter("by", this.by);
        return this;
    }

    public setBy(
        value: GridGrouping
    ): this {
        this.by = value;
        this.request.addQueryParameter("by", value);
        return this;
    }

    public setFolders(
        value: string[]
    ): this {
        this.folders = value;
        this.applyFolders();
        return this;
    }

    public addFolder(
        value: string
    ): this {
        if (!this.folders.includes(value)) {
            this.folders.push(value);
            this.applyFolders();
        }
        return this;
    }

    public removeFolder(
        value: string
    ): this {
        const originalLength = this.folders.length;
        this.folders = this.folders.filter(folder => folder !== value);
        if (this.folders.length !== originalLength) {
            this.applyFolders();
        }
        return this;
    }

    protected applyFolders(): this {
        this.request.addQueryParameter("folders", this.folders.join(","));
        return this;
    }

    public async execute(): Promise<ApiResponseType<GetGridDataType>> {
        const response = await this.client.fetch<GetGridDataType>(this.request);
        return response;
    }


}