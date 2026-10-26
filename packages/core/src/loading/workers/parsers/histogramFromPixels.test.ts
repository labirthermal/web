import { describe, expect, test } from "vitest";
import { histogramFromPixels } from "./histogramFromPixels";

describe( "histogramFromPixels", () => {

    test( "bins all sets into one shared range", async () => {
        const result = await histogramFromPixels( [ Float32Array.from( [ 0, 1, 2 ] ), Float32Array.from( [ 8, 10 ] ) ] );

        expect( result[ 0 ].from ).toBe( 0 );
        expect( result[ result.length - 1 ].to ).toBe( 10 );
        expect( result.reduce( ( sum, bar ) => sum + bar.count, 0 ) ).toBe( 5 );
        expect( result.reduce( ( sum, bar ) => sum + bar.percentage, 0 ) ).toBeCloseTo( 100, 6 );
        expect( result[ result.length - 1 ].count ).toBeGreaterThan( 0 );
    } );

    test( "skips non-finite values", async () => {
        const result = await histogramFromPixels( [ Float32Array.from( [ NaN, 1, Infinity, 3 ] ) ] );
        expect( result.reduce( ( sum, bar ) => sum + bar.count, 0 ) ).toBe( 2 );
        expect( result[ 0 ].from ).toBe( 1 );
        expect( result[ result.length - 1 ].to ).toBe( 3 );
    } );

    test( "handles a constant raster and empty input", async () => {
        const constant = await histogramFromPixels( [ Float32Array.from( [ 5, 5, 5 ] ) ] );
        expect( constant[ 0 ].count ).toBe( 3 );

        expect( await histogramFromPixels( [] ) ).toEqual( [] );
        expect( await histogramFromPixels( [ Float32Array.from( [ NaN ] ) ] ) ).toEqual( [] );
    } );

} );
