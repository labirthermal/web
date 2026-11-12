import { useCallback, useMemo } from '@wordpress/element';

export const useAnalysis = (
    attributes,
    setAttributes,
    instance
) => {

    const map = useMemo( () => {
        const m = new Map;

        // Scan attributes for existing values
        for ( let i = 0; i <= 7; i++ ) {
            const key = `analysis${i}`;
            const value = attributes[key];
            if ( value ) {
                m.set( key, value );
            }
        }

        return m;

    }, [] );

    const registerAnalysis = useCallback( (analysis) => {

        map.set( analysis.key, analysis.serialized );

        console.log( map );

        analysis.onSerialize.set( "___spying___", value => {
            map.set( analysis.key, value );
            console.log( map, value );
        } );

    }, [ map ] );

    return {
        map,
        registerAnalysis
    }

}