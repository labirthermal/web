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