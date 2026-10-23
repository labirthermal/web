import { describe, test, expect } from 'vitest';
import { ThermalManager } from '../hierarchy/ThermalManager';
import { getPool } from '../utils/pool';

describe( "Abstract service worker", async () => {

    const pool = await getPool();

    test( "pooling is working", async () => {

        const poolableObject = new ThermalManager(pool);
        const pooledResult = await poolableObject.pool.exec( ( a: number, b: number) => a + b, [ 1,2 ] );
        expect( pooledResult ).toEqual( 3 );

    } );

} );