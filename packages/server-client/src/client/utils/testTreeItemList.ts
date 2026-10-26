import { expect } from "vitest";
import type { TreeItem } from "../responseEntities";

export const testTreeItemList = (list: TreeItem[]) => {
    list.forEach(item => {
        expect(item).toHaveProperty("entity");
        expect(item.entity).toBe("treeitem");
        expect(item).toHaveProperty("name");
        expect(item).toHaveProperty("path");
        expect(item).toHaveProperty("slug");
        expect(item).toHaveProperty("description");
        expect(item).toHaveProperty("lrc_count");
        expect(item).toHaveProperty("may_have_files");
        expect(item).toHaveProperty("metadata");
        expect(item).toHaveProperty("subfolders");

        testTreeItemList(item.subfolders || []);

    });
};


