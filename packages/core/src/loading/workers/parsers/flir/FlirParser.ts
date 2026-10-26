import { IParserObject } from "../structure";
import { ellipsisAnalysisData, pointAnalysisData, rectAnalysisData } from "./jobs/analysisData";
import { baseInfo } from "./jobs/baseInfo";
import { frameData, getFrameSubset } from "./jobs/frameData";
import { histogramPixels, registryHistogram } from "./jobs/histogram";
import { is } from "./jobs/is";
import { prepare } from "./jobs/prepare";

const extensions: IParserObject["extensions"] = [
    {
        extension: "jpg",
        minme: "image/jpeg"
    },
    {
        extension: "jpeg",
        minme: "image/jpeg"
    }
];

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
const parser: IParserObject = {
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

export const FlirParser = Object.freeze( parser );
