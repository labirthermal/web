import { useCallback, useRef } from '@wordpress/element';

/**
 * Creates a React ref callback for a webcomponent
 * @param {(element: HTMLElement) => (void|(() => void))} onReady Callback invoked when the webcomponent is ready
 * @return {(element: HTMLElement) => void} React ref callback
 */
export const useWebcomponent = ( onReady ) => {
	const cleanupRef = useRef();

	return useCallback(
		( element ) => {
			cleanupRef.current?.();
			cleanupRef.current = undefined;

			if ( ! element ) {
				return;
			}

			const cleanup = onReady( element );
			if ( typeof cleanup === 'function' ) {
				cleanupRef.current = cleanup;
			}
		},
		[ cleanupRef, onReady ]
	);
};
