import { describe, expect, test } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../../../devserver/node/mocks';
import { loadFileForTests } from '../../../../../devserver/node/scaffold';
import { EllipsisAnalysis } from '../internals/area/ellipsis/EllipsisAnalysis';
import { RectangleAnalysis } from '../internals/area/rectangle/RectangleAnalysis';
import { PointAnalysis } from '../internals/point/PointAnalysis';



describe("AnalysisStorage", () => {

    test("adding and removing", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);


        const storage = instance.analysis.layers;

        // Default = 0
        expect(storage.all.length).toEqual(0);

        // Add one

        storage.placeEllipsisAt("test", 10, 10, 100, 100);

        expect(storage.all.length).toEqual(1);

        // Add another
        storage.placeRectAt("another", 20, 20, 110, 110);
        expect(storage.all.length).toEqual(2);

        let counter = 0;
        storage.onRemove.add("raise the check", () => {
            counter += 1;
        });

        // Add yet another on the place of the another
        storage.placeRectAt("another", 14, 14, 20, 20);

        expect(storage.all.length).toEqual(2);
        expect(counter).toEqual(1);

    });


    test("selecting", async () => {
        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const storage = instance.analysis.layers;

        const analysis1 = storage.placeRectAt("test1", 10, 10, 100, 100);

        const analysis2 = storage.placeEllipsisAt("test2", 100, 100, 110, 110);

        expect(storage.all.length).toEqual(2);

        expect(storage.selectedOnly.length).toEqual(0);

        analysis1.setSelected();
        expect(storage.selectedOnly.length).toEqual(1);

        analysis2.setSelected();

        expect(storage.selectedOnly.length).toEqual(2);

        analysis1.setDeselected(true);
        expect(storage.selectedOnly.length).toEqual(1);

        analysis2.setDeselected();
        expect(storage.selectedOnly.length).toEqual(0);

    });

    test("layers", async () => {
        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);
        const storage = instance.analysis.layers;
        const analysis1 = storage.placeEllipsisAt("test1", 10, 10, 100, 100);
        const analysis2 = storage.placeRectAt("test2", 14, 14, 20, 20);
        expect(storage.all[0].key).toEqual(analysis1.key);
        expect(storage.all[storage.all.length - 1].key).toEqual(analysis2.key);
    });

    test("drive integration", async () => {
        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const drive = instance.analysis;

        let counter = 0;
        drive.addListener("Testuji listener", () => {
            counter++;
        });

        expect(counter).toEqual(0);

        drive.layers.placeRectAt("debug", 0, 0, 100, 100);

        expect(counter).toEqual(1);

        drive.layers.placeRectAt("debug", 0, 0, 100, 100);

        expect(counter).toEqual(3);

        drive.layers.placeRectAt("debug2", 0, 0, 100, 100);

        expect(counter).toEqual(4);

    });

    test("create point from serialized", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const serialized = "Pokusný bod;point;top:100.1; left:100.9 ;color:red;avg";

        const analysis = instance.slots.createAnalysisFromSerialized(serialized);

        expect(analysis).not.toBeUndefined();

        if (analysis === undefined) {
            return;
        }

        expect(analysis.key).toEqual("Pokusný bod");
        expect(analysis.initialColor).toEqual("red");
        expect(analysis.top).toEqual(100);
        expect(analysis.left).toEqual(100);
        expect(analysis.graph.state.AVG).toEqual(true);
        expect(analysis instanceof PointAnalysis).toEqual(true);

    });

    test("do not create point from incomplete serialized", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const missingLeft = "Pokusný bod;point;top:100; color:red;avg";

        const analysisA = instance.slots.createAnalysisFromSerialized(missingLeft);

        expect(analysisA).toBeUndefined();

        const missingRight = "Pokusný bod;point;left:100; color:red;avg";

        const analysisB = instance.slots.createAnalysisFromSerialized(missingRight);

        expect(analysisB).toBeUndefined();

        const missingName = "point;left:100; top:15; color:red; avg";

        const analysisC = instance.slots.createAnalysisFromSerialized(missingName);

        expect(analysisC).toBeUndefined();

    });

    test("create rect from serialized", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const serialized = "Pokusný obdélník;rectangle;top:20; left:30 ;color:red;avg; width:10; height:15";

        const analysis = instance.slots.createAnalysisFromSerialized(serialized);

        expect(analysis).toBeDefined();

        if (analysis === undefined) {
            return;
        }

        expect(analysis.key).toEqual("Pokusný obdélník");
        expect(analysis.initialColor).toEqual("red");
        expect(analysis.top).toEqual(20);
        expect(analysis.left).toEqual(30);
        expect(analysis.width).toEqual(10);
        expect(analysis.height).toEqual(15);
        expect(analysis.graph.state.AVG).toEqual(true);
        expect(analysis.graph.state.MIN).toEqual(false);
        expect(analysis.graph.state.MAX).toEqual(false);
        expect(analysis instanceof RectangleAnalysis).toEqual(true);

    });

    test("create elllipsis from serialized", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const serialized = "Pokusná elipsa;ellipsis;top:20; left:30 ;color:red;min; width:10; height:15";

        const analysis = instance.slots.createAnalysisFromSerialized(serialized);

        expect(analysis).toBeDefined();

        if (analysis === undefined) {
            return;
        }

        expect(analysis.key).toEqual("Pokusná elipsa");
        expect(analysis.initialColor).toEqual("red");
        expect(analysis.top).toEqual(20);
        expect(analysis.left).toEqual(30);
        expect(analysis.width).toEqual(10);
        expect(analysis.height).toEqual(15);
        expect(analysis.graph.state.AVG).toEqual(false);
        expect(analysis.graph.state.MIN).toEqual(true);
        expect(analysis.graph.state.MAX).toEqual(false);
        expect(analysis instanceof EllipsisAnalysis).toEqual(true);

    });

    test("do not create area analysis from invalid serialized", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const missingLeft = "Pokusný bod;rectangle;top:100; width:100; height:300; color:red;avg";

        const analysisA = instance.slots.createAnalysisFromSerialized(missingLeft);

        expect(analysisA).toBeUndefined();

        const missingTop = "Pokusný bod;rectangle;left:100; width:100; height:300; color:red;avg";

        const analysisB = instance.slots.createAnalysisFromSerialized(missingTop);

        expect(analysisB).toBeUndefined();

        const missingWidth = "Pokusný bod;rectangle;top:100; left:100; height:300; color:red;avg";

        const analysisC = instance.slots.createAnalysisFromSerialized(missingWidth);

        expect(analysisC).toBeUndefined();

        const missingHeight = "Pokusný bod;rectangle;top:100; left:100; width:300; color:red;avg";

        const analysisD = instance.slots.createAnalysisFromSerialized(missingHeight);

        expect(analysisD).toBeUndefined();


    });

    test("extreme cases of creating analysis from serialized", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const pointOff = instance.slots.createAnalysisFromSerialized(
            "První test;point;left:1000;top:10000;color: violet"
        );

        expect(pointOff).not.toBeUndefined();

        if (pointOff === undefined) {
            return;
        }

        expect(pointOff.top).toEqual(pointOff.file.height - 1);
        expect(pointOff.left).toEqual(pointOff.file.width - 1);

        const areaTooBig = instance.slots.createAnalysisFromSerialized(
            "testovací oblast;rectangle;top:10;left:10;width:10000;height:10000;color:violet"
        );

        expect(areaTooBig).not.toBeUndefined();

        if (areaTooBig === undefined) {
            return;
        }

        expect(areaTooBig.top).toEqual(10);
        expect(areaTooBig.left).toEqual(10);
        expect(areaTooBig.width).toEqual(areaTooBig.file.width - 11);
        expect(areaTooBig.height).toEqual(areaTooBig.file.height - 11);

    })

});