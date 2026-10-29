import { describe, expect, test } from "vitest";
import { frameData, getFrameSubset } from "./getFrameSubset";
import { ellipsisAnalysisData } from "./ellipsisAnalysisData";
import { pointAnalysisData } from "./pointAnalysisData";
import { rectAnalysisData } from "./rectAnalysisData";
import { histogramPixels } from "./histogramPixels";
import { histogramFromPixels } from "../../histogramFromPixels";

const createUint16Lrc = () => {
    const width = 3;
    const height = 3;
    const pixels = [ 0, 10000, 20000, 30000, 32768, 40000, 50000, 60000, 65535 ];
    const buffer = new ArrayBuffer( 25 + 57 + pixels.length * 2 );
    const view = new DataView( buffer );

    view.setUint8( 15, 0 );
    view.setUint16( 17, width, true );
    view.setUint16( 19, height, true );

    const frame = new DataView( buffer, 25 );
    frame.setBigInt64( 0, 621355968000000000n, true );
    frame.setFloat32( 8, -20, true );
    frame.setFloat32( 12, 80, true );
    pixels.forEach( ( pixel, index ) => frame.setUint16( 57 + index * 2, pixel, true ) );

    return { buffer, pixels, width, height };
};

describe( "LRC uint16 analysis", () => {

    test( "frame, point and area analyses decode identical temperatures", async () => {
        const { buffer, pixels, width, height } = createUint16Lrc();
        const subset = getFrameSubset( buffer, 0 );
        const frame = await frameData( subset.array, subset.dataType );
        const expected = pixels.map( pixel => -20 + 100 * pixel / 65535 );

        expect( frame.pixels ).toEqual( expected );

        for ( let y = 0; y < height; y++ ) {
            for ( let x = 0; x < width; x++ ) {
                expect( ( await pointAnalysisData( buffer, x, y ) )[ 0 ] )
                    .toBeCloseTo( frame.pixels[ y * width + x ], 5 );
            }
        }

        const rectangle = ( await rectAnalysisData( buffer, 0, 0, width - 1, height - 1 ) )[ 0 ];
        expect( rectangle.count ).toBe( pixels.length );
        expect( rectangle.min ).toBeCloseTo( Math.min( ...frame.pixels ), 5 );
        expect( rectangle.max ).toBeCloseTo( Math.max( ...frame.pixels ), 5 );
        expect( rectangle.avg ).toBeCloseTo(
            frame.pixels.reduce( ( sum, value ) => sum + value, 0 ) / pixels.length,
            5
        );

        const ellipse = ( await ellipsisAnalysisData( buffer, 0, 0, 2, 2 ) )[ 0 ];
        const ellipsePixels = [ 1, 3, 4, 5, 7 ].map( index => frame.pixels[ index ] );
        expect( ellipse.count ).toBe( ellipsePixels.length );
        expect( ellipse.min ).toBeCloseTo( Math.min( ...ellipsePixels ), 5 );
        expect( ellipse.max ).toBeCloseTo( Math.max( ...ellipsePixels ), 5 );
        expect( ellipse.avg ).toBeCloseTo(
            ellipsePixels.reduce( ( sum, value ) => sum + value, 0 ) / ellipsePixels.length,
            5
        );
    } );

    test( "rectangles are clipped to the raster", async () => {
        const { buffer, width, height } = createUint16Lrc();
        const whole = ( await rectAnalysisData( buffer, 0, 0, width - 1, height - 1 ) )[ 0 ];

        const overflowing = ( await rectAnalysisData( buffer, -50, -50, width + 100, height + 100 ) )[ 0 ];
        expect( overflowing ).toEqual( whole );

        // Bottom right corner only
        const corner = ( await rectAnalysisData( buffer, 2, 2, 10, 10 ) )[ 0 ];
        expect( corner.count ).toBe( 1 );
        expect( corner.min ).toBeCloseTo( 80, 5 );
    } );

    test( "rectangles select integer pixel coordinates only", async () => {
        const { buffer } = createUint16Lrc();

        // Columns ceil(0.5)..floor(1.5) = 1..1, rows 0..1
        const area = ( await rectAnalysisData( buffer, 0.5, 0, 1, 1 ) )[ 0 ];
        expect( area.count ).toBe( 2 );

        // No integer coordinate inside
        const none = ( await rectAnalysisData( buffer, 0.2, 0.2, 0.5, 0.5 ) )[ 0 ];
        expect( none.count ).toBe( 0 );
    } );

    test( "areas outside the raster yield empty statistics", async () => {
        const { buffer, width, height } = createUint16Lrc();
        const empty = { min: Infinity, max: -Infinity, avg: NaN, count: 0 };

        expect( ( await rectAnalysisData( buffer, width + 5, 0, 2, 2 ) )[ 0 ] ).toEqual( empty );
        expect( ( await rectAnalysisData( buffer, -10, -10, 2, 2 ) )[ 0 ] ).toEqual( empty );
        expect( ( await ellipsisAnalysisData( buffer, 0, height + 5, 2, 2 ) )[ 0 ] ).toEqual( empty );
    } );

    test( "ellipses are clipped to the raster", async () => {
        const { buffer, width, height } = createUint16Lrc();

        // Ellipse centred in the top left corner pixel with radius 1
        const ellipse = ( await ellipsisAnalysisData( buffer, -1, -1, 2, 2 ) )[ 0 ];
        // Pixels (0,0), (1,0) and (0,1) are inside the raster and the ellipse
        expect( ellipse.count ).toBe( 3 );

        const huge = ( await ellipsisAnalysisData( buffer, -100, -100, width + 200, height + 200 ) )[ 0 ];
        expect( huge.count ).toBe( width * height );
    } );

} );

describe( "LRC histogram", () => {

    test( "pixels agree with frameData and every pixel is binned exactly once", async () => {
        const { buffer, pixels } = createUint16Lrc();
        const subset = getFrameSubset( buffer, 0 );
        const frame = await frameData( subset.array, subset.dataType );
        const temperatures = await histogramPixels( buffer );

        expect( Array.from( temperatures ) ).toEqual( frame.pixels.map( Math.fround ) );

        const histogram = await histogramFromPixels( [ temperatures ] );
        expect( histogram.reduce( ( sum, bar ) => sum + bar.count, 0 ) ).toBe( pixels.length );
        expect( histogram[ 0 ].from ).toBeCloseTo( -20, 4 );
        expect( histogram[ histogram.length - 1 ].to ).toBeCloseTo( 80, 4 );
    } );

} );
