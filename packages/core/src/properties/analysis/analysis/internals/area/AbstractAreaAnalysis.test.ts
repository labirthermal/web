import { describe, expect, test } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../../../../devserver/node/mocks';
import { loadFileForTests } from '../../../../../../devserver/node/scaffold';
import { AbstractAreaAnalysis } from "./AbstractAreaAnalysis";
import { ThermalFileInstance } from '../../../../../file/ThermalFileInstance';


const left = 10;
const top = 20;
const right = 30;
const bottom = 40;

const width = right - left;
const height = bottom - top;



describe("AreaAnalysis", async () => {

    const getId = () => (Math.random() * 1000000).toFixed(0);

    const getRectAnalysis = (instance: ThermalFileInstance) => {
        return instance.analysis.layers.placeRectAt(getId(), top, left, right, bottom);
    }

    const getEllipsisAnalysis = (instance: ThermalFileInstance) => {
        return instance.analysis.layers.placeEllipsisAt(getId(), top, left, right, bottom);
    }

    const resetHorizontal = (analysis: AbstractAreaAnalysis) => {
        analysis.setLeft(left);
        analysis.setRight(right);
        expect(analysis.left).toEqual(left);
        expect(analysis.right).toEqual(right);
        expect(analysis.width).toEqual(width);
        makeSureVerticalAreUntouched(analysis);
    }

    const resetVertical = (analysis: AbstractAreaAnalysis) => {
        analysis.setTop(top);
        analysis.setBottom(bottom);
        expect(analysis.top).toEqual(top);
        expect(analysis.bottom).toEqual(bottom);
        expect(analysis.height).toEqual(height);
        makeSureHorizontalAreUntouched(analysis);
    }

    const makeSureHorizontalAreUntouched = (analysis: AbstractAreaAnalysis) => {
        expect(analysis.left).toEqual(left);
        expect(analysis.right).toEqual(right);
        expect(analysis.width).toEqual(width);
    }

    const makeSureVerticalAreUntouched = (analysis: AbstractAreaAnalysis) => {
        expect(analysis.top).toEqual(top);
        expect(analysis.bottom).toEqual(bottom);
        expect(analysis.height).toEqual(height);
    }



    test("horizontal setters", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = getEllipsisAnalysis(instance);

        expect(analysis.top).toEqual(top);
        expect(analysis.left).toEqual(left);
        expect(analysis.right).toEqual(right);
        expect(analysis.bottom).toEqual(bottom);

        expect(analysis.width).toEqual(width);
        expect(analysis.height).toEqual(height);

        // Inset slightly

        // Inset slightly left
        analysis.setLeft(left + 5);
        expect(analysis.left).toEqual(left + 5);
        expect(analysis.width).toEqual(width - 5);
        expect(analysis.right).toEqual(right);

        // Set back
        resetHorizontal(analysis);

        // Inset slightly right
        analysis.setRight(right - 5);
        expect(analysis.width).toEqual(width - 5);
        expect(analysis.left).toEqual(left);
        expect(analysis.right).toEqual(right - 5);

        // Set back
        resetHorizontal(analysis);

        // Outset slightly

        // Outset slightly left
        analysis.setLeft(left - 5);
        expect(analysis.left).toEqual(left - 5);
        expect(analysis.width).toEqual(width + 5);
        expect(analysis.right).toEqual(right);

        // Set back
        resetHorizontal(analysis);

        // Outset slightly right
        analysis.setRight(right - 7);
        expect(analysis.right).toEqual(right - 7);
        expect(analysis.width).toEqual(width - 7);
        expect(analysis.left).toEqual(left);

        // Set back
        resetHorizontal(analysis);


        // Negative left
        analysis.setLeft(-1000);
        expect(analysis.left).toEqual(0);
        expect(analysis.right).toEqual(right);
        expect(analysis.width).toEqual(right);

        // Set back
        resetHorizontal(analysis);

        // Negative right
        analysis.setRight(-1000);
        expect(analysis.left).toEqual(0);
        expect(analysis.right).toEqual(left);
        expect(analysis.width).toEqual(left);

        // Set back
        resetHorizontal(analysis);

        // Too much right
        analysis.setRight(analysis.file.width * 2);
        expect(analysis.right).toEqual(analysis.file.width - 1);
        expect(analysis.left).toEqual(left);
        expect(analysis.width).toEqual(analysis.file.width - 1 - left);

        // Set back
        resetHorizontal(analysis);

        // Too much left
        analysis.setLeft(analysis.file.width * 2);
        expect(analysis.left).toEqual(right);
        expect(analysis.right).toEqual(analysis.file.width - 1);
        expect(analysis.width).toEqual(analysis.file.width - 1 - right);

        // Set back
        resetHorizontal(analysis);

        // Set near from inside left
        analysis.setLeft(right - 5);
        expect(analysis.left).toEqual(right - 5);
        expect(analysis.right).toEqual(right);
        expect(analysis.width).toEqual(5);

        // Set back
        resetHorizontal(analysis);

        // Set near from inside right
        analysis.setRight(left + 5);
        expect(analysis.left).toEqual(left);
        expect(analysis.right).toEqual(left + 5);
        expect(analysis.width).toEqual(5);

        // Set back
        resetHorizontal(analysis);

        // Overlapping left
        analysis.setRight(left - 5);
        expect(analysis.left).toEqual(left - 5);
        expect(analysis.right).toEqual(left);
        expect(analysis.width).toEqual(5);

        // Set back
        resetHorizontal(analysis);

        // Overlapping right
        analysis.setLeft(right + 5);
        expect(analysis.left).toEqual(right);
        expect(analysis.right).toEqual(right + 5);
        expect(analysis.width).toEqual(5);

        resetHorizontal(analysis);

        // Extrema cases on left

        // NaN
        analysis.setLeft(NaN);
        expect(analysis.left).toEqual(left);

        // Floating points
        analysis.setLeft(left + .3);
        expect(analysis.left).toEqual(left);
        expect(analysis.width).toEqual(width);

        analysis.setLeft(left + .6);
        expect(analysis.left).toEqual(left + 1);
        expect(analysis.width).toEqual(width - 1);
        expect(analysis.right).toEqual(right);

        resetHorizontal(analysis);

        // Extrema cases on right

        // NaN
        analysis.setRight(NaN);
        expect(analysis.right).toEqual(right);

        // Floating points
        analysis.setRight(right + .3);
        expect(analysis.right).toEqual(right);
        expect(analysis.width).toEqual(width);

        analysis.setRight(right + .6);
        expect(analysis.right).toEqual(right + 1);
        expect(analysis.width).toEqual(width + 1);
        expect(analysis.top).toEqual(top);

        // Finally, make sure no vertical values were affected
        makeSureVerticalAreUntouched(analysis);



    });

    test("vertical setters", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = getEllipsisAnalysis(instance);

        expect(analysis.top).toEqual(top);
        expect(analysis.left).toEqual(left);
        expect(analysis.right).toEqual(right);
        expect(analysis.bottom).toEqual(bottom);

        expect(analysis.width).toEqual(width);
        expect(analysis.height).toEqual(height);

        // Inset slightly

        // Inset slightly left
        analysis.setTop(top + 5);
        expect(analysis.top).toEqual(top + 5);
        expect(analysis.height).toEqual(height - 5);
        expect(analysis.bottom).toEqual(bottom);

        // Set back
        resetVertical(analysis);

        // Inset slightly right
        analysis.setBottom(bottom - 5);
        expect(analysis.height).toEqual(height - 5);
        expect(analysis.top).toEqual(top);
        expect(analysis.bottom).toEqual(bottom - 5);


        // Set back
        resetVertical(analysis);

        // Outset slightly

        // Outset slightly left
        analysis.setTop(top - 5);
        expect(analysis.top).toEqual(top - 5);
        expect(analysis.height).toEqual(height + 5);
        expect(analysis.bottom).toEqual(bottom);

        // Set back
        resetVertical(analysis);

        // Outset slightly right
        analysis.setBottom(bottom - 7);
        expect(analysis.bottom).toEqual(bottom - 7);
        expect(analysis.height).toEqual(height - 7);
        expect(analysis.top).toEqual(top);

        // Set back
        resetVertical(analysis);


        // Negative left
        analysis.setTop(-1000);
        expect(analysis.top).toEqual(0);
        expect(analysis.bottom).toEqual(bottom);
        expect(analysis.height).toEqual(bottom);

        // Set back
        resetVertical(analysis);

        // Negative right
        analysis.setBottom(-1000);
        expect(analysis.top).toEqual(0);
        expect(analysis.bottom).toEqual(top);
        expect(analysis.height).toEqual(top);

        // Set back
        resetVertical(analysis);

        // Too much right
        analysis.setBottom(analysis.file.height * 2);
        expect(analysis.bottom).toEqual(analysis.file.height - 1);
        expect(analysis.top).toEqual(top);
        expect(analysis.height).toEqual(analysis.file.height - 1 - top);

        // Set back
        resetVertical(analysis);

        // Too much left
        analysis.setTop(analysis.file.width * 2);
        expect(analysis.top).toEqual(bottom);
        expect(analysis.bottom).toEqual(analysis.file.height - 1);
        expect(analysis.height).toEqual(analysis.file.height - 1 - bottom);

        // Set back
        resetVertical(analysis);

        // Set near from inside left
        analysis.setTop(bottom - 5);
        expect(analysis.top).toEqual(bottom - 5);
        expect(analysis.bottom).toEqual(bottom);
        expect(analysis.height).toEqual(5);

        // Set back
        resetVertical(analysis);

        // Set near from inside right
        analysis.setBottom(top + 5);
        expect(analysis.top).toEqual(top);
        expect(analysis.bottom).toEqual(top + 5);
        expect(analysis.height).toEqual(5);

        // Set back
        resetVertical(analysis);

        // Overlapping left
        analysis.setBottom(top - 5);
        expect(analysis.top).toEqual(top - 5);
        expect(analysis.bottom).toEqual(top);
        expect(analysis.height).toEqual(5);

        // Set back
        resetVertical(analysis);

        // Overlapping right
        analysis.setTop(bottom + 5);
        expect(analysis.top).toEqual(bottom);
        expect(analysis.bottom).toEqual(bottom + 5);
        expect(analysis.height).toEqual(5);

        // Set back
        resetVertical(analysis);


        // Extrema cases

        // NaN
        analysis.setTop(NaN);
        expect(analysis.top).toEqual(top);

        // Floating points
        analysis.setTop(top + .3);
        expect(analysis.top).toEqual(top);
        expect(analysis.height).toEqual(height);

        analysis.setTop(top + .6);
        expect(analysis.top).toEqual(top + 1);
        expect(analysis.height).toEqual(height - 1);
        expect(analysis.bottom).toEqual(bottom);

        // Set back
        resetVertical(analysis);

        // NaN
        analysis.setBottom(NaN);
        expect(analysis.bottom).toEqual(bottom);

        // Floating points
        analysis.setBottom(bottom + .3);
        expect(analysis.bottom).toEqual(bottom);
        expect(analysis.height).toEqual(height);

        analysis.setBottom(bottom + .6);
        expect(analysis.bottom).toEqual(bottom + 1);
        expect(analysis.height).toEqual(height + 1);
        expect(analysis.top).toEqual(top);


        // Finally, make sure no vertical values were affected
        makeSureHorizontalAreUntouched(analysis);

    });

    test("width setter", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = getRectAnalysis(instance);

        const offsetOk = 13;

        // A slight change that should pass

        analysis.setWidth(width - offsetOk);

        expect(analysis.left).toEqual(left);
        expect(analysis.width).toEqual(width - offsetOk);
        expect(analysis.right).toEqual(right - offsetOk);

        resetHorizontal(analysis);

        analysis.setWidth(width + offsetOk);

        expect(analysis.left).toEqual(left);
        expect(analysis.width).toEqual(width + offsetOk);
        expect(analysis.right).toEqual(right + offsetOk);

        resetHorizontal(analysis);

        // A too large change that should not pass
        analysis.setWidth(analysis.file.width + 2);
        expect(analysis.left).toEqual(left);
        expect(analysis.right).toEqual(analysis.file.width - 1);
        expect(analysis.width).toEqual(analysis.file.width - 1 - left);

        resetHorizontal(analysis);

        // A negative value
        analysis.setWidth(-500);
        expect(analysis.width).toEqual(0);
        expect(analysis.right).toEqual(left);
        expect(analysis.left).toEqual(left);

        resetHorizontal(analysis);

        // A floating point value
        analysis.setWidth(width + .1);
        expect(analysis.width).toEqual(width);
        expect(analysis.right).toEqual(right);

        resetHorizontal(analysis);

        analysis.setWidth(width + .9);
        expect(analysis.width).toEqual(width + 1);
        expect(analysis.right).toEqual(right + 1);

        resetHorizontal(analysis);

        // NaN

        analysis.setWidth(NaN);
        expect(analysis.width).toEqual(width);
        expect(analysis.right).toEqual(right);
        expect(analysis.left).toEqual(left);

        // Finally, make sure no vertical values were affected
        makeSureVerticalAreUntouched(analysis);

    });

    test("height setter", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = getEllipsisAnalysis(instance);

        const offsetOk = 17;

        // A slight change that should pass

        analysis.setHeight(height - offsetOk);
        expect(analysis.top).toEqual(top);
        expect(analysis.height).toEqual(height - offsetOk);
        expect(analysis.bottom).toEqual(bottom - offsetOk);

        resetVertical(analysis);

        analysis.setHeight(height + offsetOk);
        expect(analysis.top).toEqual(top);
        expect(analysis.height).toEqual(height + offsetOk);
        expect(analysis.bottom).toEqual(bottom + offsetOk);

        resetVertical(analysis);

        // A too large change that should not pass

        analysis.setHeight(analysis.file.height * 2);
        expect(analysis.top).toEqual(top);
        expect(analysis.bottom).toEqual(analysis.file.height - 1);
        expect(analysis.height).toEqual(analysis.file.height - 1 - top);

        resetVertical(analysis);

        // A negative value

        analysis.setHeight(-1000);
        expect(analysis.height).toEqual(0);
        expect(analysis.bottom).toEqual(top);
        expect(analysis.top).toEqual(top);

        resetVertical(analysis);

        // A floating point value
        analysis.setHeight(height + .1);
        expect(analysis.height).toEqual(height);
        expect(analysis.bottom).toEqual(bottom);

        resetVertical(analysis);

        analysis.setHeight(height + .9);
        expect(analysis.height).toEqual(height + 1);
        expect(analysis.bottom).toEqual(bottom + 1);

        resetVertical(analysis);

        // NaN

        analysis.setHeight(NaN);

        expect(analysis.height).toEqual(height);
        expect(analysis.bottom).toEqual(bottom);
        expect(analysis.top).toEqual(top);

        // Finally, make sure no vertical values were affected
        makeSureHorizontalAreUntouched(analysis);



    });

});