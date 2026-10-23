import { CallbacksManager } from "../../../properties/callbacksManager";
import { AbstractFileResult } from "../AbstractFileResult";
import { FilesService } from "../FilesService";
import { supportedFileTypesInputProperty } from "../parsers";

/** Turn any element into a dropzone! */
export class DropinElementListener {

    protected _hover: boolean = false;
    public get hover() {
        return this._hover;
    }
    public readonly onMouseEnter = new CallbacksManager<() => void>
    public readonly onMouseLeave = new CallbacksManager<() => void>
    public readonly onDrop = new CallbacksManager<() => void>
    public readonly onProcessingEnd = new CallbacksManager<(results: AbstractFileResult[], event: Event|DragEvent) => void>

    /** An invissible input element */
    public input?: HTMLInputElement;
    protected hydrated: boolean = false;
    protected multiple: boolean;

    // Listeners are not added from the class, but binded
    // into the following properties

    protected bindedEnterListener: DropinElementListener["handleEnter"];
    protected bindedLeaveListener: DropinElementListener[ "handleLeave" ];
    protected bindedDropListener: DropinElementListener[ "handleDrop" ]
    protected bindedInputChangeListener: DropinElementListener[ "handleInputChange" ];
    protected bindedDragoverListener: DropinElementListener[ "handleDragover" ];
    protected bindedClickListener: DropinElementListener[ "handleClick" ];

    protected constructor(
        public readonly service: FilesService,
        public readonly element: HTMLElement,
        multiple: boolean = true
    ) {

        this.multiple = multiple;

        // Bind listener methods to this instance and store them in
        // properties for the purpose of hydration &cdehydration
        this.bindedLeaveListener = this.handleLeave.bind( this );
        this.bindedEnterListener = this.handleEnter.bind( this );
        this.bindedDropListener = this.handleDrop.bind( this );
        this.bindedInputChangeListener = this.handleInputChange.bind( this );
        this.bindedDragoverListener = this.handleDragover.bind( this );
        this.bindedClickListener = this.handleClick.bind( this );
        

    }

    public static listenOnElement(
        service: FilesService,
        element: HTMLElement,
        multiple: boolean = true
    ) {

        const listener = new DropinElementListener(service, element, multiple);

        listener.hydrate()

        return listener;

    }


    /** Bind all event listeners to the provided element */
    public hydrate() {

        if (this.hydrated === false) {

            this.hydrated = true;

            // Build the input
            this.input = this.getInput();

            // Add event listeners
            this.element.addEventListener("dragover", this.bindedDragoverListener);
            this.element.addEventListener("dragleave", this.bindedLeaveListener );
            this.element.addEventListener("dragend", this.bindedLeaveListener );
            this.element.addEventListener("pointerdown", this.bindedClickListener);
            this.element.addEventListener("drop", this.bindedDropListener);
            this.input.addEventListener("change", this.bindedInputChangeListener);

        }

    }


    /** Remove all event listeners from the element */
    public dehydrate() {

        if (this.hydrated === true) {

            this.hydrated = false;

            // Remove the input
            if (this.input)
                this.input.remove();

            // Remove event listeners
            this.element.removeEventListener("dragover", this.bindedDragoverListener);
            this.element.removeEventListener( "dragleave", this.bindedLeaveListener );
            this.element.removeEventListener( "dragend", this.bindedLeaveListener );
            this.element.removeEventListener( "pointerdown", this.bindedClickListener );
            this.element.removeEventListener( "drop", this.bindedDropListener );

        }


    }


    public handleClick(event: PointerEvent) {
        event.preventDefault();
        if (this.input)
            this.input.click();
    }


    public handleDragover(event: DragEvent) {
        event.preventDefault();
        this.handleEnter();
    }

    protected async handleFiles( files: File[] ) {

        let results: AbstractFileResult[] = [];

        if ( this.multiple ) {

            results = await Promise.all( files.map( async ( file ) => {
                return await this.service.loadUploadedFile( file );
            } ) );

        } else {

            const file = files[0];

            if ( file ) {
                results.push( await this.service.loadUploadedFile( file ) );
            }

        }

        return results;
    }


    public async handleDrop(event: DragEvent) {
        event.preventDefault();

        this.onDrop.call();

        let results: AbstractFileResult[] = [];

        const transfer = event.dataTransfer;

        if (transfer && transfer.files) {

            results = await this.handleFiles( Array.from(transfer.files) );

        }

        this.onProcessingEnd.call(results, event);

        this.handleLeave();

        return {
            results,
            event
        };

    }


    public async handleInputChange( event: Event ) {

        event.preventDefault();

        this.onDrop.call();

        const target = event.target as HTMLInputElement;

        let results: AbstractFileResult[] = [];

        if ( target.files ) {

            results = await this.handleFiles( Array.from( target.files ) );

            this.onProcessingEnd.call( results, event );

            this.handleLeave();

        }

        return {
            results,
            event
        }

    }


    public handleEnter() {
        if (this._hover === false) {
            this._hover = true;
            this.onMouseEnter.call();
        }
    }


    public handleLeave() {
        if (this._hover === true) {
            this._hover = false;
            this.onMouseLeave.call();
        }
    }


    /** Build the internal input */
    protected getInput() {
        const element = document.createElement("input");
        element.type = "file";
        element.accept = supportedFileTypesInputProperty;
        if (this.multiple) {
            element.multiple = true;
        }
        return element;
    }

    public openFileDialog( multiple: boolean = true ) {

        if ( this.input !== undefined ) {
            this.input.multiple = multiple;
            this.input.click();
        }

    }

    






}