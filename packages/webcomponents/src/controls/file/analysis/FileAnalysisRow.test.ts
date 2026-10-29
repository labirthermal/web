// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { FileAnalysisRowElement } from "./FileAnalysisRow";

customElements.define("file-analysis-row-boolean-test", FileAnalysisRowElement);

describe("FileAnalysisRow boolean attributes", () => {
    it("defaults all feature flags to false and uses presence semantics", async () => {
        const row = document.createElement("file-analysis-row-boolean-test") as FileAnalysisRowElement;
        document.body.append(row);
        await row.updateComplete;

        const attributes = {
            "selection-disabled": "selectionDisabled",
            "edit-disabled": "editDisabled",
            "graph-activation-disabled": "graphActivationDisabled",
            "show-range-propagator": "showRangePropagator",
        } as const;

        for (const [attribute, property] of Object.entries(attributes)) {
            expect(row[property]).toBe(false);
            expect(row.hasAttribute(attribute)).toBe(false);

            for (const value of ["", "false", "true"]) {
                row.setAttribute(attribute, value);
                await row.updateComplete;
                expect(row[property]).toBe(true);
            }

            row.removeAttribute(attribute);
            await row.updateComplete;
            expect(row[property]).toBe(false);
        }

        row.selectionDisabled = true;
        await row.updateComplete;
        expect(row.hasAttribute("selection-disabled")).toBe(false);
        row.remove();
    });
});
