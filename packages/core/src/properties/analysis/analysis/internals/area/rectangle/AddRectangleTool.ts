import { ThermalFileInstance } from "../../../../../../file/ThermalFileInstance";
import { ITool } from "../../../../tool/internals/AbstractTool";
import { AbstractAddTool } from "../../AbstractAddTool";
import { AbstractPoint } from "../../AbstractPoint";

export class AddRectangleTool extends AbstractAddTool implements ITool {

    public readonly key: string = "add-rect";
    public readonly name: string = "addrectangleanalysis";
    public readonly description: string = "clickandaddrectangle";
    public readonly icon: string = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M49,22.01V0H0v49h22.01c2.76,8.7,10.89,15,20.49,15,11.87,0,21.5-9.63,21.5-21.5,0-9.61-6.3-17.74-15-20.49ZM4,45V4h41v17.16c-.82-.1-1.65-.16-2.5-.16-11.87,0-21.5,9.63-21.5,21.5,0,.85.06,1.68.16,2.5H4ZM55.23,44.5h-10.65v10.65h-4v-10.65h-10.65v-4h10.65v-10.65h4v10.65h10.65v4Z" fill="currentcolor"/>
</svg>`;


    protected onActivate(): void {
        this.manager.forEveryInstance(instance => {
            instance.analysis.layers.selectedOnly.forEach(analysis => {
                analysis.setDeselected();
            });
        });
    }


    protected onDeactivate(): void { }


    public onCanvasLeave(): void { }


    public onCanvasClick(x: number, y: number, file: ThermalFileInstance): void {
        const newRect = file.analysis.layers.createRectFrom(x, y);
        newRect.setSelected(true);
    }


    public onPointDown(): void { }


    public onPointUp(point: AbstractPoint): void {

        if ( ! point.isInSelectedLayer() ) {
            return;
        }

        point.deactivate();
        point.analysis.file.group.tool.selectTool("edit");
        point.analysis.setReady();

        if (point.analysis.width <= 0 || point.analysis.height <= 0) {
            point.analysis.layers.removeAnalysis(point.analysis.key);
        } else {
            const slot = point.analysis.file.slots.getNextFreeSlotNumber();
            if ( slot !== undefined ) {
                point.file.slots.assignAnalysisToSlot( slot, point.analysis );
            }
        }

    }


    public onPointMove(point: AbstractPoint, top: number, left: number): void {
        if (point.isInSelectedLayer() && point.active) {
            point.setXFromTool( left );
            point.setYFromTool( top );
            point.analysis.onMoveOrResize.call( point.analysis );
        }
    }


    public onPointLeave(): void { }


    public onPointEnter(): void { }


    public getLabelValue = (x: number, y: number, file: ThermalFileInstance): string => {
        const temperature = file.group.tool.tools.inspect.getLabelValue(x, y, file);
        return `X:${x}<br />Y:${y}<br />${temperature}`;
    }

}