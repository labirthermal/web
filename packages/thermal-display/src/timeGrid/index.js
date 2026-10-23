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
		src: <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
		<g>
		  <g id="Layer one">
			<path d="M327.6,240c-5.4-4.7-13.6-7.1-24.6-7.1h-51.9v60.8h52c10.9,0,19-2.4,24.6-7.2s8.2-12.7,8.2-23.6-2.8-18.1-8.3-22.8Z"/>
			<path d="M252.4,0L18.9,90.7h-.6v421.3h466.9V90.7h.6L252.4,0ZM161.8,411.9h-47.5v-216h47.5v216ZM342.1,411.9c-2.8-7.9-4.5-16.2-4.9-24.6-.6-9.5-1.5-18.4-2.7-27.2-1.6-11.3-5-19.5-10.3-24.8s-13.8-7.9-25.7-7.9h-47.5v84.4h-47.5v-215.9h116.4c8.9-.1,17.8,1.5,26.2,4.7,7.4,2.9,14.2,7.3,19.9,12.8,5.5,5.4,9.8,11.8,12.7,18.9,3,7.3,4.5,15.2,4.4,23.1.3,11.5-2.4,22.9-7.9,33-6,9.9-15.3,17.3-26.2,21.2v.6c5.3,1.3,10.3,3.9,14.5,7.4,3.8,3.3,7,7.3,9.4,11.8,2.5,4.7,4.3,9.7,5.3,15,1.1,5.4,1.9,10.9,2.3,16.3.2,3.4.4,7.5.6,12.1s.6,9.2,1.1,14.2c.5,4.6,1.3,9.2,2.4,13.7.9,4,2.6,7.7,5,11.1h-47.6Z"/>
		  </g>
		</g>
	  </svg>
	}
});
