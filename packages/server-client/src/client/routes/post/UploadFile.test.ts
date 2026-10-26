import { afterEach, describe, expect, it } from "vitest";
import { ApiClient } from "../../ApiClient";
import { readFileSync } from "fs";
import path from "path";
import { cleanupFiles } from "../../utils/cleanupFiles";
import { testFileInfo } from "../../utils/testFileStructure";

const PUBLIC_DIR = path.resolve(__dirname, "../../../../../../public");

const loadPublicFile = (fileName: string, mime: string): File => {
    const filePath = path.join(PUBLIC_DIR, fileName);
    const fileBuffer = readFileSync(filePath);
    const fileOriginalName = path.basename(filePath);
    const file = new File([fileBuffer], fileOriginalName, { type: mime });
    return file;
}



describe("UploadFile", () => {

    // Pole pro uložení URL nahraných souborů, které budou vyčištěny po každém testu
    let uploadedFileUrls: string[] = [];

    // Vyčištění nahraných souborů po každém testu
    afterEach(async () => {
        if (uploadedFileUrls.length) {
            await cleanupFiles(uploadedFileUrls);
            uploadedFileUrls = [];
        }
    });

    it("should fail when trying to upload to a folder as not-logged in", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        // Pokus o upload souboru bez přihlášení
        const lrcPath = path.join(PUBLIC_DIR, "klokani_01.lrc");
        const lrcBuffer = readFileSync(lrcPath);
        const lrcOriginalName = path.basename(lrcPath);
        const lrcFile = new File([lrcBuffer], lrcOriginalName, { type: "application/octet-stream" });

        const request = client.routes.post.uploadFile("access/restricted_to_guest/accessible", lrcFile);

        const response = await request.execute();

        expect(response.success).toBe(false);
        expect(response.code).toBe(401);

    });


    it("should fail when trying to upload to a folder to which the guest does not have access", async () => {


        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("guest", "querty").execute();

        // Pokus o upload souboru do složky, kam guest nemá přístup
        const lrcPath = path.join(PUBLIC_DIR, "klokani_01.lrc");
        const lrcBuffer = readFileSync(lrcPath);
        const lrcOriginalName = path.basename(lrcPath);
        const lrcFile = new File([lrcBuffer], lrcOriginalName, { type: "application/octet-stream" });

        const request = client.routes.post.uploadFile("access/restricted", lrcFile);

        const response = await request.execute();

        expect(response.success).toBe(false);
        expect(response.code).toBe(403);

    });

    it("should fail when trying to upload to a non-existing folder", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("guest", "querty").execute();

        // Pokus o upload souboru do neexistující složky
        const lrcPath = path.join(PUBLIC_DIR, "klokani_01.lrc");
        const lrcBuffer = readFileSync(lrcPath);
        const lrcOriginalName = path.basename(lrcPath);
        const lrcFile = new File([lrcBuffer], lrcOriginalName, { type: "application/octet-stream" });

        const request = client.routes.post.uploadFile("access/restricted_to_guest/non_existing_folder", lrcFile);

        const response = await request.execute();

        expect(response.success).toBe(false);
        expect(response.code).toBe(404);

    });


    it("should file when trying to upload a different type of file", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("guest", "querty").execute();

        // Pokus o upload souboru, který není typu .lrc
        const pngPath = path.join(PUBLIC_DIR, "kitten.png");
        const pngBuffer = readFileSync(pngPath);
        const pngOriginalName = path.basename(pngPath);
        const pngFile = new File([pngBuffer], pngOriginalName, { type: "image/png" });

        const request = client.routes.post.uploadFile("access/restricted_to_guest/accessible", pngFile);

        const response = await request.execute();

        expect(response.success).toBe(false);
        expect(response.code).toBe(400);
        expect(response.message).toContain("Only .lrc files are allowed.");

    });


    it("should not allow uploading JPG as visible or preview files", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("guest", "querty").execute();

        // 

        // Načtení LRC a JPG obrázku z public složky
        const lrcPath = path.join(PUBLIC_DIR, "klokani_01.lrc");
        const lrcBuffer = readFileSync(lrcPath);
        const lrcOriginalName = path.basename(lrcPath);
        const lrcFile = new File([lrcBuffer], lrcOriginalName, { type: "application/octet-stream" });

        const jpgPath = path.join(PUBLIC_DIR, "kitten.jpg");
        const jpgBuffer = readFileSync(jpgPath);
        const jpgOriginalName = path.basename(jpgPath);
        const jpgFile = new File([jpgBuffer], jpgOriginalName, { type: "image/jpeg" });

        // Pokus o upload souboru s JPG jako vizuálem a preview
        const request = client.routes.post.uploadFile("access/restricted_to_guest/accessible", lrcFile);
        request
            .setVisual(jpgFile)
            .setPreview(jpgFile);

        const response = await request.execute();

        // Uložení URL nahraných souborů (včetně JSON) pro úklid po testu
        if (response.data?.file) {
            uploadedFileUrls.push(response.data.file.url);
            if (response.data.file.visual) uploadedFileUrls.push(response.data.file.visual);
            if (response.data.file.preview) uploadedFileUrls.push(response.data.file.preview);
            // Přidej i JSON soubor (stejná cesta jako .lrc, ale s .json)
            if (response.data.file.url && typeof response.data.file.url === "string") {
                const jsonUrl = response.data.file.url.replace(/\.lrc($|\?)/, ".json$1");
                uploadedFileUrls.push(jsonUrl);
            }
        }

        expect(response.success).toBe(true);
        expect(response.code).toBe(200);
        expect(response.message).toContain("File 'klokani_01.lrc' uploaded successfully to folder '/access/restricted_to_guest/accessible'.");

        expect(response.data?.file).toBeDefined();
        expect(response.data?.file.preview).toBe(false);
        expect(response.data?.file.visual).toBe(false);

    });


    it("should upload a real .lrc file from the public folder", async () => {

        // Vytvoření klienta a přihlášení
        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("guest", "querty").execute();

        // Načtení .lrc souboru z public složky
        const lrcPath = path.join(PUBLIC_DIR, "klokani_01.lrc");
        const lrcBuffer = readFileSync(lrcPath);
        const lrcOriginalName = path.basename(lrcPath);
        const lrcFile = new File([lrcBuffer], lrcOriginalName, { type: "application/octet-stream" });

        // Načtení PNG obrázku kitten.png z public složky
        const pngPath = path.join(PUBLIC_DIR, "kitten.png");
        const pngBuffer = readFileSync(pngPath);
        const pngOriginalName = path.basename(pngPath);
        const pngFile = new File([pngBuffer], pngOriginalName, { type: "image/png" });

        // Popisky a stringy, které se předají do souboru
        const name = "Testovací LRC soubor";
        const description = "Toto je testovací LRC soubor s vizuálem a preview.";
        const tags = ["test", "lrc", "upload"];

        // Vytvoření requestu pro upload .lrc souboru s vizuálem a preview
        const request = client.routes.post.uploadFile("access/restricted_to_guest/accessible", lrcFile);
        request
            .setVisual(pngFile)
            .setPreview(pngFile)
            .setLabel(name)
            .setDescription(description)
            .setTags(tags);

        // Odeslání requestu a získání odpovědi
        const response = await request.execute();

        // Uložení URL nahraných souborů (včetně JSON) pro úklid po testu
        if (response.data?.file) {
            uploadedFileUrls.push(response.data.file.url);
            if (response.data.file.visual) uploadedFileUrls.push(response.data.file.visual);
            if (response.data.file.preview) uploadedFileUrls.push(response.data.file.preview);
            // Přidej i JSON soubor (stejná cesta jako .lrc, ale s .json)
            if (response.data.file.url && typeof response.data.file.url === "string") {
                const jsonUrl = response.data.file.url.replace(/\.lrc($|\?)/, ".json$1");
                uploadedFileUrls.push(jsonUrl);
            }
        }

        // Ověření úspěšnosti uploadu a správné cesty
        expect(response.success).toBe(true);
        expect(response.data?.file).toBeDefined();
        expect(response.data?.file.path).toContain("access/restricted_to_guest/accessible");

        // Integrita odpověďi
        testFileInfo(response.data?.file);

        // Uvěření, že bylo správně zaznamenáno, kdo soubor nahrál
        expect(response.data?.file.uploadedby).toBeDefined();
        expect(response.data?.file.uploadedby).toStrictEqual({
            login: "guest",
            name: "Host",
            description: "Veřejný uživatel s omezeným přístupem.",
            institution: "Veřejnost"
        });

        // Ověření, zda soubor obsahuje patřičné stringy
        expect(response.data?.file.label).toBe(name);
        expect(response.data?.file.description).toBe(description);
        expect(response.data?.file.tags).toEqual(expect.arrayContaining(tags));

    });

    it("the uploaded file should be present in get request on the folder", async () => {


        const client = new ApiClient("http://localhost:8080");
        await client.connect();
        await client.routes.post.login("guest", "querty").execute();

        const lrc = loadPublicFile("klokani_01.lrc", "application/octet-stream");

        const path = "access/restricted_to_guest/accessible";

        const request = client.routes.post.uploadFile(path, lrc);
        const response = await request.execute();

        // Uložení URL nahraných souborů (včetně JSON) pro úklid po testu
        if (response.data?.file) {
            uploadedFileUrls.push(response.data.file.url);
            if (response.data.file.visual) uploadedFileUrls.push(response.data.file.visual);
            if (response.data.file.preview) uploadedFileUrls.push(response.data.file.preview);
            // Přidej i JSON soubor (stejná cesta jako .lrc, ale s .json)
            if (response.data.file.url && typeof response.data.file.url === "string") {
                const jsonUrl = response.data.file.url.replace(/\.lrc($|\?)/, ".json$1");
                uploadedFileUrls.push(jsonUrl);
            }
        }

        expect(response.success).toBe(true);

        testFileInfo(response.data?.file);

        const info = client.routes.get.files(path);
        const getResponse = await info.execute();

        expect(getResponse.success).toBe(true);

        expect(getResponse.data).toBeDefined();
        expect(getResponse.data!.files).toBeDefined();

        let found = false;
        for (const file of getResponse.data!.files) {
            if (file.url === response.data!.file.url) {
                found = true;
                testFileInfo(file);
                expect(file.label).toBe(response.data!.file.label);
                expect(file.description).toBe(response.data!.file.description);
                expect(file.tags).toEqual(expect.arrayContaining(response.data!.file.tags));
            }
        }

        expect(found).toBe(true);

    });


});
