import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../../../devserver/node/mocks';
import { loadFileForTests } from '../../../../../devserver/node/scaffold';
import { ThermalFileInstance } from '../../../../file/ThermalFileInstance';
import { AbstractRenderer } from '../../../../file/render/AbstractRenderer';
import { AbstractAreaAnalysis } from './area/AbstractAreaAnalysis';

const left = 10;
const top = 20;
const right = 100;
const bottom = 100;

const width = right - left;
const height = bottom - top;

const getRectAnalysis = (name: string, instance: ThermalFileInstance) => {
    return instance.analysis.layers.placeRectAt(name, top, left, right, bottom);
}

const getEllipsisAnalysis = (name: string, instance: ThermalFileInstance) => {
    return instance.analysis.layers.placeEllipsisAt(name, top, left, right, bottom);
}

const getPointAnalysis = (name: string, instance: ThermalFileInstance) => {
    return instance.analysis.layers.placePointAt(name, top, left);
}

const resetHorizontal = (analysis: AbstractAreaAnalysis) => {
    analysis.setLeft(left);
    analysis.setRight(right);
    expect(analysis.left).toEqual(left);
    expect(analysis.right).toEqual(right);
    expect(analysis.width).toEqual(width);
    vi.advanceTimersByTime(1);
}

const resetVertical = (analysis: AbstractAreaAnalysis) => {
    analysis.setTop(top);
    analysis.setBottom(bottom);
    expect(analysis.top).toEqual(top);
    expect(analysis.bottom).toEqual(bottom);
    expect(analysis.height).toEqual(height);
    vi.advanceTimersByTime(1);
}


