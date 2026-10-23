/** Both `ThermalFileReader` and `ThermalFileFailure` share common attributes since they are both results of `FilesService.loadFile()` */
export abstract class AbstractFileResult{
    
    constructor(
        public readonly thermalUrl: string,
        public readonly visibleUrl?: string
    ) {

    }

    public abstract isSuccess(): boolean;
}