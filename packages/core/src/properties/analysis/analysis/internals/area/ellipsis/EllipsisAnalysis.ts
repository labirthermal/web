import { ThermalFileInstance } from "../../../../../../file/ThermalFileInstance";
import { AreaAnalysisData } from "../../../../../../parsers/structure";
import { AbstractArea } from "../AbstractArea";
import { AbstractAreaAnalysis } from "../AbstractAreaAnalysis";
import { EllipsisArea } from "./EllipsisArea";

export class EllipsisAnalysis extends AbstractAreaAnalysis {

    public getType(): string {
        return "ellipsis";
    }


    public static startAddingAtPoint(
        key: string,
        color: string,
        file: ThermalFileInstance,
        top: number,
        left: number
    ): EllipsisAnalysis {

        const item = new EllipsisAnalysis(
            key,
            color,
            file,
            top,
            left
        );

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
        _bottom: number,
    ): EllipsisAnalysis {

        const { top, left, width, height } = EllipsisAnalysis.calculateDimensionsFromCorners(_top, _left, _right, _bottom);

        const item = new EllipsisAnalysis(
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

        if (width !== undefined && height !== undefined) {
            return new EllipsisArea(
                this,
                x,
                y,
                x + width,
                y + height
            );
        }

        return new EllipsisArea(this, x, y, x, y);
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

                if (this.isWithin(x, y)) {

                    const point = this.file.pixels[rowOffset + x];

                    if (point < min) {
                        min = point;
                    }
                    if (point > max) {
                        max = point;
                    }

                    sum += point;
                    count++;

                }

            }
        }

        return {
            min,
            max,
            avg: sum / count
        }

    }

    public isWithin(x: number, y: number): boolean {
        const centerX = this.left + this.width / 2;
        const centerY = this.top + this.height / 2;
        const normalizedX = (x - centerX) / (this.width / 2);
        const normalizedY = (y - centerY) / (this.height / 2);
        return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
    }

    public async getAnalysisData(): Promise<AreaAnalysisData> {
        return await this.file.reader.ellipsisAnalysisData(
            this.left,
            this.top,
            this.width,
            this.height
        );
    }

}