import { html, nothing } from "lit";
import { directive, Directive } from "lit/directive.js";
import { ref } from "lit/directives/ref.js";
import type { AbstractSingleVideoExport } from "../AbstractSingleVideoExport";

class SingleVideoExportDirective extends Directive {

    protected renderWrappedWithNestedProviders(
        app: AbstractSingleVideoExport,
        content: unknown
    ): unknown {

        const registry = app.registryObject;
        const group = app.groupObject;

        if (!registry || !group) {
            return nothing;
        }

        return html`<registry-provider 
            slug="${app.slug}"
            style="display: contents;"
        >
            <group-provider 
                slug=${app.slug}
                style="display: contents;"
            >
                <file-copy 
                    .originalFile=${app.outerFile} 
                    .withAnalyses=${app.renderProps.hasAnalysis}
                    ${ref(app.fileCopyElementRef)}
                >
                    ${content}
                </file-copy>
            </group-provider>
        </registry-provider>`;

    }



    public render(element: AbstractSingleVideoExport, content: unknown): unknown {

        return this.renderWrappedWithNestedProviders( element, content );
    }



}

export const singleVideoProviders = directive(SingleVideoExportDirective);