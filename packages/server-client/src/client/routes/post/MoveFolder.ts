import { OperationWithPath } from "../OperationWithPath";
import type { ApiResponseType } from "../ResponseTypes";

export type MoveFolderDataType = object;

/**
 * Post route for moving a folder within one server.
 * @package `@labirthermal/client`
 */
export class MoveFolder extends OperationWithPath<MoveFolderDataType> {

    public init(): this {
        this.request.setMethod("POST");
        this.request.setAction("move");
        return this;
    }

    public setTarget(
        target: string
    ): this {
        this.request.addBodyParameter("target", target);
        return this;
    }

    public async execute(): Promise<ApiResponseType<MoveFolderDataType>> {
        const response = await this.client.fetch<MoveFolderDataType>(this.request);
        return response;
    }
}