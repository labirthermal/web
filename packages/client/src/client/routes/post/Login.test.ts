import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";

describe( "PostLogin", () => {

    test( "should be able to login as guest", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );

        const response = await login.execute();

        console.log( response.data );

        expect( response.success ).toBe( true );

        expect( response.data ).toHaveProperty("login");

        expect( response.data!.login ).toBe( client.auth.getIdentity() );

    } );

    test( "should be able to login as root", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );

        const response = await login.execute();

        expect( response.success ).toBe( true );

        expect( response.data ).toHaveProperty("login");

        expect( response.data!.login ).toBe( client.auth.getIdentity() );

    } );

    test( "should be able to login as František Dobrota", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        expect( client.auth.isLoggedIn() ).toBe( false );

        const login = client.routes.post.login(
            "František Dobrota",
            "abcdefghijk"
        );

        const response = await login.execute();

        expect( response.success ).toBe( true );

        expect( client.auth.isLoggedIn() ).toBe( true );

        expect( response.data ).toHaveProperty("login");

        expect( response.data!.login ).toBe( client.auth.getIdentity() );

    } );

    test( "should not be able to login with wrong password", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "wrongpassword"
        );

        const response = await login.execute();

        expect( response.success ).toBe( false );

        expect( client.auth.isLoggedIn() ).toBe( false );

    } );

    test( "should not be able to login with wrong user", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "wronguser",
            "querty"
        );

        const response = await login.execute();

        expect( response.success ).toBe( false );

        expect( client.auth.isLoggedIn() ).toBe( false );

    } );

    test( "once the user is logged in, a second connection with the same sessionid will login automatically", async () => {

        // Create the first client that will login
        const client1 = new ApiClient("http://localhost:8080");
        await client1.connect();

        expect( client1.auth.getSession() ).toBeDefined();
        expect( client1.isConnected() ).toBe( true );

        const login = client1.routes.post.login(
            "guest",
            "querty"
        );

        // Perform the login
        await login.execute();

        expect( client1.auth.isLoggedIn() ).toBe( true );


        // Create a second client that will use the same sessionid
        const client2 = new ApiClient("http://localhost:8080");

        client2.auth.setSession( client1.auth.getSession() );

        await client2.connect();

        // Expect the second client to be connected right away
        expect( client2.auth.isLoggedIn() ).toBe( true );

        // Expect both identitites to be the same
        expect( client1.auth.getIdentity() ).toEqual( client2.auth.getIdentity() );


    } );

    test("recieves user folders on login for guest", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );

        const response = await login.execute();

        expect(response.success).toBe(true);

        expect(response.data).toHaveProperty("userFolders");

        expect(response.data?.userFolders).toBeDefined();

        expect(Array.isArray(response.data?.userFolders)).toBe(true);

        expect(response.data?.userFolders.length).toBeGreaterThan(0);

    });


    test("recieves user folders on login for guest", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );

        const response = await login.execute();

        console.log( response.data?.userFolders );

        expect(response.success).toBe(true);

        expect(response.data).toHaveProperty("userFolders");

        expect(response.data?.userFolders).toBeDefined();

        expect(Array.isArray(response.data?.userFolders)).toBe(true);

        expect(response.data?.userFolders.length).toBeGreaterThan(0);

    });

} );