import { describe, test, expect } from "vitest";
import { ApiClient } from "../../ApiClient";

describe("PostMoveFile", () => {
    test("root moves file there and back again", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        await client.routes.post.login("root", "abcdefghijk").execute();

        const request = client.routes.post.moveFile(
            "access/restricted/accessible",
            "2025-03-28_13-01-39_thermal.lrc",
            "test/b/left"
        );

        const result = await request.execute();
        console.log( result.code, result.message );
        expect(result.success).toBe(true);

        // move back
        request
            .setPath("test/b/left")
            .setTarget("access/restricted/accessible");
        const resultBack = await request.execute();
        expect(resultBack.success).toBe(true);
    });

    test("move fails if the source file does not exist", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("root", "abcdefghijk").execute();

        const request = client.routes.post.moveFile(
            "access/restricted/accessible",
            "nonexistent.lrc",
            "access/accessible"
        );
        const result = await request.execute();
        expect(result.success).toBe(false);
        expect(result.code).toBe(404);
        expect(result.message).toContain("File");
    });

    test("move fails when target folder does not exist", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("root", "abcdefghijk").execute();

        const request = client.routes.post.moveFile(
            "access/restricted/accessible",
            "2025-03-28_13-01-39_thermal.lrc",
            "nonexistent"
        );
        const result = await request.execute();
        expect(result.success).toBe(false);
        expect(result.code).toBe(404);
        expect(result.message).toContain("does not exist");
    });

    test("move fails when target folder already contains a file with the same name", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("root", "abcdefghijk").execute();

        // try moving the file to its own folder (should conflict because the file already exists there)
        const request = client.routes.post.moveFile(
            "access/restricted/accessible",
            "2025-03-28_13-01-39_thermal.lrc",
            "access/restricted/accessible"
        );
        const result = await request.execute();
        expect(result.success).toBe(false);
        expect(result.code).toBe(409);
        expect(result.message).toContain("already exists");
    });
});
