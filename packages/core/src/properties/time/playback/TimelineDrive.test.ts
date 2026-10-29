import { describe, expect, it } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../../devserver/node/mocks';
import { ThermalManager } from '../../../hierarchy/ThermalManager';
import { ThermalFileReader } from '../../../loading/workers/ThermalFileReader';
import { TimelineDrive } from './TimelineDrive';
import { getPool } from '../../../utils/pool';

describe("ReTimelineDrive", async () => {

    const pool = await getPool();

    it("control the timeline", async () => {

        const manager = new ThermalManager(pool);
        const registry = manager.addOrGetRegistry("test_registry");
        const group = registry.groups.addOrGetGroup("test_group");

        const reader = await registry.service.loadFile( THERMOGRAM_PATHS.SEQUENCE ) as ThermalFileReader;

        const instance = await reader.createInstance( group );

        const timeline = instance.timeline;
        const buffer = timeline.buffer;

        expect( timeline ).toBeInstanceOf( TimelineDrive );

        // Test timeline initial properties
        expect( timeline.valueInitial ).toEqual(0);
        expect( timeline.duration ).toEqual(instance.duration);
        expect( timeline.startTimestampRelative ).toEqual( 0 );
        expect( timeline.endTimestampRelative ).toEqual( timeline.steps[ timeline.steps.length - 1 ].relative )

        // Current frame in the buffer
        expect( buffer.currentFrame.pixels[0] ).toEqual( instance.pixels[0] );
        // expect( buffer.isSequence ).toEqual(true);
        // expect( timeline.buffer.currentFrame.timestamp ).toEqual( instance.timestamp );

        // Instance consistency
        expect( instance.frameCount ).toEqual( 51 );

        // Searching for the steps
        expect( timeline.findPreviousRelative(1).relative ).toEqual( 0 );
        expect( timeline.findPreviousRelative( 113 ).relative ).toEqual( 0 );
        expect( timeline.findPreviousRelative( 114 ).relative ).toEqual( 0 );
        expect( timeline.findPreviousRelative(115).relative ).toEqual( 114 );

        // Store the value of the first pixel of the first frame for testing
        const firstPixel = timeline.buffer.currentFrame.pixels[0];

        // Test the first pixel
        expect( firstPixel ).toEqual( instance.pixels[0] );


        // Now try setting time and controlling the value
        
        // Setting negative time
        const result_after_negative = await timeline.setRelativeTime( -100 );
        expect( timeline.value ).toEqual( 0 );
        expect( buffer.currentFrame.timestamp ).toEqual(instance.meta.current.timeline[0].absolute );
        expect( result_after_negative.preloaded ).toEqual( false );
        expect( result_after_negative.buffer.length ).toEqual( 0 );

        const result_after_too_much = await timeline.setRelativeTime( 999 * 9999 );

        expect( timeline.value ).toEqual( 5698 );
        expect( timeline.currentFrameIndex ).toEqual( timeline.relativeSteps.length - 1 );
        expect( timeline.value ).toEqual( instance.duration );
        expect( result_after_too_much.preloaded ).toEqual( false );
        expect( result_after_too_much.buffer.length ).toEqual( 0);

        expect( result_after_too_much.absoluteTime ).toEqual( result_after_too_much.currentFrame.timestamp );

        expect( result_after_too_much.relativeTime ).toEqual( 5698 );
        expect( result_after_too_much.currentStep.index ).toEqual( 50 );
        expect( result_after_too_much.preloaded ).toEqual( false );
        expect( result_after_too_much.hasChanged ).toEqual( true );

        // Now set to the second frame
        const result_second_frame = await timeline.setRelativeTime( 114 );

        expect( result_second_frame.currentStep.index ).toEqual( 1 );

        expect( buffer.currentFrame.timestamp ).toEqual( timeline.currentStep.absolute );

        // Now move one second later (no change should happen)
        const result_after_second_frame = await timeline.setRelativeTime( 114 + 60 );

        expect( result_after_second_frame.hasChanged ).toEqual( false );
        expect( result_after_second_frame.preloaded ).toEqual( false );

        // now set to the half of the sequence
        const result_in_half = await timeline.setValueByPercent( 50 );

        expect( result_in_half.currentFrame.timestamp ).toEqual( result_in_half.currentStep.absolute );

        // The fixture has regular 114 ms steps, the half lands on the nearest one
        expect( Math.abs( result_in_half.currentStep.relative - instance.duration / 2 ) ).toBeLessThanOrEqual( 114 / 2 );

        expect( result_in_half.preloaded ).toEqual( true );

        expect( result_in_half.buffer[0].index ).toEqual( result_in_half.currentStep.index + 1 );

    });


});