import { AbstractFileProvider } from "../abstraction/AbstractFileProvider";
import type { IElementWithFileLoadController } from "../../controllers/FileLoadController";
import { FileLoadController } from "../../controllers/FileLoadController";

/** 
 * A webcomponent providing the file that is specified by its URL's.
 * 
 * Exterior attributes are:
 * - `thermal`: the thermal file URL
 * - `visible`: the visible file URL
 * These are specified by the `FileLoadController` that is implemented here.
 * 
 * All the standard contexts of `FileController` are being handled by the `AbstractFileProvider`.
 * 
 * @tag file-provider
 * 
 * @param thermal The URL of the thermal file.
 * @param visible The URL of the visible file.
 * 
 * @example 
 * <file-provider thermal="path/to/thermal/file" visible="path/to/visible/file">
 *  <file-canvas></file-canvas>
 * </file-provider>
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export class FileProviderElement extends AbstractFileProvider implements IElementWithFileLoadController {

    public static properties = {
        ...AbstractFileProvider.properties,
        ...FileLoadController.HOST_PROPERTIES
    }

    public fileLoadController: FileLoadController = new FileLoadController(this);

    public thermal: string | undefined;
    public visible: string | undefined;

}

declare global {
    interface HTMLElementTagNameMap {
        "file-provider": FileProviderElement;
    }
}