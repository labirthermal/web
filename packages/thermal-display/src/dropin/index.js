/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import { createLibScriptElement } from '../utils/libScriptElement';


/**
 * Load the external JS library for webcomponents
 * 
 * Uses ESM variant of the file downloaded from JSfiddle.
 * 
 * @todo Export ESM build right from @labir/embed
 */
const loadExternalLibrary = () => {

	const el = createLibScriptElement( document );

	document.head.appendChild( el );

}

loadExternalLibrary();





/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	icon: {
		src: <svg id="Vrstva_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
		<rect x="1" width="511" height="406.08" rx="19.65" ry="19.65"/>
		<line x1="31.36" y1="30" x2="100.3" y2="30" fill="none" stroke="#818080" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89"/>
		<g>
		  <line x1="279.91" y1="92.51" x2="410.74" y2="92.51" fill="none" stroke="#818080" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89"/>
		  <line x1="279.91" y1="120.08" x2="396.65" y2="120.08" fill="none" stroke="#818080" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89"/>
		  <line x1="279.91" y1="147.66" x2="470.3" y2="147.66" fill="none" stroke="#818080" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89"/>
		  <line x1="279.91" y1="175.23" x2="355.95" y2="175.23" fill="none" stroke="#818080" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89"/>
		</g>
		<g>
		  <path d="M483.05,512v-171.78s.02-.09.03-.13c1.15-6.15-2.24-12.25-8.07-14.51l-96.57-37.53c-1.51-.59-3.11-.88-4.71-.88h0c-1.6,0-3.19.29-4.71.88l-95.38,37.05c-5.62,1.44-9.77,6.53-9.77,12.6v174.31h219.17Z" fill="#fff"/>
		  <polyline points="373.74 300.17 470.3 337.69 470.05 337.69 470.05 512 276.88 512 276.88 337.69 277.13 337.69 373.74 300.17"/>
		  <path d="M353.14,468.3h23.02v-40.9h23.02c5.77,0,9.89,1.26,12.45,3.83,2.57,2.57,4.22,6.54,4.99,12.02.58,4.26,1.02,8.58,1.31,13.18.19,4.05,1.01,8.06,2.36,11.87h-.03l.05.05s-.01-.03-.02-.05h23.03c-1.16-1.65-1.99-3.44-2.42-5.38-.53-2.18-.92-4.41-1.16-6.64-.24-2.42-.44-4.65-.53-6.88s-.19-4.22-.29-5.86c-.19-2.62-.58-5.28-1.11-7.9-.48-2.57-1.36-4.99-2.57-7.27-1.16-2.18-2.71-4.12-4.55-5.72-2.04-1.7-4.46-2.96-7.03-3.59v-.29c5.28-1.89,9.79-5.48,12.7-10.27,2.67-4.89,3.97-10.42,3.83-15.99.05-3.83-.68-7.66-2.13-11.19-1.41-3.44-3.49-6.54-6.15-9.16-2.76-2.67-6.06-4.8-9.64-6.2-3.95-1.51-8.13-2.28-12.31-2.28-.13,0-.25,0-.38,0h-56.4v104.62" fill="#fff"/>
		  <polyline points="309.91 468.35 332.93 468.35 332.93 363.69 309.91 363.69 309.91 468.35" fill="#fff"/>
		  <g>
			<path d="M413.27,385.05c-2.62-2.28-6.59-3.44-11.92-3.44h-25.15v29.46h25.2c5.28,0,9.21-1.16,11.92-3.49,2.71-2.33,3.97-6.15,3.97-11.44s-1.36-8.77-4.02-11.05v-.05Z"/>
			<path d="M401.35,381.61c5.33,0,9.3,1.16,11.92,3.44v.05c2.67,2.28,4.02,5.77,4.02,11.05s-1.26,9.11-3.97,11.44c-2.71,2.33-6.64,3.49-11.92,3.49h-25.2v-29.46h25.15"/>
		  </g>
		</g>
		<g>
		  <path d="M204.29,237.65V95.71c0-7.44-6.03-13.47-13.47-13.47h-74.87c-7.44,0-13.47,6.03-13.47,13.47v141.94c-16.05,14.58-25.12,35.38-24.59,57.65.98,41.15,35.35,74.21,76.51,73.66,41.18-.54,74.51-34.21,74.51-75.51,0-21.56-9.01-41.62-24.62-55.8Z" fill="#fff"/>
		  <path d="M181.29,248.96v-97.14h-55.81v97.14c-14.78,9.29-24.62,25.74-24.62,44.49,0,29.34,24.99,53.47,54.32,52.48,28.17-.95,50.72-24.09,50.72-52.49,0-18.75-9.83-35.19-24.62-44.49Z"/>
		</g>
	  </svg>
	}
});
