import { useCallback, useEffect, useId, useMemo, useState } from '@wordpress/element';

export const useNotations = (notations = {}, setAttributes, duration) => {

    console.log(notations);

    const [state, setState] = useState(notations);

    const addNotation = useCallback( (
        from,
        to,
        label,
        img
    ) => {

        if ( duration === undefined || duration === 0 ) {
            return;
        }

        const id = Math.random();

        const notation = {
            id,
            from,
            to,
            label,
            img
        };

        const newState = {...state, [id]: notation};
        setState(newState);

        return notation;

    }, [state, setState, duration]);



    const removeNotation = useCallback((
        id
    ) => {
        console.log("removing notation", id);
        const newState = {...state};
        delete newState[id.toString()];
        setState(newState);
    }, [state, setState]);

    

    const updateNotation = useCallback( (
        id,
        updates
    ) => {

        console.log("updating", id, updates);

        const notation = state[id];

        if ( notation ) {

            const newNotation = {
                ...notation,
                ...updates
            };

            const newState = {
                ...state,
                [id]: newNotation
            };

            setState(newState);

            console.log("updated", newState);

        }

    }, [state,setState, duration] );

    useEffect( () => {

        const arr = Object.values(state);

        if ( arr.length === 0 ) {
            return;
        }

        const newState = {...state};

        // setState(newState);

    }, [state, duration, setState] );



    const array = useMemo(() => {
        const arr = Object.values(state);
        return arr;//.sort( (a,b) => a.from - b.from );
    }, [state]);

    useEffect(() => {
        if ( Object.values(state).length > 0 ) {
            setAttributes( {notations:state} );
        }
    }, [state]);

    



    return {
        notations: state,
        array,
        addNotation,
        removeNotation,
        updateNotation
    }

}