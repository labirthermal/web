import { expect } from "vitest";

// Helper function to validate TagDefinition structure
export function testTagDefinition(tag: any) {
    expect(typeof tag.slug).toBe("string");
    expect(typeof tag.count).toBe("number");
    if (tag.meta !== undefined) {
        expect(typeof tag.meta).toBe("object");
        if (tag.meta.name !== undefined) {
            expect(["string", "undefined"]).toContain(typeof tag.meta.name);
        }
        if (tag.meta.description !== undefined) {
            expect(["string", "undefined"]).toContain(typeof tag.meta.description);
        }
        if (tag.meta.color !== undefined) {
            expect(["string", "undefined"]).toContain(typeof tag.meta.color);
        }
    }
}