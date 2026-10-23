import type { ThermalRegistry } from "@labirthermal/core";
import { consume } from "@lit/context";
import type { RegistryController } from "../../controllers/RegistryController";
import { registryControllerContext } from "../../controllers/RegistryController";
import { AbstractManagerConsumer } from "./AbstractManagerConsumer";

/**
 * A webcomponent consuming a `ThermalRegistry` exposed by a parent `RegistryController`.
 * 
 * Subscribes to the `RegistryController` that is exposed by a parent. Typically, this can be either:
 * - a top-level app extending `AbstractApp` 
 * - or a `RegistryProviderElement` nested lower within the component tree.
 * 
 * For particular value access, this component can consume specialised contexts such as:
 * - `registryOpacityContext` for opacity values
 * - `registryRangeToContext` for the actual thermal scale value
 * - `registryRangeFromContext` for the starting value of the thermal scale
 * - etc.
 * 
 * Whenever the value in any consumed context changes, this component will automatically update and rerender.
 * 
 * If this component needs to manipulate the values, the recommanded way to do so is to use the methods of `RegistryController`.
 * 
 * @see {@link RegistryController}
 * @see {@link ThermalRegistry}
 * 
 * @example
 * ```js
import { AbstractRegistryConsumer, registryOpacityContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
class MyComponent extends AbstractRegistryConsumer {

    // If the value changes in the context, this webcomponent will update
    \@consume({ context: registryOpacityContext, subscribe: true })
    private opacityValue!: number;

    // Set the opacity calue using the controller
    private setOpacityValue(value: number) {
        this.registryController.setOpacity(value);
    }

    // Opacity can also be set directly in the `ThermalRegistry`,
    // but this is not recommended.
    private setOpacityValueDirectly(value: number) {
        this.registryObject.opacity.setOpacity(value);
    }

}
 * ```
 * 
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export abstract class AbstractRegistryConsumer extends AbstractManagerConsumer {

    /** Alias to the `ThermalRegistry` from the `RegistryController` */
    public get registryObject(): ThermalRegistry {
        return this.registryController.registryObject;
    }

    /** 
     * Inherited `RegistryController` from the context. This controller provides a direct access to:
     * - the @labirthermal/core `ThermalRegistry`
     * - the properties and methods of `RegistryController` and the host
     * @see {@link RegistryController}
     * @see {@link ThermalRegistry}
     */
    @consume({ context: registryControllerContext, subscribe: true })
    public registryController!: RegistryController;

}