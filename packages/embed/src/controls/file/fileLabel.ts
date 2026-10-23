import { GridGrouping } from "@labirthermal/client";
import { TimeFormat } from "@labirthermal/core";
import { format } from "date-fns";
import { css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { AbstractFileConsumer } from "../../hierarchy/consumers/AbstractFileConsumer";

export class FileLabelElement extends AbstractFileConsumer {

    @property({ type: String })
    public grouping?: GridGrouping;

    @property({ type: String })
    public label?: string;

    public onInstanceCreated(): void { }

    public onFailure(): void { }

    static styles = css`
        :host {
            display: contents;
        }

    `;

    protected render(): unknown {

        if (this.file === undefined) {
            return nothing;
        } else if (this.label !== undefined) {
            return this.label;
        } else if (this.grouping !== undefined) {

            switch (this.grouping) {
                case GridGrouping.HOUR:
                case GridGrouping.DAY:
                    return format(this.file.timestamp, "HH:mm");
                case GridGrouping.WEEK:
                case GridGrouping.MONTH:
                case GridGrouping.YEAR:
                    return TimeFormat.human(this.file.timestamp);
                default:
                    return TimeFormat.human(this.file.timestamp);
            }

        }


        return this.file.fileName;

    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-label": FileLabelElement;
    }
}
