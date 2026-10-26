import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";

describe( "PostMoveFolder", () => {

    test( "root moves folders there and back again", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        const request = client.routes.post.moveFolder(
            "access/restricted/accessible",
            "zihle"
        );

        const result = await request.execute();

        expect( result.success ).toBe( true );

        // Move back
        request.setPath( "zihle/accessible" );
        request.setTarget( "access/restricted" );
        const resultBack = await request.execute();

        expect( resultBack.success ).toBe( true );

    } );


    test( "move fails if the source folder does not exist", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        const request = client.routes.post.moveFolder(
            "access/restricted/nonexistent",
            "zihle"
        );

        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );
        expect( result.message ).toContain( "Folder does not exist." );

    } );

    test( "move fails when target does not exist", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        const request = client.routes.post.moveFolder(
            "access/restricted/accessible",
            "nonexistent"
        );

        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 404 );
        expect( result.message ).toContain( "does not exist" );

    } );

    test( "move fails when there is a folder of the same name in the destination", async () => {

        const client = new ApiClient(  "http://localhost:8080" );

        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        expect( client.auth.isLoggedIn() ).toBe( true );

        const request = client.routes.post.moveFolder(
            "access/restricted/accessible",
            "access/accessible"
        );

        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 409 );
        expect( result.message ).toContain( "already exists" );

    } );

    test( "move fails when the target folder is set to have files", async () => {

        const client = new ApiClient( "http://localhost:8080" );
        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        const request = client.routes.post.moveFolder(
            "access/restricted/accessible",
            "access/accessible/accessible"
        );

        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );

        expect( result.message ).toContain( "You do not have write access to the target parent folder" );

    } );

    test( "move fails when user wants to move a folder to a destination to  which he does not have any access", async () => {

        const client = new ApiClient( "http://localhost:8080" );
        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const request = client.routes.post.moveFolder(
            "access/restricted_to_guest/accessible",
            "zihle"
        );

        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );
        expect( result.message ).toContain( "You do not have write access to the target parent folder" );

    } );

    test( "move fails when guest is trying to move a folder that is not accessible to him", async () => {

        const client = new ApiClient( "http://localhost:8080" );
        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const request = client.routes.post.moveFolder(
            "access/restricted",
            "zihle"
        );

        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );
        expect( result.message ).toContain( "You do not have write access to this folder" );

    } );

} );