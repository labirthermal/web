import { OperationWithPath } from "./OperationWithPath";
import type { ApiResponseDataType } from "./ResponseTypes";

/** 
 * A base operation that needs to have a path specified.
 * @package `@labirthermal/client`
 */
export abstract class OperationWithFile<R extends ApiResponseDataType> extends OperationWithPath<R> {

    public setFile(
        filename: string
    ): this {
        this.request.addQueryParameter("file", filename);
        return this;
    }

}