import { describe, expect, test } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../../devserver/node/mocks';
import { loadFileForTests } from '../../../../devserver/node/scaffold';

describe( "ToolDrive", () => {
    test( "Tool selection", async () => {

        const instance = await loadFileForTests( THERMOGRAM_PATHS.SOUSTRUH );
        
        const group = instance.group;

        const tools = group.tool;

        expect( tools.value.key ).toEqual( "inspect" );

        let counter = 0;

        tools.addListener( "initial listener", () => {
            counter++;
        } );


        tools.selectTool( "add-rect");

        expect(counter).toEqual(1);
        expect( tools.value.key ).toEqual( "add-rect" );



    } );
} );