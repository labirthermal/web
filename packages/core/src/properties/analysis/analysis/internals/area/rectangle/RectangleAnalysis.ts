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

    protected getValues(): { min?: number; max?: number; avg?: number; } {

        const fromX = this.left;
        const toX = this.left + this.width;
        const fromY = this.top;
        const toY = this.top + this.height;

        let min = Infinity;
        let max = -Infinity;
        let count = 0;
        let sum = 0;

        for (let y = fromY; y < toY; y++) {

            const rowOffset = this.file.width * y;

            for (let x = fromX; x <= toX; x++) {

                const point = this.file.pixels[ rowOffset + x ];

                if ( point < min ) {
                    min = point;
                }
                if ( point > max ) {
                    max = point;
                }

                sum += point;
                count++;

            }
        }

        return {
            min,
            max,
            avg: sum / count
        }

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