import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";
import type { TreeItem } from "../../responseEntities";


type CorrectTreeItem = {
    name: string;
    children?: CorrectTreeItem[];
}

type CorrectTreeStructure = CorrectTreeItem[];

// Pomocná rekurzivní funkce pro kontrolu složek ve stromu
function checkFoldersInTree(expected: CorrectTreeStructure, tree: TreeItem[]) {
    expected.forEach(expectedFolder => {
        const found = tree.find(child => child.slug === expectedFolder.name);
        expect(found).toBeDefined();
        if (expectedFolder.children && expectedFolder.children.length > 0 && found) {
            checkFoldersInTree(expectedFolder.children, found.subfolders || []);
        }
    });
}


describe("GetCurrentUserTree", () => {


    test("should fail when not logged in", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        expect(client.auth.isLoggedIn()).toBe(false);

        const request = client.routes.get.currentUserTree();

        const result = await request.execute();

        expect(result.success).toBe(false);
        expect(result.code).toBe(401);

    });

    test("Should be accessible to guest", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        expect(client.auth.isLoggedIn()).toBe(true);

        const request = client.routes.get.currentUserTree();
        const result = await request.execute();

        expect(result.data).toHaveProperty("tree");

    });


    test("Should be accessible to root", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        expect(client.auth.isLoggedIn()).toBe(true);

        const request = client.routes.get.currentUserTree();
        const result = await request.execute();

        expect(result.data).toHaveProperty("tree");

    });

    test( "guest tree contains only /access/restricted_to_guest and their subtrees", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();


        const request = client.routes.get.currentUserTree();
        const result = await request.execute();

        const expectedFolders: CorrectTreeStructure = [
            {
                name: "restricted_to_guest",
                children: [
                    { name: "accessible", children: [] },
                    { name: "nazev-nove-slozky", children: [] },
                    { name: "restricted", children: [] }
                ]
            }
        ];

        checkFoldersInTree(expectedFolders, result.data!.tree );

    } );


    test( "root tree contains only everything", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();


        const request = client.routes.get.currentUserTree();
        const result = await request.execute();

        const expectedFolders: CorrectTreeStructure = [
            {
                name: "",
                children: [
                    {
                        name: "access",
                        children: [
                            {
                                name: "accessible",
                                children: [
                                    { name: "accessible", children: [] },
                                    { name: "restricted", children: [] }
                                ]
                            },
                            {
                                name: "restricted",
                                children: [
                                    { name: "accessible", children: [] },
                                    { name: "restricted", children: [] }
                                ]
                            },
                            {
                                name: "restricted_to_guest",
                                children: [
                                    { name: "accessible", children: [] },
                                    { name: "nazev-nove-slozky", children: [] },
                                    { name: "restricted", children: [] }
                                ]
                            }
                        ]
                    },
                    { name: "another-folder", children: [] },
                    {
                        name: "manetin", children: [
                            { name: "les", children: [] },
                            { name: "naves", children: [] },
                            { name: "optherm", children: [] }
                        ]
                    },
                    { name: "some_folder", children: [] },
                    {
                        name: "specials", children: [
                            { name: "restricted", children: [] },
                            { name: "user", children: [] }
                        ]
                    },
                    { name: "zihle", children: [] }
                ]
            }
        ];

        checkFoldersInTree(expectedFolders, result.data!.tree );

    } );



});