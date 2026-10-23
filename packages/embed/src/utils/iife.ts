type ComponentsCatalog = Record<string, CustomElementConstructor>;

/**
 * Registers and defines all custom elements from a provided list
 * 
 * @module @labirthermal/webcomponents
 * 
 */
export const defineAllWebcomponents = (
    name: string,
    version: string,
    catalog: ComponentsCatalog
) => {

    for ( const [tag, cls] of Object.entries( catalog ) ) {
        defineWebcomponent( name, version, tag, cls );
    }

}

/**
 * Registers a custom element and defines it right away.
 * 
 * @module @labirthermal/webcomponents
 */
export const defineWebcomponent = (
    name: string,
    version: string,
    tag: string,
    cls: CustomElementConstructor
) => {

    if ( customElements.get( tag ) ) {
        console.warn( name, version, "🟥", ...debugclsName( tag, cls ) );
        return;
    }

    customElements.define( tag, cls );
    console.info( name, version, "✅", ...debugclsName( tag, cls ) );

}

const tagNameMaxLength = 30;
const tagline = ".....................................";

const debugclsName = (
    tag: string,
    cls: CustomElementConstructor
) => {

    const tagLength = tag.length;

    if ( tagLength > tagNameMaxLength ) {
        tag = tag.substring( 0, tagNameMaxLength - 3 ) + "...";
    }

    return [
        tag,
        tagline.substring( 0, tagNameMaxLength - tagLength ),
        cls.name
    ];

}

