import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, test } from "vitest";
import { ThermalManager } from "../../../../hierarchy/ThermalManager";
import { ThermalFileReader } from "../../../../loading/workers/ThermalFileReader";
import { LrcParser } from "../../../../parsers/lrc/LrcParser";
import { ThermalUnit } from "../../../scale/units";

/**
 * Reference-test strategy:
 * - Upload each LRC fixture through ThermalManager.service, then create a normal file instance.
 * - Add the reference rectangle, ellipse and points through the core analysis storage.
 * - Export graph data in Celsius, Fahrenheit and Kelvin and compare every available LabIR CSV row by elapsed time.
 * - Also verify that the export contains all parsed frames, including frames absent from some reference CSVs.
 *
 * CSV reference values are rounded by LabIR. Their temperature values are converted independently
 * in this test before comparison, so the same export conversion logic is not used for expectations.
 */

const REFERENCE_FILES = [
    "sequence_float32_small_short",
    "sequence_uint16_small_short",
    "sequence_float32_large_20frames",
    "sequence_uint16_large_20frames"
];

const UNITS = [
    { key: ThermalUnit.C, symbol: "°C", convert: (celsius: number) => celsius },
    { key: ThermalUnit.F, symbol: "°F", convert: (celsius: number) => celsius * 9 / 5 + 32 },
    { key: ThermalUnit.K, symbol: "K", convert: (celsius: number) => celsius + 273.15 }
];

const here = dirname(fileURLToPath(import.meta.url));
const referenceTolerance = 0.002;

type AnalysisReference = {
    rectangle: { left: number; top: number; right: number; bottom: number };
    ellipse: { left: number; top: number; right: number; bottom: number };
    points: Array<{ x: number; y: number }>;
    rows: string[][];
    rectangleColumns: { min: number; max: number; avg: number };
    ellipseColumns: { min: number; max: number; avg: number };
};

/** Reads a repository fixture and returns a standalone buffer suitable for File. */
const readFixture = (fileName: string): ArrayBuffer => {
    const file = readFileSync(join(here, "../../../../../../../public/lrc", fileName));
    const buffer = new ArrayBuffer(file.byteLength);
    new Uint8Array(buffer).set(file);
    return buffer;
};

/** Parses the coordinates, statistic columns and rows in a LabIR LRC CSV export. */
const readReferenceTable = (fileName: string): AnalysisReference => {
    const text = new TextDecoder("windows-1250").decode(readFixture(`${fileName}.csv`));
    const lines = text.trim().split(/\r?\n/);
    const analysisHeader = lines[2];
    const statisticHeaders = lines[3].split(";");

    const rectangle = /Obdélník \d+ \[(\d+); (\d+)\], \[(\d+); (\d+)\]/.exec(analysisHeader);
    const ellipse = /Elipsa \d+ \[(\d+); (\d+)\], (\d+); (\d+)/.exec(analysisHeader);
    const points = [...analysisHeader.matchAll(/Bod \d+ \[(\d+); (\d+)\]/g)];

    if (!rectangle || !ellipse || points.length !== 2) {
        throw new Error(`Could not read analysis coordinates from ${fileName}.csv`);
    }

    const columnFor = (statistic: string, start: number, end: number): number => {
        const index = statisticHeaders.slice(start, end + 1).indexOf(statistic);
        if (index === -1) {
            throw new Error(`Could not find "${statistic}" in ${fileName}.csv`);
        }
        return start + index;
    };

    const centerX = Number(ellipse[1]);
    const centerY = Number(ellipse[2]);
    const ellipseWidth = Number(ellipse[3]);
    const ellipseHeight = Number(ellipse[4]);
    // The supplied LabIR exports match the core when the converted ellipse bounds shift by half a pixel.
    const ellipseLeft = centerX - ellipseWidth / 2 - 0.5;
    const ellipseTop = centerY - ellipseHeight / 2 - 0.5;

    return {
        rectangle: {
            left: Number(rectangle[1]),
            top: Number(rectangle[2]),
            right: Number(rectangle[3]),
            bottom: Number(rectangle[4])
        },
        ellipse: {
            left: ellipseLeft,
            top: ellipseTop,
            right: ellipseLeft + ellipseWidth,
            bottom: ellipseTop + ellipseHeight
        },
        points: points.map(point => ({ x: Number(point[1]), y: Number(point[2]) })),
        rows: lines.slice(4)
            .map(line => line.split(";"))
            .filter(row => row[1] !== undefined && row[1] !== ""),
        rectangleColumns: {
            min: columnFor("Minimum", 2, 4),
            max: columnFor("Maximum", 2, 4),
            avg: columnFor("Průměr", 2, 4)
        },
        ellipseColumns: {
            min: columnFor("Minimum", 5, 7),
            max: columnFor("Maximum", 5, 7),
            avg: columnFor("Průměr", 5, 7)
        }
    };
};

/** Parses a decimal value from the comma-decimal LabIR CSV format. */
const readNumber = (value: string): number => Number(value.replace(",", "."));

