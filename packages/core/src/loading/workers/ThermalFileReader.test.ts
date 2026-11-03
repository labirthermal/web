import { describe, expect, test, vi } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../devserver/node/mocks';
import { loadFileForTests } from '../../../devserver/node/scaffold';
import { ThermalFileReader } from './ThermalFileReader';

/** Reader forced to take the workerpool path regardless of the buffer size. */
class ForcedWorkerReader extends ThermalFileReader {
    protected shouldUseWorker(): boolean {
        return true;
    }
}

const forceWorker = (reader: ThermalFileReader): ThermalFileReader => {
    Object.setPrototypeOf(reader, ForcedWorkerReader.prototype);
    return reader;
};

describe("ThermalFileReader worker threshold", () => {

    test("small buffers run the data jobs on the main thread", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);
        const reader = instance.reader;

        expect(reader.buffer.byteLength).toBeLessThan(ThermalFileReader.WORKER_THRESHOLD_BYTES);

        const execSpy = vi.spyOn(reader.service.pool, "exec");

        await reader.frameData(0);
        await reader.pointAnalysisData(10, 10);
        await reader.rectAnalysisData(0, 0, 20, 20);
        await reader.ellipsisAnalysisData(0, 0, 20, 20);

        expect(execSpy).not.toHaveBeenCalled();

        execSpy.mockRestore();

    });

    test("the workerpool path gives the same results and never detaches the working buffer", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);
        const reader = instance.reader;

        const inlineFrame = await reader.frameData(0);
        const inlinePoint = await reader.pointAnalysisData(10, 10);
        const inlineRect = await reader.rectAnalysisData(0, 0, 20, 20);
        const inlineEllipsis = await reader.ellipsisAnalysisData(0, 0, 20, 20);

        forceWorker(reader);

        const bytesBefore = reader.buffer.byteLength;

        expect(await reader.frameData(0)).toEqual(inlineFrame);
        expect(await reader.pointAnalysisData(10, 10)).toEqual(inlinePoint);
        expect(await reader.rectAnalysisData(0, 0, 20, 20)).toEqual(inlineRect);
        expect(await reader.ellipsisAnalysisData(0, 0, 20, 20)).toEqual(inlineEllipsis);

        // The frame subset is transferred, but the retained working buffer must stay intact
        expect(reader.buffer.byteLength).toEqual(bytesBefore);

    });

});
