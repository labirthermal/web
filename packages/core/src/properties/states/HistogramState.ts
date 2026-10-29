import { ThermalFileInstance } from "../../file/ThermalFileInstance";
import { ThermalRegistry, ThermalStatistics } from "../../hierarchy/ThermalRegistry";
import { histogramFromPixels } from "../../parsers/histogramFromPixels";
import type { ThermalFileReader } from "../../loading/workers/ThermalFileReader";
import { AbstractProperty } from "../abstractProperty";
import { CallbacksManager } from "../callbacksManager";
import { histogramResultCache } from "./HistogramResultCache";

/** 
 * Handles the histogram creation and subscription.
 * - should be used only in registries
 */
export class HistogramState extends AbstractProperty<ThermalStatistics[], ThermalRegistry> {

    protected _resolution = 150;
    public get resolution() { return this._resolution; };

    /** Map of temperature => countOfPixels in the scaled down resolution @deprecated */
    protected buffer: Map<number, number> = new Map<number, number>();
    /** Total countOfPixels in every image @deprecated */
    protected bufferPixelsCount: number = 0;
    /** @deprecated */
    protected _bufferResolution = 1000;
    public set bufferResolution(value: number) { this._bufferResolution = Math.round(Math.max(value, 1000)) }
    public get bufferResolution() { return this._bufferResolution; }

    protected _loading: boolean = false;
    public get loading() { return this._loading; }
    protected set loading(value: boolean) {
        this._loading = value; 
    }
    

    public readonly onCalculationStart = new CallbacksManager<()=>void>();
    public readonly onCalculationEnd = new CallbacksManager<(success: boolean)=>void>();

    /** Set the historgam resolution
     * - does not recalculate the value!
     * - to recalculate value, call `recalculateWithCurrentSetting`
     * 
     * @notice Higher the number, lower the resolution.
     * @deprecated Resolution is calculated in a separate thread, no resolution changes allowed
    */
    public setResolution(value: number) {
        this._resolution = Math.round(Math.min(Math.max(value, 2), 1000));
    }

    /** If incorrect resolution is being set, set empty array @todo there may be an error in +1*/
    protected validate(value: ThermalStatistics[]): ThermalStatistics[] {
        return value;
    }

    protected afterSetEffect() {
        this.parent.range.recalculateAutoValue();
    }


    /**
     * Keep the legacy entry point while recalculating the displayed histogram
     * through the shared result cache.
     */
    public recalculateHistogramBufferInWorker() {
        this.recalculateHistogram();

    }

    protected async recalculateHistogram() {

        // All living instances
        const allFiles = this.parent.groups.value.map( group => group.files.value ).reduce( (state, current) => {

            state = state.concat( current )

            return state;

        }, [] as ThermalFileInstance[] );

        if (
            allFiles.length === 0
            || this.parent.minmax.value === undefined
            || this.parent.minmax.distanceInCelsius === undefined
        ) {
            return;
        }

        this.onCalculationStart.call();
        this.loading = true;

        try {
            const readers = allFiles.map(instance => instance.reader);
            const result = await histogramResultCache.getOrCalculate(
                readers,
                () => this.calculateHistogram(readers)
            );
            this.value = result;
            this.loading = false;
            this.onCalculationEnd.call(true);
        } catch (error) {
            this.loading = false;
            this.onCalculationEnd.call(false);
            console.error("Error calculating histogram", error);
        }

    }

    /**
     * Collect temperatures of every file with its own parser and bin them
     * in one shared range with the shared `histogramFromPixels`.
     */
    protected async calculateHistogram(readers: ThermalFileReader[]): Promise<ThermalStatistics[]> {

        const pixelSets: Float32Array[] = await Promise.all(
            readers.map(reader => this.parent.pool.exec(
                reader.parser.histogramPixels,
                [reader.buffer]
            ))
        );

        return this.parent.pool.exec(histogramFromPixels, [pixelSets]);

    }


}