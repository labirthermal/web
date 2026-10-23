import { ParsedFileBaseInfo } from "../../loading/workers/parsers/structure";
import { CallbacksManager } from "../../properties/callbacksManager";

/**
 * The file metadata = Parsed file base info.
 * 
 * Stored here as a separate class. Purpose: separation of concern & provide listener on change.
 */
export class FileMeta {

    private _current: ParsedFileBaseInfo;

    public get current() { return this._current; }

    protected _onChange?: CallbacksManager<(value:ParsedFileBaseInfo) => void>;

    /** 
     * Lazyloaded callback manager that is triggered whenever the value changes 
     */
    public get onChange() {
        if ( ! this._onChange ) {
            this._onChange = new CallbacksManager<(value: ParsedFileBaseInfo) => void>;
        }
        return this._onChange;
    }

    public get width() { return this.current.width; }
    public get height() { return this.current.height; }

    constructor(
        baseInfo: ParsedFileBaseInfo
    ) {
        this._current = baseInfo;
    }

    set( value: ParsedFileBaseInfo ) {
        this._current = value;
        this.onChange.call( this.current );
    }

}