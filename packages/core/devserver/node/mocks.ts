import { HttpResponse, http } from "msw";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "node:url";


export const delay = ( time: number ) => {
    return new Promise( resolve => setTimeout( resolve, time ) );
}


/** LRC fixtures shared by the monorepo in `<repo>/public/lrc` */
const fixture = ( name: string ) => fs.readFileSync( path.resolve( path.dirname( fileURLToPath( import.meta.url ) ), "../../../../public/lrc", name ) );

/** Read an LRC fixture from `<repo>/public/lrc` as an ArrayBuffer */
export const readLrcFixture = ( name: string ): ArrayBuffer => {
    const file = fixture( name );
    return file.buffer.slice( file.byteOffset, file.byteOffset + file.byteLength ) as ArrayBuffer;
};

export enum THERMOGRAM_PATHS {
    
    /** A 160×120 Float32 image (`image_float32_small.lrc`) */
    SOUSTRUH = "https://edu.labir.cz/thermogram.lrc",

    /** A 1024×768 Uint16 image (`image_uint16_large.lrc`) */
    TUCNACI = "https://edu.labir.cz/tucnaci.lrc",
    
    /** A 160×120 Uint16 image (`image_uint16_small.lrc`) */
    CAS = "https://edu.labir.cz/cas.lrc",

    /** A non existing route */
    ERR404 = "https://edu.labir.cz/error/404",

    /** A 160×120 Float32 sequence of 51 frames (`sequence_float32_small_short.lrc`) */
    SEQUENCE = "https://edu.labir.cz/sequence.lrc",

    /** The same sequence as `SEQUENCE`, responding after 200 ms */
    DELAYED_SEQUENCE = "https://edu.labir.cz/sequence_delayed.lrc"

}

const thermogramMockHandlers =  [

    http.get( THERMOGRAM_PATHS.SOUSTRUH, () => {
        const file = readLrcFixture( "image_float32_small.lrc" );

        return HttpResponse.arrayBuffer( file, {
            headers: {
                "Content-Type": "octet-stream"
            }
        } );
    } ),

    http.get( THERMOGRAM_PATHS.SEQUENCE, () => {
        const file = readLrcFixture( "sequence_float32_small_short.lrc" );

        return HttpResponse.arrayBuffer( file, {
            headers: {
                "Content-Type": "octet-stream"
            }
        } );
    } ),

    http.get( THERMOGRAM_PATHS.DELAYED_SEQUENCE, async () => {

        const file = readLrcFixture( "sequence_float32_small_short.lrc" );

        await delay( 200 );

        return HttpResponse.arrayBuffer( file, {
            headers: {
                "Content-Type": "octet-stream"
            }
        } );
    } ),


    http.get( THERMOGRAM_PATHS.TUCNACI, () => {
        const file = readLrcFixture( "image_uint16_large.lrc" );

        return HttpResponse.arrayBuffer( file, {
            headers: {
                "Content-Type": "octet-stream"
            }
        } );
    } ),

    http.get( THERMOGRAM_PATHS.CAS, () => {
        const file = readLrcFixture( "image_uint16_small.lrc" );

        return HttpResponse.arrayBuffer( file, {
            headers: {
                "Content-Type": "octet-stream"
            }
        } );
    } ),


    http.get( THERMOGRAM_PATHS.ERR404, () => {
        return new HttpResponse(null, { status: 404 })
    } )
]


export default thermogramMockHandlers;