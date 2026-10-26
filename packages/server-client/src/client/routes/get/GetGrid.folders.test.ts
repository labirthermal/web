import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";
import { GridGrouping } from "./GetGrid";
import { testGrid } from "../../utils/testGrid";



describe("GetGrid - filtering by folders & consistency", () => {

    test("different grouping should allways return the same counts on one given folder", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const requestGrid = async (by: GridGrouping) => {

            const request = client.routes.get.grid( "manetin" );

            request.setBy(by);

            const result = await request.execute();

            expect(result.success).toBe(true);

            testGrid(result.data);

            expect(result.data?.count.displayed).toEqual(76);
            expect(result.data?.count.omitted).toEqual(0);
            expect(result.data?.count.total).toEqual(76);

            return result;

        }

        const hour = await requestGrid(GridGrouping.HOUR);
        expect(Object.keys(hour.data!.groups).length).toBe(24);

        const day = await requestGrid(GridGrouping.DAY);
        expect(Object.keys(day.data!.groups).length).toBe(15);

        const week = await requestGrid(GridGrouping.WEEK);
        expect(Object.keys(week.data!.groups).length).toBe(10);

        const month = await requestGrid(GridGrouping.MONTH);
        expect(Object.keys(month.data!.groups).length).toBe(4);

        const year = await requestGrid(GridGrouping.YEAR);
        expect(Object.keys(year.data!.groups).length).toBe(1);

    });


    test("grid should respect specifying folders", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.grid( "manetin" );

        request
            .addFolder("les")
            .addFolder("naves");

        const result = await request.execute();

        expect(result.success).toBe(true);

        testGrid(result.data);

        expect(result.data?.header).toHaveProperty("les");
        expect(result.data?.header).toHaveProperty("naves");
        expect(result.data?.header).not.toHaveProperty("optherm");

        expect(result.data?.all_subdirectories).toHaveProperty("les");
        expect(result.data?.all_subdirectories).toHaveProperty("naves");
        expect(result.data?.all_subdirectories).toHaveProperty("optherm");

    });

    test("grid with only one file", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.grid( "specials" );

        const result = await request.execute();

        expect(result.success).toBe(true);

        testGrid(result.data);

        expect(result.data?.count.displayed).toEqual(1);
        expect(result.data?.count.omitted).toEqual(0);
        expect(result.data?.count.total).toEqual(1);

        expect(result.data?.groups).toHaveProperty("1743163200000");

        expect(Object.keys(result.data!.groups).length).toBe(1);

    });

    test("grid with no subdirectories", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const request = client.routes.get.grid( "specials/user" );
        request
            .setBy(GridGrouping.DAY);

        const result = await request.execute();

        console.log( result );

        expect(result.success).toBe(false);

    });


});