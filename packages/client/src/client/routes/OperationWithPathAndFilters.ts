import { OperationWithPath } from "./OperationWithPath";
import type { ApiResponseDataType } from "./ResponseTypes";

/** 
 * An operation containing filters based on time and tags. Needs to have path specified. 
 * @package `@labirthermal/client`
 */
export abstract class OperationWithFilters<R extends ApiResponseDataType> extends OperationWithPath<R> {

    private tags: string[] = [];

    public setFrom(
        value: number | Date
    ): this {
        const timestamp = value instanceof Date
            ? value.getTime()
            : value;
        this.request.addQueryParameter("from", timestamp.toString());
        return this;
    }

    public setTo(
        value: number | Date
    ): this {
        const timestamp = value instanceof Date
            ? value.getTime()
            : value;
        this.request.addQueryParameter("to", timestamp.toString());
        return this;
    }


    public setTags(
        value: string[]
    ): this {

        this.tags = value;
        this.applyTags();
        return this;
    }

    public addTag(
        value: string
    ): this {

        // Add the tag only if it is not already present
        if ( ! this.tags.includes(value) ) {
            this.tags.push(value);
            this.applyTags();    
        }
        return this;
    }

    public removeTag(
        value: string
    ): this {

        const originalLength = this.tags.length;

        // Filter out the tag to be removed
        this.tags = this.tags.filter( tag => tag !== value );

        // Apply the change if the length has changed
        if ( this.tags.length !== originalLength ) {
            this.applyTags();
        }

        return this;
    }


    /**
     * Internal method used to propagate changed tags to the request.
     */
    private applyTags(): this {
        this.request.addQueryParameter("tags", this.tags.join(","));
        return this;
    }

}