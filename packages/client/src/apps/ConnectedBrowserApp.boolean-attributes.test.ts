import { html, render } from "lit";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import type { FileInfo, FolderInfo } from "../client/responseEntities";
import { ConnectedBrowserApp } from "./ConnectedBrowserApp";
import { connectedFileDetail } from "../directives/layout/ConnectedFileDetailDirective";
import { connectedFolderFiles } from "../directives/layout/ConnectedFolderFilesDirective";

vi.mock("@labirthermal/webcomponents", async (importOriginal) => {
    if (typeof window.matchMedia !== "function") {
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            value: () => ({
                matches: false,
                addEventListener: () => { },
                addListener: () => { },
            }),
        });
    }

    return importOriginal();
});

const testTag = "connected-browser-app-boolean-test";

const booleanAttributes = [
    ["files-compact", "fileDisplayCompact"],
    ["edit-tags", "editTags"],
    ["display-comments", "displayComments"],
] as const;

const apps: ConnectedBrowserApp[] = [];

beforeAll(() => {
    if (!customElements.get(testTag)) {
        customElements.define(testTag, ConnectedBrowserApp);
    }
});

function createApp(): ConnectedBrowserApp {
    const app = document.createElement(testTag) as ConnectedBrowserApp;
    app.setAttribute("server-url", "https://example.test");
    app.client.hostConnected = async () => { };
    document.body.append(app);
    apps.push(app);
    return app;
}

afterEach(() => {
    apps.splice(0).forEach(app => app.remove());
});

describe("ConnectedBrowserApp boolean attributes", () => {

    test("all migrated attributes are absent and false by default", async () => {
        const app = createApp();
        await app.updateComplete;

        for (const [attribute, property] of booleanAttributes) {
            expect(app[property]).toBe(false);
            expect(app.hasAttribute(attribute)).toBe(false);
        }
    });

    test.each(booleanAttributes)(
        "%s uses presence semantics and resets to false when removed",
        async (attribute, property) => {
            const app = createApp();
            await app.updateComplete;

            app.setAttribute(attribute, "");
            await app.updateComplete;
            expect(app[property]).toBe(true);

            app.removeAttribute(attribute);
            await app.updateComplete;
            expect(app[property]).toBe(false);
            expect(app.hasAttribute(attribute)).toBe(false);
        }
    );

    test.each(booleanAttributes)(
        "%s treats the string false as present and reflects booleans",
        async (attribute, property) => {
            const app = createApp();
            await app.updateComplete;

            app.setAttribute(attribute, "false");
            await app.updateComplete;
            expect(app[property]).toBe(true);
            expect(app.getAttribute(attribute)).toBe("false");

            app[property] = false;
            await app.updateComplete;
            expect(app.getAttribute(attribute)).toBeNull();

            app[property] = true;
            await app.updateComplete;
            expect(app.getAttribute(attribute)).toBe("");
        }
    );

    test("renders the default display state and passes booleans to child properties", async () => {
        const app = createApp();

        const folder = {
            path: "folder",
            name: "folder",
            may_have_files: true,
            may_manage_folders_in: false,
            may_manage_files_in: false,
            lrc_count: 1,
        } as FolderInfo;
        const file = {
            fileName: "file.lrc",
            tags: ["tag"],
        } as FileInfo;
        app.content.dangerouslySetFolder(folder);
        app.content.dangerouslySetFiles([file]);
        app.content.dangerouslySetFileState(file);
        await app.updateComplete;

        const folderContainer = document.createElement("div");
        render(html`${connectedFolderFiles(app)}`, folderContainer);

        let fileList = folderContainer.querySelector("connected-file-list") as
            HTMLElement & {
                compact: boolean;
                editableTags: boolean;
                showDiscussion: boolean;
            };
        const detailContainer = document.createElement("div");
        render(html`${connectedFileDetail(app)}`, detailContainer);
        let tags = detailContainer.querySelector("connected-file-tags") as
            HTMLElement & { editable: boolean };

        expect(fileList.compact).toBe(false);
        expect(fileList.editableTags).toBe(false);
        expect(fileList.showDiscussion).toBe(false);
        expect(tags.editable).toBe(false);
        expect(detailContainer.querySelector("connected-file-comments")).toBeNull();

        app.display.setFilesCompact(true);
        app.display.setEditTags(true);
        app.display.setDisplayComments(true);
        await app.updateComplete;

        render(html`${connectedFolderFiles(app)}`, folderContainer);
        render(html`${connectedFileDetail(app)}`, detailContainer);
        fileList = folderContainer.querySelector("connected-file-list") as
            HTMLElement & {
                compact: boolean;
                editableTags: boolean;
                showDiscussion: boolean;
            };
        tags = detailContainer.querySelector("connected-file-tags") as
            HTMLElement & { editable: boolean };

        expect(fileList.compact).toBe(true);
        expect(fileList.editableTags).toBe(true);
        expect(fileList.showDiscussion).toBe(true);
        expect(tags.editable).toBe(true);
        expect(fileList.hasAttribute("compact")).toBe(false);
        expect(fileList.hasAttribute("editable-tags")).toBe(false);
        expect(fileList.hasAttribute("show-discussion")).toBe(false);
        expect(tags.hasAttribute("editable")).toBe(false);
        expect(detailContainer.querySelector("connected-file-comments")).not.toBeNull();
    });

});
