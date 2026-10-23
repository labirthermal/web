import type { ThermalManager } from "@labirthermal/core";
import { consume } from "@lit/context";
import { AbstractThermalElement } from "../AbstractThermalElement";
import type { ManagerController } from "../../controllers/ManagerController";
import { managerControllerContext } from "../../controllers/ManagerController";

/**
 * A webcomponent consuming a `ThermalManager` exposed by a parent `ManagerController`.
 * 
 * Subscribes to the `ManagerController` that is exposed by a parent. Typically, this can be either:
 * - a top-level app extending `AbstractApp` 
 * - or a `ManagerProviderElement` nested lower within the component tree.
 * 
 * For particular value access, this component can consume specialised contexts such as:
 * - `managerPaletteContext` for opacity values
 * - `managerAdvancedPaletteContext` for the actual thermal scale value
 * - `managerToolContext` for the starting value of the thermal scale
 * - etc.
 * 
 * Whenever the value in any consumed context changes, this component will automatically update and rerender.
 * 
 * If this component needs to manipulate the values, the recommanded way to do so is to use the methods of `ManagerController`.
 * 
 * @see {@link ManagerController}
 * @see {@link ThermalManager}
 * 
 * @example
 * ```js
import { AbstractManagerConsumer, managerPaletteContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
class MyComponent extends AbstractManagerConsumer {

    // If the value changes in the context, this webcomponent will update
    \@consume({ context: managerToolContext, subscribe: true })
    private toolValue!: ThermalTool;

    // Set the tool value using the controller
    private setTool(value: ThermalTool) {
        this.managerController.setTool(value);
    }

    // Tool can also be set directly in the `ThermalManager`,
    // but this is not recommended.
    private setToolDirectly(value: ThermalTool) {
        this.managerObject.tool.selectTool(value);
    }

}
 * ```
 * 
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export abstract class AbstractManagerConsumer extends AbstractThermalElement {

    /** Alias to the `ThermalManager` from the `ManagerController` */
    public get managerObject(): ThermalManager {
        return this.managerController.managerObject;
    }

    /**
     * Inherited from the `ManagerController` context. This controller provides direct access to:
     * - the `ThermalManager` instance
     * - various methods to manipulate the manager's state
     * @see {@link ManagerController}
     * @see {@link ThermalManager}
     */
    @consume({ context: managerControllerContext, subscribe: true })
    public managerController!: ManagerController;

}