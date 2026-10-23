import { IParserObject } from "../../structure";



export const registryHistogram: IParserObject["registryHistogram"] = async (
    files: ArrayBuffer[]
) => {

    let pixels: number[] = [];

    // Function to read a file returning all its pixels
    const readFile = async (file: ArrayBuffer): Promise<number[]> => {

        const headerView = new DataView(file.slice(0, 25));

        // Get header info
        const dataType = headerView.getUint8(15);
        const width = headerView.getUint16(17, true);
        const height = headerView.getUint16(19, true);

        // Get pixel size
        const pixelByteSize = dataType === 1 ? 4 : 2;

        // Get number of frames
        const frameHeaderSize = 57;
        const framePixelsSize = width * height * pixelByteSize;
        const frameSize = frameHeaderSize + framePixelsSize;

        const streamSubset = file.slice(25);

        const frameCount = streamSubset.byteLength / frameSize;

        let filePixels: number[] = [];

        // Read frames and add pixels to the histogram
        for (let i = 0; i < frameCount; i++) {

            const frameStart = i * frameSize;
            const pixelsSubsetStart = frameStart + 57;
            const pixelsSubsetEnd = pixelsSubsetStart + framePixelsSize;
            const pixelsSubset = streamSubset.slice(pixelsSubsetStart, pixelsSubsetEnd);

            // const frameHeaderView = new DataView(streamSubset.slice(frameStart, 56));

            // const min = frameHeaderView.getFloat32(8, true);
            // const max = frameHeaderView.getFloat32(12, true);

        

            if (dataType === 0) {


                const frameHeaderView = new DataView(streamSubset.slice(frameStart, 56));

                const min = frameHeaderView.getFloat32(8, true);
                const max = frameHeaderView.getFloat32(12, true);

                const array = new Uint16Array( pixelsSubset );
                const distance = Math.abs( min - max );
                const UINT16_MAX = 65535;

                array.forEach( pixel => {
                    
                    const mappedValue = pixel / UINT16_MAX;
                    filePixels.push( min + ( distance * mappedValue ) );

                } );

            } 
            // Float32 (TIMI Edu)
            else if (dataType === 1) {

                filePixels = filePixels.concat( Array.from(new Float32Array(pixelsSubset)) );

            }


        }

        return filePixels;


    }

    const result = await Promise.all( files.map( file => readFile( file ) ) );

    result.forEach( fileResult => {
        pixels = pixels.concat( fileResult )
    } );

    pixels.sort( (a,b) => { return a - b; } );


    const min = pixels[0];
    const max = pixels[ pixels.length - 1 ];
    const distance = Math.abs( min - max );

    const resolution = 255;
    const step = distance / resolution;

    const bars: {
        from: number,
        to: number,
        count: number,
        percentage: number
    }[] = []

    let buf = [...pixels];

    for ( let i = 0; i < resolution; i++ ) {

        const from = min + ( step * i );
        const to = from + step;

        const nextUpIndex = buf.findIndex( pixel => pixel > to );

        if ( nextUpIndex === 0 ) {

            const bar = {
                from,
                to,
                count: 0,
                percentage: 0
            };

            bars.push( bar );

        } else {

            const subs = buf.slice( 0, nextUpIndex - 1 );

            const count = subs.length;

            const percentage = count / pixels.length * 100;

            const bar = {
                from,
                to,
                count,
                percentage
            }

            bars.push( bar );

            buf = buf.slice( nextUpIndex );

        }

        

    }

    const sortedByPercentage = [...bars].sort( (a,b) => {return a.percentage - b.percentage} );

    const minPercent = sortedByPercentage[0].percentage;
    const maxPercent = sortedByPercentage[ sortedByPercentage.length - 1 ].percentage;

    const percentDistance = Math.abs( minPercent - maxPercent );

    const final = bars.map(bar => {
        return {
            ...bar,
            height: bar.percentage / percentDistance * 100
        }
    } );

    return final;

}