import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";

describe( "FileDeleteComment", () => {

    test( "should fail when not logged in", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const result = await client.routes.post
            .fileDeleteComment(
                "access/accessible/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                1751981089791 // timestamp of the comment to delete
            )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );

    } );

    test( "should fail when guest is trying to delete root's comment", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        expect( client.auth.isLoggedIn() ).toBe( true );

        const add = await client.routes.post
            .fileAddComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                "This is an attempt to change a comment that does belong to the guest"
            )
            .execute();
        expect( add.success ).toBe( true );

        const timestamp = add.data?.file.comments[add.data!.file.comments.length - 1].timestamp!;

        await client.routes.post.login( "guest", "querty" ).execute();

        const remove = await client.routes.post
            .fileDeleteComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                timestamp
            )
            .execute();

        expect( remove.success ).toBe( false );
        expect( remove.code ).toBe( 403 );
        expect( remove.message ).toContain( "You can only delete your own comments." );

        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        await client.routes.post.fileClearComments(
            "access/restricted_to_guest/accessible",
            "2025-03-28_13-01-39_thermal.lrc"
        ).execute();

    } );  


    test( "should succeeds when guest is trying to delete his own comment", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();


        expect( client.auth.isLoggedIn() ).toBe( true );

        const messageOfTheComment = "This comment should be deleted back.";

        const add = await client.routes.post
            .fileAddComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                messageOfTheComment
            )
            .execute();
        expect( add.success ).toBe( true );

        const timestamp = add.data?.file.comments[add.data!.file.comments.length - 1].timestamp!;

        

        const remove = await client.routes.post
            .fileDeleteComment(
                "access/restricted_to_guest/accessible",
                "2025-03-28_13-01-39_thermal.lrc",
                timestamp
            )
            .execute();

        expect( remove.success ).toBe( true );
        expect( remove.code ).toBe( 200 );


        const timestamps = remove.data?.file.comments.map( c => c.timestamp );

        expect( timestamps ).not.toContain( timestamp );

        const messages = remove.data?.file.comments.map( c => c.message );

        expect( messages ).not.toContain( messageOfTheComment );

        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        await client.routes.post.fileClearComments(
            "access/restricted_to_guest/accessible",
            "2025-03-28_13-01-39_thermal.lrc"
        ).execute();

    } );  


} );