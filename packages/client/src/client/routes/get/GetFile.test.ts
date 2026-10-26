import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";
import { testFileInfo } from "../../utils/testFileStructure";

describe( "GetFile", () => {

    test( "should not be able to get file info from a restricted folder when not nogged in", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.get.file(
            "access/restricted/restricted",
            "2025-03-28_13-01-39_thermal.lrc"
        );

        const result = await request.execute();

        expect(result.success).toBe(false);
        expect( result.code ).toBe(401);
        expect(result.message).toMatch(/You need to be logged in to see this folder/i);

    } );

    test( "should be able to get files from public folders", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.get.file(
            "access/accessible/accessible",
            "2025-03-28_13-01-39_thermal.lrc"
        );

        const result = await request.execute();

        expect(result.success).toBe(true);

        expect( result.data?.file ).toHaveProperty("fileName", "2025-03-28_13-01-39_thermal.lrc");

        testFileInfo( result.data!.file );

    } );

    test( "guest shall be able to get files from folders accessible by him", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const request = client.routes.get.file(
            "access/restricted_to_guest",
            "2025-03-28_13-01-39_thermal.lrc"
        );

        const result = await request.execute();

        expect(result.success).toBe(true);

        expect( result.data?.file ).toHaveProperty("fileName", "2025-03-28_13-01-39_thermal.lrc");

        testFileInfo( result.data!.file );

    } );


    test( "guest shall not be able to get files from folders accessible only by root", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const request = client.routes.get.file(
            "access/restricted",
            "2025-03-28_13-01-39_thermal.lrc"
        );

        const result = await request.execute();

        expect(result.success).toBe(false);
        expect( result.code ).toBe(403);

    } );

    test( "root shall be able to get files from folders only accessible by him", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        const request = client.routes.get.file(
            "access/restricted",
            "2025-03-28_13-01-39_thermal.lrc"
        );

        const result = await request.execute();

        expect(result.success).toBe(true);

        expect( result.data?.file ).toHaveProperty("fileName", "2025-03-28_13-01-39_thermal.lrc");

        testFileInfo( result.data!.file );

    } );

    test( "requests to non-existting folders shall fail", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.get.file(
            "non/existing/folder",
            "2025-03-28_13-01-39_thermal.lrc"
        );

        const result = await request.execute();

        expect(result.success).toBe(false);
        expect( result.code ).toBe(404);
        expect(result.message).toMatch(/Folder does not exist./i);

    } );

    test( "request to non-existing files shall fail", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.get.file(
            "access/accessible/accessible",
            "non-existing-file.lrc"
        );

        const result = await request.execute();

        expect(result.success).toBe(false);
        expect( result.code ).toBe(404);
        expect(result.message).toMatch(/was not found/i);

    } );

} );