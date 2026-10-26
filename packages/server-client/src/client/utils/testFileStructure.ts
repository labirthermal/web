import { expect } from "vitest";

// Helper function to validate FileInfo structure
export function testFileInfo(file: any) {
    expect(file).toHaveProperty("entity", "file");
    expect(typeof file.url).toBe("string");
    expect(["string", "object"].includes(typeof file.description)).toBe(true);
    // label může být string nebo null
    expect(["string", "object"].includes(typeof file.label)).toBe(true);
    expect(typeof file.fileName).toBe("string");
    expect(typeof file.folder).toBe("string");
    expect(typeof file.parent).toBe("string");
    expect(typeof file.path).toBe("string");
    expect(["string", "boolean"].includes(typeof file.visual)).toBe(true);
    expect(["string", "boolean"].includes(typeof file.preview)).toBe(true);
    expect(typeof file.timestamp).toBe("number");
    expect(typeof file.uploaded).toBe("number");
    // tags mohou být prázdné pole
    expect(Array.isArray(file.tags)).toBe(true);
    expect(typeof file.dateHuman).toBe("string");
    expect(typeof file.apiRoot).toBe("string");
    expect(Array.isArray(file.analyses)).toBe(true);
}
