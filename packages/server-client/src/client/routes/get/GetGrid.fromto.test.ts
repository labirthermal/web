import { describe, expect, test } from "vitest";
import { ApiClient } from "../../ApiClient";
import { GridGrouping } from "./GetGrid";
import { testGrid } from "../../utils/testGrid";



describe("GetGrid - filtering by time", () => {

    test("results are limited only to the given time range", async () => {

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const from = Date.UTC(2025, 0, 11, 10, 0, 7);
        const to = Date.UTC(2025, 9, 31, 23, 59, 59);

        const request = client.routes.get.grid( "zihle" );
        request
            .setFrom(from)
            .setTo(to);

        const result = await request.execute();

        expect(result.success).toBe(true);


        expect(result.data?.time.selection.from).toBeGreaterThanOrEqual(from);
        expect(result.data?.time.selection.to).toBeLessThanOrEqual(to);


        Object.values(result.data!.groups).forEach(group => {

            Object.values(group.folders).forEach(folder => {

                if (Array.isArray(folder)) {

                    folder.forEach(file => {
                        expect(file.timestamp).toBeGreaterThanOrEqual(from);
                        expect(file.timestamp).toBeLessThanOrEqual(to);
                    });

                }

            });

        });



        // Zjisti mi nejdřívější čas v souboru
        const min = Object.values(result.data!.groups).reduce((min, group) => {
            return Object.values(group.folders).reduce((min, folder) => {
                if (Array.isArray(folder)) {
                    const folderMin = Math.min(...folder.map(file => file.timestamp));
                    return Math.min(min, folderMin);
                }
                return min;
            }, min);
        }, Infinity);

        // Zjisti mi nejpozdější čas v souboru
        const max = Object.values(result.data!.groups).reduce((max, group) => {
            return Object.values(group.folders).reduce((max, folder) => {
                if (Array.isArray(folder)) {
                    const folderMax = Math.max(...folder.map(file => file.timestamp));
                    return Math.max(max, folderMax);
                }
                return max;
            }, max);
        }, -Infinity);

        // Ověř, že min a max jsou v rozsahu from a to
        expect(result.data!.time.files.from).toEqual(min);
        expect(result.data!.time.files.to).toEqual(max);


    });



    test("grid is able to switch ftom & to in case from is larger than to", async () => {
        const from = Date.UTC(2026, 0, 1, 0, 0, 0);
        const to = Date.UTC(2024, 0, 1, 0, 0, 0);

        const client = new ApiClient("http://localhost:8080");
        await client.connect();

        const request = client.routes.get.grid("zihle");
        request
            .setFrom(from)
            .setTo(to);

        const response = await request.execute();


        expect(response.success).toBe(true);
        expect(response.data!.count.displayed).toBe(115);

    });


    test("grouping along with time filters do not have impact on number of files loaded", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

        const from = Date.UTC(2025, 0, 1, 0, 0, 0);
        const to = Date.UTC(2025, 12, 31, 23, 59, 59);

        const requestGrid = async (
            by: GridGrouping
        ) => {

            const request = client.routes.get.grid( "zihle" );
            request
                .setBy(by)
                .setFrom(from)
                .setTo(to);

            return await request.execute();

        }

        const hour = await requestGrid(GridGrouping.HOUR);
        const day = await requestGrid(GridGrouping.DAY);
        const week = await requestGrid(GridGrouping.WEEK);
        const month = await requestGrid(GridGrouping.MONTH);
        const year = await requestGrid(GridGrouping.YEAR);

        const countsDisplayed = [
            hour.data?.count.displayed,
            day.data?.count.displayed,
            week.data?.count.displayed,
            month.data?.count.displayed,
            year.data?.count.displayed
        ];

        countsDisplayed.forEach(count => {
            expect(count).toBe(countsDisplayed[0]);
        } );

        const countsOmitted = [
            hour.data?.count.omitted,
            day.data?.count.omitted,
            week.data?.count.omitted,
            month.data?.count.omitted,
            year.data?.count.omitted
        ];

        countsOmitted.forEach(count => {
            expect(count).toBe(countsOmitted[0]);
        } );


    });


    test( "grouping does not affect number of returned files in requests with time & tags filters", async () => {

        const client = new ApiClient("http://localhost:8080");

        await client.connect();

         const from = Date.UTC(2025, 0, 1, 0, 0, 0);
        const to = Date.UTC(2025, 12, 31, 23, 59, 59);
        const tags = ["something"];

        const requestGrid = async (
            by: GridGrouping
        ) => {

            const request = client.routes.get.grid("zihle");
            request
                .setBy(by)
                .setFrom(from)
                .setTo(to)
                .setTags( tags );

            return await request.execute();

        };

        const hour = await requestGrid(GridGrouping.HOUR);
        const day = await requestGrid(GridGrouping.DAY);
        const week = await requestGrid(GridGrouping.WEEK);
        const month = await requestGrid(GridGrouping.MONTH);
        const year = await requestGrid(GridGrouping.YEAR);

        const countsDisplayed = [
            hour.data?.count.displayed,
            day.data?.count.displayed,
            week.data?.count.displayed,
            month.data?.count.displayed,
            year.data?.count.displayed
        ];

        countsDisplayed.forEach(count => {
            expect(count).toBe(countsDisplayed[0]);
        } );

        const countsOmitted = [
            hour.data?.count.omitted,
            day.data?.count.omitted,
            week.data?.count.omitted,
            month.data?.count.omitted,
            year.data?.count.omitted
        ];

        countsOmitted.forEach(count => {
            expect(count).toBe(countsOmitted[0]);
        } );

    } );


});