import type { ThermalRangeOrUndefined, ThermalRegistry } from "@labirthermal/core";
import { html } from "lit";
import { AbstractManagerConsumer } from "../consumers/AbstractManagerConsumer";
import type { IElementWithRegistryController } from "../../controllers/RegistryController";
import { RegistryController } from "../../controllers/RegistryController";

export abstract class AbstractRegistryProvider extends AbstractManagerConsumer implements IElementWithRegistryController {

    public static properties = {
        ...RegistryController.HOST_PROPERTIES,
    };


    registrySlug!: string;
    registryObject!: ThermalRegistry;
    registryController: RegistryController = new RegistryController(this);

    public opacity: number = 1;

    public min?: number;

    public max?: number;

    public from?: number;

    public to?: number;

    public loading: boolean = false;

    public autoclear: boolean = false;

    public highlight: ThermalRangeOrUndefined;

    disconnectedCallback(): void {
        super.disconnectedCallback();

        if (this.autoclear === true && this.registryObject !== undefined) {
            this.managerObject.removeRegistry(this.registryObject.id);
        }
    }


    protected render(): unknown {
        return html`<slot></slot>`;
    }


}