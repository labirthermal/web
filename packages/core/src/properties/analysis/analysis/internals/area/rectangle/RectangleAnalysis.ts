import { ThermalFileInstance } from "../../../../../../file/ThermalFileInstance";
import { AreaAnalysisData } from "../../../../../../parsers/structure";
import { AbstractArea } from "../AbstractArea";
import { AbstractAreaAnalysis } from "../AbstractAreaAnalysis";
import { RectangleArea } from "./RectangleArea";

export class RectangleAnalysis extends AbstractAreaAnalysis {

    public getType(): string {
        return "rectangle";
    }

    public static startAddingAtPoint(
        key: string,
        color: string,
        file: ThermalFileInstance,
        top: number,
        left: number
    ): RectangleAnalysis {

        const item = new RectangleAnalysis(
            key,
            color,
            file,
            top,
            left
        );

        /** Bottom right point needs to be active from the beginning */
        item.br.activate();
        return item;

    }



    public static build(
        key: string,
        color: string,
        file: ThermalFileInstance,
        _top: number,
        _left: number,
        _right: number,
        _bottom: number
    ): RectangleAnalysis {

        const {top, left, width, height } = RectangleAnalysis.calculateDimensionsFromCorners( _top, _left, _right, _bottom );

        const item = new RectangleAnalysis(
            key, 
            color, 
            file, 
            top, 
            left, 
            width, 
            height
        );

        item.recalculateValues();

        return item;

    }


    protected buildArea(x: number, y: number, width?: number, height?: number): AbstractArea {

        if ( width !== undefined && height !== undefined ) {
            return new RectangleArea(
                this,
                x,
                y,
                x + width,
                y + height
            );
        }

        return new RectangleArea(this, x, y, x, y);
    }

    public async getAnalysisData(): Promise<AreaAnalysisData> {
        return await this.file.reader.rectAnalysisData(
            this.left,
            this.top,
            this.width,
            this.height
        );
    }


}