import { describe, expect, test } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../../../../devserver/node/mocks';
import { loadFileForTests } from '../../../../../../devserver/node/scaffold';

describe("PointAnalysis", () => {

    test("top setter", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placePointAt("test", 10, 10);


        // The height should always be 0
        expect(analysis.height).toEqual(0);

        expect(analysis.top).toEqual(10);
        expect(analysis.bottom).toEqual(10);
        expect(analysis.center.y).toEqual(10);

        // Move the pixel somewhere for the first time
        analysis.setTop(20);

        expect(analysis.top).toEqual(20);
        expect(analysis.bottom).toEqual(20);
        expect(analysis.center.y).toEqual(20);
        expect(analysis.height).toEqual(0);

        // Move the center on another location
        analysis.setTop(50);
        expect(analysis.top).toEqual(50);
        expect(analysis.bottom).toEqual(50);
        expect(analysis.center.y).toEqual(50);
        expect(analysis.height).toEqual(0);

        // Extreme cases


        // Negative top
        analysis.setTop(-10);

        expect(analysis.top).toEqual(0);
        expect(analysis.bottom).toEqual(0);
        expect(analysis.center.y).toEqual(0);
        expect(analysis.height).toEqual(0);

        // Too high top

        analysis.setTop(analysis.file.height * 2);

        expect(analysis.top).toEqual(analysis.file.height - 1);
        expect(analysis.bottom).toEqual(analysis.file.height - 1);
        expect(analysis.height).toEqual(0);

        // NaN
        analysis.setTop(30);
        analysis.setTop(NaN);

        expect(analysis.top).toEqual(30);
        expect(analysis.height).toEqual(0);

        // Floating point values
        analysis.setTop(15 / 2);
        expect(analysis.top).toEqual(8);

        // A slightly larger float
        analysis.setTop(analysis.file.height - 1 + Math.random());
        expect(analysis.top).toEqual(analysis.file.height - 1);
        expect(analysis.bottom).toEqual(analysis.file.height - 1);
        expect(analysis.center.y).toEqual(analysis.file.height - 1);
        expect(analysis.height).toEqual(0);

    });

    test("left setter", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placePointAt("test", 10, 10);

        expect(analysis.width).toEqual(0);
        expect(analysis.left).toEqual(10);
        expect(analysis.center.x).toEqual(10);
        expect(analysis.right).toEqual(10);

        // Set left for the first time
        analysis.setLeft(50);

        expect(analysis.width).toEqual(0);
        expect(analysis.left).toEqual(50);
        expect(analysis.center.x).toEqual(50);
        expect(analysis.right).toEqual(50);

        // Negative left
        analysis.setLeft(-100);
        expect(analysis.left).toEqual(0);
        expect(analysis.right).toEqual(0);
        expect(analysis.center.x).toEqual(0);
        expect(analysis.width).toEqual(0);

        // Too large left

        const maxW = analysis.file.width - 1;

        analysis.setLeft(analysis.file.width * 2);

        expect(analysis.left).toEqual(maxW);
        expect(analysis.right).toEqual(maxW);
        expect(analysis.center.x).toEqual(maxW);
        expect(analysis.width).toEqual(0);

        // NaN
        analysis.setLeft(NaN);
        expect(analysis.left).toEqual(maxW);

        // Floating point values
        analysis.setLeft(12.3);
        expect(analysis.left).toEqual(12);
        expect(analysis.right).toEqual(12);
        expect(analysis.center.x).toEqual(12);
        expect(analysis.width).toEqual(0);


        analysis.setLeft(12.7);
        expect(analysis.left).toEqual(13);
        expect(analysis.right).toEqual(13);
        expect(analysis.center.x).toEqual(13);
        expect(analysis.width).toEqual(0);


    });

    test( "width setter", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placePointAt("test", 10, 10);

        expect( analysis.width ).toEqual( 0 );

        analysis.setWidth( 100 );
        expect( analysis.width ).toEqual( 0 );

    } );

    test( "height setter", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placePointAt("test", 10, 10);

        expect( analysis.width ).toEqual( 0 );

        analysis.setWidth( 100 );
        expect( analysis.width ).toEqual( 0 );

    } );

    test("bottom setter", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placePointAt("test", 10, 10);

        expect(analysis.height).toEqual(0);
        expect(analysis.left).toEqual(10);
        expect(analysis.center.x).toEqual(10);
        expect(analysis.right).toEqual(10);

        // Set left for the first time
        analysis.setBottom(50);

        expect(analysis.height).toEqual(0);
        expect(analysis.top).toEqual(50);
        expect(analysis.center.y).toEqual(50);
        expect(analysis.bottom).toEqual(50);

        // Negative left
        analysis.setBottom(-100);
        expect(analysis.bottom).toEqual(0);
        expect(analysis.top).toEqual(0);
        expect(analysis.center.y).toEqual(0);
        expect(analysis.height).toEqual(0);

        // Too large left

        const maxH = analysis.file.height - 1;

        analysis.setBottom(analysis.file.height * 2);

        expect(analysis.top).toEqual(maxH);
        expect(analysis.bottom).toEqual(maxH);
        expect(analysis.center.y).toEqual(maxH);
        expect(analysis.height).toEqual(0);

        // Raise the bottom up
        analysis.setBottom( 40 );

        expect( analysis.top ).toEqual(40);
        expect( analysis.bottom ).toEqual(40);
        expect( analysis.center.y ).toEqual(40);

        // NaN
        analysis.setBottom(NaN);
        expect(analysis.top).toEqual(40);

        // Floating point values
        analysis.setBottom(12.3);
        expect(analysis.top).toEqual(12);
        expect(analysis.bottom).toEqual(12);
        expect(analysis.center.y).toEqual(12);
        expect(analysis.height).toEqual(0);


        analysis.setBottom(12.7);
        expect(analysis.top).toEqual(13);
        expect(analysis.bottom).toEqual(13);
        expect(analysis.center.y).toEqual(13);
        expect(analysis.height).toEqual(0);

    });

    test("right setter", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placePointAt("test", 10, 10);

        expect(analysis.width).toEqual(0);
        expect(analysis.left).toEqual(10);
        expect(analysis.center.x).toEqual(10);
        expect(analysis.right).toEqual(10);

        // Set left for the first time
        analysis.setRight(50);

        expect(analysis.width).toEqual(0);
        expect(analysis.left).toEqual(50);
        expect(analysis.center.x).toEqual(50);
        expect(analysis.right).toEqual(50);

        // Negative left
        analysis.setRight(-100);
        expect(analysis.left).toEqual(0);
        expect(analysis.right).toEqual(0);
        expect(analysis.center.x).toEqual(0);
        expect(analysis.width).toEqual(0);

        // Too large left

        const maxW = analysis.file.width - 1;

        analysis.setRight(analysis.file.width * 2);

        expect(analysis.left).toEqual(maxW);
        expect(analysis.right).toEqual(maxW);
        expect(analysis.center.x).toEqual(maxW);
        expect(analysis.width).toEqual(0);

        // NaN
        analysis.setRight(NaN);
        expect(analysis.left).toEqual(maxW);

        // Floating point values
        analysis.setRight(12.3);
        expect(analysis.left).toEqual(12);
        expect(analysis.right).toEqual(12);
        expect(analysis.center.x).toEqual(12);
        expect(analysis.width).toEqual(0);


        analysis.setRight(12.7);
        expect(analysis.left).toEqual(13);
        expect(analysis.right).toEqual(13);
        expect(analysis.center.x).toEqual(13);
        expect(analysis.width).toEqual(0);


    });



});

