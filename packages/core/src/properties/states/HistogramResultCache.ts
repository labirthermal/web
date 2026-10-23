import type { ThermalStatistics } from "../../hierarchy/ThermalRegistry";

const MAX_CACHE_ENTRIES = 64;
const HISTOGRAM_ALGORITHM_VERSION = 1;

type HistogramReader = object;
type HistogramCalculator = () => Promise<ThermalStatistics[]>;

const cloneHistogram = (histogram: ThermalStatistics[]): ThermalStatistics[] =>
    histogram.map(item => ({ ...item }));

/**
 * Shared, bounded cache for computed histogram results.
 * Reader identity avoids filename collisions and lets copied instances reuse
 * results even when their registry belongs to a different manager.
 */
export class HistogramResultCache {

    private readonly readerIds = new WeakMap<HistogramReader, number>();
    private nextReaderId = 0;
    private readonly entries = new Map<string, ThermalStatistics[]>();
    private readonly inFlight = new Map<string, Promise<ThermalStatistics[]>>();

    public getOrCalculate(
        readers: HistogramReader[],
        calculate: HistogramCalculator
    ): Promise<ThermalStatistics[]> {
        const key = this.createKey(readers);
        const cached = this.entries.get(key);

        if (cached !== undefined) {
            this.touch(key, cached);
            return Promise.resolve(cloneHistogram(cached));
        }

        const pending = this.inFlight.get(key);
        if (pending) {
            return pending.then(cloneHistogram);
        }

        const calculation = Promise.resolve()
            .then(calculate)
            .then(result => {
                const safeResult = cloneHistogram(result);
                this.entries.set(key, safeResult);
                this.evictOverflow();
                return safeResult;
            })
            .finally(() => {
                if (this.inFlight.get(key) === calculation) {
                    this.inFlight.delete(key);
                }
            });

        this.inFlight.set(key, calculation);

        return calculation.then(cloneHistogram);
    }

    private createKey(readers: HistogramReader[]): string {
        const readerIds = readers
            .map(reader => this.getReaderId(reader))
            .sort((a, b) => a - b);

        return `${HISTOGRAM_ALGORITHM_VERSION}:${readerIds.join(",")}`;
    }

    private getReaderId(reader: HistogramReader): number {
        let id = this.readerIds.get(reader);
        if (id === undefined) {
            id = ++this.nextReaderId;
            this.readerIds.set(reader, id);
        }
        return id;
    }

    private touch(key: string, value: ThermalStatistics[]): void {
        this.entries.delete(key);
        this.entries.set(key, value);
    }

    private evictOverflow(): void {
        while (this.entries.size > MAX_CACHE_ENTRIES) {
            const leastRecentlyUsed = this.entries.keys().next().value;
            if (leastRecentlyUsed === undefined) {
                return;
            }
            this.entries.delete(leastRecentlyUsed);
        }
    }
}

/** Shared across all managers using this core module instance. */
export const histogramResultCache = new HistogramResultCache();
