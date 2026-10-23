import { version } from "../package.json";

console.info("@labirthermal/core", version);


// The callback manager is a crucial class
export { CallbacksManager } from "./properties/callbacksManager";

// Pool related exports
export { getPool } from "./utils/pool";

// Reexporting external libraries
// export  * as zip from "zip-slim"

// Core hierarchy classes

export type { IParserObject } from "./loading/workers/parsers/structure";

// Manager
export { ThermalManager } from "./hierarchy/ThermalManager";
export type { ThermalManagerOptions } from "./hierarchy/ThermalManager";

// Registry
export { ThermalRegistry } from "./hierarchy/ThermalRegistry";
export type { ThermalRegistryOptions } from "./hierarchy/ThermalRegistry";
export type { ThermalMinmaxOrUndefined } from "./properties/scale/abstractMinmaxProperty";
export type { ThermalRangeOrUndefined } from "./properties/scale/RangeDriver";
export { Batch } from "./loading/batch/Batch";
export { supportedFileTypes, supportedFileTypesInputProperty } from "./loading/workers/parsers";
export{ DropinElementListener } from "./loading/workers/dropin/DropinElementManager";

// Group
export { ThermalGroup } from "./hierarchy/ThermalGroup";
export type { ThermalCursorPositionOrUndefined } from "./properties/cursor/CursorPositionDrive";

// Instance
export { AbstractFileResult } from "./loading/workers/AbstractFileResult";
export { ThermalFileFailure } from "./loading/workers/ThermalFileFailure";
export { ThermalFileReader } from "./loading/workers/ThermalFileReader";
export { ThermalFileInstance } from "./file/ThermalFileInstance";


// Playback related exports
export type { PlaybackSpeeds } from "./properties/time/playback/TimelineDrive";
export { playbackSpeed } from "./properties/time/playback/TimelineDrive";
export type { ParsedTimelineFrame } from "./loading/workers/parsers/structure";





// Analysis related exports
export {
    availableAnalysisColors
} from "./properties/analysis/analysis/storage/AnalysisLayersStorage";
export { AnalysisGraph } from "./properties/analysis/data/graphs/AnalysisGraph";
export { AbstractAnalysis } from "./properties/analysis/analysis/internals/AbstractAnalysis";
export { AbstractAreaAnalysis } from "./properties/analysis/analysis/internals/area/AbstractAreaAnalysis";
export type { AnalysisDataStateValue } from "./properties/analysis/data/AnalysisDataState";

// Slot related exports
export type { SlotNumber, SlotUnion } from "./properties/analysis/analysis/storage/AnalysisLayersStorage";


// Tool related exports
export { AbstractTool } from "./properties/analysis/tool/internals/AbstractTool";
export { AbstractAddTool } from "./properties/analysis/analysis/internals/AbstractAddTool";
export { AddEllipsisTool } from "./properties/analysis/analysis/internals/area/ellipsis/AddEllipsisTool";
export { EllipsisAnalysis } from "./properties/analysis/analysis/internals/area/ellipsis/EllipsisAnalysis";
export { RectangleAnalysis } from "./properties/analysis/analysis/internals/area/rectangle/RectangleAnalysis";
export { PointAnalysis } from "./properties/analysis/analysis/internals/point/PointAnalysis";
export { AddRectangleTool } from "./properties/analysis/analysis/internals/area/rectangle/AddRectangleTool";
export { EditTool } from "./properties/analysis/tool/internals/EditTool";
export { InspectTool } from "./properties/analysis/tool/internals/InspectTool";
export type { ThermalTool } from "./properties/analysis/tool/ToolDrive";

// Palette related exports
export { ThermalPalettes } from "./properties/scale/palettes";
export type { AvailableThermalPalette, ThermalPaletteType } from "./properties/scale/palettes";

// Time related exports
export { TimeFormat } from "./utils/time/formatting";
export { TimePeriod } from "./utils/time/periods";
export { TimeRound } from "./utils/time/rounding";








