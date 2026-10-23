const scriptId = "labir_embed_lib_dynamical";

const homeUrl = window.location.origin;


/**
 * Create a script element with the ESM library 
 * 
 * It shall be used in block editor.
 * 
 * @param {Document} document 
 */
export const createLibScriptElement = ( document ) => {

    const element = document.createElement( "script" );
    element.type = "module";
    element.id = scriptId;
    element.innerHTML = `import '${homeUrl}/wp-content/plugins/thermal-display/assets/embed.iife.js'`;
    // element.innerHTML = `import 'https://cdn.jsdelivr.net/npm/@labir/embed@1.2.62/+esm'`;

    return element;

}


/**
 * Check if the given document includes the necessary script.
 * 
 * @param {Document} document 
 * @returns {Boolean}
 */
export const documentHasLibScriptElement = ( document ) => {

    const element = document.getElementById( scriptId );

    return element ? true : false;

}