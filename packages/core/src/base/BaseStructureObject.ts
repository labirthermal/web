import { ThermalFileInstance } from "../file/ThermalFileInstance";


export abstract class BaseStructureObject {

    public abstract getInstances(): ThermalFileInstance[];

    public abstract destroySelfAndBelow(): void;

    public abstract removeAllChildren(): void;

    public abstract reset(): void;

}