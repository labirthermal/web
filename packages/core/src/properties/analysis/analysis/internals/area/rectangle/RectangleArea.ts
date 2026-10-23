import { AbstractArea } from "../AbstractArea";

export class RectangleArea extends AbstractArea {

    onBuild(): void {
        this.element.style.borderWidth = "1px";
        this.element.style.borderColor = this.analysis.color;
        this.element.style.borderStyle = "solid";
    }

    onSetColor(value: string): void {
        this.element.style.borderColor = value;
    }
    
}