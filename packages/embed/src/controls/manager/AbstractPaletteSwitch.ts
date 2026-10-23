import type { AvailableThermalPalette, ThermalPaletteType } from "@labirthermal/core";
import { ThermalPalettes } from "@labirthermal/core";
import { consume } from "@lit/context";
import type { PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { AbstractManagerConsumer } from "../../hierarchy/consumers/AbstractManagerConsumer";
import { managerAdvancedPalettesContext } from "../../controllers/ManagerController";
import { managerPaletteContext } from "../../controllers/ManagerController";
import type { ManagerPaletteContextType } from "../../controllers/ManagerController";

export abstract class AbstractPaletteSwitch extends AbstractManagerConsumer {

    protected static BASIC_PALETTES = ["iron", "jet", "white_hot", "black_hot"];


    @consume({ context: managerAdvancedPalettesContext, subscribe: true })
    @state()
    protected advancedPalettesContext: boolean = false;

    @property({ type: Boolean, attribute: "advanced-palettes" })
    public advancedPalettesProperty?: boolean;

    @state()
    protected palettes: ThermalPaletteType[] = [];

    @consume({ context: managerPaletteContext, subscribe: true })
    @state()
    protected value!: ManagerPaletteContextType;

    willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);

        const showAdvancedPalettes = this.advancedPalettesProperty ?? this.advancedPalettesContext;
        const basicPalettes = AbstractPaletteSwitch.BASIC_PALETTES;
        const optionsChanged = changedProperties.has("advancedPalettesContext")
            || changedProperties.has("advancedPalettesProperty");

        // Side effect of advanced palette options changing - derive the available palettes before rendering.
        if (optionsChanged) {

            if (showAdvancedPalettes) {
                this.palettes = Object.values(ThermalPalettes);
            } else {
                
                this.palettes = Object.entries(ThermalPalettes)
                    .filter(([key]) => AbstractPaletteSwitch.BASIC_PALETTES.includes(key))
                    .map(([, palette]) => palette);
            }

        }

        // Side effect of palette or options changing - select iron if the supplied palette is excluded by basic mode.
        if ((optionsChanged || changedProperties.has("value"))
            && this.value !== undefined
            && !showAdvancedPalettes
            && !basicPalettes.includes(this.value.key)) {
            this.onSelect("iron");
        }



    }


    /** Handle user input events */
    protected onSelect(palette: AvailableThermalPalette) {
        this.managerObject.palette.setPalette(palette);
    }


}