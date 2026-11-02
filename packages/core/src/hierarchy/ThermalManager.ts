import * as workerpool from "workerpool";
import Pool from "workerpool/types/Pool";
import { UnitDrive } from "../properties/scale/UnitDrive";
import { ThermalUnit } from "../properties/scale/units";
import { BaseStructureObject } from "../base/BaseStructureObject";
import { ThermalFileInstance } from "../file/ThermalFileInstance";
import { AvailableThermalPalette } from "../properties/scale/palettes";
import { FilterContainer } from "../filters/FilterContainer";
import { FilesService } from "../loading/workers/FilesService";
import { GraphSmoothDrive } from "../properties/display/GraphSmoothDrive";
import { PaletteDrive } from "../properties/scale/PaletteDrive";
import { SmoothDrive } from "../properties/display/SmoothDrive";
import { ToolDrive } from "../properties/analysis/tool/ToolDrive";
import { InspectTool } from "../properties/analysis/tool/internals/InspectTool";
import { RegistriesState } from "../properties/lists/RegistriesState";

export type ThermalManagerOptions = {
    palette?: AvailableThermalPalette
}

const isChromium = "chrome" in window;

const options: workerpool.WorkerPoolOptions = isChromium
    ? {
        maxWorkers: 4
    }
    : {};

const globalPool = workerpool.pool(options);

export class ThermalManager extends BaseStructureObject {
    

    public readonly id: number;

    /** Service for creation of loading and caching the files. */
    public readonly service = new FilesService(this);

    /** Registries management state */
    public readonly registries = new RegistriesState(this, []);

    /** A palette is common to all registries within the manager */
    public readonly palette: PaletteDrive = new PaletteDrive(this, "jet");

    public readonly smooth: SmoothDrive = new SmoothDrive(this, false );

    public readonly graphSmooth: GraphSmoothDrive = new GraphSmoothDrive(this, false);

    public readonly tool: ToolDrive = new ToolDrive( this, new InspectTool( this ) );

    public readonly unit: UnitDrive = new UnitDrive(this, ThermalUnit.C);

    

    public readonly pool: Pool;

    public constructor(
        pool?: Pool,
        options?: ThermalManagerOptions
    ) {
        super();

        this.pool = pool 
            ? pool 
            : globalPool;

        this.id = Math.random();

        if (options) {
            if (options.palette) {
                this.palette.setPalette(options.palette);
            }
        }
    }

    /* registries */

    public readonly filters = new FilterContainer( this );

    public getInstances() {

        const instances: ThermalFileInstance[] = [];

        this.registries.forEveryInstance( instance => {
            instances.push(instance);
        });

        return instances;
    }

    public destroySelfAndBelow(): void {

        this.removeAllChildren();

        this.reset();

    }

    public removeAllChildren(): void {

        this.registries.forEveryRegistry(registry => {
            this.registries.removeRegistry(registry.id);
        });

    }

    public reset(): void {
        this.palette.reset();
        this.smooth.reset();
        this.graphSmooth.reset();
        this.tool.reset();
    }


}