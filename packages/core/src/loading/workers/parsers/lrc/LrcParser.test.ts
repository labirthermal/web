import { describe, expect, test } from 'vitest';
import { LrcParser } from './LrcParser';
import { FilesService } from '../../FilesService';
import { ThermalFileReader } from '../../ThermalFileReader';
import { THERMOGRAM_PATHS } from '../../../../../devserver/node/mocks';
import { getPool } from '../../../../utils/pool';

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

    test("reads base info of the file from TIMI Edu camera", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader;

        const baseInfo = await file.baseInfo();

        expect(baseInfo.width).toEqual(160);
        expect(baseInfo.height).toEqual(120);
        expect(baseInfo.timestamp).toEqual(1637749100497);
        expect(baseInfo.bytesize).toEqual(76882);
        expect(baseInfo.frameCount).toEqual(1);
        expect(baseInfo.fps).toEqual(Infinity);
        expect(baseInfo.duration).toEqual(0);
        expect(baseInfo.frameInterval).toEqual(0);
        expect(baseInfo.averageEmissivity).toEqual(0.97998046875);
        expect(baseInfo.averageReflectedKelvins).toEqual(295.1499938964844);

    });

    test("reads base info of a TIMI Edu camera sequence", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.SEQUENCE) as ThermalFileReader;

        const baseInfo = await file.baseInfo();

        expect(baseInfo.width).toEqual(160);
        expect(baseInfo.height).toEqual(120);
        expect(baseInfo.timestamp).toEqual(1713882139914);
        expect(baseInfo.bytesize).toEqual(39811951);
        expect(baseInfo.frameCount).toEqual(518);
        expect(baseInfo.averageEmissivity).toEqual(0.97998046875);
        expect(baseInfo.averageReflectedKelvins).toEqual(295.1499938964844);
        expect(baseInfo.min).toEqual(21.170000076293945);
        // eslint-disable-next-line no-loss-of-precision
        expect(baseInfo.max).toEqual(126.83999633789062);
        expect(baseInfo.duration).toEqual(61085);

        // Test FPS calculation
        expect(baseInfo.frameInterval * baseInfo.frameCount).toEqual(baseInfo.duration);
    });

    test("reads base info of a file from Vario Cam", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.TUCNACI) as ThermalFileReader;

        const baseInfo = await file.baseInfo();

        expect(baseInfo.width).toEqual(1024);
        expect(baseInfo.height).toEqual(768);
        expect(baseInfo.timestamp).toEqual(1590143917267);
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

    test("read frames of a TIMI Edu sequence", async () => {

        const {service} = FilesService.isolatedInstance(pool);

        const file = await service.loadFile(THERMOGRAM_PATHS.SEQUENCE) as ThermalFileReader;
        const baseInfo = await file.baseInfo();

        // Read the first frame
        const frame0 = await file.frameData(0);

        // The pixel length needs to fit to dimensions
        expect(frame0.pixels.length).toEqual(baseInfo.width * baseInfo.height);
        // Make sure the frame properties are as they should be
        expect(frame0.timestamp).toEqual(1713882139914);
        expect(frame0.min).toEqual(22.420000076293945);
        expect(frame0.max).toEqual(25.56999969482422);
        expect(frame0.emissivity).toEqual(0.97998046875);
        expect(frame0.reflectedKelvins).toEqual(295.1499938964844);

        // Try another frame
        const frame200 = await file.frameData(0);
        expect(frame200.timestamp).toEqual(1713882139914);

        // A frame outside the range should throw an error
        // expect( async () => await file.getFrameData( 1000 ) ).toThrowError( 'Offset is outside the bounds of the DataView' )

    });

    test("read a frame from Vario Cam", async () => {

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

});