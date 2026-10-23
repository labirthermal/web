
import { IParserObject } from "../structure";
import { baseInfo } from "./jobs/baseInfo";
import { frameData, getFrameSubset } from "./jobs/getFrameSubset";
import { pointAnalysisData } from "./jobs/pointAnalysisData";
import { rectAnalysisData } from "./jobs/rectAnalysisData";
import { registryHistogram } from "./jobs/histogram";
import { is } from "./jobs/is";
import { ellipsisAnalysisData } from "./jobs/ellipsisAnalysisData";



const extensions: IParserObject["extensions"] = [{
    extension: "lrc",
    minme: "application/octet-stream"
}];




const parser: IParserObject = {
    name: "LabIR Recording (.lrc)",
    description: "Radiometric data developed by the Infrared Technologies research team at the University of West Bohemia in Pilsen (CZ)",
    devices: [{
        deviceName: "TIMI Edu Infrared Camera",
        deviceUrl: "https://edu.labir.cz",
        deviceDescription: "A thermal camera designed for school education.",
        manufacturer: "TIMI Creation, s.r.o.",
        manufacturerUrl: "https://timic.cz"
    },
    {
        deviceName: "Custom measurement systems by IRT UWB in Pilsen (CZ)",
        deviceUrl: "https://irt.zcu.cz",
        deviceDescription: "Specialised applications of IR diagnostics in the field of industry, research, medicine, security or education.",
        manufacturer: "IRT UWB in Pilsen (CZ)",
        manufacturerUrl: "https://irt.zcu.cz"
    }],
    extensions,
    is,
    baseInfo,
    getFrameSubset,
    frameData,
    registryHistogram,
    pointAnalysisData,
    rectAnalysisData,
    ellipsisAnalysisData
}

export const LrcParser = Object.freeze( parser );