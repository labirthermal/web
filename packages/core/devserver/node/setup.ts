import { vi, vitest } from "vitest";
import { server } from "./server"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

/*
beforeEach(async () => {
    window.OffscreenCanvas = vitest.fn().mockImplementation((width: number, height: number) => {
        return {
            height,
            width,
            oncontextlost: vitest.fn(),
            oncontextrestored: vitest.fn(),
            getContext: vitest.fn(() => undefined),
            convertToBlob: vitest.fn(),
            transferToImageBitmap: vitest.fn(),
            addEventListener: vitest.fn(),
            removeEventListener: vitest.fn(),
            dispatchEvent: vitest.fn()
        } as unknown as OffscreenCanvas;
    });
});
*/

// Deklarace globálního rozhraní, pokud neexistuje
declare global {
    interface OffscreenCanvas {
      width: number;
      height: number;
      getContext(contextType: '2d' | 'webgl'): CanvasRenderingContext2D | WebGLRenderingContext | null;
    }
  
    // Global rozhraní pro globální objekty v Node prostředí
    var OffscreenCanvas: typeof OffscreenCanvas | undefined;
  }
  
  // Mock implementace OffscreenCanvas
  if (typeof global.OffscreenCanvas === 'undefined') {
    global.OffscreenCanvas = class {
      width: number;
      height: number;
  
      constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
      }
  
      getContext(contextType: '2d' | 'webgl'): CanvasRenderingContext2D | WebGLRenderingContext | null {
        // Mock prázdného kontextu
        if (contextType === '2d' || contextType === 'webgl') {
          return {} as CanvasRenderingContext2D; // nebo přidejte potřebné mock metody, pokud jsou vyžadovány
        }
        return null;
      }
    } as any;
  }

  /*
vi.spyOn(console, 'error').mockImplementation((msg: any) => {
    // console.log( msg );
    if (typeof msg === 'string' && msg.includes('OffscreenCanvas')) {
        return; // Ignorování chybového hlášení
    }
    console.error(msg); // Ostatní chyby nechá původní konzoli
});
*/