/** Raised whenever a FLIR JPEG cannot be decoded into a valid temperature raster. */
export class FlirDecodingError extends Error {

    public constructor( message: string ) {
        super( message );
        this.name = "FlirDecodingError";
    }

}

export const requireFlir: ( condition: unknown, message: string ) => asserts condition = ( condition, message ) => {
    if ( ! condition ) {
        throw new FlirDecodingError( message );
    }
};
