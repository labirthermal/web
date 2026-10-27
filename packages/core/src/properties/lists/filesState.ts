import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { ThermalGroup } from "../../hierarchy/ThermalGroup";
import { ThermalFileReader } from "../../loading/workers/ThermalFileReader";
import { AbstractProperty } from "../abstractProperty";

import { downloadZip } from "client-zip";

export type InstanceFetchCallback = (
    instance?: ThermalFileInstance,
    errors?: string
) => void;

export class FilesState extends AbstractProperty<ThermalFileInstance[], ThermalGroup> {

    protected _map: Map<string, ThermalFileInstance> = new Map<string, ThermalFileInstance>();

    public get map() { return this._map; }

    protected validate(value: ThermalFileInstance[]): ThermalFileInstance[] {
        return value.sort( (a,b) => a.timestamp - b.timestamp );
    }

    /** Array of all files sorted by timestamp from the earliest to the latest. */
    public get sortedFiles() {
        return this.value.sort((a, b) => { return a.timestamp - b.timestamp });
    }

    /**
     * Whenever the instances change, recreate the index
     */
    protected afterSetEffect(value: ThermalFileInstance[]) {

        // Clear the index
        this.map.clear();

        // Create the new values in the index
        value.forEach(instance => this._map.set(instance.thermalUrl, instance));

    }

    public addFile(file: ThermalFileInstance) {

        if (!this._map.has(file.thermalUrl)) {
            this.value = [...this.value, file];
            return file;
        } else {
            return this._map.get(file.thermalUrl)!;
        }
        
    }

    public removeFile(file: string | ThermalFileInstance) {
        const entry = file instanceof ThermalFileInstance
            ? file
            : this.map.get(file);
        if (entry) {
            entry.unmountFromDom();
            this.value = this.value.filter(e => e.thermalUrl !== entry.thermalUrl);
        }
    }




    /**
     * Removal
     */
    public removeAllInstances() {
        this.forEveryInstance(instance => instance.destroySelfAndBelow());
        this.value = [];
    }


    /** 
     * Iteration through all instances
     */
    public forEveryInstance(fn: ((instance: ThermalFileInstance) => void
    )) {
        this.value.forEach(instance => fn(instance));
    }

    public downloadAllFiles() {

        const files: File[] = [];


        this.forEveryInstance( instance => {

            const blob = new Blob( [ instance.reader.fileBuffer ], { type: instance.reader.fileMimeType } );

            const file = new File(
                [ blob ],
                instance.fileName,
                { type: instance.reader.fileMimeType }
            );

            files.push( file );

        } );

        downloadZip(files).blob().then( blob => {

            const link = document.createElement("a");
            link.download = `${this.parent.name || this.parent.id || "thermal_group"}_files.zip`;
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            link.remove();

        } );


    }

    public async batchCreateInstances(
        readers: ThermalFileReader[],
        doReplaceExisting: boolean = false
    ) {

        const instances = await Promise.all( readers.map( async (reader) => await reader.createInstance(this.parent, false) ) );

        if ( doReplaceExisting ) {
            this.forEveryInstance(instance => instance.destroySelfAndBelow());
            this.value = instances;
        } else {
            this.value = [...this.value, ...instances];
        }

    }




}