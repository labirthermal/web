import { describe, test, expect } from "vitest";
import { ApiClient } from "../ApiClient";

describe( "Entities", () => {

    test( "connect to folder", async () => {

        const client = new ApiClient( "http://localhost:8080" );
        await client.connect();

        const login = client.routes.post.login( "root", "abcdefghijk" );
        await login.execute();

        expect( client.isConnected() ).toBe( true );

        const observer1 = await client.entities.connectToFolder( "access/accessible", {
            onFolderChanged() {}
        } );

        const observer2 = await client.entities.connectToFolder( "access/accessible", {
            onFolderChanged() {}
        } );

        observer1.update.name.enqueue( "Entity update name ABCD" );
        observer2.update.description.enqueue( "Nějaká popiska prde" );

        await observer1.persist();

    } );

} );