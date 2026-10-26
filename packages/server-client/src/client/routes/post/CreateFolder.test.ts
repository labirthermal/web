import { describe, expect, test, afterEach } from "vitest";
import { ApiClient } from "../../ApiClient";
import { cleanupFolders } from "../../utils/cleanupFolders";
import type { FolderInfo } from "../../responseEntities";

describe("PostCreateFolder", () => {

    const createdFolders: string[] = [];

    afterEach( async () => {

        await cleanupFolders( createdFolders );

        createdFolders.length = 0; // Clear the array

    } );

    test("should not be able to create anything when not logged in", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.post.createFolder(
            "access/accessible",
            "Test Folder"
        );
        request
            .setDescription("This is a test folder")
            .setMeta({ key: "value" });

        const result = await request.execute();

        expect(result.success).toBe(false);
        expect(result.code).toBe(401);

    });

    test( "should create a folder once logged in as root", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        // Login as root
        const loginRequest = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        const loginResult = await loginRequest.execute();

        expect(loginResult.success).toBe(true);

        // Create a folder
        const createFolderRequest = client.routes.post.createFolder(
            "access/accessible",
            "Test Folder"
        );
        createFolderRequest
            .setDescription("This is a test folder")
            .setMeta({ key: "value" });

        const createFolderResult = await createFolderRequest.execute();

        createdFolders.push( createFolderResult.data?.result.info.path || "" );

        expect(createFolderResult.success).toBe(true);

    });

    test("guest sould be able to create a folder in locations accessible by him", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        expect( client.auth.isLoggedIn() ).toBe( true );

        const request = client.routes.post.createFolder(
            "access/restricted_to_guest",
            "Test Folder"
        );
        request
            .setDescription("This is a test folder")
            .setMeta({ key: "value" });

        const result = await request.execute();

        createdFolders.push( result.data?.result.info.path || "" );

        expect(result.success).toBe(true);

        const data = result.data!.result;
        expect(data.info.name).toBe("Test Folder");
        expect(data.info.description).toBe("This is a test folder");

    });

    test( "guest should not be able to create folders in location inaccessible to him", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );

        await login.execute();

        expect( client.auth.isLoggedIn() ).toBe( true );

        const request = client.routes.post.createFolder(
            "access/accessible",
            "Test Folder"
        );

        request
            .setDescription("This is a test folder")
            .setMeta({ key: "value" });

        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );

    } );

    test( "should fail when the folder already exists", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        // Login as root
        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const request = client.routes.post.createFolder(
            "access/restricted_to_guest",
            "Název nové složky"
        );

        const result = await request.execute();
        expect(result.success).toBe(false);
        expect( result.code ).toBe( 409 );

    } );

    test( "should fail when the target folder does accept files", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        // Login as root
        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const request = client.routes.post.createFolder(
            "access/restricted_to_guest/accessible",
            "Název nové složky"
        );

        const result = await request.execute();
        expect(result.success).toBe(false);
        expect( result.code ).toBe( 403 );
        expect( result.message ).toContain( "You do not have permission" );

    } );

    test( "creation with metadata, tags and access should return a proper response", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        // Login as root
        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const name = "Testovací složka pro ověření struktury API";
        const description = "Toto je testovací složka";
        const meta = { key: "value" };
        const show = true;
        const mayHaveFiles = true;
        const tags = {
            "Tag 1": { name: "Tag 1", description: "Popis tagu 1", color: "#FF0000" },
            "Tag 2": { name: "Tag 2", description: "Popis tagu 2", color: "#00FF00" }
        };

        const request = client.routes.post.createFolder(
            "access/restricted_to_guest",
            name
        );

        request
            .setDescription(description)
            .setMeta(meta)
            .setShow(show)
            .setMayHaveFiles(mayHaveFiles)
            .addTag("Tag 1", "Popis tagu 1", "#FF0000")
            .addTag("Tag 2", "Popis tagu 2", "#00FF00");

        const result = await request.execute();

        createdFolders.push( result.data?.result.info.path || "" );

        expect(result.success).toBe(true);

        const info = result.data!.result.info as FolderInfo;
        
        expect(info.name).toBe(name);
        expect(info.description).toBe(description);
        expect(info.meta).toEqual(meta);
        expect(info.may_have_files).toBe(mayHaveFiles);
        expect(info.slug).toBe("testovaci-slozka-pro-overeni-struktury-api");
        expect(info.own_tags).toEqual(tags);

    } );

    test( "should remove unsafe strings from created folder", async () => {

        const client = new ApiClient( "http://localhost:8080" );

        const unsafeName = "Testovací složka s nebezpečnými znaky: <script>alert('XSS');</script>";
        const safeName = "Testovací složka s nebezpečnými znaky:";
        const unsafeDescription = "Toto je testovací složka s nebezpečnými znaky: <script>alert('XSS');</script>";
        const safeDescription = "Toto je testovací složka s nebezpečnými znaky:";
        const unsafeMeta = { key: "value<script>alert('XSS');</script>" };
        const safeMeta = { key: "value" };

        // Unsafe tag values
        const unsafeTagName = "Tag<script>alert('XSS')</script> onmouseover=alert(1) ' \" `";
        const safeTagName = "Tag";
        const unsafeTagDesc = "Popis <img src=x onerror=alert(2)> <script>evil()</script>\n\t";
        const safeTagDesc = "Popis";
        const unsafeTagColor = "#FF0000<script>bad()</script>\n\t\x00\x1F";
        const safeTagColor = "#FF0000";

        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        expect( client.auth.isLoggedIn() ).toBe( true );

        const request = client.routes.post.createFolder(
            "access/restricted_to_guest",
            unsafeName
        );
        request
            .setDescription(unsafeDescription)
            .setMeta(unsafeMeta)
            .setShow(true)
            .setMayHaveFiles(true)
            .addTag(unsafeTagName, unsafeTagDesc, unsafeTagColor);

        const result = await request.execute();


        createdFolders.push( result.data?.result?.info.path || "" );

        expect(result.success).toBe(true);
        const info = result.data!.result.info as FolderInfo;
        expect(info.name).toBe(safeName);
        expect(info.description).toBe(safeDescription);
        expect(info.meta).toEqual(safeMeta);
        expect(info.slug).toBe("testovaci-slozka-s-nebezpecnymi-znaky");

        // Kontrola tagů
        expect(info.own_tags).toEqual({
            [safeTagName]: {
                name: safeTagName,
                description: safeTagDesc,
                color: safeTagColor
            }
        });


    } );

});