describe("Serialisation of analysis", () => {

    let instance: ThermalFileInstance;

    beforeEach(async () => {
        // Serialization needs the analysis DOM, not canvas rendering in a worker.
        vi.spyOn(AbstractRenderer.prototype, "render").mockResolvedValue(undefined);
        instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    test("serializes name", async () => {

        const analysis = getEllipsisAnalysis("ABCDEFG", instance);

        const slot = instance.slots.assignAnalysisToSlot( 1, analysis );

        // Contain the initial name
        expect(slot.serialized).toContain("ABCDEFG");

        // Set the name
        analysis.setName("XYZ");
        vi.advanceTimersByTime( 1 );

        // Contains the new name
        expect(slot.serialized).toContain("XYZ");

    });

    test("serializes color", async () => {

        const analysis = getRectAnalysis("ABCDEFG", instance);

        const slot = instance.slots.assignAnalysisToSlot( 1, analysis );

        // Contain the initial color
        expect(slot.serialized).toContain("Blue");

        // Set the color
        analysis.setInitialColor("Pink");

        vi.advanceTimersByTime( 1 );

        // Contains the new name
        expect(slot.serialized).toContain("Pink");

    });

    test("serialisation dimensions", async () => {

        const analysis = getRectAnalysis("ABCDEFG", instance);

        const slot = instance.slots.assignAnalysisToSlot( 1, analysis );

        expect(slot.serialized).toContain(`top:${top}`);
        expect(slot.serialized).toContain(`left:${left}`);
        expect(slot.serialized).toContain(`width:${width}`);
        expect(slot.serialized).toContain(`height:${height}`);

        const newTop = 14;
        const newLeft = 17;
        const newWidth = 19;
        const newHeight = 23;

        analysis.setTop(newTop);
        analysis.setLeft(newLeft);
        analysis.setWidth(newWidth);
        analysis.setHeight(newHeight);

        vi.advanceTimersByTime( 1 );
        analysis.recalculateValues();

        expect(slot.serialized).toContain(`top:${newTop}`);
        expect(slot.serialized).toContain(`left:${newLeft}`);
        expect(slot.serialized).toContain(`width:${newWidth}`);
        expect(slot.serialized).toContain(`height:${newHeight}`);

        expect(analysis.top).toEqual(newTop);
        expect(analysis.left).toEqual(newLeft);
        expect(analysis.width).toEqual(newWidth);
        expect(analysis.height).toEqual(newHeight);

    });

    test("serialisation of analysis", async () => {

        const analysis = getRectAnalysis("ABCDEFG", instance);

        const slot = instance.slots.assignAnalysisToSlot( 1, analysis );

        // Initial state
        expect(slot.serialized).not.toContain("avg");
        expect(slot.serialized).not.toContain("min");
        expect(slot.serialized).not.toContain("max");

        // AVG

        analysis.graph.setAvgActivation(true);
        vi.advanceTimersByTime( 1 );
        expect(slot.serialized).toContain("avg");

        analysis.graph.setAvgActivation(false);
        vi.advanceTimersByTime( 1 );
        expect(slot.serialized).not.toContain("avg");


        // MIN

        analysis.graph.setMinActivation(true);
        vi.advanceTimersByTime( 1 );
        expect(slot.serialized).toContain("min");

        analysis.graph.setMinActivation(false);
        vi.advanceTimersByTime( 1 );
        expect(slot.serialized).not.toContain("min");


        // MAX

        analysis.graph.setMaxActivation(true);
        vi.advanceTimersByTime( 1 );
        expect(slot.serialized).toContain("max");

        analysis.graph.setMaxActivation(false);
        vi.advanceTimersByTime( 1 );
        expect(slot.serialized).not.toContain("max");

    });

    test("parsing of serialized color", async () => {

        const analysis = getRectAnalysis("ABCDEFG", instance);

        const slot = instance.slots.assignAnalysisToSlot( 1, analysis );

        const name = "fňukálek";
        const left = 37;
        const top = 41;
        const width = 43;
        const height = 47;
        const color = "olive";

        const formatSerialized = (
            withSpaces: boolean,
            name: string,
            type: "rectangle" | "ellipsis" | "point",
            left: number,
            top: number,
            width: number,
            height: number,
            color: string,
            avg: boolean,
            min: boolean,
            max: boolean,
            separator: string = ";"
        ) => {


            const valueWithEventualSpaces = (value: string | number) => {
                if (withSpaces === false) {
                    return value.toString();
                }

                else {
                    return ` ${value.toString()}  `;
                }
            }

            const output: string[] = [];

            output.push(valueWithEventualSpaces(name));
            output.push(valueWithEventualSpaces(type));
            output.push(`top:${valueWithEventualSpaces(top)}`);
            output.push(`left:${valueWithEventualSpaces(left)}`);
            output.push(`width:${valueWithEventualSpaces(width)}`);
            output.push(`height:${valueWithEventualSpaces(height)}`);
            output.push(`color:${valueWithEventualSpaces(color)}`);

            if (avg) output.push("avg");
            if (min) output.push("min");
            if (max) output.push("max");

            return output.join(separator);

        }

        const version_1 = formatSerialized(false, name, "rectangle", left, top, width, height, color, false, false, false, ";");

        analysis.recievedSerialized(version_1);

        vi.advanceTimersByTime(1);

        expect(analysis.name).toEqual(name);
        expect(analysis.initialColor).toEqual(color);
        expect(analysis.top).toEqual(top);
        expect(analysis.left).toEqual(left);
        expect(analysis.width).toEqual(width);
        expect(analysis.height).toEqual(height);

        expect(slot.serialized).not.toContain("avg");
        expect(slot.serialized).not.toContain("min");
        expect(slot.serialized).not.toContain("max");

        const version_2 = formatSerialized(false, name, "rectangle", left, top, width, height, color, true, true, true, ";");

        analysis.recievedSerialized(version_2);

        vi.advanceTimersByTime(1);

        expect(analysis.graph.state.AVG).toEqual(true);
        expect(analysis.graph.state.MIN).toEqual(true);
        expect(analysis.graph.state.MAX).toEqual(true);

    });

    test("point analysis", async () => {

        const analysis = getPointAnalysis("ABCDEFG", instance);

        const slot = instance.slots.assignAnalysisToSlot( 1, analysis );

        expect(analysis.top).toEqual(top);

        expect(slot.serialized).toContain(`top:${top}`);
        expect(slot.serialized).toContain(`left:${left}`);
        expect(slot.serialized).toContain(`color:${analysis.initialColor}`);
        expect(slot.serialized).not.toContain("avg");
        expect(slot.serialized).not.toContain("max");
        expect(slot.serialized).not.toContain("min");

        analysis.setWidth(14);
        expect(analysis.width).toEqual(0);

        analysis.setHeight(17);
        expect(analysis.height).toEqual(0);

        analysis.setLeft(19);
        expect(analysis.left).toEqual(19);

        analysis.setTop(23);
        expect(analysis.top).toEqual(23);

        vi.advanceTimersByTime(1);

        expect(slot.serialized).toContain(`top:${23}`);
        expect(slot.serialized).toContain(`left:${19}`);

    });

    test("Invalid input", async () => {

        const analysis = getRectAnalysis("AbCdEfGhIjKlMnOpQrStUvWxYz", instance);

        const slot = instance.slots.assignAnalysisToSlot( 1, analysis );

        const newName = "Pepíček";

        // Set invalid name

        analysis.recievedSerialized(newName);
        vi.advanceTimersByTime(1);
        expect(analysis.name).toEqual("AbCdEfGhIjKlMnOpQrStUvWxYz");
        expect(slot.serialized).not.toContain(newName);

        // Set invalid type

        analysis.recievedSerialized(`${newName};something`);
        vi.advanceTimersByTime(1);
        expect(slot.serialized).not.toContain(newName);

        // Set valid type

        analysis.recievedSerialized(`${newName};rectangle`);
        vi.advanceTimersByTime(1);
        expect(slot.serialized).toContain(newName);

        // Try to retype

        analysis.recievedSerialized(`${newName};ellipsis`);
        vi.advanceTimersByTime(1);
        expect(slot.serialized).not.toContain("ellipsis");
        expect(slot.serialized).toContain("rectangle");

        // There should be dimensions even though they were not set

        expect(slot.serialized).toContain(`top:${top}`);
        expect(slot.serialized).toContain(`left:${left}`);
        expect(slot.serialized).toContain(`width:${width}`);
        expect(slot.serialized).toContain(`height:${height}`);
        expect(slot.serialized).toContain(`color:Blue`);

        expect(slot.serialized).not.toContain("max");
        expect(slot.serialized).not.toContain("min");
        expect(slot.serialized).not.toContain("avg");

        // Try to set a graph state

        analysis.recievedSerialized(`${newName};rectangle;avg`);
        vi.advanceTimersByTime(1);
        expect(slot.serialized).toContain("avg");
        expect( analysis.graph.state.AVG ).toEqual( true );

        analysis.recievedSerialized(`${newName};rectangle;min;max;avg`);
        vi.advanceTimersByTime(1);
        expect( analysis.graph.state.AVG ).toEqual( true );
        expect( analysis.graph.state.MAX ).toEqual( true );
        expect( analysis.graph.state.MIN ).toEqual( true );

        expect(slot.serialized).toContain("avg");
        expect(slot.serialized).toContain("min");
        expect(slot.serialized).toContain("max");

        analysis.recievedSerialized(`${newName};rectangle;avg`);
        vi.advanceTimersByTime(1);
        expect( analysis.graph.state.AVG ).toEqual( true );
        expect( analysis.graph.state.MAX ).toEqual( false );
        expect( analysis.graph.state.MIN ).toEqual( false );

        // Try to set dimensions out of bounds
        analysis.recievedSerialized( "Something;rectangle;top:1000000" );
        vi.advanceTimersByTime(1);
        expect( analysis.top ).toEqual( bottom );
        expect( analysis.bottom ).toEqual( analysis.file.height - 1 );
        expect( slot.serialized ).toContain( `top:${bottom}` );
        expect( slot.serialized ).toContain( `height:${analysis.file.height - 1 - bottom}` );

        resetHorizontal( analysis );
        resetVertical( analysis );

        expect(slot.serialized).toContain(`top:${top}`);
        expect(slot.serialized).toContain(`left:${left}`);
        expect(slot.serialized).toContain(`width:${width}`);
        expect(slot.serialized).toContain(`height:${height}`);
        


        

        

    });

});