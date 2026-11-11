"use client";

import {
    RangeControl
} from '@wordpress/components';

import { InputControl } from '@wordpress/ui';

import { useCallback, useEffect, useState } from '@wordpress/element';
import { useWebcomponent } from '../hooks/useWebcomponent';



function Row({
    children
}) {

    if (children === undefined || children === null) {
        return <></>;
    }

    return <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: ".2em", padding: ".2em -.2em" }}>
        {children}
    </div>
}

export default function Ms({
    ID,
    attributes,
    setAttributes,
}) {

    const slug = ID + "_playback_ms";

    const [
        file,
        setFile
    ] = useState();

    const [value, setValue] = useState(attributes.ms);

    const [duration, setDuration] = useState();
    const [formattedDuration, setFormattedDuration] = useState();
    const [frame, setFrame] = useState();
    const [frameInput, setFrameInput] = useState();
    const [numFrames, setNumFrames] = useState();


    // Propagate internal value to the attribute
    useEffect(() => {

        if (attributes.ms !== value) {
            setAttributes({ ms: value });
        }

    }, [value, attributes, setAttributes]);

    // Keep the frame display synchronized with the timeline.
    useEffect(() => {

        if (!file || !file.timeline.isSequence) {
            return;
        }

        setDuration(file.timeline.duration);

        const formatted = new Date(file.timeline.duration).toISOString().substr(11, 8);

        const frameCount = file.timeline.steps.length;
        setNumFrames(frameCount);

        setFormattedDuration(formatted + " (" + frameCount + " frames)");

        setFrame(file.timeline.currentStep.index);

        const updateFrame = currentFrame => setFrame(currentFrame.index);

        file.timeline.callbacksChangeFrame.add(slug, updateFrame);
        file.timeline.addListener(slug, setValue);

        return () => {
            file.timeline.callbacksChangeFrame.delete(slug);
            file.timeline.removeListener(slug);
        };
    }, [file, slug]);




    const onReady = useCallback(element => {

        console.log(element.managerObject.registries);

        element.managerObject.registries.forEveryInstance( instance => {
            setFile(instance);
        });

    }, [setFile]);




    const managerProviderRef = useWebcomponent(onReady);

    const selectFrame = index => {
        file.timeline.setFrameByIndex(index);
        setFrame(file.timeline.currentStep.index);
    };

    const commitFrameInput = () => {
        if (frameInput === undefined) {
            return;
        }

        const nextFrame = Number(frameInput) - 1;
        if (
            file
            && frameInput.trim() !== ""
            && Number.isInteger(nextFrame)
            && nextFrame >= 0
            && nextFrame < numFrames
        ) {
            selectFrame(nextFrame);
        }

        setFrameInput(undefined);
    };


    return <manager-provider
        manager-slug={ID}
        advanced-palettes
        unit={attributes.unit}
        ref={managerProviderRef}
    >
        <Row>{formattedDuration}</Row>
        <br />
        <RangeControl
            label="Time in MS"
            value={value}
            unit="ms"
            min={0}
            max={duration}
            step={1}
            onChange={nextValue => {
                setValue(nextValue);
            }}
        />
        <InputControl
            label="Frame number"
            value={frameInput ?? (frame === undefined ? undefined : frame + 1)}
            type="number"
            min={1}
            max={numFrames ?? 1}
            step={1}
            onChange={event => setFrameInput(event.target.value)}
            onBlur={commitFrameInput}
            onKeyDown={event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    event.currentTarget.blur();
                } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                    event.preventDefault();

                    if (!file || !numFrames) {
                        return;
                    }

                    const currentFrame = Number(event.currentTarget.value);
                    const baseFrame = event.currentTarget.value !== "" && Number.isInteger(currentFrame)
                        ? currentFrame
                        : file.timeline.currentStep.index + 1;
                    const offset = event.key === "ArrowUp" ? 1 : -1;
                    const nextFrame = Math.max(1, Math.min(numFrames, baseFrame + offset));

                    setFrameInput(String(nextFrame));
                    if (nextFrame - 1 !== file.timeline.currentStep.index) {
                        selectFrame(nextFrame - 1);
                    }
                }
            }}
            help={`Enter the frame number from 1 to ${numFrames ?? 1} `}
        />
        <br />
        
    </manager-provider>;

}