import { describe, expect, it } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../devserver/node/mocks';
import { ThermalFileReader } from './ThermalFileReader';
import { FilesService } from './FilesService';
import { ThermalFileInstance } from '../../file/ThermalFileInstance';
import { getPool } from '../../utils/pool';

enum IDS {
    REG = "test_registry",
    GR = "test_group", 
}

describe( "reloading", () => {

    it( "should be accessible", async () => {

        const pool = await getPool();

        const {service, registry} = FilesService.isolatedInstance( pool );

        const group = registry.groups.addOrGetGroup( IDS.GR );

        expect( service ).toBeInstanceOf( FilesService );

        // Load a group
        const file = await service.loadFile( THERMOGRAM_PATHS.SOUSTRUH ) as ThermalFileReader;

        expect( file ).toBeInstanceOf( ThermalFileReader );

        const instance = await file.createInstance( group );

        expect( instance ).toBeInstanceOf( ThermalFileInstance );



    } );

} );