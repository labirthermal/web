import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";

describe( "FileUpdateComment", () => {

    test( "should fail when not logged in", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const result = await client.routes.post
            .fileUpdateComment(
                "access/accessible/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                10,
                "Updated comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );
    } );

    test( "should fail when logged in as guest (public folder)", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .fileUpdateComment(
                "access/accessible/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                10,
                "Updated comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );
        expect( result.message ).toContain( "You do not have write access to this folder" );
    } );

    test( "should fail when logged in as guest (restricted folder)", async () => {
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .fileUpdateComment(
                "access/accessible/restricted",
                "2025-03-28_13-01-39_thermal.lrc",
                10,
                "Updated comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );
        expect( result.message ).toContain( "You do not have write access to this folder" );
    } );

    test( "should fail when guest trying to update a comment on a folder that does not exist", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .fileUpdateComment(
                "access/restricted_to_guest/non-existing-folder",
                "non_existent_file.lrc",
                10,
                "Updated comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );

    } );

    test( "should fail when guest trying to update a comment on a file that does not exist", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .fileUpdateComment(
                "access/restricted_to_guest/accessible",
                "non_existent_file.lrc",
                10,
                "Updated comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );

    } );

    test( "should fail when trying to update a comment that does not exist", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .fileUpdateComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                1234567890, // Non-existing timestamp
                "This is an attempt to change a non-existing comment"
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );

    });

    test( "should fail when trying to update a comment that is not owned by the current user", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        const add = await client.routes.post.fileAddComment(
            "access/restricted_to_guest/accessible",
            "2025-03-28_13-01-39_thermal.lrc",
            "This is a comment posted by root that is about to be changed by the guest"
        ).execute();

        expect( add.success ).toBe( true );

        const commentTimestamp = add.data!.file.comments[ add.data!.file.comments.length - 1 ].timestamp;

        await client.routes.post.login( "guest", "querty" ).execute();

        const modify = await client.routes.post
            .fileUpdateComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                commentTimestamp,
                "This is an attempt to change a comment that does not belong to the guest"
            )
            .execute();

        expect( modify.success ).toBe( false );

        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        const clear = await client.routes.post.fileClearComments(
            "access/restricted_to_guest/accessible",
            "2025-03-28_13-01-39_thermal.lrc")
            .execute();

        expect( clear.success ).toBe( true );

        expect( clear.data?.file.comments.length ).toBe( 0 );

    } );



    test( "should succeed when modifying own comment", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "guest", "querty" ).execute();

        const add = await client.routes.post.fileAddComment(
            "access/restricted_to_guest/accessible",
            "2025-03-28_13-01-39_thermal.lrc",
            "This is a comment posted by guest that is about to be changed by the guest"
        ).execute();

        expect( add.success ).toBe( true );

        const commentTimestamp = add.data!.file.comments[ add.data!.file.comments.length - 1 ].timestamp;

        const modify = await client.routes.post
            .fileUpdateComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                commentTimestamp,
                "This is an attempt to change a comment that does belong to the guest"
            )
            .execute();

        expect( modify.success ).toBe( true );

        expect( modify.data!.file.comments.length ).toBe( 1 );

        expect( modify.data!.file.comments[0].message ).toBe( "This is an attempt to change a comment that does belong to the guest" );

        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        const clear = await client.routes.post.fileClearComments(
            "access/restricted_to_guest/accessible",
            "2025-03-28_13-01-39_thermal.lrc")
            .execute();

        expect( clear.success ).toBe( true );

        expect( clear.data?.file.comments.length ).toBe( 0 );

    } );
      

} );