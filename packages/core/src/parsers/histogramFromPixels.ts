import type { ThermalStatistics } from "../hierarchy/ThermalRegistry";

/**
 * Build a histogram over several pixel sets in one shared temperature range
 * and with shared bins, so that files of different formats are comparable.
 *
 * Linear complexity, no sorting. The output shape is the same as the one
 * produced by `LrcParser.registryHistogram`.
 *
 * **Must stay self-contained, it is executed in a worker.**
 */
export const histogramFromPixels = async ( pixelSets: Float32Array[] ): Promise<ThermalStatistics[]> => {

    const resolution = 255;

    let min = Infinity;
    let max = -Infinity;
    let total = 0;

    for ( const pixels of pixelSets ) {
        for ( let index = 0; index < pixels.length; index++ ) {
            const value = pixels[ index ];
            if ( ! Number.isFinite( value ) ) continue;
            if ( value < min ) min = value;
            if ( value > max ) max = value;
            total++;
        }
    }

    if ( total === 0 ) {
        return [];
    }

    const distance = max - min;
    const step = distance / resolution;
    const counts = new Array<number>( resolution ).fill( 0 );

    for ( const pixels of pixelSets ) {
        for ( let index = 0; index < pixels.length; index++ ) {
            const value = pixels[ index ];
            if ( ! Number.isFinite( value ) ) continue;
            const bin = distance === 0
                ? 0
                : Math.min( resolution - 1, Math.floor( ( value - min ) / step ) );
            counts[ bin ]++;
        }
    }

    const bars = counts.map( ( count, index ) => {
        const from = min + step * index;
        return {
            from,
            to: from + step,
            count,
            percentage: count / total * 100
        };
    } );

    let minPercentage = Infinity;
    let maxPercentage = -Infinity;
    for ( const bar of bars ) {
        if ( bar.percentage < minPercentage ) minPercentage = bar.percentage;
        if ( bar.percentage > maxPercentage ) maxPercentage = bar.percentage;
    }

    const percentageDistance = maxPercentage - minPercentage;

    return bars.map( bar => ( {
        ...bar,
        height: percentageDistance === 0 ? 100 : bar.percentage / percentageDistance * 100
    } ) );

};
