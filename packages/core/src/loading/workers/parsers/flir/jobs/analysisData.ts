import { AreaAnalysisData, IParserObject, PointAnalysisData } from "../../structure";

/*
 * All jobs in this file must stay self-contained (no imports, no outer
 * references), because they may be serialised into a worker.
 *
 * Coordinates follow the LRC parser: areas include both `x` and
 * `x + width` (resp. `y` and `y + height`). Pixels outside of the raster
 * are ignored, a point outside of the raster yields `NaN`.
 */

export const pointAnalysisData: IParserObject["pointAnalysisData"] = async ( workingBuffer, x, y ) => {

    const view = new DataView( workingBuffer );
    const width = view.getUint16( 10, true );
    const height = view.getUint16( 12, true );

    const isInside = Number.isInteger( x ) && Number.isInteger( y )
        && x >= 0 && y >= 0 && x < width && y < height;

    const output: PointAnalysisData = {};

    output[ 0 ] = isInside
        ? new Float32Array( workingBuffer, 64, width * height )[ y * width + x ]
        : NaN;

    return output;

};

export const rectAnalysisData: IParserObject["rectAnalysisData"] = async ( workingBuffer, left, top, areaWidth, areaHeight ) => {

    const view = new DataView( workingBuffer );
    const width = view.getUint16( 10, true );
    const height = view.getUint16( 12, true );
    const pixels = new Float32Array( workingBuffer, 64, width * height );

    const fromX = Math.max( 0, Math.ceil( left ) );
    const toX = Math.min( width - 1, Math.floor( left + areaWidth ) );
    const fromY = Math.max( 0, Math.ceil( top ) );
    const toY = Math.min( height - 1, Math.floor( top + areaHeight ) );

    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    let count = 0;

    for ( let y = fromY; y <= toY; y++ ) {
        const rowOffset = y * width;
        for ( let x = fromX; x <= toX; x++ ) {
            const value = pixels[ rowOffset + x ];
            if ( value < min ) min = value;
            if ( value > max ) max = value;
            sum += value;
            count++;
        }
    }

    const output: AreaAnalysisData = {};

    output[ 0 ] = { min, max, avg: sum / count, count } as AreaAnalysisData[ number ];

    return output;

};

export const ellipsisAnalysisData: IParserObject["ellipsisAnalysisData"] = async ( workingBuffer, left, top, areaWidth, areaHeight ) => {

    const view = new DataView( workingBuffer );
    const width = view.getUint16( 10, true );
    const height = view.getUint16( 12, true );
    const pixels = new Float32Array( workingBuffer, 64, width * height );

    const centerX = left + areaWidth / 2;
    const centerY = top + areaHeight / 2;
    const radiusX = areaWidth / 2;
    const radiusY = areaHeight / 2;

    const fromX = Math.max( 0, Math.ceil( left ) );
    const toX = Math.min( width - 1, Math.floor( left + areaWidth ) );
    const fromY = Math.max( 0, Math.ceil( top ) );
    const toY = Math.min( height - 1, Math.floor( top + areaHeight ) );

    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    let count = 0;

    for ( let y = fromY; y <= toY; y++ ) {
        const rowOffset = y * width;
        const normalizedY = ( y - centerY ) / radiusY;
        for ( let x = fromX; x <= toX; x++ ) {
            const normalizedX = ( x - centerX ) / radiusX;
            if ( normalizedX * normalizedX + normalizedY * normalizedY <= 1 ) {
                const value = pixels[ rowOffset + x ];
                if ( value < min ) min = value;
                if ( value > max ) max = value;
                sum += value;
                count++;
            }
        }
    }

    const output: AreaAnalysisData = {};

    output[ 0 ] = { min, max, avg: sum / count, count } as AreaAnalysisData[ number ];

    return output;

};
