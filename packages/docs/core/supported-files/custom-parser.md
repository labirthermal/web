# Writing a custom parser

Support for another file format is added by writing a **parser**: an object implementing the `IParserObject` interface. The interface is exported as a type:

```ts
import type { IParserObject } from "@labirthermal/core";
```

::: warning
Parsers cannot be registered at runtime yet. A new parser has to be added to the source code of `@labirthermal/core`, in the `parsers` object in `packages/core/src/parsers/index.ts`. Contributions are welcome on [GitHub](https://github.com/labirthermal/web).
:::

## Lifecycle

```
is( source, url )  →  prepare( source, url )  →  data methods
                         (optional)
```

1. **`is`** recognises the file by its content. It must not rely on the file extension.
2. **`prepare`** optionally converts the original file into a *working buffer*, once while loading. Formats that can be read directly (LRC) omit it. Formats that need expensive decoding (FLIR) do it here.
3. **Data methods** read the working buffer. The layout of the working buffer is private to each parser.

## Members

| Member | Purpose |
|---|---|
| `name`, `description` | Human-readable description of the format. |
| `devices` | Supported cameras, for display. |
| `extensions` | Extensions and MIME types, for display and file inputs only. |
| `is( buffer, url )` | Synchronously recognise the file by its content. |
| `prepare?( buffer, url )` | Optionally create the working buffer. |
| `baseInfo( buffer )` | Dimensions, frame count, timeline, temperature range, emissivity. |
| `getFrameSubset( buffer, index )` | Copy the data of one frame into a separate buffer. |
| `frameData( subset, dataType )` | Decode one frame into temperatures. |
| `histogramPixels( buffer )` | All temperatures of all frames as one `Float32Array`. |
| `pointAnalysisData( buffer, x, y )` | Temperature of one pixel in every frame. |
| `rectAnalysisData( buffer, x, y, width, height )` | Statistics of a rectangle in every frame. |
| `ellipsisAnalysisData( buffer, x, y, width, height )` | Statistics of an ellipse in every frame. |

The full contract, including edge cases, is documented in the JSDoc of `IParserObject` in `packages/core/src/parsers/structure.ts`.

## Rules

- **Temperatures are in °C.** Pixels are row-major, starting from the top-left corner.
- **All data methods describe the same temperatures.** A frame, a point, an area and the histogram must agree, allowing for Float32 rounding.
- **Do not mutate input buffers.** The working buffer is shared by all reads of the file.
- **Data methods run in web workers.** `baseInfo`, `frameData`, `histogramPixels` and the analysis methods are serialised and executed in a worker pool. They must be **self-contained**: no imports used at runtime and no variables from the outer scope. Type-only imports are fine.
- **Areas are clipped to the image.** An area outside the image returns `min: Infinity`, `max: -Infinity`, `avg: NaN` and `count: 0`.
- **Values that are not temperatures are `NaN`** in `histogramPixels`. The shared histogram ignores them.
- **Do not compute the histogram.** Binning is done by the shared `histogramFromPixels`, so all formats follow the same rules.

## Example

A minimal parser skeleton:

```ts
import type { IParserObject } from "@labirthermal/core";

export const MyParser: IParserObject = Object.freeze( {

    name: "My format (.my)",
    description: "Radiometric images of my camera.",
    devices: [],
    extensions: [ { extension: "my", minme: "application/octet-stream" } ],

    // Recognise the file by its signature, not by its name
    is: ( buffer ) => {
        if ( buffer.byteLength < 4 ) return false;
        const signature = new Uint8Array( buffer, 0, 4 );
        return String.fromCharCode( ...signature ) === "MYF\0";
    },

    baseInfo: async ( buffer ) => { /* ... */ },
    getFrameSubset: ( buffer, index ) => { /* ... */ },
    frameData: async ( subset, dataType ) => { /* ... */ },
    histogramPixels: async ( buffer ) => { /* ... */ },
    pointAnalysisData: async ( buffer, x, y ) => { /* ... */ },
    rectAnalysisData: async ( buffer, x, y, width, height ) => { /* ... */ },
    ellipsisAnalysisData: async ( buffer, x, y, width, height ) => { /* ... */ },

} );
```

Then register it in `packages/core/src/parsers/index.ts`:

```ts
const parsers = {
    LrcParser,
    FlirParser,
    MyParser
}
```

The existing [LRC](./lrc) and [FLIR](./flir) parsers in `packages/core/src/parsers` are good references: LRC reads its file directly, FLIR decodes it once in `prepare`.
