import { nothing } from "lit";

/** Utilities for rendering */
export class DirectiveHelpers {

    public static unknownContainsSomething(
        content: unknown
    ): boolean {

        if (
            content === nothing
            || content === null
            || content === undefined
        ) {
            return false;
        }

        if (typeof content === "string" && content.trim().length === 0) {
            return false;
        }

        if (Array.isArray(content)) {

            if (content.length === 0) {
                return false;
            } else if (!content.some(item => this.unknownContainsSomething(item))) {
                return false;
            }

        }

        return true;

    }

}