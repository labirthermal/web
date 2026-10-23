import { describe, expect, test } from "vitest";
import { THERMOGRAM_PATHS } from "../../../../devserver/node/mocks";
import { ThermalManager } from "../../../hierarchy/ThermalManager";
import { ThermalFileReader } from "../../../loading/workers/ThermalFileReader";

global.document = window.document;

describe( "Analysis Sync", () => {

    test.skip( "Synchronisation of analysis", async () => {

        // Init fake timer in this test
        // vi.useFakeTimers();

        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry( "test" );
        const group = registry.groups.addOrGetGroup( "test" );

        const request = await Promise.all([
            await registry.service.loadFile( THERMOGRAM_PATHS.SOUSTRUH ) as ThermalFileReader,
            await registry.service.loadFile( THERMOGRAM_PATHS.TUCNACI ) as ThermalFileReader
        ]);




        const instances = await Promise.all(request.map(async (item) => {
            const element = document.createElement("div");
            const instance = await item.createInstance(group);
            instance.mountToDom(element);
            instance.dom?.hydrate();
            return instance;
        }));

        expect(request.length).toEqual(2);
        expect(instances.length).toEqual(2);
        expect(group.files.value.length).toEqual(2);

        // Analysis Sync should be off by default
        expect(group.analysisSync.value).toEqual(false);

        group.analysisSync.turnOn(instances[0]);

        // Now it should be on
        expect(group.analysisSync.value).toEqual(true);
        expect(group.analysisSync.currentPointer).toEqual(instances[0]);

        group.analysisSync.recieveSlotSerialized("Analýza A;rectangle;color:red;top:40;left:40;width:100;height:100;avg", 1);

        console.log( instances[0].slots.getSlot(1) );

        expect( instances[0].analysis.value.length ).toEqual(1);
        expect( instances[1].analysis.value.length ).toEqual(1);
        expect( instances[0].slots.getSlot(1)?.serialized ).toBeUndefined();








        /*


        const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        describe("Analysis Sync", () => {

            test("Synchronisation of analysis", async () => {

                // Init fake timer in this test
                vi.useFakeTimers();

                const manager = new ThermalManager;
                const registry = manager.addOrGetRegistry("test");
                const group = registry.groups.addOrGetGroup("test");

                const request = await Promise.all([
                    await registry.service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader,
                    await registry.service.loadFile(THERMOGRAM_PATHS.TUCNACI) as ThermalFileReader
                ]);

                const instances = await Promise.all(request.map(async (item) => {
                    const element = document.createElement("div");
                    const instance = await item.createInstance(group);
                    instance.mountToDom(element);
                    return instance;
                }));

                expect(request.length).toEqual(2);
                expect(instances.length).toEqual(2);
                expect(group.files.value.length).toEqual(2);

                // Analysis Sync should be off by default
                expect(group.analysisSync.value).toEqual(false);

                group.analysisSync.turnOn(instances[0]);

                // Now it should be on
                expect(group.analysisSync.value).toEqual(true);
                expect(group.analysisSync.currentPointer).toEqual(instances[0]);

                group.analysisSync.recieveSlotSerialized("Analýza A;rectangle;color:red;top:40;left:40;width:100;height:100;avg", 1);

                console.log( instances[0].slots.getSlot(1) );

                expect( instances[0].analysis.value.length ).toEqual(1);
                expect( instances[1].analysis.value.length ).toEqual(1);
                expect( instances[0].slots.getSlot(1)?.serialized ).toBeUndefined();

                /*
                instances.forEach(instance => {
                    console.log(instance.slots.getSlot(1));
                });

                expect(instances[0].analysis.value.length).toEqual(1);

                sleep(10);
                vi.advanceTimersToNextTimer();

                expect(
                    instances[0].slots.value
                ).toEqual(false);
                
            });
            */

            



    } );


    test("Turning off analysis sync", async () => {
        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry("test");
        const group = registry.groups.addOrGetGroup("test");

        const request = await Promise.all([
            await registry.service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader,
            await registry.service.loadFile(THERMOGRAM_PATHS.TUCNACI) as ThermalFileReader
        ]);

        const instances = await Promise.all(request.map(async (item) => {
            const element = document.createElement("div");
            const instance = await item.createInstance(group);
            instance.mountToDom(element);
            return instance;
        }));

        group.analysisSync.turnOn(instances[0]);
        expect(group.analysisSync.value).toEqual(true);

        group.analysisSync.turnOff();
        expect(group.analysisSync.value).toEqual(false);
    });

    test("Switching analysis sync pointer", async () => {
        const manager = new ThermalManager;
        const registry = manager.addOrGetRegistry("test");
        const group = registry.groups.addOrGetGroup("test");

        const request = await Promise.all([
            await registry.service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader,
            await registry.service.loadFile(THERMOGRAM_PATHS.TUCNACI) as ThermalFileReader
        ]);

        const instances = await Promise.all(request.map(async (item) => {
            const element = document.createElement("div");
            const instance = await item.createInstance(group);
            instance.mountToDom(element);
            return instance;
        }));

        group.analysisSync.turnOn(instances[0]);
        expect(group.analysisSync.currentPointer).toEqual(instances[0]);

        // group.analysisSync.switchPointer(instances[1]);
        // expect(group.analysisSync.currentPointer).toEqual(instances[1]);
    });

});

