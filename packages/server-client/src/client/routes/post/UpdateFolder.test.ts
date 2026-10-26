import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";
import { testFolderInfo } from "../../utils/testFolderInfo";
import { readFileSync } from "fs";

import path from "path";

describe( "PostUpdateFolder", () => {

    test( "should not be able to edit a public folder when not looged in", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.post.updateFolder( "/access/accessible" );
        
        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );

    } );

    test( "should not be able to edit a private folder when not looged in", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.post.updateFolder( "/access/restricted" );
        
        const result = await request.execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );

    } );

    test( "guest should be able to update folders accessible by him - update the tags as well", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const folder = "access/restricted_to_guest";
        const temporaryName = "Temporary name of the folder";
        const temporaryDescription = "Temporary description of the folder";
        const temporaryTags = {
            tag1: {
                name: "Temporary tag 1",
                description: "Temporary description of tag 1",
                color: "#ff0000"
            },
            tag2: {
                name: "Temporary tag 2",
                description: "Temporary description of tag 2",
                color: "#00ff00"
            }
        };

        // Create the first request to the folder that shall be updated later
        const infoRequest = client.routes.get.info( folder );
        const infoResponse = await infoRequest.execute();
        expect( infoResponse.success ).toBe( true );

        // Update the folder
        const updateRequest = client.routes.post.updateFolder( folder );
        updateRequest
            .setName( temporaryName )
            .setDescription( temporaryDescription );

        Object.entries( temporaryTags ).forEach( ( [ slug, tag ] ) => {
            updateRequest.addTag( slug, tag.name, tag.description, tag.color );
        } );

        const updateResponse = await updateRequest.execute();

        testFolderInfo( updateResponse.data!.result.info );

        expect( updateResponse.data!.result.moved ).toBe( false );
        expect( updateResponse.data?.result.name ).toBe( temporaryName );
        expect( updateResponse.data?.result.slug ).toBe( infoResponse.data?.folder.path );
        expect( updateResponse.data?.result.description ).toBe( temporaryDescription );
        expect( updateResponse.data?.result.info.own_tags ).toEqual( temporaryTags );

        // Restore back the original folder info
        const updateBackRequest = client.routes.post.updateFolder( folder );
        updateBackRequest
            .setName( infoResponse.data!.folder.name )
            .setDescription( infoResponse.data!.folder.description! )
            .removeTags( ["tag1", "tag2"] );

        const updateBackResponse = await updateBackRequest.execute();

        expect( updateBackResponse.success ).toBe( true );
        expect( updateBackResponse.data?.result.info ).toEqual( infoResponse.data?.folder );
        expect( updateBackResponse.data?.result.info.own_tags.length ).toBe( 0 );

        testFolderInfo( updateBackResponse.data!.result.info );

    } );


    test( "update metadata", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        // Login as root
        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        // Original state
        const infoRequest = client.routes.get.info( "access/restricted" );
        const info = await infoRequest.execute();

        const originalMetadata = info.data!.folder.meta;

        // Update the folder metadata to a new state
        const updateRequest = client.routes.post.updateFolder( "access/restricted" );
        updateRequest
            .setMetadata( {
                lat: "Testing value"
            } );
        const updated = await updateRequest.execute();

        expect( updated.success ).toBe( true );
        expect( updated.data?.result.info.meta ).toEqual( {
            lat: "Testing value",
            long: originalMetadata.long,
        } );

        // Set back the original value
        const updateBackRequest = client.routes.post.updateFolder( "access/restricted" );
        updateBackRequest
            .setMetadata( originalMetadata );
        const reverted = await updateBackRequest.execute();

        expect( reverted.success ).toBe( true );

        expect( reverted.data?.result.info ).toEqual( info.data?.folder );

    } );

    const PUBLIC_DIR = path.resolve(__dirname, "../../../../../../public");


    const loadPublicFile = (fileName: string, mime: string): File => {
        const filePath = path.join(PUBLIC_DIR, fileName);
        const fileBuffer = readFileSync(filePath);
        const fileOriginalName = path.basename(filePath);
        const file = new File([fileBuffer], fileOriginalName, { type: mime });
        return file;
    }

    test( "update folder thumbnail", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        expect( client.auth.isLoggedIn() ).toBe( true );

        const requestUpload = client.routes.post.updateFolder( "specials/user" );

        const kitten = loadPublicFile("kitten.png", "image/png");

        requestUpload.setThumbnail( kitten );

        const response = await requestUpload.execute();

        expect( response.data?.result.info.thumb ).toBeDefined();
        expect( response.data!.result!.info!.thumb!.endsWith( ".png" ) ).toBe( true );

    } );



} );