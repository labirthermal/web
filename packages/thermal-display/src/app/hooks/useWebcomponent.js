import { useCallback, useRef } from '@wordpress/element';

/**
 * Creates a React ref callback for a webcomponent
 * @param {(element: HTMLElement) => (void|(() => void))} onReady Callback invoked when the webcomponent is ready
 * @returns {(element: HTMLElement) => void} React ref callback
 */
export const useWebcomponent = (
    onReady
) => {

    return useCallback( element => {

        if (!element) return;

        onReady(element);

    }, [onReady] );

}