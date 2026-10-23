import type { PropertyValues } from "lit";
import type { AbstractHierarchyController } from "./AbstractHierarchyController";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";


/** Perform updates in the hierarchy for all registered controllers */
export class HierarchyUpdatesHub {

    private _controllers: AbstractHierarchyController<AbstractThermalElement>[] = [];

    /** Zaregistruje controller do hubu */
    public register<C extends AbstractHierarchyController<AbstractThermalElement>>(controller: C): C {
        this._controllers.push(controller);
        return controller;
    }

    /** Zavolá willUpdate na všech zaregistrovaných controllerech */
    public willUpdate(changedProperties: PropertyValues<AbstractThermalElement>): void {
        for (const controller of this._controllers) {
            controller.hostWillUpdateWatcher?.(changedProperties);
        }
    }

    /** Zavolá updated na všech zaregistrovaných controllerech */
    public updated(changedProperties: PropertyValues<AbstractThermalElement>): void {
        for (const controller of this._controllers) {
            controller.hostUpdatedWatcher?.(changedProperties);
        }
    }


}