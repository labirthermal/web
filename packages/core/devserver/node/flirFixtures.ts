import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Real radiometric FLIR JPEGs shared by the monorepo in `<repo>/public/flir`.
 * Reference values are computed independently with the Python library flyr,
 * see `devserver/fixtures/flir/generate_reference.py`.
 */

const here = dirname( fileURLToPath( import.meta.url ) );

export const FLIR_FIXTURES_DIR = join( here, "../../../../public/flir" );

const FLIR_REFERENCE_FILE = join( here, "../fixtures/flir/reference.json" );

export type FlirReference = {
    width: number,
    height: number,
    /** UTC milliseconds */
    timestamp: number,
    timezoneOffset: number,
    emissivity: number,
    reflectedKelvins: number,
    min: number,
    max: number,
    mean: number,
    /** `[x, y, °C]` on a regular 8×8 grid */
    samples: [ number, number, number ][],
    bytesize: number,
    /** `null` when flyr cannot read the file */
    flyrMaxAbsDiff: number | null
};

export const FLIR_REFERENCE: Record<string, FlirReference> = JSON.parse(
    readFileSync( FLIR_REFERENCE_FILE, "utf8" )
);

export const FLIR_FIXTURE_NAMES = Object.keys( FLIR_REFERENCE );

export const readFlirFixture = ( name: string ): ArrayBuffer => {
    const file = readFileSync( join( FLIR_FIXTURES_DIR, name ) );
    return file.buffer.slice( file.byteOffset, file.byteOffset + file.byteLength ) as ArrayBuffer;
};
