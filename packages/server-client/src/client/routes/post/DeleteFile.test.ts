import path from "path";
import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";
import { ApiClient } from "../../ApiClient";

const PUBLIC_DIR = path.resolve(__dirname, "../../../../../../public");

const loadPublicFile = (fileName: string, mime: string): File => {
    const filePath = path.join(PUBLIC_DIR, fileName);
    console.log( "Načítám", filePath );
    const fileBuffer = readFileSync(filePath);
    const fileOriginalName = path.basename(filePath);
    
    // Create File object using a more compatible approach
    const uint8Array = new Uint8Array(fileBuffer);
    const file = new File([fileBuffer], fileOriginalName, { type: mime });

    console.log( file, fileBuffer.length );
    return file;
}

describe("DeleteFile", () => {
    it("should delete file", async () => {

        const client = new ApiClient( "http://localhost:8080" );

        await client.connect();


        await client.routes.post.login( "root", "abcdefghijk" ).execute();

        expect( client.isConnected() ).toBeTruthy();
        expect( client.auth.isLoggedIn() ).toBeTruthy();

        const file = loadPublicFile("klokani_01.lrc", "application/octet-stream");

        const folderPath = "access/restricted/restricted";


        console.log( file );
        


        const upload = await client.routes.post.uploadFile(folderPath, file).execute();

        expect(upload.success).toBeTruthy();
        expect(upload.data?.file).toBeDefined();
        expect(upload.data?.file.fileName).toBeDefined();

        const remove = await client.routes.post.deleteFile(folderPath, upload.data!.file!.fileName).execute();

        console.log( remove );
        
        expect(remove.success).toBeTruthy();
        expect(remove.message).toContain("deleted successfully");

    });
} );