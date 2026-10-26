import { expect } from "vitest";
import { testFileInfo } from "./testFileStructure";
import { testFolderInfo } from "./testFolderInfo";

export function testGrid(grid: any) {
    // Ověř top-level klíče
    expect(grid).toHaveProperty("folder");
    expect(grid).toHaveProperty("all_subdirectories");
    expect(grid).toHaveProperty("header");
    expect(grid).toHaveProperty("groups");
    expect(grid).toHaveProperty("time");
    expect(grid).toHaveProperty("count");
    // expect(grid).toHaveProperty("files");
    expect(grid).toHaveProperty("tags");

    // Ověř folder
    testFolderInfo(grid.folder);

    // Ověř all_subdirectories
    for (const key in grid.all_subdirectories) {
        testFolderInfo(grid.all_subdirectories[key]);
    }

    // Ověř header
    for (const key in grid.header) {
        testFolderInfo(grid.header[key]);
    }

    // Ověř groups
    for (const groupKey in grid.groups) {
        const group = grid.groups[groupKey];
        expect(group).toHaveProperty("label");
        expect(group).toHaveProperty("from");
        expect(group).toHaveProperty("to");
        expect(group).toHaveProperty("folders");
        for (const folderKey in group.folders) {
            const files = group.folders[folderKey];
            expect(Array.isArray(files)).toBe(true);
            for (const file of files) {
                testFileInfo(file);
            }
        }
    }

    // Ověř files
    if ( grid.files !== undefined ) {
        expect(Array.isArray(grid.files)).toBe(true);
        for (const file of grid.files) {
            testFileInfo(file);
        }
    }
    
}
