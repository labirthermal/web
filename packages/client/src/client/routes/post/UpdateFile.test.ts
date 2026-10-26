import { describe, expect, it, test } from "vitest";
import { ApiClient } from "../../ApiClient";

describe( "UpdateFile", () => {

    test( "should fail in public folder if user is not logged in", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const result = await client.routes.post
            .updateFile( "access/accessible/accessible", "2025-03-28_13-01-39_thermal.lrc" )
            .setLabel( "WTF???" )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );

    } );

    test( "should fail in protected folder if user is not logged in", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const result = await client.routes.post
            .updateFile( "access/accessible/restricted", "2025-03-28_13-01-39_thermal.lrc" )
            .setLabel( "WTF???" )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 401 );

    } );

    test( "guest may not update files that are not directly accessible to him", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();

        const result = await client.routes.post
            .updateFile( "access/accessible/restricted", "2025-03-28_13-01-39_thermal.lrc" )
            .setLabel( "WTF???" )
            .execute();

        expect( result.success ).toBe( false );
        expect( result.code ).toBe( 403 );

    } );

    test( "guest may update files that are accessible to him", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();

        // Load the original state
        const info = await client.routes.get.file( "access/restricted_to_guest/accessible", "2025-03-28_13-01-39_thermal.lrc" ).execute();

        expect( info.success ).toBe( true );

        const originalFile = info.data!.file;

        const labelOriginal = originalFile.label!;
        const descriptionOriginal = originalFile.description!;

        const labelNew = "WTF???";
        const descriptionNew = "This is a new description";

        // Update the file for the first time
        const result = await client.routes.post
            .updateFile( 
                "access/restricted_to_guest/accessible", 
                "2025-03-28_13-01-39_thermal.lrc" 
            )
            .setLabel( labelNew )
            .setDescription( descriptionNew )
            .execute();

        expect( result.success ).toBe( true );
        expect( result.data ).toHaveProperty( "file" );
        const file = result.data!.file;
        expect( file.label ).toBe( labelNew );
        expect( file.description ).toBe( descriptionNew );


        // Revert the file to its original state
        const revert = await client.routes.post
            .updateFile( 
                "access/restricted_to_guest/accessible", 
                "2025-03-28_13-01-39_thermal.lrc" 
            )
            .setLabel( labelOriginal )
            .setDescription( descriptionOriginal )
            .execute();

        expect( revert.success ).toBe( true );
        expect( revert.data ).toHaveProperty( "file" );
        const revertedFile = revert.data!.file;
        expect( revertedFile.label ).toBe( labelOriginal );
        expect( revertedFile.description ).toBe( descriptionOriginal );

    } );

    it( "adds and removes tags properly", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();

        // Add tags to the file
        const addTagsRequest = await client.routes.post
            .updateFile( 
                "access/restricted_to_guest/accessible", 
                "2025-03-28_13-01-39_thermal.lrc" 
            )
            .addTag( "tag1" )
            .addTag( "tag2" )
            .execute();

        expect( addTagsRequest.success ).toBe( true );
        expect( addTagsRequest.data ).toHaveProperty( "file" );

        expect( addTagsRequest.data!.file.tags ).toContain( "tag1" );
        expect( addTagsRequest.data!.file.tags ).toContain( "tag2" );

        // Remove a tag from the file
        const removeTagRequest = await client.routes.post
            .updateFile(
                "access/restricted_to_guest/accessible", 
                "2025-03-28_13-01-39_thermal.lrc" 
            )
            .removeTag( "tag1" )
            .execute();

        expect( removeTagRequest.success ).toBe( true );
        expect( removeTagRequest.data ).toHaveProperty( "file" );
        expect( removeTagRequest.data!.file.tags ).toContain( "tag2" );
        expect( removeTagRequest.data!.file.tags ).not.toContain( "tag1" );

        // Clear all tags from the file
        const clearTagsRequest = await client.routes.post
            .updateFile( 
                "access/restricted_to_guest/accessible", 
                "2025-03-28_13-01-39_thermal.lrc" 
            )
            .clearTags()
            .execute();

        expect( clearTagsRequest.success ).toBe( true );
        expect( clearTagsRequest.data ).toHaveProperty( "file" );
        expect( clearTagsRequest.data!.file.tags ).toEqual( [] );

    } );

    it( "adds and removes analyses properly", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        await client.routes.post.login( "guest", "querty" ).execute();

        // Add tags to the file
        const addAnalysesRequest = await client.routes.post
            .updateFile( 
                "access/restricted_to_guest/accessible", 
                "2025-03-28_13-01-39_thermal.lrc" 
            )
            .addAnalysis( "analysis 1" )
            .addAnalysis( "analysis 2" )
            .execute();

        expect( addAnalysesRequest.success ).toBe( true );
        expect( addAnalysesRequest.data ).toHaveProperty( "file" );

        expect( addAnalysesRequest.data!.file.analyses ).toContain( "analysis 1" );
        expect( addAnalysesRequest.data!.file.analyses ).toContain( "analysis 2" );

        // Remove a tag from the file
        const removeAnalysesRequest = await client.routes.post
            .updateFile(
                "access/restricted_to_guest/accessible", 
                "2025-03-28_13-01-39_thermal.lrc" 
            )
            .removeAnalysis( "analysis 1" )
            .execute();

        expect( removeAnalysesRequest.success ).toBe( true );
        expect( removeAnalysesRequest.data ).toHaveProperty( "file" );
        expect( removeAnalysesRequest.data!.file.analyses ).toContain( "analysis 2" );
        expect( removeAnalysesRequest.data!.file.analyses ).not.toContain( "analysis 1" );

        // Clear all tags from the file
        const clearAnalysisRequest = await client.routes.post
            .updateFile( 
                "access/restricted_to_guest/accessible", 
                "2025-03-28_13-01-39_thermal.lrc" 
            )
            .clearAnalyses()
            .execute();

        expect( clearAnalysisRequest.success ).toBe( true );
        expect( clearAnalysisRequest.data ).toHaveProperty( "file" );
        expect( clearAnalysisRequest.data!.file.analyses ).toEqual( [] );

    } );

} );