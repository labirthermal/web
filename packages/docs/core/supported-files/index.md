# Supported files

`@labirthermal/core` reads thermal files through **parsers**. A parser is an adapter for one file format: it recognises the file and reads its metadata, frames, analyses and histogram data.

| Format | Extension | Sequences | Parser | Details |
|---|---|---|---|---|
| LabIR Recording | `.lrc` | yes | `LrcParser` | [LRC files](./lrc) |
| FLIR radiometric JPEG | `.jpg`, `.jpeg` | no, single images only | `FlirParser` | [FLIR files](./flir) |

## How a file is recognised

The format is detected **by the file content**, not by its name or extension. A renamed LRC file is still read as LRC, and a JPEG renamed to `.lrc` is not. The parsers are tried in order, and the first one that accepts the file is used.

If no parser accepts the file, loading results in a `ThermalFileFailure` with the code `MIME_UNSUPPORTED` (`2`). If the file is recognised but cannot be read, the code is `PARSING_ERROR` (`3`).

```ts
import { ThermalManager, ThermalFileFailure } from "@labirthermal/core";

const registry = new ThermalManager().addOrGetRegistry( "registry" );
const group = registry.groups.addOrGetGroup( "group" );

// The same call works for every supported format
registry.batch.request( "/files/image.jpg", undefined, group, async result => {
    if ( result instanceof ThermalFileFailure ) {
        console.error( result.code, result.message );
    }
} );
```

## One API for all formats

Once a file is loaded, its format does not matter. Every parser returns temperatures in degrees Celsius, so files of different formats can share one thermal scale, one histogram and one analysis.

The supported extensions and MIME types are exported, for example for the `accept` attribute of a file input:

```ts
import { supportedFileTypesInputProperty } from "@labirthermal/core";

input.accept = supportedFileTypesInputProperty;
```

## Pages in this section

- [LRC files](./lrc): the open LabIR Recording format for images and sequences.
- [FLIR files](./flir): radiometric JPEG images from FLIR and FLIR-based cameras.
- [Writing a custom parser](./custom-parser): how to add support for another format.
