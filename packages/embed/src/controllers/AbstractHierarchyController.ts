import type { PropertyDeclaration, PropertyValues } from "lit";
import { AbstractReactiveController } from "./AbstractReactiveController";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";

/** 
 * Common internal state for host elements that should be only internal states. 
 * @module @labirthermal/core
 * @author Jan Jáchim <jachim@zcu.cz>
 * @see {@link AbstractReactiveController}
 */
export const INTERNAL_STATE_DECLARATION: PropertyDeclaration = { reflect: false, state: true }

/** 
 * A declaration of the host property for the purpose of its reactive properties. 
 * 
 * Used in the static properties of the particular controller:
 * 
 * ```ts
 * 
 * export interface IElementWithMyController extends IBaseElement {
 *  aPublicProperty: string | undefined;
 * }
 * 
 * export class MyController extends AbstractHierarchyController<IElementWithMyController> {
 * 
 *  public static HOST_PROPERTIES: HostReactiveProperties<IElementWithMyController> = {
 *      aPublicProperty: { reflect: true, attribute: "a-public-property" }
 * }
 * 
 * }
 * ```
 * 
 * Once the reactive property is defined this way, it can be accessed from the outside this way:
 * 
 * ```html
 * <my-element a-public-property="value"></my-element>
 * ```
 * 
 */
export type HostReactiveProperties<T> = {
    [key in keyof T]: PropertyDeclaration;
}

/** 
 * Abstract base class for controllers related to the hierarchy of `@labirthermal/core`.  
 * 
 * This type of controllers has a special way of updating depending on the lifecycle of its host element.
 * 
 * In the constructor of this controller, the constructor is added to the {@link HierarchyUpdatesHub} and therefore all the updates are trigged directly by the corresponding `willUpdate` and `updated` methods of the host.
 * 
 * When working with various side effects and callbacks, it is important to split operations correctly in 
 * - a) `hostWillUpdateWatcher` - for setting properties/states as side effects before render
 * - b) `hostUpdatedWatcher` - for binding listeners & other stuff after the host is rendered.
 * 
 */
export abstract class AbstractHierarchyController<T extends AbstractThermalElement> extends AbstractReactiveController<T> {

    constructor(host: T) {
        super(host);
        this.host.initHierarchy().register( this );
    }

    /** 
     * This method will be called automatically by the host element in its `willUpdate` method. 
     * @see {@link AbstractThermalElement}
     */
    abstract hostWillUpdateWatcher(value: PropertyValues<T>): void;

    /** 
     * This method will be called automatically by the host element in its `updated` method. 
     * @see {@link AbstractThermalElement}*/
    abstract hostUpdatedWatcher(value: PropertyValues<T>): void;

    /** Retrieve the default slug from the host element, falling back to the element UUID. Should be called only in host connected. */
    protected _getDefaultSlugFromHost(
        primaryAttributeName: string
    ): string {
        return this.host.getAttribute(primaryAttributeName) ?? this.host.getAttribute("slug") ?? this.UUID;
    }
    
}