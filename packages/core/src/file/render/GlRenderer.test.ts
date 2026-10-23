// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { AbstractThermalFile } from "../AbstractThermalFile";
import { GlRenderer } from "./GlRenderer";

function createFixture() {
    const onSetPixels = vi.fn();
    // Keep the real pixel setter without constructing unrelated file services.
    const file: AbstractThermalFile = Object.create(AbstractThermalFile.prototype);
    Object.defineProperties(file, {
        _pixelsVersion: { value: 0, writable: true },
        onSetPixels: { value: onSetPixels },
        width: { value: 2 },
        height: { value: 1 },
        min: { value: 0 },
        max: { value: 100 },
        id: { value: "test" },
        group: { value: { registry: {
            palette: {
                addListener: vi.fn(),
                currentPalette: { texturePixels: new Float32Array(256 * 4) }
            },
            range: { addListener: vi.fn(), currentRange: undefined }
        } } },
        timeline: { value: { addListener: vi.fn() } }
    });
    file.setPixels([10, 20]);

    const uploads: number[][] = [];
    const events: string[] = [];
    let activeUnit = 0;
    const gl = {
        TEXTURE0: 0,
        TEXTURE1: 1,
        TEXTURE_2D: 2,
        RED: 3,
        activeTexture: vi.fn((unit: number) => { activeUnit = unit; }),
        bindTexture: vi.fn(),
        texSubImage2D: vi.fn((
            _target: number, _level: number, _x: number, _y: number,
            _width: number, _height: number, format: number,
            _type: number, pixels: Float32Array
        ) => {
            if (format === 3) {
                expect(activeUnit).toBe(0);
                uploads.push(Array.from(pixels));
                events.push("upload");
            }
        }),
        createTexture: vi.fn(() => ({})),
        texImage2D: vi.fn(),
        texParameteri: vi.fn(),
        createBuffer: vi.fn(() => ({})),
        bindBuffer: vi.fn(),
        bufferData: vi.fn(),
        createShader: vi.fn(() => ({})),
        shaderSource: vi.fn(),
        compileShader: vi.fn(),
        createProgram: vi.fn(() => ({})),
        attachShader: vi.fn(),
        linkProgram: vi.fn(),
        useProgram: vi.fn(),
        getAttribLocation: vi.fn(() => 0),
        enableVertexAttribArray: vi.fn(),
        vertexAttribPointer: vi.fn(),
        getUniformLocation: vi.fn(() => ({})),
        uniform1f: vi.fn(),
        uniform1i: vi.fn(),
        viewport: vi.fn(),
        clearColor: vi.fn(),
        clear: vi.fn(),
        drawArrays: vi.fn(() => { events.push("draw"); })
    };
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 1;
    Object.defineProperty(canvas, "getContext", { value: vi.fn(() => gl) });
    return { file, gl, renderer: new GlRenderer(file, canvas), uploads, events, onSetPixels };
}

describe("GlRenderer pixel updates", () => {
    it("uploads new pixels before drawing without listening to timeline changes", async () => {
        const { file, renderer, uploads, events, gl } = createFixture();
        await renderer.init();
        expect(file.timeline.addListener).not.toHaveBeenCalled();
        expect(uploads).toEqual([[10, 20]]);

        uploads.length = 0;
        events.length = 0;
        gl.drawArrays.mockClear();
        file.setPixels([30, 40]);
        await renderer.render();
        expect(uploads).toEqual([[30, 40]]);
        expect(events).toEqual(["upload", "draw"]);
        expect(gl.drawArrays).toHaveBeenCalledTimes(1);
    });

    it("uploads pixels on every redraw while the version guard is disabled", async () => {
        const { renderer, uploads, gl } = createFixture();
        await renderer.init();
        uploads.length = 0;
        gl.drawArrays.mockClear();
        await renderer.render();
        await renderer.render();
        expect(uploads).toEqual([[10, 20], [10, 20]]);
        expect(gl.drawArrays).toHaveBeenCalledTimes(2);
    });

    it("detects reused arrays and advances the version before side effects", async () => {
        const { file, renderer, uploads, onSetPixels } = createFixture();
        await renderer.init();
        const previousVersion = file.pixelsVersion;
        onSetPixels.mockImplementation(() => {
            expect(file.pixelsVersion).toBe(previousVersion + 1);
        });
        file.pixels[0] = 50;
        file.setPixels(file.pixels);
        await renderer.render();
        expect(uploads).toEqual([[10, 20], [50, 20]]);
    });

    it("uploads only the latest pixels when updates precede a render", async () => {
        const { file, renderer, uploads } = createFixture();
        await renderer.init();
        uploads.length = 0;
        file.setPixels([30, 40]);
        file.setPixels([50, 60]);
        await renderer.render();
        expect(uploads).toEqual([[50, 60]]);
    });

    it("keeps automatic playback redraws to one upload and draw per pixel update", async () => {
        const { file, renderer, uploads, gl, onSetPixels } = createFixture();
        await renderer.init();
        uploads.length = 0;
        gl.drawArrays.mockClear();
        onSetPixels.mockImplementation(() => renderer.render());
        for (let frame = 0; frame < 10; frame++) {
            file.setPixels([frame, frame + 1]);
            await Promise.resolve();
        }
        expect(uploads).toEqual(
            Array.from({ length: 10 }, (_, frame) => [frame, frame + 1])
        );
        expect(gl.drawArrays).toHaveBeenCalledTimes(10);
        await renderer.render();
        expect(uploads).toHaveLength(11);
        expect(gl.drawArrays).toHaveBeenCalledTimes(11);
    });
});
