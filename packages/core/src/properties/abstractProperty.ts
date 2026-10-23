import { ThermalFileInstance } from "../file/ThermalFileInstance";
import { ThermalGroup } from "../hierarchy/ThermalGroup";
import { ThermalStatistics } from "../hierarchy/ThermalRegistry";
import { ThermalMinmaxOrUndefined } from "./scale/abstractMinmaxProperty";
import { AnalysisDataStateValue } from "./analysis/data/AnalysisDataState";
import { AbstractAnalysis } from "./analysis/analysis/internals/AbstractAnalysis";
import { ThermalCursorPositionOrUndefined } from "./cursor/CursorPositionDrive";
import { ThermalRangeOrUndefined } from "./scale/RangeDriver";
import { AbstractTool } from "./analysis/tool/internals/AbstractTool";
import { AnalysisSlotsMap } from "./analysis/slots/AnalysisSlotsDrive";
import { ThermalGraphGroupDataOrUndefined } from "./analysis/group/AnalysisGroupGraph";
import { CallbacksManager } from "./callbacksManager";
import { BaseStructureObject } from "../base/BaseStructureObject";

/** All available property data types */
type PropertyListenersTypes = boolean
    | number
    | string
    | ThermalRangeOrUndefined
    | ThermalMinmaxOrUndefined
    | ThermalCursorPositionOrUndefined
    | ThermalGroup[]
    | ThermalStatistics[]
    | ThermalFileInstance[]
    | AbstractAnalysis[]
    | AbstractTool
    | AnalysisDataStateValue
    | AnalysisSlotsMap
    | ThermalGraphGroupDataOrUndefined;

type PropertyListenerFn<T extends PropertyListenersTypes> = (value: T) => void


/** 
 * A common basis for all observable properties.
 * 
 * Principle:
 * - the value is stored internally
 * - update should be done only using `this.value = newValue` setter which will call
 *     - the validation
 *     - the side effects
 *     - the listeners on the value change
 * - Listeners are stored in a `CallbacksManager` object which is controlled by methods such as `addListener`, `removeListener` and `clearAllListeners`
 * - for the purpose of value assignment from the outside, every individual property should create its own public methods that respect principles mentioned above.
 * 
 * @internal 
 */
export abstract class AbstractProperty<
    ValueType extends PropertyListenersTypes,
    ParentType extends BaseStructureObject
> {

    private _value: ValueType;

    /** Validation is called before every value change through the `value` setter. */
    protected abstract validate(value: ValueType): ValueType;

    /** What should be done whenever the value changes? */
    protected abstract afterSetEffect(value: ValueType): void

    /** Get the current value @readonly */
    public get value() { return this._value; };

    /** Get the initial value of this property @readonly */
    public get valueInitial() { return this._initial; }

    /** 
     * Set the value and call all listeners. 
     * - Validates the value before settings
     * - Calls side effects after setting the value
     * - Calls all the listeners with the new values
     * @internal 
     */
    protected set value(
        value: ValueType
    ) {
        this._value = this.validate(value);
        this.afterSetEffect(this._value);
        this._listeners.call( this._value );
    }

    private _listeners: CallbacksManager<PropertyListenerFn<ValueType>> = new CallbacksManager();



    public constructor(
        public readonly parent: ParentType,
        private readonly _initial: ValueType
    ) {
        this._value = this.validate(this._initial);
    }




    /** Set the value to its initial state */
    public reset() { this.value = this._initial; }

    /**
     * Add a listener to the property value changes.
     * @param id Identificator of the listening object needs to be unique - it will be the key in the `Map of listeners`
     * @param listener The function that will be triggered whenever the value changes.
     */
    public addListener(
        id: string,
        listener: PropertyListenerFn<ValueType>
    ) {
        this._listeners.set( id, listener );
    }

    /** Remove the listener from the `Map` by its unique ID. */
    public removeListener(
        id: string
    ) {
        this._listeners.delete( id );
    }

    /** Remove all listeners from the `Map` */
    public clearAllListeners() {
        this._listeners.clear();
    }

    /** 
     * Arbitrary call all registered listeners usin the current value of the property. 
     * 
     * This method should be used only in special cases, for example when the value is concieved as a reference, therefore its updates does not use the standard setter which triggers the listeners, side effects ac ati.
     */
    protected callAllListenersWithCurrentValue() {
        this._listeners.call( this._value );
    }

}