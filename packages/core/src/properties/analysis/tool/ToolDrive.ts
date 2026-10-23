import { ThermalManager } from "../../../hierarchy/ThermalManager";
import { AbstractProperty } from "../../abstractProperty";
import { AddEllipsisTool } from "../analysis/internals/area/ellipsis/AddEllipsisTool";
import { AddRectangleTool } from "../analysis/internals/area/rectangle/AddRectangleTool";
import { AddPointTool } from "../analysis/internals/point/AddPointTool";
import { AbstractTool, ITool } from "./internals/AbstractTool";
import { EditTool } from "./internals/EditTool";
import { InspectTool } from "./internals/InspectTool";

type ToolClass = new (group: ThermalManager) => AbstractTool & ITool & { key: string}

const toolsRegistry: ToolClass[] = [
    InspectTool,
    AddPointTool,
    AddRectangleTool,
    AddEllipsisTool,
    EditTool
]

/** Instantiates the tool for the given group. Uses `definedTools` as source. */
const createDefinedTools = (group: ThermalManager) => {
    const arrayOfEntries = toolsRegistry.map((cls) => {

        const instance = new cls( group );

        return [
            instance.key as ToolKeys,
            instance as ThermalTool
        ]
    });

    return Object.fromEntries( arrayOfEntries ) as {
        [index in ToolKeys]: ThermalTool
    }
}

/** @deprecated Indicies of defined tools. Not inferred properly. */
type ToolKeys = InstanceType<ToolClass>["key"];

/** The tool type merging Abstract class and the interface */
export type ThermalTool = AbstractTool & ITool & {
    key: string
};

export class ToolDrive extends AbstractProperty<ThermalTool, ThermalManager> {

    /** Create own set of tools from the registry of tools */
    protected _tools = createDefinedTools( this.parent );

    /** Readonly list of available tools */
    public get tools() {
        return this._tools;
    }

    public constructor(
        parent: ThermalManager,
        initial: ThermalTool
    ) {
        super(parent, initial);
    }

    protected validate(value: ThermalTool): ThermalTool {
        return value;
    }
    protected afterSetEffect(value: ThermalTool): void {
        // Activate the selected tool
        if (value) {
            value.activate();
            // Deactivate all other tools
            Object.values(this.tools).forEach(tool => {
                if (tool.key !== value.key) {
                    tool.deactivate();
                }
            });
        }

    }

    /** Pick a tool. Its activation is handled by the `afterSetEffect` */
    selectTool(
        tool: ThermalTool | keyof ToolDrive["tools"]
    ) {
        if (tool instanceof AbstractTool) {
            this.value = tool;
        } else {
            this.value = this.tools[tool];
        }
    }
}