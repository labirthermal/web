import { AbstractArea } from "../AbstractArea";

export class EllipsisArea
 extends AbstractArea {

    onBuild(): void {
        this.element.style.borderWidth = "1px";
        this.element.style.borderColor = this.analysis.color;
        this.element.style.borderStyle = "solid";
        this.element.style.borderRadius = "50%";
    }

    onSetColor(value: string): void {
        this.element.style.borderColor = value;
    }
    
}