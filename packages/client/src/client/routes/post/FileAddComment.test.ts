import { describe, expect, it } from "vitest";
import { ApiClient } from "../../ApiClient";

describe("FileAddComment", () => {

    it("should fail when not logged-in (resctricted folder)", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const result = await client.routes.post
            .fileAddComment(
                "access/accessible/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                "This is a comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );

    });

    it("should fail when not logged-in (public folder)", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const result = await client.routes.post
            .fileAddComment(
                "access/accessible/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                "This is a comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );

    });

    it( "should fail when user is trying to comment files that are inaccessible to him", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .fileAddComment(
                "access/accessible/restricted/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                "This is a comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );

    } );

    it( "should fail when commenting a file in nonexisting folder", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .fileAddComment(
                "access/restricted_to_guest/nonexisting",
                "2025-03-28_13-01-39_thermal.lrc",
                "This is a comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );

    } );

    it( "should fail when commenting a nonexisting file in existing folder", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .fileAddComment(
                "access/restricted_to_guest/accessible",
                "nonexistingfile.lrc",
                "This is a comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );

    } );



    it( "should add comments to files that are accessible to the current user", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();

        // Vygeneruj náhodný komentář
        const randomComment = "Test comment " + Math.random().toString(36).substring(2, 15);

        const result = await client.routes.post
            .fileAddComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                randomComment
            )
            .execute();

        expect( result.success ).toBe( true );
        expect( result.data ).toHaveProperty("file");
        expect( result.data!.file.comments.length ).toBeGreaterThan( 0 );
        expect( result.data!.file.comments[result.data!.file.comments.length - 1].message ).toBe( randomComment );


        // Now login as root and add a new commit

        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        const rootComment = "Root comment " + Math.random().toString(36).substring(2, 15);
        const rootResult = await client.routes.post
            .fileAddComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                rootComment
            )
            .execute();

        expect( rootResult.success ).toBe( true );
        expect( rootResult.data ).toHaveProperty("file");
        expect( rootResult.data!.file.comments.length ).toBeGreaterThan( 0 );
        expect( rootResult.data!.file.comments[rootResult.data!.file.comments.length - 1].message ).toBe( rootComment );


    });

});