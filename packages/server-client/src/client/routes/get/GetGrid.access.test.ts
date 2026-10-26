import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";
import { GridGrouping } from "./GetGrid";
import { testGrid } from "../../utils/testGrid";

describe("GetGrid - access", () => {

    test("should not read protected folders", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.get.grid("access/restricted");

        request
            .setBy(GridGrouping.DAY);

        const result = await request.execute();

        expect(result.success).toBe(false);

    });

    test("should read grid data from public folders", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.get.grid( "manetin" );

        request
            .setBy(GridGrouping.DAY);

        const result = await request.execute();

        expect(result.success).toBe(true);

        testGrid(result.data);

        expect(result.data?.count.displayed).toEqual(76);
        expect(result.data?.count.omitted).toEqual(0);
        expect(result.data?.count.total).toEqual(76);

    });

    test("grid of a nested restricted folder needs to be restricted", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.grid("access/restricted/accessible");

        const result = await request.execute();

        expect(result.success).toBe(false);
        expect(result.code).toBe(401);

    });

    test("grid should not expose subfolders hidden to the current user - either in header, nor in all_subdirectories", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.grid("access/accessible");

        const result = await request.execute();

        expect(result.success).toBe(true);

        testGrid(result.data);

        expect(Object.keys(result.data!.header).length).toBe(1);

        expect(Object.keys(result.data!.all_subdirectories).length).toBe(1);

    });

    test("grid should expose hidden folders to a user with access", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "root",
            "abcdefghijk"
        );
        await login.execute();

        const request = client.routes.get.grid("access/restricted");

        const result = await request.execute();

        expect(result.success).toBe(true);

        testGrid(result.data);

        expect(Object.keys(result.data!.header).length).toBe(2);

        expect(Object.keys(result.data!.all_subdirectories).length).toBe(2);

    });

    test("grid that is accessible to root only should never be accessible by guest", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const login = client.routes.post.login(
            "guest",
            "querty"
        );
        await login.execute();

        const request = client.routes.get.grid("access/restricted");

        const result = await request.execute();

        expect(result.success).toBe(false);
        expect(result.code).toBe(403);


    });


});