// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { ThermalSlottedAppElement } from "./ThermalSlottedApp";

customElements.define("test-slotted-app", ThermalSlottedAppElement);

afterEach(() => {
    document.body.replaceChildren();
});

describe("ThermalSlottedApp layout", () => {
    it("groups slot content without wrappers and preserves the canvas across updates", async () => {
        const app = new ThermalSlottedAppElement();
        app.innerHTML = `
            <div slot="top">Top</div>
            <div slot="left">Left</div>
            <div slot="left">More left content</div>
            <div slot="right">Right</div>
            <div slot="bottom">Bottom</div>
            <div>Default</div>
        `;
        document.body.append(app);
        await app.updateComplete;

        const root = app.shadowRoot!;
        expect(Array.from(root.children).filter(el => el.tagName !== "STYLE").map(el => el.localName))
            .toEqual(["slot", "slot", "file-canvas", "slot", "slot", "slot"]);
        for (const [name, count] of [["top", 1], ["left", 2], ["right", 1], ["bottom", 1], ["", 1]] as const) {
            const slot = root.querySelector<HTMLSlotElement>(name ? `slot[name="${name}"]` : "slot:not([name])");
            expect(slot?.assignedElements()).toHaveLength(count);
        }

        const canvas = root.querySelector("file-canvas");
        app.label = "Updated label";
        await app.updateComplete;
        expect(root.querySelector("file-canvas")).toBe(canvas);
    });
});
