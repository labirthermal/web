import type { AvailableThermalPalette, ThermalManager } from "@labirthermal/core";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { AbstractThermalElement } from "../AbstractThermalElement";
import type { IElementWithManagerController } from "../../controllers/ManagerController";
import { ManagerController } from "../../controllers/ManagerController";
import { removeManager } from "../providers/getters";

export abstract class AbstractManagerProvider extends AbstractThermalElement implements IElementWithManagerController {

    public static properties = {
        ...ManagerController.HOST_PROPERTIES
    };

    public managerSlug!: string;
    public managerObject!: ThermalManager;
    public managerController: ManagerController = new ManagerController(this);

    @property({
        type: String,
        reflect: true
    })
    public palette: AvailableThermalPalette = "jet";

    @property({
        type: Boolean,
        reflect: true
    })
    public advancedPalettes: boolean = false;

    @property({
        type: String,
        reflect: true
    })
    public smoothThermograms: boolean = false;

    @property({
        type: String,
        reflect: true
    })
    public smoothGraph: boolean = false;

    public tool!: keyof ThermalManager["tool"]["tools"];

    public autoclear: boolean = false;


    disconnectedCallback(): void {
        super.disconnectedCallback();

        if (this.autoclear === true && this.managerObject !== undefined) {
            removeManager(this.managerObject);
        }
    }

    protected render(): unknown {
        return html`<slot></slot>`;
    }

}