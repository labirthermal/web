
import { AvailableThermalPalette, defaultPaletteKey, ThermalPalettes } from "./palettes";
import { ThermalManager } from "../../hierarchy/ThermalManager";
import { AbstractProperty } from "../abstractProperty";

export class PaletteDrive extends AbstractProperty< AvailableThermalPalette, ThermalManager > {

    private get availablePalettes() {
        return ThermalPalettes;
    }

    /** All the current palette properties should be accessed through this property. */
    public get currentPalette() {
        return this.availablePalettes[ this.value ];
    }

    
    protected validate(value: AvailableThermalPalette): AvailableThermalPalette {
        return value;
    }

    /** Any changes to the value should propagate directly to every instance. */
    protected afterSetEffect() {

        this.parent.forEveryRegistry( registry => {

            registry.forEveryInstance( instance => instance.draw() );

        } );
            
    }

    /** Set a palette value and propagate the change to all instances. */
    public setPalette( key: AvailableThermalPalette ) {
        this.value = key;
    }

    /** Takes any string input and converts it to a valid AvailableThermalPalettes key */
    public sanitizeInputKey(
        input: string | null | undefined 
    ): AvailableThermalPalette {

        if ( input === null || input === undefined ) {
            return defaultPaletteKey;
        }

        // Try to find a matching palette
        const f = this.availablePalettes[ input as AvailableThermalPalette ];

        if ( f ) {
            return f.slug;
        } else {
            // If no match was found, return the default palette key
            return defaultPaletteKey;
        }


    }

}