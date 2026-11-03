import { describe, expect, test } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../../../devserver/node/mocks';
import { loadFileForTests } from '../../../../../devserver/node/scaffold';

describe("AnalysisGraph.whenData", () => {

    test("values of an analysis created from serialized are available after whenData resolves", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        // Create the analysis the same way the PNG exports transpose analyses to a copied file
        const serialized = "Exported rect;rectangle;top:10;left:10;width:20;height:20;color:red;avg";
        const analysis = instance.slots.createAnalysisFromSerialized(serialized);

        expect(analysis).not.toBeUndefined();

        if (analysis === undefined) {
            return;
        }

        // The values are computed asynchronously from the graph data,
        // therefore they must not be read synchronously after the creation.
        const data = await analysis.graph.whenData();

        expect(data).not.toBeUndefined();
        expect(analysis.avg).not.toBeUndefined();
        expect(analysis.min).not.toBeUndefined();
        expect(analysis.max).not.toBeUndefined();

        // The values must match the parser job output for the current frame
        const jobData = await instance.reader.rectAnalysisData(10, 10, 20, 20);
        const entry = jobData[instance.timeline.currentStep.relative];

        expect(analysis.avg).toEqual(entry.avg);
        expect(analysis.min).toEqual(entry.min);
        expect(analysis.max).toEqual(entry.max);

    });

    test("whenData resolves for a point analysis as well", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.slots.createAnalysisFromSerialized("Exported point;point;top:15;left:17;color:blue;avg");

        expect(analysis).not.toBeUndefined();

        if (analysis === undefined) {
            return;
        }

        await analysis.graph.whenData();

        const jobData = await instance.reader.pointAnalysisData(17, 15);
        const expected = jobData[instance.timeline.currentStep.relative];

        expect(analysis.avg).toEqual(expected);
        expect(analysis.min).toEqual(expected);
        expect(analysis.max).toEqual(expected);

    });

});
