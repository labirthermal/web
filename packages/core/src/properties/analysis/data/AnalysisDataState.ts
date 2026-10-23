import { download, generateCsv, mkConfig } from "export-to-csv";
import { ThermalFileInstance } from "../../../file/ThermalFileInstance";
import { AbstractProperty } from "../../abstractProperty";
import { CallbacksManager } from "../../callbacksManager";
import { AnalysisGraphsStorage } from "./graphs/AnalysisGraphsStorage";
import { PointAnalysis } from "../analysis/internals/point/PointAnalysis";

type HeaderRow = string[];
export type ValueRow = [Date, ...number[]];

type DataType = [HeaderRow, ...ValueRow[]];

export type AnalysisDataStateValue = {
    values: DataType,
    colors: string[]
}

type AnalysisExtractDefinition = [
    /** Type */
    string,
    /** ID */
    string,
    /** Top */
    number,
    /** Left */
    number,
    /** Width */
    number,
    /** Height */
    number
]

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

    public dangerouslyUpdateValue(value: AnalysisDataStateValue) {
        this.value = value;
    }


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


    public async updateAllAnalysesValues(): Promise<void> {

        const instance = this.parent;


        try {

            const analysis: AnalysisExtractDefinition[] = instance.analysis.value.map(a => {

                if (a instanceof PointAnalysis) {
                    return [a.getType(), a.key, a.top, a.left, 1, 1]
                }

                return [a.getType(), a.key, a.top, a.left, a.width, a.height];

            });


            // Transfer it to thread
            const stats = await instance.pool.exec(async (
                width: number,
                height: number,
                pixels: number[],
                analysis: AnalysisExtractDefinition[]
            ) => {


                const buffer = analysis.map(a => {
                    return {
                        id: a[1],
                        type: a[0],
                        min: {
                            value: Infinity,
                        },
                        max: {
                            value: -Infinity
                        },
                        avg: {
                            value: 0,
                            sum: 0,
                            count: 0
                        }
                    }
                });


                for (let x = 0; x < width; x++) {

                    for (let y = 0; y < height; y++) {

                        const index = x + (y * width);

                        // Clamp temperature to the displayedRange
                        const rawTemperature = pixels[index];


                        const isWithin = (x: number, y: number, la: number, ta: number, wa: number, ha: number): boolean => {
                            const centerX = la + wa / 2;
                            const centerY = ta + ha / 2;
                            const normalizedX = (x - centerX) / (wa / 2);
                            const normalizedY = (y - centerY) / (ha / 2);
                            return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
                        }

                        /**
                         * Process the analysis
                         */
                        analysis.forEach((a, index) => {

                            const bufferValue = buffer[index];

                            const type = a[0];
                            const top = a[2];
                            const left = a[3];
                            const w = a[4];
                            const h = a[5];

                            // Point
                            if (type === "point") {
                                if (x === left && y === top) {
                                    bufferValue.avg.value = rawTemperature;
                                }
                            }

                            // Rectangle
                            else if (type === "rectangle") {

                                if (
                                    x >= left
                                    && x < left + w
                                    && y >= top
                                    && y < top + h
                                ) {

                                    if (rawTemperature < bufferValue.min.value) {
                                        bufferValue.min.value = rawTemperature;
                                    }
                                    if (rawTemperature > bufferValue.max.value) {
                                        bufferValue.max.value = rawTemperature;
                                    }
                                    bufferValue.avg.count = bufferValue.avg.count + 1;
                                    bufferValue.avg.sum = bufferValue.avg.sum + rawTemperature;

                                }

                            }

                            // Ellipsis
                            else if (type === "ellipsis") {

                                if (isWithin(x, y, left, top, width, height)) {
                                    if (rawTemperature < bufferValue.min.value) {
                                        bufferValue.min.value = rawTemperature;
                                    }
                                    if (rawTemperature > bufferValue.max.value) {
                                        bufferValue.max.value = rawTemperature;
                                    }

                                    bufferValue.avg.count = bufferValue.avg.count + 1;
                                    bufferValue.avg.sum = bufferValue.avg.sum + rawTemperature;
                                }

                            }

                        });


                    }

                }

                const stats = buffer.map(a => {
                    return {
                        id: a.id,
                        min: a.min.value !== Infinity ? a.min.value : undefined,
                        max: a.max.value !== -Infinity ? a.max.value : undefined,
                        avg: a.type === "point"
                            ? a.avg.value
                            : a.avg.sum / a.avg.count
                    }
                });

                return {
                    stats
                };

            }, [
                instance.width,
                instance.height,
                instance.pixels,
                analysis
            ], {});

            stats.stats.forEach(a => {
                const analysis = instance.analysis.layers.get(a.id);
                analysis?.dangerouslySetValues(a.avg, a.min, a.max);
            });



        } catch (error) {

            if (error instanceof Error) {

                console.error(error);
            }

        }


    }






}