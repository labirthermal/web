import { ThermalFileInstance } from "../../../../../file/ThermalFileInstance";
import { ITool } from "../../../tool/internals/AbstractTool";
import { AbstractAddTool } from "../AbstractAddTool";
import { AbstractPoint } from "../AbstractPoint";

export class AddPointTool extends AbstractAddTool implements ITool {

    public readonly key: string = "add-point";
    public readonly name: string = "addpointanalysis";
    public readonly description: string = "clickandaddpoint";
    public readonly icon: string = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path fill="currentcolor" d="M34,19h-15v15h-4v-15H0v-4h15V0h4v15h15v4ZM64,42.5c0,11.87-9.63,21.5-21.5,21.5s-21.5-9.63-21.5-21.5,9.63-21.5,21.5-21.5,21.5,9.63,21.5,21.5ZM55.23,40.5h-10.65v-10.65h-4v10.65h-10.65v4h10.65v10.65h4v-10.65h10.65v-4Z"/>
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
        const newPoint = file.analysis.layers.createPointAt(x, y);
        newPoint.setSelected(true);
    }


    public onPointDown(): void { }


    public onPointUp(point: AbstractPoint): void {

        if ( ! point.isInSelectedLayer() ) {
            return;
        }

        point.deactivate();
        point.analysis.file.group.tool.selectTool("edit");
        point.analysis.setReady();
        point.analysis.onMoveOrResize.call( point.analysis );
    }


    public onPointMove(): void { }


    public onPointLeave(): void { }


    public onPointEnter(): void { }


    public getLabelValue = (x: number, y: number, file: ThermalFileInstance): string => {
        const temperature = file.group.tool.tools.inspect.getLabelValue(x, y, file);
        return `X:${x}<br />Y:${y}<br />${temperature}`;
    }

}