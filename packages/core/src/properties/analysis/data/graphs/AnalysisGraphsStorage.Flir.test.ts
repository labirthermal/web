import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, test } from "vitest";
import { ThermalManager } from "../../../../hierarchy/ThermalManager";
import { ThermalFileReader } from "../../../../loading/workers/ThermalFileReader";
import { FlirParser } from "../../../../parsers/flir/FlirParser";
import { ThermalUnit } from "../../../scale/units";

/**
 * Reference-test strategy:
 * - Upload the FLIR JPEG through ThermalManager.service, then create a normal file instance.
 * - Add the LabIR rectangle, ellipse and points through the core analysis storage.
 * - Export the graph in Celsius, Fahrenheit and Kelvin and compare against the accompanying LabIR text reference.
 *
 * The reference is rounded to one decimal place. Expectations are converted independently
 * in this test, then compared with a tolerance for that rounding.
 */

const IMAGE_FILE = "flir_02.jpg";
const REFERENCE_FILE = "reference_analysis_data_from_LabIR_Software.txt";
const here = dirname(fileURLToPath(import.meta.url));
const referenceTolerance = {
    [ThermalUnit.C]: 0.051,
    [ThermalUnit.F]: 0.091,
    [ThermalUnit.K]: 0.051
};

const UNITS = [
    { key: ThermalUnit.C, symbol: "°C", convert: (celsius: number) => celsius },
    { key: ThermalUnit.F, symbol: "°F", convert: (celsius: number) => celsius * 9 / 5 + 32 },
    { key: ThermalUnit.K, symbol: "K", convert: (celsius: number) => celsius + 273.15 }
];

type SectionValues = {
    rectangle: { top: number; left: number; right: number; bottom: number; min: number; max: number; avg: number };
    ellipse: { top: number; left: number; right: number; bottom: number; min: number; max: number; avg: number };
    points: Array<{ x: number; y: number; value: number }>;
};

/** Reads an image fixture and returns a standalone buffer suitable for File. */
const readFixture = (fileName: string): ArrayBuffer => {
    const file = readFileSync(join(here, "../../../../../../../public/flir", fileName));
    const buffer = new ArrayBuffer(file.byteLength);
    new Uint8Array(buffer).set(file);
    return buffer;
};

/** Finds a named LabIR section in the human-readable reference file. */
const readSection = (text: string, title: string): string => {
    const section = text.split(/^## /m).find(block => block.startsWith(`${title}\n`));
    if (!section) {
        throw new Error(`Could not find "${title}" in ${REFERENCE_FILE}`);
    }
    return section.slice(title.length).trim();
};

/** Reads a numeric field from one LabIR reference section. */
const readValue = (section: string, label: string): number => {
    const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = new RegExp(`^${escapedLabel}:\\s*(-?\\d+(?:\\.\\d+)?)\\s*$`, "m").exec(section);
    if (!match) {
        throw new Error(`Could not find "${label}" in the FLIR reference section`);
    }
    return Number(match[1]);
};

/** Parses the fixture's rectangle, ellipse and point references. */
const readReference = (): SectionValues => {
    const text = readFileSync(join(here, "../../../../../../../public/flir", REFERENCE_FILE), "utf8");
    const rectangleSection = readSection(text, "Rectangle analysis");
    const ellipseSection = readSection(text, "Elipsis analysis");
    const point1Section = readSection(text, "Point analysis 1");
    const point2Section = readSection(text, "Point analysis 2");
    const xCoordinates = [...rectangleSection.matchAll(/^x:\s*(\d+)\s*$/gm)];
    const yCoordinates = [...rectangleSection.matchAll(/^y:\s*(\d+)\s*$/gm)];

    if (xCoordinates.length !== 2 || yCoordinates.length !== 2) {
        throw new Error("Could not read the rectangle corners from the FLIR reference");
    }

    return {
        rectangle: {
            left: Number(xCoordinates[0][1]),
            top: Number(yCoordinates[0][1]),
            right: Number(xCoordinates[1][1]),
            bottom: Number(yCoordinates[1][1]),
            min: readValue(rectangleSection, "Min"),
            max: readValue(rectangleSection, "Max"),
            avg: readValue(rectangleSection, "Prům")
        },
        ellipse: {
            top: readValue(ellipseSection, "Top"),
            left: readValue(ellipseSection, "Left"),
            right: readValue(ellipseSection, "Right"),
            bottom: readValue(ellipseSection, "Bottom"),
            min: readValue(ellipseSection, "Min"),
            max: readValue(ellipseSection, "Max"),
            avg: readValue(ellipseSection, "Prům")
        },
        points: [point1Section, point2Section].map(section => ({
            x: readValue(section, "x"),
            y: readValue(section, "y"),
            value: readValue(section, "Temperature")
        }))
    };
};

/** Verifies an exported value against the one-decimal Celsius reference. */
const expectReferenceValue = (
    actual: number,
    expectedCelsius: number,
    convert: (value: number) => number,
    unit: ThermalUnit,
    context: string
) => {
    expect(Math.abs(actual - convert(expectedCelsius)), context)
        .toBeLessThanOrEqual(referenceTolerance[unit]);
};

describe("AnalysisGraphsStorage FLIR export: flir_02.jpg", () => {
    const manager = new ThermalManager();
    const registry = manager.registries.addOrGetRegistry("analysis-export-flir");
    const group = registry.groups.addOrGetGroup("reference");

    let reference: SectionValues;
    let instance: Awaited<ReturnType<ThermalFileReader["createInstance"]>>;

    beforeAll(async () => {
        reference = readReference();
        const upload = new File([readFixture(IMAGE_FILE)], IMAGE_FILE);
        const result = await manager.service.loadUploadedFile(upload);
        if (!(result instanceof ThermalFileReader)) {
            throw new Error(`Could not load ${IMAGE_FILE} as a thermal file`);
        }

        expect(result.parser).toBe(FlirParser);
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

    test.each(UNITS)("exports LabIR values in $key", ({ key, symbol, convert }) => {
        manager.unit.set(key);
        const { header, data } = instance.analysisData.listeners.generateExportData();
        expect(data).toHaveLength(1);

        const exported = data[0];
        for (const label of [
            "Rectangle 1 MIN", "Rectangle 1 MAX", "Rectangle 1 AVG",
            "Ellipse 1 MIN", "Ellipse 1 MAX", "Ellipse 1 AVG",
            "Point 1", "Point 2"
        ]) {
            const column = header.find(item => item.key === label);
            expect(column?.displayLabel, `Missing export column ${label}`).toContain(`[${symbol}]`);
        }

        const checkValue = (label: string, expected: number) => {
            expectReferenceValue(
                Number(exported[label]),
                expected,
                convert,
                key,
                `${label} in ${key}`
            );
        };

        checkValue("Rectangle 1 MIN", reference.rectangle.min);
        checkValue("Rectangle 1 MAX", reference.rectangle.max);
        checkValue("Rectangle 1 AVG", reference.rectangle.avg);
        checkValue("Ellipse 1 MIN", reference.ellipse.min);
        checkValue("Ellipse 1 MAX", reference.ellipse.max);
        checkValue("Ellipse 1 AVG", reference.ellipse.avg);
        checkValue("Point 1", reference.points[0].value);
        checkValue("Point 2", reference.points[1].value);
    });
});
