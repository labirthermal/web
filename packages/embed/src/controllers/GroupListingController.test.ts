// @vitest-environment jsdom
import type { ThermalFileInstance } from "@labirthermal/core";
import { afterEach, describe, expect, it, vi } from "vitest";
import { html, LitElement, render } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { FileCanvasElement } from "../controls/file/FileCanvas";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { FileController } from "./FileController";
import type { GroupController } from "./GroupController";
import { GroupListingController, GroupOrderby, GroupOrdering } from "./GroupListingController";
import type { IElementWithGroupListingController } from "./GroupListingController";

vi.mock("../consumers/AbstractFileConsumer", async () => {
    const { LitElement } = await import("lit");
    class AbstractFileConsumer extends LitElement {
        static properties = { file: { attribute: false } };
        declare public file?: ThermalFileInstance;
        public loading = false;
    }
    return { AbstractFileConsumer };
});

class TestProvider extends LitElement {
    static properties = { file: { attribute: false } };
    declare public file: ThermalFileInstance;

    protected render() {
        return html`<slot></slot>`;
    }

    protected updated(): void {
        this.querySelectorAll<FileCanvasElement>("file-canvas").forEach(canvas => {
            canvas.file = this.file;
        });
    }
}

class TestListing extends AbstractThermalElement implements IElementWithGroupListingController {
    static styles = GroupListingController.styles;
    declare public groupController: GroupController;
    declare public fileController: FileController;
    public orderby = GroupOrderby.DATE;
    public ordering = GroupOrdering.ASC;
    public files: ThermalFileInstance[] = [];
    public groupListingController: GroupListingController = new GroupListingController(this);

    protected render() {
        return this.groupListingController.renderListContainer(repeat(
            this.files,
            file => file.id,
            file => this.groupListingController.renderThumbnail(file)
        ));
    }
}

customElements.define("file-provider", TestProvider);
customElements.define("file-canvas", FileCanvasElement);
customElements.define("test-group-listing", TestListing);

function fixture(id: string) {
    return {
        id,
        timestamp: 0,
        fileName: `${id}.lrc`,
        setPreferWebGl: vi.fn(),
        mountToDom: vi.fn((container: HTMLDivElement) => {
            container.append(document.createElement("canvas"));
        }),
        unmountFromDom: vi.fn(),
        draw: vi.fn(),
    };
}

async function settle(host: TestListing) {
    await host.updateComplete;
    const providers = Array.from(host.shadowRoot!.querySelectorAll<TestProvider>("file-provider"));
    await Promise.all(providers.map(provider => provider.updateComplete));
    await Promise.all(providers.flatMap(provider =>
        Array.from(provider.querySelectorAll<FileCanvasElement>("file-canvas"))
            .map(canvas => canvas.updateComplete)
    ));
}

afterEach(() => {
    document.body.replaceChildren();
});