/** Verifies an exported Celsius-derived value against a rounded LabIR reference. */
const expectReferenceValue = (actual: number, expectedCelsius: number, convert: (value: number) => number, context: string) => {
    expect(Math.abs(actual - convert(expectedCelsius)), context).toBeLessThanOrEqual(referenceTolerance);
};

describe.each(REFERENCE_FILES)("AnalysisGraphsStorage LRC export: %s", fileName => {
    const manager = new ThermalManager();
    const registry = manager.registries.addOrGetRegistry(`analysis-export-${fileName}`);
    const group = registry.groups.addOrGetGroup("reference");

    let instance: Awaited<ReturnType<ThermalFileReader["createInstance"]>>;
    let reference: AnalysisReference;

    beforeAll(async () => {
        reference = readReferenceTable(fileName);

        const upload = new File([readFixture(`${fileName}.lrc`)], `${fileName}.lrc`);
        const result = await manager.service.loadUploadedFile(upload);
        if (!(result instanceof ThermalFileReader)) {
            throw new Error(`Could not load ${fileName}.lrc as a thermal file`);
        }

        expect(result.parser).toBe(LrcParser);
        instance = await result.createInstance(group);
        instance.mountToDom(document.createElement("div"), false);

        const rectangle = instance.analysis.layers.placeRectAt(
            "Rectangle 1",
            reference.rectangle.top,
            reference.rectangle.left,
            reference.rectangle.right,
            reference.rectangle.bottom,
            "red",
            false
        );
        rectangle.graph.setMinActivation(true);
        rectangle.graph.setMaxActivation(true);
        rectangle.graph.setAvgActivation(true);

        const ellipse = instance.analysis.layers.placeEllipsisAt(
            "Ellipse 1",
            reference.ellipse.top,
            reference.ellipse.left,
            reference.ellipse.right,
            reference.ellipse.bottom,
            "blue",
            false
        );
        ellipse.graph.setMinActivation(true);
        ellipse.graph.setMaxActivation(true);
        ellipse.graph.setAvgActivation(true);

        const point1 = instance.analysis.layers.placePointAt(
            "Point 1",
            reference.points[0].y,
            reference.points[0].x,
            "green",
            false
        );
        point1.graph.setAvgActivation(true);

        const point2 = instance.analysis.layers.placePointAt(
            "Point 2",
            reference.points[1].y,
            reference.points[1].x,
            "yellow",
            false
        );
        point2.graph.setAvgActivation(true);

        await Promise.all([
            rectangle.graph.whenData(),
            ellipse.graph.whenData(),
            point1.graph.whenData(),
            point2.graph.whenData()
        ]);
    });

    test.each(UNITS)("exports reference values and all frames in $key", ({ key, symbol, convert }) => {
        manager.unit.set(key);
        const { header, data } = instance.analysisData.listeners.generateExportData();
        const rowsByTime = new Map(data.map(row => [Number(row.millisecondy), row]));

        expect(data).toHaveLength(instance.frameCount);
        expect(data.every(row => Number.isFinite(Number(row.millisecondy)))).toBe(true);

        for (const label of [
            "Rectangle 1 MIN", "Rectangle 1 MAX", "Rectangle 1 AVG",
            "Ellipse 1 MIN", "Ellipse 1 MAX", "Ellipse 1 AVG",
            "Point 1", "Point 2"
        ]) {
            const column = header.find(item => item.key === label);
            expect(column?.displayLabel, `Missing export column ${label}`).toContain(`[${symbol}]`);
        }

        for (const referenceRow of reference.rows) {
            const time = Math.round(readNumber(referenceRow[1]) * 1000);
            const exported = rowsByTime.get(time);
            expect(exported, `No exported row at ${time} ms`).toBeDefined();
            if (!exported) {
                throw new Error(`No exported row at ${time} ms`);
            }

            const checkArea = (
                prefix: "Rectangle 1" | "Ellipse 1",
                columns: AnalysisReference["rectangleColumns"]
            ) => {
                expectReferenceValue(
                    Number(exported[`${prefix} MIN`]),
                    readNumber(referenceRow[columns.min]),
                    convert,
                    `${prefix} minimum at ${time} ms in ${key}`
                );
                expectReferenceValue(
                    Number(exported[`${prefix} MAX`]),
                    readNumber(referenceRow[columns.max]),
                    convert,
                    `${prefix} maximum at ${time} ms in ${key}`
                );
                expectReferenceValue(
                    Number(exported[`${prefix} AVG`]),
                    readNumber(referenceRow[columns.avg]),
                    convert,
                    `${prefix} average at ${time} ms in ${key}`
                );
            };

            checkArea("Rectangle 1", reference.rectangleColumns);
            checkArea("Ellipse 1", reference.ellipseColumns);
            expectReferenceValue(
                Number(exported["Point 1"]),
                readNumber(referenceRow[8]),
                convert,
                `Point 1 at ${time} ms in ${key}`
            );
            expectReferenceValue(
                Number(exported["Point 2"]),
                readNumber(referenceRow[9]),
                convert,
                `Point 2 at ${time} ms in ${key}`
            );
        }
    });
});
