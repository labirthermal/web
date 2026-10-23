import { useState, useMemo, createPortal, useRef, useEffect, useCallback } from '@wordpress/element';

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

    const updateAnalysis = useCallback( (
        key,
        value
    ) => {
        map.set( key, value );

        if ( instance ) {
            const analysis = instance.analysis.layers.get( key );
            analysis.recieveSerialized( value );
        }

    }, [
        attributes,
        setAttributes,
        instance,
        map
    ] );


    const nextFreeKey = useMemo( () => {

		for (let i = 1; i <= 7; i++) {
			const key = `analysis${i}`;
			const currentValue = attributes[key];
			if (currentValue !== undefined || currentValue !== "") {
				return key;
			}
		}

		return undefined;

	}, [
		attributes
	] );

    return {
        map,
        registerAnalysis
    }

}