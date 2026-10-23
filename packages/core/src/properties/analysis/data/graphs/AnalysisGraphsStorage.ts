import { format } from "date-fns";
import { CallbacksManager } from "../../../callbacksManager";
import { AnalysisDataState, AnalysisDataStateValue, ValueRow } from "../AnalysisDataState";
import { AnalysisLayersStorage } from "../../analysis/storage/AnalysisLayersStorage";
import { AnalysisGraph } from "./AnalysisGraph";

export class AnalysisGraphsStorage {

    public readonly listenerKey = "___listen-to-graphs___";

    public get layers(): AnalysisLayersStorage {
        return this.drive.parent.analysis.layers;
    }

    protected readonly _graphs = new Map<string, AnalysisGraph>();

    public get graphs() {
        return this._graphs;
    }

    protected addGraph(graph: AnalysisGraph) {
        this._graphs.set(graph.analysis.key, graph);
        this.onAddGraph.call(graph);
    }
    protected removeGraph(graph: string) {
        this._graphs.delete(graph);
        this.onRemoveGraph.call(graph);
    }

    protected _output: AnalysisDataStateValue = {
        values: [[]],
        colors: []
    }

    public get output(): AnalysisDataStateValue {
        return this._output;
    }
    protected set output(output: AnalysisDataStateValue) {
        this._output = output;
        this.onOutput.call(output);
    }

    public onOutput = new CallbacksManager<(
        output: AnalysisDataStateValue
    ) => void>();

    public onAddGraph = new CallbacksManager<(
        graph: AnalysisGraph
    ) => void>()

    public onRemoveGraph = new CallbacksManager<(
        graph: string
    ) => void>()

    public constructor(
        public readonly drive: AnalysisDataState
    ) {


        // listen to layer state
        this.layers.onAdd.set(this.listenerKey, async (layer) => {

            const item = layer.graph;
            this.addGraph(item);

            item.onAnalysisSelection.set(this.listenerKey, async () => {
                this.refreshOutput();
            });

            item.onGraphActivation.set(this.listenerKey, async () => {
                this.refreshOutput();
            });

            item.onGraphData.set(this.listenerKey, async () => {
                this.refreshOutput();
            });

            item.analysis.onSetName.set( this.listenerKey, () => {
                this.refreshOutput();
            } );

        });

        this.layers.onRemove.set(this.listenerKey, async (layer) => {

            this.removeGraph(layer);
            this.refreshOutput();

        });


    }

    public refreshOutput() {

        const output: AnalysisDataStateValue = {
            values: [["Time"]],
            colors: []
        }

        // Push names and colors of active graphs
        this.graphs.forEach((graph) => {

            // Push labels
            output.values[0].push(...graph.getGraphLabels());

            output.colors.push(...graph.getGraphColors());

        });

        // Push values
        this.graphs.forEach((graph) => {

            if (graph.hasDataToPrint()) {

                if (graph.value) {

                    Object.keys(graph.value).forEach((key, index) => {

                        let row = output.values[index + 1];

                        if (row === undefined) {
                            const date = new Date();
                            date.setTime( parseInt( key ) );
                            row = [date];
                            output.values[index + 1] = row;
                        }

                        const array = row as ValueRow;

                        array.push(...graph.getDtaAtTime(parseInt(key)));

                    });


                }

            }

        });

        this.output = output;
        return output;

    }

    hasGraph(): boolean {
        return Object.values(this.graphs).find(graph => graph.hasDataToPrint()).length > 0;
    }

    public generateExportData() {

        const dataBuffer: {
            [index: string]: {
                [index: string]: number | string
            }
        } = {};

        const header = [
            {
                key: "time_relative",
                displayLabel: "Relative Time"
            },
            {
                key: "time_absolute",
                displayLabel: "Absolute Time"
            },
            {
                key: "millisecondy",
                displayLabel: "Milliseconds"
            },
            {
                key: "timestamp",
                displayLabel: "Timestamp"
            }
        ];

        for (const graph of this.graphs.values()) {

            const labels = graph.getGraphLabels();

            // Push to the header
            for (const label of labels) {
                header.push({
                    key: label,
                    displayLabel: `${label} (${graph.analysis.initialColor}, ${graph.analysis.width} x ${graph.analysis.height} px)`
                });
            }

            if (graph.value) {

                Object.keys(graph.value).forEach((key) => {

                    if (!Object.keys(dataBuffer).includes(key)) {

                        const timestamp_relative = parseInt(key);
                        const timestamp_absolute = timestamp_relative + graph.analysis.file.timestamp;

                        dataBuffer[key] = {
                            [header[0].key]: format(timestamp_relative, "m:ss:SSS") + " ",
                            [header[1].key]: format(timestamp_absolute, "d. M.y m:ss:SSS") + " ",
                            [header[2].key]: timestamp_relative,
                            [header[3].key]: timestamp_absolute
                        }
                    }

                    const values = graph.getDtaAtTime(parseInt(key));
                    labels.forEach((label, index) => {
                        dataBuffer[key][label] = values[index];
                    });

                });

            }
        }

        return {
            header,
            data: Object.values( dataBuffer )
        };

    }

}