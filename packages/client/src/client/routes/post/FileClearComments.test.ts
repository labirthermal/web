import { describe, expect, it } from "vitest";
import { ApiClient } from "../../ApiClient";

const fileName = "2025-03-28_13-01-39_thermal.lrc";

describe( "FileClearComments", () => {

    it( "should fail when not logged in", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const result = await client.routes.post
            .fileClearComments(
                "access/restricted_to_guest/accessible",
                fileName
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );

    } );

    it( "should fail when logged as guest (a public folder)", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();
        const result = await client.routes.post
            .fileClearComments(
                "access/accessible/accessible",
                fileName
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );
        expect( result.message ).toContain( "You do not have write access to this folder" );

    });

    it( "should fail when logged as guest (a folder inaccessible by guest)", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();
        const result = await client.routes.post
            .fileClearComments(
                "access/restricted/accessible",
                fileName
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );
        expect( result.message ).toContain( "You do not have write access to this folder" );

    });

    it( "should fail when logged as guest (a folder accessible by guest)", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();
        const result = await client.routes.post
            .fileClearComments(
                "access/restricted_to_guest/accessible",
                fileName
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );
        expect( result.message ).toContain( "Access denied: only administrators can clear all comments." );

    });

    it( "should fail when the folder does not exist", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        const result = await client.routes.post
            .fileClearComments(
                "access/accessible/restricted_to_guest/does_not_exist",
                fileName
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );

    } );

    it( "should fail when the file does not exist", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        const result = await client.routes.post
            .fileClearComments(
                "access/accessible/restricted_to_guest/accessible",
                "does_not_exist.lrc"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );

    });

    it( "should work for root (creating several comments and deleting them back)", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        const createComment = async (
            message: string
        ) => {
            return await client.routes.post
                .fileAddComment(
                    "access/restricted/restricted",
                    fileName,
                    message
                )
                .execute();
        }

        const result = await Promise.all([
            await createComment("First comment"),
            await createComment("Second comment"),
            await createComment("Third comment"),
        ]);

        const numComments = result.length;

        const infoBeforeClear = await client.routes.get.file(
            "access/restricted/restricted", 
            fileName
        ).execute();

        expect( infoBeforeClear.success ).toBe( true );
        expect( infoBeforeClear.data ).toHaveProperty("file");
        expect( infoBeforeClear.data!.file.comments.length ).toBe( numComments );


        const clear = await client.routes.post
            .fileClearComments(
                "access/restricted/restricted",
                fileName
            )
            .execute();

        expect( clear.success ).toBe( true );
        expect( clear.data ).toHaveProperty("file" );
        expect( clear.data!.file.comments.length ).toBe( 0 );


    } );

} );