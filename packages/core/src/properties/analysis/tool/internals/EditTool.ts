import { ThermalFileInstance } from "../../../../file/ThermalFileInstance";
import { AbstractPoint } from "../../analysis/internals/AbstractPoint";
import { AbstractTool, ITool } from "./AbstractTool";

export class EditTool extends AbstractTool implements ITool {


    public readonly key = "edit";
    public readonly name = "editanalysis";
    public readonly description = "dragcornersofselectedanalysis";
    public readonly icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg class="thermal-tool-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <polygon points="34 17.03 34 -.02 30 -.02 30 17.03 17 17.03 17 32 0 32 0 36 17 36 17 47 46.97 47 46.97 17.03 34 17.03" fill="currentcolor"/>
</svg>`;


    public onActivate(): void { }


    protected onDeactivate(): void { }


    public onCanvasLeave() { }


    public onCanvasClick(): void { }


    public onPointEnter(point: AbstractPoint): void {

        point.mouseEnter();

    }


    public onPointLeave(point: AbstractPoint): void {

        if (point.active === false) {
            point.mouseLeave();
        }

    }


    public onPointMove(point: AbstractPoint, top: number, left: number): void {


        if (
            point.isInSelectedLayer()
            && point.active
        ) {

            // Set new position
            point.setXFromTool(left);
            point.setYFromTool(top);

            // This is very very important:
            // - update the value
            // - and call other eventual callbacks
            // (Update value event is )
            point.analysis.onMoveOrResize.call(point.analysis);

        }
    }

    public onPointDown(point: AbstractPoint): void {
        if (point.isInSelectedLayer() && point.active === false) {
            point.activate();
        }
    }

    public onPointUp(point: AbstractPoint): void {
        if (point.active === true) {
            point.deactivate();
        }
    }


    public getLabelValue(x: number, y: number, file: ThermalFileInstance): string {

        const temperature = file.getTemperatureAtPoint(x, y);

        const hoveredAnalysis = file.analysis.layers.all
            .filter(analysis => analysis.isWithin(x, y))
            .map(analysis => {

                const element = analysis.selected ? "span" : "s";

                return `<${element} style="color: ${analysis.initialColor};">
                    ${analysis.name}
                </${element}>`;

            });

        const analysis = hoveredAnalysis.length > 0
            ? hoveredAnalysis.join("<br />") + "<br />"
            : "";


        return `${analysis}${temperature && temperature.toFixed(2) + " °C<br />"}X: ${x}<br />Y: ${y}`;

    }



}