describe("GroupListingController layouts", () => {
    it("keeps file mutation controls enabled by default and hides them for a preloaded group", () => {
        const host = new TestListing();
        const file = fixture("first");
        Object.assign(host, {
            groupController: { groupObject: { files: { value: [file] } } }
        });
        const container = document.createElement("div");
        render(host.groupListingController.renderListHeader(), container);
        expect(container.textContent).toContain("1 nahraných souborů");
        expect(container.querySelector("group-dropin-input")).not.toBeNull();
        expect(container.querySelector('[icon="trash"]')).not.toBeNull();

        render(host.groupListingController.renderListHeader(undefined, { allowFileChanges: false }), container);
        expect(container.textContent).toContain("Počet souborů: 1");
        expect(container.textContent).not.toContain("nahraných");
        expect(container.querySelector("group-dropin-input")).toBeNull();
        expect(container.querySelector('[icon="trash"]')).toBeNull();
        expect(container.querySelector("group-download-dropdown")).not.toBeNull();

        Object.assign(host, { files: [file] });
        render(host.groupListingController.renderList(
            instance => host.groupListingController.renderThumbnail(instance, { allowFileChanges: false })
        ), container);
        expect(container.querySelector('[icon="trash"]')).toBeNull();
        expect(container.querySelector('[icon="eye"]')).not.toBeNull();
        expect(container.querySelector("file-download-dropdown")).not.toBeNull();
    });

    it("delegates detail opening and closing without removing even a single file", () => {
        const host = new TestListing();
        const file = fixture("first");
        const removeAllInstances = vi.fn();
        Object.assign(host, {
            groupController: { groupObject: { files: { value: [file], removeAllInstances } } }
        });
        const onOpenDetail = vi.fn();
        const onCloseDetail = vi.fn();
        const options = { allowFileChanges: false, onOpenDetail, onCloseDetail };
        const container = document.createElement("div");
        render(host.groupListingController.renderList(
            instance => host.groupListingController.renderThumbnail(instance, options)
        ), container);
        container.querySelector<HTMLElement>('[icon="eye"]')!.click();
        expect(onOpenDetail).toHaveBeenCalledWith(file);

        render(host.groupListingController.renderList(
            instance => host.groupListingController.renderDetailHeader(instance, undefined, options)
        ), container);
        expect(container.textContent).toContain("Zpět");
        expect(container.querySelector('[icon="back"]')?.getAttribute("tooltip")).toBe("Zpět na seznam souborů");
        container.querySelector<HTMLElement>('[icon="back"]')!.click();
        expect(onCloseDetail).toHaveBeenCalledOnce();
        expect(removeAllInstances).not.toHaveBeenCalled();

        render(host.groupListingController.renderList(
            instance => host.groupListingController.renderDetailHeader(instance, undefined, { onCloseDetail })
        ), container);
        expect(container.querySelector('[icon="back"]')?.getAttribute("tooltip")).toBe("Zpět na Vašich 1 souborů");
    });

    it("preserves providers, canvases and mounts across repeated layout and column changes", async () => {
        const host = new TestListing();
        const file = fixture("first");
        Object.assign(host, { files: [file] });
        document.body.append(host);
        await settle(host);
        const provider = host.shadowRoot!.querySelector<TestProvider>("file-provider")!;
        const canvas = provider.querySelector<FileCanvasElement>("file-canvas")!;
        const bitmap = canvas.shadowRoot!.querySelector("canvas");
        const timeline = provider.querySelector("file-timeline");
        const analyses = provider.querySelector("file-analysis-table");
        const graph = provider.querySelector("file-analysis-graph");
        expect(bitmap).not.toBeNull();
        expect(file.mountToDom).toHaveBeenCalledTimes(1);
        expect(analyses?.getAttribute("table-mode")).toBe("compact");
        expect(graph?.getAttribute("standalone")).toBe("true");
        expect(provider.querySelector("file-analysis-complex")).toBeNull();
        expect(provider.querySelector(".file-media")?.children).toHaveLength(2);

        for (const asTable of [true, false, true, false]) {
            host.groupListingController.setAsTable(asTable);
            host.groupListingController.setNumColumns(2);
            host.groupListingController.setPreviewWidth(asTable ? 80 : 20);
            await settle(host);
            const list = host.shadowRoot!.querySelector<HTMLElement>(".group-listing")!;
            expect(list.dataset.layout).toBe(asTable ? "table" : "grid");
            expect(list.style.getPropertyValue("--group-listing-columns")).toBe("2");
            expect(list.style.getPropertyValue("--thermal-list-preview-width")).toBe(asTable ? "80%" : "20%");
            expect(list.querySelector("file-provider")).toBe(provider);
            expect(provider.querySelector("file-canvas")).toBe(canvas);
            expect(canvas.shadowRoot!.querySelector("canvas")).toBe(bitmap);
            expect(provider.querySelector("file-timeline")).toBe(timeline);
            expect(provider.querySelector("file-analysis-table")).toBe(analyses);
            expect(provider.querySelector("file-analysis-graph")).toBe(graph);
        }

        expect(file.mountToDom).toHaveBeenCalledTimes(1);
        expect(file.unmountFromDom).not.toHaveBeenCalled();
        expect(file.draw).toHaveBeenCalledTimes(1);
        host.remove();
        expect(file.unmountFromDom).toHaveBeenCalledTimes(1);
    });

    it("switches between independent column-count and 20-80% preview-width sliders", () => {
        const host = new TestListing();
        Object.assign(host, {
            groupController: { groupObject: { files: { value: [fixture("first"), fixture("second"), fixture("third")] } } }
        });
        const container = document.createElement("div");
        const update = () => render(host.groupListingController.renderColumnsSlider(), container);
        update();
        const slider = container.querySelector("input")!;
        expect(slider.min).toBe("1");
        expect(slider.max).toBe("3");
        slider.value = "2";
        slider.dispatchEvent(new Event("input"));
        host.groupListingController.setAsTable(true);
        update();
        expect(container.querySelector("input")).toBe(slider);
        expect(slider.min).toBe("20");
        expect(slider.max).toBe("80");
        expect(slider.step).toBe("1");
        expect(slider.value).toBe("50");
        expect(slider.getAttribute("aria-label")).toBe("Šířka náhledu");
        for (const value of ["20", "51", "80"]) {
            slider.value = value;
            slider.dispatchEvent(new Event("input"));
            update();
            expect(slider.value).toBe(value);
            const list = document.createElement("div");
            render(host.groupListingController.renderListContainer(html``), list);
            expect(list.querySelector<HTMLElement>(".group-listing")!.style
                .getPropertyValue("--thermal-list-preview-width")).toBe(`${value}%`);
        }
        host.groupListingController.setAsTable(false);
        update();
        expect(slider.value).toBe("2");
        host.groupListingController.setAsTable(true);
        update();
        expect(slider.value).toBe("80");
        for (const value of [19, 81, 50.5, NaN]) {
            expect(() => host.groupListingController.setPreviewWidth(value)).toThrow(RangeError);
        }
    });

    it("keeps each provider associated with its file when the list is reordered", async () => {
        const host = new TestListing();
        const first = fixture("first");
        const second = fixture("second");
        Object.assign(host, { files: [first, second] });
        document.body.append(host);
        await settle(host);
        const before = Array.from(host.shadowRoot!.querySelectorAll("file-provider"));
        Object.assign(host, { files: [second, first] });
        host.requestUpdate();
        await settle(host);
        const after = Array.from(host.shadowRoot!.querySelectorAll("file-provider"));
        expect(after).toEqual([before[1], before[0]]);
    });
});
