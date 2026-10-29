import { describe, expect, test } from 'vitest';
import { LrcParser } from './LrcParser';
import { FilesService } from '../../loading/workers/FilesService';
import { ThermalFileReader } from '../../loading/workers/ThermalFileReader';
import { THERMOGRAM_PATHS, readLrcFixture } from '../../../devserver/node/mocks';
import { readFlirFixture } from '../../../devserver/node/flirFixtures';
import { determineParser } from '../index';
import { getPool } from '../../utils/pool';

describe("LrcParser", async () => {

    const pool = await getPool();

    test("is assigned to appropriate files and has all metadata", async () => {

        const {service} = FilesService.isolatedInstance( pool );

        const file = await service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader;

        const parser = file.parser;

        expect(parser.name).toEqual(LrcParser.name);
        expect(parser.description).toEqual(LrcParser.description);
        expect(parser.devices).toEqual(LrcParser.devices);

    });

    test("reads base info of a Float32 image", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader;

        const baseInfo = await file.baseInfo();

        expect(baseInfo.width).toEqual(160);
        expect(baseInfo.height).toEqual(120);
        expect(baseInfo.timestamp).toEqual(1733746366146);
        expect(baseInfo.bytesize).toEqual(76882);
        expect(baseInfo.frameCount).toEqual(1);
        expect(baseInfo.fps).toEqual(Infinity);
        expect(baseInfo.duration).toEqual(0);
        expect(baseInfo.frameInterval).toEqual(0);
        expect(baseInfo.averageEmissivity).toEqual(0.97998046875);
        expect(baseInfo.averageReflectedKelvins).toEqual(295.1499938964844);

    });

    test("reads base info of a Float32 sequence", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.SEQUENCE) as ThermalFileReader;

        const baseInfo = await file.baseInfo();

        expect(baseInfo.width).toEqual(160);
        expect(baseInfo.height).toEqual(120);
        expect(baseInfo.timestamp).toEqual(1713882170343);
        expect(baseInfo.bytesize).toEqual(3919732);
        expect(baseInfo.frameCount).toEqual(51);
        expect(baseInfo.averageEmissivity).toEqual(0.97998046875);
        expect(baseInfo.averageReflectedKelvins).toEqual(295.1499938964844);
        expect(baseInfo.min).toEqual(23.28999900817871);
        expect(baseInfo.max).toEqual(80.72999572753906);
        expect(baseInfo.duration).toEqual(5698);

        // Test FPS calculation
        expect(baseInfo.frameInterval * baseInfo.frameCount).toEqual(baseInfo.duration);
    });

    test("reads base info of a Uint16 image", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.TUCNACI) as ThermalFileReader;

        const baseInfo = await file.baseInfo();

        expect(baseInfo.width).toEqual(1024);
        expect(baseInfo.height).toEqual(768);
        expect(baseInfo.timestamp).toEqual(1590143982744);
        expect(baseInfo.bytesize).toEqual(1572946);
        expect(baseInfo.frameCount).toEqual(1);
        expect(baseInfo.fps).toEqual(Infinity);
        expect(baseInfo.duration).toEqual(0);
        expect(baseInfo.frameInterval).toEqual(0);
        expect(baseInfo.averageEmissivity).toEqual(1);
        expect(baseInfo.averageReflectedKelvins).toEqual(293.1499938964844);

    });

    test( "is able to store base info in menory", async () => {

        const {service} = FilesService.isolatedInstance(pool);
        const file = await service.loadFile( THERMOGRAM_PATHS.SOUSTRUH ) as ThermalFileReader;

        // Upon the first load, the value shall be stored in the service to prevent multiple calculations
        const request1 = await file.baseInfo();

        // This request should obtain the identical object as the first request
        const request2 = await file.baseInfo();

        // Both request should result in deeply equal responses.
        // Ie. both requests should obtain one and only identicaly object
        expect( request1 ).toEqual( request2 );

    } );

    test("reads frames of a Float32 sequence", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.SEQUENCE) as ThermalFileReader;
        const baseInfo = await file.baseInfo();

        // Read the first frame
        const frame0 = await file.frameData(0);

        // The pixel length needs to fit to dimensions
        expect(frame0.pixels.length).toEqual(baseInfo.width * baseInfo.height);
        // Make sure the frame properties are as they should be
        expect(frame0.timestamp).toEqual(1713882170343);
        expect(frame0.min).toEqual(24.670000076293945);
        expect(frame0.max).toEqual(34.88999938964844);
        expect(frame0.emissivity).toEqual(0.97998046875);
        expect(frame0.reflectedKelvins).toEqual(295.1499938964844);

        // Try another frame
        const frame1 = await file.frameData(1);
        expect(frame1.timestamp).toEqual(1713882170343 + 114);

        // A frame outside the range should throw an error
        // expect( async () => await file.getFrameData( 1000 ) ).toThrowError( 'Offset is outside the bounds of the DataView' )

    });

    test("reads a frame of a Uint16 image", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.TUCNACI) as ThermalFileReader;
        const baseInfo = await file.baseInfo();

        // Read the first frame
        const frame = await file.frameData(0);

        // The number of pixels need to correspond to dimensions
        expect(frame.pixels.length).toEqual(baseInfo.width * baseInfo.height);

        // The frame parameters need to match the parameters from the base info
        expect(baseInfo.timestamp).toEqual(frame.timestamp);
        expect(baseInfo.averageEmissivity).toEqual(frame.emissivity);
        expect(baseInfo.averageReflectedKelvins).toEqual(frame.reflectedKelvins);
        expect(baseInfo.min).toEqual(frame.min);
        expect(baseInfo.max).toEqual(frame.max);

    });

    test("detects LRC by content, regardless of the file name", () => {

        const lrc = readLrcFixture("image_float32_small.lrc");

        expect(LrcParser.is(lrc, "renamed-without-extension")).toBe(true);
        expect(LrcParser.is(lrc, "image.jpg")).toBe(true);
        expect(determineParser(lrc, "renamed-without-extension")).toBe(LrcParser);

        // A signature without a complete header is not recognised
        expect(LrcParser.is(lrc.slice(0, 24), "image.lrc")).toBe(false);
        // Neither is another format with an LRC extension
        expect(LrcParser.is(readFlirFixture("flir_01.jpg"), "image.lrc")).toBe(false);

    });

    test.each([
        ["image_float32_small.lrc", "image_uint16_small.lrc"],
        ["sequence_float32_small_short.lrc", "sequence_uint16_small_short.lrc"],
    ])("Float32 %s and Uint16 %s decode the same scene", async (float32, uint16) => {

        const read = async (name: string, index: number) => {
            const subset = LrcParser.getFrameSubset(readLrcFixture(name), index);
            return LrcParser.frameData(subset.array, subset.dataType);
        };

        const { frameCount } = await LrcParser.baseInfo(readLrcFixture(float32));
        expect((await LrcParser.baseInfo(readLrcFixture(uint16))).frameCount).toEqual(frameCount);

        for (const index of new Set([0, frameCount - 1])) {
            const reference = await read(float32, index);
            const quantised = await read(uint16, index);

            // Uint16 pixels differ by at most one quantisation step
            const step = (quantised.max - quantised.min) / 65535;
            const difference = reference.pixels.reduce((max, pixel, i) => Math.max(max, Math.abs(pixel - quantised.pixels[i])), 0);

            expect(quantised.timestamp).toEqual(reference.timestamp);
            expect(quantised.pixels).toHaveLength(reference.pixels.length);
            expect(difference).toBeLessThanOrEqual(step * 1.01);
        }

    });

});
