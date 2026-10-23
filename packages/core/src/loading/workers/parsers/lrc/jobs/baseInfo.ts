import { IParserObject, ParsedFileBaseInfo } from "../../structure";

export const baseInfo: IParserObject["baseInfo"] = async (entireFileBuffer) => {

    const view = new DataView(entireFileBuffer);

    // The dimensions
    const width = view.getUint16(17, true);
    const height = view.getUint16(19, true);

    // File size
    const bytesize = entireFileBuffer.byteLength;

    const readTimestamp = (readingView: DataView, index: number) => {
        // Timestamp


        const bigIntTime = readingView.getBigInt64(index, true);

        // Constant representing the Unix epoch in milliseconds
        const UnixEpoch: bigint = 62135596800000n;

        // Constants related to ticks (assuming ticks are stored as milliseconds)
        const TicksPerMillisecond: bigint = 10000n;
        const TicksPerDay: bigint = 24n * 60n * 60n * 1000n * TicksPerMillisecond;

        // Maximum value a 64-bit signed integer can hold
        const TicksCeiling: bigint = 0x4000000000000000n; // Assuming int64_t behaves like a signed 64-bit integer


        // Mask to extract the sign bit from a 64-bit unsigned integer
        const LocalMask: bigint = 0x8000000000000000n;

        // Mask to extract the tick value from a 64-bit unsigned integer
        const TicksMask: bigint = 0x3fffffffffffffffn;

        let ticks = bigIntTime & TicksMask;

        const isLocalTime = bigIntTime & LocalMask;

        if (isLocalTime) {

            if (ticks > (TicksCeiling - TicksPerDay)) {
                ticks -= TicksCeiling;
            }

            if (ticks < 0) {
                ticks += TicksPerDay;
            }

        }

        // the time is UTC, needs to be converted to local time zone
        const milliseconds = ticks / TicksPerMillisecond - UnixEpoch;

        return Number(milliseconds);

    };


    // DataType byte 15
    const dataType = view.getUint8(15);

    // One pixel length
    // DataType 0 = float16
    // DataType 1 = float32 (TIMI Edu)
    // DataType 2 = int16 (Vario Cam .seq => .lrc)
    let pixelByteSize: number = 2;
    if (dataType === 1) pixelByteSize = 4;

    const frameHeaderByteSize = 57;
    const framePixelsSize = width * height * pixelByteSize;
    const frameSize = frameHeaderByteSize + framePixelsSize;

    const streamSubset = entireFileBuffer.slice(25);

    const frameCount = streamSubset.byteLength / frameSize;


    const readFrame = (index: number) => {

        const frameSubsetStart = index * frameSize;
        const frameSubsetEnd = frameSubsetStart + frameSize;

        const frameArrayBuffer = streamSubset.slice(frameSubsetStart, frameSubsetEnd);

        const frameView = new DataView(frameArrayBuffer);

        const min = frameView.getFloat32(8, true);
        const max = frameView.getFloat32(12, true);
        const timestamp = readTimestamp(frameView, 0);
        const emissivity = frameView.getFloat32(24, true);
        const reflectedKelvins = frameView.getFloat32(28, true);

        return {
            timestamp,
            min,
            max,
            emissivity,
            reflectedKelvins
        };

    };

    const frames: {
        timestamp: number;
        min: number;
        max: number;
        emissivity: number;
        reflectedKelvins: number;
    }[] = [];

    for (let i = 0; i < frameCount; i++) {
        const frame = readFrame(i);

        frames.push(frame);
    }

    const sums = {
        emissivity: 0,
        reflectedKelvins: 0
    };

    let currentMin = Infinity;
    let currentMax = -Infinity;

    const timestamps: number[] = [];

    frames.forEach(frame => {

        sums.emissivity = sums.emissivity + frame.emissivity;
        sums.reflectedKelvins = sums.reflectedKelvins + frame.reflectedKelvins;

        if (frame.min < currentMin) {
            currentMin = frame.min;
        }

        if (frame.max > currentMax) {
            currentMax = frame.max;
        }

        timestamps.push(frame.timestamp);

    });

    const timelineStart: number = timestamps[0];
    let timelineCursor: number = 0;

    const timeline: number[] = [];

    const f: ParsedFileBaseInfo["timeline"] = [];

    timestamps.forEach((t, index) => {

        const next = timestamps[index + 1];
        let offset: number = 0; //eslint-disable-line no-useless-assignment
        if (next === undefined) {
            offset = 0;
        } else {
            offset = next - t;
        }

        const relative = t - timelineStart;

        timeline.push(offset);
        timelineCursor = timelineCursor + offset;

        f.push({
            absolute: t,
            relative: relative, // isNaN( relativeTime ) ? 0 : relativeTime,
            offset: isNaN(offset) ? 0 : offset,
            index
        });

    });

    const duration = frames[frames.length - 1].timestamp - frames[0].timestamp;

    const frameInterval = duration / (frameCount);

    const fps = 1000 / frameInterval;

    const firstTimestamp = frames[0].timestamp;

    return {
        width,
        height,
        timestamp: firstTimestamp,
        bytesize,
        frameCount,
        duration,
        frameInterval,
        fps,
        timeline: f,
        min: currentMin,
        max: currentMax,
        averageEmissivity: sums.emissivity / frames.length,
        averageReflectedKelvins: sums.reflectedKelvins / frames.length
    } as ParsedFileBaseInfo;


};
