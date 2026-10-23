import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { ThermalRegistry } from "../../hierarchy/ThermalRegistry";
import { AbstractProperty } from "../abstractProperty";


/** Handles group creation and removal */
export class GroupsState extends AbstractProperty<ThermalGroup[], ThermalRegistry> {

    protected _map: Map<string, ThermalGroup> = new Map<string,ThermalGroup>();

    public get map() { return this._map; }

    protected validate(value: ThermalGroup[]): ThermalGroup[] {
        return value;
    }

    protected afterSetEffect(value: ThermalGroup[]) {

        // Clear the index
        this._map.clear();

        // Create the new values in the index
        value.forEach( group => this._map.set( group.id, group ) );

    }

    public addExistingGroup( group: ThermalGroup ) {
        
        if ( ! this.value.map( g => g.hash ).includes( group.hash ) ) {
            this.value = [...this.value, group];
        }

    }

    public addOrGetGroup(
        groupId: string,
        name?: string,
        description?: string
    ) {
        if ( this._map.has( groupId ) ) {
            return this._map.get( groupId ) as ThermalGroup;
        }

        // Create the new group
        const group = new ThermalGroup(this.parent, groupId, name, description);

        // Add this group to the index
        this._map.set( groupId, group );

        // Add the group to the value
        this.value.push( group );

        // Push the new array of values
        this.value = [...this.value];

        return group;
    }

    public removeGroup(
        groupId: string
    ) {

        // Do nothing when the group is not there
        if ( !this._map.has( groupId ) ) {
            return;
        }

        // Call the destroy method of the group
        this._map.get( groupId )?.destroySelfAndBelow();

        // Delete the group from the index
        this._map.delete( groupId );

        // Recreate the index
        this.value = Array.from( this._map.values() );

    }

    public removeAllGroups() {

        // Trigger the destruction of all existing groups
        this.value.forEach( group => group.destroySelfAndBelow() );

        // Set the empty array of groups
        this.value = [];

    }

}