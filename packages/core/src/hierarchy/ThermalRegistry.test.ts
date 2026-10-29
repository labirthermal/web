import { describe, expect, test } from 'vitest';
import { ThermalManager } from './ThermalManager';
import { THERMOGRAM_PATHS as THERMOGRAM_PATHS } from '../../devserver/node/mocks';
import { getPool } from '../utils/pool';
import { ThermalFileInstance } from '../file/ThermalFileInstance';

describe("ThermalRegistry", async () => {

    const REGISTRY_ID = "registry_id";
    const GROUP_ID = "group_id";

    const pool = await getPool();

    test("loading of files", async () => {

        const manager = new ThermalManager( pool );
        const registry = manager.addOrGetRegistry(REGISTRY_ID);
        // const group = registry.groups.addOrGetGroup(GROUP_ID);

        // First load
        const instance = await registry.loadFullOneFile({ thermalUrl: THERMOGRAM_PATHS.SOUSTRUH }, GROUP_ID) as ThermalFileInstance;

        expect(registry.groups.value.length).toEqual(1);
        expect(instance.group.files.value.length).toEqual(1);

        // Validate if there is only one instance of the group
        expect(registry.groups.addOrGetGroup(GROUP_ID).id).toEqual(instance.group.id);


        // Second load - the instance should be loaded only once
        const instance2 = await registry.loadFullOneFile({ thermalUrl: THERMOGRAM_PATHS.CAS }, GROUP_ID) as ThermalFileInstance;

        expect(registry.groups.addOrGetGroup(GROUP_ID).id).toEqual(instance2.group.id);
        
        expect(instance2.group.files.value.length).toEqual(1);


        // Third load
        const multiple = await registry.loadFullMultipleFiles({
            [GROUP_ID]: [{ thermalUrl: THERMOGRAM_PATHS.CAS }]
        });

        const instance3 = multiple[0][0] as ThermalFileInstance;

        expect(registry.groups.addOrGetGroup(GROUP_ID).id).toEqual(instance.group.id);
        expect(instance3.group.files.value.length).toEqual(1);


        // Fourth load
        const multiple2 = await registry.loadFullMultipleFiles({
            [GROUP_ID]: [
                { thermalUrl: THERMOGRAM_PATHS.CAS },
                { thermalUrl: THERMOGRAM_PATHS.SOUSTRUH }
            ]
        });

        const instance4 = multiple2[0][0] as ThermalFileInstance;

        expect(registry.groups.addOrGetGroup(GROUP_ID).id).toEqual(instance.group.id);
        expect(instance4.group.files.value.length).toEqual(2);


        // Fifth load to a new group

        await registry.loadFullMultipleFiles({
            ["new_group"]: [
                { thermalUrl: THERMOGRAM_PATHS.CAS },
                { thermalUrl: THERMOGRAM_PATHS.SOUSTRUH },
                // { thermalUrl: THERMOGRAM_PATHS.CAS }
            ]
        });

        expect(registry.groups.addOrGetGroup(GROUP_ID).id).toEqual(instance.group.id);
        expect(instance.group.files.value.length).toEqual(0);

    });

    test("minmax is calculated from the groups", async () => {

        const manager = new ThermalManager(pool);
        const registry = manager.addOrGetRegistry(REGISTRY_ID);

        await registry.loadFullMultipleFiles({
            ["new_group"]: [
                { thermalUrl: THERMOGRAM_PATHS.TUCNACI },
                { thermalUrl: THERMOGRAM_PATHS.SEQUENCE },
                // { thermalUrl: THERMOGRAM_PATHS.CAS }
            ]
        });

        // The minimum comes from the image, the maximum from the sequence
        expect( registry.minmax.value!.min ).toEqual( 12.4560546875 );
        expect( registry.minmax.value!.max ).toEqual( 80.72999572753906 );
        expect( registry.loading.value ).toEqual( false );

    });

});