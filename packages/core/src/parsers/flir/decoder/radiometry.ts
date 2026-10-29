import { FlirCameraInfo } from "./cameraInfo";
import { requireFlir } from "./FlirDecodingError";

export type FlirTemperatures = {
    /** Degrees Celsius, row-major */
    celsius: Float32Array,
    min: number,
    max: number
};

/**
 * Convert detector counts into object temperatures in °C.
 *
 * Uses the commonly published FLIR radiometric model: the counts are
 * corrected for the reflected radiation, the atmosphere (two-band
 * transmission model) and an optional IR window, then the Planck curve
 * calibrated by R1, R2, B, F and O is inverted.
 *
 * Because the input are 16-bit integers, the conversion is computed only
 * once for every distinct count within the measured range.
 *
 * @throws FlirDecodingError when the parameters or the results are not physically valid
 */
export const computeTemperatures = ( counts: Uint16Array, camera: FlirCameraInfo ): FlirTemperatures => {

    const {
        emissivity,
        objectDistance,
        reflectedKelvins,
        atmosphericKelvins,
        irWindowKelvins,
        irWindowTransmission,
        relativeHumidity,
        planckR1,
        planckR2,
        planckB,
        planckF,
        planckO,
        atmosphericTransAlpha1,
        atmosphericTransAlpha2,
        atmosphericTransBeta1,
        atmosphericTransBeta2,
        atmosphericTransX
    } = camera;

    const parameters = Object.values( camera );
    requireFlir( parameters.every( value => Number.isFinite( value ) ), "The FLIR calibration parameters are not finite." );
    requireFlir( emissivity > 0 && emissivity <= 1, `Invalid emissivity ${emissivity}.` );
    requireFlir( irWindowTransmission > 0 && irWindowTransmission <= 1, `Invalid IR window transmission ${irWindowTransmission}.` );
    requireFlir( objectDistance >= 0, `Invalid object distance ${objectDistance}.` );
    requireFlir( planckR1 !== 0 && planckR2 !== 0 && planckB > 0, "Invalid Planck constants." );
    requireFlir( reflectedKelvins > 0 && atmosphericKelvins > 0 && irWindowKelvins > 0, "Invalid reference temperatures." );

    // Atmospheric transmission (distance is split between the atmosphere in front of and behind the IR window)
    const ambientCelsius = atmosphericKelvins - 273.15;
    const waterVapour = relativeHumidity * Math.exp(
        1.5587
        + 0.06939 * ambientCelsius
        - 0.00027816 * ambientCelsius ** 2
        + 0.00000068455 * ambientCelsius ** 3
    );
    const halfDistance = Math.sqrt( objectDistance / 2 );
    const sqrtWater = Math.sqrt( waterVapour );
    const tau = atmosphericTransX * Math.exp( -halfDistance * ( atmosphericTransAlpha1 + atmosphericTransBeta1 * sqrtWater ) )
        + ( 1 - atmosphericTransX ) * Math.exp( -halfDistance * ( atmosphericTransAlpha2 + atmosphericTransBeta2 * sqrtWater ) );

    requireFlir( tau > 0 && Number.isFinite( tau ), "Invalid atmospheric transmission." );

    const radiance = ( kelvins: number ) => planckR1 / ( planckR2 * ( Math.exp( planckB / kelvins ) - planckF ) ) - planckO;

    const attenuation = ( 1 - emissivity ) / emissivity * radiance( reflectedKelvins )
        + ( 1 - tau ) / ( emissivity * tau ) * radiance( atmosphericKelvins )
        + ( 1 - irWindowTransmission ) / ( emissivity * tau * irWindowTransmission ) * radiance( irWindowKelvins )
        + ( 1 - tau ) / ( emissivity * tau * irWindowTransmission * tau ) * radiance( atmosphericKelvins );

    const gain = emissivity * tau * irWindowTransmission * tau;

    let minCount = 0xFFFF;
    let maxCount = 0;
    for ( let index = 0; index < counts.length; index++ ) {
        const count = counts[ index ];
        if ( count < minCount ) minCount = count;
        if ( count > maxCount ) maxCount = count;
    }

    const lookup = new Float64Array( maxCount - minCount + 1 );

    for ( let count = minCount; count <= maxCount; count++ ) {
        const objectSignal = count / gain - attenuation + planckO;
        const kelvins = planckB / Math.log( planckR1 / ( planckR2 * objectSignal ) + planckF );
        lookup[ count - minCount ] = kelvins - 273.15;
    }

    const celsius = new Float32Array( counts.length );
    let min = Infinity;
    let max = -Infinity;

    for ( let index = 0; index < counts.length; index++ ) {

        const value = lookup[ counts[ index ] - minCount ];

        requireFlir( Number.isFinite( value ) && value > -273.15, "The FLIR raw data produced an invalid temperature." );

        celsius[ index ] = value;

        // Extremes must match the stored single precision values
        const stored = celsius[ index ];
        if ( stored < min ) min = stored;
        if ( stored > max ) max = stored;

    }

    return { celsius, min, max };

};
