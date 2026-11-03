import type { AvailableThermalPalette, ThermalManager, ThermalUnit } from "@labirthermal/core";
import { html } from "lit";
import type { IElementWithManagerController } from "../../controllers/ManagerController";
import { ManagerController } from "../../controllers/ManagerController";
import { AbstractThermalElement } from "../AbstractThermalElement";
import { removeManager } from "../providers/getters";

export abstract class AbstractManagerProvider extends AbstractThermalElement implements IElementWithManagerController {

    public static properties = {
        ...ManagerController.HOST_PROPERTIES
    };

    public managerSlug!: string;
    public managerObject!: ThermalManager;
    public managerController: ManagerController = new ManagerController(this);

    public palette: AvailableThermalPalette = "jet";

    public advancedPalettes: boolean = false;

    public smoothThermograms: boolean = false;

    public smoothGraph: boolean = false;

    public tool!: keyof ThermalManager["tool"]["tools"];

    public autoclear: boolean = false;

    public unit!: ThermalUnit;


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