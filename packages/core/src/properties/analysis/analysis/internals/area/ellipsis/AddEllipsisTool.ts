import { ThermalFileInstance } from "../../../../../../file/ThermalFileInstance";
import { AnalysisSlotsState } from "../../../../slots/AnalysisSlotsDrive";
import { ITool } from "../../../../tool/internals/AbstractTool";
import { AbstractAddTool } from "../../AbstractAddTool";
import { AbstractPoint } from "../../AbstractPoint";

export class AddEllipsisTool extends AbstractAddTool implements ITool {

    public readonly key: string = "add-ellipsis";
    public readonly name: string = "addellipsisanalysis";
    public readonly description: string = "clickandaddellipsis";
    public readonly icon: string = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path fill="currentcolor" d="M48.87,21.96C47.6,9.62,37.17,0,24.5,0,10.97,0,0,10.97,0,24.5h0c0,12.67,9.62,23.1,21.96,24.37,2.71,8.76,10.88,15.13,20.54,15.13,11.87,0,21.5-9.63,21.5-21.5,0-9.66-6.37-17.82-15.13-20.54ZM4,24.5C4,13.2,13.2,4,24.5,4c10.15,0,18.57,7.42,20.2,17.11-.72-.07-1.45-.11-2.2-.11-11.87,0-21.5,9.63-21.5,21.5,0,.74.04,1.47.11,2.2-9.69-1.62-17.11-10.05-17.11-20.2ZM55.23,44.5h-10.65v10.65h-4v-10.65h-10.65v-4h10.65v-10.65h4v10.65h10.65v4Z"/>
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


    public onCanvasClick(top: number, left: number, file: ThermalFileInstance): void {
        const newRect = file.analysis.layers.createEllipsisFrom(top, left);
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
            if ( point.analysis.file.slots.value.size <= AnalysisSlotsState.MAX_SLOTS ) {
                const slot = point.analysis.file.slots.getNextFreeSlotNumber();
                if ( slot !== undefined ) {
                    point.file.slots.assignAnalysisToSlot( slot, point.analysis );
                }
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


    getLabelValue = (x: number, y: number, file: ThermalFileInstance): string => {
        const temperature = file.group.tool.tools.inspect.getLabelValue(x, y, file);
        return `X:${x}<br />Y:${y}<br />${temperature}`;
    }

}