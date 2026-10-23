import type { ThermalGroup } from "@labirthermal/core";
import { consume } from "@lit/context";
import type {
    GroupController
} from "../../controllers/GroupController";
import {
    groupControllerContext
} from "../../controllers/GroupController";
import { AbstractRegistryConsumer } from "./AbstractRegistryConsumer";

/**
 * A webcomponent consuming a `ThermalGroup` exposed by a parent `GroupController`.
 * 
 * Subscribes to the `GroupController` that is exposed by a parent. Typically, this can be either:
 * - a top-level app extending `AbstractApp` 
 * - or a `RegistryProviderElement` nested lower within the component tree.
 * 
 * @see {@link GroupController}
 * @see {@link ThermalGroup}
 * 
 * @example
 * ```js
import { AbstractGroupConsumer, registryOpacityContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
class MyComponent extends AbstractGroupConsumer {

    // The `ThermalGroup` object does not have any value contexts
    
}
 * ```
 * 
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export abstract class AbstractGroupConsumer extends AbstractRegistryConsumer {

    /** Alias to the `ThermalGroup` object from the `groupController` */
    public get groupObject(): ThermalGroup {
        return this.groupController.groupObject;
    }

    /** 
     * Inherited `GroupController` from the context. This controller provides a direct access to:
     * - the @labirthermal/core `ThermalGroup`
     * - the properties and methods of `GroupController` and the host
     * @see {@link GroupController}
     * @see {@link ThermalGroup}
     */
    @consume({ context: groupControllerContext, subscribe: true })
    groupController!: GroupController;

}