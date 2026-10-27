import * as workerpool from "workerpool";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { addDays, addHours, addMonths, addYears, endOfDay, endOfHour, endOfMonth, endOfWeek, endOfYear, format, formatISO9075, startOfDay, startOfHour, startOfMonth, startOfWeek, startOfYear } from "date-fns";
import domtoimage from "dom-to-image";
import { downloadZip } from "client-zip";
//#region package.json
var version = "2.0.0";
//#endregion
//#region src/properties/callbacksManager.ts
/**
* Manage callbacks on optional property values. All callbacks are registered with a unique key. This class extends the built-in `Map` class.
* 
* @module @labirthermal/core
* @author Jan Jáchim <jachim@zcu.cz>
*/
var CallbacksManager = class extends Map {
	/** An alternative to built-in `set` method enabling one-shot callbacks */
	add(key, callback, oneShot = false) {
		if (oneShot) this.set(key, ((...args) => {
			callback(...args);
			this.delete(key);
		}));
		else this.set(key, callback);
	}
	/** Trigger all registered callbacks wuth the provided value(s) */
	call(...args) {
		this.forEach((fn) => fn(...args));
	}
};
//#endregion
//#region src/utils/pool.ts
let pool = void 0;
const getPool = async () => {
	if (!pool) pool = workerpool.pool({ maxWorkers: 6 });
	return pool;
};
//#endregion
//#region src/base/BaseStructureObject.ts
var BaseStructureObject = class {};
//#endregion
//#region src/filters/FilterContainer.ts
var FilterContainer = class {
	parent;
	_layers = [];
	get layers() {
		return this._layers;
	}
	onLayers = new CallbacksManager();
	setLayers(layers) {
		if (layers.length !== this._layers.length) {
			this._layers = layers;
			this.onLayers.call(this.layers);
		}
	}
	constructor(parent) {
		this.parent = parent;
	}
	getActiveFilters() {
		return this.layers.filter((layer) => layer.bypass === false);
	}
	addFilter(filter) {
		if (this.layers.includes(filter)) console.error(`filter ${filter} is already in ${this.parent}`);
		this._layers.push(filter);
		this.onLayers.call(this.layers);
	}
	removeFilter(filter) {
		if (this.layers.includes(filter)) {
			this._layers = this.layers.filter((layer) => layer !== filter);
			this.onLayers.call(this.layers);
		}
	}
	applyFilters() {
		this.parent.getInstances().forEach((instance) => {
			instance.applyAllAvailableFilters();
		});
	}
	getFiltersArray() {}
};
//#endregion
//#region src/loading/workers/errors.ts
/** The error that is thrown anytime something happens during the loading */
var FileLoadingError = class extends Error {
	code;
	url;
	constructor(code, url, message) {
		super(message);
		this.code = code;
		this.url = url;
	}
};
//#endregion
//#region src/loading/workers/parsers/lrc/jobs/baseInfo.ts
const baseInfo$1 = async (entireFileBuffer) => {
	const view = new DataView(entireFileBuffer);
	const width = view.getUint16(17, true);
	const height = view.getUint16(19, true);
	const bytesize = entireFileBuffer.byteLength;
	const readTimestamp = (readingView, index) => {
		const bigIntTime = readingView.getBigInt64(index, true);
		const UnixEpoch = 62135596800000n;
		const TicksPerMillisecond = 10000n;
		const TicksPerDay = 24n * 60n * 60n * 1000n * TicksPerMillisecond;
		const TicksCeiling = 4611686018427387904n;
		const LocalMask = 9223372036854775808n;
		let ticks = bigIntTime & 4611686018427387903n;
		if (bigIntTime & LocalMask) {
			if (ticks > TicksCeiling - TicksPerDay) ticks -= TicksCeiling;
			if (ticks < 0) ticks += TicksPerDay;
		}
		const milliseconds = ticks / TicksPerMillisecond - UnixEpoch;
		return Number(milliseconds);
	};
	const dataType = view.getUint8(15);
	let pixelByteSize = 2;
	if (dataType === 1) pixelByteSize = 4;
	const frameSize = 57 + width * height * pixelByteSize;
	const streamSubset = entireFileBuffer.slice(25);
	const frameCount = streamSubset.byteLength / frameSize;
	const readFrame = (index) => {
		const frameSubsetStart = index * frameSize;
		const frameSubsetEnd = frameSubsetStart + frameSize;
		const frameArrayBuffer = streamSubset.slice(frameSubsetStart, frameSubsetEnd);
		const frameView = new DataView(frameArrayBuffer);
		const min = frameView.getFloat32(8, true);
		const max = frameView.getFloat32(12, true);
		return {
			timestamp: readTimestamp(frameView, 0),
			min,
			max,
			emissivity: frameView.getFloat32(24, true),
			reflectedKelvins: frameView.getFloat32(28, true)
		};
	};
	const frames = [];
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
	const timestamps = [];
	frames.forEach((frame) => {
		sums.emissivity = sums.emissivity + frame.emissivity;
		sums.reflectedKelvins = sums.reflectedKelvins + frame.reflectedKelvins;
		if (frame.min < currentMin) currentMin = frame.min;
		if (frame.max > currentMax) currentMax = frame.max;
		timestamps.push(frame.timestamp);
	});
	const timelineStart = timestamps[0];
	let timelineCursor = 0;
	const timeline = [];
	const f = [];
	timestamps.forEach((t, index) => {
		const next = timestamps[index + 1];
		let offset = 0;
		if (next === void 0) offset = 0;
		else offset = next - t;
		const relative = t - timelineStart;
		timeline.push(offset);
		timelineCursor = timelineCursor + offset;
		f.push({
			absolute: t,
			relative,
			offset: isNaN(offset) ? 0 : offset,
			index
		});
	});
	const duration = frames[frames.length - 1].timestamp - frames[0].timestamp;
	const frameInterval = duration / frameCount;
	const fps = 1e3 / frameInterval;
	return {
		width,
		height,
		timestamp: frames[0].timestamp,
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
	};
};
//#endregion
//#region src/loading/workers/parsers/lrc/jobs/getFrameSubset.ts
const getFrameSubset$1 = (entireFileBuffer, index) => {
	const headerView = new DataView(entireFileBuffer.slice(0, 25));
	const dataType = headerView.getUint8(15);
	const width = headerView.getUint16(17, true);
	const height = headerView.getUint16(19, true);
	const pixelByteSize = dataType === 1 ? 4 : 2;
	const frameSize = 57 + width * height * pixelByteSize;
	const streamSubset = entireFileBuffer.slice(25);
	const frameSubsetStart = index * frameSize;
	const frameSubsetEnd = frameSubsetStart + frameSize;
	return {
		array: streamSubset.slice(frameSubsetStart, frameSubsetEnd),
		dataType
	};
};
const frameData$1 = async (frameSubset, dataType) => {
	const view = new DataView(frameSubset);
	const bigIntTime = view.getBigInt64(0, true);
	const UnixEpoch = 62135596800000n;
	const TicksPerMillisecond = 10000n;
	const TicksPerDay = 24n * 60n * 60n * 1000n * TicksPerMillisecond;
	const TicksCeiling = 4611686018427387904n;
	const LocalMask = 9223372036854775808n;
	let ticks = bigIntTime & 4611686018427387903n;
	if (bigIntTime & LocalMask) {
		if (ticks > TicksCeiling - TicksPerDay) ticks -= TicksCeiling;
		if (ticks < 0) ticks += TicksPerDay;
	}
	const milliseconds = ticks / TicksPerMillisecond - UnixEpoch;
	const timestamp = Number(milliseconds);
	const min = view.getFloat32(8, true);
	const max = view.getFloat32(12, true);
	const emissivity = view.getFloat32(24, true);
	const reflectedKelvins = view.getFloat32(28, true);
	const subset = frameSubset.slice(57);
	let pixels = [];
	if (dataType === 0) {
		const array = new Uint16Array(subset);
		const distance = Math.abs(min - max);
		const UINT16_MAX = 65535;
		array.forEach((pixel) => {
			const mappedValue = pixel / UINT16_MAX;
			pixels.push(min + distance * mappedValue);
		});
	} else if (dataType === 1) pixels = Array.from(new Float32Array(subset));
	return {
		timestamp,
		min,
		max,
		emissivity,
		reflectedKelvins,
		pixels
	};
};
//#endregion
//#region src/loading/workers/parsers/lrc/jobs/pointAnalysisData.ts
const pointAnalysisData$1 = async (entireFileBuffer, x, y) => {
	const view = new DataView(entireFileBuffer);
	const width = view.getUint16(17, true);
	const height = view.getUint16(19, true);
	const readTimestamp = (readingView, index) => {
		const bigIntTime = readingView.getBigInt64(index, true);
		const UnixEpoch = 62135596800000n;
		const TicksPerMillisecond = 10000n;
		const TicksPerDay = 24n * 60n * 60n * 1000n * TicksPerMillisecond;
		const TicksCeiling = 4611686018427387904n;
		const LocalMask = 9223372036854775808n;
		let ticks = bigIntTime & 4611686018427387903n;
		if (bigIntTime & LocalMask) {
			if (ticks > TicksCeiling - TicksPerDay) ticks -= TicksCeiling;
			if (ticks < 0) ticks += TicksPerDay;
		}
		const milliseconds = ticks / TicksPerMillisecond - UnixEpoch;
		return Number(milliseconds);
	};
	const dataType = view.getUint8(15);
	let pixelByteSize = 2;
	if (dataType === 1) pixelByteSize = 4;
	const frameSize = 57 + width * height * pixelByteSize;
	const streamSubset = entireFileBuffer.slice(25);
	const frameCount = streamSubset.byteLength / frameSize;
	const output = {};
	const readFrame = (index) => {
		const frameSubsetStart = index * frameSize;
		const frameSubsetEnd = frameSubsetStart + frameSize;
		const frameArrayBuffer = streamSubset.slice(frameSubsetStart, frameSubsetEnd);
		const frameView = new DataView(frameArrayBuffer);
		const timestamp = readTimestamp(frameView, 0);
		const min = frameView.getFloat32(8, true);
		const range = frameView.getFloat32(12, true) - min;
		const pointIndex = 57 + y * pixelByteSize * width + x * pixelByteSize;
		let temperature = 0;
		if (dataType === 1) temperature = frameView.getFloat32(pointIndex, true);
		else if (dataType === 0) temperature = min + range * (frameView.getInt16(pointIndex, true) / 65535);
		return {
			timestamp,
			temperature
		};
	};
	let firstTimestamp = 0;
	for (let i = 0; i < frameCount; i++) {
		const frame = readFrame(i);
		if (firstTimestamp === 0) firstTimestamp = frame.timestamp;
		output[frame.timestamp - firstTimestamp] = frame.temperature;
	}
	return output;
};
//#endregion
//#region src/loading/workers/parsers/lrc/jobs/rectAnalysisData.ts
const rectAnalysisData$1 = async (entireFileBuffer, left, top, _width, _height) => {
	const view = new DataView(entireFileBuffer);
	const fileWidth = view.getUint16(17, true);
	const fileHeight = view.getUint16(19, true);
	const readTimestamp = (readingView, index) => {
		const bigIntTime = readingView.getBigInt64(index, true);
		const UnixEpoch = 62135596800000n;
		const TicksPerMillisecond = 10000n;
		const TicksPerDay = 24n * 60n * 60n * 1000n * TicksPerMillisecond;
		const TicksCeiling = 4611686018427387904n;
		const LocalMask = 9223372036854775808n;
		let ticks = bigIntTime & 4611686018427387903n;
		if (bigIntTime & LocalMask) {
			if (ticks > TicksCeiling - TicksPerDay) ticks -= TicksCeiling;
			if (ticks < 0) ticks += TicksPerDay;
		}
		const milliseconds = ticks / TicksPerMillisecond - UnixEpoch;
		return Number(milliseconds);
	};
	const dataType = view.getUint8(15);
	let pixelByteSize = 2;
	if (dataType === 1) pixelByteSize = 4;
	const frameSize = 57 + fileWidth * fileHeight * pixelByteSize;
	const streamSubset = entireFileBuffer.slice(25);
	const frameCount = streamSubset.byteLength / frameSize;
	const output = {};
	const readFrame = (index) => {
		const frameSubsetStart = index * frameSize;
		const frameSubsetEnd = frameSubsetStart + frameSize;
		const frameArrayBuffer = streamSubset.slice(frameSubsetStart, frameSubsetEnd);
		const frameView = new DataView(frameArrayBuffer);
		const timestamp = readTimestamp(frameView, 0);
		const min = frameView.getFloat32(8, true);
		const range = frameView.getFloat32(12, true) - min;
		const frameHeaderByteSize = 57;
		const fromX = left;
		const toX = left + _width;
		const fromY = top;
		const toY = top + _height;
		let _min = Infinity;
		let _max = -Infinity;
		let count = 0;
		let sum = 0;
		for (let y = fromY; y <= toY; y++) {
			const rowOffset = y * fileWidth;
			for (let x = fromX; x <= toX; x++) {
				const pointIndex = frameHeaderByteSize + (rowOffset + x) * pixelByteSize;
				let value = NaN;
				if (dataType === 1) value = frameView.getFloat32(pointIndex, true);
				else value = min + range * (frameView.getInt16(pointIndex, true) / 65535);
				if (value < _min) _min = value;
				if (value > _max) _max = value;
				sum += value;
				count++;
			}
		}
		return {
			timestamp,
			result: {
				min: _min,
				max: _max,
				avg: sum / count,
				count
			}
		};
	};
	let firstTimestamp = 0;
	for (let i = 0; i < frameCount; i++) {
		const frame = readFrame(i);
		if (firstTimestamp === 0) firstTimestamp = frame.timestamp;
		output[frame.timestamp - firstTimestamp] = frame.result;
	}
	return output;
};
//#endregion
//#region src/loading/workers/parsers/lrc/jobs/histogram.ts
const registryHistogram$1 = async (files) => {
	let pixels = [];
	const readFile = async (file) => {
		const headerView = new DataView(file.slice(0, 25));
		const dataType = headerView.getUint8(15);
		const width = headerView.getUint16(17, true);
		const height = headerView.getUint16(19, true);
		const pixelByteSize = dataType === 1 ? 4 : 2;
		const frameHeaderSize = 57;
		const framePixelsSize = width * height * pixelByteSize;
		const frameSize = frameHeaderSize + framePixelsSize;
		const streamSubset = file.slice(25);
		const frameCount = streamSubset.byteLength / frameSize;
		let filePixels = [];
		for (let i = 0; i < frameCount; i++) {
			const frameStart = i * frameSize;
			const pixelsSubsetStart = frameStart + 57;
			const pixelsSubsetEnd = pixelsSubsetStart + framePixelsSize;
			const pixelsSubset = streamSubset.slice(pixelsSubsetStart, pixelsSubsetEnd);
			if (dataType === 0) {
				const frameHeaderView = new DataView(streamSubset.slice(frameStart, 56));
				const min = frameHeaderView.getFloat32(8, true);
				const max = frameHeaderView.getFloat32(12, true);
				const array = new Uint16Array(pixelsSubset);
				const distance = Math.abs(min - max);
				const UINT16_MAX = 65535;
				array.forEach((pixel) => {
					const mappedValue = pixel / UINT16_MAX;
					filePixels.push(min + distance * mappedValue);
				});
			} else if (dataType === 1) filePixels = filePixels.concat(Array.from(new Float32Array(pixelsSubset)));
		}
		return filePixels;
	};
	(await Promise.all(files.map((file) => readFile(file)))).forEach((fileResult) => {
		pixels = pixels.concat(fileResult);
	});
	pixels.sort((a, b) => {
		return a - b;
	});
	const min = pixels[0];
	const max = pixels[pixels.length - 1];
	const distance = Math.abs(min - max);
	const resolution = 255;
	const step = distance / resolution;
	const bars = [];
	let buf = [...pixels];
	for (let i = 0; i < resolution; i++) {
		const from = min + step * i;
		const to = from + step;
		const nextUpIndex = buf.findIndex((pixel) => pixel > to);
		if (nextUpIndex === 0) {
			const bar = {
				from,
				to,
				count: 0,
				percentage: 0
			};
			bars.push(bar);
		} else {
			const count = buf.slice(0, nextUpIndex - 1).length;
			const bar = {
				from,
				to,
				count,
				percentage: count / pixels.length * 100
			};
			bars.push(bar);
			buf = buf.slice(nextUpIndex);
		}
	}
	const sortedByPercentage = [...bars].sort((a, b) => {
		return a.percentage - b.percentage;
	});
	const minPercent = sortedByPercentage[0].percentage;
	const maxPercent = sortedByPercentage[sortedByPercentage.length - 1].percentage;
	const percentDistance = Math.abs(minPercent - maxPercent);
	return bars.map((bar) => {
		return {
			...bar,
			height: bar.percentage / percentDistance * 100
		};
	});
};
//#endregion
//#region src/loading/workers/parsers/lrc/jobs/is.ts
const is$1 = (data, url) => {
	const hasCorrectExtension = url.endsWith("lrc");
	const hasCorrectSignature = new TextDecoder().decode(data.slice(0, 4)) === "LRC\0";
	return hasCorrectExtension && hasCorrectSignature;
};
//#endregion
//#region src/loading/workers/parsers/lrc/jobs/ellipsisAnalysisData.ts
const ellipsisAnalysisData$1 = async (entireFileBuffer, left, top, _width, _height) => {
	const view = new DataView(entireFileBuffer);
	const fileWidth = view.getUint16(17, true);
	const fileHeight = view.getUint16(19, true);
	const readTimestamp = (readingView, index) => {
		const bigIntTime = readingView.getBigInt64(index, true);
		const UnixEpoch = 62135596800000n;
		const TicksPerMillisecond = 10000n;
		const TicksPerDay = 24n * 60n * 60n * 1000n * TicksPerMillisecond;
		const TicksCeiling = 4611686018427387904n;
		const LocalMask = 9223372036854775808n;
		let ticks = bigIntTime & 4611686018427387903n;
		if (bigIntTime & LocalMask) {
			if (ticks > TicksCeiling - TicksPerDay) ticks -= TicksCeiling;
			if (ticks < 0) ticks += TicksPerDay;
		}
		const milliseconds = ticks / TicksPerMillisecond - UnixEpoch;
		return Number(milliseconds);
	};
	const dataType = view.getUint8(15);
	let pixelByteSize = 2;
	if (dataType === 1) pixelByteSize = 4;
	const frameSize = 57 + fileWidth * fileHeight * pixelByteSize;
	const streamSubset = entireFileBuffer.slice(25);
	const frameCount = streamSubset.byteLength / frameSize;
	const output = {};
	const isWithin = (x, y) => {
		const centerX = left + _width / 2;
		const centerY = top + _height / 2;
		const normalizedX = (x - centerX) / (_width / 2);
		const normalizedY = (y - centerY) / (_height / 2);
		return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
	};
	const readFrame = (index) => {
		const frameSubsetStart = index * frameSize;
		const frameSubsetEnd = frameSubsetStart + frameSize;
		const frameArrayBuffer = streamSubset.slice(frameSubsetStart, frameSubsetEnd);
		const frameView = new DataView(frameArrayBuffer);
		const timestamp = readTimestamp(frameView, 0);
		const min = frameView.getFloat32(8, true);
		const range = frameView.getFloat32(12, true) - min;
		const frameHeaderByteSize = 57;
		const fromX = left;
		const toX = left + _width;
		const fromY = top;
		const toY = top + _height;
		let _min = Infinity;
		let _max = -Infinity;
		let count = 0;
		let sum = 0;
		for (let y = fromY; y <= toY; y++) {
			const rowOffset = y * fileWidth;
			for (let x = fromX; x <= toX; x++) if (isWithin(x, y)) {
				const pointIndex = frameHeaderByteSize + (rowOffset + x) * pixelByteSize;
				let value = NaN;
				if (dataType === 1) value = frameView.getFloat32(pointIndex, true);
				else value = min + range * (frameView.getInt16(pointIndex, true) / 65535);
				if (value < _min) _min = value;
				if (value > _max) _max = value;
				sum += value;
				count++;
			}
		}
		return {
			timestamp,
			result: {
				min: _min,
				max: _max,
				avg: sum / count,
				count
			}
		};
	};
	let firstTimestamp = 0;
	for (let i = 0; i < frameCount; i++) {
		const frame = readFrame(i);
		if (firstTimestamp === 0) firstTimestamp = frame.timestamp;
		output[frame.timestamp - firstTimestamp] = frame.result;
	}
	return output;
};
//#endregion
//#region src/loading/workers/parsers/lrc/jobs/histogramPixels.ts
/**
* All temperatures of all frames as one array.
* **Must stay self-contained, it is executed in a worker.**
*/
const histogramPixels$1 = async (file) => {
	const headerView = new DataView(file, 0, 25);
	const dataType = headerView.getUint8(15);
	const pixelCount = headerView.getUint16(17, true) * headerView.getUint16(19, true);
	const pixelByteSize = dataType === 1 ? 4 : 2;
	const frameHeaderSize = 57;
	const frameSize = frameHeaderSize + pixelCount * pixelByteSize;
	const frameCount = Math.floor((file.byteLength - 25) / frameSize);
	const output = new Float32Array(frameCount * pixelCount);
	for (let frame = 0; frame < frameCount; frame++) {
		const frameStart = 25 + frame * frameSize;
		const pixelsStart = frameStart + frameHeaderSize;
		if (dataType === 1) output.set(new Float32Array(file.slice(pixelsStart, pixelsStart + pixelCount * 4)), frame * pixelCount);
		else if (dataType === 0) {
			const frameView = new DataView(file, frameStart, frameHeaderSize);
			const min = frameView.getFloat32(8, true);
			const max = frameView.getFloat32(12, true);
			const distance = Math.abs(min - max);
			const values = new Uint16Array(file.slice(pixelsStart, pixelsStart + pixelCount * 2));
			for (let index = 0; index < pixelCount; index++) output[frame * pixelCount + index] = min + distance * (values[index] / 65535);
		} else output.fill(NaN, frame * pixelCount, (frame + 1) * pixelCount);
	}
	return output;
};
const LrcParser = Object.freeze({
	name: "LabIR Recording (.lrc)",
	description: "Radiometric data developed by the Infrared Technologies research team at the University of West Bohemia in Pilsen (CZ)",
	devices: [{
		deviceName: "TIMI Edu Infrared Camera",
		deviceUrl: "https://edu.labir.cz",
		deviceDescription: "A thermal camera designed for school education.",
		manufacturer: "TIMI Creation, s.r.o.",
		manufacturerUrl: "https://timic.cz"
	}, {
		deviceName: "Custom measurement systems by IRT UWB in Pilsen (CZ)",
		deviceUrl: "https://irt.zcu.cz",
		deviceDescription: "Specialised applications of IR diagnostics in the field of industry, research, medicine, security or education.",
		manufacturer: "IRT UWB in Pilsen (CZ)",
		manufacturerUrl: "https://irt.zcu.cz"
	}],
	extensions: [{
		extension: "lrc",
		minme: "application/octet-stream"
	}],
	is: is$1,
	baseInfo: baseInfo$1,
	getFrameSubset: getFrameSubset$1,
	frameData: frameData$1,
	registryHistogram: registryHistogram$1,
	histogramPixels: histogramPixels$1,
	pointAnalysisData: pointAnalysisData$1,
	rectAnalysisData: rectAnalysisData$1,
	ellipsisAnalysisData: ellipsisAnalysisData$1
});
//#endregion
//#region src/loading/workers/parsers/flir/jobs/analysisData.ts
const pointAnalysisData = async (workingBuffer, x, y) => {
	const view = new DataView(workingBuffer);
	const width = view.getUint16(10, true);
	const height = view.getUint16(12, true);
	const isInside = Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0 && x < width && y < height;
	const output = {};
	output[0] = isInside ? new Float32Array(workingBuffer, 64, width * height)[y * width + x] : NaN;
	return output;
};
const rectAnalysisData = async (workingBuffer, left, top, areaWidth, areaHeight) => {
	const view = new DataView(workingBuffer);
	const width = view.getUint16(10, true);
	const height = view.getUint16(12, true);
	const pixels = new Float32Array(workingBuffer, 64, width * height);
	const fromX = Math.max(0, Math.ceil(left));
	const toX = Math.min(width - 1, Math.floor(left + areaWidth));
	const fromY = Math.max(0, Math.ceil(top));
	const toY = Math.min(height - 1, Math.floor(top + areaHeight));
	let min = Infinity;
	let max = -Infinity;
	let sum = 0;
	let count = 0;
	for (let y = fromY; y <= toY; y++) {
		const rowOffset = y * width;
		for (let x = fromX; x <= toX; x++) {
			const value = pixels[rowOffset + x];
			if (value < min) min = value;
			if (value > max) max = value;
			sum += value;
			count++;
		}
	}
	const output = {};
	output[0] = {
		min,
		max,
		avg: sum / count,
		count
	};
	return output;
};
const ellipsisAnalysisData = async (workingBuffer, left, top, areaWidth, areaHeight) => {
	const view = new DataView(workingBuffer);
	const width = view.getUint16(10, true);
	const height = view.getUint16(12, true);
	const pixels = new Float32Array(workingBuffer, 64, width * height);
	const centerX = left + areaWidth / 2;
	const centerY = top + areaHeight / 2;
	const radiusX = areaWidth / 2;
	const radiusY = areaHeight / 2;
	const fromX = Math.max(0, Math.ceil(left));
	const toX = Math.min(width - 1, Math.floor(left + areaWidth));
	const fromY = Math.max(0, Math.ceil(top));
	const toY = Math.min(height - 1, Math.floor(top + areaHeight));
	let min = Infinity;
	let max = -Infinity;
	let sum = 0;
	let count = 0;
	for (let y = fromY; y <= toY; y++) {
		const rowOffset = y * width;
		const normalizedY = (y - centerY) / radiusY;
		for (let x = fromX; x <= toX; x++) {
			const normalizedX = (x - centerX) / radiusX;
			if (normalizedX * normalizedX + normalizedY * normalizedY <= 1) {
				const value = pixels[rowOffset + x];
				if (value < min) min = value;
				if (value > max) max = value;
				sum += value;
				count++;
			}
		}
	}
	const output = {};
	output[0] = {
		min,
		max,
		avg: sum / count,
		count
	};
	return output;
};
//#endregion
//#region src/loading/workers/parsers/flir/jobs/baseInfo.ts
/**
* Reads the working buffer header.
* **Must stay self-contained, it is executed in a worker.**
*/
const baseInfo = async (workingBuffer) => {
	const view = new DataView(workingBuffer);
	const timestamp = view.getFloat64(16, true);
	return {
		width: view.getUint16(10, true),
		height: view.getUint16(12, true),
		timestamp,
		bytesize: view.getFloat64(24, true),
		frameCount: 1,
		duration: 0,
		frameInterval: 0,
		fps: Infinity,
		timeline: [{
			index: 0,
			absolute: timestamp,
			relative: 0,
			offset: 0
		}],
		min: view.getFloat32(32, true),
		max: view.getFloat32(36, true),
		averageEmissivity: view.getFloat32(40, true),
		averageReflectedKelvins: view.getFloat32(44, true)
	};
};
//#endregion
//#region src/loading/workers/parsers/flir/jobs/frameData.ts
/** A FLIR JPEG has one frame only, the subset is a copy of the working buffer. */
const getFrameSubset = (workingBuffer) => {
	return {
		array: workingBuffer.slice(0),
		dataType: 0
	};
};
/**
* **Must stay self-contained, it may be executed in a worker.**
*/
const frameData = async (frameSubset) => {
	const view = new DataView(frameSubset);
	const width = view.getUint16(10, true);
	const height = view.getUint16(12, true);
	return {
		timestamp: view.getFloat64(16, true),
		min: view.getFloat32(32, true),
		max: view.getFloat32(36, true),
		emissivity: view.getFloat32(40, true),
		reflectedKelvins: view.getFloat32(44, true),
		pixels: Array.from(new Float32Array(frameSubset, 64, width * height))
	};
};
//#endregion
//#region src/loading/workers/parsers/histogramFromPixels.ts
/**
* Build a histogram over several pixel sets in one shared temperature range
* and with shared bins, so that files of different formats are comparable.
*
* Linear complexity, no sorting. The output shape is the same as the one
* produced by `LrcParser.registryHistogram`.
*
* **Must stay self-contained, it is executed in a worker.**
*/
const histogramFromPixels = async (pixelSets) => {
	const resolution = 255;
	let min = Infinity;
	let max = -Infinity;
	let total = 0;
	for (const pixels of pixelSets) for (let index = 0; index < pixels.length; index++) {
		const value = pixels[index];
		if (!Number.isFinite(value)) continue;
		if (value < min) min = value;
		if (value > max) max = value;
		total++;
	}
	if (total === 0) return [];
	const distance = max - min;
	const step = distance / resolution;
	const counts = new Array(resolution).fill(0);
	for (const pixels of pixelSets) for (let index = 0; index < pixels.length; index++) {
		const value = pixels[index];
		if (!Number.isFinite(value)) continue;
		const bin = distance === 0 ? 0 : Math.min(254, Math.floor((value - min) / step));
		counts[bin]++;
	}
	const bars = counts.map((count, index) => {
		const from = min + step * index;
		return {
			from,
			to: from + step,
			count,
			percentage: count / total * 100
		};
	});
	let minPercentage = Infinity;
	let maxPercentage = -Infinity;
	for (const bar of bars) {
		if (bar.percentage < minPercentage) minPercentage = bar.percentage;
		if (bar.percentage > maxPercentage) maxPercentage = bar.percentage;
	}
	const percentageDistance = maxPercentage - minPercentage;
	return bars.map((bar) => ({
		...bar,
		height: percentageDistance === 0 ? 100 : bar.percentage / percentageDistance * 100
	}));
};
//#endregion
//#region src/loading/workers/parsers/flir/jobs/histogram.ts
/**
* Copy of the temperatures for histogram calculation.
* **Must stay self-contained, it is executed in a worker.**
*/
const histogramPixels = async (workingBuffer) => {
	const view = new DataView(workingBuffer);
	const width = view.getUint16(10, true);
	const height = view.getUint16(12, true);
	return new Float32Array(workingBuffer.slice(64, 64 + width * height * 4));
};
/**
* Histogram of FLIR working buffers.
*
* Composed of other jobs and therefore **not** serialisable into a worker.
* `HistogramState` runs `histogramPixels` and `histogramFromPixels` in the pool separately.
*/
const registryHistogram = async (files) => {
	const pixelSets = await Promise.all(files.map((file) => histogramPixels(file)));
	return histogramFromPixels(pixelSets);
};
//#endregion
//#region src/loading/workers/parsers/flir/decoder/FlirDecodingError.ts
/** Raised whenever a FLIR JPEG cannot be decoded into a valid temperature raster. */
var FlirDecodingError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "FlirDecodingError";
	}
};
const requireFlir = (condition, message) => {
	if (!condition) throw new FlirDecodingError(message);
};
//#endregion
//#region src/loading/workers/parsers/flir/decoder/jpeg.ts
const SOI = 216;
const SOS = 218;
const EOI = 217;
const APP1 = 225;
/** APP1 payload signature `FLIR\0` */
const FLIR_SIGNATURE = [
	70,
	76,
	73,
	82,
	0
];
/** Signature (5 B) + format byte + chunk index + last chunk index */
const FLIR_CHUNK_HEADER_SIZE = 8;
const isJpeg = (bytes) => bytes.length >= 4 && bytes[0] === 255 && bytes[1] === SOI;
const hasFlirSignature = (bytes, start, length) => {
	if (length < FLIR_CHUNK_HEADER_SIZE) return false;
	return FLIR_SIGNATURE.every((value, index) => bytes[start + index] === value);
};
/**
* Iterate the header segments of a JPEG until the image data starts.
* Returns `false` when the marker structure is broken.
*/
const forEachHeaderSegment = (bytes, callback) => {
	let position = 2;
	while (position < bytes.length) {
		if (bytes[position] !== 255) return false;
		while (position < bytes.length && bytes[position] === 255) position++;
		if (position >= bytes.length) return false;
		const marker = bytes[position];
		position++;
		if (marker === SOS || marker === EOI) return true;
		if (marker >= 208 && marker <= 215 || marker === 1) continue;
		if (position + 2 > bytes.length) return false;
		const size = bytes[position] << 8 | bytes[position + 1];
		if (size < 2 || position + size > bytes.length) return false;
		if (callback({
			marker,
			start: position + 2,
			length: size - 2
		}) === true) return true;
		position += size;
	}
	return true;
};
/** Quick content check: is this a JPEG with at least one FLIR APP1 segment? */
const hasFlirSegment = (buffer) => {
	const bytes = new Uint8Array(buffer);
	if (!isJpeg(bytes)) return false;
	let found = false;
	forEachHeaderSegment(bytes, (segment) => {
		if (segment.marker === APP1 && hasFlirSignature(bytes, segment.start, segment.length)) {
			found = true;
			return true;
		}
	});
	return found;
};
/**
* Join the numbered FLIR APP1 chunks into one FFF/AFF container.
* @throws FlirDecodingError
*/
const extractFlirContainer = (buffer) => {
	const bytes = new Uint8Array(buffer);
	requireFlir(isJpeg(bytes), "The file is not a JPEG.");
	const chunks = /* @__PURE__ */ new Map();
	let lastIndex;
	const isValid = forEachHeaderSegment(bytes, (segment) => {
		if (segment.marker !== APP1 || !hasFlirSignature(bytes, segment.start, segment.length)) return;
		const index = bytes[segment.start + 6];
		const last = bytes[segment.start + 7];
		requireFlir(!chunks.has(index), `Duplicate FLIR APP1 chunk ${index}.`);
		requireFlir(lastIndex === void 0 || lastIndex === last, "Inconsistent FLIR APP1 chunk count.");
		lastIndex = last;
		chunks.set(index, bytes.subarray(segment.start + FLIR_CHUNK_HEADER_SIZE, segment.start + segment.length));
	});
	requireFlir(isValid, "Broken JPEG marker structure.");
	requireFlir(lastIndex !== void 0, "The JPEG does not contain FLIR radiometric data.");
	let totalLength = 0;
	for (let index = 0; index <= lastIndex; index++) {
		const chunk = chunks.get(index);
		requireFlir(chunk !== void 0, `Missing FLIR APP1 chunk ${index} of ${lastIndex + 1}.`);
		totalLength += chunk.length;
	}
	const container = new Uint8Array(totalLength);
	let offset = 0;
	for (let index = 0; index <= lastIndex; index++) {
		const chunk = chunks.get(index);
		container.set(chunk, offset);
		offset += chunk.length;
	}
	return container;
};
//#endregion
//#region src/loading/workers/parsers/flir/jobs/is.ts
/** Detects radiometric FLIR JPEGs by content, regardless of the file extension. */
const is = (buffer) => hasFlirSegment(buffer);
//#endregion
//#region src/loading/workers/parsers/flir/decoder/fff.ts
const DIRECTORY_OFFSET = 24;
const DIRECTORY_COUNT = 28;
const FFF_HEADER_SIZE = 64;
const ENTRY_SIZE = 32;
const MAX_ENTRIES = 1e4;
/**
* Read the record directory of a FLIR FFF/AFF container.
*
* The directory byte order is not declared explicitly. Most cameras use
* big-endian, but e.g. DJI Zenmuse XT uses little-endian, so the only
* plausible interpretation is selected.
*
* @throws FlirDecodingError
*/
const readFffRecords = (container) => {
	requireFlir(container.length >= FFF_HEADER_SIZE, "The FLIR container is truncated.");
	const signature = String.fromCharCode(...container.subarray(0, 4));
	requireFlir(signature === "FFF\0" || signature === "AFF\0", "Invalid FLIR container signature.");
	const view = new DataView(container.buffer, container.byteOffset, container.byteLength);
	const candidates = [false, true].map((littleEndian) => ({
		littleEndian,
		offset: view.getUint32(DIRECTORY_OFFSET, littleEndian),
		count: view.getUint32(DIRECTORY_COUNT, littleEndian)
	})).filter((candidate) => candidate.offset >= FFF_HEADER_SIZE && candidate.count > 0 && candidate.count < MAX_ENTRIES && candidate.offset + candidate.count * ENTRY_SIZE <= container.length);
	requireFlir(candidates.length === 1, "Unable to determine the FLIR record directory.");
	const { littleEndian, offset, count } = candidates[0];
	const records = /* @__PURE__ */ new Map();
	for (let index = 0; index < count; index++) {
		const entry = offset + index * ENTRY_SIZE;
		const type = view.getUint16(entry, littleEndian);
		if (type === 0) continue;
		const subtype = view.getUint16(entry + 2, littleEndian);
		const start = view.getUint32(entry + 12, littleEndian);
		const length = view.getUint32(entry + 16, littleEndian);
		requireFlir(start + length <= container.length, `FLIR record 0x${type.toString(16)} is outside the container.`);
		requireFlir(!records.has(type), `Duplicate FLIR record 0x${type.toString(16)}.`);
		records.set(type, {
			type,
			subtype,
			data: container.subarray(start, start + length)
		});
	}
	return records;
};
/**
* FLIR records start with a 16-bit value `2` in their own byte order.
* @returns `true` for little-endian records
* @throws FlirDecodingError
*/
const detectRecordByteOrder = (data, recordName) => {
	requireFlir(data.length >= 2, `The FLIR ${recordName} record is truncated.`);
	const isLittleEndian = data[0] === 2 && data[1] === 0;
	const isBigEndian = data[0] === 0 && data[1] === 2;
	requireFlir(isLittleEndian || isBigEndian, `Unknown byte order of the FLIR ${recordName} record.`);
	return isLittleEndian;
};
//#endregion
//#region src/loading/workers/parsers/flir/decoder/cameraInfo.ts
const OFFSETS = {
	emissivity: 32,
	objectDistance: 36,
	reflectedKelvins: 40,
	atmosphericKelvins: 44,
	irWindowKelvins: 48,
	irWindowTransmission: 52,
	relativeHumidity: 60,
	planckR1: 88,
	planckB: 92,
	planckF: 96,
	atmosphericTransAlpha1: 112,
	atmosphericTransAlpha2: 116,
	atmosphericTransBeta1: 120,
	atmosphericTransBeta2: 124,
	atmosphericTransX: 128,
	planckO: 776,
	planckR2: 780,
	dateTimeSeconds: 900,
	dateTimeMilliseconds: 904,
	dateTimeZone: 908
};
const MIN_LENGTH = OFFSETS.dateTimeZone + 2;
/**
* Read the radiometric parameters and the capture time from the CameraInfo record.
* @throws FlirDecodingError
*/
const readCameraInfo = (record) => {
	const data = record.data;
	requireFlir(data.length >= MIN_LENGTH, "The FLIR camera info record is truncated.");
	const littleEndian = detectRecordByteOrder(data, "camera info");
	const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	const float = (offset) => view.getFloat32(offset, littleEndian);
	const humidity = float(OFFSETS.relativeHumidity);
	const seconds = view.getUint32(OFFSETS.dateTimeSeconds, littleEndian);
	const milliseconds = view.getUint32(OFFSETS.dateTimeMilliseconds, littleEndian);
	return {
		emissivity: float(OFFSETS.emissivity),
		objectDistance: float(OFFSETS.objectDistance),
		reflectedKelvins: float(OFFSETS.reflectedKelvins),
		atmosphericKelvins: float(OFFSETS.atmosphericKelvins),
		irWindowKelvins: float(OFFSETS.irWindowKelvins),
		irWindowTransmission: float(OFFSETS.irWindowTransmission),
		relativeHumidity: humidity > 1 ? humidity / 100 : humidity,
		planckR1: float(OFFSETS.planckR1),
		planckB: float(OFFSETS.planckB),
		planckF: float(OFFSETS.planckF),
		planckO: view.getInt32(OFFSETS.planckO, littleEndian),
		planckR2: float(OFFSETS.planckR2),
		atmosphericTransAlpha1: float(OFFSETS.atmosphericTransAlpha1),
		atmosphericTransAlpha2: float(OFFSETS.atmosphericTransAlpha2),
		atmosphericTransBeta1: float(OFFSETS.atmosphericTransBeta1),
		atmosphericTransBeta2: float(OFFSETS.atmosphericTransBeta2),
		atmosphericTransX: float(OFFSETS.atmosphericTransX),
		timestamp: seconds * 1e3 + (milliseconds < 1e3 ? milliseconds : 0),
		timezoneOffset: view.getInt16(OFFSETS.dateTimeZone, littleEndian)
	};
};
//#endregion
//#region src/loading/workers/parsers/flir/decoder/radiometry.ts
/**
* Convert detector counts into object temperatures in °C.
*
* Uses the commonly published FLIR radiometric model: the counts are
* corrected for the reflected radiation, the atmosphere (two-band
* transmission model) and an optional IR window, then the Planck curve
* calibrated by R1, R2, B, F and O is inverted.
*
* Because the input are 16-bit integers, the conversion is computed only
* once for every distinct count within the measured range.
*
* @throws FlirDecodingError when the parameters or the results are not physically valid
*/
const computeTemperatures = (counts, camera) => {
	const { emissivity, objectDistance, reflectedKelvins, atmosphericKelvins, irWindowKelvins, irWindowTransmission, relativeHumidity, planckR1, planckR2, planckB, planckF, planckO, atmosphericTransAlpha1, atmosphericTransAlpha2, atmosphericTransBeta1, atmosphericTransBeta2, atmosphericTransX } = camera;
	const parameters = Object.values(camera);
	requireFlir(parameters.every((value) => Number.isFinite(value)), "The FLIR calibration parameters are not finite.");
	requireFlir(emissivity > 0 && emissivity <= 1, `Invalid emissivity ${emissivity}.`);
	requireFlir(irWindowTransmission > 0 && irWindowTransmission <= 1, `Invalid IR window transmission ${irWindowTransmission}.`);
	requireFlir(objectDistance >= 0, `Invalid object distance ${objectDistance}.`);
	requireFlir(planckR1 !== 0 && planckR2 !== 0 && planckB > 0, "Invalid Planck constants.");
	requireFlir(reflectedKelvins > 0 && atmosphericKelvins > 0 && irWindowKelvins > 0, "Invalid reference temperatures.");
	const ambientCelsius = atmosphericKelvins - 273.15;
	const waterVapour = relativeHumidity * Math.exp(1.5587 + .06939 * ambientCelsius - 27816e-8 * ambientCelsius ** 2 + 6.8455e-7 * ambientCelsius ** 3);
	const halfDistance = Math.sqrt(objectDistance / 2);
	const sqrtWater = Math.sqrt(waterVapour);
	const tau = atmosphericTransX * Math.exp(-halfDistance * (atmosphericTransAlpha1 + atmosphericTransBeta1 * sqrtWater)) + (1 - atmosphericTransX) * Math.exp(-halfDistance * (atmosphericTransAlpha2 + atmosphericTransBeta2 * sqrtWater));
	requireFlir(tau > 0 && Number.isFinite(tau), "Invalid atmospheric transmission.");
	const radiance = (kelvins) => planckR1 / (planckR2 * (Math.exp(planckB / kelvins) - planckF)) - planckO;
	const attenuation = (1 - emissivity) / emissivity * radiance(reflectedKelvins) + (1 - tau) / (emissivity * tau) * radiance(atmosphericKelvins) + (1 - irWindowTransmission) / (emissivity * tau * irWindowTransmission) * radiance(irWindowKelvins) + (1 - tau) / (emissivity * tau * irWindowTransmission * tau) * radiance(atmosphericKelvins);
	const gain = emissivity * tau * irWindowTransmission * tau;
	let minCount = 65535;
	let maxCount = 0;
	for (let index = 0; index < counts.length; index++) {
		const count = counts[index];
		if (count < minCount) minCount = count;
		if (count > maxCount) maxCount = count;
	}
	const lookup = new Float64Array(maxCount - minCount + 1);
	for (let count = minCount; count <= maxCount; count++) {
		const objectSignal = count / gain - attenuation + planckO;
		const kelvins = planckB / Math.log(planckR1 / (planckR2 * objectSignal) + planckF);
		lookup[count - minCount] = kelvins - 273.15;
	}
	const celsius = new Float32Array(counts.length);
	let min = Infinity;
	let max = -Infinity;
	for (let index = 0; index < counts.length; index++) {
		const value = lookup[counts[index] - minCount];
		requireFlir(Number.isFinite(value) && value > -273.15, "The FLIR raw data produced an invalid temperature.");
		celsius[index] = value;
		const stored = celsius[index];
		if (stored < min) min = stored;
		if (stored > max) max = stored;
	}
	return {
		celsius,
		min,
		max
	};
};
//#endregion
//#region src/loading/workers/parsers/flir/decoder/rawData.ts
const RAW_HEADER_SIZE = 32;
const MAX_DIMENSION = 8192;
const PNG_SIGNATURE = [
	137,
	80,
	78,
	71,
	13,
	10,
	26,
	10
];
const isPng = (data) => data.length > PNG_SIGNATURE.length && PNG_SIGNATURE.every((value, index) => data[index] === value);
/**
* Inflate zlib data using the native streaming API (browsers, workers, Node 18+).
* @throws FlirDecodingError
*/
const inflate = async (data) => {
	requireFlir(typeof DecompressionStream !== "undefined", "This environment cannot decompress FLIR PNG data.");
	try {
		const reader = new ReadableStream({ start(controller) {
			controller.enqueue(data);
			controller.close();
		} }).pipeThrough(new DecompressionStream("deflate")).getReader();
		const parts = [];
		let length = 0;
		for (let chunk = await reader.read(); !chunk.done; chunk = await reader.read()) {
			parts.push(chunk.value);
			length += chunk.value.length;
		}
		const result = new Uint8Array(length);
		let offset = 0;
		for (const part of parts) {
			result.set(part, offset);
			offset += part.length;
		}
		return result;
	} catch (error) {
		throw new FlirDecodingError(`Invalid compressed FLIR PNG data: ${error.message}`);
	}
};
/**
* Decode the 16-bit grayscale PNG embedded by newer FLIR cameras.
*
* FLIR writes the detector counts little-endian although PNG specifies
* big-endian samples, so each sample is byte-swapped while unfiltering.
*
* @throws FlirDecodingError
*/
const decodeFlirPng = async (data, expectedWidth, expectedHeight) => {
	const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	const compressedParts = [];
	let compressedLength = 0;
	let width = 0;
	let height = 0;
	let hasHeader = false;
	let position = PNG_SIGNATURE.length;
	while (position + 8 <= data.length) {
		const length = view.getUint32(position);
		const type = String.fromCharCode(...data.subarray(position + 4, position + 8));
		const bodyStart = position + 8;
		const bodyEnd = bodyStart + length;
		requireFlir(bodyEnd + 4 <= data.length, `Truncated PNG chunk ${type}.`);
		if (type === "IHDR") {
			requireFlir(length === 13, "Invalid PNG header.");
			width = view.getUint32(bodyStart);
			height = view.getUint32(bodyStart + 4);
			const bitDepth = data[bodyStart + 8];
			const colorType = data[bodyStart + 9];
			const interlace = data[bodyStart + 12];
			requireFlir(bitDepth === 16 && colorType === 0 && interlace === 0, "Unsupported FLIR PNG format (expected 16-bit grayscale).");
			hasHeader = true;
		} else if (type === "IDAT") {
			compressedParts.push(data.subarray(bodyStart, bodyEnd));
			compressedLength += length;
		} else if (type === "IEND") break;
		position = bodyEnd + 4;
	}
	requireFlir(hasHeader, "Missing PNG header.");
	requireFlir(width === expectedWidth && height === expectedHeight, "PNG dimensions do not match the FLIR raw data header.");
	requireFlir(compressedLength > 0, "Missing PNG image data.");
	const compressed = new Uint8Array(compressedLength);
	let offset = 0;
	for (const part of compressedParts) {
		compressed.set(part, offset);
		offset += part.length;
	}
	const inflated = await inflate(compressed);
	const bytesPerPixel = 2;
	const stride = width * bytesPerPixel;
	requireFlir(inflated.length === (stride + 1) * height, "Unexpected size of the decompressed PNG data.");
	const counts = new Uint16Array(width * height);
	let previous = new Uint8Array(stride);
	let current = new Uint8Array(stride);
	for (let y = 0; y < height; y++) {
		const rowStart = y * (stride + 1);
		const filter = inflated[rowStart];
		requireFlir(filter <= 4, `Invalid PNG filter ${filter}.`);
		for (let x = 0; x < stride; x++) {
			const left = x >= bytesPerPixel ? current[x - bytesPerPixel] : 0;
			const up = previous[x];
			const diagonal = x >= bytesPerPixel ? previous[x - bytesPerPixel] : 0;
			let predictor = 0;
			if (filter === 1) predictor = left;
			else if (filter === 2) predictor = up;
			else if (filter === 3) predictor = left + up >> 1;
			else if (filter === 4) {
				const estimate = left + up - diagonal;
				const toLeft = Math.abs(estimate - left);
				const toUp = Math.abs(estimate - up);
				const toDiagonal = Math.abs(estimate - diagonal);
				predictor = toLeft <= toUp && toLeft <= toDiagonal ? left : toUp <= toDiagonal ? up : diagonal;
			}
			current[x] = inflated[rowStart + 1 + x] + predictor & 255;
		}
		const rowOffset = y * width;
		for (let x = 0; x < width; x++) counts[rowOffset + x] = current[2 * x] | current[2 * x + 1] << 8;
		const swap = previous;
		previous = current;
		current = swap;
	}
	return counts;
};
/**
* Decode the FLIR RawData record into detector counts.
* @throws FlirDecodingError
*/
const decodeRawData = async (record) => {
	const data = record.data;
	requireFlir(data.length > RAW_HEADER_SIZE, "The FLIR raw data record is truncated.");
	const littleEndian = detectRecordByteOrder(data, "raw data");
	const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
	const width = view.getUint16(2, littleEndian);
	const height = view.getUint16(4, littleEndian);
	requireFlir(width > 0 && height > 0 && width <= MAX_DIMENSION && height <= MAX_DIMENSION, `Invalid FLIR raw image dimensions ${width}x${height}.`);
	const payload = data.subarray(RAW_HEADER_SIZE);
	if (isPng(payload)) return {
		width,
		height,
		encoding: "PNG16",
		counts: await decodeFlirPng(payload, width, height)
	};
	const pixelCount = width * height;
	requireFlir(payload.length >= pixelCount * 2, "The FLIR raw image is truncated.");
	const counts = new Uint16Array(pixelCount);
	const payloadView = new DataView(payload.buffer, payload.byteOffset, pixelCount * 2);
	for (let index = 0; index < pixelCount; index++) counts[index] = payloadView.getUint16(index * 2, littleEndian);
	return {
		width,
		height,
		encoding: "RAW16",
		counts
	};
};
//#endregion
//#region src/loading/workers/parsers/flir/decoder/workingBuffer.ts
/**
* Layout of the decoded working buffer used by `FlirParser` jobs.
*
* The original JPEG is decoded only once while loading. All subsequent
* parser jobs (that may run in workers and therefore cannot import
* anything) read this simple little-endian layout.
*
* **Keep in sync with the inlined constants in `../jobs/*`.**
*/
const FLIR_WORKING_BUFFER = {
	MAGIC: "FLIRTEMP",
	VERSION: 1,
	OFFSET_VERSION: 8,
	OFFSET_WIDTH: 10,
	OFFSET_HEIGHT: 12,
	OFFSET_TIMEZONE: 14,
	OFFSET_TIMESTAMP: 16,
	OFFSET_BYTESIZE: 24,
	OFFSET_MIN: 32,
	OFFSET_MAX: 36,
	OFFSET_EMISSIVITY: 40,
	OFFSET_REFLECTED: 44,
	OFFSET_ENCODING: 48,
	HEADER_SIZE: 64
};
const createWorkingBuffer = (width, height, encoding, camera, temperatures, originalByteSize) => {
	const L = FLIR_WORKING_BUFFER;
	const buffer = new ArrayBuffer(L.HEADER_SIZE + width * height * 4);
	const view = new DataView(buffer);
	for (let index = 0; index < L.MAGIC.length; index++) view.setUint8(index, L.MAGIC.charCodeAt(index));
	view.setUint16(L.OFFSET_VERSION, L.VERSION, true);
	view.setUint16(L.OFFSET_WIDTH, width, true);
	view.setUint16(L.OFFSET_HEIGHT, height, true);
	view.setInt16(L.OFFSET_TIMEZONE, camera.timezoneOffset, true);
	view.setFloat64(L.OFFSET_TIMESTAMP, camera.timestamp, true);
	view.setFloat64(L.OFFSET_BYTESIZE, originalByteSize, true);
	view.setFloat32(L.OFFSET_MIN, temperatures.min, true);
	view.setFloat32(L.OFFSET_MAX, temperatures.max, true);
	view.setFloat32(L.OFFSET_EMISSIVITY, camera.emissivity, true);
	view.setFloat32(L.OFFSET_REFLECTED, camera.reflectedKelvins, true);
	view.setUint8(L.OFFSET_ENCODING, encoding === "PNG16" ? 1 : 0);
	new Float32Array(buffer, L.HEADER_SIZE, width * height).set(temperatures.celsius);
	return buffer;
};
//#endregion
//#region src/loading/workers/parsers/flir/decoder/decodeFlirJpeg.ts
/**
* Decode a radiometric FLIR JPEG into a temperature raster.
* @throws FlirDecodingError
*/
const decodeFlirJpeg = async (buffer) => {
	const container = extractFlirContainer(buffer);
	const records = readFffRecords(container);
	const rawRecord = records.get(1);
	const cameraRecord = records.get(32);
	requireFlir(rawRecord !== void 0, "The FLIR data do not contain a raw thermal image.");
	requireFlir(cameraRecord !== void 0, "The FLIR data do not contain calibration parameters.");
	const camera = readCameraInfo(cameraRecord);
	const raw = await decodeRawData(rawRecord);
	const temperatures = computeTemperatures(raw.counts, camera);
	return {
		width: raw.width,
		height: raw.height,
		encoding: raw.encoding,
		camera,
		temperatures
	};
};
/**
* Decode a FLIR JPEG into the working buffer read by `FlirParser` jobs.
* @throws FlirDecodingError
*/
const prepareFlirWorkingBuffer = async (buffer) => {
	const decoded = await decodeFlirJpeg(buffer);
	return createWorkingBuffer(decoded.width, decoded.height, decoded.encoding, decoded.camera, decoded.temperatures, buffer.byteLength);
};
//#endregion
//#region src/loading/workers/parsers/flir/jobs/prepare.ts
/**
* Decode the JPEG once into the working buffer used by all other jobs.
* @throws FileLoadingError
*/
const prepare = async (buffer, url) => {
	try {
		return await prepareFlirWorkingBuffer(buffer);
	} catch (error) {
		throw new FileLoadingError(3, url, `Unable to read FLIR radiometric data from '${url}': ${error.message}`);
	}
};
//#endregion
//#region src/loading/workers/parsers/flir/FlirParser.ts
const extensions = [{
	extension: "jpg",
	minme: "image/jpeg"
}, {
	extension: "jpeg",
	minme: "image/jpeg"
}];
const flir = {
	manufacturer: "Teledyne FLIR",
	manufacturerUrl: "https://www.flir.com"
};
const dji = {
	manufacturer: "DJI",
	manufacturerUrl: "https://www.dji.com"
};
/**
* Radiometric JPEG images from FLIR and FLIR-core based cameras.
*
* The JPEG is decoded once while loading (`prepare`), temperatures are
* computed from the raw detector counts and the calibration stored in the
* file. All other jobs read the decoded working buffer. The original JPEG
* is preserved in `ThermalFileReader.fileBuffer`.
*
* Only single images are supported. Plain JPEGs and images edited outside
* of FLIR software (without FLIR APP1 segments) are rejected.
*/
const parser = {
	name: "FLIR Radiometric JPEG (.jpg)",
	description: "Radiometric JPEG images containing raw thermal data and calibration in the FLIR APP1 segments.",
	devices: [
		{
			deviceName: "FLIR C5",
			deviceUrl: "https://www.flir.com/products/c5/",
			deviceDescription: "Compact thermal camera.",
			...flir
		},
		{
			deviceName: "FLIR E8-XT, E60, T630sc",
			deviceUrl: "https://www.flir.com/instruments/",
			deviceDescription: "Handheld thermal cameras of the Ex and Txxx series.",
			...flir
		},
		{
			deviceName: "FLIR ONE Pro",
			deviceUrl: "https://www.flir.com/flir-one/",
			deviceDescription: "Thermal camera for smartphones.",
			...flir
		},
		{
			deviceName: "FLIR Vue Pro R 640",
			deviceUrl: "https://www.flir.com/products/vue-pro-r/",
			deviceDescription: "Radiometric drone camera.",
			...flir
		},
		{
			deviceName: "DJI Zenmuse XT, XT2",
			deviceUrl: "https://www.dji.com/zenmuse-xt2",
			deviceDescription: "Drone thermal cameras with FLIR core.",
			...dji
		}
	],
	extensions,
	is,
	prepare,
	baseInfo,
	getFrameSubset,
	frameData,
	registryHistogram,
	histogramPixels,
	pointAnalysisData,
	rectAnalysisData,
	ellipsisAnalysisData
};
const FlirParser = Object.freeze(parser);
//#endregion
//#region src/loading/workers/parsers/index.ts
const parsersArray = Object.values({
	LrcParser,
	FlirParser
});
/**
* Determines the parser and returns it (throws error if none found)
* 
* @throws FileLoadingError
*/
const determineParser = (buffer, url) => {
	const parser = parsersArray.find((parser) => parser.is(buffer, url));
	if (parser === void 0) throw new FileLoadingError(2, url, `No parser found for '${url}'.`);
	return parser;
};
/**
* Determine the parser and create its working buffer.
* - formats without `prepare` work directly with the loaded buffer
* - any failure is reported as `FileLoadingError`
*
* @throws FileLoadingError
*/
const determineAndPrepare = async (buffer, url) => {
	const parser = determineParser(buffer, url);
	if (parser.prepare === void 0) return {
		parser,
		workingBuffer: buffer
	};
	try {
		return {
			parser,
			workingBuffer: await parser.prepare(buffer, url)
		};
	} catch (error) {
		if (error instanceof FileLoadingError) throw error;
		throw new FileLoadingError(3, url, error.message);
	}
};
/**
* Array of all supported file types and extensions
* - this is only for the purpose of display!
* - no functionality is relies on this data
* - all the functionality needs to be implemented in static functions of the parser itself
*/
const supportedFileTypes = parsersArray.map((parser) => parser.extensions);
const supportedFileTypesInputProperty = supportedFileTypes.map((type) => type.map((entry) => entry.minme + ", ." + entry.extension).join(", ")).join(", ");
//#endregion
//#region src/loading/workers/dropin/DropinElementManager.ts
/** Turn any element into a dropzone! */
var DropinElementListener = class DropinElementListener {
	service;
	element;
	_hover = false;
	get hover() {
		return this._hover;
	}
	onMouseEnter = new CallbacksManager();
	onMouseLeave = new CallbacksManager();
	onDrop = new CallbacksManager();
	onProcessingEnd = new CallbacksManager();
	/** An invissible input element */
	input;
	hydrated = false;
	multiple;
	bindedEnterListener;
	bindedLeaveListener;
	bindedDropListener;
	bindedInputChangeListener;
	bindedDragoverListener;
	bindedClickListener;
	constructor(service, element, multiple = true) {
		this.service = service;
		this.element = element;
		this.multiple = multiple;
		this.bindedLeaveListener = this.handleLeave.bind(this);
		this.bindedEnterListener = this.handleEnter.bind(this);
		this.bindedDropListener = this.handleDrop.bind(this);
		this.bindedInputChangeListener = this.handleInputChange.bind(this);
		this.bindedDragoverListener = this.handleDragover.bind(this);
		this.bindedClickListener = this.handleClick.bind(this);
	}
	static listenOnElement(service, element, multiple = true) {
		const listener = new DropinElementListener(service, element, multiple);
		listener.hydrate();
		return listener;
	}
	/** Bind all event listeners to the provided element */
	hydrate() {
		if (this.hydrated === false) {
			this.hydrated = true;
			this.input = this.getInput();
			this.element.addEventListener("dragover", this.bindedDragoverListener);
			this.element.addEventListener("dragleave", this.bindedLeaveListener);
			this.element.addEventListener("dragend", this.bindedLeaveListener);
			this.element.addEventListener("pointerdown", this.bindedClickListener);
			this.element.addEventListener("drop", this.bindedDropListener);
			this.input.addEventListener("change", this.bindedInputChangeListener);
		}
	}
	/** Remove all event listeners from the element */
	dehydrate() {
		if (this.hydrated === true) {
			this.hydrated = false;
			if (this.input) this.input.remove();
			this.element.removeEventListener("dragover", this.bindedDragoverListener);
			this.element.removeEventListener("dragleave", this.bindedLeaveListener);
			this.element.removeEventListener("dragend", this.bindedLeaveListener);
			this.element.removeEventListener("pointerdown", this.bindedClickListener);
			this.element.removeEventListener("drop", this.bindedDropListener);
		}
	}
	handleClick(event) {
		event.preventDefault();
		if (this.input) this.input.click();
	}
	handleDragover(event) {
		event.preventDefault();
		this.handleEnter();
	}
	async handleFiles(files) {
		let results = [];
		if (this.multiple) results = await Promise.all(files.map(async (file) => {
			return await this.service.loadUploadedFile(file);
		}));
		else {
			const file = files[0];
			if (file) results.push(await this.service.loadUploadedFile(file));
		}
		return results;
	}
	async handleDrop(event) {
		event.preventDefault();
		this.onDrop.call();
		let results = [];
		const transfer = event.dataTransfer;
		if (transfer && transfer.files) results = await this.handleFiles(Array.from(transfer.files));
		this.onProcessingEnd.call(results, event);
		this.handleLeave();
		return {
			results,
			event
		};
	}
	async handleInputChange(event) {
		event.preventDefault();
		this.onDrop.call();
		const target = event.target;
		let results = [];
		if (target.files) {
			results = await this.handleFiles(Array.from(target.files));
			this.onProcessingEnd.call(results, event);
			this.handleLeave();
		}
		return {
			results,
			event
		};
	}
	handleEnter() {
		if (this._hover === false) {
			this._hover = true;
			this.onMouseEnter.call();
		}
	}
	handleLeave() {
		if (this._hover === true) {
			this._hover = false;
			this.onMouseLeave.call();
		}
	}
	/** Build the internal input */
	getInput() {
		const element = document.createElement("input");
		element.type = "file";
		element.accept = supportedFileTypesInputProperty;
		if (this.multiple) element.multiple = true;
		return element;
	}
	openFileDialog(multiple = true) {
		if (this.input !== void 0) {
			this.input.multiple = multiple;
			this.input.click();
		}
	}
};
//#endregion
//#region src/loading/workers/AbstractFileResult.ts
/** Both `ThermalFileReader` and `ThermalFileFailure` share common attributes since they are both results of `FilesService.loadFile()` */
var AbstractFileResult = class {
	thermalUrl;
	visibleUrl;
	constructor(thermalUrl, visibleUrl) {
		this.thermalUrl = thermalUrl;
		this.visibleUrl = visibleUrl;
	}
};
//#endregion
//#region src/loading/workers/ThermalFileFailure.ts
var ThermalFileFailure = class ThermalFileFailure extends AbstractFileResult {
	code;
	message;
	constructor(thermalUrl, code, message) {
		super(thermalUrl);
		this.code = code;
		this.message = message;
	}
	isSuccess() {
		return false;
	}
	static fromError(error) {
		return new ThermalFileFailure(error.url, error.code, error.message);
	}
};
//#endregion
//#region src/properties/abstractProperty.ts
/** 
* A common basis for all observable properties.
* 
* Principle:
* - the value is stored internally
* - update should be done only using `this.value = newValue` setter which will call
*     - the validation
*     - the side effects
*     - the listeners on the value change
* - Listeners are stored in a `CallbacksManager` object which is controlled by methods such as `addListener`, `removeListener` and `clearAllListeners`
* - for the purpose of value assignment from the outside, every individual property should create its own public methods that respect principles mentioned above.
* 
* @internal 
*/
var AbstractProperty = class {
	parent;
	_initial;
	_value;
	/** Get the current value @readonly */
	get value() {
		return this._value;
	}
	/** Get the initial value of this property @readonly */
	get valueInitial() {
		return this._initial;
	}
	/** 
	* Set the value and call all listeners. 
	* - Validates the value before settings
	* - Calls side effects after setting the value
	* - Calls all the listeners with the new values
	* @internal 
	*/
	set value(value) {
		this._value = this.validate(value);
		this.afterSetEffect(this._value);
		this._listeners.call(this._value);
	}
	_listeners = new CallbacksManager();
	constructor(parent, _initial) {
		this.parent = parent;
		this._initial = _initial;
		this._value = this.validate(this._initial);
	}
	/** Set the value to its initial state */
	reset() {
		this.value = this._initial;
	}
	/**
	* Add a listener to the property value changes.
	* @param id Identificator of the listening object needs to be unique - it will be the key in the `Map of listeners`
	* @param listener The function that will be triggered whenever the value changes.
	*/
	addListener(id, listener) {
		this._listeners.set(id, listener);
	}
	/** Remove the listener from the `Map` by its unique ID. */
	removeListener(id) {
		this._listeners.delete(id);
	}
	/** Remove all listeners from the `Map` */
	clearAllListeners() {
		this._listeners.clear();
	}
	/** 
	* Arbitrary call all registered listeners usin the current value of the property. 
	* 
	* This method should be used only in special cases, for example when the value is concieved as a reference, therefore its updates does not use the standard setter which triggers the listeners, side effects ac ati.
	*/
	callAllListenersWithCurrentValue() {
		this._listeners.call(this._value);
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/AbstractAnalysis.ts
var AbstractAnalysis = class AbstractAnalysis {
	key;
	file;
	static LISTENER_PROMOTE_PROPERTIES_CHANGE = "pch";
	static LISTENER_PROMOTE_MOVE_RESIZE = "mvr";
	static SERIALISABLE_CHANGES = [
		"name",
		"color",
		"min",
		"max",
		"avg"
	];
	static VALID_ANALYSIS_TYPES = [
		"point",
		"ellipsis",
		"rectangle"
	];
	static COLOR_ACTIVE = "yellow";
	static COLOR_INACTIVE = "black";
	_ready = false;
	/** Indicating whether the analysis in the state of its creation (by the user's mouse) or if it is already finalised. */
	get ready() {
		return this._ready;
	}
	/** Mark the analysis as ready (finalised) */
	setReady() {
		if (this.ready) throw new Error("Trying to set ready an analysis that is already ready!");
		this._ready = true;
	}
	/** The main DOM element of this analysis. Is placed in `this.renderRoot` */
	layerRoot;
	/** Alias of the file's canvasLayer root. The analysis DOM will be placed here. */
	get renderRoot() {
		return this.file.dom.canvasLayer.getLayerRoot();
	}
	/** 
	* Map of the analysis control points
	* - key is the role of the point
	* - value is the point instance
	*/
	points = /* @__PURE__ */ new Map();
	/** Create a new array containing all the points */
	get arrayOfPoints() {
		return Array.from(this.points.values());
	}
	/** Create a new array containing all the active points */
	get arrayOfActivePoints() {
		return this.arrayOfPoints.filter((point) => point.active);
	}
	/** Access all the file's analysis layers object. */
	get layers() {
		return this.file.analysis.layers;
	}
	/** Selection status */
	_selected = false;
	get selected() {
		return this._selected;
	}
	onSelected = new CallbacksManager();
	onDeselected = new CallbacksManager();
	/** 
	* Actions taken on any change that should trigger serialisation:
	* - modification of position or dimensions
	* - change of name or color
	*/
	onSerializableChange = new CallbacksManager();
	/** Actions taken when the value changes. Called internally by `this.recalculateValues()` */
	onValues = new CallbacksManager();
	/** Actions taken when the analysis moves or resizes anyhow. This is very much important and it is called from the edit tool. */
	onMoveOrResize = new CallbacksManager();
	/** Actions taken whenever the initial color changes. */
	onSetInitialColor = new CallbacksManager();
	/** Actions taken whenever the color changes. */
	onSetColor = new CallbacksManager();
	/** Actions taken whenever the name changes. */
	onSetName = new CallbacksManager();
	_min;
	_max;
	_avg;
	/** The current minimal value of this analysis */
	get min() {
		return this._min;
	}
	/** The current maximal value of this analysis */
	get max() {
		return this._max;
	}
	/** The current avarage value of this analysis */
	get avg() {
		return this._avg;
	}
	_top;
	_left;
	_width;
	_height;
	get left() {
		return this._left;
	}
	get top() {
		return this._top;
	}
	/** This dimension does not count the last pixel. */
	get width() {
		return this._width;
	}
	/** This dimension does not count the last pixel. */
	get height() {
		return this._height;
	}
	get right() {
		return this._left + this._width;
	}
	get bottom() {
		return this._top + this._height;
	}
	setTop(value) {
		if (isNaN(value)) return;
		if (value === this.top) return;
		const { top, height } = this.getVerticalDimensionFromNewValue(value, "top");
		let shouldEmit = false;
		if (top !== this.top) {
			this._top = top;
			this.onSetTop(top);
			shouldEmit = true;
		}
		if (height !== this.height) {
			this._height = height;
			this.onSetHeight(height);
			shouldEmit = true;
		}
		if (shouldEmit) this.onSerializableChange.call(this, "top");
	}
	setLeft(value) {
		if (isNaN(value)) return;
		if (value === this.left) return;
		const { left, width } = this.getHorizontalDimensionsFromNewValue(value, "left");
		let shouldEmit = false;
		if (left !== this.left) {
			this._left = left;
			this.onSetLeft(left);
			shouldEmit = true;
		}
		if (width !== this.width) {
			this._width = width;
			this.onSetWidth(width);
			shouldEmit = true;
		}
		if (shouldEmit) this.onSerializableChange.call(this, "left");
	}
	setWidth(value) {
		if (value === this.height) return;
		const val = this.validateWidth(value);
		if (!isNaN(val) && val !== this.width) {
			this._width = val;
			this.onSetWidth(val);
			this.onSerializableChange.call(this, "width");
		}
	}
	setHeight(value) {
		if (value === this.height) return;
		const val = this.validateHeight(value);
		if (!isNaN(val) && val !== this.height) {
			this._height = val;
			this.onSetHeight(val);
			this.onSerializableChange.call(this, "height");
		}
	}
	setBottom(value) {
		if (isNaN(value)) return;
		if (value === this.bottom) return;
		const { top, height } = this.getVerticalDimensionFromNewValue(value, "bottom");
		let shouldEmit = false;
		if (top !== this.top) {
			this._top = top;
			this.onSetTop(top);
			shouldEmit = true;
		}
		if (height !== this.height) {
			this._height = height;
			this.onSetHeight(height);
			shouldEmit = true;
		}
		if (shouldEmit) this.onSerializableChange.call(this, "bottom");
	}
	setRight(value) {
		if (isNaN(value)) return;
		if (value === this.right) return;
		const { left, width } = this.getHorizontalDimensionsFromNewValue(value, "right");
		let shouldEmit = false;
		if (left !== this.left) {
			this._left = left;
			this.onSetLeft(left);
			shouldEmit = true;
		}
		if (width !== this.width) {
			this._width = width;
			this.onSetWidth(width);
			shouldEmit = true;
		}
		if (shouldEmit) this.onSerializableChange.call(this, "right");
	}
	_color = AbstractAnalysis.COLOR_INACTIVE;
	get color() {
		return this._color;
	}
	setColor(value) {
		this._color = value;
		this.setColorCallback(value);
		this.onSetColor.call(value);
	}
	_initialColor;
	get initialColor() {
		return this._initialColor;
	}
	setInitialColor(value) {
		if (value === this.initialColor) return;
		this._initialColor = value;
		this.onSetInitialColor.call(value);
		this.onSerializableChange.call(this, "color");
		if (this.selected === true) this.setColor(value);
	}
	nameInitial;
	_name;
	get name() {
		return this._name;
	}
	setName(value) {
		if (value === this.name) return;
		this._name = value;
		this.onSerializableChange.call(this, "name");
		this.onSetName.call(value);
	}
	constructor(key, file, initialColor) {
		this.key = key;
		this.file = file;
		this._initialColor = initialColor;
		this.nameInitial = key;
		this._name = key;
		this.layerRoot = document.createElement("div");
		this.layerRoot.style.position = "absolute";
		this.layerRoot.style.top = "0px";
		this.layerRoot.style.left = "0px";
		this.layerRoot.style.width = "100%";
		this.layerRoot.style.height = "100%";
		this.layerRoot.style.overflow = "hidden";
		this.layerRoot.id = `analysis_${this.key}`;
		this.renderRoot.appendChild(this.layerRoot);
		/** @todo what happend if the callback key is set rendomly? I do not want this callback to be overriden anyhow! */
		this.onMoveOrResize.set(AbstractAnalysis.LISTENER_PROMOTE_MOVE_RESIZE, () => {
			this.recalculateValues();
			/** @todo */
			this.onSerializableChange.call(this, "moveOrResize");
			this.layers.onAnySerializableChange.call(this, 2);
		});
		/** Anytime a seralisable change occures, promote it to the layers storage */
		this.onSerializableChange.set(AbstractAnalysis.LISTENER_PROMOTE_PROPERTIES_CHANGE, (analysis, change) => {
			if (AbstractAnalysis.SERIALISABLE_CHANGES.includes(change)) this.layers.onAnySerializableChange.call(analysis, 3);
		});
	}
	/**
	* Performs the basic validation of a serialised input string
	* - correct number of segments?
	* - correct type of analysis?
	* - the type matches this analysis instance?
	*/
	serializedIsValid(input) {
		const splitted = input.split(";").map((segment) => segment.trim());
		if (splitted.length < 2) return false;
		if (!AbstractAnalysis.VALID_ANALYSIS_TYPES.includes(splitted[1])) return false;
		if (splitted[1] !== this.getType()) return false;
		return true;
	}
	/** When parsing incoming serialized attribute, look if segments have an exact value */
	static serializedSegmentsHasExact(segments, lookup) {
		return segments.find((segment) => segment === lookup) ? true : false;
	}
	/** When parsing incooming serialized attribute, try to extract it by its key as string */
	static serializedGetStringValueByKey(segments, key) {
		const regexp = new RegExp(`${key}:*`);
		return segments.find((s) => {
			if (s.match(regexp)) return isNaN(parseInt(s.split(":")[1]));
		})?.split(":")[1].trim();
	}
	/** When parsing incooming serialized attribute, try to extract it by its key as number */
	static serializedGetNumericalValueByKey(segments, key) {
		const regexp = new RegExp(`${key}:\\d+`);
		const item = segments.find((s) => s.match(regexp));
		if (item === void 0) return;
		return parseInt(item.split(":")[1]);
	}
	/**
	* Remove the analysis from the file and from the DOM
	* - removes from the DOM
	* - DOES NOT REMOVE THE SLOT
	* - DOES NOT REMOVE FROM THE STORAGE
	* @internal Does not remove from broader context, so do not call this method from aywhere else than from the layers storage
	*/
	destroyDom() {
		this.setDeselected();
		this.renderRoot.removeChild(this.layerRoot);
	}
	/**
	* Mark the analysis as selected
	* => inable its listeners
	* => change the color of its controls to its current color
	*/
	setSelected(exclusive = false, emitGlobalEvent = true) {
		if (this.selected === true) return;
		this._selected = true;
		this.onSelected.call(this);
		this.setColor(this.initialColor);
		if (exclusive === true) this.layers.all.filter((analysis) => analysis.key !== this.key).forEach((analysis) => {
			if (analysis.selected) analysis.setDeselected(false);
		});
		if (emitGlobalEvent === true) this.layers.onSelectionChange.call(this.layers.selectedOnly);
		const slot = this.file.slots.getAnalysisSlot(this);
		if (slot) this.file.group.analysisSync.setSlotSelected(this.file, slot);
	}
	/** 
	* Mark the analysis as deselected
	* => disable its listeners
	* => change the color to inactive
	*/
	setDeselected(emitGlobalEvent = true) {
		if (this.selected === false) return;
		this._selected = false;
		this.onDeselected.call(this);
		this.setColor(AbstractAnalysis.COLOR_INACTIVE);
		this.arrayOfActivePoints.forEach((point) => point.deactivate());
		if (emitGlobalEvent === true) this.file.analysis.layers.onSelectionChange.call(this.file.analysis.layers.selectedOnly);
		const slot = this.file.slots.getAnalysisSlot(this);
		if (slot) this.file.group.analysisSync.setSlotDeselected(this.file, slot);
	}
	/** Recalculate the analysis' values from the current position and dimensions. Called whenever the analysis is resized or whenever file's `pixels` change. */
	recalculateValues() {
		const { min, max, avg } = this.getValues();
		this._min = min;
		this._max = max;
		this._avg = avg;
		this.onValues.call(this.min, this.max, this.avg);
	}
	/**
	* @deprecated Use with caution! This method forcefully sets the analysis values. The calculation mechanisms should happen elsewhere. Now they happen in the canvas layer wich calculates them upon rendering. That is not good at all!
	* @internal
	* @todo Remove this method, move the calculation of values elsewhere from the canvas layer!
	*/
	dangerouslySetValues(avg, min = void 0, max = void 0) {
		this._avg = avg;
		this._min = min;
		this._max = max;
		this.onValues.call(this.min, this.max, this.avg);
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/AbstractPoint.ts
var AbstractPoint = class {
	key;
	analysis;
	get file() {
		return this.analysis.file;
	}
	pxX;
	_x;
	get x() {
		return this._x;
	}
	onX = new CallbacksManager();
	pxY;
	_y;
	get y() {
		return this._y;
	}
	onY = new CallbacksManager();
	/** 
	* Recieves X from the tool. 
	* 
	* Needs to determine the placement using `analyzeXFromTool`. 
	* Calls `sideEffectOnXFromTool`.
	*/
	setXFromTool(value) {
		const { x, placement } = this.analyzeXFromTool(value);
		if (this.mayMoveToX(x)) {
			const prev = this.x;
			this._x = x;
			const style = this.getXStyle(x, placement);
			this.container.style.left = style;
			this.sideEffectOnXFromTool(x, placement);
			this.onX.call(this.x, prev);
		}
	}
	/** Recieves the X directly, along with the placement, with no side effects. */
	setXDirectly(value, placement) {
		if (this.mayMoveToX(value)) {
			const prev = this.x;
			this._x = value;
			const style = this.getXStyle(value, placement);
			this.container.style.left = style;
			this.onX.call(this.x, prev);
		}
	}
	/** 
	* Recieves Y from the tool. 
	* 
	* Needs to determine the placement using `analyzeYFromTool`. 
	* Calls `sideEffectOnYFromTool`.
	*/
	setYFromTool(value) {
		const { y, placement } = this.analyzeYFromTool(value);
		if (this.mayMoveToY(y)) {
			const prev = this.y;
			this._y = y;
			const style = this.getYStyle(y, placement);
			this.container.style.top = style;
			this.sideEffectOnYFromTool(y, placement);
			this.onY.call(this.y, prev);
		}
	}
	/** Recieves the Y directly, along with the placement, with no side effects. */
	setYDirectly(value, placement) {
		if (this.mayMoveToY(value)) {
			const prev = this.y;
			this._y = value;
			const style = this.getYStyle(value, placement);
			this.container.style.top = style;
			this.onY.call(this.y, prev);
		}
	}
	/** Format the `left` style from given position and placement */
	getXStyle(value, placement) {
		const percent = this.calculatePercentageX(value);
		const offset = placement === 1 ? 0 : placement === 3 ? this.pxX : this.pxX / 2;
		return this.formatPositionStyle(percent, offset);
	}
	getYStyle(value, placement) {
		const percent = this.calculatePercentageY(value);
		const offset = placement === 1 ? 0 : placement === 3 ? this.pxY : this.pxY / 2;
		return this.formatPositionStyle(percent, offset);
	}
	/** Convert a percentage and a offset in pixels into a CSS style string */
	formatPositionStyle(percent, offsetInPx) {
		if (offsetInPx === 0 || isNaN(offsetInPx)) return `${percent}%`;
		return `calc( ${percent}% + ${offsetInPx}% )`;
	}
	_color;
	get color() {
		return this._color;
	}
	setColor(value) {
		this._color = value;
		this.onSetColor(value);
	}
	get initialColor() {
		return this.analysis.initialColor;
	}
	get activeColor() {
		return PointAnalysis.COLOR_ACTIVE;
	}
	get inactiveColor() {
		return PointAnalysis.COLOR_INACTIVE;
	}
	_active = false;
	get active() {
		return this._active;
	}
	_isHover = false;
	get isHover() {
		return this._isHover;
	}
	_isDragging = false;
	get isDragging() {
		return this._isDragging;
	}
	get root() {
		return this.analysis.layerRoot;
	}
	/** The container is allways positioned by percents. The container dimension is allways 1x1. The container contains the inner element which handles the display. */
	container;
	/** The display element. */
	innerElement;
	constructor(key, top, left, analysis, color, placementX, placementY) {
		this.key = key;
		this.analysis = analysis;
		this.pxX = 100 / this.analysis.file.width;
		this.pxY = 100 / this.analysis.file.height;
		this._x = left;
		this._y = top;
		this._color = color;
		this.container = document.createElement("div");
		this.container.style.position = "absolute";
		this.container.id = `analysis_${this.analysis.key}_${this.key}_${this.file.id}`;
		this.innerElement = this.createInnerElement();
		this.container.appendChild(this.innerElement);
		this.setColor(color);
		this.setXDirectly(left, placementX);
		this.setYDirectly(top, placementY);
		this.root.appendChild(this.container);
	}
	isWithin(top, left) {
		const offset = this.getRadius() / 2;
		const minX = this.x - offset;
		const maxX = this.x + offset;
		const minY = this.y - offset;
		const maxY = this.y + offset;
		return left >= minX && left <= maxX && top >= minY && top <= maxY;
	}
	isInSelectedLayer() {
		return this.analysis.selected;
	}
	calculatePercentageX(value) {
		return value / this.analysis.file.width * 100;
	}
	calculatePercentageY(value) {
		return value / this.analysis.file.height * 100;
	}
	/** @deprecated */
	getPercentageX() {
		return this.x / this.analysis.file.width * 100;
	}
	/** @deprecated */
	getPercentageY() {
		return this.y / this.analysis.file.height * 100;
	}
	getPercentageCoordinates() {
		return {
			x: this.getPercentageX(),
			y: this.getPercentageY()
		};
	}
	mouseEnter() {
		if (this.isHover === false) {
			this._isHover = true;
			this.actionOnMouseEnter();
			this.onMouseEnter.call(this);
		}
	}
	mouseLeave() {
		if (this.isHover === true) {
			this._isHover = false;
			this.actionOnMouseLeave();
			this.onMouseLeave.call(this);
		}
	}
	onMouseEnter = new CallbacksManager();
	onMouseLeave = new CallbacksManager();
	onActivate = new CallbacksManager();
	onDeactivate = new CallbacksManager();
	activate() {
		this._active = true;
		this.actionOnActivate();
	}
	deactivate() {
		this._active = false;
		this.actionOnDeactivate();
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/point/PointPoint.ts
var PointPoint = class PointPoint extends AbstractPoint {
	static size = 20;
	static sizePx(aspect = 1) {
		return Math.round(PointPoint.size * aspect).toString() + "px";
	}
	axisX;
	axisY;
	center;
	analyzeXFromTool(value) {
		return {
			x: value,
			placement: 2
		};
	}
	analyzeYFromTool(value) {
		return {
			y: value,
			placement: 2
		};
	}
	sideEffectOnXFromTool() {
		this.analysis.setLeft(this.x);
	}
	sideEffectOnYFromTool() {
		this.analysis.setTop(this.y);
	}
	constructor(key, top, left, analysis, color) {
		super(key, top, left, analysis, color, 2, 2);
		this.axisX = this.buildAxisX();
		this.axisY = this.buildAxisY();
		this.center = this.buildCenter();
		this.innerElement.appendChild(this.axisX);
		this.innerElement.appendChild(this.axisY);
		this.innerElement.appendChild(this.center);
		this.analysis.onValues.set(this.key, () => {
			const colorFromCurrentPalette = this.analysis.file.getColorAtPoint(this.x, this.y);
			if (this.center && colorFromCurrentPalette) this.center.style.backgroundColor = colorFromCurrentPalette;
		});
	}
	mayMoveToX(value) {
		return value <= this.file.width && value >= 0;
	}
	mayMoveToY(value) {
		return value <= this.file.height && value >= 0;
	}
	createInnerElement() {
		const element = document.createElement("div");
		element.classList.add("innerElement");
		element.style.position = "absolute";
		element.style.top = PointPoint.sizePx(-.5);
		element.style.left = PointPoint.sizePx(-.5);
		element.style.width = PointPoint.sizePx();
		element.style.height = PointPoint.sizePx();
		return element;
	}
	buildAxisX() {
		const axis = document.createElement("div");
		axis.style.position = "absolute";
		axis.style.width = "100%";
		axis.style.height = "1px";
		axis.style.left = "0px";
		axis.style.top = PointPoint.sizePx(.5);
		return axis;
	}
	buildAxisY() {
		const axis = document.createElement("div");
		axis.style.position = "absolute";
		axis.style.width = "1px";
		axis.style.height = "100%";
		axis.style.left = PointPoint.sizePx(.5);
		axis.style.top = "0px";
		return axis;
	}
	buildCenter() {
		const center = document.createElement("div");
		center.style.position = "absolute";
		center.style.top = `calc( ${PointPoint.sizePx(.5)} - 3px )`;
		center.style.left = `calc( ${PointPoint.sizePx(.5)} - 3px )`;
		center.style.width = "5px";
		center.style.height = "5px";
		center.style.borderStyle = "solid";
		center.style.borderWidth = "1px";
		const currentColor = this.analysis.file.getColorAtPoint(this.x, this.y);
		if (currentColor) center.style.backgroundColor = currentColor;
		return center;
	}
	onSetColor(value) {
		if (this.axisX) this.axisX.style.backgroundColor = value;
		if (this.axisY) this.axisY.style.backgroundColor = value;
		if (this.center) this.center.style.borderColor = value;
	}
	actionOnMouseEnter() {
		if (this.isInSelectedLayer()) {
			this.setColor(this.activeColor);
			this.setBoxShadow("white");
		}
	}
	actionOnMouseLeave() {
		if (this.isInSelectedLayer()) this.setColor(this.analysis.initialColor);
		else this.setColor(this.inactiveColor);
		this.setBoxShadow(void 0);
	}
	actionOnActivate() {
		if (this.innerElement) this.setColor(this.activeColor);
	}
	actionOnDeactivate() {
		if (this.innerElement) this.setColor(this.inactiveColor);
	}
	getRadius() {
		return 10;
	}
	setBoxShadow(color = void 0) {
		if (color === void 0) {
			this.axisX?.style.removeProperty("box-shadow");
			this.axisY?.style.removeProperty("box-shadow");
			this.center?.style.removeProperty("box-shadow");
		} else {
			const shadow = `0 0 5px 2px ${color}`;
			if (this.axisX) this.axisX.style.boxShadow = shadow;
			if (this.axisY) this.axisY.style.boxShadow = shadow;
			if (this.center) this.center.style.boxShadow = shadow;
		}
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/point/PointAnalysis.ts
var PointAnalysis = class PointAnalysis extends AbstractAnalysis {
	getType() {
		return "point";
	}
	center;
	_graph;
	get graph() {
		if (!this._graph) this._graph = new AnalysisGraph(this);
		return this._graph;
	}
	static addAtPoint(key, color, file, top, left) {
		return new PointAnalysis(key, color, file, top, left);
	}
	constructor(key, color, file, top, left) {
		super(key, file, color);
		this._top = top;
		this._left = left;
		this._width = 0;
		this._height = 0;
		this.center = new PointPoint("center", top, left, this, color);
		this.points.set("center", this.center);
		this.recalculateValues();
	}
	setColorCallback(value) {
		this.center.setColor(value);
	}
	isWithin(x, y) {
		return this.center.isWithin(y, x);
	}
	getValues() {
		const value = this.file.getTemperatureAtPoint(this.center.x, this.center.y);
		return {
			min: value,
			max: value,
			avg: value
		};
	}
	async getAnalysisData() {
		return await this.file.reader.pointAnalysisData(this.center.x, this.center.y);
	}
	validateWidth() {
		return 0;
	}
	validateHeight() {
		return 0;
	}
	onSetLeft(validatedValue) {
		this.center.setXDirectly(validatedValue, 2);
		this.onSerializableChange.call(this, "left");
	}
	onSetTop(validatedValue) {
		this.center.setYDirectly(validatedValue, 2);
		this.onSerializableChange.call(this, "top");
	}
	onSetWidth() {}
	onSetHeight() {}
	getVerticalDimensionFromNewValue(value) {
		const val = Math.min(this.file.height - 1, Math.max(0, Math.round(value)));
		return {
			top: val,
			bottom: val,
			height: 0
		};
	}
	getHorizontalDimensionsFromNewValue(value) {
		const val = Math.min(this.file.width - 1, Math.max(0, Math.round(value)));
		return {
			left: val,
			right: val,
			width: 0
		};
	}
	recievedSerialized(input) {
		if (!this.serializedIsValid(input)) return;
		const splitted = input.split(";").map((segment) => segment.trim());
		let shouldRecalculate = false;
		const name = splitted[0];
		if (name !== this.name) this.setName(name);
		const graphOn = AbstractAnalysis.serializedSegmentsHasExact(splitted, "avg");
		if (graphOn !== this.graph.state.AVG) {
			this.graph.setAvgActivation(graphOn);
			shouldRecalculate = true;
		}
		const color = AbstractAnalysis.serializedGetStringValueByKey(splitted, "color");
		if (color === void 0) {} else if (color !== this.initialColor) this.setInitialColor(color);
		const top = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "top");
		const left = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "left");
		if (top !== void 0) {
			this.setTop(top);
			shouldRecalculate = true;
		}
		if (left !== void 0) {
			this.setLeft(left);
			shouldRecalculate = true;
		}
		if (shouldRecalculate) this.recalculateValues();
	}
	toSerialized() {
		const output = [];
		output.push(this.name);
		output.push("point");
		output.push(`top:${this.top}`);
		output.push(`left:${this.left}`);
		output.push(`color:${this.initialColor}`);
		if (this.graph.state.AVG) output.push("avg");
		return output.join(";");
	}
};
//#endregion
//#region src/properties/analysis/data/graphs/AnalysisGraph.ts
var AnalysisGraph = class {
	analysis;
	constructor(analysis) {
		this.analysis = analysis;
		this.hydrate();
	}
	_min = false;
	_max = false;
	_avg = false;
	get state() {
		return {
			"MIN": this._min,
			"MAX": this._max,
			"AVG": this._avg
		};
	}
	_value;
	get value() {
		return this._value;
	}
	set value(value) {
		this._value = value;
		this.onGraphData.call(value, this.analysis);
	}
	setMinActivation(active) {
		if (this._min !== active) {
			this._min = active;
			this.emitGraphActivation();
			this.analysis.onSerializableChange.call(this.analysis, "min");
		}
	}
	setMaxActivation(active) {
		if (this._max !== active) {
			this._max = active;
			this.emitGraphActivation();
			this.analysis.onSerializableChange.call(this.analysis, "max");
		}
	}
	setAvgActivation(active) {
		if (this._avg !== active) {
			this._avg = active;
			this.emitGraphActivation();
			this.analysis.onSerializableChange.call(this.analysis, "avg");
		}
	}
	onGraphActivation = new CallbacksManager();
	onGraphData = new CallbacksManager();
	onAnalysisSelection = new CallbacksManager();
	emitGraphActivation() {
		this.onGraphActivation.call(this._min, this._max, this._avg);
	}
	async hydrate() {
		this.analysis.onSetInitialColor.set("__graphs", () => {
			this.analysis.file.analysisData.listeners.refreshOutput();
		});
		this.analysis.onSelected.set("__graphs", (analysis) => {
			this.onAnalysisSelection.call(true, analysis);
		});
		this.analysis.onMoveOrResize.set("__graphs", async (analysis) => {
			const data = await analysis.getAnalysisData();
			this.value = data;
		});
		const data = await this.getGraphData();
		this.value = data;
	}
	async getGraphData() {
		return await this.analysis.getAnalysisData();
	}
	getGraphColors() {
		if (this.analysis instanceof PointAnalysis) {
			if (this._avg) return [this.analysis.initialColor];
			else return [];
		}
		const output = [];
		Object.values(this.state).forEach((value) => {
			if (value) output.push(this.analysis.initialColor);
		});
		return output;
	}
	getGraphLabels() {
		if (this.analysis instanceof PointAnalysis) {
			if (this._avg) return [this.analysis.name];
			else return [];
		}
		const output = [];
		Object.entries(this.state).forEach(([key, value]) => {
			if (value) output.push(`${this.analysis.name} ${key}`);
		});
		return output;
	}
	hasDataToPrint() {
		if (this.analysis instanceof PointAnalysis) return this._avg;
		return this._min || this._max || this._avg;
	}
	getDtaAtTime(timestamp) {
		if (this.analysis instanceof PointAnalysis) {
			if (this._avg) return [this.value[timestamp]];
			else return [];
		}
		const output = [];
		const value = this.value;
		if (this._min) output.push(value[timestamp].min);
		if (this._max) output.push(value[timestamp].max);
		if (this._avg) output.push(value[timestamp].avg);
		return output;
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/AbstractHandlePoint.ts
var AbstractHandlePoint = class extends AbstractPoint {
	constructor(key, top, left, analysis, color, placementX, placementY) {
		super(key, top, left, analysis, color, placementX, placementY);
	}
	createInnerElement() {
		const inner = document.createElement("div");
		inner.style.position = "absolute";
		inner.style.top = "-5px";
		inner.style.left = "-5px";
		inner.style.width = "10px";
		inner.style.height = "10px";
		inner.style.position = "absolute";
		inner.style.backgroundColor = this.color;
		return inner;
	}
	actionOnMouseEnter() {
		if (this.innerElement && this.isInSelectedLayer()) {
			this.innerElement.style.boxShadow = "0px 0px 10px 2px white";
			this.innerElement.style.borderWidth = "1px";
			this.innerElement.style.borderStyle = "solid";
			this.innerElement.style.borderColor = "white";
		}
	}
	actionOnMouseLeave() {
		if (this.innerElement) {
			this.innerElement.style.removeProperty("box-shadow");
			this.innerElement.style.removeProperty("border-width");
			this.innerElement.style.removeProperty("border-style");
			this.innerElement.style.removeProperty("border-color");
		}
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/CornerPoint.ts
var CornerPoint = class extends AbstractHandlePoint {
	_pairX;
	_pairY;
	get pairX() {
		return this._pairX;
	}
	get pairY() {
		return this._pairY;
	}
	setPairX(point) {
		this._pairX = point;
	}
	setPairY(point) {
		this._pairY = point;
	}
	getRadius() {
		return 10;
	}
	mayMoveToX(value) {
		return value <= this.file.width && value >= 0;
	}
	mayMoveToY(value) {
		return value <= this.file.height && value >= 0;
	}
	getCenterX() {
		return this.analysis.left + this.analysis.width / 2;
	}
	getCenterY() {
		return this.analysis.top + this.analysis.height / 2;
	}
	get isLeftSide() {
		return this.x <= this.getCenterX();
	}
	get isTopSide() {
		return this.y <= this.getCenterY();
	}
	get isRightSide() {
		return this.x > this.getCenterX();
	}
	get isBottomSide() {
		return this.y > this.getCenterY();
	}
	analyzeXFromTool(value) {
		return {
			x: value,
			placement: this.isLeftSide ? 1 : 3
		};
	}
	analyzeYFromTool(value) {
		return {
			y: value,
			placement: this.isTopSide ? 1 : 3
		};
	}
	sideEffectOnXFromTool(value, placement) {
		this.pairX.setXDirectly(value, placement);
		if (value > this.pairY.x) this.analysis.leftSidePoints.forEach((p) => {
			p.setXDirectly(p.x, 1);
		});
		else this.analysis.rightSidePoints.forEach((p) => {
			p.setXDirectly(p.x, 3);
		});
	}
	sideEffectOnYFromTool(value, placement) {
		this.pairY.setYDirectly(value, placement);
		if (value > this.pairX.y) this.analysis.topSidePoints.forEach((p) => {
			p.setYDirectly(p.y, 1);
		});
		else this.analysis.bottomSidePoints.forEach((p) => {
			p.setYDirectly(p.y, 3);
		});
	}
	isMoving = false;
	onSetColor(value) {
		if (this.innerElement) this.innerElement.style.backgroundColor = value;
	}
	actionOnActivate() {
		if (this.innerElement) this.setColor(this.activeColor);
	}
	actionOnDeactivate() {
		if (this.innerElement) this.setColor(this.isInSelectedLayer() ? this.initialColor : this.inactiveColor);
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/AbstractAreaAnalysis.ts
var AbstractAreaAnalysis = class extends AbstractAnalysis {
	wPx = (100 / this.file.width / 2).toString() + "%";
	hPx = (100 / this.file.height / 2).toString() + "%";
	tl;
	tr;
	bl;
	br;
	area;
	_graph;
	get graph() {
		if (!this._graph) this._graph = new AnalysisGraph(this);
		return this._graph;
	}
	isWithin(x, y) {
		return x >= this.left && x <= this.left + this.width && y >= this.top && y <= this.top + this.height;
	}
	static calculateDimensionsFromCorners(top, left, right, bottom) {
		const t = Math.min(top, bottom);
		const b = Math.max(top, bottom);
		const l = Math.min(left, right);
		return {
			top: t,
			left: l,
			width: Math.max(left, right) - l,
			height: b - t
		};
	}
	constructor(key, color, file, top, left, width, height) {
		super(key, file, color);
		let right = left;
		let bottom = top;
		if (width !== void 0 && height !== void 0) {
			right = left + width;
			bottom = top + height;
		}
		this.area = this.buildArea(top, left, width, height);
		this.tl = this.addPoint("tl", top, left, 1, 1);
		this.tr = this.addPoint("tr", top, right, 3, 1);
		this.bl = this.addPoint("bl", bottom, left, 1, 3);
		this.br = this.addPoint("br", bottom, right, 3, 3);
		this.tl.setPairX(this.bl);
		this.tl.setPairY(this.tr);
		this.tr.setPairX(this.br);
		this.tr.setPairY(this.tl);
		this.bl.setPairX(this.tl);
		this.bl.setPairY(this.br);
		this.br.setPairX(this.tr);
		this.br.setPairY(this.bl);
		this.calculateBounds();
		this.onMoveOrResize.set("sync the area", () => {
			this.calculateBounds();
		});
	}
	setColorCallback(value) {
		this.points.forEach((point) => point.setColor(value));
		this.area.setColor(value);
	}
	calculateBounds() {
		let leftMost = this.file.width;
		let rightMost = 0;
		let topMost = this.file.height;
		let bottomMost = 0;
		this.points.forEach((point) => {
			if (point.x > rightMost) rightMost = point.x;
			if (point.x < leftMost) leftMost = point.x;
			if (point.y < topMost) topMost = point.y;
			if (point.y > bottomMost) bottomMost = point.y;
		});
		this._left = leftMost;
		this._top = topMost;
		this._width = rightMost - leftMost;
		this._height = bottomMost - topMost;
		this.area.left = this.left;
		this.area.top = this.top;
		this.area.height = this.height;
		this.area.width = this.width;
	}
	addPoint(role, top, left, placementX, placementY) {
		const point = new CornerPoint(role, top, left, this, this.color, placementX, placementY);
		this.points.set(role, point);
		return point;
	}
	validateWidth(value) {
		const max = this.file.width - 1 - this.left;
		return Math.max(0, Math.min(max, Math.round(value)));
	}
	validateHeight(value) {
		const max = this.file.height - 1 - this.top;
		return Math.max(0, Math.min(max, Math.round(value)));
	}
	onSetLeft(validatedValue) {
		this.area.left = validatedValue;
		this.forPoints(this.leftSidePoints, (point) => {
			point.setXDirectly(validatedValue, 1);
		});
		this.forPoints(this.rightSidePoints, (point) => {
			point.setXDirectly(this.right, 3);
		});
	}
	onSetTop(validatedValue) {
		this.area.top = validatedValue;
		this.forPoints(this.topSidePoints, (point) => {
			point.setYDirectly(validatedValue, 1);
		});
		this.forPoints(this.bottomSidePoints, (point) => {
			point.setYDirectly(this.bottom, 3);
		});
	}
	onSetWidth(validatedValue) {
		this.area.width = validatedValue;
		this.forPoints(this.leftSidePoints, (point) => {
			point.setXDirectly(this.left, 1);
		});
		this.forPoints(this.rightSidePoints, (point) => {
			point.setXDirectly(this.right, 3);
		});
	}
	onSetHeight(validatedValue) {
		this.area.height = validatedValue;
		this.forPoints(this.topSidePoints, (point) => {
			point.setYDirectly(this.top, 1);
		});
		this.forPoints(this.bottomSidePoints, (point) => {
			point.setYDirectly(this.bottom, 3);
		});
	}
	getVerticalDimensionFromNewValue(value, preferredSide) {
		const val = Math.round(value);
		const maxW = this.file.height - 1;
		const theOtherSide = preferredSide === "top" ? this.bottom : this.top;
		if (val <= 0) return {
			top: 0,
			bottom: theOtherSide,
			height: theOtherSide
		};
		else if (val > maxW) return {
			top: theOtherSide,
			bottom: maxW,
			height: maxW - theOtherSide
		};
		else if (preferredSide === "bottom") {
			if (val <= this.top) return {
				top: val,
				bottom: this.top,
				height: this.top - val
			};
			else return {
				top: this.top,
				bottom: val,
				height: val - this.top
			};
		} else if (val >= this.bottom) return {
			top: this.bottom,
			bottom: val,
			height: val - this.bottom
		};
		else return {
			top: val,
			bottom: this.bottom,
			height: this.bottom - val
		};
	}
	getHorizontalDimensionsFromNewValue(value, preferredSide) {
		const val = Math.round(value);
		const maxW = this.file.width - 1;
		const theOtherSide = preferredSide === "left" ? this.right : this.left;
		if (val <= 0) return {
			left: 0,
			right: theOtherSide,
			width: theOtherSide
		};
		else if (val > maxW) return {
			left: theOtherSide,
			right: maxW,
			width: maxW - theOtherSide
		};
		else if (preferredSide === "right") {
			if (val <= this.left) return {
				left: val,
				right: this.left,
				width: this.left - val
			};
			else return {
				left: this.left,
				right: val,
				width: val - this.left
			};
		} else if (val >= this.right) return {
			left: this.right,
			right: val,
			width: val - this.right
		};
		else return {
			left: val,
			right: this.right,
			width: this.right - val
		};
	}
	get leftSidePoints() {
		return Array.from(this.points.values()).filter((point) => point.isLeftSide);
	}
	get rightSidePoints() {
		return Array.from(this.points.values()).filter((point) => point.isRightSide);
	}
	get topSidePoints() {
		return Array.from(this.points.values()).filter((point) => point.isTopSide);
	}
	get bottomSidePoints() {
		return Array.from(this.points.values()).filter((point) => point.isBottomSide);
	}
	forPoints(points, fn) {
		points.forEach((point) => fn(point));
	}
	recievedSerialized(input) {
		if (!this.serializedIsValid(input)) return;
		const splitted = input.split(";").map((segment) => segment.trim());
		let shouldRecalculate = false;
		const name = splitted[0];
		if (name !== this.name) this.setName(name);
		const avgOn = AbstractAnalysis.serializedSegmentsHasExact(splitted, "avg");
		if (avgOn !== this.graph.state.AVG) this.graph.setAvgActivation(avgOn);
		const minOn = AbstractAnalysis.serializedSegmentsHasExact(splitted, "min");
		if (minOn !== this.graph.state.MIN) this.graph.setMinActivation(minOn);
		const maxOn = AbstractAnalysis.serializedSegmentsHasExact(splitted, "max");
		if (maxOn !== this.graph.state.MAX) this.graph.setMaxActivation(maxOn);
		const color = AbstractAnalysis.serializedGetStringValueByKey(splitted, "color");
		if (color === void 0) {} else if (color !== this.initialColor) this.setInitialColor(color);
		const top = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "top");
		const left = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "left");
		const width = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "width");
		const height = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "height");
		if (top !== void 0 && top !== this.top) {
			this.setTop(top);
			shouldRecalculate = true;
		}
		if (left !== void 0 && left !== this.left) {
			this.setLeft(left);
			shouldRecalculate = true;
		}
		if (width !== void 0 && width !== this.width) {
			this.setWidth(width);
			shouldRecalculate = true;
		}
		if (height !== void 0 && height !== this.height) {
			this.setHeight(height);
			shouldRecalculate = true;
		}
		if (shouldRecalculate) this.recalculateValues();
	}
	toSerialized() {
		const output = [];
		output.push(this.name);
		output.push(this.getType());
		output.push(`color:${this.initialColor}`);
		output.push(`top:${this.top}`);
		output.push(`left:${this.left}`);
		output.push(`width:${this.width}`);
		output.push(`height:${this.height}`);
		if (this.graph.state.AVG) output.push("avg");
		if (this.graph.state.MIN) output.push("min");
		if (this.graph.state.MAX) output.push("max");
		return output.join(";");
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/AbstractArea.ts
var AbstractArea = class {
	analysis;
	pxX;
	pxY;
	get fileWidth() {
		return this.analysis.file.width;
	}
	get fileHeight() {
		return this.analysis.file.height;
	}
	get root() {
		return this.analysis.layerRoot;
	}
	element;
	_top;
	_width;
	_left;
	_height;
	get top() {
		return this._top;
	}
	set top(value) {
		this._top = value;
		if (this.element) this.element.style.top = `${this._top / this.fileHeight * 100}%`;
	}
	get left() {
		return this._left;
	}
	set left(value) {
		this._left = value;
		if (this.element) this.element.style.left = `${this._left / this.fileWidth * 100}%`;
	}
	get height() {
		return this._height;
	}
	set height(value) {
		this._height = value;
		if (this.element) this.element.style.height = `calc( ${this.height / this.fileHeight * 100}% + ${this.pxY}% )`;
	}
	get width() {
		return this._width;
	}
	set width(value) {
		this._width = value;
		if (this.element) this.element.style.width = `calc( ${this.width / this.fileWidth * 100}% + ${this.pxX}% )`;
	}
	get center() {
		return {
			x: this.left + this.width / 2,
			y: this.top + this.height / 2
		};
	}
	constructor(analysis, top, right, left, bottom) {
		this.analysis = analysis;
		this.pxX = 100 / this.analysis.file.width;
		this.pxY = 100 / this.analysis.file.height;
		this.build();
		this.top = top;
		this.left = left;
		this.width = right;
		this.height = bottom;
	}
	build() {
		this.element = document.createElement("div");
		this.element.style.position = "absolute";
		this.onBuild();
		this.root.appendChild(this.element);
	}
	setColor(value) {
		this.onSetColor(value);
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/ellipsis/EllipsisArea.ts
var EllipsisArea = class extends AbstractArea {
	onBuild() {
		this.element.style.borderWidth = "1px";
		this.element.style.borderColor = this.analysis.color;
		this.element.style.borderStyle = "solid";
		this.element.style.borderRadius = "50%";
	}
	onSetColor(value) {
		this.element.style.borderColor = value;
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/ellipsis/EllipsisAnalysis.ts
var EllipsisAnalysis = class EllipsisAnalysis extends AbstractAreaAnalysis {
	getType() {
		return "ellipsis";
	}
	static startAddingAtPoint(key, color, file, top, left) {
		const item = new EllipsisAnalysis(key, color, file, top, left);
		item.br.activate();
		return item;
	}
	static build(key, color, file, _top, _left, _right, _bottom) {
		const { top, left, width, height } = EllipsisAnalysis.calculateDimensionsFromCorners(_top, _left, _right, _bottom);
		const item = new EllipsisAnalysis(key, color, file, top, left, width, height);
		item.recalculateValues();
		return item;
	}
	buildArea(x, y, width, height) {
		if (width !== void 0 && height !== void 0) return new EllipsisArea(this, x, y, x + width, y + height);
		return new EllipsisArea(this, x, y, x, y);
	}
	getValues() {
		const fromX = this.left;
		const toX = this.left + this.width;
		const fromY = this.top;
		const toY = this.top + this.height;
		let min = Infinity;
		let max = -Infinity;
		let count = 0;
		let sum = 0;
		for (let y = fromY; y < toY; y++) {
			const rowOffset = this.file.width * y;
			for (let x = fromX; x <= toX; x++) if (this.isWithin(x, y)) {
				const point = this.file.pixels[rowOffset + x];
				if (point < min) min = point;
				if (point > max) max = point;
				sum += point;
				count++;
			}
		}
		return {
			min,
			max,
			avg: sum / count
		};
	}
	isWithin(x, y) {
		const centerX = this.left + this.width / 2;
		const centerY = this.top + this.height / 2;
		const normalizedX = (x - centerX) / (this.width / 2);
		const normalizedY = (y - centerY) / (this.height / 2);
		return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
	}
	async getAnalysisData() {
		return await this.file.reader.ellipsisAnalysisData(this.left, this.top, this.width, this.height);
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/rectangle/RectangleArea.ts
var RectangleArea = class extends AbstractArea {
	onBuild() {
		this.element.style.borderWidth = "1px";
		this.element.style.borderColor = this.analysis.color;
		this.element.style.borderStyle = "solid";
	}
	onSetColor(value) {
		this.element.style.borderColor = value;
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/rectangle/RectangleAnalysis.ts
var RectangleAnalysis = class RectangleAnalysis extends AbstractAreaAnalysis {
	getType() {
		return "rectangle";
	}
	static startAddingAtPoint(key, color, file, top, left) {
		const item = new RectangleAnalysis(key, color, file, top, left);
		/** Bottom right point needs to be active from the beginning */
		item.br.activate();
		return item;
	}
	static build(key, color, file, _top, _left, _right, _bottom) {
		const { top, left, width, height } = RectangleAnalysis.calculateDimensionsFromCorners(_top, _left, _right, _bottom);
		const item = new RectangleAnalysis(key, color, file, top, left, width, height);
		item.recalculateValues();
		return item;
	}
	buildArea(x, y, width, height) {
		if (width !== void 0 && height !== void 0) return new RectangleArea(this, x, y, x + width, y + height);
		return new RectangleArea(this, x, y, x, y);
	}
	getValues() {
		const fromX = this.left;
		const toX = this.left + this.width;
		const fromY = this.top;
		const toY = this.top + this.height;
		let min = Infinity;
		let max = -Infinity;
		let count = 0;
		let sum = 0;
		for (let y = fromY; y < toY; y++) {
			const rowOffset = this.file.width * y;
			for (let x = fromX; x <= toX; x++) {
				const point = this.file.pixels[rowOffset + x];
				if (point < min) min = point;
				if (point > max) max = point;
				sum += point;
				count++;
			}
		}
		return {
			min,
			max,
			avg: sum / count
		};
	}
	async getAnalysisData() {
		return await this.file.reader.rectAnalysisData(this.left, this.top, this.width, this.height);
	}
};
//#endregion
//#region src/properties/analysis/analysis/storage/AnalysisLayersStorage.ts
const availableAnalysisColors = [
	"Blue",
	"Red",
	"Lightblue",
	"Green",
	"Brown",
	"Yellow",
	"Navy",
	"Pink",
	"DarkGoldenRod",
	"GreenYellow",
	"SpringGreen",
	"SkyBlue"
];
var AnalysisLayersStorage = class extends Map {
	drive;
	/** Array of all layers ordered from oldest to the newest */
	layers = [];
	/** Get the slots driver */
	get slots() {
		return this.drive.parent.slots;
	}
	/** Array of all analysis ordered from the oldest to the newest. */
	get all() {
		return this.layers;
	}
	/** Array of all active analysis ordered from the oldest to the newest. */
	get selectedOnly() {
		return this.all.filter((analysis) => analysis.selected === true);
	}
	/** Fired whenever an analysis is added @deprecated */
	onAdd = new CallbacksManager();
	/** Fired whenever an analysis is removed @deprecated */
	onRemove = new CallbacksManager();
	/** Fired whenever the selection list changes */
	onSelectionChange = new CallbacksManager();
	/** Fired whenever a serialisable change occurs:
	* - added
	* - removed
	* - moved/resized
	* - updated 
	*/
	onAnySerializableChange = new CallbacksManager();
	/** Array of available colors */
	colors = availableAnalysisColors;
	constructor(drive) {
		super();
		this.drive = drive;
	}
	/**
	* Internal method for adding analyses
	* - adds it locally
	* - assign its slot if needed
	* - update the layers container
	* - call the analysis add function
	*/
	addAnalysis(analysis, slotNumber) {
		if (this.has(analysis.key)) this.removeAnalysis(analysis.key);
		analysis.setColor(analysis.initialColor);
		this.set(analysis.key, analysis);
		this.layers = [...this.layers, analysis];
		const slotNum = slotNumber === true ? this.slots.getNextFreeSlotNumber() : slotNumber === false ? void 0 : slotNumber;
		if (slotNum !== void 0) this.slots.assignAnalysisToSlot(slotNum, analysis);
		this.onAdd.call(analysis, this.all);
		this.onAnySerializableChange.call(analysis, 0);
		this.drive.dangerouslySetValueFromStorage(this.all);
		return this;
	}
	/**
	* Removes an analysis by its key
	* - removes the assigned slot
	* - updates the layers container
	* - call the analysis remove function
	*/
	removeAnalysis(key) {
		if (this.has(key)) {
			const analysis = this.get(key);
			if (analysis) {
				this.slots.unassignAnalysisFromItsSlot(analysis);
				analysis.destroyDom();
				this.delete(key);
				this.layers = this.layers.filter((analysis) => analysis.key !== key);
				this.drive.dangerouslySetValueFromStorage(this.all);
				this.onRemove.call(key);
				this.onAnySerializableChange.call(analysis, 1);
			}
		}
	}
	/** This is the proper way to remove all analyses */
	removeAllAnalyses() {
		this.forEach((analysis) => {
			this.removeAnalysis(analysis.key);
		});
	}
	/** 
	* Create a rectangular analysis in the given position and start editing it. 
	*/
	createRectFrom(top, left) {
		const newAnalysis = RectangleAnalysis.startAddingAtPoint(this.getNextName("Rectangle"), this.getNextColor(), this.drive.parent, top, left);
		this.addAnalysis(newAnalysis, false);
		return newAnalysis;
	}
	/** 
	* Place an ellyptical analysis at the given position, providing optionally its color & slot number
	*/
	placeRectAt(name, top, left, right, bottom, color, slotNumber) {
		const newAnalysis = RectangleAnalysis.build(name, color ?? this.getNextColor(), this.drive.parent, top, left, right, bottom);
		newAnalysis.setReady();
		this.addAnalysis(newAnalysis, slotNumber);
		return newAnalysis;
	}
	/** 
	* Create an ellyptical analysis in the given position and start editing it 
	*/
	createEllipsisFrom(top, left) {
		const newAnalysis = EllipsisAnalysis.startAddingAtPoint(this.getNextName("Ellipsis"), this.getNextColor(), this.drive.parent, top, left);
		this.addAnalysis(newAnalysis, false);
		return newAnalysis;
	}
	/** 
	* Build an ellyptical analysis at the given position. 
	*/
	placeEllipsisAt(name, top, left, right, bottom, color, slotNumber) {
		const newAnalysis = EllipsisAnalysis.build(name, color ?? this.getNextColor(), this.drive.parent, top, left, right, bottom);
		newAnalysis.setReady();
		this.addAnalysis(newAnalysis, slotNumber);
		return newAnalysis;
	}
	/**
	* Create a new point analysis at the given position
	* @returns 
	*/
	createPointAt(top, left) {
		const newAnalysis = PointAnalysis.addAtPoint(this.getNextName("Point"), this.getNextColor(), this.drive.parent, top, left);
		this.addAnalysis(newAnalysis, true);
		return newAnalysis;
	}
	/** 
	* Build a point analysis at the given position, providing optionally its color & slot number 
	*/
	placePointAt(name, top, left, color, slotNumber) {
		const newAnalysis = PointAnalysis.addAtPoint(name, color ?? this.getNextColor(), this.drive.parent, top, left);
		newAnalysis.setReady();
		this.addAnalysis(newAnalysis, slotNumber);
		return newAnalysis;
	}
	/**
	* Mark all analyses as selected
	*/
	selectAll() {
		this.all.filter((analysis) => {
			if (analysis.selected === false) analysis.setSelected(false, false);
		});
		this.onSelectionChange.call(this.selectedOnly);
	}
	/**
	* Mark all analyses as deselected
	*/
	deselectAll() {
		this.selectedOnly.forEach((analysis) => {
			analysis.setDeselected(false);
		});
		this.onSelectionChange.call(this.selectedOnly);
	}
	/** Get color for the next analysis */
	getNextColor() {
		const usedColors = this.all.map((analysis) => analysis.initialColor);
		const availableColors = availableAnalysisColors.filter((color) => !usedColors.includes(color));
		if (availableColors.length > 0) return availableColors[0];
		else return availableAnalysisColors[0];
	}
	/** Get name for the next analysis. The number is the lowest one not occupied by an existing analysis of the same type. */
	getNextName(type) {
		let index = this.all.length;
		while (this.has(`${type} ${index}`)) index++;
		return `${type} ${index}`;
	}
};
//#endregion
//#region src/properties/analysis/analysis/storage/AnalysisPointsAccessor.ts
/** Access list of points from analysis layers */
var AnalysisPointsAccessor = class {
	drive;
	constructor(drive) {
		this.drive = drive;
	}
	/** Get all points from all layers */
	get all() {
		return this.extractPointsFromLayers(this.drive.layers.all);
	}
	/** Get all points from selected layers */
	get allInSelectedLayers() {
		return this.extractPointsFromLayers(this.drive.layers.selectedOnly);
	}
	/** Get only active points from selected layers */
	get activeInSelectedLayers() {
		return this.extractPointsFromLayers(this.drive.layers.selectedOnly, true);
	}
	/** Extract points from all provided layers */
	extractPointsFromLayers(layers, activeOnly = false) {
		return layers.reduce((state, current) => {
			const currentPoints = activeOnly ? current.arrayOfActivePoints : current.arrayOfPoints;
			return [...state, ...currentPoints];
		}, []);
	}
};
//#endregion
//#region src/properties/analysis/analysis/AnalysisDrive.ts
var AnalysisDrive = class extends AbstractProperty {
	layers = new AnalysisLayersStorage(this);
	points = new AnalysisPointsAccessor(this);
	listener;
	/** Alias of the current `ToolDrive` value. */
	get currentTool() {
		return this.parent.group.tool.value;
	}
	/** Cached listener on `this.listenerLayerContainer` - pointermove event. */
	bindedPointerMoveListener;
	/** Cached listener on `this.listenerLayerContainer` - pointerdown event. */
	bindedPointerDownListener;
	/** Cached listener on `this.listenerLayerContainer` - pointerup event. */
	bindedPointerUpListener;
	/** 
	* Value of this drive is stored in `AnalysisLayersStorage` and from there, it is mirrored to the drive.
	* It is better to add listeners to the storage, not to the drive.
	*/
	dangerouslySetValueFromStorage(value) {
		this.value = value;
	}
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	/** Calculate the top/left position from a `MouseEvent` */
	getRelativePosition(event) {
		if (!this.listener) return {
			top: 0,
			left: 0
		};
		const absoluteWidth = this.listener.clientWidth;
		const fileWidth = this.parent.width;
		const xAspect = event.layerX / absoluteWidth;
		const x = Math.round(fileWidth * xAspect);
		const absoluteHeight = this.listener.clientHeight;
		const fileHeight = this.parent.height;
		const yAspect = event.layerY / absoluteHeight;
		return {
			top: Math.round(fileHeight * yAspect),
			left: x
		};
	}
	/** 
	* Activate the DOM listeners for the current drive on the file's listener layer. 
	*/
	activateListeners(container) {
		this.listener = container;
		this.bindedPointerMoveListener = (event) => {
			const position = this.getRelativePosition(event);
			this.points.all.forEach((point) => {
				if (point.active) this.currentTool.onPointMove(point, position.top, position.left);
				const pointIsUnderCursor = point.isWithin(position.top, position.left);
				if (pointIsUnderCursor) this.currentTool.onPointEnter(point);
				else if (!pointIsUnderCursor) this.currentTool.onPointLeave(point);
			});
		};
		this.bindedPointerDownListener = (event) => {
			const position = this.getRelativePosition(event);
			this.currentTool.onCanvasClick(position.top, position.left, this.parent);
			this.points.all.forEach((point) => {
				if (point.isWithin(position.top, position.left)) this.currentTool.onPointDown(point);
			});
		};
		this.bindedPointerUpListener = () => {
			this.points.all.forEach((point) => {
				this.currentTool.onPointUp(point);
			});
		};
		this.listener.addEventListener("pointermove", this.bindedPointerMoveListener);
		this.listener.addEventListener("pointerdown", this.bindedPointerDownListener);
		this.listener.addEventListener("pointerup", this.bindedPointerUpListener);
	}
	/** Remove all listeners from the file's listener layer */
	deactivateListeners() {
		if (this.bindedPointerMoveListener && this.listener) this.listener.removeEventListener("pointermove", this.bindedPointerMoveListener);
		if (this.bindedPointerDownListener && this.listener) this.listener.removeEventListener("pointerdown", this.bindedPointerDownListener);
		if (this.bindedPointerUpListener && this.listener) this.listener.removeEventListener("pointerup", this.bindedPointerUpListener);
	}
};
//#endregion
//#region src/properties/analysis/data/graphs/AnalysisGraphsStorage.ts
var AnalysisGraphsStorage = class {
	drive;
	listenerKey = "___listen-to-graphs___";
	get layers() {
		return this.drive.parent.analysis.layers;
	}
	_graphs = /* @__PURE__ */ new Map();
	get graphs() {
		return this._graphs;
	}
	addGraph(graph) {
		this._graphs.set(graph.analysis.key, graph);
		this.onAddGraph.call(graph);
	}
	removeGraph(graph) {
		this._graphs.delete(graph);
		this.onRemoveGraph.call(graph);
	}
	_output = {
		values: [[]],
		colors: []
	};
	get output() {
		return this._output;
	}
	set output(output) {
		this._output = output;
		this.onOutput.call(output);
	}
	onOutput = new CallbacksManager();
	onAddGraph = new CallbacksManager();
	onRemoveGraph = new CallbacksManager();
	constructor(drive) {
		this.drive = drive;
		this.layers.onAdd.set(this.listenerKey, async (layer) => {
			const item = layer.graph;
			this.addGraph(item);
			item.onAnalysisSelection.set(this.listenerKey, async () => {
				this.refreshOutput();
			});
			item.onGraphActivation.set(this.listenerKey, async () => {
				this.refreshOutput();
			});
			item.onGraphData.set(this.listenerKey, async () => {
				this.refreshOutput();
			});
			item.analysis.onSetName.set(this.listenerKey, () => {
				this.refreshOutput();
			});
		});
		this.layers.onRemove.set(this.listenerKey, async (layer) => {
			this.removeGraph(layer);
			this.refreshOutput();
		});
	}
	refreshOutput() {
		const output = {
			values: [["Time"]],
			colors: []
		};
		this.graphs.forEach((graph) => {
			output.values[0].push(...graph.getGraphLabels());
			output.colors.push(...graph.getGraphColors());
		});
		this.graphs.forEach((graph) => {
			if (graph.hasDataToPrint()) {
				if (graph.value) Object.keys(graph.value).forEach((key, index) => {
					let row = output.values[index + 1];
					if (row === void 0) {
						const date = /* @__PURE__ */ new Date();
						date.setTime(parseInt(key));
						row = [date];
						output.values[index + 1] = row;
					}
					row.push(...graph.getDtaAtTime(parseInt(key)));
				});
			}
		});
		this.output = output;
		return output;
	}
	hasGraph() {
		return Object.values(this.graphs).find((graph) => graph.hasDataToPrint()).length > 0;
	}
	generateExportData() {
		const dataBuffer = {};
		const header = [
			{
				key: "time_relative",
				displayLabel: "Relative Time"
			},
			{
				key: "time_absolute",
				displayLabel: "Absolute Time"
			},
			{
				key: "millisecondy",
				displayLabel: "Milliseconds"
			},
			{
				key: "timestamp",
				displayLabel: "Timestamp"
			}
		];
		for (const graph of this.graphs.values()) {
			const labels = graph.getGraphLabels();
			for (const label of labels) header.push({
				key: label,
				displayLabel: `${label} (${graph.analysis.initialColor}, ${graph.analysis.width} x ${graph.analysis.height} px)`
			});
			if (graph.value) Object.keys(graph.value).forEach((key) => {
				if (!Object.keys(dataBuffer).includes(key)) {
					const timestamp_relative = parseInt(key);
					const timestamp_absolute = timestamp_relative + graph.analysis.file.timestamp;
					dataBuffer[key] = {
						[header[0].key]: format(timestamp_relative, "m:ss:SSS") + " ",
						[header[1].key]: format(timestamp_absolute, "d. M.y m:ss:SSS") + " ",
						[header[2].key]: timestamp_relative,
						[header[3].key]: timestamp_absolute
					};
				}
				const values = graph.getDtaAtTime(parseInt(key));
				labels.forEach((label, index) => {
					dataBuffer[key][label] = values[index];
				});
			});
		}
		return {
			header,
			data: Object.values(dataBuffer)
		};
	}
};
//#endregion
//#region src/properties/analysis/data/AnalysisDataState.ts
/** Stores the data of all analysis. Purpose: store data for the purpose of graph. The graph data format is constructed for Google Charts webcomponent. */
var AnalysisDataState = class extends AbstractProperty {
	_hasActiveGraphs = false;
	get hasActiveGraphs() {
		return this._hasActiveGraphs;
	}
	onGraphsPresence = new CallbacksManager();
	listeners = new AnalysisGraphsStorage(this);
	constructor(parent) {
		super(parent, {
			values: [[]],
			colors: []
		});
		this.listeners.onOutput.set("__mirror_output_to_local_state", async (output) => {
			this.value = output;
			if (output.colors.length > 0) {
				if (!this.hasActiveGraphs) {
					this._hasActiveGraphs = true;
					this.onGraphsPresence.call(true);
				}
			} else if (this.hasActiveGraphs) {
				this._hasActiveGraphs = false;
				this.onGraphsPresence.call(false);
			}
		});
	}
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	dangerouslyUpdateValue(value) {
		this.value = value;
	}
	/** Assamble the current analysis data and download them as CSV directly. */
	downloadData() {
		const { data, header } = this.listeners.generateExportData();
		const csvConfig = mkConfig({
			fieldSeparator: ";",
			filename: `analysis_${this.parent.fileName}_${Date.now()}.csv`,
			columnHeaders: header
		});
		const csv = generateCsv(csvConfig)(data);
		download(csvConfig)(csv);
	}
	async updateAllAnalysesValues() {
		const instance = this.parent;
		try {
			const analysis = instance.analysis.value.map((a) => {
				if (a instanceof PointAnalysis) return [
					a.getType(),
					a.key,
					a.top,
					a.left,
					1,
					1
				];
				return [
					a.getType(),
					a.key,
					a.top,
					a.left,
					a.width,
					a.height
				];
			});
			(await instance.pool.exec(async (width, height, pixels, analysis) => {
				const buffer = analysis.map((a) => {
					return {
						id: a[1],
						type: a[0],
						min: { value: Infinity },
						max: { value: -Infinity },
						avg: {
							value: 0,
							sum: 0,
							count: 0
						}
					};
				});
				for (let x = 0; x < width; x++) for (let y = 0; y < height; y++) {
					const rawTemperature = pixels[x + y * width];
					const isWithin = (x, y, la, ta, wa, ha) => {
						const centerX = la + wa / 2;
						const centerY = ta + ha / 2;
						const normalizedX = (x - centerX) / (wa / 2);
						const normalizedY = (y - centerY) / (ha / 2);
						return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
					};
					/**
					* Process the analysis
					*/
					analysis.forEach((a, index) => {
						const bufferValue = buffer[index];
						const type = a[0];
						const top = a[2];
						const left = a[3];
						const w = a[4];
						const h = a[5];
						if (type === "point") {
							if (x === left && y === top) bufferValue.avg.value = rawTemperature;
						} else if (type === "rectangle") {
							if (x >= left && x < left + w && y >= top && y < top + h) {
								if (rawTemperature < bufferValue.min.value) bufferValue.min.value = rawTemperature;
								if (rawTemperature > bufferValue.max.value) bufferValue.max.value = rawTemperature;
								bufferValue.avg.count = bufferValue.avg.count + 1;
								bufferValue.avg.sum = bufferValue.avg.sum + rawTemperature;
							}
						} else if (type === "ellipsis") {
							if (isWithin(x, y, left, top, width, height)) {
								if (rawTemperature < bufferValue.min.value) bufferValue.min.value = rawTemperature;
								if (rawTemperature > bufferValue.max.value) bufferValue.max.value = rawTemperature;
								bufferValue.avg.count = bufferValue.avg.count + 1;
								bufferValue.avg.sum = bufferValue.avg.sum + rawTemperature;
							}
						}
					});
				}
				return { stats: buffer.map((a) => {
					return {
						id: a.id,
						min: a.min.value !== Infinity ? a.min.value : void 0,
						max: a.max.value !== -Infinity ? a.max.value : void 0,
						avg: a.type === "point" ? a.avg.value : a.avg.sum / a.avg.count
					};
				}) };
			}, [
				instance.width,
				instance.height,
				instance.pixels,
				analysis
			], {})).stats.forEach((a) => {
				instance.analysis.layers.get(a.id)?.dangerouslySetValues(a.avg, a.min, a.max);
			});
		} catch (error) {
			if (error instanceof Error) console.error(error);
		}
	}
};
//#endregion
//#region src/properties/analysis/slots/AnalysisSlot.ts
/** 
* Analysis slot takes care of serialisation
* 
* Slot is an independent object that applies on the first 7 analysis.
* All the serialisation is perfoemed here. An analysis does not know
* about its slots at all.
* 
* One analysis may be in one slot only. Never in two slots.
*/
var AnalysisSlot = class {
	slot;
	_analysis;
	get analysis() {
		return this._analysis;
	}
	_serialized;
	get serialized() {
		return this._serialized;
	}
	/** @deprecated Serialisation is emitted by the driver. This emitter is used mainly in tests, but not elsewhere. */
	onSerialize = new CallbacksManager();
	/** Serialisation is done in the next tick */
	enqueuedSerialisation;
	constructor(slot, analysis) {
		this.slot = slot;
		this._analysis = analysis;
		this.hydrate(analysis);
		this._serialized = this.analysis.toSerialized();
		this.propagateSerialisationUp(this._serialized);
	}
	/** Generate the listener key for this slot */
	listenerKey(operation) {
		return `slot ${this.slot} ${operation}`;
	}
	/** Remove all listeners created by this slot */
	dehydrate(analysis) {
		analysis.onSerializableChange.delete(this.listenerKey("serializable change"));
	}
	/** Add all listeners to the analysis object */
	hydrate(analysis) {
		analysis.onSerializableChange.set(this.listenerKey("serializable change"), () => {
			this.enqueueSerialisation();
		});
	}
	enqueueSerialisation() {
		if (!this.enqueuedSerialisation) this.enqueuedSerialisation = setTimeout(() => {
			this.serialize();
			this.enqueuedSerialisation = void 0;
		}, 0);
	}
	serialize() {
		this._serialized = this.analysis.toSerialized();
		this.onSerialize.call(this._serialized, this.analysis);
		this.propagateSerialisationUp(this._serialized);
	}
	recieveSerialized(serialized) {
		this.analysis.recievedSerialized(serialized);
		/** Serialize again for control */
		const newSerialized = this.analysis.toSerialized();
		if (newSerialized !== serialized) {
			this._serialized = newSerialized;
			this.onSerialize.call(this._serialized, this.analysis);
		}
	}
	/** Call global and particular callbacks */
	propagateSerialisationUp(value) {
		const manager = this.analysis.file.slots.getOnSerializeManager(this.slot);
		if (manager) {
			manager.call(value);
			this.analysis.file.slots.markAsChanged();
		}
	}
};
//#endregion
//#region src/properties/analysis/slots/AnalysisSlotsDrive.ts
/**
* Create up to 7 slots for analysis of the image.
* 
* Value of this property is a map.
*/
var AnalysisSlotsState = class AnalysisSlotsState extends AbstractProperty {
	static MAX_SLOTS = 7;
	/** Callback called every time any slot changes */
	onAnySlotChanged = new CallbacksManager();
	_onAnySlotChangedTimeout;
	/** Mark the status as changed and emit the event in the folowing subsequent tick */
	markAsChanged() {
		if (this._onAnySlotChangedTimeout) clearTimeout(this._onAnySlotChangedTimeout);
		this._onAnySlotChangedTimeout = setTimeout(() => {
			this.onAnySlotChanged.call();
			this._onAnySlotChangedTimeout = void 0;
		}, 0);
	}
	onSlot1Assignement = new CallbacksManager();
	onSlot2Assignement = new CallbacksManager();
	onSlot3Assignement = new CallbacksManager();
	onSlot4Assignement = new CallbacksManager();
	onSlot5Assignement = new CallbacksManager();
	onSlot6Assignement = new CallbacksManager();
	onSlot7Assignement = new CallbacksManager();
	onSlot1Serialize = new CallbacksManager();
	onSlot2Serialize = new CallbacksManager();
	onSlot3Serialize = new CallbacksManager();
	onSlot4Serialize = new CallbacksManager();
	onSlot5Serialize = new CallbacksManager();
	onSlot6Serialize = new CallbacksManager();
	onSlot7Serialize = new CallbacksManager();
	/** 
	* Calculate the next free slot number 
	*/
	getNextFreeSlotNumber() {
		for (let i = 1; i <= AnalysisSlotsState.MAX_SLOTS; i++) if (!this.hasSlot(i)) return i;
	}
	/**
	* Assign an analysis to a given slot number
	*/
	assignAnalysisToSlot(slot, analysis) {
		if (this.getSlot(slot) !== void 0) this.removeSlotAndAnalysis(slot);
		const analysisSlot = this.getAnalysisSlot(analysis);
		if (analysisSlot !== void 0) this.unassignAnalysisFromItsSlot(this.getSlot(analysisSlot).analysis);
		const value = new AnalysisSlot(slot, analysis);
		this.value.set(slot, value);
		const assignementManager = this.getOnAssignementManager(slot);
		const serialisationManager = this.getOnSerializeManager(slot);
		if (assignementManager) assignementManager.call(value);
		if (serialisationManager) serialisationManager.call(value.serialized);
		this.callAllListenersWithCurrentValue();
		return value;
	}
	/** Does this instance have an analyasis on the given slot number? */
	hasSlot(slot) {
		return this.value.has(slot);
	}
	/** Get a slot control object by its number */
	getSlot(slot) {
		return this.value.get(slot);
	}
	/**
	* Calculate a full map of slots including empty ones as undefined values
	* 
	* The value of this drive contains only assigned slots, therefore this method contains the entire map of slots from 1 to 7. Beware, this operation is expensive since it creates a new map object and should not be used often.
	*/
	getFullSlotsMap() {
		const map = /* @__PURE__ */ new Map();
		[
			1,
			2,
			3,
			4,
			5,
			6,
			7
		].forEach((number) => {
			if (this.hasSlot(number)) map.set(number, this.getSlot(number));
			else map.set(number, void 0);
		});
		return map;
	}
	/** 
	* Get the number of the slot assigned to a given analysis 
	*/
	getAnalysisSlot(analysis) {
		for (const a of this.value.values()) if (a.analysis.key === analysis.key) return a.slot;
	}
	/**
	* Completely remove the slot and also the corresponding analysis
	*/
	removeSlotAndAnalysis(slot) {
		const value = this.value.get(slot);
		if (value) {
			const analysis = value.analysis;
			this.emitOnAssignement(slot, void 0);
			this.value.delete(slot);
			this.parent.analysis.layers.removeAnalysis(analysis.key);
			this.callAllListenersWithCurrentValue();
		}
	}
	/**
	* Remove a slot that is assigned to a given analysis, but keep the analysis 
	*/
	unassignAnalysisFromItsSlot(analysis) {
		for (const a of this.value.values()) if (a.analysis.key === analysis.key) {
			this.emitOnAssignement(a.slot, void 0);
			this.value.delete(a.slot);
			if (this.parent.group.analysisSync.value === true) this.parent.group.analysisSync.deleteSlot(this.parent, a.slot);
			this.callAllListenersWithCurrentValue();
		}
	}
	/** 
	* Create an analysis from a serialized state on a given slot
	*/
	createAnalysisFromSerialized(serialized, slotNumber) {
		const splitted = serialized.split(";").map((segment) => segment.trim());
		if (splitted.length < 2) return;
		const name = splitted[0] !== void 0 && splitted[0].length > 0 ? splitted[0] : void 0;
		if (name === void 0) return;
		const type = splitted[1];
		if (![
			"rectangle",
			"ellipsis",
			"point"
		].includes(type)) return;
		let top = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "top");
		let left = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "left");
		const color = AbstractAnalysis.serializedGetStringValueByKey(splitted, "color");
		let width = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "width");
		let height = AbstractAnalysis.serializedGetNumericalValueByKey(splitted, "height");
		const avg = AbstractAnalysis.serializedSegmentsHasExact(splitted, "avg");
		const min = AbstractAnalysis.serializedSegmentsHasExact(splitted, "min");
		const max = AbstractAnalysis.serializedSegmentsHasExact(splitted, "max");
		if (top !== void 0) {
			if (top < 0) top = 0;
			if (top > this.parent.height - 1) top = this.parent.height - 1;
		}
		if (left !== void 0) {
			if (left < 0) left = 0;
			if (left > this.parent.width - 1) left = this.parent.width - 1;
		}
		let analysis;
		if (type === "point") {
			if (top === void 0 || left === void 0) return;
			analysis = this.parent.analysis.layers.placePointAt(name, top, left, color, false);
		} else {
			if (top === void 0 || left === void 0 || width === void 0 || height === void 0) return;
			if (width < 0) width = 0;
			if (width + left > this.parent.width - 1) width = this.parent.width - left - 1;
			if (height < 0) height = 0;
			if (height + top > this.parent.height - 1) height = this.parent.height - top - 1;
			analysis = type === "rectangle" ? this.parent.analysis.layers.placeRectAt(name, top, left, width + left, height + top, color, false) : this.parent.analysis.layers.placeEllipsisAt(name, top, left, width + left, height + top, color, false);
		}
		if (analysis !== void 0) {
			if (analysis instanceof PointAnalysis) {
				if (avg) analysis.graph.setAvgActivation(true);
			} else if (analysis instanceof AbstractAreaAnalysis) {
				if (avg) analysis.graph.setAvgActivation(true);
				if (min) analysis.graph.setMinActivation(true);
				if (max) analysis.graph.setMaxActivation(true);
			}
			if (slotNumber === false) {} else if (slotNumber === true) {
				const nextFreeSlot = this.getNextFreeSlotNumber();
				if (nextFreeSlot !== void 0) this.assignAnalysisToSlot(nextFreeSlot, analysis);
			} else if (slotNumber !== void 0) this.assignAnalysisToSlot(slotNumber, analysis);
			return analysis;
		}
	}
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	/** 
	* Whenever a slot is assigned, call both particular and general listeners 
	*/
	emitOnAssignement(slot, value) {
		const assignement = this.getOnAssignementManager(slot);
		if (assignement) assignement.call(value);
		const serialization = this.getOnSerializeManager(slot);
		if (serialization) serialization.call(value ? value.serialized : void 0);
	}
	/**
	* Get a callback manager that is triggered upon a slot serialisation
	*/
	getOnSerializeManager(slot) {
		if (slot === 1) return this.onSlot1Serialize;
		else if (slot === 2) return this.onSlot2Serialize;
		else if (slot === 3) return this.onSlot3Serialize;
		else if (slot === 4) return this.onSlot4Serialize;
		else if (slot === 5) return this.onSlot5Serialize;
		else if (slot === 6) return this.onSlot6Serialize;
		else if (slot === 7) return this.onSlot7Serialize;
	}
	/**
	* Get a callback manager that is triggered whenever a slot is assigned
	*/
	getOnAssignementManager(slot) {
		if (slot === 1) return this.onSlot1Assignement;
		else if (slot === 2) return this.onSlot2Assignement;
		else if (slot === 3) return this.onSlot3Assignement;
		else if (slot === 4) return this.onSlot4Assignement;
		else if (slot === 5) return this.onSlot5Assignement;
		else if (slot === 6) return this.onSlot6Assignement;
		else if (slot === 7) return this.onSlot7Assignement;
	}
	/**
	* Get value of a given slot
	*/
	getSlotValue(slot) {
		if (this.hasSlot(slot)) return this.getSlot(slot)?.serialized;
	}
	/** 
	* Call a function on every existing slot skipping empty slots. 
	*/
	forEveryExistingSlot(fn) {
		for (let i = 1; i <= 7; i++) {
			const slot = this.getSlot(i);
			if (slot) fn(slot, i);
		}
	}
};
//#endregion
//#region src/properties/cursor/CursorValueDrive.ts
var CursorValueDrive = class extends AbstractProperty {
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	recalculateFromCursor(position) {
		if (position) this.value = this._getValueAtCoordinate(position.x, position.y);
	}
	_getValueAtCoordinate(x, y) {
		if (x === void 0 || y === void 0 || x === this.parent.meta.width || y === this.parent.meta.height) return;
		const index = x + y * this.parent.meta.width;
		return this.parent.pixels[index];
	}
};
//#endregion
//#region src/properties/time/playback/internals/FrameBuffer.ts
var FrameBuffer = class {
	drive;
	/** @internal use accessors to get and set with side effects */
	_currentFrame;
	/** The current frame data @readonly */
	get currentFrame() {
		return this._currentFrame;
	}
	/** Upon every update of current frame, propagate current pixels to the instance */
	set currentFrame(frame) {
		this._currentFrame = frame;
		this.drive.parent.setPixels(this.currentFrame.pixels);
	}
	/** Get the current step value calculated from _currentFrame */
	get currentStep() {
		return this.drive.stepsByAbsolute.get(this._currentFrame.timestamp);
	}
	/** Number of images to preload at once */
	bufferSize = 3;
	/** The actual buffer holding pair of step & frame */
	buffer = /* @__PURE__ */ new Map();
	/** Accessor to array of steps preloaded in the given moment */
	get preloadedSteps() {
		return Array.from(this.buffer.keys());
	}
	/** Accessor to array of relative timestamps preloaded in the given moment */
	get preloadedTimestampsRelative() {
		return this.preloadedSteps.map((step) => step.relative);
	}
	constructor(drive, firstFrame) {
		this.drive = drive;
		this.currentFrame = firstFrame;
	}
	async init() {
		return await this.preloadAfterFrameSet(this.currentStep);
	}
	/**
	* Activate a step
	* - look for the buffer for the corresponding frame
	* - if there is a corresponding frame, apply it
	* - if there is none, fetch it
	* - if sequence, fetch buffer
	* 
	* **THIS IS THE MAIN SETTER**
	*/
	async recieveStep(step) {
		let frame = this.buffer.get(step);
		if (frame === void 0) frame = await this.drive.parent.reader.frameData(step.index);
		this.currentFrame = frame;
		return await this.preloadAfterFrameSet(step);
	}
	/** Preload frame data to the buffer based on the provided step */
	async preloadAfterFrameSet(step) {
		const subsetStart = step.index + 1 < this.drive.relativeSteps.length ? step.index + 1 : NaN;
		const subsetEnd = isNaN(subsetStart) ? NaN : this.drive._validateIndex(subsetStart + this.bufferSize);
		if (isNaN(subsetStart) || isNaN(subsetEnd) || subsetStart > subsetEnd || subsetStart === subsetEnd) {
			if (step.relative === this.drive.parent.duration) this.buffer.clear();
			return {
				absoluteTime: this.drive.currentStep.absolute,
				relativeTime: this.drive.value,
				currentFrame: this.currentFrame,
				currentStep: this.currentStep,
				buffer: this.preloadedSteps,
				preloaded: false,
				hasChanged: true
			};
		}
		const stepsThatShouldBe = Array.from(this.drive.stepsByIndex.values()).filter((step) => {
			return step.index >= subsetStart && step.index < subsetEnd;
		});
		const newSteps = stepsThatShouldBe.filter((step) => !this.preloadedSteps.includes(step));
		(await Promise.all(newSteps.map((step) => {
			return this.drive.parent.reader.frameData(step.index);
		}))).forEach((frame, index) => {
			const step = newSteps[index];
			this.buffer.set(step, frame);
		});
		this.preloadedSteps.forEach((step) => {
			if (!stepsThatShouldBe.includes(step)) this.buffer.delete(step);
		});
		return {
			absoluteTime: this.drive.currentStep.absolute,
			currentFrame: this.currentFrame,
			currentStep: this.currentStep,
			relativeTime: this.drive.value,
			buffer: this.preloadedSteps,
			preloaded: true,
			hasChanged: true
		};
	}
};
//#endregion
//#region src/properties/time/playback/TimelineDrive.ts
const playbackSpeed = {
	1: 1,
	.5: 2,
	2: .5,
	3: .333333333333,
	5: .25,
	10: .1
};
/** Stores the frames and the time pointer which is in the miliseconds */
var TimelineDrive = class extends AbstractProperty {
	steps;
	_playbackSpeed = 1;
	get playbackSpeed() {
		return this._playbackSpeed;
	}
	set playbackSpeed(value) {
		this._playbackSpeed = value;
		this.callbackdPlaybackSpeed.call(this._playbackSpeed);
	}
	get playbackSpeedAspect() {
		return playbackSpeed[this.playbackSpeed];
	}
	onFrame = new CallbacksManager();
	get duration() {
		return this.parent.duration;
	}
	get frameCount() {
		return this.steps.length;
	}
	startTimestampRelative;
	/** @deprecated not in use? */
	endTimestampRelative;
	stepsByAbsolute = /* @__PURE__ */ new Map();
	stepsByRelative = /* @__PURE__ */ new Map();
	stepsByIndex = /* @__PURE__ */ new Map();
	relativeSteps = [];
	_currentStep;
	get currentStep() {
		return this._currentStep;
	}
	isSequence;
	_isPlaying = false;
	get isPlaying() {
		return this._isPlaying;
	}
	timer;
	buffer;
	callbackdPlaybackSpeed = new CallbacksManager();
	callbacksPlay = new CallbacksManager();
	callbacksPause = new CallbacksManager();
	callbacksStop = new CallbacksManager();
	callbacksEnd = new CallbacksManager();
	callbacksChangeFrame = new CallbacksManager();
	get currentMs() {
		return this.currentStep.relative;
	}
	get currentPercentage() {
		return this._convertRelativeToPercent(this.currentStep.relative);
	}
	get currentFrameIndex() {
		return this.currentStep.index;
	}
	get currentTime() {
		return this.formatDuration(this.currentStep.relative);
	}
	get frames() {
		return this.parent.meta.current.timeline;
	}
	constructor(parent, initial, steps, initialFrameData) {
		super(parent, Math.max(Math.min(initial, steps.length), 0));
		this.steps = steps;
		this._currentStep = this.steps[this.valueInitial];
		this.startTimestampRelative = 0;
		this.endTimestampRelative = this.steps[this.steps.length - 1].relative;
		this.isSequence = this.parent.meta.current.timeline.length > 1;
		this.steps.forEach((step) => {
			this.stepsByIndex.set(step.index, step);
			this.stepsByAbsolute.set(step.absolute, step);
			this.stepsByRelative.set(step.relative, step);
			this.relativeSteps.push(step.relative);
		});
		this.buffer = new FrameBuffer(this, initialFrameData);
	}
	init() {
		this.buffer.init();
	}
	afterSetEffect() {
		this.onFrame.call(this._currentStep);
		if (this.steps.length === 1) return;
	}
	validate(value) {
		if (this.steps === void 0) return value;
		if (this.steps.length === 1) return 0;
		return this._validateRelativeTime(value);
	}
	_validateRelativeTime(value) {
		return Math.max(Math.min(value, this.steps[this.steps.length - 1].relative), 0);
	}
	_validateIndex(value) {
		return Math.max(Math.min(value, this.steps.length), 0);
	}
	_convertRelativeToAspect(relativeTimeInMs) {
		return relativeTimeInMs / this.duration;
	}
	_convertRelativeToPercent(relativeTimeInMs) {
		return this._convertRelativeToAspect(relativeTimeInMs) * 100;
	}
	_convertPercenttRelative(percent) {
		return this.duration * percent / 100;
	}
	formatDuration(ms) {
		const date = /* @__PURE__ */ new Date(0);
		date.setMilliseconds(ms);
		return format(date, "mm:ss:SSS");
	}
	next() {
		const next = this.findNextRelative(this.value);
		if (next) this.setRelativeTime(next.relative);
	}
	prev() {
		const prev = this.findPreviousRelative(this.value);
		this.setRelativeTime(prev.relative);
	}
	findPreviousOrThis(relativeTimeInMs) {
		if (this.stepsByRelative.has(relativeTimeInMs)) return this.stepsByRelative.get(relativeTimeInMs);
		return this.findPreviousRelative(relativeTimeInMs);
	}
	/**
	* Find previous frame by relative ms.
	*/
	findPreviousRelative(relativeTimeInMs) {
		if (this.steps.length === 1) return this.steps[0];
		relativeTimeInMs = this._validateRelativeTime(relativeTimeInMs);
		const aspect = this._convertRelativeToAspect(relativeTimeInMs);
		let index = Math.max(Math.ceil(aspect * this.steps.length) + 5, this.steps.length);
		let previous = void 0;
		while (index >= 0 && previous === void 0) {
			const step = this.stepsByIndex.get(index);
			if (step !== void 0) {
				if (step.relative < relativeTimeInMs) previous = step;
			}
			index = index - 1;
		}
		return previous !== void 0 ? previous : this.steps[0];
	}
	findNextRelative(relativeTimeInMs) {
		if (this.steps.length === 1) return this.steps[0];
		const aspect = this._convertRelativeToAspect(relativeTimeInMs);
		const index = Math.floor(aspect * this.steps.length) - 5;
		const subarrayStart = this._validateIndex(index);
		const subarrayEnd = this._validateIndex(index + 40);
		const frame = this.steps.slice(subarrayStart, subarrayEnd).find((f) => {
			return f.relative > relativeTimeInMs;
		});
		return frame !== void 0 ? frame : false;
	}
	async setRelativeTime(relativeTimeInMs) {
		relativeTimeInMs = this._validateRelativeTime(relativeTimeInMs);
		this.value = relativeTimeInMs;
		const currentStep = this.findPreviousOrThis(this.value);
		if (currentStep !== this._currentStep) {
			this._currentStep = currentStep;
			const result = await this.buffer.recieveStep(this._currentStep);
			this.callbacksChangeFrame.call(this._currentStep);
			return result;
		}
		return {
			absoluteTime: this._currentStep.absolute,
			relativeTime: this.value,
			currentStep: this._currentStep,
			currentFrame: this.buffer.currentFrame,
			buffer: [],
			preloaded: false,
			hasChanged: false
		};
	}
	async setValueByPercent(percent) {
		percent = Math.max(Math.min(percent, 100), 0);
		const convertedToRelativeTime = this._convertPercenttRelative(percent);
		return await this.setRelativeTime(convertedToRelativeTime);
	}
	/** This is the main play method */
	createNextStepTimer() {
		if (this.timer !== void 0) clearTimeout(this.timer);
		if (!this.isSequence || this._isPlaying === false) return;
		this.timer = setTimeout(() => {
			const next = this.findNextRelative(this._currentStep.relative);
			if (next) {
				this.value = next.relative;
				if (this._isPlaying) {
					this.value = next.relative;
					this._currentStep = next;
					this.buffer.recieveStep(next);
					this.callbacksChangeFrame.call(next);
					this.createNextStepTimer();
				}
			} else {
				this._isPlaying = false;
				this.callbacksEnd.call();
			}
		}, this._currentStep.offset * this.playbackSpeedAspect);
	}
	play() {
		if (this.steps.length > 1) {
			this._isPlaying = true;
			this.createNextStepTimer();
			this.callbacksPlay.call();
		}
	}
	pause() {
		this._isPlaying = false;
		clearTimeout(this.timer);
		this.callbacksPause.call();
	}
	stop() {
		this.pause();
		this.value = 0;
		this.callbacksStop.call();
	}
};
//#endregion
//#region src/properties/time/recording/RecordingDrive.ts
var RecordingDrive = class extends AbstractProperty {
	stream;
	recorder;
	mimeType;
	fileExt;
	_isRecording = false;
	_mayStop = true;
	get mayStop() {
		return this._mayStop;
	}
	set mayStop(value) {
		this._mayStop = value;
		this.callbackMayStop.call(this.mayStop);
	}
	recordedChunks = [];
	callbackMayStop = new CallbacksManager();
	validate(value) {
		return value;
	}
	afterSetEffect(value) {}
	start() {
		if (this.value === true) throw new Error("Recording already in process - can not start another one");
		const { stream, recorder } = this.initRecording();
		this.stream = stream;
		this.recorder = recorder;
		this.value = true;
		this.recorder.addEventListener("dataavailable", (event) => {
			if (event.data.size > 0) {
				this.recordedChunks.push(event.data);
				this.download();
				this.clearRecording();
			}
		});
		this.recorder.start();
	}
	end() {
		if (this.value === false) throw new Error("Recording has not started yet - can not end it!");
		if (this.recorder === void 0) throw new Error("Error ending recording - no MediaRecorder instance created.");
		this.recorder.stop();
		this.value = false;
		this.mayStop = true;
	}
	/** Records the entire file from start to the end. */
	async recordEntireFile() {
		if (this.value === true) throw new Error("Already recording the entire file. Can not start until the current recording ends.");
		await this.parent.timeline.setValueByPercent(0);
		this.mayStop = false;
		const cllbackId = "recording entire file";
		this.parent.timeline.callbacksEnd.add(cllbackId, () => {
			this.end();
			this.parent.timeline.callbacksEnd.delete(cllbackId);
		});
		this.parent.timeline.play();
		this.start();
	}
	getOutputMimeType() {
		let value = void 0;
		for (const t of [
			{
				mime: "video/webm;codecs=vp9",
				ext: "webm"
			},
			{
				mime: "video/webm;codecs=vp8",
				ext: "webm"
			},
			{
				mime: "video/webm;codecs=vp9,opus",
				ext: "webm"
			},
			{
				mime: "video/webm;codecs=vp8,opus",
				ext: "webm"
			},
			{
				mime: "video/webm",
				ext: "webm"
			},
			{
				mime: "video/mp4;codecs=h264",
				ext: "mp4"
			},
			{
				mime: "video/mp4",
				ext: "mp4"
			}
		]) if (MediaRecorder.isTypeSupported(t.mime)) value = t;
		return value;
	}
	initRecording() {
		if (this.stream || this.recorder) throw new Error("Recording was already initialised! Can not initialise it again until it stops!");
		const canvasLayer = this.parent.dom?.canvasLayer;
		if (!canvasLayer) throw new Error("Canvas layer not found - can not initialise recording.");
		const stream = canvasLayer.canvas.captureStream(25);
		const output = this.getOutputMimeType();
		if (output === void 0) throw new Error("No supported mime type found for MediaRecorder!");
		this.mimeType = output.mime;
		this.fileExt = output.ext;
		const options = { mimeType: this.mimeType };
		return {
			stream,
			recorder: new MediaRecorder(stream, options),
			options
		};
	}
	createRecordingFileName() {
		const originalFileName = this.parent.fileName;
		const segments = ["from_" + this.parent.group.registry.range.value.from.toFixed(2), "to_" + this.parent.group.registry.range.value.to.toFixed(2)].join("__");
		const extension = this.fileExt ? this.fileExt : "webm";
		const replaceWithText = "__" + segments + "." + extension;
		return originalFileName.replace(/\.(lrc|jpe?g)$/i, replaceWithText);
	}
	download() {
		const blob = new Blob(this.recordedChunks, { type: this.mimeType });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = this.createRecordingFileName();
		/**
		* this.parent.fileName
		.replace(".lrc", `__${this.parent.group.registry.palette.value}__from-${this.parent.group.registry.range.value!.from.toFixed(2)}_to-${this.parent.group.registry.range.value!.to.toFixed(2)}.webm`);
		*/
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	}
	clearRecording() {
		if (this.recorder) {
			this.recorder.stop();
			delete this.recorder;
		}
		if (this.stream) delete this.stream;
		if (this.recordedChunks.length > 0) this.recordedChunks = [];
		this.value = false;
		this.mimeType = void 0;
	}
};
//#endregion
//#region src/file/dom/domFactories.ts
var ThermalDomFactory = class ThermalDomFactory {
	static createCanvasContainer() {
		const container = document.createElement("div");
		container.classList.add("thermalCanvasWrapper");
		container.style.position = "relative";
		container.style.userSelect = "none";
		container.part = "thermal-canvas-wrapper";
		return container;
	}
	static createCanvas() {
		const canvas = document.createElement("canvas");
		canvas.classList.add("thermalCanvas");
		canvas.style.padding = "0px";
		canvas.style.margin = "0px";
		canvas.style.objectFit = "contain";
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.style.objectPosition = "top left";
		canvas.style.imageRendering = "pixelated";
		canvas.style.userSelect = "none";
		canvas.part = "thermal-file-canvas";
		return canvas;
	}
	static createDateLayerInner() {
		const inner = document.createElement("div");
		inner.classList.add("dateLayerInner");
		inner.style.margin = "0px";
		inner.style.padding = ".3rem 0rem";
		inner.style.backgroundColor = "black";
		inner.style.color = "white";
		inner.style.borderRadius = ".5rem .5rem 0 0";
		inner.style.width = "calc(100% + 4px )";
		inner.style.position = "absolute";
		inner.style.top = "0rem";
		inner.style.left = "-2px";
		inner.style.opacity = "0";
		inner.style.transition = "opacity .1s ease-in-out";
		inner.style.textAlign = "center";
		inner.style.userSelect = "none";
		return inner;
	}
	static createVisibleLayer() {
		const layer = document.createElement("div");
		layer.classList.add("visibleLayer");
		layer.style.margin = "0px";
		layer.style.padding = "0px";
		layer.style.height = "100%";
		layer.style.width = "100%";
		layer.style.position = "absolute";
		layer.style.top = "0px";
		layer.style.left = "0px";
		layer.style.userSelect = "none";
		return layer;
	}
	static createVisibleImage() {
		const img = document.createElement("img");
		img.classList.add("visibleLayerImage");
		img.style.padding = "0px";
		img.style.margin = "0px";
		img.style.objectFit = "contain";
		img.style.width = "100%";
		img.style.height = "100%";
		img.style.objectPosition = "top left";
		img.style.userSelect = "none";
		return img;
	}
	static createListener() {
		const listener = document.createElement("div");
		listener.classList.add("thermalListener");
		listener.style.margin = "0px";
		listener.style.padding = "0px";
		listener.style.height = "100%";
		listener.style.width = "100%";
		listener.style.position = "absolute";
		listener.style.top = "0px";
		listener.style.left = "0px";
		listener.style.cursor = "pointer";
		listener.style.touchAction = "none";
		listener.style.userSelect = "none";
		listener.setAttribute("id", Math.random().toString());
		return listener;
	}
	static createCursorLayerRoot() {
		const layer = document.createElement("div");
		layer.classList.add("cursorLayerRoot");
		layer.style.width = "100%";
		layer.style.height = "100%";
		layer.style.position = "absolute";
		layer.style.top = "0";
		layer.style.left = "0";
		layer.style.opacity = "0";
		layer.style.overflow = "hidden";
		layer.style.lineHeight = "1rem";
		layer.style.userSelect = "none";
		return layer;
	}
	static createCursorLayerCenter() {
		const container = document.createElement("div");
		container.classList.add("cursorLayerCenter");
		container.style.position = "absolute";
		container.style.top = "0px";
		container.style.left = "0px";
		container.style.width = "0px";
		container.style.height = "0px";
		container.style.userSelect = "none";
		return container;
	}
	static createCursorLayerAxeBase() {
		const axe = document.createElement("div");
		axe.classList.add("cursorLayerAxe");
		axe.style.backdropFilter = "invert(100)";
		axe.style.position = "absolute";
		axe.style.top = "0px";
		axe.style.left = "0px";
		axe.style.content = "";
		axe.style.userSelect = "none";
		return axe;
	}
	static createCursorLayerX() {
		const axeX = ThermalDomFactory.createCursorLayerAxeBase();
		axeX.classList.add("cursorLayerAxeX");
		axeX.style.width = "1px";
		axeX.style.height = "20px";
		axeX.style.top = "-10px";
		axeX.style.userSelect = "none";
		return axeX;
	}
	static createCursorLayerY() {
		const axeY = ThermalDomFactory.createCursorLayerAxeBase();
		axeY.classList.add("cursorLayerAxeY");
		axeY.style.width = "20px";
		axeY.style.height = "1px";
		axeY.style.left = "-10px";
		axeY.style.userSelect = "none";
		return axeY;
	}
	static createCursorLayerLabel() {
		const axeLabel = document.createElement("div");
		axeLabel.classList.add("cursorLayerLabel");
		axeLabel.style.position = "absolute";
		axeLabel.style.padding = "1px 3px";
		axeLabel.style.backgroundColor = "rgba( 0,0,0,0.5 )";
		axeLabel.style.color = "white";
		axeLabel.style.whiteSpace = "nowrap";
		axeLabel.style.fontSize = "small";
		axeLabel.style.borderRadius = "5px";
		axeLabel.style.userSelect = "none";
		return axeLabel;
	}
};
//#endregion
//#region src/file/dom/layers/AbstractLayer.ts
var AbstractLayer = class {
	dom;
	get instance() {
		return this.dom.parent;
	}
	constructor(dom) {
		this.dom = dom;
	}
	_mounted = false;
	get mounted() {
		return this._mounted;
	}
	mount() {
		if (!this._mounted) {
			if (this.dom.root !== null) {
				this._mounted = true;
				this.dom.root.appendChild(this.getLayerRoot());
			}
		}
	}
	unmount() {
		if (this._mounted) {
			if (this.dom.root !== null) {
				this._mounted = false;
				this.dom.root.removeChild(this.getLayerRoot());
			}
		}
	}
	destroy() {
		this.onDestroy();
	}
};
//#endregion
//#region src/file/dom/layers/thermalCanvasLayer.ts
/** Displays the canvas and renders it */
var ThermalCanvasLayer = class extends AbstractLayer {
	container;
	canvas;
	_opacity = 1;
	get opacity() {
		return this._opacity;
	}
	set opacity(value) {
		if (this.instance.visibleUrl === null || this.instance.visibleUrl === void 0 || this.instance.visibleUrl.trim().length === 0) return;
		this._opacity = Math.max(Math.min(value, 1), 0);
		if (this._opacity !== 1) this.canvas.style.opacity = this._opacity.toString();
		else this.canvas.style.removeProperty("opacity");
	}
	constructor(dom) {
		super(dom);
		this.container = ThermalDomFactory.createCanvasContainer();
		this.canvas = ThermalDomFactory.createCanvas();
		this.canvas.width = this.instance.width;
		this.canvas.height = this.instance.height;
		this.canvas.setAttribute("data-video-canvas", "");
		this.canvas.setAttribute("crossorigin", "anonymous");
		this.canvas.setAttribute("crossOrigin", "Anonymous");
		this.container.appendChild(this.canvas);
		this.opacity = this.instance.group.registry.opacity.value;
	}
	getLayerRoot() {
		return this.container;
	}
	onDestroy() {
		this.canvas.remove();
		this.container.remove();
	}
};
//#endregion
//#region src/file/dom/layers/thermalCursorLayer.ts
/** Displays the cursor pointer and its value */
var ThermalCursorLayer = class extends AbstractLayer {
	layerRoot;
	center;
	axisX;
	axisY;
	label;
	constructor(dom) {
		super(dom);
		this.layerRoot = ThermalDomFactory.createCursorLayerRoot();
		this.center = ThermalDomFactory.createCursorLayerCenter();
		this.axisX = ThermalDomFactory.createCursorLayerX();
		this.axisY = ThermalDomFactory.createCursorLayerY();
		this.label = ThermalDomFactory.createCursorLayerLabel();
		this.layerRoot.appendChild(this.center);
		this.center.appendChild(this.axisX);
		this.center.appendChild(this.axisY);
		this.center.appendChild(this.label);
	}
	_show = false;
	get show() {
		return this._show;
	}
	setShow(value) {
		this._show = value;
		this.layerRoot.style.opacity = this._show ? "1" : "0";
	}
	_hover = false;
	get hover() {
		return this._hover;
	}
	set hover(value) {
		this._hover = value;
		this.label.style.backgroundColor = this._hover ? "black" : "rgba( 0,0,0,0.5 )";
	}
	recalculateLabelPosition(x, y) {
		if (this.dom.root === null) {} else {
			const aspect = this.dom.root.offsetWidth / this.instance.width;
			const centerX = Math.round(x * aspect);
			const centerY = Math.round(y * aspect);
			const wPx = 100 / this.instance.width / 2;
			const hPx = 100 / this.instance.height / 2;
			this.center.style.left = `calc( ${this.px(centerX)} + ${wPx}%)`;
			this.center.style.top = `calc( ${this.px(centerY)} + ${hPx}%)`;
			if (x > this.instance.width / 3) {
				this.label.style.right = "3px";
				this.label.style.removeProperty("left");
			} else {
				this.label.style.left = "3px";
				this.label.style.removeProperty("right");
			}
			if (y > this.instance.height / 4) {
				if (this.label.style.bottom !== "3px") {
					this.label.style.bottom = "3px";
					this.label.style.removeProperty("top");
				}
			} else if (this.label.style.top !== "3px") {
				this.label.style.top = "3px";
				this.label.style.removeProperty("bottom");
			}
		}
	}
	setLabel(x, y, value) {
		if (this.dom.root === null) {} else {
			this.recalculateLabelPosition(x, y);
			this.label.innerHTML = value;
		}
	}
	setValue(value) {
		if (value) this.label.innerHTML = `${value.toFixed(3)} °C`;
	}
	resetCursor() {
		this.center.style.top = "0px";
		this.center.style.left = "0px";
		this.label.style.removeProperty("right");
		this.label.style.removeProperty("bottom");
		this.label.style.top = "3px";
		this.label.style.left = "3px";
		this.label.innerHTML = "";
	}
	px(number) {
		return `${number}px`;
	}
	getLayerRoot() {
		return this.layerRoot;
	}
	onDestroy() {
		this.label.remove();
		this.axisX.remove();
		this.axisY.remove();
		this.center.remove();
		this.layerRoot.remove();
	}
};
//#endregion
//#region src/file/dom/layers/thermalListenerLayer.ts
/** Listens for the mouse events. Needs to be placed on top. */
var ThermalListenerLayer = class extends AbstractLayer {
	container;
	constructor(dom) {
		super(dom);
		this.container = ThermalDomFactory.createListener();
	}
	getLayerRoot() {
		return this.container;
	}
	onDestroy() {
		this.container.remove();
	}
};
//#endregion
//#region src/file/dom/layers/VisibleLayer.ts
/** Contains the visible image. Needs to be placed on the bottom. */
var VisibleLayer = class extends AbstractLayer {
	_url;
	container;
	image;
	get url() {
		return this._url;
	}
	set url(value) {
		this._url = value;
		if (this.image && value) this.image.src = value;
	}
	get exists() {
		return this._url !== void 0;
	}
	constructor(dom, _url) {
		super(dom);
		this._url = _url;
		this.container = ThermalDomFactory.createVisibleLayer();
		if (this._url) {
			this.image = ThermalDomFactory.createVisibleImage();
			this.url = this._url;
			this.container.appendChild(this.image);
		}
	}
	getLayerRoot() {
		return this.container;
	}
	onDestroy() {
		if (this.image) this.image.remove();
		this.container.remove();
	}
};
//#endregion
//#region src/file/dom/InstanceDom.ts
var InstanceDOM = class InstanceDOM {
	parent;
	root;
	static CLASS_BASE = "thermalImageRoot";
	static CLASS_BUILT = InstanceDOM.CLASS_BASE + "__built";
	static CLASS_HYDRATED = InstanceDOM.CLASS_BASE + "__mounted";
	static CLASS_HOVER = InstanceDOM.CLASS_BASE + "__hover";
	_built = false;
	get built() {
		return this._built;
	}
	setBuilt(value) {
		this._built = value;
		if (value === true) {
			this.root.classList.add(InstanceDOM.CLASS_BUILT);
			this.root.dataset.built = "true";
			this.root.style.transition = "border-color .1s ease-in-out";
			this.root.style.zIndex = "10";
			this.root.style.position = "relative";
			this.root.style.lineHeight = "0";
			this.parent.onMount.call();
		} else {
			this.root.classList.remove(InstanceDOM.CLASS_BUILT);
			delete this.root.dataset.built;
			this.root.style.removeProperty("transition");
			this.root.style.removeProperty("zIndex");
			this.root.style.removeProperty("position");
			this.root.style.removeProperty("lineHeight");
			this.parent.onUnmount.call();
		}
	}
	_hydrated = false;
	get hydrated() {
		return this._hydrated;
	}
	setHydrated(value) {
		this._hydrated = value;
		if (value === true) {
			this.root.classList.add(InstanceDOM.CLASS_HYDRATED);
			this.root.dataset.hydrated = "true";
		} else {
			this.root.classList.remove(InstanceDOM.CLASS_HYDRATED);
			delete this.root.dataset.hydrated;
		}
	}
	_hover = false;
	get hover() {
		return this._hover;
	}
	setHover(value) {
		this._hover = value;
		if (value === true) {
			this.root.classList.add(InstanceDOM.CLASS_HOVER);
			this.root.dataset.hover = "true";
		} else {
			this.root.classList.remove(InstanceDOM.CLASS_HOVER);
			delete this.root.dataset.hover;
		}
	}
	/** The layer holding the canvas element and also analysis DOM */
	_canvasLayer;
	get canvasLayer() {
		return this._canvasLayer;
	}
	/** Visible layer holding an eventual visible object */
	_visibleLayer;
	get visibleLayer() {
		return this._visibleLayer;
	}
	/** Cursor layer will draw the cursor and its label on top of everything */
	_cursorLayer;
	get cursorLayer() {
		return this._cursorLayer;
	}
	/** Listener layer is on top of everything and it handles all mouse events */
	_listenerLayer;
	get listenerLayer() {
		return this._listenerLayer;
	}
	constructor(parent, root) {
		this.parent = parent;
		this.root = root;
		this.root.classList.add(InstanceDOM.CLASS_BASE);
		this.root.dataset.thermalInstanceId = this.parent.id;
		this.root.dataset.thermalInstanceUrl = this.parent.thermalUrl;
	}
	/**
	* Use the parent's create inner method to build and assign all inner DOM
	*/
	build() {
		if (this.root !== null && this.built === true) {
			console.info(`Building instance ${this.parent.id} which is already built. Destroying any previous DOM and creating a new one in a new container ${this.root.nodeName}`);
			this.destroy();
		}
		this._canvasLayer = new ThermalCanvasLayer(this);
		this._visibleLayer = new VisibleLayer(this, this.parent.visibleUrl);
		this._cursorLayer = new ThermalCursorLayer(this);
		this._listenerLayer = new ThermalListenerLayer(this);
		this._canvasLayer.mount();
		this._visibleLayer.mount();
		this._cursorLayer.mount();
		this._listenerLayer.mount();
		this.root.appendChild(this._visibleLayer.getLayerRoot());
		this.root.appendChild(this._canvasLayer.getLayerRoot());
		this.root.appendChild(this._cursorLayer.getLayerRoot());
		this.root.appendChild(this._listenerLayer.getLayerRoot());
		this.setBuilt(true);
	}
	/** Destroy the entire DOM and remove all listeners */
	destroy() {
		if (this.built === true) {
			if (this._canvasLayer) {
				this._canvasLayer.unmount();
				delete this._canvasLayer;
				this._canvasLayer = void 0;
			}
			if (this._visibleLayer) {
				this._visibleLayer.unmount();
				delete this._visibleLayer;
				this._visibleLayer = void 0;
			}
			if (this._cursorLayer) {
				this._cursorLayer.unmount();
				delete this._cursorLayer;
				this._cursorLayer = void 0;
			}
			if (this._listenerLayer) {
				if (this.hydrated === true) this.dehydrate();
				this._listenerLayer.unmount();
				delete this._listenerLayer;
				this._listenerLayer = void 0;
			}
			this.setBuilt(false);
			this.root.classList.remove(InstanceDOM.CLASS_BASE);
			delete this.root.dataset.thermalInstanceId;
			delete this.root.dataset.thermalInstanceUrl;
			this.root.innerHTML = "";
		}
	}
	/** Activate all listeners */
	hydrate() {
		if (this.listenerLayer === void 0) {
			console.error(`Instance ${this.parent.thermalUrl} does not have a listener layer yet when trying to hydrate! Stopping hydration.`);
			return;
		}
		if (this.hydrated === true) this.dehydrate();
		this.parent.hydrateListener(this);
		this.setHydrated(true);
	}
	/** Deactivate all listeners */
	dehydrate() {
		if (this.hydrated === false) {
			console.error(`Trying to dehydrate the instance ${this.parent.thermalUrl} which is not yet hydrated!}`);
			return;
		}
		if (this.listenerLayer === void 0) {
			console.error(`Trying to dehydrate the instance ${this.parent.thermalUrl} which does not have a listener layer yet!`);
			return;
		}
		this.parent.dehydrateListener(this);
		this.setHydrated(false);
	}
};
//#endregion
//#region src/file/render/AbstractRenderer.ts
var AbstractRenderer = class {
	file;
	canvas;
	_initialised = false;
	get initialised() {
		return this._initialised;
	}
	get registry() {
		return this.file.group.registry;
	}
	/** Alias vedoucí na šířku syrového termogramu */
	get width() {
		return this.file.width;
	}
	/** Alias vedoucí na výšku syrového termogramu */
	get height() {
		return this.file.height;
	}
	/** Alias vedoucí na současné FROM teplotního rozsahu */
	get from() {
		if (this.registry.range.value === void 0) return this.file.min;
		return this.registry.range.value.from;
	}
	/** Alias vedoucí na současné TO teplotního rozsahu */
	get to() {
		if (this.registry.range.value === void 0) return this.file.max;
		return this.registry.range.value.to;
	}
	get palette() {
		return this.registry.palette.currentPalette.pixels;
	}
	constructor(file, canvas) {
		this.file = file;
		this.canvas = canvas;
	}
	/** Inicializace rendereru - vytvoření patřičných listenerů či shaderů atd... */
	async init() {
		if (this.initialised) {
			console.warn(`Renderer of ${this.file.id} is already initialised`);
			return;
		}
		if (await this.onInit()) {
			this._initialised = true;
			await this.render();
			return;
		} else console.warn(`Renderer of ${this.file.id} failed to initialise`);
	}
	/** Vykreslení probíhá pouze pokud je rendererr inicializován */
	async render() {
		if (!this.initialised) {
			console.warn(`Renderer of ${this.file.id} is not initialised`);
			return;
		}
		return await this.executeRender();
	}
};
//#endregion
//#region src/file/render/CpuRenderer.ts
var CpuRenderer = class extends AbstractRenderer {
	get pool() {
		return this.registry.pool;
	}
	context;
	async onInit() {
		const context = this.canvas.getContext("2d");
		if (context === null) return false;
		this.context = context;
		return true;
	}
	async executeRender() {
		const image = await this.pool.exec(async (from, to, width, height, pixels, palette) => {
			const context = new OffscreenCanvas(width, height).getContext("2d");
			const displayRange = to - from;
			for (let x = 0; x < width; x++) for (let y = 0; y < height; y++) {
				let temperature = pixels[x + y * width];
				if (temperature < from) temperature = from;
				if (temperature > to) temperature = to;
				const temperatureAspect = (temperature - from) / displayRange;
				context.fillStyle = palette[Math.floor((palette.length - 1) * temperatureAspect)];
				context.fillRect(x, y, 1, 1);
			}
			const imageData = context.getImageData(0, 0, width, height);
			return await createImageBitmap(imageData);
		}, [
			this.from,
			this.to,
			this.width,
			this.height,
			this.file.pixels,
			this.palette
		], {});
		this.context.drawImage(image, 0, 0);
	}
	async destroy() {}
};
//#endregion
//#region src/file/render/GlRenderer.ts
var GlRenderer = class GlRenderer extends AbstractRenderer {
	context;
	program;
	fragmentShader;
	vertexShader;
	pixelsBuffer;
	pixelsTexture;
	uploadedPixelsVersion;
	paletteBuffer;
	paletteTexture;
	vertexBuffer;
	get listenerIdPalette() {
		return this.file.id + "_palette";
	}
	get listenerIdRange() {
		return this.file.id + "_range";
	}
	get listenerIdPixels() {
		return this.file.id + "_pixels";
	}
	async onInit() {
		const context = this.canvas.getContext("webgl2", { preserveDrawingBuffer: true });
		if (context === null) return false;
		this.context = context;
		this.pixelsBuffer = this.initPixelsBuffer();
		this.pixelsTexture = this.initPixelsTexture();
		/** Vytvoř buffer pro paletu, do které budeme zapisovat paletu */
		this.paletteBuffer = this.initPaletteBuffer();
		this.paletteTexture = this.initPaletteTexture();
		this.registry.palette.addListener(this.listenerIdPalette, () => {
			const novaPaleta = this.registry.palette.currentPalette.texturePixels;
			this.writePaletteTexture(novaPaleta);
		});
		this.registry.range.addListener(this.listenerIdRange, () => {
			const range = this.registry.range.currentRange;
			const from = range ? range.from : this.file.min;
			const to = range ? range.to : this.file.max;
			this.writeRangeUniform(from, to);
		});
		this.initGl();
		const initialRange = this.registry.range.currentRange;
		const initialFrom = initialRange ? initialRange.from : this.file.min;
		const initialTo = initialRange ? initialRange.to : this.file.max;
		this.writeRangeUniform(initialFrom, initialTo);
		const initialPalette = this.registry.palette.currentPalette.texturePixels;
		this.writePaletteTexture(initialPalette);
		this.context.viewport(0, 0, this.canvas.width, this.canvas.height);
		return true;
	}
	static VERTEX_SHADER = `#version 300 es
        in vec2 a_position;
        out vec2 v_uv;
        void main() {
            v_uv = ( a_position + 1.0 ) * 0.5;
            v_uv.y = 1.0 - v_uv.y;  // Převrácení Y osy pro správnou orientaci textury
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;
	static FRAGMENT_SHADER = `#version 300 es
        precision highp float;
        in vec2 v_uv;
        uniform sampler2D u_pixels;
        uniform sampler2D u_palette;
        uniform float u_from;
        uniform float u_to;
        out vec4 outColor;
        void main() {
            float temp = texture(u_pixels, v_uv).r;
            float t = clamp( (temp - u_from) / (u_to - u_from), 0.0, 1.0 );
            outColor = texture( u_palette, vec2(t, 0.5) );
        }
    `;
	initGl() {
		const gl = this.context;
		this.vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1,
			-1,
			1,
			-1,
			-1,
			1,
			1,
			1
		]), gl.STATIC_DRAW);
		this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(this.vertexShader, GlRenderer.VERTEX_SHADER);
		gl.compileShader(this.vertexShader);
		this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(this.fragmentShader, GlRenderer.FRAGMENT_SHADER);
		gl.compileShader(this.fragmentShader);
		this.program = gl.createProgram();
		gl.attachShader(this.program, this.vertexShader);
		gl.attachShader(this.program, this.fragmentShader);
		gl.linkProgram(this.program);
		gl.useProgram(this.program);
		const a_position = gl.getAttribLocation(this.program, "a_position");
		gl.enableVertexAttribArray(a_position);
		gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
	}
	createTexture(width, height, internalFormat, format, type, initialData) {
		const texture = this.context.createTexture();
		this.context.bindTexture(this.context.TEXTURE_2D, texture);
		this.context.texImage2D(this.context.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, initialData);
		this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.NEAREST);
		this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.NEAREST);
		this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
		this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
		return texture;
	}
	/** Vytvoř buffer, do kterého budu uploadovat hodnoty teplot pro jednotlivé pixely a následně ho budu nahrávat do textury */
	initPixelsBuffer() {
		return new Float32Array(this.file.pixels);
	}
	/** Inicializuj pixel buffer */
	initPixelsTexture() {
		return this.createTexture(this.width, this.height, this.context.R32F, this.context.RED, this.context.FLOAT, this.pixelsBuffer);
	}
	writePixelsTexture(pixels) {
		if (pixels instanceof Float32Array) this.pixelsBuffer.set(pixels, 0);
		else this.pixelsBuffer.set(pixels, 0);
		this.context.activeTexture(this.context.TEXTURE0);
		this.context.bindTexture(this.context.TEXTURE_2D, this.pixelsTexture);
		this.context.texSubImage2D(this.context.TEXTURE_2D, 0, 0, 0, this.width, this.height, this.context.RED, this.context.FLOAT, this.pixelsBuffer);
	}
	/** Inicializuj palette buffer */
	initPaletteBuffer() {
		return /* @__PURE__ */ new Float32Array(1024);
	}
	/** Inicializuj palette texture */
	initPaletteTexture() {
		return this.createTexture(256, 1, this.context.RGBA32F, this.context.RGBA, this.context.FLOAT, this.paletteBuffer);
	}
	writePaletteTexture(palettePixels) {
		if (palettePixels instanceof Float32Array) {
			this.paletteBuffer.set(palettePixels, 0);
			this.context.bindTexture(this.context.TEXTURE_2D, this.paletteTexture);
			this.context.texSubImage2D(this.context.TEXTURE_2D, 0, 0, 0, 256, 1, this.context.RGBA, this.context.FLOAT, this.paletteBuffer);
		} else {
			this.context.bindTexture(this.context.TEXTURE_2D, this.paletteTexture);
			this.context.texSubImage2D(this.context.TEXTURE_2D, 0, 0, 0, 256, 1, this.context.RGBA, this.context.UNSIGNED_BYTE, palettePixels);
		}
	}
	/** Nastaví uniformy pro rozsah teplot */
	writeRangeUniform(from, to) {
		const gl = this.context;
		gl.useProgram(this.program);
		const u_from = gl.getUniformLocation(this.program, "u_from");
		const u_to = gl.getUniformLocation(this.program, "u_to");
		gl.uniform1f(u_from, from);
		gl.uniform1f(u_to, to);
	}
	async executeRender() {
		const gl = this.context;
		this.writePixelsTexture(this.file.pixels);
		this.uploadedPixelsVersion = this.file.pixelsVersion;
		gl.useProgram(this.program);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		const u_pixels = gl.getUniformLocation(this.program, "u_pixels");
		const u_palette = gl.getUniformLocation(this.program, "u_palette");
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.pixelsTexture);
		gl.uniform1i(u_pixels, 0);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, this.paletteTexture);
		gl.uniform1i(u_palette, 1);
		gl.clearColor(0, 0, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
	async destroy() {
		this.context.deleteProgram(this.program);
		this.context.deleteShader(this.vertexShader);
		this.context.deleteShader(this.fragmentShader);
		this.context.deleteTexture(this.pixelsTexture);
		this.context.deleteTexture(this.paletteTexture);
	}
};
//#endregion
//#region src/file/utils/FileMeta.ts
/**
* The file metadata = Parsed file base info.
* 
* Stored here as a separate class. Purpose: separation of concern & provide listener on change.
*/
var FileMeta = class {
	_current;
	get current() {
		return this._current;
	}
	_onChange;
	/** 
	* Lazyloaded callback manager that is triggered whenever the value changes 
	*/
	get onChange() {
		if (!this._onChange) this._onChange = new CallbacksManager();
		return this._onChange;
	}
	get width() {
		return this.current.width;
	}
	get height() {
		return this.current.height;
	}
	constructor(baseInfo) {
		this._current = baseInfo;
	}
	set(value) {
		this._current = value;
		this.onChange.call(this.current);
	}
};
//#endregion
//#region src/file/AbstractThermalFile.ts
/** 
* Displayable object for every file type.
* 
* This class takes care of the display fundamentals.
* 
* Most drivers are set in individual implementations, not here.
*/
var AbstractThermalFile = class extends BaseStructureObject {
	_label;
	get label() {
		return this._label;
	}
	setLabel(label) {
		if (this._label === label) return;
		this._label = label;
		this.onLabelChange.call(label);
	}
	onLabelChange = new CallbacksManager();
	id;
	/** Internal limit for cursor label position */
	horizontalLimit;
	/** Internal limit for cursor label position */
	verticalLimit;
	/** Every file instance belongs to a group */
	group;
	/** Alias to the file group's registry */
	get registry() {
		return this.group.registry;
	}
	/** Alias to the file group's registry's manager */
	get manager() {
		return this.group.registry.manager;
	}
	/** Alias to the manager's pool object */
	get pool() {
		return this.manager.pool;
	}
	/** The full URL of the thermal file */
	thermalUrl;
	_visibleUrl;
	get visibleUrl() {
		return this._visibleUrl;
	}
	fileName;
	signature = "unknown";
	version = -1;
	streamCount = -1;
	fileDataType = -1;
	unit = -1;
	/** Stored core information. They may change in time because of filters. */
	meta;
	/** @deprecated Use meta instead */
	get width() {
		return this.meta.current.width;
	}
	/** @deprecated Use meta instead */
	get height() {
		return this.meta.current.height;
	}
	/** @deprecated Use meta instead */
	get timestamp() {
		return this.meta.current.timestamp;
	}
	/** @deprecated Use meta instead */
	get duration() {
		return this.meta.current.duration;
	}
	/** @deprecated Use meta instead */
	get min() {
		return this.meta.current.min;
	}
	/** @deprecated Use meta instead */
	get max() {
		return this.meta.current.max;
	}
	/** @deprecated Use meta instead */
	get bytesize() {
		return this.meta.current.bytesize;
	}
	/** @deprecated Use meta instead */
	get averageEmissivity() {
		return this.meta.current.averageEmissivity;
	}
	/** @deprecated Use meta instead */
	get averageReflectedKelvins() {
		return this.meta.current.averageReflectedKelvins;
	}
	/** @deprecated Use meta instead */
	get fps() {
		return this.meta.current.fps;
	}
	/** @deprecated Use meta instead */
	get frameCount() {
		return this.meta.current.frameCount;
	}
	_dom;
	get dom() {
		return this._dom;
	}
	onMount = new CallbacksManager();
	onUnmount = new CallbacksManager();
	/** Renderer pro vykreslování do canvasu */
	renderer;
	get hover() {
		if (this.dom) return this.dom.hover;
		return false;
	}
	timeline;
	cursorValue;
	analysis;
	recording;
	_preferWebGl = true;
	get preferWebGl() {
		return this._preferWebGl;
	}
	switchToCPURenderer() {
		if (this.renderer instanceof CpuRenderer) return;
		this.renderer?.destroy();
		const container = this.dom?.root;
		this.unmountFromDom();
		this.mountToDom(container);
		this.renderer = new CpuRenderer(this, this.dom.canvasLayer.canvas);
		this.renderer.init();
	}
	_pixels;
	_pixelsVersion = 0;
	get pixels() {
		return this._pixels;
	}
	/** Changes whenever pixels are supplied through setPixels, including reused arrays. */
	get pixelsVersion() {
		return this._pixelsVersion;
	}
	setPixels(value) {
		this._pixels = value;
		this._pixelsVersion++;
		this.onSetPixels(value);
	}
	constructor(group, baseInfo, initialPixels, thermalUrl, visibleUrl) {
		super();
		this.group = group;
		this.id = this.formatId(thermalUrl);
		this.meta = new FileMeta(baseInfo);
		this.thermalUrl = thermalUrl;
		this._visibleUrl = visibleUrl;
		this.fileName = this.thermalUrl.substring(this.thermalUrl.lastIndexOf("/") + 1);
		this.horizontalLimit = this.width / 4 * 3;
		this.verticalLimit = this.height / 4 * 3;
		this._pixels = initialPixels;
	}
	/** 
	* Hotfix - remove the visible file
	* @used in FilePngExport - the PNG files are not being included in the PNG export. Since the data are transferred all to the export, I need to remove the visible file here.
	* @todo 
	*/
	removeVisibleFile() {
		this._visibleUrl = void 0;
		return this;
	}
	/**
	* Hotfix - set renderer preference to WebGl.
	* - true = prefer WebGl, 
	* - false = prefer CPU
	* This needs to be set before calling `mountToDom()` which creates the renderer.
	*/
	setPreferWebGl(value) {
		this._preferWebGl = value;
		return this;
	}
	rendererFactory(canvas) {
		if (this._preferWebGl === true) {
			if (canvas.getContext("webgl2")) return new GlRenderer(this, canvas);
		}
		return new CpuRenderer(this, canvas);
	}
	mountToDom(container) {
		if (this._dom !== void 0) {
			this._dom.destroy();
			this._dom = void 0;
		}
		this._dom = new InstanceDOM(this, container);
		this._dom.build();
		this.renderer = this.rendererFactory(this._dom.canvasLayer.canvas);
		this.renderer.init();
		this._dom.hydrate();
	}
	unmountFromDom() {
		this.renderer?.destroy();
		if (this.dom) this.dom.destroy();
		delete this._dom;
		this._dom = void 0;
	}
	/**
	* @todo The render needs to be a little delayed. This should be foxed so that the render happens immediately.
	*/
	async draw() {
		if (this.dom && this.dom.canvasLayer) {
			await Promise.resolve();
			return await this.renderer?.render();
		}
	}
	/** Remove the entire DOM structure */
	destroySelfAndBelow() {
		if (this.dom) this.dom.destroy();
	}
	/** Remove the entire DOM structure */
	removeAllChildren() {
		this.destroySelfAndBelow();
	}
	getTemperatureAtPoint(x, y) {
		const xx = Math.min(this.meta.width - 1, Math.max(0, x));
		const index = Math.min(this.meta.height - 1, Math.max(0, y)) * this.width + xx;
		return this.pixels[index];
	}
	getColorAtPoint(x, y) {
		const temperature = this.getTemperatureAtPoint(x, y);
		const min = this.group.registry.range.value?.from;
		const max = this.group.registry.range.value?.to;
		if (min !== void 0 && max !== void 0) {
			const temperatureAspect = (temperature - min) / (max - min);
			const colorIndex = Math.round(255 * temperatureAspect);
			return this.group.registry.palette.currentPalette.pixels[colorIndex];
		}
	}
	reset() {}
};
//#endregion
//#region src/utils/AbstractPngExport.ts
var AbstractPngExport = class AbstractPngExport {
	static FONT_SIZE_NORMAL = "16px";
	static FONT_SIZE_SMALL = "12px";
	static COLOR_BASE = "black";
	static COLOR_GRAY = "gray";
	static COLOR_LIGHT = "lightgray";
	static WIDTH = "1600px";
	static FONT_FAMILY = "sans-serif";
	static GAP_BASE = "10px";
	static GAP_SMALL = "5px";
	static DEBUG = false;
	wrapper;
	container;
	_exporting = false;
	get exporting() {
		return this._exporting;
	}
	onExportingStatusChange = new CallbacksManager();
	/** 
	* Indicate the exporting status. Internal method only! 
	*/
	setExporting(value) {
		this._exporting = value;
		this.onExportingStatusChange.call(this._exporting);
	}
	/** 
	* A helper function creating a DIV with default styles 
	*/
	createElementWithText(element, text, fontSize = AbstractPngExport.FONT_SIZE_NORMAL, fontWeight = "normal", color = AbstractPngExport.COLOR_BASE) {
		const el = document.createElement(element);
		el.innerHTML = text;
		el.style.fontSize = fontSize;
		el.style.lineHeight = "1em";
		el.style.fontWeight = fontWeight;
		el.style.color = color;
		return el;
	}
	buildWrapper() {
		const element = document.createElement("div");
		if (AbstractPngExport.DEBUG === false) {
			element.style.position = "absolute";
			element.style.width = "0px";
			element.style.height = "0px";
			element.style.overflow = "hidden";
		}
		return element;
	}
	buildContainer(width, backgroundColor) {
		const element = document.createElement("div");
		element.style.width = width.toFixed(0) + "px";
		element.style.fontSize = AbstractPngExport.FONT_SIZE_NORMAL;
		element.style.fontFamily = AbstractPngExport.FONT_FAMILY;
		element.style.color = AbstractPngExport.COLOR_BASE;
		element.style.backgroundColor = backgroundColor;
		return element;
	}
	clear() {
		this.beforeDomRemoved();
		if (this.wrapper) document.body.removeChild(this.wrapper);
		this.afterDomRemoved();
		delete this.container;
		delete this.wrapper;
	}
	/** Create the core DOM and append it to body */
	buildDom(params) {
		this.wrapper = this.buildWrapper();
		this.container = this.buildContainer(params.width, params.backgroundColor);
		this.wrapper.appendChild(this.container);
		this.onBuildDom(params);
		document.body.prepend(this.wrapper);
	}
	/**
	* Make sure the file name has a valid extension
	*/
	makeSureFileNameIsValid(fileName) {
		if (fileName.endsWith(".PNG")) fileName = fileName.replaceAll(".PNG", ".png");
		if (!fileName.endsWith(".png")) fileName = fileName + ".png";
		return fileName;
	}
	async downloadPng(params) {
		const options = this.getFinalParams(params);
		options.fileName = this.makeSureFileNameIsValid(options.fileName);
		if (this.exporting === true) {
			console.warn(`PNG export of ${options.fileName} is already working. New requests are allowed after the export finishes.`);
			return;
		}
		this.setExporting(true);
		this.buildDom(options);
		this.onDownload(options);
	}
	/** A unified way to download an image */
	downloadImage(fileName, container) {
		domtoimage.toPng(container).then((dataUrl) => {
			const link = document.createElement("a");
			link.download = fileName;
			link.href = dataUrl;
			link.click();
			if (AbstractPngExport.DEBUG === false) this.clear();
			this.setExporting(false);
		});
	}
	buildHorizontalScale(element, min, max, from, to, gradient, bgColor, text, highlight) {
		const elementWidth = element.clientWidth;
		const singleItemWidth = 60;
		const numElements = elementWidth / 100;
		const box = document.createElement("div");
		box.style.width = "100%";
		box.style.position = "relative";
		box.style.paddingLeft = "30px";
		box.style.paddingRight = "30px";
		box.style.boxSizing = "border-box";
		const scale = document.createElement("div");
		scale.style.width = "100%";
		scale.style.position = "relative";
		scale.style.backgroundColor = bgColor;
		scale.style.height = "30px";
		const minmax = max - min;
		const fromClamped = from - min;
		const toClamped = to - min;
		const rangeFromPercent = fromClamped / minmax * 100;
		const rangeToErcent = toClamped / minmax * 100;
		const range = document.createElement("div");
		range.style.position = "absolute";
		range.style.backgroundImage = gradient;
		range.style.height = "100%";
		range.style.top = "0px";
		range.style.left = rangeFromPercent + "%";
		range.style.width = rangeToErcent - rangeFromPercent + "%";
		scale.appendChild(range);
		box.appendChild(scale);
		const ticks = document.createElement("div");
		ticks.style.width = "100%";
		ticks.style.height = "40px";
		ticks.style.position = "relative";
		const buildTick = (value, highlightTick = false, color, background) => {
			const percent = value / minmax * 100;
			const tick = document.createElement("div");
			tick.style.position = "absolute";
			tick.style.top = "0px";
			tick.style.left = `calc( ${percent}% - ${singleItemWidth / 2}px )`;
			tick.style.width = "60px";
			tick.style.textAlign = "center";
			tick.style.lineHeight = "0px";
			const val = document.createElement("div");
			const pointer = document.createElement("div");
			const pointerInner = document.createElement("div");
			const pointerScalePx = "7px";
			val.innerHTML = (min + value).toFixed(2) + " °C";
			val.style.display = "inline-block";
			val.style.fontSize = AbstractPngExport.FONT_SIZE_SMALL;
			val.style.lineHeight = "1em";
			val.style.padding = "3px";
			val.style.position = "relative";
			pointer.style.width = "100%";
			pointer.style.height = pointerScalePx;
			pointer.style.textAlign = "center";
			pointer.style.position = "relative";
			pointer.style.lineHeight = "0px";
			pointerInner.style.content = "";
			pointerInner.style.display = "inline-block";
			if (highlightTick) {
				pointerInner.style.width = "14px";
				pointerInner.style.height = "14px";
				pointerInner.style.rotate = "45deg";
				pointerInner.style.backgroundColor = background;
				val.style.backgroundColor = background;
				val.style.zIndex = "99";
				val.style.color = color;
			} else {
				pointerInner.style.width = "1px";
				pointerInner.style.height = pointerScalePx;
				pointerInner.style.backgroundColor = color;
			}
			pointer.appendChild(pointerInner);
			tick.appendChild(pointer);
			tick.appendChild(val);
			ticks.appendChild(tick);
		};
		if (highlight) {
			const area = document.createElement("div");
			area.style.position = "absolute";
			area.style.border = `2px solid ${text}`;
			area.style.height = "100%";
			area.style.boxSizing = "border-box";
			const areaFromPercent = (highlight.from - min) / minmax * 100;
			const areaToPercent = (highlight.to - min) / minmax * 100 - areaFromPercent;
			area.style.left = areaFromPercent + "%";
			area.style.width = areaToPercent + "%";
			scale.appendChild(area);
			buildTick(highlight.from - min, true, "white", bgColor);
			buildTick(highlight.to - min, true, "white", bgColor);
		}
		const onePart = minmax / numElements;
		let currentTickValue = 0;
		while (currentTickValue <= minmax) {
			buildTick(currentTickValue, false, text, "transparent");
			currentTickValue = currentTickValue + onePart;
		}
		buildTick(fromClamped, true, "white", text);
		buildTick(toClamped, true, "white", text);
		box.appendChild(ticks);
		return box;
	}
};
//#endregion
//#region src/utils/time/base.ts
var TimeUtilsBase = class {
	/** Convert an input to a date object */
	static inputToDate = (value) => {
		if (typeof value === "number") {
			const d = /* @__PURE__ */ new Date();
			d.setTime(value);
			return d;
		}
		return value;
	};
};
//#endregion
//#region src/utils/time/formatting.ts
/** Utility class for time formatting in the LabIR ecosystem. */
var TimeFormat = class TimeFormat extends TimeUtilsBase {
	/** YYYY-MM-DD */
	static isoDate = (value) => {
		value = TimeFormat.inputToDate(value);
		return formatISO9075(value, { representation: "date" });
	};
	/** HH:MM:SS */
	static isoTime = (value) => {
		value = TimeFormat.inputToDate(value);
		return formatISO9075(value, { representation: "time" });
	};
	/** YYYY-MM-DD HH:MM:SS */
	static isoComplete = (value) => {
		value = TimeFormat.inputToDate(value);
		return formatISO9075(value);
	};
	/** HH:mm */
	static humanTime = (value, showSeconds = false) => {
		value = TimeFormat.inputToDate(value);
		return format(value, showSeconds ? "HH:mm:ss" : "HH:mm");
	};
	/** Format a duration as m:ss.SSS, or h:mm:ss.SSS when it is at least an hour. */
	static duration = (milliseconds) => {
		if (!Number.isFinite(milliseconds) || milliseconds < 0) throw new RangeError("Duration must be a finite, non-negative number.");
		const totalMilliseconds = Math.floor(milliseconds);
		const hours = Math.floor(totalMilliseconds / 36e5);
		const minutes = Math.floor(totalMilliseconds % 36e5 / 6e4);
		const seconds = Math.floor(totalMilliseconds % 6e4 / 1e3);
		const remainingMilliseconds = totalMilliseconds % 1e3;
		const secondsPart = `${String(seconds).padStart(2, "0")}.${String(remainingMilliseconds).padStart(3, "0")}`;
		return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${secondsPart}` : `${minutes}:${secondsPart}`;
	};
	/** j. M. ???? (y) */
	static humanDate = (value, includeYear = false) => {
		value = TimeFormat.inputToDate(value);
		return format(value, includeYear ? "d. M." : "d. M. yyyy");
	};
	/** Range */
	static humanRangeDates(from, to) {
		from = TimeFormat.inputToDate(from);
		to = TimeFormat.inputToDate(to);
		if (from.getUTCDate() === to.getUTCDate()) return TimeFormat.humanDate(from);
		return [TimeFormat.humanDate(from), TimeFormat.humanDate(to)].join(" - ");
	}
	static human(date) {
		return `${TimeFormat.humanDate(date)} ${TimeFormat.humanTime(date, true)} `;
	}
};
//#endregion
//#region src/file/utils/FilePngExport.ts
var FilePngExport = class FilePngExport extends AbstractPngExport {
	file;
	static DEFAULT_PARAMS = {
		fileName: "sth",
		width: 1200,
		fontSize: 20,
		textColor: "black",
		backgroundColor: "white",
		showAnalysis: true,
		showFileName: false,
		showFileDate: false,
		license: void 0,
		showThermalScale: true
	};
	localInstance;
	constructor(file) {
		super();
		this.file = file;
	}
	onBuildDom() {}
	beforeDomRemoved() {}
	afterDomRemoved() {
		this.localInstance?.group.registry.manager.removeRegistry(this.localInstance.group.registry.id);
		delete this.localInstance;
	}
	getFinalParams(params) {
		const fileName = params && params.fileName ? params.fileName : `${this.file.fileName}__export`;
		return {
			...FilePngExport.DEFAULT_PARAMS,
			...params,
			fileName
		};
	}
	async onDownload(params) {
		const registryId = Math.random().toString();
		const manager = this.file.group.registry.manager;
		const registry = manager.addOrGetRegistry(registryId);
		const group = registry.groups.addOrGetGroup(registryId);
		const fontSize = `${params.fontSize}px`;
		manager.palette.setPalette(this.file.group.registry.manager.palette.value);
		registry.range.imposeRange(this.file.group.registry.range.value);
		this.localInstance = await this.file.reader.createInstance(group);
		/** @todo Hotfix - remove visible files */
		this.localInstance.removeVisibleFile();
		const relativeTime = this.file.timeline.currentStep.relative;
		if (relativeTime !== 0) this.localInstance.timeline.setRelativeTime(relativeTime);
		if (this.container) {
			this.container.style.lineHeight = `${params.fontSize * 1.5}px`;
			const registryMin = this.file.group.registry.minmax.value.min;
			const registryMax = this.file.group.registry.minmax.value.max;
			if (params.showFileName || params.showFileDate) {
				const infoElement = document.createElement("div");
				infoElement.style.paddingBottom = `${params.fontSize / 3}px`;
				if (params.showFileDate) {
					const infoText = TimeFormat.human(this.file.timestamp);
					infoElement.appendChild(this.createElementWithText("span", infoText, fontSize, "bold", params.textColor));
				}
				if (params.showFileName) {
					const infoText = (params.showFileDate ? " - " : "") + this.file.fileName;
					const infoWeight = params.showFileDate ? "normal" : "bold";
					infoElement.appendChild(this.createElementWithText("span", infoText, fontSize, infoWeight, params.textColor));
				}
				this.container.appendChild(infoElement);
			}
			if (params.showThermalScale === true) {
				const highlight = registryMin !== this.file.meta.current.min || registryMax !== this.file.meta.current.max ? {
					from: this.file.meta.current.min,
					to: this.file.meta.current.max
				} : void 0;
				this.container.appendChild(this.buildHorizontalScale(this.container, registryMin, registryMax, this.file.group.registry.range.value.from, this.file.group.registry.range.value.to, this.file.group.registry.palette.currentPalette.gradient, "gray", "black", highlight));
			}
			this.localInstance.mountToDom(this.container);
			if (this.localInstance.dom && this.localInstance.dom.visibleLayer) this.localInstance.dom.visibleLayer.getLayerRoot().style.display = "none";
			await this.localInstance.draw();
			if (params.showAnalysis && this.file.analysis.value.length > 0) {
				const table = document.createElement("table");
				table.style.width = "100%";
				table.style.borderCollapse = "collapse";
				table.style.marginTop = `${params.fontSize / 3}px`;
				const header = document.createElement("tr");
				[
					"Analysis",
					"AVG",
					"MIN",
					"MAX"
				].forEach((string) => {
					const el = this.createElementWithText("th", string, fontSize, void 0, FilePngExport.COLOR_GRAY);
					el.style.textAlign = "left";
					el.style.borderBottom = `1px solid ${FilePngExport.COLOR_LIGHT}`;
					el.style.padding = `${params.fontSize / 3}px 0px ${params.fontSize / 3} 0px`;
					header.appendChild(el);
				});
				table.appendChild(header);
				this.container.appendChild(table);
				this.file.slots.forEveryExistingSlot((slot, number) => {
					const localAnalysis = this.localInstance?.slots.createAnalysisFromSerialized(slot.serialized, number);
					if (localAnalysis) {
						const row = document.createElement("tr");
						const name = this.createElementWithText("td", slot.analysis.name, fontSize, void 0, slot.analysis.initialColor);
						name.style.borderBottom = `1px solid ${FilePngExport.COLOR_LIGHT}`;
						name.style.padding = `${params.fontSize / 3}px 0px ${params.fontSize / 3} 0px`;
						row.appendChild(name);
						const createAndAppendValue = (color, value) => {
							const td = this.createElementWithText("td", value ? value.toFixed(3) + " °C" : "", fontSize, void 0);
							td.style.borderBottom = `1px solid ${FilePngExport.COLOR_LIGHT}`;
							td.style.paddingTop = `${params.fontSize / 3}px`;
							td.style.paddingBottom = `${params.fontSize / 3}px`;
							row.appendChild(td);
						};
						if (slot.analysis instanceof AbstractAreaAnalysis) {
							createAndAppendValue(slot.analysis.initialColor, localAnalysis.avg);
							createAndAppendValue(slot.analysis.initialColor, localAnalysis.min);
							createAndAppendValue(slot.analysis.initialColor, localAnalysis.max);
						} else if (slot.analysis instanceof PointAnalysis) {
							createAndAppendValue(slot.analysis.initialColor, localAnalysis.avg);
							createAndAppendValue(slot.analysis.initialColor);
							createAndAppendValue(slot.analysis.initialColor);
						}
						table.appendChild(row);
					}
				});
			}
			if (params.author || params.license) {
				const byline = document.createElement("div");
				byline.style.lineHeight = "1.5em";
				byline.style.color = FilePngExport.COLOR_GRAY;
				byline.style.paddingTop = `${params.fontSize / 3}px`;
				if (params.author) byline.appendChild(this.createElementWithText("span", params.author, fontSize));
				if (params.author && params.license) byline.appendChild(this.createElementWithText("span", " - ", fontSize));
				if (params.license) byline.appendChild(this.createElementWithText("span", params.license, fontSize));
				this.container.appendChild(byline);
			}
			setTimeout(() => {
				if (this.container) this.downloadImage(params.fileName, this.container);
			}, 0);
		}
	}
};
//#endregion
//#region src/file/ThermalFileInstance.ts
/**
* An instance of the loaded file
* 
* Holds DOM, displays the canvas, handles playback and do all important stuff.
* 
* Is necessarily tied to a `ThermalGroup` object and is based on a `ThermalFileReader`.
*/
var ThermalFileInstance = class ThermalFileInstance extends AbstractThermalFile {
	group;
	reader;
	firstFrame;
	slots;
	filters = new FilterContainer(this);
	/**
	* Exports
	*/
	_export;
	/** Lazy-loaded `ThermalFileExport` object */
	get export() {
		if (!this._export) {
			const newExport = new FilePngExport(this);
			this._export = newExport;
		}
		return this._export;
	}
	constructor(group, reader, baseInfo, firstFrame) {
		super(group, baseInfo, firstFrame.pixels, reader.thermalUrl, reader.visibleUrl);
		this.group = group;
		this.reader = reader;
		this.firstFrame = firstFrame;
		this.setPixels(firstFrame.pixels);
	}
	hydrateListener(dom) {
		if (!dom.listenerLayer || !dom.cursorLayer) return;
		const listenerLayerRoot = dom.listenerLayer.getLayerRoot();
		if (!listenerLayerRoot) return;
		dom.parent.analysis.activateListeners(listenerLayerRoot);
		dom.listenerLayer.getLayerRoot().onmousemove = (event) => {
			if (dom.cursorLayer) dom.cursorLayer.setShow(true);
			dom.setHover(true);
			const aspect = dom.parent.meta.width / dom.root.clientWidth;
			const x = Math.round(event.offsetX * aspect);
			const y = Math.round(event.offsetY * aspect);
			dom.parent.group.cursorPosition.recieveCursorPosition({
				x,
				y
			});
		};
		dom.listenerLayer.getLayerRoot().onmouseleave = () => {
			if (dom.cursorLayer) dom.cursorLayer.setShow(false);
			dom.setHover(false);
			dom.parent.group.cursorPosition.recieveCursorPosition(void 0);
		};
		dom.listenerLayer.getLayerRoot().onmouseenter = () => {
			this.group.analysisSync.setCurrentPointer(this);
		};
	}
	dehydrateListener(dom) {
		dom.parent.analysis.deactivateListeners();
	}
	buildInternalProperties() {
		this.cursorValue = new CursorValueDrive(this, void 0);
		this.timeline = new TimelineDrive(this, 0, this.meta.current.timeline, this.firstFrame);
		this.timeline.init();
		this.recording = new RecordingDrive(this, false);
		this.analysis = new AnalysisDrive(this, []);
		this.analysisData = new AnalysisDataState(this);
		this.slots = new AnalysisSlotsState(this, /* @__PURE__ */ new Map());
		return this;
	}
	formatId(thermalUrl) {
		return `instance_${this.group.id}_${thermalUrl}`;
	}
	onSetPixels() {
		if (this.dom && this.dom.built) {
			this.draw();
			this.cursorValue.recalculateFromCursor(this.group.cursorPosition.value);
			if (this.group.cursorPosition.value) {
				const label = this.group.tool.value.getLabelValue(this.group.cursorPosition.value.x, this.group.cursorPosition.value.y, this);
				this.dom.cursorLayer?.setLabel(this.group.cursorPosition.value.x, this.group.cursorPosition.value.y, label);
			}
			this.analysisData.updateAllAnalysesValues();
		}
	}
	getPixelsForHistogram() {
		return [];
	}
	static fromService(group, service, baseInfo, firstFrame) {
		return new ThermalFileInstance(group, service, baseInfo, firstFrame).buildInternalProperties();
	}
	recieveCursorPosition(position) {
		if (position !== void 0) {
			const x = Math.min(this.meta.width, Math.max(0, position.x));
			const y = Math.min(this.meta.height, Math.max(0, position.y));
			const label = this.group.tool.value.getLabelValue(x, y, this);
			if (this.dom) {
				this.dom.cursorLayer?.setLabel(x, y, label);
				if (this.dom.cursorLayer) this.dom.cursorLayer.setShow(true);
			}
		} else if (this.dom) {
			this.dom.cursorLayer?.resetCursor();
			this.dom.cursorLayer?.setShow(false);
		}
		this.cursorValue.recalculateFromCursor(position);
	}
	getInstances() {
		return [this];
	}
	getAllApplicableFilters() {
		const manager = this.group.registry.manager.filters.getActiveFilters();
		const registry = this.group.registry.filters.getActiveFilters();
		const group = this.group.filters.getActiveFilters();
		const file = this.filters.getActiveFilters();
		return [
			...manager,
			...registry,
			...group,
			...file
		];
	}
	async applyAllAvailableFilters() {
		const baseInfo = await this.reader.baseInfo();
		const frameData = await this.reader.frameData(this.timeline.currentStep.index);
		if (this.dom?.root) {
			const container = this.dom.root;
			this.unmountFromDom();
			this.mountToDom(container);
		}
		this.meta.set(baseInfo);
		this.setPixels(frameData.pixels);
	}
};
//#endregion
//#region src/loading/workers/ThermalFileReader.ts
/**
* Stores the file's `ArrayBuffer` and provides all the data for instance
* - this service is registered in FilesService
* - the instances are retrieved using `FilesService.loadOneFile`
*/
var ThermalFileReader = class extends AbstractFileResult {
	service;
	parser;
	/** For the purpose of testing we have a unique ID */
	id = Math.random();
	/** In-memory cache of the `baseInfo` request. This request might be expensive in larger files or in Vario Cam files. Because the return value is allways the same, there is no need to make the call repeatedly. */
	baseInfoCache;
	fileName;
	get pool() {
		return this.service.pool;
	}
	originalBuffer;
	/** The file exactly as it was loaded, if the parser works with a converted working buffer */
	sourceBuffer;
	_buffer;
	/** The working buffer passed to all parser methods */
	get buffer() {
		return this._buffer;
	}
	set buffer(value) {
		this._buffer = value;
	}
	/** 
	* The original file content, e.g. for downloads. 
	* Differs from `buffer` for formats decoded while loading (FLIR JPEG).
	*/
	get fileBuffer() {
		return this.sourceBuffer ?? this.buffer;
	}
	/** MIME type of the original file */
	get fileMimeType() {
		return this.parser.extensions[0]?.minme ?? "application/octet-stream";
	}
	constructor(service, buffer, parser, thermalUrl, visibleUrl, preserveOriginalBuffer, sourceBuffer) {
		super(thermalUrl, visibleUrl);
		this.service = service;
		this.parser = parser;
		this._buffer = buffer;
		if (sourceBuffer !== void 0 && sourceBuffer !== buffer) this.sourceBuffer = sourceBuffer;
		this.fileName = this.thermalUrl.substring(this.thermalUrl.lastIndexOf("/") + 1);
		if (preserveOriginalBuffer === true) this.originalBuffer = this.copyBuffer(this.buffer);
	}
	isSuccess() {
		return true;
	}
	/** @todo This method relies on the functionality of filters. */
	copyBuffer(buffer) {
		const copiedBuffer = new ArrayBuffer(buffer.byteLength);
		const copiedArray = new Uint8Array(copiedBuffer);
		copiedArray.set(new Uint8Array(buffer));
		return copiedArray.buffer;
	}
	/** Create copy of the self so that the instance refers to its own ThermalFileReader */
	cloneForInstance() {
		/** @todo Until the filters are implemented properly, there is no need of copying the buffer.*/
		return this;
	}
	/** Read the fundamental data of the file. If this method had been called before, return the cached result. */
	async baseInfo() {
		if (this.baseInfoCache) return this.baseInfoCache;
		const baseInfo = await this.pool.exec(this.parser.baseInfo, [this.buffer]);
		this.baseInfoCache = baseInfo;
		return baseInfo;
	}
	/** 
	* Before requesting a frame, create a dedicated `ArrayBuffer` containing only the frame's data 
	* 
	* **THIS IS SYNCHRONOUSE AND MIGHT BE EXPENSIVE**
	*/
	getFrameSubset(frameIndex) {
		return this.parser.getFrameSubset(this.buffer, frameIndex);
	}
	/** Read a given frame
	* @todo Implement index range check
	*/
	async frameData(index) {
		const data = this.getFrameSubset(index);
		return await this.parser.frameData(data.array, data.dataType);
	}
	async pointAnalysisData(x, y) {
		return await this.parser.pointAnalysisData(this.buffer, x, y);
	}
	async rectAnalysisData(x, y, width, height) {
		return await this.parser.rectAnalysisData(this.buffer, x, y, width, height);
	}
	async ellipsisAnalysisData(x, y, width, height) {
		return await this.parser.ellipsisAnalysisData(this.buffer, x, y, width, height);
	}
	/** 
	* Recalculates the core array buffer using all available filters. 
	* 
	* This method does not emit anything - it only changes the array buffer.
	*/
	async applyFilters(filters) {
		if (this.originalBuffer === void 0) {
			console.error("trying to apply filters on a filereader template");
			return this;
		}
		this.buffer = this.copyBuffer(this.originalBuffer);
		for (const filter of filters) this.buffer = await filter.apply(this.buffer);
		this.baseInfoCache = void 0;
		await this.baseInfo();
		return this;
	}
	async createInstance(group, doAdd = true) {
		const reader = this.cloneForInstance();
		const baseInfo = await reader.baseInfo();
		const firstFrame = await reader.frameData(0);
		const instance = ThermalFileInstance.fromService(group, reader, baseInfo, firstFrame);
		if (doAdd) group.files.addFile(instance);
		return instance;
	}
};
//#endregion
//#region src/loading/workers/FileRequest.ts
/**
* Internal member of `FilesService`
* - `FileService` members may listen to resolving of this object
* - `load()` method effcently handles the fetch and processing of the file
*/
var FileRequest = class FileRequest {
	service;
	thermalUrl;
	visibleUrl;
	constructor(service, thermalUrl, visibleUrl) {
		this.service = service;
		this.thermalUrl = thermalUrl;
		this.visibleUrl = visibleUrl;
	}
	static fromUrl(service, thermalUrl, visibleUrl) {
		return new FileRequest(service, thermalUrl, visibleUrl);
	}
	/**
	* The request is stored internally, so that multiple calls of `load` will allways result in one single `Promise` - to this one.
	*/
	response;
	/**
	* Fetch a file, process the response and return the promise
	* - the promise is stored internally
	* - if the request is already loading/processing, any subsequent calls use the stored promise object
	*/
	async load() {
		if (this.response === void 0) this.response = this.processResponse(await fetch(this.thermalUrl));
		return this.response;
	}
	/** 
	* Process the raw response:
	* - decide if the file exists
	* - assign parser to the file
	* - create the service
	*/
	async processResponse(response) {
		const res = response;
		if (res.status !== 200) return this.pocessTheService(new ThermalFileFailure(this.thermalUrl, 1, `File '${this.thermalUrl}' was not found.`));
		const buffer = await res.arrayBuffer();
		try {
			const { parser, workingBuffer } = await determineAndPrepare(buffer, this.thermalUrl);
			return this.pocessTheService(new ThermalFileReader(this.service, workingBuffer, parser, this.thermalUrl, this.visibleUrl, void 0, buffer));
		} catch (error) {
			if (error instanceof FileLoadingError) return this.pocessTheService(ThermalFileFailure.fromError(error));
			else throw error;
		}
	}
	/**
	* Actions taken on the `AbstractFileResult` object
	* @todo because there are no side effects, this method might appear redundant
	*/
	pocessTheService(result) {
		return result;
	}
};
//#endregion
//#region src/loading/workers/FilesService.ts
/**
* A singleton instance handling file loading
*/
var FilesService = class {
	manager;
	get pool() {
		return this.manager.pool;
	}
	constructor(manager) {
		this.manager = manager;
	}
	/** @deprecated Intended only for tests & other internal purposes */
	static isolatedInstance(pool, registryName = "isolated_registry") {
		const registry = new ThermalManager(pool).addOrGetRegistry(registryName);
		return {
			service: registry.service,
			registry
		};
	}
	/** Map of pending requests */
	requestsByUrl = /* @__PURE__ */ new Map();
	/** Number of currently pending requests */
	get requestsCount() {
		return this.requestsByUrl.size;
	}
	/** Is an URL currently pending? */
	fileIsPending(url) {
		return this.requestsByUrl.has(url);
	}
	/** Cache of loaded files */
	cacheByUrl = /* @__PURE__ */ new Map();
	/** Number of cached results */
	get cachedServicesCount() {
		return this.cacheByUrl.size;
	}
	/** Is the URL already in the cache? */
	fileIsInCache(url) {
		return this.cacheByUrl.has(url);
	}
	/** Process a file obrained from anywhere */
	async loadUploadedFile(file) {
		try {
			const buffer = await file.arrayBuffer();
			const { parser, workingBuffer } = await determineAndPrepare(buffer, file.name);
			return new ThermalFileReader(this, workingBuffer, parser, file.name, void 0, void 0, buffer);
		} catch (error) {
			return new ThermalFileFailure(file.name, 3, error.message);
		}
	}
	/** Create a dropzone listener on a HTML element */
	handleDropzone(element, multiple = true) {
		return DropinElementListener.listenOnElement(this, element, multiple);
	}
	/** Load a file from URL, eventually using already cached result */
	async loadFile(thermalUrl, visibleUrl) {
		if (this.cacheByUrl.has(thermalUrl)) return this.cacheByUrl.get(thermalUrl);
		else if (this.requestsByUrl.has(thermalUrl)) return this.requestsByUrl.get(thermalUrl).load();
		else {
			const request = FileRequest.fromUrl(this, thermalUrl, visibleUrl);
			this.requestsByUrl.set(thermalUrl, request);
			const result = await request.load();
			this.requestsByUrl.delete(thermalUrl);
			this.cacheByUrl.set(thermalUrl, result);
			return result;
		}
	}
	/** Load multiple images at once using  */
	async loadFiles(files) {
		return Promise.all(files.map(async (file) => {
			const request = await this.loadFile(file.lrc, file.png);
			if (file.callback) await file.callback(request);
			return request;
		}));
	}
};
//#endregion
//#region src/properties/display/GraphSmoothDrive.ts
/** Controls image smoothing */
var GraphSmoothDrive = class extends AbstractProperty {
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	setGraphSmooth(value) {
		this.value = value;
	}
};
//#endregion
//#region src/properties/scale/palettes.ts
const generatePaletteFromStops = (stops) => {
	const palette = new Array(256);
	const sortedStops = [...stops].sort((a, b) => a.percent - b.percent);
	for (let i = 0; i < 256; i++) {
		const percent = i / 255 * 100;
		let startStop = sortedStops[0];
		let endStop = sortedStops[sortedStops.length - 1];
		for (let j = 0; j < sortedStops.length - 1; j++) if (percent >= sortedStops[j].percent && percent <= sortedStops[j + 1].percent) {
			startStop = sortedStops[j];
			endStop = sortedStops[j + 1];
			break;
		}
		const range = endStop.percent - startStop.percent;
		const rangePercent = range === 0 ? 0 : (percent - startStop.percent) / range;
		const r = Math.round(startStop.color[0] + rangePercent * (endStop.color[0] - startStop.color[0]));
		const g = Math.round(startStop.color[1] + rangePercent * (endStop.color[1] - startStop.color[1]));
		const b = Math.round(startStop.color[2] + rangePercent * (endStop.color[2] - startStop.color[2]));
		palette[i] = `rgb(${r},${g},${b})`;
	}
	return palette;
};
const generateGradientFromStops = (stops) => {
	return `linear-gradient(90deg, ${[...stops].sort((a, b) => a.percent - b.percent).map((stop) => `rgb(${stop.color.join(",")}) ${stop.percent}%`).join(", ")})`;
};
const generateTextureArrayFromStops = (stops) => {
	const sortedStops = [...stops].sort((a, b) => a.percent - b.percent);
	const arr = /* @__PURE__ */ new Float32Array(1024);
	for (let i = 0; i < 256; i++) {
		const percent = i / 255 * 100;
		let lowerStop = sortedStops[0];
		let upperStop = sortedStops[sortedStops.length - 1];
		for (let j = 0; j < sortedStops.length - 1; j++) if (percent >= sortedStops[j].percent && percent <= sortedStops[j + 1].percent) {
			lowerStop = sortedStops[j];
			upperStop = sortedStops[j + 1];
			break;
		}
		const ratio = (percent - lowerStop.percent) / (upperStop.percent - lowerStop.percent || 1);
		const r = lowerStop.color[0] + (upperStop.color[0] - lowerStop.color[0]) * ratio;
		const g = lowerStop.color[1] + (upperStop.color[1] - lowerStop.color[1]) * ratio;
		const b = lowerStop.color[2] + (upperStop.color[2] - lowerStop.color[2]) * ratio;
		arr[i * 4] = r / 255;
		arr[i * 4 + 1] = g / 255;
		arr[i * 4 + 2] = b / 255;
		arr[i * 4 + 3] = 1;
	}
	return arr;
};
const IRON_STOPS = [
	{
		percent: 0,
		color: [
			0,
			0,
			0
		]
	},
	{
		percent: 30,
		color: [
			10,
			12,
			77
		]
	},
	{
		percent: 49,
		color: [
			86,
			20,
			101
		]
	},
	{
		percent: 64,
		color: [
			255,
			0,
			0
		]
	},
	{
		percent: 84,
		color: [
			249,
			255,
			0
		]
	},
	{
		percent: 100,
		color: [
			255,
			255,
			255
		]
	}
];
const JET_STOPS = [
	{
		percent: 0,
		color: [
			31,
			0,
			157
		]
	},
	{
		percent: 8,
		color: [
			0,
			5,
			255
		]
	},
	{
		percent: 36,
		color: [
			0,
			255,
			239
		]
	},
	{
		percent: 66,
		color: [
			255,
			252,
			0
		]
	},
	{
		percent: 94,
		color: [
			255,
			2,
			0
		]
	},
	{
		percent: 100,
		color: [
			145,
			0,
			0
		]
	}
];
const WHITE_HOT_STOPS = [{
	percent: 0,
	color: [
		0,
		0,
		0
	]
}, {
	percent: 100,
	color: [
		255,
		255,
		255
	]
}];
const BLACK_HOT_STOPS = [{
	percent: 0,
	color: [
		255,
		255,
		255
	]
}, {
	percent: 100,
	color: [
		0,
		0,
		0
	]
}];
const LAVA_STOPS = [
	{
		percent: 0,
		color: [
			0,
			0,
			0
		]
	},
	{
		percent: 12,
		color: [
			30,
			78,
			149
		]
	},
	{
		percent: 32,
		color: [
			33,
			128,
			127
		]
	},
	{
		percent: 41,
		color: [
			102,
			48,
			108
		]
	},
	{
		percent: 64,
		color: [
			233,
			37,
			37
		]
	},
	{
		percent: 90,
		color: [
			255,
			255,
			0
		]
	},
	{
		percent: 100,
		color: [
			255,
			255,
			255
		]
	}
];
const ARCTIC_STOPS = [
	{
		percent: 0,
		color: [
			17,
			13,
			133
		]
	},
	{
		percent: 15,
		color: [
			23,
			50,
			248
		]
	},
	{
		percent: 30,
		color: [
			75,
			245,
			255
		]
	},
	{
		percent: 55,
		color: [
			100,
			91,
			86
		]
	},
	{
		percent: 70,
		color: [
			239,
			86,
			28
		]
	},
	{
		percent: 87,
		color: [
			255,
			255,
			0
		]
	},
	{
		percent: 100,
		color: [
			255,
			255,
			255
		]
	}
];
const RAINBOW_STOPS = [
	{
		percent: 0,
		color: [
			12,
			11,
			65
		]
	},
	{
		percent: 23,
		color: [
			36,
			108,
			212
		]
	},
	{
		percent: 42,
		color: [
			100,
			255,
			30
		]
	},
	{
		percent: 55,
		color: [
			255,
			255,
			0
		]
	},
	{
		percent: 80,
		color: [
			255,
			0,
			69
		]
	},
	{
		percent: 100,
		color: [
			255,
			255,
			255
		]
	}
];
const RAINBOW_HC_STOPS = [
	{
		percent: 0,
		color: [
			0,
			0,
			0
		]
	},
	{
		percent: 13,
		color: [
			212,
			0,
			217
		]
	},
	{
		percent: 25,
		color: [
			21,
			28,
			151
		]
	},
	{
		percent: 37,
		color: [
			55,
			230,
			255
		]
	},
	{
		percent: 50,
		color: [
			17,
			75,
			22
		]
	},
	{
		percent: 62,
		color: [
			255,
			255,
			0
		]
	},
	{
		percent: 80,
		color: [
			119,
			0,
			11
		]
	},
	{
		percent: 90,
		color: [
			255,
			40,
			32
		]
	},
	{
		percent: 100,
		color: [
			255,
			255,
			255
		]
	}
];
const IRON = generatePaletteFromStops(IRON_STOPS);
const JET = generatePaletteFromStops(JET_STOPS);
const WHITE_HOT = generatePaletteFromStops(WHITE_HOT_STOPS);
const BLACK_HOT = generatePaletteFromStops(BLACK_HOT_STOPS);
const LAVA = generatePaletteFromStops(LAVA_STOPS);
const ARCTIC = generatePaletteFromStops(ARCTIC_STOPS);
const RAINBOW = generatePaletteFromStops(RAINBOW_STOPS);
const RAINBOW_HC = generatePaletteFromStops(RAINBOW_HC_STOPS);
/** Palette definitions available in `@labirthermal/core`. */
const ThermalPalettes = {
	iron: {
		name: "IRON",
		gradient: generateGradientFromStops(IRON_STOPS),
		pixels: IRON,
		texturePixels: generateTextureArrayFromStops(IRON_STOPS),
		slug: "iron"
	},
	jet: {
		name: "JET",
		gradient: generateGradientFromStops(JET_STOPS),
		pixels: JET,
		texturePixels: generateTextureArrayFromStops(JET_STOPS),
		slug: "jet"
	},
	white_hot: {
		name: "White Hot",
		gradient: generateGradientFromStops(WHITE_HOT_STOPS),
		pixels: WHITE_HOT,
		texturePixels: generateTextureArrayFromStops(WHITE_HOT_STOPS),
		slug: "white_hot"
	},
	black_hot: {
		name: "Black Hot",
		gradient: generateGradientFromStops(BLACK_HOT_STOPS),
		pixels: BLACK_HOT,
		texturePixels: generateTextureArrayFromStops(BLACK_HOT_STOPS),
		slug: "black_hot"
	},
	lava: {
		name: "Lava",
		gradient: generateGradientFromStops(LAVA_STOPS),
		pixels: LAVA,
		texturePixels: generateTextureArrayFromStops(LAVA_STOPS),
		slug: "lava"
	},
	arctic: {
		name: "Arctic",
		gradient: generateGradientFromStops(ARCTIC_STOPS),
		pixels: ARCTIC,
		texturePixels: generateTextureArrayFromStops(ARCTIC_STOPS),
		slug: "arctic"
	},
	rainbow: {
		name: "Rainbow",
		gradient: generateGradientFromStops(RAINBOW_STOPS),
		pixels: RAINBOW,
		texturePixels: generateTextureArrayFromStops(RAINBOW_STOPS),
		slug: "rainbow"
	},
	rainbow_hc: {
		name: "Rainbow HC",
		gradient: generateGradientFromStops(RAINBOW_HC_STOPS),
		pixels: RAINBOW_HC,
		texturePixels: generateTextureArrayFromStops(RAINBOW_HC_STOPS),
		slug: "rainbow_hc"
	}
};
//#endregion
//#region src/properties/scale/PaletteDrive.ts
var PaletteDrive = class extends AbstractProperty {
	get availablePalettes() {
		return ThermalPalettes;
	}
	/** All the current palette properties should be accessed through this property. */
	get currentPalette() {
		return this.availablePalettes[this.value];
	}
	validate(value) {
		return value;
	}
	/** Any changes to the value should propagate directly to every instance. */
	afterSetEffect() {
		this.parent.forEveryRegistry((registry) => {
			registry.forEveryInstance((instance) => instance.draw());
		});
	}
	/** Set a palette value and propagate the change to all instances. */
	setPalette(key) {
		this.value = key;
	}
	/** Takes any string input and converts it to a valid AvailableThermalPalettes key */
	sanitizeInputKey(input) {
		if (input === null || input === void 0) return "jet";
		const f = this.availablePalettes[input];
		if (f) return f.slug;
		else return "jet";
	}
};
//#endregion
//#region src/properties/display/SmoothDrive.ts
/** Controls image smoothing */
var SmoothDrive = class extends AbstractProperty {
	validate(value) {
		return value;
	}
	afterSetEffect(value) {
		this.parent.forEveryRegistry((registry) => registry.forEveryInstance((instance) => {
			const canvasLayer = instance.dom?.canvasLayer;
			if (canvasLayer) canvasLayer.canvas.style.imageRendering = value === true ? "auto" : "pixelated";
			else console.warn("Canvas layer not found when trying to set image smooth rendering", instance);
		}));
	}
	setSmooth(value) {
		this.value = value;
	}
};
//#endregion
//#region src/loading/batch/Batch.ts
/**
* A single batch object
* 
* A batch is created from all requests registered in a single tick. 
* The Batch creation and requests registration is handled completely 
* by `BatchLoader.request` method.
* 
* Internally, this object stores an array of file requests along 
* with all the necessary additional information: the target group 
* and a callback that will be fired AFTER ALL FILES OF THE BATCH ARE LOADED.
* 
*/
var Batch = class Batch {
	loader;
	id;
	_loading = false;
	get loading() {
		return this._loading;
	}
	onResolve = new CallbacksManager();
	/** The current timeout fn that is being overriden by every call of the `request` method */
	timeout = void 0;
	/** Array of currently queued requests */
	queue = [];
	get size() {
		return this.queue.length;
	}
	constructor(loader, id) {
		this.loader = loader;
		this.id = id;
	}
	static init(loader, id) {
		return new Batch(loader, id);
	}
	static initWithRequest(loader, thermalUrl, visibleUrl = void 0, group, callback) {
		const item = new Batch(loader);
		item.request(thermalUrl, visibleUrl, group, callback);
		return item;
	}
	/**
	* Request a thermal file
	* 
	* Requesting adds new record to the queue and creates a new
	* timeout closure.
	*/
	request(thermalUrl, visibleUrl, group, callback) {
		this.queue.push({
			thermalUrl,
			visibleUrl,
			group,
			callback
		});
		if (this.timeout !== void 0) clearTimeout(this.timeout);
		this.timeout = setTimeout(async () => {
			this._loading = true;
			const loadedReaders = await Promise.all(this.queue.map(async (item) => {
				return {
					result: await this.loader.registry.service.loadFile(item.thermalUrl, item.visibleUrl),
					callback: item.callback,
					group: item.group
				};
			}));
			const createdInstances = await Promise.all(loadedReaders.map(async (result) => {
				return {
					result: result.result instanceof ThermalFileReader ? await result.result.createInstance(result.group) : await result.result,
					callback: result.callback
				};
			}));
			this.loader.registry.postLoadedProcessing();
			const results = await Promise.all(createdInstances.map(async (result) => {
				await result.callback(result.result);
				return result.result;
			}));
			this.loader.onBatchComplete.call(results);
			this.loader.batchFinished(this);
			this.onResolve.call(results);
		}, 0);
	}
	close() {
		this._loading = true;
	}
};
//#endregion
//#region src/loading/batch/BatchLoader.ts
/**
* Handle batch loading of thermal files.
* 
* This class should be used as a lazy-loaded member of a thermal registry.
*/
var BatchLoader = class {
	registry;
	onBatchStart = new CallbacksManager();
	onBatchComplete = new CallbacksManager();
	set = /* @__PURE__ */ new Set();
	get numberOfBatches() {
		return this.set.size;
	}
	get currentOpenBatch() {
		return Array.from(this.set).find((batch) => batch.loading === false);
	}
	get hasLoadingBatches() {
		return Array.from(this.set).some((batch) => batch.loading === true);
	}
	get numLoadingBatches() {
		return Array.from(this.set).filter((batch) => batch.loading === true).length;
	}
	constructor(registry) {
		this.registry = registry;
	}
	getBatchById(id) {
		const found = Array.from(this.set).find((batch) => batch.id === id);
		if (found) return found;
		return this.createBatch(id);
	}
	createBatch(id) {
		const item = Batch.init(this, id);
		this.set.add(item);
		return item;
	}
	/**
	* Request a file through a batch
	* 
	* If there is an open batch, register the request in it. 
	* Else open a new batch.
	* 
	* The batch will execute automatically in the next tick.
	*/
	request(thermalUrl, visibleUrl, group, callback, id) {
		let openBatch = id ? this.getBatchById(id) : this.currentOpenBatch;
		if (openBatch === void 0) {
			openBatch = Batch.init(this);
			this.set.add(openBatch);
			/** Mark the registry as loading - in any case */
			this.registry.loading.markAsLoading();
		}
		openBatch.request(thermalUrl, visibleUrl, group, callback);
		return openBatch;
	}
	closeBatch() {
		if (this.currentOpenBatch !== void 0) this.currentOpenBatch.close();
	}
	/**
	* This method is called from the inside of a batch object
	* to indicate its completion. 
	* 
	* Upon completion, the batch object is deleted and if there 
	* are no other batches, mark the registry as loaded.
	*/
	batchFinished(batch) {
		this.set.delete(batch);
		/** Mark the registry as loaded whenever there are no other loading batches */
		if (this.numberOfBatches === 0) this.registry.loading.markAsLoaded();
	}
};
//#endregion
//#region src/properties/display/OpacityDrive.ts
var OpacityDrive = class extends AbstractProperty {
	/** Make sure the value is allways between 0 and 1 */
	validate(value) {
		return Math.min(Math.max(0, value), 1);
	}
	/** 
	* Whenever the opacity changes, propagate the value to all instances
	*/
	afterSetEffect(value) {
		this.parent.forEveryInstance((instance) => {
			if (instance.dom !== void 0 && instance.dom.canvasLayer !== void 0 && instance.dom.visibleLayer !== void 0) instance.dom.canvasLayer.opacity = value;
		});
	}
	/** Impose an opacity to all instances */
	imposeOpacity(value) {
		this.value = value;
		return this.value;
	}
};
//#endregion
//#region src/properties/analysis/group/AnalysisGroupGraph.ts
var AnalysisGroupGraph = class AnalysisGroupGraph extends AbstractProperty {
	static LISTENER_ID = "AnalysisGroupGraph";
	constructor(parent) {
		super(parent, void 0);
	}
	timeout;
	calculateData() {
		const colors = [];
		const header = [];
		const data = [];
		const orderedFiles = this.parent.files.value.sort((a, b) => a.timestamp - b.timestamp);
		const firstRow = orderedFiles[0].analysisData.value.values[0];
		header.push(...firstRow);
		colors.push(...orderedFiles[0].analysisData.value.colors);
		this.parent.files.forEveryInstance((instance) => {
			const row = [new Date(instance.timestamp)];
			instance.analysis.value.forEach(async (analysis) => {
				if (analysis.graph.state.MIN === true && analysis.min) row.push(analysis.min);
				if (analysis.graph.state.MAX === true && analysis.max) row.push(analysis.max);
				if (analysis.graph.state.AVG === true && analysis.avg) row.push(analysis.avg);
			});
			if (row.length > 1) data.push(row);
		});
		if (colors.length > 0) this.value = {
			colors,
			data: [header, ...data]
		};
		else this.value = void 0;
	}
	turnOn() {
		this.parent.files.forEveryInstance((instance) => {
			instance.analysisData.addListener(AnalysisGroupGraph.LISTENER_ID, () => {
				if (this.timeout !== void 0) clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.calculateData();
				}, 0);
			});
		});
	}
	turnOff() {
		this.parent.files.forEveryInstance((instance) => {
			instance.analysisData.removeListener(AnalysisGroupGraph.LISTENER_ID);
		});
	}
	validate(value) {
		return value;
	}
	afterSetEffect() {}
};
//#endregion
//#region src/properties/analysis/sync/utils/GroupExportCSV.ts
var GroupExportCSV = class {
	drive;
	constructor(drive) {
		this.drive = drive;
	}
	formatAnalysisDisplayName(analysis, scope) {
		const nameBase = `${analysis.name} (${analysis.getType()}, ${analysis.initialColor}})`;
		if (analysis instanceof AbstractAreaAnalysis && scope) return nameBase + " " + scope.toUpperCase();
		return nameBase;
	}
	formatAnalysisKey(analysis, scope) {
		const keyBase = analysis.key;
		if (analysis instanceof AbstractAreaAnalysis && scope) return keyBase + "_" + scope;
		return keyBase;
	}
	formatFrameSlotValue(slot, scope) {
		if (slot.analysis instanceof AbstractAreaAnalysis && scope) {
			let value = slot.analysis.avg;
			if (scope === "min") value = slot.analysis.min;
			if (scope === "max") value = slot.analysis.max;
			return {
				key: this.formatAnalysisKey(slot.analysis, scope),
				value: value.toString()
			};
		}
		return {
			key: this.formatAnalysisKey(slot.analysis),
			value: slot.analysis.avg.toString()
		};
	}
	/** Assamble the export header and data */
	getData() {
		const header = [
			{
				key: "file",
				displayLabel: "File name"
			},
			{
				key: "timestamp",
				displayLabel: "Frame time"
			},
			{
				key: "frame",
				displayLabel: "Frame ID"
			}
		];
		this.drive.forEveryExistingSlot((slot) => {
			if (slot.analysis instanceof AbstractAreaAnalysis) {
				header.push({
					key: this.formatAnalysisKey(slot.analysis, "min"),
					displayLabel: this.formatAnalysisDisplayName(slot.analysis, "min")
				});
				header.push({
					key: this.formatAnalysisKey(slot.analysis, "max"),
					displayLabel: this.formatAnalysisDisplayName(slot.analysis, "max")
				});
				header.push({
					key: this.formatAnalysisKey(slot.analysis, "avg"),
					displayLabel: this.formatAnalysisDisplayName(slot.analysis, "avg")
				});
			} else header.push({
				key: this.formatAnalysisKey(slot.analysis),
				displayLabel: this.formatAnalysisDisplayName(slot.analysis)
			});
		});
		const data = [];
		this.drive.parent.files.value.sort((a, b) => {
			return a.timestamp - b.timestamp;
		}).forEach((file) => {
			const row = {
				file: file.fileName,
				timestamp: TimeFormat.human(file.timeline.currentStep.absolute),
				frame: file.timeline.currentStep.index
			};
			file.slots.forEveryExistingSlot((slot) => {
				if (slot.analysis instanceof AbstractAreaAnalysis) {
					const min = this.formatFrameSlotValue(slot, "min");
					const max = this.formatFrameSlotValue(slot, "max");
					const avg = this.formatFrameSlotValue(slot, "avg");
					row[min.key] = min.value;
					row[max.key] = max.value;
					row[avg.key] = avg.value;
				} else {
					const avg = this.formatFrameSlotValue(slot);
					row[avg.key] = avg.value;
				}
			});
			data.push(row);
		});
		return {
			header,
			data
		};
	}
	downloadAsCsv() {
		const group = this.drive.parent;
		const groupIdentificator = group.name ?? group.id ?? group.hash;
		const { header, data } = this.getData();
		const csvConfig = mkConfig({
			fieldSeparator: ";",
			filename: `group_${groupIdentificator}`,
			columnHeaders: header
		});
		const csv = generateCsv(csvConfig)(data);
		download(csvConfig)(csv);
	}
};
//#endregion
//#region src/properties/analysis/sync/utils/GroupExportPNG.ts
var GroupExportPNG = class GroupExportPNG extends AbstractPngExport {
	drive;
	static DEFAULT_PROPS = {
		fileName: "export.png",
		columns: 3,
		width: 1600,
		showAnalysis: true,
		showFileDate: true,
		showFileName: false,
		showThermalScale: true,
		license: void 0,
		textColor: "black",
		fontSize: 12,
		showGroupName: true,
		backgroundColor: "white"
	};
	/** Alias to the group this exporter is attached to */
	get group() {
		return this.drive.parent;
	}
	/** Temporary local group is used to build a mirror of images. */
	localGroup;
	/** The header element with title, description and other stuff */
	header;
	/** Images are mounted to this DIV */
	list;
	constructor(drive) {
		super();
		this.drive = drive;
	}
	/** @deprecated not needed anymore */
	buildHeader() {
		return document.createElement("div");
	}
	buildList() {
		const element = document.createElement("div");
		element.style.boxSizing = "border-box";
		element.style.width = "100%";
		element.style.display = "flex";
		element.style.flexWrap = "wrap";
		return element;
	}
	buildInstance(instance, width, showAnalysis, showFileDate, showFileName, fontSize) {
		const container = document.createElement("div");
		container.style.width = width.toString() + "%";
		container.style.padding = GroupExportPNG.GAP_SMALL;
		container.style.boxSizing = "border-box";
		const wrapper = document.createElement("div");
		container.appendChild(wrapper);
		if (showFileDate || showFileName) {
			const label = document.createElement("div");
			if (showFileDate) {
				const date = this.createElementWithText("div", `${TimeFormat.human(instance.timeline.currentStep.absolute)}`, fontSize, "bold");
				label.appendChild(date);
			}
			if (showFileName) {
				const fileName = this.createElementWithText("div", showFileDate ? " - " + instance.fileName : instance.fileName, GroupExportPNG.FONT_SIZE_SMALL, showFileDate ? "normal" : "bold");
				label.appendChild(fileName);
			}
			wrapper.appendChild(label);
		}
		if (this.list) {
			const reference = this.group.files.value.find((i) => i.fileName === instance.fileName);
			if (reference) instance.timeline.setRelativeTime(reference?.timeline.currentMs);
			this.list.appendChild(container);
			instance.removeVisibleFile();
			instance.setPreferWebGl(false);
			instance.mountToDom(wrapper);
			instance.draw();
			if (instance.dom && instance.dom.visibleLayer) instance.dom.visibleLayer.getLayerRoot().style.display = "none";
			if (showAnalysis) {
				const referenceInstance = reference;
				if (referenceInstance && referenceInstance.analysis.value.length > 0) {
					const table = document.createElement("table");
					table.style.width = "100%";
					table.style.borderCollapse = "collapse";
					const header = document.createElement("tr");
					[
						"",
						"AVG",
						"MIN",
						"MAX"
					].forEach((string) => {
						const el = this.createElementWithText("th", string, fontSize, void 0, GroupExportPNG.COLOR_GRAY);
						el.style.padding = GroupExportPNG.GAP_SMALL + "px";
						el.style.textAlign = "left";
						header.appendChild(el);
					});
					table.appendChild(header);
					wrapper.appendChild(table);
					referenceInstance.slots.forEveryExistingSlot((slot, number) => {
						const localAnalysis = instance.slots.createAnalysisFromSerialized(slot.serialized, number);
						if (localAnalysis) {
							const row = document.createElement("tr");
							const name = this.createElementWithText("td", slot.analysis.name, fontSize, void 0, slot.analysis.initialColor);
							name.style.borderTop = `1px solid ${GroupExportPNG.COLOR_LIGHT}`;
							name.style.padding = `${GroupExportPNG.GAP_SMALL}px 0px ${GroupExportPNG.GAP_SMALL} 0px`;
							row.appendChild(name);
							const createAndAppendValue = (color, value) => {
								const td = this.createElementWithText("td", value ? value.toFixed(3) + " °C" : "", fontSize, void 0);
								td.style.borderTop = `1px solid ${GroupExportPNG.COLOR_LIGHT}`;
								td.style.paddingTop = `${GroupExportPNG.GAP_SMALL}px`;
								td.style.paddingBottom = `${GroupExportPNG.GAP_SMALL}px`;
								row.appendChild(td);
							};
							if (slot.analysis instanceof AbstractAreaAnalysis) {
								createAndAppendValue(slot.analysis.initialColor, localAnalysis.avg);
								createAndAppendValue(slot.analysis.initialColor, localAnalysis.min);
								createAndAppendValue(slot.analysis.initialColor, localAnalysis.max);
							} else if (slot.analysis instanceof PointAnalysis) {
								createAndAppendValue(slot.analysis.initialColor, localAnalysis.avg);
								createAndAppendValue(slot.analysis.initialColor);
								createAndAppendValue(slot.analysis.initialColor);
							}
							table.appendChild(row);
						}
					});
				}
			}
		}
	}
	onBuildDom() {
		this.header = this.buildHeader();
		this.list = this.buildList();
		this.container?.appendChild(this.header);
		this.container?.appendChild(this.list);
	}
	beforeDomRemoved() {
		if (this.localGroup) {
			this.localGroup.files.forEveryInstance((instance) => instance.unmountFromDom());
			this.localGroup.files.removeAllInstances();
		}
	}
	afterDomRemoved() {
		delete this.header;
		delete this.list;
		delete this.localGroup;
	}
	onDownload(params) {
		const registryId = Math.random().toFixed();
		const manager = this.group.registry.manager;
		const registry = manager.addOrGetRegistry(registryId);
		const group = registry.groups.addOrGetGroup(this.group.id);
		if (params.showGroupName && this.header) {
			const label = params.label ? params.label : this.group.label;
			this.header.appendChild(this.createElementWithText("div", label, params.fontSize.toString() + "px", "bold"));
			this.header.style.paddingBottom = GroupExportPNG.GAP_BASE;
		}
		if (params.showThermalScale) this.list?.appendChild(this.buildHorizontalScale(this.list, this.group.registry.minmax.value.min, this.group.registry.minmax.value.max, this.group.registry.range.value.from, this.group.registry.range.value.to, this.group.registry.palette.currentPalette.gradient, "gray", "black"));
		this.localGroup = group;
		manager.palette.setPalette(this.group.registry.manager.palette.value);
		registry.range.imposeRange(this.group.registry.range.value);
		const imagesThermalUrls = this.group.files.sortedFiles.map((file) => file.thermalUrl);
		let batch = void 0;
		imagesThermalUrls.forEach((url) => {
			batch = registry.batch.request(url, void 0, group, async () => {});
		});
		batch.onResolve.set("temporary export listener", (results) => {
			const width = 100 / params.columns;
			results.forEach((result) => {
				if (result instanceof ThermalFileInstance) this.buildInstance(result, width, params.showAnalysis, params.showFileDate, params.showFileName, params.fontSize.toString() + "px");
			});
			setTimeout(() => {
				if (this.container) this.downloadImage(params.fileName, this.container);
			}, 2e3);
		});
	}
	/**
	* Take provided parameters and combine them with defaults and add filename.
	*/
	getFinalParams(params) {
		const fileName = params?.fileName ? params.fileName : `group__${this.group.label}__export`;
		if (params === void 0) return {
			...GroupExportPNG.DEFAULT_PROPS,
			fileName
		};
		return {
			...GroupExportPNG.DEFAULT_PROPS,
			...params,
			fileName
		};
	}
};
//#endregion
//#region src/properties/analysis/sync/analysisSync.ts
var AnalysisSyncDrive = class AnalysisSyncDrive extends AbstractProperty {
	static LISTENER_KEY = "__analysis__sync";
	/** Event that is triggered every time a slot is synchronised & serialised */
	onSlotSync = new CallbacksManager();
	_currentPointer;
	/** The synchronisation happens every time on the basis of one instance that projects its analyses to other instances in the group. The currentPointer should be set often times - by user events such as hover, click etc.. */
	get currentPointer() {
		return this._currentPointer;
	}
	_csv;
	/** Lazy loaded CSV export object. */
	get csv() {
		if (!this._csv) this._csv = new GroupExportCSV(this);
		return this._csv;
	}
	_png;
	/** Lazy loaded PNG export object. */
	get png() {
		if (!this._png) this._png = new GroupExportPNG(this);
		return this._png;
	}
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	/**
	* Enable analysis synchronisation for the group
	*/
	turnOn(instance) {
		this.value = true;
		this.setCurrentPointer(instance);
	}
	/**
	* Disable the synchronisation analysis for the group
	*/
	turnOff() {
		this.value = false;
		this.setCurrentPointer(void 0);
	}
	/**
	* Iterate  over all exsting slot in the current pointer instance
	*/
	forEveryExistingSlot(fn) {
		if (this._currentPointer === void 0) return;
		this._currentPointer.slots.forEveryExistingSlot(fn);
	}
	/**
	* Set a given instance as the current ponter for synchronisation
	*/
	setCurrentPointer(instance) {
		if (instance === void 0 && this._currentPointer) {
			this.endSyncingSlot(this._currentPointer, 1);
			this.endSyncingSlot(this._currentPointer, 2);
			this.endSyncingSlot(this._currentPointer, 3);
			this.endSyncingSlot(this._currentPointer, 4);
			this.endSyncingSlot(this._currentPointer, 5);
			this.endSyncingSlot(this._currentPointer, 6);
			this.endSyncingSlot(this._currentPointer, 7);
		}
		if (instance !== this._currentPointer) {
			if (this._currentPointer !== void 0) {
				this.endSyncingSlot(this._currentPointer, 1);
				this.endSyncingSlot(this._currentPointer, 2);
				this.endSyncingSlot(this._currentPointer, 3);
				this.endSyncingSlot(this._currentPointer, 4);
				this.endSyncingSlot(this._currentPointer, 5);
				this.endSyncingSlot(this._currentPointer, 6);
				this.endSyncingSlot(this._currentPointer, 7);
			}
			this._currentPointer = instance;
			if (this._currentPointer !== void 0) {
				this.startSyncingSlot(this._currentPointer, 1);
				this.startSyncingSlot(this._currentPointer, 2);
				this.startSyncingSlot(this._currentPointer, 3);
				this.startSyncingSlot(this._currentPointer, 4);
				this.startSyncingSlot(this._currentPointer, 5);
				this.startSyncingSlot(this._currentPointer, 6);
				this.startSyncingSlot(this._currentPointer, 7);
			}
		}
	}
	getSlotListeners(instance, slotNumber) {
		const slot = instance.slots.getSlot(slotNumber);
		if (slotNumber === 1) return {
			slot,
			serialise: instance.slots.onSlot1Serialize,
			assign: instance.slots.onSlot1Assignement
		};
		else if (slotNumber === 2) return {
			slot,
			serialise: instance.slots.onSlot2Serialize,
			assign: instance.slots.onSlot2Assignement
		};
		else if (slotNumber === 3) return {
			slot,
			serialise: instance.slots.onSlot3Serialize,
			assign: instance.slots.onSlot3Assignement
		};
		else if (slotNumber === 4) return {
			slot,
			serialise: instance.slots.onSlot4Serialize,
			assign: instance.slots.onSlot4Assignement
		};
		else if (slotNumber === 5) return {
			slot,
			serialise: instance.slots.onSlot5Serialize,
			assign: instance.slots.onSlot5Assignement
		};
		else if (slotNumber === 6) return {
			slot,
			serialise: instance.slots.onSlot6Serialize,
			assign: instance.slots.onSlot6Assignement
		};
		else if (slotNumber === 7) return {
			slot,
			serialise: instance.slots.onSlot7Serialize,
			assign: instance.slots.onSlot7Assignement
		};
	}
	/**
	* Interrnal method to start synchronisation of a given slot number on the given instance
	*/
	startSyncingSlot(instance, slotNumber) {
		const { serialise } = this.getSlotListeners(instance, slotNumber);
		serialise.set(AnalysisSyncDrive.LISTENER_KEY, (value) => {
			this.forEveryOtherSlot(instance, slotNumber, (sl, f) => {
				if (f.group.analysisSync.value === false) return;
				if (!f.dom?.built) return;
				this.onSlotSync.call(value, slotNumber);
				if (sl === void 0 && value) f.slots.createAnalysisFromSerialized(value, slotNumber)?.setSelected();
				else if (sl !== void 0 && value) {
					sl.recieveSerialized(value);
					this.onSlotSync.call(sl ? sl.serialized : void 0, slotNumber);
				} else if (sl !== void 0 && value === void 0) sl.analysis.file.slots.removeSlotAndAnalysis(slotNumber);
			});
		});
	}
	/**
	* Internal method to end synchronisation of a given slot number on the given instance
	*/
	endSyncingSlot(instance, slotNumber) {
		const { assign, serialise } = this.getSlotListeners(instance, slotNumber);
		assign.delete(AnalysisSyncDrive.LISTENER_KEY);
		serialise.delete(AnalysisSyncDrive.LISTENER_KEY);
	}
	/**
	* Deletes a slot and analysis from all instances in the group except the provided one
	*/
	deleteSlot(instance, slotNumber) {
		this.forEveryOtherSlot(instance, slotNumber, (slot) => {
			slot?.analysis.file.slots.removeSlotAndAnalysis(slotNumber);
		});
	}
	/**
	* A method for synchronising selection state across all instances of the group 
	*/
	setSlotSelected(instance, slotNumber) {
		this.forEveryOtherSlot(instance, slotNumber, (slot) => {
			slot?.analysis.setSelected(false);
		});
	}
	/**
	* A method for synchronising selection state across all instances of the group 
	*/
	setSlotDeselected(instance, slotNumber) {
		this.forEveryOtherSlot(instance, slotNumber, (slot) => {
			slot?.analysis.setDeselected();
		});
	}
	/** 
	* Execute a given function on all files slot 
	*/
	forEveryOtherSlot(instance, slotNumber, fn) {
		this.parent.files.forEveryInstance((file) => {
			if (file === instance) return;
			fn(file.slots.getSlot(slotNumber), file);
		});
	}
	/**
	* Recieve a serialised value from somewhere and propagate it to all instances in the group except the current pointer
	* @deprecated Used only by old webcomponents and perhaps unnecessary
	*/
	recieveSlotSerialized(serialized, slot) {
		this.parent.files.forEveryInstance((instance) => {
			if (instance === this.currentPointer || instance.group.analysisSync.value === false) return;
			if (serialized) {
				const sl = instance.slots.getSlot(slot);
				if (sl) sl.recieveSerialized(serialized);
				else instance.slots.createAnalysisFromSerialized(serialized, slot);
			} else instance.slots.removeSlotAndAnalysis(slot);
		});
	}
	/**
	* Take an instance and copy its value in one slot to all other instances in the group 
	* 
	* - this action deletes any existing slots in the affected instances and creates new ones from the serialised data
	*/
	copyOneSlotToAllInstances(instance, slotNumber) {
		this.setCurrentPointer(instance);
		const slot = instance.slots.getSlot(slotNumber);
		const serialized = slot?.serialized ?? slot?.analysis.toSerialized();
		this.parent.files.forEveryInstance((otherInstance) => {
			if (otherInstance === instance) return;
			if (otherInstance.slots.hasSlot(slotNumber)) otherInstance.slots.removeSlotAndAnalysis(slotNumber);
			if (!serialized) return;
			otherInstance.slots.createAnalysisFromSerialized(serialized, slotNumber)?.setSelected();
		});
	}
	/** 
	* Copy the entire analysis state from one instance to all other instances in the group 
	* 
	* - this action deletes any existing slots in the affected instances and creates new ones from the serialised data
	*/
	copyAllSlotsToAllInstances(instance) {
		[
			1,
			2,
			3,
			4,
			5,
			6,
			7
		].forEach((slotNumber) => {
			this.copyOneSlotToAllInstances(instance, slotNumber);
		});
	}
};
//#endregion
//#region src/properties/cursor/CursorPositionDrive.ts
/** Handles cursor position */
var CursorPositionDrive = class extends AbstractProperty {
	_hover = this.value !== void 0;
	get hover() {
		return this._hover;
	}
	validate(value) {
		return value;
	}
	afterSetEffect(value) {
		this._hover = this.value !== void 0;
		this.parent.files.forEveryInstance((instance) => instance.recieveCursorPosition(value));
	}
	recieveCursorPosition(position) {
		this.value = position;
	}
};
//#endregion
//#region src/properties/lists/filesState.ts
var FilesState = class extends AbstractProperty {
	_map = /* @__PURE__ */ new Map();
	get map() {
		return this._map;
	}
	validate(value) {
		return value.sort((a, b) => a.timestamp - b.timestamp);
	}
	/** Array of all files sorted by timestamp from the earliest to the latest. */
	get sortedFiles() {
		return this.value.sort((a, b) => {
			return a.timestamp - b.timestamp;
		});
	}
	/**
	* Whenever the instances change, recreate the index
	*/
	afterSetEffect(value) {
		this.map.clear();
		value.forEach((instance) => this._map.set(instance.thermalUrl, instance));
	}
	addFile(file) {
		if (!this._map.has(file.thermalUrl)) {
			this.value = [...this.value, file];
			return file;
		} else return this._map.get(file.thermalUrl);
	}
	removeFile(file) {
		const entry = file instanceof ThermalFileInstance ? file : this.map.get(file);
		if (entry) {
			entry.unmountFromDom();
			this.value = this.value.filter((e) => e.thermalUrl !== entry.thermalUrl);
		}
	}
	/**
	* Removal
	*/
	removeAllInstances() {
		this.forEveryInstance((instance) => instance.destroySelfAndBelow());
		this.value = [];
	}
	/** 
	* Iteration through all instances
	*/
	forEveryInstance(fn) {
		this.value.forEach((instance) => fn(instance));
	}
	downloadAllFiles() {
		const files = [];
		this.forEveryInstance((instance) => {
			const blob = new Blob([instance.reader.fileBuffer], { type: instance.reader.fileMimeType });
			const file = new File([blob], instance.fileName, { type: instance.reader.fileMimeType });
			files.push(file);
		});
		downloadZip(files).blob().then((blob) => {
			const link = document.createElement("a");
			link.download = `${this.parent.name || this.parent.id || "thermal_group"}_files.zip`;
			link.href = URL.createObjectURL(blob);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			link.remove();
		});
	}
	async batchCreateInstances(readers, doReplaceExisting = false) {
		const instances = await Promise.all(readers.map(async (reader) => await reader.createInstance(this.parent, false)));
		if (doReplaceExisting) {
			this.forEveryInstance((instance) => instance.destroySelfAndBelow());
			this.value = instances;
		} else this.value = [...this.value, ...instances];
	}
};
//#endregion
//#region src/properties/scale/abstractMinmaxProperty.ts
/** 
* A common basis for all Minmax properties 
*/
var AbstractMinmaxProperty = class extends AbstractProperty {
	/** Get the current distance between min and max */
	get distanceInCelsius() {
		if (this.value === void 0) return;
		return Math.abs(this.value.min - this.value.max);
	}
};
//#endregion
//#region src/properties/scale/MinmaxGroupProperty.ts
var MinmaxGroupProperty = class extends AbstractMinmaxProperty {
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	/** Call this method once all instances are created */
	recalculateFromInstances() {
		this.value = this._getMinmaxFromInstances();
		return this.value;
	}
	_getMinmaxFromInstances() {
		const instances = this.parent.files.value;
		if (instances.length === 0) return void 0;
		return instances.reduce((state, current) => {
			if (current.min < state.min || current.max > state.max) return {
				min: current.min < state.min ? current.min : state.min,
				max: current.max > state.max ? current.max : state.max
			};
			return state;
		}, {
			min: Infinity,
			max: -Infinity
		});
	}
};
//#endregion
//#region src/properties/time/group/GroupPlayback.ts
/** 
* Control coordinated playback of files within a group. 
* 
* The value is actual time in relative MS (from start, to the end of the latest sequence).
* 
* This functionality depends on batch analysis of all group files.
* 
* @todo Group should have its own loading method for batch processing. This method should provide its own callbacks.
*/
var GroupPlayback = class extends AbstractProperty {
	_hasAnyPlayback = false;
	/** Does this group include any sequence? */
	get hasAnyPlayback() {
		return this._hasAnyPlayback;
	}
	set hasAnyPlayback(value) {
		if (this._hasAnyPlayback !== value) {
			this._hasAnyPlayback = value;
			this.onHasAnyCallback.call(value);
		}
	}
	onHasAnyCallback = new CallbacksManager();
	recalculateHasAnyPlayback(instances) {
		let temporaryHas = false;
		instances.forEach((i) => {
			if (i.timeline.isSequence) temporaryHas = true;
		});
		this.hasAnyPlayback = temporaryHas;
	}
	_playing = false;
	get playing() {
		return this._playing;
	}
	set playing(value) {
		if (this._playing !== value) {
			this._playing = value;
			this.onPlayingStatusChange.call(this._playing);
		}
	}
	onPlayingStatusChange = new CallbacksManager();
	/** Internal pointer holding the current loop iteration*/
	loopStep = 0;
	/** Internal setTimeout for playback. */
	loopTimer;
	_loopInterval = 20;
	/** Interval upon which the main loop triggers. In MS. */
	get loopInterval() {
		return this._loopInterval;
	}
	/** @deprecated The playback interval should not change during playback */
	setLoopInterval(value) {
		this._loopInterval = Math.round(value);
		this.onLoopIntervalChanged.call(this._loopInterval);
	}
	/** @deprecated The loop playback should not change during playback */
	onLoopIntervalChanged = new CallbacksManager();
	_duration = 0;
	get duration() {
		return this._duration;
	}
	set duration(value) {
		if (value !== this._duration) {
			this._duration = value;
			this.onDurationChanged.call(this._duration);
		}
	}
	onDurationChanged = new CallbacksManager();
	recalculateDuration(instances) {
		let temporaryDuration = 0;
		instances.forEach((instance) => {
			if (instance.timeline.duration > temporaryDuration) temporaryDuration = instance.timeline.duration;
		});
		this.duration = temporaryDuration;
	}
	UUID = this.parent.id + "__listener";
	constructor(parent, initial) {
		super(parent, initial);
		this.recalculateDuration(this.parent.files.value);
		this.recalculateHasAnyPlayback(this.parent.files.value);
		/**
		* Listen to completed batches to retrieve 
		* the maximal duration
		*/
		this.parent.registry.batch.onBatchComplete.set(this.UUID, (results) => {
			const instances = results.filter((res) => res instanceof ThermalFileInstance);
			this.recalculateDuration(instances);
			this.recalculateHasAnyPlayback(instances);
			const newVal = this.value;
			this.value = newVal;
		});
	}
	validate(value) {
		return Math.min(Math.max(value, 0), this.duration);
	}
	afterSetEffect(value) {
		this.parent.files.forEveryInstance((instance) => instance.timeline.setRelativeTime(value));
	}
	/** Set time value by percent. The actual MS is calculated depending on the duration. */
	setValueByPercent(percent) {
		const ms = this.percentToMs(percent);
		if (ms !== this.value) {
			this.value = ms;
			this.loopStep = Math.floor(this.duration / this.value);
			if (this.playing) this.createTimerStep(true);
		}
	}
	/** Set the time value by MS. */
	setValueByRelativeMs(relativeMs) {
		this.value = relativeMs;
		this.loopStep = Math.floor(this.duration / this.value);
		if (this.playing) this.createTimerStep(true);
	}
	/** Convert percent value to relative time in MS */
	percentToMs(percent) {
		return Math.floor(this.duration * (percent / 100));
	}
	/** Convert relative time in MS to percent value */
	msToPercent(ms) {
		return ms / this.duration * 100;
	}
	/**
	* The main method that shall create a timer leading to the next step.
	* 
	* It might be called recursively to ensure fluent playback.
	*/
	createTimerStep(recursive = false) {
		if (this.duration === void 0 || this.playing === false) return;
		const nextStep = this.loopStep + 1;
		const nextValue = nextStep * this.loopInterval;
		this.loopStep = nextStep;
		if (nextValue <= this.duration) {
			if (this.loopTimer) clearTimeout(this.loopTimer);
			this.loopTimer = setTimeout(() => {
				this.createTimerStep(recursive);
				this.value = nextValue;
			}, this.loopInterval);
		} else this.playing = false;
	}
	/**
	* Play the entire group
	*/
	play() {
		if (this.playing === false) {
			this.playing = true;
			this.createTimerStep(true);
		}
	}
	/**
	* Stop the entire group
	*/
	stop() {
		if (this.playing === true) {
			this.playing = false;
			if (this.loopTimer) clearTimeout(this.loopTimer);
		}
	}
	/**
	* Set the MS value to 0
	*/
	reset() {
		if (this.value !== 0) {
			this.value = 0;
			this.loopStep = 0;
		}
	}
};
//#endregion
//#region src/hierarchy/ThermalGroup.ts
/**
* Group of thermal images
*/
var ThermalGroup = class extends BaseStructureObject {
	registry;
	id;
	name;
	description;
	hash = Math.random();
	/** Human readable label = name or id or hasn */
	get label() {
		return this.name ?? this.id ?? this.hash;
	}
	get pool() {
		return this.registry.manager.pool;
	}
	constructor(registry, id, name, description) {
		super();
		this.registry = registry;
		this.id = id;
		this.name = name;
		this.description = description;
	}
	minmax = new MinmaxGroupProperty(this, void 0);
	/** Tool drive from above */
	get tool() {
		return this.registry.manager.tool;
	}
	files = new FilesState(this, []);
	cursorPosition = new CursorPositionDrive(this, void 0);
	analysisSync = new AnalysisSyncDrive(this, false);
	analysisGraph = new AnalysisGroupGraph(this);
	_playback;
	get playback() {
		if (!this._playback) this._playback = new GroupPlayback(this, 0);
		return this._playback;
	}
	/** Iteration */
	forEveryInstance = (fn) => {
		this.files.value.forEach((instance) => fn(instance));
	};
	/** Remove all instances, reset the minmax */
	destroySelfAndBelow() {
		this.removeAllChildren();
		this.minmax.reset();
	}
	removeAllChildren() {
		this.files.removeAllInstances();
	}
	reset() {
		this.files.reset();
		this.minmax.reset();
		this.cursorPosition.reset();
		this.analysisSync.reset();
	}
	filters = new FilterContainer(this);
	getInstances() {
		return this.files.value;
	}
	startBatch(id) {
		return this.registry.batch.getBatchById(id);
	}
};
//#endregion
//#region src/properties/lists/GroupsState.ts
/** Handles group creation and removal */
var GroupsState = class extends AbstractProperty {
	_map = /* @__PURE__ */ new Map();
	get map() {
		return this._map;
	}
	validate(value) {
		return value;
	}
	afterSetEffect(value) {
		this._map.clear();
		value.forEach((group) => this._map.set(group.id, group));
	}
	addExistingGroup(group) {
		if (!this.value.map((g) => g.hash).includes(group.hash)) this.value = [...this.value, group];
	}
	addOrGetGroup(groupId, name, description) {
		if (this._map.has(groupId)) return this._map.get(groupId);
		const group = new ThermalGroup(this.parent, groupId, name, description);
		this._map.set(groupId, group);
		this.value.push(group);
		this.value = [...this.value];
		return group;
	}
	removeGroup(groupId) {
		if (!this._map.has(groupId)) return;
		this._map.get(groupId)?.destroySelfAndBelow();
		this._map.delete(groupId);
		this.value = Array.from(this._map.values());
	}
	removeAllGroups() {
		this.value.forEach((group) => group.destroySelfAndBelow());
		this.value = [];
	}
};
//#endregion
//#region src/properties/scale/MinmaxRegistryState.ts
var MinmaxRegistryProperty = class extends AbstractMinmaxProperty {
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	recalculateFromGroups() {
		const groups = this.parent.groups.value;
		this.value = this._getMinmaxFromAllGroups(groups);
		return this.value;
	}
	_getMinmaxFromAllGroups(groups) {
		if (groups.length === 0) return;
		return groups.reduce((state, current) => {
			if (current.minmax.value === void 0) return state;
			return {
				min: current.minmax.value.min < state.min ? current.minmax.value.min : state.min,
				max: current.minmax.value.max > state.max ? current.minmax.value.max : state.max
			};
		}, {
			min: Infinity,
			max: -Infinity
		});
	}
};
//#endregion
//#region src/properties/scale/RangeDriver.ts
/** Handles the thermal range display. */
var RangeDriver = class extends AbstractProperty {
	onAutoValueChanged = new CallbacksManager();
	_autoValue = void 0;
	get currentRange() {
		return this.value;
	}
	/** 
	* Make sure the range is allways within the minmax values.
	* 
	* If this method should work, the value needs to be set before the minmax is calculated.
	*/
	validate(value) {
		if (value === void 0) return;
		const minmax = this.parent.minmax.value;
		if (minmax === void 0) return value;
		const result = { ...value };
		if (value.from < minmax.min) result.from = minmax.min;
		if (value.to > minmax.max) result.to = minmax.max;
		return result;
	}
	/**
	* Whenever the range changes, propagate the value to all instances
	*/
	afterSetEffect(value) {
		if (value) this.parent.forEveryInstance((instance) => instance.draw());
		this.recalculateAutoValue();
	}
	/** 
	* Imposes a range to itself and below
	* - needs to be called before the minmax is calculated!
	*/
	imposeRange(value) {
		if (value === void 0 && this.value === void 0) {} else if (value === void 0 && this.value !== void 0) this.value = value;
		if (value !== void 0 && this.value === void 0) this.value = value;
		else if (value !== void 0 && this.value !== void 0) {
			if (this.value.from !== value.from || this.value.to !== value.to) this.value = value;
		}
		return this.value;
	}
	/** Sets the range to the current minmax values */
	applyMinmax() {
		if (this.parent.minmax.value) {
			const newRange = {
				from: this.parent.minmax.value.min,
				to: this.parent.minmax.value.max
			};
			this.imposeRange(newRange);
		}
	}
	/** Sets the range automatically based on the current histogram */
	applyAuto() {
		this.imposeRange(this._autoValue);
	}
	get autoValue() {
		return this._autoValue;
	}
	recalculateAutoValue() {
		const previousValue = this._autoValue;
		if (this.parent.histogram.value) {
			const percentage = 10;
			const histogramBarsOverPercentage = this.parent.histogram.value.filter((bar) => bar.height >= percentage);
			if (histogramBarsOverPercentage.length > 0) this._autoValue = {
				from: histogramBarsOverPercentage[0].from,
				to: histogramBarsOverPercentage[histogramBarsOverPercentage.length - 1].to
			};
			else this._autoValue = void 0;
		} else this._autoValue = void 0;
		if (previousValue?.from !== this._autoValue?.from || previousValue?.to !== this._autoValue?.to) this.onAutoValueChanged.call(this._autoValue);
		return this._autoValue;
	}
};
//#endregion
//#region src/properties/states/HistogramResultCache.ts
const MAX_CACHE_ENTRIES = 64;
const HISTOGRAM_ALGORITHM_VERSION = 1;
const cloneHistogram = (histogram) => histogram.map((item) => ({ ...item }));
/**
* Shared, bounded cache for computed histogram results.
* Reader identity avoids filename collisions and lets copied instances reuse
* results even when their registry belongs to a different manager.
*/
var HistogramResultCache = class {
	readerIds = /* @__PURE__ */ new WeakMap();
	nextReaderId = 0;
	entries = /* @__PURE__ */ new Map();
	inFlight = /* @__PURE__ */ new Map();
	getOrCalculate(readers, calculate) {
		const key = this.createKey(readers);
		const cached = this.entries.get(key);
		if (cached !== void 0) {
			this.touch(key, cached);
			return Promise.resolve(cloneHistogram(cached));
		}
		const pending = this.inFlight.get(key);
		if (pending) return pending.then(cloneHistogram);
		const calculation = Promise.resolve().then(calculate).then((result) => {
			const safeResult = cloneHistogram(result);
			this.entries.set(key, safeResult);
			this.evictOverflow();
			return safeResult;
		}).finally(() => {
			if (this.inFlight.get(key) === calculation) this.inFlight.delete(key);
		});
		this.inFlight.set(key, calculation);
		return calculation.then(cloneHistogram);
	}
	createKey(readers) {
		const readerIds = readers.map((reader) => this.getReaderId(reader)).sort((a, b) => a - b);
		return `${HISTOGRAM_ALGORITHM_VERSION}:${readerIds.join(",")}`;
	}
	getReaderId(reader) {
		let id = this.readerIds.get(reader);
		if (id === void 0) {
			id = ++this.nextReaderId;
			this.readerIds.set(reader, id);
		}
		return id;
	}
	touch(key, value) {
		this.entries.delete(key);
		this.entries.set(key, value);
	}
	evictOverflow() {
		while (this.entries.size > MAX_CACHE_ENTRIES) {
			const leastRecentlyUsed = this.entries.keys().next().value;
			if (leastRecentlyUsed === void 0) return;
			this.entries.delete(leastRecentlyUsed);
		}
	}
};
/** Shared across all managers using this core module instance. */
const histogramResultCache = new HistogramResultCache();
//#endregion
//#region src/properties/states/HistogramState.ts
/** 
* Handles the histogram creation and subscription.
* - should be used only in registries
*/
var HistogramState = class extends AbstractProperty {
	_resolution = 150;
	get resolution() {
		return this._resolution;
	}
	/** Map of temperature => countOfPixels in the scaled down resolution @deprecated */
	buffer = /* @__PURE__ */ new Map();
	/** Total countOfPixels in every image @deprecated */
	bufferPixelsCount = 0;
	/** @deprecated */
	_bufferResolution = 1e3;
	set bufferResolution(value) {
		this._bufferResolution = Math.round(Math.max(value, 1e3));
	}
	get bufferResolution() {
		return this._bufferResolution;
	}
	_loading = false;
	get loading() {
		return this._loading;
	}
	set loading(value) {
		this._loading = value;
	}
	onCalculationStart = new CallbacksManager();
	onCalculationEnd = new CallbacksManager();
	/** Set the historgam resolution
	* - does not recalculate the value!
	* - to recalculate value, call `recalculateWithCurrentSetting`
	* 
	* @notice Higher the number, lower the resolution.
	* @deprecated Resolution is calculated in a separate thread, no resolution changes allowed
	*/
	setResolution(value) {
		this._resolution = Math.round(Math.min(Math.max(value, 2), 1e3));
	}
	/** If incorrect resolution is being set, set empty array @todo there may be an error in +1*/
	validate(value) {
		return value;
	}
	afterSetEffect() {
		this.parent.range.recalculateAutoValue();
	}
	/**
	* Keep the legacy entry point while recalculating the displayed histogram
	* through the shared result cache.
	*/
	recalculateHistogramBufferInWorker() {
		this.recalculateHistogram();
	}
	async recalculateHistogram() {
		const allFiles = this.parent.groups.value.map((group) => group.files.value).reduce((state, current) => {
			state = state.concat(current);
			return state;
		}, []);
		if (allFiles.length === 0 || this.parent.minmax.value === void 0 || this.parent.minmax.distanceInCelsius === void 0) return;
		this.onCalculationStart.call();
		this.loading = true;
		try {
			const readers = allFiles.map((instance) => instance.reader);
			const result = await histogramResultCache.getOrCalculate(readers, () => this.calculateHistogram(readers));
			this.value = result;
			this.loading = false;
			this.onCalculationEnd.call(true);
		} catch (error) {
			this.loading = false;
			this.onCalculationEnd.call(false);
			console.error("Error calculating histogram", error);
		}
	}
	/**
	* Pure LRC registries keep the original LRC calculation. Any other set
	* collects temperatures of every file with its own parser and bins them
	* in one shared range.
	*/
	async calculateHistogram(readers) {
		if (readers.every((reader) => reader.parser === LrcParser)) return this.parent.pool.exec(LrcParser.registryHistogram, [readers.map((reader) => reader.buffer)]);
		const pixelSets = await Promise.all(readers.map((reader) => this.parent.pool.exec(reader.parser.histogramPixels, [reader.buffer])));
		return this.parent.pool.exec(histogramFromPixels, [pixelSets]);
	}
};
//#endregion
//#region src/properties/states/LoadingState.ts
var LoadingState = class extends AbstractProperty {
	validate(value) {
		return value;
	}
	afterSetEffect() {}
	markAsLoading() {
		if (this.value === false) this.value = true;
	}
	markAsLoaded() {
		if (this.value === true) this.value = false;
	}
};
//#endregion
//#region src/hierarchy/ThermalRegistry.ts
/**
* The global thermal registry
* @todo implementing EventTarget
*/
var ThermalRegistry = class extends BaseStructureObject {
	id;
	manager;
	hash = Math.random();
	constructor(id, manager, options) {
		super();
		this.id = id;
		this.manager = manager;
		this.palette = this.manager.palette;
		if (options) {
			if (options.histogramResolution !== void 0) {
				if (options.histogramResolution > 0) this.histogram.setResolution(options.histogramResolution);
			}
		}
	}
	/** Service */
	get service() {
		return this.manager.service;
	}
	get pool() {
		return this.manager.pool;
	}
	/** Groups are stored in an observable property */
	groups = new GroupsState(this, []);
	/** Iterator methods */
	forEveryGroup(fn) {
		this.groups.value.forEach(fn);
	}
	forEveryInstance(fn) {
		this.forEveryGroup((group) => group.files.forEveryInstance(fn));
	}
	/** Full load of the registry with multiple files @deprecated */
	async loadFullMultipleFiles(files) {
		this.reset();
		this.loading.markAsLoading();
		const servicesByGroup = await Promise.all(Object.entries(files).map(async ([groupId, fs]) => {
			return {
				group: this.groups.addOrGetGroup(groupId),
				groupFiles: await Promise.all(fs.map((file) => {
					return this.service.loadFile(file.thermalUrl, file.visibleUrl);
				}))
			};
		}));
		const result = await Promise.all(servicesByGroup.map(async ({ group, groupFiles }) => {
			return await Promise.all(groupFiles.map(async (service) => {
				if (service instanceof ThermalFileReader) return await service.createInstance(group);
				else return false;
			}));
		}));
		this.postLoadedProcessing();
		return result;
	}
	/** Load the registry with only one file. @deprecated */
	async loadFullOneFile(file, groupId) {
		this.reset();
		this.loading.markAsLoading();
		const group = this.groups.addOrGetGroup(groupId);
		const result = await this.service.loadFile(file.thermalUrl, file.visibleUrl);
		const instanceOrError = result instanceof ThermalFileReader ? await result.createInstance(group) : result;
		this.loading.markAsLoaded();
		this.postLoadedProcessing();
		return instanceOrError;
	}
	_batch;
	get batch() {
		if (!this._batch) this._batch = new BatchLoader(this);
		return this._batch;
	}
	/** @deprecated use batch member class instead */
	registerRequest(thermalUrl, visibleUrl = void 0, group, callback) {
		this.batch.request(thermalUrl, visibleUrl, group, callback);
	}
	onProcessingStart = new CallbacksManager();
	onProcessingEnd = new CallbacksManager();
	/** 
	* Actions to take after the registry is loaded 
	* - recalculate the minmax of groups
	* - recalculate minmax of registry
	* - impose new minmax as new range
	* - recalculate the histogram
	*/
	async postLoadedProcessing() {
		this.onProcessingStart.call();
		this.forEveryGroup((group) => group.minmax.recalculateFromInstances());
		this.minmax.recalculateFromGroups();
		if (this.minmax.value) if (this.range.value === void 0) this.range.imposeRange({
			from: this.minmax.value.min,
			to: this.minmax.value.max
		});
		else {
			const newFrom = Math.max(this.range.value.from, this.minmax.value.min);
			const newTo = Math.min(this.range.value.to, this.minmax.value.max);
			if (newFrom !== this.range.value.from || newTo !== this.range.value.to) this.range.imposeRange({
				from: Math.max(this.range.value.from, this.minmax.value.min),
				to: Math.min(this.range.value.to, this.minmax.value.max)
			});
		}
		this.histogram.recalculateHistogramBufferInWorker();
		this.loading.markAsLoaded();
		this.onProcessingEnd.call();
	}
	reset() {
		this.groups.removeAllGroups();
		this.opacity.reset();
		this.minmax.reset();
	}
	removeAllChildren() {
		this.groups.removeAllGroups();
	}
	destroySelfAndBelow() {
		this.reset();
	}
	destroySelfInTheManager() {
		this.manager.removeRegistry(this.id);
	}
	/**
	* Observable properties and drives
	*/
	/** 
	* Opacity property 
	*/
	opacity = new OpacityDrive(this, 1);
	/** 
	* Minmax property 
	*/
	minmax = new MinmaxRegistryProperty(this, void 0);
	/**
	* Loading
	*/
	loading = new LoadingState(this, false);
	/**
	* Range
	*/
	range = new RangeDriver(this, void 0);
	/**
	* Histogram
	*/
	histogram = new HistogramState(this, []);
	/**
	* Palette
	*/
	palette;
	filters = new FilterContainer(this);
	getInstances() {
		let instances = [];
		this.groups.value.forEach((group) => {
			instances = [...instances, ...group.getInstances()];
		});
		return instances;
	}
};
//#endregion
//#region src/properties/analysis/tool/internals/AbstractTool.ts
var AbstractTool = class {
	manager;
	active = false;
	constructor(manager) {
		this.manager = manager;
	}
	/** Action taken upon tool activation */
	activate() {
		this.onActivate();
	}
	/** Actions taken upon tool deactivation */
	deactivate() {
		this.onDeactivate();
	}
};
//#endregion
//#region src/properties/analysis/analysis/internals/AbstractAddTool.ts
/** Tool for analysis addition */
var AbstractAddTool = class extends AbstractTool {};
//#endregion
//#region src/properties/analysis/analysis/internals/area/ellipsis/AddEllipsisTool.ts
var AddEllipsisTool = class extends AbstractAddTool {
	key = "add-ellipsis";
	name = "addellipsisanalysis";
	description = "clickandaddellipsis";
	icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path fill="currentcolor" d="M48.87,21.96C47.6,9.62,37.17,0,24.5,0,10.97,0,0,10.97,0,24.5h0c0,12.67,9.62,23.1,21.96,24.37,2.71,8.76,10.88,15.13,20.54,15.13,11.87,0,21.5-9.63,21.5-21.5,0-9.66-6.37-17.82-15.13-20.54ZM4,24.5C4,13.2,13.2,4,24.5,4c10.15,0,18.57,7.42,20.2,17.11-.72-.07-1.45-.11-2.2-.11-11.87,0-21.5,9.63-21.5,21.5,0,.74.04,1.47.11,2.2-9.69-1.62-17.11-10.05-17.11-20.2ZM55.23,44.5h-10.65v10.65h-4v-10.65h-10.65v-4h10.65v-10.65h4v10.65h10.65v4Z"/>
</svg>`;
	onActivate() {
		this.manager.forEveryInstance((instance) => {
			instance.analysis.layers.selectedOnly.forEach((analysis) => {
				analysis.setDeselected();
			});
		});
	}
	onDeactivate() {}
	onCanvasLeave() {}
	onCanvasClick(top, left, file) {
		file.analysis.layers.createEllipsisFrom(top, left).setSelected(true);
	}
	onPointDown() {}
	onPointUp(point) {
		if (!point.isInSelectedLayer()) return;
		point.deactivate();
		point.analysis.file.group.tool.selectTool("edit");
		point.analysis.setReady();
		if (point.analysis.width <= 0 || point.analysis.height <= 0) point.analysis.layers.removeAnalysis(point.analysis.key);
		else if (point.analysis.file.slots.value.size <= AnalysisSlotsState.MAX_SLOTS) {
			const slot = point.analysis.file.slots.getNextFreeSlotNumber();
			if (slot !== void 0) point.file.slots.assignAnalysisToSlot(slot, point.analysis);
		}
	}
	onPointMove(point, top, left) {
		if (point.isInSelectedLayer() && point.active) {
			point.setXFromTool(left);
			point.setYFromTool(top);
			point.analysis.onMoveOrResize.call(point.analysis);
		}
	}
	onPointLeave() {}
	onPointEnter() {}
	getLabelValue = (x, y, file) => {
		return `X:${x}<br />Y:${y}<br />${file.group.tool.tools.inspect.getLabelValue(x, y, file)}`;
	};
};
//#endregion
//#region src/properties/analysis/analysis/internals/area/rectangle/AddRectangleTool.ts
var AddRectangleTool = class extends AbstractAddTool {
	key = "add-rect";
	name = "addrectangleanalysis";
	description = "clickandaddrectangle";
	icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M49,22.01V0H0v49h22.01c2.76,8.7,10.89,15,20.49,15,11.87,0,21.5-9.63,21.5-21.5,0-9.61-6.3-17.74-15-20.49ZM4,45V4h41v17.16c-.82-.1-1.65-.16-2.5-.16-11.87,0-21.5,9.63-21.5,21.5,0,.85.06,1.68.16,2.5H4ZM55.23,44.5h-10.65v10.65h-4v-10.65h-10.65v-4h10.65v-10.65h4v10.65h10.65v4Z" fill="currentcolor"/>
</svg>`;
	onActivate() {
		this.manager.forEveryInstance((instance) => {
			instance.analysis.layers.selectedOnly.forEach((analysis) => {
				analysis.setDeselected();
			});
		});
	}
	onDeactivate() {}
	onCanvasLeave() {}
	onCanvasClick(x, y, file) {
		file.analysis.layers.createRectFrom(x, y).setSelected(true);
	}
	onPointDown() {}
	onPointUp(point) {
		if (!point.isInSelectedLayer()) return;
		point.deactivate();
		point.analysis.file.group.tool.selectTool("edit");
		point.analysis.setReady();
		if (point.analysis.width <= 0 || point.analysis.height <= 0) point.analysis.layers.removeAnalysis(point.analysis.key);
		else {
			const slot = point.analysis.file.slots.getNextFreeSlotNumber();
			if (slot !== void 0) point.file.slots.assignAnalysisToSlot(slot, point.analysis);
		}
	}
	onPointMove(point, top, left) {
		if (point.isInSelectedLayer() && point.active) {
			point.setXFromTool(left);
			point.setYFromTool(top);
			point.analysis.onMoveOrResize.call(point.analysis);
		}
	}
	onPointLeave() {}
	onPointEnter() {}
	getLabelValue = (x, y, file) => {
		return `X:${x}<br />Y:${y}<br />${file.group.tool.tools.inspect.getLabelValue(x, y, file)}`;
	};
};
//#endregion
//#region src/properties/analysis/analysis/internals/point/AddPointTool.ts
var AddPointTool = class extends AbstractAddTool {
	key = "add-point";
	name = "addpointanalysis";
	description = "clickandaddpoint";
	icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path fill="currentcolor" d="M34,19h-15v15h-4v-15H0v-4h15V0h4v15h15v4ZM64,42.5c0,11.87-9.63,21.5-21.5,21.5s-21.5-9.63-21.5-21.5,9.63-21.5,21.5-21.5,21.5,9.63,21.5,21.5ZM55.23,40.5h-10.65v-10.65h-4v10.65h-10.65v4h10.65v10.65h4v-10.65h10.65v-4Z"/>
</svg>`;
	onActivate() {
		this.manager.forEveryInstance((instance) => {
			instance.analysis.layers.selectedOnly.forEach((analysis) => {
				analysis.setDeselected();
			});
		});
	}
	onDeactivate() {}
	onCanvasLeave() {}
	onCanvasClick(x, y, file) {
		file.analysis.layers.createPointAt(x, y).setSelected(true);
	}
	onPointDown() {}
	onPointUp(point) {
		if (!point.isInSelectedLayer()) return;
		point.deactivate();
		point.analysis.file.group.tool.selectTool("edit");
		point.analysis.setReady();
		point.analysis.onMoveOrResize.call(point.analysis);
	}
	onPointMove() {}
	onPointLeave() {}
	onPointEnter() {}
	getLabelValue = (x, y, file) => {
		return `X:${x}<br />Y:${y}<br />${file.group.tool.tools.inspect.getLabelValue(x, y, file)}`;
	};
};
//#endregion
//#region src/properties/analysis/tool/internals/EditTool.ts
var EditTool = class extends AbstractTool {
	key = "edit";
	name = "editanalysis";
	description = "dragcornersofselectedanalysis";
	icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <polygon points="34 17.03 34 -.02 30 -.02 30 17.03 17 17.03 17 32 0 32 0 36 17 36 17 47 46.97 47 46.97 17.03 34 17.03" fill="currentcolor"/>
</svg>`;
	onActivate() {}
	onDeactivate() {}
	onCanvasLeave() {}
	onCanvasClick() {}
	onPointEnter(point) {
		point.mouseEnter();
	}
	onPointLeave(point) {
		if (point.active === false) point.mouseLeave();
	}
	onPointMove(point, top, left) {
		if (point.isInSelectedLayer() && point.active) {
			point.setXFromTool(left);
			point.setYFromTool(top);
			point.analysis.onMoveOrResize.call(point.analysis);
		}
	}
	onPointDown(point) {
		if (point.isInSelectedLayer() && point.active === false) point.activate();
	}
	onPointUp(point) {
		if (point.active === true) point.deactivate();
	}
	getLabelValue(x, y, file) {
		const temperature = file.getTemperatureAtPoint(x, y);
		const hoveredAnalysis = file.analysis.layers.all.filter((analysis) => analysis.isWithin(x, y)).map((analysis) => {
			const element = analysis.selected ? "span" : "s";
			return `<${element} style="color: ${analysis.initialColor};">
                    ${analysis.name}
                </${element}>`;
		});
		return `${hoveredAnalysis.length > 0 ? hoveredAnalysis.join("<br />") + "<br />" : ""}${temperature && temperature.toFixed(2) + " °C<br />"}X: ${x}<br />Y: ${y}`;
	}
};
//#endregion
//#region src/properties/analysis/tool/internals/InspectTool.ts
var InspectTool = class extends AbstractTool {
	key = "inspect";
	name = "inspecttemperatures";
	description = "usemousetoinspecttemperaturevalues";
	icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M17.58,42.03c-1.39,0-2.65-.34-3.79-1.01-1.14-.68-2.04-1.58-2.72-2.72-.68-1.14-1.01-2.4-1.01-3.78s.34-2.65,1.01-3.79c.67-1.14,1.58-2.04,2.72-2.72,1.14-.68,2.4-1.01,3.79-1.01s2.65.34,3.79,1.01c1.14.68,2.04,1.58,2.72,2.72s1.01,2.4,1.01,3.79-.34,2.64-1.01,3.78c-.68,1.14-1.58,2.05-2.72,2.72-1.14.68-2.4,1.01-3.79,1.01ZM17.58,37.04c.47,0,.9-.11,1.28-.34.38-.23.69-.53.91-.92.22-.39.34-.81.34-1.27s-.11-.9-.34-1.28c-.23-.38-.53-.69-.91-.91s-.81-.34-1.28-.34-.88.11-1.27.34c-.39.23-.69.53-.92.91-.23.38-.34.81-.34,1.28s.11.88.34,1.27c.22.39.53.69.92.92.39.23.81.34,1.27.34ZM56.24,38.45h-8.28c-.06-.69-.21-1.31-.46-1.87-.25-.56-.59-1.04-1.03-1.45-.44-.41-.96-.72-1.58-.94s-1.32-.33-2.1-.33c-1.37,0-2.53.33-3.47,1s-1.66,1.62-2.14,2.86-.73,2.74-.73,4.48c0,1.84.25,3.38.74,4.62s1.21,2.17,2.15,2.79c.94.62,2.07.93,3.39.93.75,0,1.43-.1,2.03-.29.6-.19,1.12-.47,1.56-.83.44-.36.8-.8,1.08-1.31.28-.51.47-1.09.57-1.74l8.28.06c-.1,1.27-.46,2.57-1.07,3.88-.62,1.32-1.49,2.53-2.62,3.64s-2.53,2-4.19,2.68c-1.67.68-3.6,1.01-5.8,1.01-2.76,0-5.24-.59-7.43-1.78-2.19-1.18-3.92-2.93-5.18-5.23-1.27-2.3-1.9-5.12-1.9-8.45s.65-6.17,1.94-8.47c1.29-2.3,3.04-4.03,5.23-5.21,2.19-1.18,4.64-1.77,7.34-1.77,1.9,0,3.65.26,5.24.78,1.6.52,3,1.28,4.2,2.27,1.2.99,2.17,2.22,2.91,3.66s1.18,3.11,1.34,4.98ZM30,0H0v30L30,0Z" fill="currentcolor"/>
</svg>`;
	onActivate() {}
	onDeactivate() {}
	onCanvasClick() {}
	onCanvasLeave() {}
	onPointEnter() {}
	onPointLeave() {}
	onPointMove() {}
	onPointDown() {}
	onPointUp() {}
	getLabelValue = (x, y, file) => {
		if (file === void 0) return "";
		try {
			return file.getTemperatureAtPoint(x, y).toFixed(2) + " °C";
		} catch (error) {
			console.error("Error getting tool label at point", error);
			return "";
		}
	};
};
//#endregion
//#region src/properties/analysis/tool/ToolDrive.ts
const toolsRegistry = [
	InspectTool,
	AddPointTool,
	AddRectangleTool,
	AddEllipsisTool,
	EditTool
];
/** Instantiates the tool for the given group. Uses `definedTools` as source. */
const createDefinedTools = (group) => {
	const arrayOfEntries = toolsRegistry.map((cls) => {
		const instance = new cls(group);
		return [instance.key, instance];
	});
	return Object.fromEntries(arrayOfEntries);
};
var ToolDrive = class extends AbstractProperty {
	/** Create own set of tools from the registry of tools */
	_tools = createDefinedTools(this.parent);
	/** Readonly list of available tools */
	get tools() {
		return this._tools;
	}
	constructor(parent, initial) {
		super(parent, initial);
	}
	validate(value) {
		return value;
	}
	afterSetEffect(value) {
		if (value) {
			value.activate();
			Object.values(this.tools).forEach((tool) => {
				if (tool.key !== value.key) tool.deactivate();
			});
		}
	}
	/** Pick a tool. Its activation is handled by the `afterSetEffect` */
	selectTool(tool) {
		if (tool instanceof AbstractTool) this.value = tool;
		else this.value = this.tools[tool];
	}
};
//#endregion
//#region src/hierarchy/ThermalManager.ts
const options = "chrome" in window ? { maxWorkers: 4 } : {};
const globalPool = workerpool.pool(options);
var ThermalManager = class extends BaseStructureObject {
	id;
	/** Service for creation of loading and caching the files. */
	service = new FilesService(this);
	/** Index of existing registries */
	registries = {};
	/** A palette is common to all registries within the manager */
	palette = new PaletteDrive(this, "jet");
	smooth = new SmoothDrive(this, false);
	graphSmooth = new GraphSmoothDrive(this, false);
	tool = new ToolDrive(this, new InspectTool(this));
	pool;
	constructor(pool, options) {
		super();
		this.pool = pool ? pool : globalPool;
		this.id = Math.random();
		if (options) {
			if (options.palette) this.palette.setPalette(options.palette);
		}
	}
	forEveryRegistry(fn) {
		Object.values(this.registries).forEach((registry) => fn(registry));
	}
	addOrGetRegistry(id, options) {
		if (this.registries[id] === void 0) this.registries[id] = new ThermalRegistry(id, this, options);
		return this.registries[id];
	}
	removeRegistry(id) {
		if (this.registries[id] !== void 0) {
			this.registries[id].destroySelfAndBelow();
			delete this.registries[id];
		}
	}
	filters = new FilterContainer(this);
	getInstances() {
		let instances = [];
		this.forEveryRegistry((registry) => {
			instances = [...instances, ...registry.getInstances()];
		});
		return instances;
	}
	forEveryInstance(callback) {
		this.forEveryRegistry((registry) => registry.forEveryInstance(callback));
	}
	destroySelfAndBelow() {
		this.removeAllChildren();
		this.reset();
	}
	removeAllChildren() {
		this.forEveryRegistry((registry) => {
			this.removeRegistry(registry.id);
		});
	}
	reset() {
		this.palette.reset();
		this.smooth.reset();
		this.graphSmooth.reset();
		this.tool.reset();
	}
};
//#endregion
//#region src/utils/time/periods.ts
/** Defined time periods used in the LabIR ecosystem. */
let TimePeriod = /* @__PURE__ */ function(TimePeriod) {
	TimePeriod["HOUR"] = "jednu hodinu";
	TimePeriod["DAY"] = "jeden den";
	TimePeriod["WEEK"] = "jeden týden";
	TimePeriod["MONTH"] = "jeden měsíc";
	TimePeriod["YEAR"] = "jeden rok";
	return TimePeriod;
}({});
//#endregion
//#region src/utils/time/rounding.ts
/** Utility class for time rounding in the LabIR ecosystem. */
var TimeRound = class TimeRound extends TimeUtilsBase {
	static down = (value, roundTo) => {
		if (roundTo === "jednu hodinu") return startOfHour(value);
		else if (roundTo === "jeden den") return startOfDay(value);
		else if (roundTo === "jeden týden") return startOfWeek(value);
		else if (roundTo === "jeden měsíc") return startOfMonth(value);
		return startOfYear(value);
	};
	static up = (value, roundTo) => {
		if (roundTo === "jednu hodinu") return endOfHour(value);
		else if (roundTo === "jeden den") return endOfDay(value);
		else if (roundTo === "jeden týden") return endOfWeek(value);
		else if (roundTo === "jeden měsíc") return endOfMonth(value);
		return endOfYear(value);
	};
	static pick = (value, period) => {
		return [TimeRound.down(value, period), TimeRound.up(value, period)];
	};
	static modify = (value, amount, period) => {
		switch (period) {
			case "jednu hodinu": return addHours(value, amount);
			case "jeden den": return addDays(value, amount);
			case "jeden týden": return addDays(value, amount * 7);
			case "jeden měsíc": return addMonths(value, amount);
			case "jeden rok": return addYears(value, amount);
		}
	};
};
//#endregion
//#region src/index.ts
console.info("@labirthermal/core", version);
//#endregion
export { AbstractAddTool, AbstractAnalysis, AbstractAreaAnalysis, AbstractFileResult, AbstractTool, AddEllipsisTool, AddRectangleTool, AnalysisGraph, Batch, CallbacksManager, DropinElementListener, EditTool, EllipsisAnalysis, InspectTool, PointAnalysis, RectangleAnalysis, ThermalFileFailure, ThermalFileInstance, ThermalFileReader, ThermalGroup, ThermalManager, ThermalPalettes, ThermalRegistry, TimeFormat, TimePeriod, TimeRound, availableAnalysisColors, getPool, playbackSpeed, supportedFileTypes, supportedFileTypesInputProperty };

//# sourceMappingURL=index.mjs.map