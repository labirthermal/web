import type { ThermalFileInstance, ThermalFileFailure } from "@labirthermal/core";
import { consume } from "@lit/context";
import { state } from "lit/decorators.js";
import type { FileController } from "../../controllers/FileController";
import { fileContext, fileControllerContext, fileFailureContext, fileLoadingContext, fileRecordingContext } from "../../controllers/FileController";
import { AbstractGroupConsumer } from "./AbstractGroupConsumer";

/**
 * Abstract base class for web components that consume a file `ThermalFileInstance` and
 * related state from a parent `FileController`.
 *
 * The controller is typically provided by an ancestor application or file
 * provider. This class consumes the controller, current instance, loading and
 * recording states, and load failures. Subclasses can consume additional
 * contexts such as `fileMsContext` and `fileDurationContext` when needed.
 * Changes to subscribed contexts trigger reactive updates in the consuming
 * element.
 *
 * Use `FileController` methods for file operations such as changing the
 * playback position rather than modifying the instance directly.
 *
 * @see {@link AbstractGroupConsumer}
 * @see {@link FileController}
 * @see {@link ThermalFileInstance}
 *
 * @example
 * ```ts
 * import { consume } from "@lit/context";
 * import { AbstractFileConsumer, fileMsContext } from "@labirthermal/webcomponents";
 *
 * class MyComponent extends AbstractFileConsumer {
 *     @consume({ context: fileMsContext, subscribe: true })
 *     protected msValue!: number;
 *
 *     protected seekTo(percentage: number): void {
 *         this.fileController.setTimePercentage(percentage);
 *     }
 * }
 * ```
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export abstract class AbstractFileConsumer extends AbstractGroupConsumer {

    @consume({ context: fileControllerContext, subscribe: true })
    public fileController!: FileController;

    /**
     * Returns a stable callback key unique to this consumer.
     *
     * @returns The consumer's UUID with an internal-callback suffix.
     */
    public getUUID() {
        return `${this.UUID}__internal_callback`;
    }

    /** Consume the `FileController` context indicating whether the file is currently being loaded. */
    @consume({ context: fileLoadingContext, subscribe: true })
    @state()
    protected fileIsLoading: boolean = false;

    /** Consume the `FileController` context providing the actual file instance. */
    @consume({ context: fileContext, subscribe: true })
    @state()
    public file?: ThermalFileInstance;

    /** Consume the `FileController` context providing the failure information if the file loading fails. */
    @consume({ context: fileFailureContext, subscribe: true })
    @state()
    protected failure?: ThermalFileFailure;

    /** Consume the `FileController` context indicating whether the file is currently being recorded. */
    @consume({ context: fileRecordingContext, subscribe: true })
    @state()
    protected fileIsRecording: boolean = false;



    connectedCallback(): void {

        super.connectedCallback();

        // Add the callbacks to the parent file controller
        this.hookCallbacks();

    }

    disconnectedCallback(): void {
        super.disconnectedCallback();

        // Remove the callbacks from the parent file controller
        if ( this.fileController ) {
            this.fileController.onSuccess.delete(this.UUID);
            this.fileController.onFailure.delete(this.UUID);
        }

    }


    /** Internal method binding the default callbacks to the parent `FileController`. */
    private hookCallbacks() {

        if ( this.fileController ) {

            this.fileController.onSuccess.set(
                this.UUID,
                instance => {
                    this.onInstanceCreated(instance);
                }
            );

            this.fileController.onFailure.set(
                this.UUID,
                error => {
                    this.onFailure(error);
                }
            );

        } else {
            throw new Error("Tento komponent není v souboru!");
        }
    }


    /**
     * Handles a file instance after the parent `FileController` has loaded it
     * successfully.
     *
     * @param instance The successfully loaded file instance.
     */
    public abstract onInstanceCreated(instance: ThermalFileInstance): void;

    /**
     * Handles a failure reported by the parent `FileController` while loading
     * a file.
     *
     * @param error Details of the file-loading failure.
     */
    public abstract onFailure(error: ThermalFileFailure): void;

}