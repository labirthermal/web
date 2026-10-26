import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";
import { testFolderInfo } from "../../utils/testFolderInfo";


describe( "GetDefault", () => {

    test( "should be able to read from public folders as unauthenticated", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.info( "access/accessible/accessible" );

        const response = await request.execute();

        expect( response.success ).toBe( true );

        // Check if the response has the folder and subfolders
        expect( response.data ).toHaveProperty("folder");
        expect( response.data ).toHaveProperty("subfolders");

        // Check if the folder is the public folder
        expect( response.data!.folder.name ).toBe( "Jméno složky" );

        testFolderInfo( response.data!.folder );

    } );

    test( "should not be able to read from protected folders as unauthenticated", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.info("access/accessible/restricted");

        const response = await request.execute();

        expect( response.success ).toBe( false );

        expect( response.code ).toBe( 401 );

    } );


    test.only( "should be able to see a protected folder once logged in with proper access", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();


        // Try to access the protected folder before logging in
        const failed_request = client.routes.get.info("access/restricted_to_guest");

        const failed_response = await failed_request.execute();

        console.log( failed_response );

        expect( failed_response.success ).toBe( false );

        expect( failed_response ).toHaveProperty("code");
        expect( failed_response ).toHaveProperty("message");




        // Login as guest
        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        const loginResponse = await login.execute();

        expect( loginResponse.success ).toBe( true );

        expect( loginResponse.data!.login ).toBe( client.auth.getIdentity() );

        // Now try to access the protected folder when we are logged in
        const request = client.routes.get.info("access/restricted_to_guest" );

        const response = await request.execute();

        expect( response.success ).toBe( true );

        // Check if the response has the folder and subfolders
        expect( response.data ).toHaveProperty("folder");
        expect( response.data ).toHaveProperty("subfolders");

    } );

    test( "_content.json", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.info( "zihle" );

        const response = await request.execute();

        expect( response.success ).toBe( true );

        // Check if the folder is the public folder
        expect( response.data!.folder.name ).toBe( "Žihle" );

        testFolderInfo( response.data!.folder );

        expect( response.data?.folder.meta ).toHaveProperty( "latitude", 50.027);
        expect( response.data?.folder.meta ).toHaveProperty( "longitude", 13.237 );

    } );

    test( "_content.json v podsložce", async () => {

        const client = new ApiClient("http://localhost:8080");
        
        await client.connect();

        const request = client.routes.get.info( "zihle/deska" );

        const response = await request.execute();

        expect( response.success ).toBe( true );

        testFolderInfo( response.data!.folder );

        expect( response.data?.folder.name ).toBe( "Deska měření" );
        expect( response.data?.folder.description ).toBe( 'Data pro složku deska v lokalitě Žihle.' );

        expect( typeof response.data?.folder.meta ).toBe( "object" );

        expect( response.data?.folder.meta ).not.toBeNull();

    } );

    test( "výchozí hodnoty bez _content.json", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.info("zihle/trava");

        const result = await request.execute();

        expect( result.success ).toBe( true );

        testFolderInfo( result.data!.folder );

        expect( result.data?.folder ).toHaveProperty( "name", "trava" );
        expect( result.data?.folder ).toHaveProperty( "description", null );
        expect( Object.keys( result.data!.folder.meta ).length ).toBe( 0 );

    } );

    test( "guestem neviditelná složka se nevypíše v subfolders", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.info("zihle");

        const response = await request.execute();

        expect( response.success ).toBe( true );

        expect( response.data?.subfolders ).not.toHaveProperty( "dlouhodobe-mereni" );


    } );

    test( "guestem viditelná složka se vypíše v subfolders pro uživatele root", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();


        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();


        const request = client.routes.get.info( "zihle" );

        const response = await request.execute();

        expect( response.success ).toBe( true );

        expect( response.data?.subfolders ).toHaveProperty( "dlouhodobe-mereni" );

    } );

    test( "pokud složka nemá žádné podsložky, subfolders je false", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.info("zihle/trava");

        const response = await request.execute();

        expect( response.success ).toBe( true );

        expect( response.data?.subfolders ).toBe( false );

    } );

} );