import { describe, expect, test } from "vitest";
import { THERMOGRAM_PATHS } from "../../devserver/node/mocks";
import { ThermalManager } from "../hierarchy/ThermalManager";
import { ThermalFileReader } from "../loading/workers/ThermalFileReader";
import { InstanceDOM } from "./dom/InstanceDom";
import { ThermalCanvasLayer } from "./dom/layers/thermalCanvasLayer";
import ThermalCursorLayer from "./dom/layers/thermalCursorLayer";
import { VisibleLayer } from "./dom/layers/VisibleLayer";
import { ThermalListenerLayer } from "./dom/layers/thermalListenerLayer";

describe("InstanceDOM", () => {

    test("attaching, building and detaching as isolated instance", async () => {

        const manager = new ThermalManager();
        const registry = manager.addOrGetRegistry("test");
        const group = registry.groups.addOrGetGroup("test");

        const service = manager.service;

        const result = await service.loadFile(THERMOGRAM_PATHS.SOUSTRUH) as ThermalFileReader;

        expect(result).toBeInstanceOf(ThermalFileReader);

        const instance = await result.createInstance(group);


        /**
         * Before the build
         */


        // Before build, the DOM object should be empty
        expect(instance.dom).toBeUndefined();




        /**
         * After the attachment
         */


        // Attachment to a container
        const container = document.createElement("div");
        const dom = new InstanceDOM(instance, container);

        expect(container.classList.contains(InstanceDOM.CLASS_BASE)).toEqual(true);

        // Before build, the DOM should only be attached
        expect(dom).toBeDefined();
        expect(dom.root).toEqual(container);
        expect(container.dataset.thermalInstanceId).toEqual(instance.id);
        expect(container.dataset.thermalInstanceUrl).toEqual(instance.thermalUrl);

        // DOM dataset
        expect(container.dataset.built).toBeUndefined();
        expect(container.dataset.hydrated).toBeUndefined();
        expect(container.dataset.hover).toBeUndefined();

        // Inner state
        expect(dom.built).toEqual(false);
        expect(dom.hydrated).toEqual(false);
        expect(dom.hover).toEqual(false);

        // Layers existence
        expect(dom.canvasLayer).toBeUndefined();
        expect(dom.visibleLayer).toBeUndefined();
        expect(dom.cursorLayer).toBeUndefined();
        expect(dom.listenerLayer).toBeUndefined();





        /** 
         * After the build
         */


        // Build the DOM
        dom.build();

        // After build, the DOM shooudl exist, but the listeners should be empty

        expect(container.classList.contains(InstanceDOM.CLASS_BUILT)).toEqual(true);

        // Layers existence
        expect(dom.canvasLayer).toBeInstanceOf(ThermalCanvasLayer);
        expect(dom.visibleLayer).toBeInstanceOf(VisibleLayer);
        expect(dom.cursorLayer).toBeInstanceOf(ThermalCursorLayer);
        expect(dom.listenerLayer).toBeInstanceOf(ThermalListenerLayer);

        // Inner state
        expect(dom.built).toEqual(true);
        expect(dom.hydrated).toEqual(false);
        expect(dom.hover).toEqual(false);

        // Container datasets
        expect(container.dataset.built).toEqual("true");
        expect(container.dataset.hydrated).toBeUndefined();
        expect(container.dataset.hover).toBeUndefined();

        // Inner DOM elements
        expect(dom.canvasLayer?.canvas).toBeDefined();
        expect(dom.cursorLayer?.getLayerRoot()).toBeDefined();
        expect(dom.listenerLayer?.getLayerRoot()).toBeDefined();


        /**
         * After the hydration
         */

        dom.hydrate();

        expect(dom.hydrated).toEqual(true);
        expect(container.dataset.hydrated).toEqual("true");
        expect(container.classList.contains(InstanceDOM.CLASS_HYDRATED)).toEqual(true);



        /** 
         * After dehydration 
        */

        dom.dehydrate();

        expect(dom.hydrated).toEqual(false);
        expect(container.dataset.hydrated).toBeUndefined();
        expect(container.classList.contains(InstanceDOM.CLASS_HYDRATED)).toEqual(false);
        expect(dom.listenerLayer).toBeDefined();
        expect(dom.listenerLayer).toBeInstanceOf(ThermalListenerLayer);


        /**
         * After destruction
         */

        dom.destroy();

        expect(dom.built).toEqual(false);
        expect(container.dataset.built).toBeUndefined();
        expect(container.classList.contains(InstanceDOM.CLASS_BUILT)).toEqual(false);
        expect(dom.visibleLayer).toBeUndefined();
        expect(dom.listenerLayer).toBeUndefined();
        expect(dom.cursorLayer).toBeUndefined();
        expect(dom.canvasLayer).toBeUndefined();
        expect(dom.root.childElementCount).toEqual(0);


        /**
         * After detaching
         */

        instance.unmountFromDom();
        expect(container.classList.contains(InstanceDOM.CLASS_BASE)).toEqual(false);
        expect(container.dataset.thermalInstanceId).toBeUndefined();
        expect(container.dataset.thermalInstanceUrl).toBeUndefined();


    });

});