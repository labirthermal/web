import { IParserObject, ParsedFileFrame } from "../../structure";

export const getFrameSubset: IParserObject["getFrameSubset"] = (entireFileBuffer, index) => {

    const headerView = new DataView(entireFileBuffer.slice(0, 25));

    const dataType = headerView.getUint8(15);

    const width = headerView.getUint16(17, true);
    const height = headerView.getUint16(19, true);

    const pixelByteSize = dataType === 1 ? 4 : 2;

    const frameHeaderSize = 57;
    const framePixelsSize = width * height * pixelByteSize;
    const frameSize = frameHeaderSize + framePixelsSize;

    const streamSubset = entireFileBuffer.slice(25);

    const frameSubsetStart = index * frameSize;
    const frameSubsetEnd = frameSubsetStart + frameSize;

    const frameSubset = streamSubset.slice(frameSubsetStart, frameSubsetEnd);

    return {
        array: frameSubset,
        dataType: dataType
    };

};
export const frameData: IParserObject["frameData"] = async (frameSubset, dataType) => {


    // Read the timestamp
    const view = new DataView(frameSubset);


    // Timestamp
    const bigIntTime = view.getBigInt64(0, true);

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

    const timestamp = Number(milliseconds);

    // read the data
    const min = view.getFloat32(8, true);
    const max = view.getFloat32(12, true);
    const emissivity = view.getFloat32(24, true);
    const reflectedKelvins = view.getFloat32(28, true);

    // Const read the pixels
    const subset = frameSubset.slice(57);

    let pixels: number[] = [];

    // UInt16 array needs to be converted to floats
    if (dataType === 0) {

        const array = new Uint16Array(subset);

        const distance = Math.abs(min - max);
        const UINT16_MAX = 65535;

        array.forEach(pixel => {

            const mappedValue = pixel / UINT16_MAX;
            pixels.push(min + (distance * mappedValue));

        });

    } else if (dataType === 1) {
        pixels = Array.from(new Float32Array(subset));
    }

    return {
        timestamp,
        min,
        max,
        emissivity,
        reflectedKelvins,
        pixels
    } as ParsedFileFrame;

};
