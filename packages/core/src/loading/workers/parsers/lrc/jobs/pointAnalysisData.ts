import { IParserObject, PointAnalysisData } from "../../structure";

export const pointAnalysisData: IParserObject["pointAnalysisData"] = async (entireFileBuffer, x, y) => {

    const view = new DataView(entireFileBuffer);

    // The dimensions
    const width = view.getUint16(17, true);
    const height = view.getUint16(19, true);


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


    const output: PointAnalysisData = {};


    const readFrame = (index: number) => {

        const frameSubsetStart = index * frameSize;
        const frameSubsetEnd = frameSubsetStart + frameSize;
        const frameArrayBuffer = streamSubset.slice(frameSubsetStart, frameSubsetEnd);

        const frameView = new DataView(frameArrayBuffer);
        const timestamp = readTimestamp(frameView, 0);
        const min = frameView.getFloat32(8, true);
        const max = frameView.getFloat32(12, true);
        const range = max - min;

        const frameHeaderByteSize = 57;

        const pointIndex = frameHeaderByteSize + (y * pixelByteSize * width ) + x * pixelByteSize;

        let temperature: number = 0;

        if ( dataType === 1 ) {
            temperature = frameView.getFloat32(pointIndex, true);
        } else if ( dataType === 0 ) {

            const rawtemperature = frameView.getInt16(pointIndex, true);
            const UINT16_MAX = 65535;
            const mappedValue = rawtemperature / UINT16_MAX;

            temperature = min + (range * mappedValue);

        }


        return {
            timestamp,
            temperature
        };

    };

    let firstTimestamp: number = 0;


    for (let i = 0; i < frameCount; i++) {
        const frame = readFrame(i);

        if ( firstTimestamp === 0 ) {
            firstTimestamp = frame.timestamp;
        }

        output[frame.timestamp - firstTimestamp] = frame.temperature;
    }

    return output;

};
