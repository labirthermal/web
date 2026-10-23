import { FilesService } from "../../src/loading/workers/FilesService";
import { ThermalFileReader } from "../../src/loading/workers/ThermalFileReader";
import { getPool } from "../../src/utils/pool";
import { THERMOGRAM_PATHS } from "./mocks";

export const loadFileForTests = async ( url: THERMOGRAM_PATHS ) => {
    const pool = await getPool();
        const {service, registry} = FilesService.isolatedInstance( pool );
        const group = registry.groups.addOrGetGroup( "test_group" );
        const file = await service.loadFile( url ) as ThermalFileReader;
        const instance = await file.createInstance( group );
        const element = document.createElement( "div" );
        instance.mountToDom( element );
        instance.dom?.hydrate();

        instance.buildInternalProperties();

        return instance;
}