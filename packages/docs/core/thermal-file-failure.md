# ThermalFileFailure

The <code>ThermalFileFailure</code> represents **one failed file load**. The loading pipeline never throws – whenever a file cannot be fetched, recognised or parsed, the load resolves with a failure object instead of a [ThermalFileReader](./thermal-file-reader).

<PropertyInfo
    handler="ThermalFileFailure"
    source="packages/core/src/loading/workers/ThermalFileFailure.ts"
/>

See [FilesService & batches](./files-service) for the description of the loading pipeline that produces this object.

## Result interface

Both [ThermalFileReader](./thermal-file-reader) and `ThermalFileFailure` are results of `FilesService.loadFile()` and share a common interface:

- `isSuccess()` – returns `false` on a failure.
- `thermalUrl` – the URL (or uploaded file name) the load was attempted from.
- `visibleUrl` – optional URL of the accompanying visible-spectrum photograph.

## Members

- `code` – a numeric error code, see [error codes](#error-codes) below.
- `message` – a human-readable description of what went wrong.

## Error codes {#error-codes}

The `code` member holds one of the values of the `FileErrors` enum:

| Code | Key | Meaning |
|------|-----|---------|
| `0` | `NOT_SPECIFIED` | Unspecified error. |
| `1` | `FILE_NOT_FOUND` | The URL did not respond with HTTP 200. |
| `2` | `MIME_UNSUPPORTED` | No registered parser recognised the file – see [Supported files](./supported-files/). |
| `3` | `PARSING_ERROR` | A parser recognised the file but failed while processing it. |
| `4` | `OUT_OF_MEMORY` | The file could not be processed due to memory constraints. |

```ts
import { FileErrors } from "@labirthermal/core";
```

## Handling failures

In a batch callback, the result is either a [ThermalFileInstance](./thermal-file-instance) or a `ThermalFileFailure`:

```ts
import {
    ThermalFileInstance,
    ThermalFileFailure,
    FileErrors
} from "@labirthermal/core";

registry.batch.request(
    "/files/does-not-exist.lrc",
    undefined,
    group,
    async ( result ) => {

        if ( result instanceof ThermalFileFailure ) {

            if ( result.code === FileErrors.FILE_NOT_FOUND ) {
                console.error( "Not found:", result.thermalUrl );
            } else {
                console.error( "Loading failed:", result.message );
            }

            return;
        }

        // ... work with the ThermalFileInstance
    }
);
```

When using `manager.service.loadFile()` directly, distinguish the results with `isSuccess()` or `instanceof`:

```ts
const result = await manager.service.loadFile( "/files/klokan.lrc" );

if ( !result.isSuccess() ) {
    const failure = result as ThermalFileFailure;
    console.error( failure.code, failure.message );
}
```
