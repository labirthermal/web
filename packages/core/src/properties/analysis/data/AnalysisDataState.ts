import { download, generateCsv, mkConfig } from "export-to-csv";
import { ThermalFileInstance } from "../../../file/ThermalFileInstance";
import { AbstractProperty } from "../../abstractProperty";
import { CallbacksManager } from "../../callbacksManager";
import { AnalysisGraphsStorage } from "./graphs/AnalysisGraphsStorage";

type HeaderRow = string[];
export type ValueRow = [Date, ...number[]];

type DataType = [HeaderRow, ...ValueRow[]];

export type AnalysisDataStateValue = {
    values: DataType,
    colors: string[]
}

/** Stores the data of all analysis. Purpose: store data for the purpose of graph. The graph data format is constructed for Google Charts webcomponent. */
export class AnalysisDataState extends AbstractProperty<AnalysisDataStateValue, ThermalFileInstance> {

    protected _hasActiveGraphs: boolean = false;
    public get hasActiveGraphs() {
        return this._hasActiveGraphs;
    }

    public readonly onGraphsPresence = new CallbacksManager<(
        hasActiveGraphs: boolean
    ) => void>()

    public readonly listeners = new AnalysisGraphsStorage(this)

    public constructor(parent: ThermalFileInstance) {
        super(parent, { values: [[]], colors: [] });

        this.listeners.onOutput.set("__mirror_output_to_local_state", async (output) => {

            this.value = output;

            if (output.colors.length > 0) {
                if (!this.hasActiveGraphs) {
                    this._hasActiveGraphs = true;
                    this.onGraphsPresence.call(true);
                }
            } else {
                if (this.hasActiveGraphs) {
                    this._hasActiveGraphs = false;
                    this.onGraphsPresence.call(false);
                }
            }

        });

    }


    protected validate(value: AnalysisDataStateValue): AnalysisDataStateValue {
        return value;
    }
    protected afterSetEffect(): void { }


    /** Assamble the current analysis data and download them as CSV directly. */
    public downloadData() {

        const { data, header } = this.listeners.generateExportData();
        const csvConfig = mkConfig({
            fieldSeparator: ";",
            filename: `analysis_${this.parent.fileName}_${Date.now()}.csv`,
            columnHeaders: header
        });
        const csv = generateCsv(csvConfig)(data);

        download(csvConfig)(csv);


    }


    /** Refresh the values of all analyses for the current frame from their graph data. No calculation is performed. */
    public refreshAllAnalysesValues(): void {
        this.parent.analysis.value.forEach( analysis => analysis.recalculateValues() );
    }


}
