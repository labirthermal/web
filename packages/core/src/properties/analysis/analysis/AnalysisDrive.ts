import { ThermalFileInstance } from "../../../file/ThermalFileInstance";
import { AbstractProperty } from "../../abstractProperty";
import { AbstractAnalysis } from "./internals/AbstractAnalysis";
import { AnalysisLayersStorage } from "./storage/AnalysisLayersStorage";
import { AnalysisPointsAccessor } from "./storage/AnalysisPointsAccessor";


export class AnalysisDrive extends AbstractProperty<AbstractAnalysis[], ThermalFileInstance> {

    public readonly layers = new AnalysisLayersStorage(this);
    public readonly points = new AnalysisPointsAccessor(this);

    protected listener?: HTMLElement;

    /** Alias of the current `ToolDrive` value. */
    protected get currentTool() {
        return this.parent.group.tool.value;
    }


    /** Cached listener on `this.listenerLayerContainer` - pointermove event. */
    protected bindedPointerMoveListener?: ( event: PointerEvent ) => void;

    /** Cached listener on `this.listenerLayerContainer` - pointerdown event. */
    protected bindedPointerDownListener?: ( event: PointerEvent ) => void;

    /** Cached listener on `this.listenerLayerContainer` - pointerup event. */
    protected bindedPointerUpListener?: ( event: PointerEvent ) => void;




    /** 
     * Value of this drive is stored in `AnalysisLayersStorage` and from there, it is mirrored to the drive.
     * It is better to add listeners to the storage, not to the drive.
     */
    public dangerouslySetValueFromStorage(value: AbstractAnalysis[]) {
        this.value = value;
    }

    protected validate(value: AbstractAnalysis[]): AbstractAnalysis[] {
        return value;
    }

    protected afterSetEffect() {}



    /** Calculate the top/left position from a `MouseEvent` */
    private getRelativePosition(event: MouseEvent) {

        if ( ! this.listener ) {
            return {
                top: 0,
                left: 0
            }
        }

        const absoluteWidth = this.listener.clientWidth;
        const fileWidth = this.parent.width;
        const layerX = event.layerX;
        const xAspect = layerX / absoluteWidth;
        const x = Math.round(fileWidth * xAspect);

        const absoluteHeight = this.listener.clientHeight;
        const fileHeight = this.parent.height;
        const layerY = event.layerY;
        const yAspect = layerY / absoluteHeight;
        const y = Math.round(fileHeight * yAspect);

        return {
            top: y,
            left: x
        }

    }

    /** 
     * Activate the DOM listeners for the current drive on the file's listener layer. 
     */
    public activateListeners( container: HTMLDivElement ) {

        this.listener = container;

        // Create pointermove listener
        this.bindedPointerMoveListener = (event: PointerEvent): void => {

            const position = this.getRelativePosition(event);
    
            this.points.all.forEach(point => {
    
                // Move all active points within all layers
                if (point.active) {
                    this.currentTool.onPointMove(point, position.top, position.left);
                }
    
                // Detectt eventual mouse enter or mouse leave of points
                const pointIsUnderCursor = point.isWithin(position.top, position.left);
    
                if (pointIsUnderCursor) {
                    this.currentTool.onPointEnter(point);
                }
    
                else if (!pointIsUnderCursor) {
                    this.currentTool.onPointLeave(point);
                }
    
            });
    
        }


        // Create pointerdown listener
        this.bindedPointerDownListener = event => {

            const position = this.getRelativePosition(event);

            // Call the click of the active tool
            this.currentTool.onCanvasClick(position.top, position.left, this.parent);

            // Call the click on all points
            this.points.all.forEach(point => {
                if (point.isWithin(position.top, position.left)) {
                    this.currentTool.onPointDown(point);
                }
            });

        }


        // Create pointerup listener
        this.bindedPointerUpListener = () => {

            this.points.all.forEach(point => {
                this.currentTool.onPointUp(point);
            });

        }



        // Bind listeners

        this.listener.addEventListener("pointermove", this.bindedPointerMoveListener );

        this.listener.addEventListener("pointerdown", this.bindedPointerDownListener )

        this.listener.addEventListener("pointerup", this.bindedPointerUpListener );

    }

    /** Remove all listeners from the file's listener layer */
    deactivateListeners() {

        if ( this.bindedPointerMoveListener && this.listener ) {
            this.listener.removeEventListener("pointermove", this.bindedPointerMoveListener );
        }

        if ( this.bindedPointerDownListener && this.listener ) {
            this.listener.removeEventListener("pointerdown", this.bindedPointerDownListener );
        }

        if ( this.bindedPointerUpListener && this.listener ) {
            this.listener.removeEventListener("pointerup", this.bindedPointerUpListener );
        }

    }

    



}