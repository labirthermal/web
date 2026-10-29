// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThermalBtnElement } from "./Btn";

customElements.define("thermal-btn-boolean-test", ThermalBtnElement);

const createButton = async (attributes: Record<string, string> = {}) => {
    const btn = document.createElement("thermal-btn-boolean-test") as ThermalBtnElement;
    for (const [name, value] of Object.entries(attributes)) {
        btn.setAttribute(name, value);
    }
    document.body.append(btn);
    await btn.updateComplete;
    return btn;
};

describe("thermal-btn boolean attributes", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    const attributes = {
        disabled: "disabled",
        "non-interactive": "nonInteractive",
        plain: "plain",
    } as const;

    for (const [attribute, property] of Object.entries(attributes)) {
        it(`${attribute}: presence semantics and reflection`, async () => {
            const btn = await createButton();
            expect(Boolean(btn[property])).toBe(false);
            expect(btn.hasAttribute(attribute)).toBe(false);

            for (const value of ["", "false", "true"]) {
                btn.setAttribute(attribute, value);
                await btn.updateComplete;
                expect(btn[property]).toBe(true);
            }

            btn.removeAttribute(attribute);
            await btn.updateComplete;
            expect(btn[property]).toBe(false);

            btn[property] = true;
            await btn.updateComplete;
            expect(btn.getAttribute(attribute)).toBe("");

            btn[property] = false;
            await btn.updateComplete;
            expect(btn.hasAttribute(attribute)).toBe(false);
        });

        it(`${attribute}: initial presence means true`, async () => {
            const btn = await createButton({ [attribute]: "" });
            expect(btn[property]).toBe(true);
        });
    }

    it("defaults disabled and nonInteractive to false", async () => {
        const btn = await createButton();
        expect(btn.disabled).toBe(false);
        expect(btn.nonInteractive).toBe(false);
        expect(btn.hasAttribute("interactive")).toBe(false);
    });

    it("lets clicks and keyboard activation through when enabled", async () => {
        const btn = await createButton();
        const listener = vi.fn();
        btn.addEventListener("click", listener);

        btn.click();
        btn.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        btn.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

        expect(listener).toHaveBeenCalledTimes(3);
    });

    it("blocks consumer click listeners on the host and keyboard activation when disabled", async () => {
        const btn = await createButton({ disabled: "" });
        const hostListener = vi.fn();
        const parentListener = vi.fn();
        btn.addEventListener("click", hostListener);
        document.body.addEventListener("click", parentListener);

        btn.click();
        btn.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        btn.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

        expect(hostListener).not.toHaveBeenCalled();
        expect(parentListener).not.toHaveBeenCalled();
        document.body.removeEventListener("click", parentListener);
    });

    it("stops blocking clicks after disabled is removed and keeps blocking after reconnect", async () => {
        const btn = await createButton({ disabled: "" });
        const listener = vi.fn();
        btn.addEventListener("click", listener);

        btn.remove();
        document.body.append(btn);
        btn.click();
        expect(listener).not.toHaveBeenCalled();

        btn.disabled = false;
        await btn.updateComplete;
        btn.click();
        expect(listener).toHaveBeenCalledTimes(1);
    });
});
