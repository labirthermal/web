import { ThermalFileInstance } from "../../../../file/ThermalFileInstance";
import { ThermalManager } from "../../../../hierarchy/ThermalManager";
import { AbstractPoint } from "../../analysis/internals/AbstractPoint";

export interface ITool {
    key: string,
    name: string,
    description: string,
    icon: string,
    active: boolean,
}

export abstract class AbstractTool {

    public active: boolean = false;

    public constructor(
        public readonly manager: ThermalManager
    ) { }

    /** Action taken upon tool activation */
    public activate(): void {
        this.onActivate();
    }
    protected abstract onActivate(): void;

    /** Actions taken upon tool deactivation */
    public deactivate() {
        this.onDeactivate();
    }
    protected abstract onDeactivate(): void;



    public abstract onCanvasClick(x: number, y: number, file: ThermalFileInstance): void;

    public abstract onCanvasLeave(file: ThermalFileInstance): void;

    /** Whenever a point is entered by the mouse */
    public abstract onPointEnter(point: AbstractPoint): void;

    /** Whenever the mouse leaves the point */
    public abstract onPointLeave(point: AbstractPoint): void;

    /** Whenever the point should move to a new position */
    public abstract onPointMove(point: AbstractPoint, top: number, left: number): void;

    /** Whenever a point is clicked */
    public abstract onPointDown(point: AbstractPoint): void;

    /** Whenever a point is ended clicking */
    public abstract onPointUp(point: AbstractPoint): void;

    /** Assamble the cursor label at the given point */
    public abstract getLabelValue(x: number, y: number, file: ThermalFileInstance): string;

}