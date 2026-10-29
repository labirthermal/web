// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import "./NotationContent";
import type { NotationContent } from "./NotationContent";
import type { NotationEntry } from "./NotationEntry";

const entry = (from?: number, to?: number) => ({
    label: "Entry label",
    from,
    to,
    image: undefined,
    color: undefined,
    getRenderContent: () => [],
}) as unknown as NotationEntry;

const createContent = async (attributes: Record<string, string> = {}, entries = [entry(0, 1500)]) => {
    const element = document.createElement("notation-content") as NotationContent;
    for (const [name, value] of Object.entries(attributes)) {
        element.setAttribute(name, value);
    }
    (element as unknown as { entries: NotationEntry[] }).entries = entries;
    document.body.append(element);
    await element.updateComplete;
    return element;
};

const hasLabel = (element: NotationContent) => element.shadowRoot!.querySelector("h1") !== null;
const hasTime = (element: NotationContent) => element.shadowRoot!.querySelector(".time") !== null;

describe("notation-content boolean attributes", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("defaults to showing labels and times", async () => {
        const element = await createContent();
        expect(element.hideLabel).toBe(false);
        expect(element.hideTime).toBe(false);
        expect(hasLabel(element)).toBe(true);
        expect(hasTime(element)).toBe(true);
    });

    const cases = {
        "hide-label": { property: "hideLabel", rendered: hasLabel },
        "hide-time": { property: "hideTime", rendered: hasTime },
    } as const;

    for (const [attribute, { property, rendered }] of Object.entries(cases)) {
        it(`${attribute}: presence hides, removal shows again`, async () => {
            const element = await createContent();

            for (const value of ["", "false", "true"]) {
                element.setAttribute(attribute, value);
                await element.updateComplete;
                expect(element[property]).toBe(true);
                expect(rendered(element)).toBe(false);
            }

            element.removeAttribute(attribute);
            await element.updateComplete;
            expect(element[property]).toBe(false);
            expect(rendered(element)).toBe(true);
        });

        it(`${attribute}: initial presence hides and property does not reflect`, async () => {
            const element = await createContent({ [attribute]: "" });
            expect(element[property]).toBe(true);
            expect(rendered(element)).toBe(false);

            element[property] = false;
            await element.updateComplete;
            expect(rendered(element)).toBe(true);

            element.removeAttribute(attribute);
            element[property] = true;
            await element.updateComplete;
            expect(element.hasAttribute(attribute)).toBe(false);
            expect(rendered(element)).toBe(false);
        });
    }

    it("ignores the old showlabel and showtime attributes", async () => {
        const element = await createContent({ showlabel: "false", showtime: "false" });
        expect(hasLabel(element)).toBe(true);
        expect(hasTime(element)).toBe(true);
    });

    it("never renders the time for entries without a range", async () => {
        const element = await createContent({}, [entry()]);
        expect(hasTime(element)).toBe(false);
    });
});
