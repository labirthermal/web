/** Codes of errors */
export enum FileErrors {
    NOT_SPECIFIED = 0,
    FILE_NOT_FOUND = 1,
    MIME_UNSUPPORTED = 2,
    PARSING_ERROR = 3,
    OUT_OF_MEMORY = 4
}

/** The error that is thrown anytime something happens during the loading */
export class FileLoadingError extends Error {

    public constructor(
        public readonly code: FileErrors,
        public readonly url: string,
        message?: string
    ) {
        super(message);
    }
}
