import { describe, expect, test, vi } from 'vitest';
import { THERMOGRAM_PATHS } from '../../../../devserver/node/mocks';
import { loadFileForTests } from '../../../../devserver/node/scaffold';
import { AnalysisSlot } from './AnalysisSlot';
import { AnalysisSlotsState } from './AnalysisSlotsDrive';

describe("AnalysisSlotsDrive", () => {

    test("assignment", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        // No slots at first
        expect(instance.slots.hasSlot(1)).toEqual(false);


        // Create the first analysis
        const analysis = instance.analysis.layers.placeRectAt("Test", 10, 10, 100, 100, "green");

        expect(analysis).not.toBeUndefined();

        // Assign it to an empty slot
        instance.slots.assignAnalysisToSlot(1, analysis);
        expect(instance.slots.hasSlot(1)).toEqual(true);

        // Clear an occupied slot
        instance.slots.removeSlotAndAnalysis(1);
        expect(instance.slots.hasSlot(1)).toEqual(false);
        expect(instance.analysis.value.length).toEqual(0);

        // Create two new instances
        const analysis2 = instance.analysis.layers.placeEllipsisAt("test sth", 0, 0, 100, 100);
        const analysis3 = instance.analysis.layers.placeRectAt("sth test", 15, 13, 100, 100);

        // Assign a slot
        instance.slots.assignAnalysisToSlot(2, analysis2);
        expect(instance.slots.hasSlot(2)).toEqual(true);
        expect(instance.slots.getSlot(2)?.analysis.name).toEqual(analysis2.name);

        // Replace that slot
        instance.slots.assignAnalysisToSlot(2, analysis3);
        // The name should correspond
        expect(instance.slots.getSlot(2)?.analysis.name).toEqual(analysis3.name);
        // The old analysis should be removed
        expect(instance.analysis.value.length).toEqual(1);
        expect(instance.analysis.value[0].name).toEqual(analysis3.name);


    });

    test("area analysis serialisation counter", async () => {

        // Init fake timer in this test
        vi.useFakeTimers();

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placeRectAt("Testovací analýza", 10, 10, 100, 100);

        const slot = instance.slots.assignAnalysisToSlot(1, analysis);

        // Check if the analysis is assigned properly
        expect(instance.analysis.value.length).toEqual(1);
        expect(instance.slots.hasSlot(1)).toEqual(true);

        // The slot needs to have initial serialized value
        expect(slot.serialized).not.toBeUndefined();
        expect(slot.serialized).toEqual("Testovací analýza;rectangle;color:Blue;top:10;left:10;width:90;height:90");

        // Serialisation counter
        let counter = 0;
        slot.onSerialize.set("test", () => {
            counter = counter + 1;
        });

        expect(counter).toEqual(0);



        // Setters called with the same value should not trigger serialisation



        // Setting a different top should serialize once
        slot.analysis.setTop(30);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(1);

        // Setting the same top should not serialize at all
        slot.analysis.setTop(30);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(1);

        // Setting a different left should serialize once
        slot.analysis.setLeft(30);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(2);

        // Setting the same left should not serialize at all
        slot.analysis.setLeft(30);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(2);

        // Setting a different right should serialize once
        slot.analysis.setRight(75);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(3);

        // Setting the different right should not serialize at all
        slot.analysis.setRight(75)
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(3);

        // Setting a different bottom should serializa once
        slot.analysis.setBottom(75);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(4);

        // Setting the same bottom should not serialize at all
        slot.analysis.setBottom(75);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(4);

        // Setting a different height should serialize once
        slot.analysis.setHeight(13);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(5);

        // Setting the same height should not serialize at all
        slot.analysis.setHeight(13);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(5);

        // Setting a different width should serialize once
        slot.analysis.setWidth(14);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(6);

        // Setting the same width should serialize once
        slot.analysis.setWidth(14);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(6);


        // Repeated sets of the same value should not trigger more then once

        // Repeated setting of top
        slot.analysis.setTop(1);
        slot.analysis.setTop(2);
        slot.analysis.setTop(3);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(7);

        // Repeated setting of left
        slot.analysis.setLeft(1);
        slot.analysis.setLeft(2);
        slot.analysis.setLeft(3);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(8);

        // Repeated setting of right
        slot.analysis.setRight(10);
        slot.analysis.setRight(20);
        slot.analysis.setRight(30);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(9);

        // Repeated setting of bottom
        slot.analysis.setBottom(10);
        slot.analysis.setBottom(20);
        slot.analysis.setBottom(30);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(10);

        // Releated setting of width
        slot.analysis.setWidth(20);
        slot.analysis.setWidth(30);
        slot.analysis.setWidth(40);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(11);

        // Repeated setting of height
        slot.analysis.setHeight(10);
        slot.analysis.setHeight(20);
        slot.analysis.setHeight(30);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(12);




        // Setting name should trigger serialisation
        slot.analysis.setName("Testing A");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(13);

        // The same name again should not trigger change at all
        slot.analysis.setName("Testing A");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(13);




        // Setting initial color should trigger serialisation
        slot.analysis.setInitialColor("black");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(14);

        // The same color should not trigger serialisation at all
        slot.analysis.setInitialColor("black");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(14);



        // Setting the current color should not trigger serialisation at all
        slot.analysis.setColor("pink");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(14);



        // Setting avg should trigger serialisation once
        slot.analysis.graph.setAvgActivation(true);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(15);

        // Setting the same avg should not triger serialisation at all
        slot.analysis.graph.setAvgActivation(true);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(15);

        // Setting the avg back should trigger serialisation once
        slot.analysis.graph.setAvgActivation(false);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(16);



        // Setting min should trigger serialisation once
        slot.analysis.graph.setMinActivation(true);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(17);

        // Setting the same min should not triger serialisation at all
        slot.analysis.graph.setMinActivation(true);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(17);

        // Setting the min back should trigger serialisation once
        slot.analysis.graph.setMinActivation(false);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(18);



        // Setting max should trigger serialisation once
        slot.analysis.graph.setMaxActivation(true);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(19);

        // Setting the same max should not triger serialisation at all
        slot.analysis.graph.setMaxActivation(true);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(19);

        // Setting the max back should trigger serialisation once
        slot.analysis.graph.setMaxActivation(false);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(20);


        // Multiple state changes should trigger serialisation only once
        slot.analysis.graph.setAvgActivation(true);
        slot.analysis.graph.setMinActivation(true);
        slot.analysis.graph.setMaxActivation(true);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(21);



        // Multiple setters at once


        slot.analysis.setWidth(15);
        slot.analysis.setHeight(17);
        slot.analysis.setTop(10);
        slot.analysis.setLeft(10);
        slot.analysis.setRight(100);
        slot.analysis.setBottom(100);
        slot.analysis.setName("Prdíky");
        slot.analysis.setInitialColor("white");
        slot.analysis.graph.setAvgActivation(false);
        slot.analysis.graph.setMinActivation(false);
        slot.analysis.graph.setMaxActivation(false);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(22);


    });

    test("point analysis serialisation counter", async () => {

        // Init fake timer in this test
        vi.useFakeTimers();

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placePointAt("something", 10, 10, "olive");

        const slot = instance.slots.assignAnalysisToSlot(1, analysis);

        // Check initial properties
        expect(slot.analysis.left).toEqual(10);
        expect(slot.analysis.top).toEqual(10);
        expect(slot.analysis.right).toEqual(10);
        expect(slot.analysis.bottom).toEqual(10);
        expect(slot.analysis.width).toEqual(0);
        expect(slot.analysis.height).toEqual(0);

        // Serialisation counter
        let counter = 0;
        slot.onSerialize.set("test", () => {
            counter = counter + 1;
        });
        expect(counter).toEqual(0);

        // Set a different top
        slot.analysis.setTop(17);
        vi.advanceTimersByTime(1);
        expect(slot.analysis.top).toEqual(17);
        expect(counter).toEqual(1);

        // The same top should not serialize at all
        slot.analysis.setTop(17);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(1);

        // Set a different left
        slot.analysis.setLeft(15);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(2);

        // The same left should not serialize at all
        slot.analysis.setLeft(15);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(2);


        // Set a different right
        slot.analysis.setRight(100);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(3);

        // The same right should not serialize at all
        slot.analysis.setRight(100);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(3);

        // Set a different bottom
        slot.analysis.setBottom(88);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(4);

        // The same bottom should not serialize at all
        slot.analysis.setBottom(88);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(4);

        // Setting width and height should not serialize at all
        slot.analysis.setHeight(100);
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(4);

    });

    test("area analysis serialisation recieving", async () => {

        // Init fake timer in this test
        vi.useFakeTimers();

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placeEllipsisAt("something", 10, 10, 100, 100, "olive");

        const slot = instance.slots.assignAnalysisToSlot(1, analysis);

        // Check initial properties
        expect(analysis.left).toEqual(10);
        expect(analysis.top).toEqual(10);
        expect(analysis.right).toEqual(100);
        expect(analysis.bottom).toEqual(100);
        expect(analysis.width).toEqual(90);
        expect(analysis.height).toEqual(90);


        // Check initial serialized
        expect(slot.serialized).toEqual("something;ellipsis;color:olive;top:10;left:10;width:90;height:90");

        // Serialisation counter
        let counter = 0;
        slot.onSerialize.set("test", () => {
            counter = counter + 1;
        });
        expect(counter).toEqual(0);


        // Recieve serialisation that is OK
        slot.recieveSerialized("something else;ellipsis;color:pink;top:20;left:23;width:70;height:15");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(1);

        // Revieve serialisation that should correct itself
        slot.recieveSerialized("something else;ellipsis;color:pink;top:20;left:23;width:70;height:15;avg;něco");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(3);

        // Check if values were applied correctly
        expect(slot.analysis.top).toEqual(20);
        expect(slot.analysis.left).toEqual(23);
        expect(slot.analysis.width).toEqual(70);
        expect(slot.analysis.height).toEqual(15);
        expect(slot.analysis.graph.state.AVG).toEqual(true);


    });

    test("point analysis serialisation recieving", async () => {

        // Init fake timer in this test
        vi.useFakeTimers();

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const analysis = instance.analysis.layers.placePointAt("something", 10, 10, "olive");

        const slot = instance.slots.assignAnalysisToSlot(1, analysis);

        // Check initial properties
        expect(analysis.left).toEqual(10);
        expect(analysis.top).toEqual(10);
        expect(analysis.right).toEqual(10);
        expect(analysis.bottom).toEqual(10);
        expect(analysis.width).toEqual(0);
        expect(analysis.height).toEqual(0);


        // Check initial serialized
        expect(slot.serialized).toEqual("something;point;top:10;left:10;color:olive");

        // Serialisation counter
        let counter = 0;
        slot.onSerialize.set("test", () => {
            counter = counter + 1;
        });
        expect(counter).toEqual(0);

        // Recieve serialisation that is OK
        slot.recieveSerialized("something else;point;top:15;left:17;color:brown;avg");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(1);

        // Check if values were applied correctly
        expect(slot.analysis.top).toEqual(15);
        expect(slot.analysis.left).toEqual(17);
        expect(slot.analysis.right).toEqual(17);
        expect(slot.analysis.bottom).toEqual(15);
        expect(slot.analysis.width).toEqual(0);
        expect(slot.analysis.height).toEqual(0);
        expect(slot.analysis.graph.state.AVG).toEqual(true);

        // A repeated change
        slot.recieveSerialized("something else matters;point;top:15;left:17;color:brown");
        vi.advanceTimersByTime(1);
        expect(counter).toEqual(2);
        expect(slot.analysis.graph.state.AVG).toEqual(false);
        expect(slot.analysis.initialColor).toEqual("brown");


    });

    test("creating analysis to slots", async () => {

        // Init fake timer in this test
        vi.useFakeTimers();

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        // Listen to slot driver values
        let slotValueCounter = 0;
        instance.slots.addListener("test - listening to global changes", () => {
            slotValueCounter++;
        });

        // Initial value shall be zero
        expect(slotValueCounter).toEqual(0);

        // An analysis is created without slot
        instance.analysis.layers.placePointAt("something", 10, 10, "olive");
        expect(slotValueCounter).toEqual(0);

        // An analysis is created with an implicite slot
        instance.analysis.layers.placePointAt("something", 10, 10, "olive", true);
        expect(slotValueCounter).toEqual(1);
        expect(instance.slots.hasSlot(1)).toEqual(true);
        expect(instance.slots.hasSlot(2)).toEqual(false);

        // Remove the analysis
        instance.analysis.layers.removeAnalysis("something");
        expect(instance.slots.hasSlot(1)).toEqual(false);
        expect(instance.slots.hasSlot(2)).toEqual(false);
        expect(instance.analysis.value.length).toEqual(0);
        expect(instance.slots.value.size).toEqual(0);

        // Add two new analysis
        instance.analysis.layers.placeEllipsisAt("elipsa", 10, 10, 100, 100, "red", true);
        instance.analysis.layers.placeEllipsisAt("elipsa druhá", 10, 10, 100, 100, "red", true);

        expect(instance.analysis.layers.size).toEqual(2);
        expect(instance.analysis.value.length).toEqual(2);
        expect(instance.slots.value.size).toEqual(2);
        expect(instance.slots.hasSlot(1)).toEqual(true);
        expect(instance.slots.hasSlot(2)).toEqual(true);
        expect(instance.slots.hasSlot(3)).toEqual(false);

        // Add one more analysis
        const analysis4 = instance.analysis.layers.placePointAt("nějaký bodík", 10, 10, "pink", true);
        expect(instance.slots.hasSlot(3)).toEqual(true);

        // Remove the first slot
        instance.slots.removeSlotAndAnalysis(1);
        expect(instance.slots.hasSlot(1)).toEqual(false);
        expect(instance.analysis.value.length).toEqual(2);

        // Add again an analysis to the first slot
        instance.analysis.layers.placeEllipsisAt("buchty", 10, 10, 100, 100, "red", true);
        expect(instance.slots.hasSlot(1)).toEqual(true);
        expect(instance.analysis.value.length).toEqual(3);

        // Remove the second slot
        instance.slots.removeSlotAndAnalysis(2);
        expect(instance.slots.hasSlot(2)).toEqual(false);
        expect(instance.analysis.value.length).toEqual(2);
        expect(instance.slots.value.size).toEqual(2);

        // Remove a slot without the analysis
        instance.slots.unassignAnalysisFromItsSlot(analysis4);
        expect(instance.slots.value.size).toEqual(1);
        expect(instance.analysis.value.length).toEqual(2);

        for (let i = 1; i < 10; i++) {
            instance.analysis.layers.placeRectAt(`A__ ${i}`, 10, 10, 100, 100, undefined, true);
        }

        expect(instance.slots.value.size).toEqual(7);
        expect(instance.analysis.value.length).toEqual(11);

    });


    test("individual assignement listeners", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const layers = instance.analysis.layers;
        const slots = instance.slots;


        const testSlot = (
            number: number,
            assignementManager: AnalysisSlotsState["onSlot1Assignement"],
            serialisationManager: AnalysisSlotsState["onSlot1Serialize"]
        ) => {

            let assignedSlot: AnalysisSlot | undefined = undefined;
            let assignedSerialized: string | undefined = undefined;

            // Add assignement listener
            assignementManager.set("testing", value => assignedSlot = value);

            // Add serialisation listener
            serialisationManager.set("testing assignemenr", value => assignedSerialized = value);


            // The slot shall be empty
            expect(slots.hasSlot(number)).toEqual(false);

            // Declare names
            const firstName = `Test analysis ${number} original`;
            const secondName = `Test analysis ${number} replacement`;
            const thirdName = `Test analysis ${number} out of range`;

            // Create the first analysis
            layers.placeEllipsisAt(firstName, 10, 10, 100, 100, "orange", number);

            // Now all values shall be assigned
            expect(assignedSlot).not.toBeUndefined();
            expect(assignedSerialized).not.toBeUndefined();

            // Now the analysis should be stored everywhere
            expect(slots.hasSlot(number)).toEqual(true);
            expect(layers.has(firstName)).toEqual(true);

            // Check identity
            expect(slots.getSlot(number)?.analysis.key).toEqual(firstName);
            expect(layers.get(firstName)?.key).toEqual(firstName);
            expect(assignedSerialized).toContain(firstName);


            // Reassign with the second analysis
            layers.placeRectAt(secondName, 10, 10, 100, 100, "green", number);

            // The slot shall be defined
            expect(assignedSerialized).not.toBeUndefined();
            expect(assignedSlot).not.toBeUndefined();

            // The first analysis should be no more
            expect(layers.has(firstName)).toEqual(false);

            // Check identity
            expect(layers.get(secondName)).toEqual(slots.getSlot(number)?.analysis);
            expect(assignedSerialized).toContain(secondName);

            // Assign the third analysis to another slot
            layers.placePointAt(thirdName, 10, 10, "red", number + 1);

            // The actual slot shall still be the same
            expect(layers.get(secondName)?.key).toEqual(slots.getSlot(number)?.analysis.key);
            expect(assignedSerialized).toContain(secondName);

            // The slot shall be occupied
            expect(slots.hasSlot(number + 1)).toEqual(true);
            expect(slots.getSlot(number + 1)?.analysis.key).toEqual(thirdName);

            // The third analysis will be removed along with its slot
            layers.removeAnalysis(thirdName);
            expect(slots.hasSlot(number + 1)).toEqual(false);

            // The second analysis will be removed without the slot
            layers.removeAnalysis(secondName);

            expect(layers.has(secondName)).toEqual(false);
            expect(slots.hasSlot(number)).toEqual(false);

            expect(layers.all.length).toEqual(0);
            expect(slots.value.size).toEqual(0);

        }

        testSlot(1, slots.onSlot1Assignement, slots.onSlot1Serialize);
        testSlot(2, slots.onSlot2Assignement, slots.onSlot2Serialize);
        testSlot(3, slots.onSlot3Assignement, slots.onSlot3Serialize);
        testSlot(4, slots.onSlot4Assignement, slots.onSlot4Serialize);
        testSlot(5, slots.onSlot5Assignement, slots.onSlot5Serialize);
        testSlot(6, slots.onSlot6Assignement, slots.onSlot6Serialize);
        testSlot(7, slots.onSlot7Assignement, slots.onSlot7Serialize);

        expect(layers.all.length).toEqual(0);
        expect(slots.value.size).toEqual(0);

    });

    test("reassignement of analysis", async () => {

        const instance = await loadFileForTests(THERMOGRAM_PATHS.SOUSTRUH);

        const slots = instance.slots;
        const layers = instance.analysis.layers;

        expect(layers.all.length).toEqual(0);
        expect(slots.value.size).toEqual(0);


        let slot1: AnalysisSlot | undefined;
        let serialized1: string | undefined = undefined;

        let slot2: AnalysisSlot | undefined;
        let serialized2: string | undefined = undefined;

        slots.onSlot1Assignement.set("test", value => slot1 = value);
        slots.onSlot1Serialize.set("test", value => serialized1 = value);

        slots.onSlot2Assignement.set("test", value => slot2 = value);
        slots.onSlot2Serialize.set("test", value => serialized2 = value);



        // Create the first analysis
        const analysis = layers.placeEllipsisAt("Test", 10, 10, 100, 100, "green", 1);

        // Check count
        expect(layers.all.length).toEqual(1);
        expect(slots.value.size).toEqual(1);

        // Check identity
        expect(slots.getSlot(1)?.analysis.key).toEqual(analysis.key);
        expect(serialized1).toContain(analysis.key);
        expect(serialized2).toBeUndefined();
        expect(slot1?.analysis).toEqual(analysis);

        // Reassign analysis
        slots.assignAnalysisToSlot(2, analysis);

        expect(layers.all.length).toEqual(1);
        expect(slots.value.size).toEqual(1);

        expect(slot1).toBeUndefined();
        expect(serialized1).toBeUndefined();

        expect(slot2?.analysis.key).toEqual(analysis.key);
        expect(serialized2).toContain(analysis.key);

        // Assign back
        slots.assignAnalysisToSlot(1, analysis);

        expect(layers.all.length).toEqual(1);
        expect(slots.value.size).toEqual(1);

        expect(slot1?.analysis.key).toEqual(analysis.key);
        expect(serialized1).toContain(analysis.key);

        expect(slot2).toBeUndefined();
        expect(serialized2).toBeUndefined();

        // unregister the slot
        slots.unassignAnalysisFromItsSlot(analysis);

        expect(slots.value.size).toEqual(0); // The slot is destroyed
        expect(layers.all.length).toEqual(1); // The analysis should remain

        expect(slot1).toBeUndefined();
        expect(serialized1).toBeUndefined();

        expect(slot2).toBeUndefined();
        expect(serialized2).toBeUndefined();


    });


});