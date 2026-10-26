import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Real radiometric FLIR JPEGs with reference values computed independently
 * and cross-checked against the Python library flyr.
 */

export const FLIR_FIXTURES_DIR = join( dirname( fileURLToPath( import.meta.url ) ), "../fixtures/flir" );

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
    readFileSync( join( FLIR_FIXTURES_DIR, "reference.json" ), "utf8" )
);

export const FLIR_FIXTURE_NAMES = Object.keys( FLIR_REFERENCE );

export const readFlirFixture = ( name: string ): ArrayBuffer => {
    const file = readFileSync( join( FLIR_FIXTURES_DIR, name ) );
    return file.buffer.slice( file.byteOffset, file.byteOffset + file.byteLength ) as ArrayBuffer;
};
