# FilesService & batches

<script setup>
import { withBase } from 'vitepress'
</script>

This page explains how thermal files travel from a URL or an uploaded `File` to a rendered image: how the loading is **batched**, how the results are **cached** and how the binary data meets its **parser**.

## How loading works

Every file load goes through the same pipeline:

1. **Request** – your code calls `registry.batch.request()` (recommended) or `manager.service.loadFile()` directly.
2. **Batching** – the `BatchLoader` collects all requests registered within a single tick into one `Batch`.
3. **Fetch & cache** – for each URL, the `FilesService` either returns a cached result, hooks into an already pending request, or fetches the file.
4. **Parser determination** – the binary content is matched against the registered parsers ([LRC](./supported-files/lrc), [FLIR](./supported-files/flir)). The parser may convert the file into a *working buffer* (FLIR JPEGs are decoded at this point).
5. **Result** – the pipeline produces an [AbstractFileResult](https://github.com/labirthermal/web/blob/main/packages/core/src/loading/workers/AbstractFileResult.ts): either a [ThermalFileReader](./thermal-file-reader) (success) or a [ThermalFileFailure](./thermal-file-failure) (failure).
6. **Instance creation** – for each successful result, the batch calls `reader.createInstance( group )`, producing a [ThermalFileInstance](./thermal-file-instance) registered in the target [ThermalGroup](./thermal-group).
7. **Post-processing** – after all files of the batch are processed, the registry recalculates group and registry min/max, imposes the range and rebuilds the histogram (`registry.postLoadedProcessing()`).

```
registry.batch.request( url, visibleUrl, group, callback )
        │  (all requests from one tick collect into one Batch)
        ▼
FilesService.loadFile( url )
        │  cache hit? ──► cached ThermalFileReader
        │  pending?   ──► promise of the running request
        ▼
fetch( url ) ──► determineAndPrepare( buffer, url )
        │                 │ no parser found / parsing error
        ▼                 ▼
ThermalFileReader   ThermalFileFailure
        │
        ▼
reader.createInstance( group ) ──► ThermalFileInstance
        │
        ▼
registry.postLoadedProcessing() ──► minmax, range, histogram
```

## FilesService

<PropertyInfo
    handler="FilesService"
    source="packages/core/src/loading/workers/FilesService.ts"
/>

The `FilesService` is a singleton per [ThermalManager](./thermal-manager), available as <code>manager.service</code>. Registries alias it through <code>registry.service</code>. It performs the actual fetching, parser determination and caching.

### Caching

The service holds two internal maps:

- **Cache of results** (`cacheByUrl`) – every result of `loadFile()` is stored by its URL. A second request of the same URL within the same manager returns the very same [ThermalFileReader](./thermal-file-reader) object without fetching or parsing again. The cache is shared by all registries and groups of the manager, so loading the same file into five groups downloads and parses it only once.
- **Pending requests** (`requestsByUrl`) – while a URL is being fetched, concurrent requests of the same URL hook into the running request instead of starting a new one. One URL therefore never triggers two parallel fetches.

Inspection helpers:

```ts
manager.service.fileIsInCache( "/files/klokan.lrc" );  // boolean
manager.service.fileIsPending( "/files/klokan.lrc" );  // boolean
manager.service.cachedServicesCount;                   // number of cached results
manager.service.requestsCount;                         // number of pending requests
```

There is a second caching level inside every reader: the parsed base info of a file is cached in the reader itself – see [ThermalFileReader](./thermal-file-reader#baseinfo).

### Relation to parsers

The service does not understand any file format itself. When a file arrives, the service iterates the registered parsers and asks each one whether it recognises the content (every parser implements a static `is( buffer, url )` check). The first matching parser is assigned to the file.

Some formats need a conversion step before they can be used: a radiometric FLIR JPEG is decoded into an internal binary form. For this purpose, a parser may define a `prepare()` method that turns the downloaded buffer into a *working buffer*. The resulting [ThermalFileReader](./thermal-file-reader) then keeps both buffers – the working one for parsing, and the original one for downloads.

If no parser matches, or the preparation fails, the load resolves with a [ThermalFileFailure](./thermal-file-failure); errors are never thrown out of `loadFile()`.

See [Supported files](./supported-files/) for the list of formats and [Writing a custom parser](./supported-files/custom-parser) for registering a new one.

### Methods

- `loadFile( thermalUrl, visibleUrl? )` – load one file from a URL (with caching & deduplication as described above). Returns `Promise<ThermalFileReader | ThermalFileFailure>`.
- `loadFiles( files )` – load multiple URLs at once; each item may carry its own async callback.
- `loadUploadedFile( file: File )` – process a `File` obtained from an upload or drag&drop. Uploaded files bypass the URL cache.
- `handleDropzone( element, multiple? )` – create a drag&drop listener on an HTML element that feeds dropped files into the service.

::: tip Use the batch loader
`loadFile()` returns a reader, not an instance, and does not trigger any registry post-processing. In application code, prefer `registry.batch.request()`, which handles instance creation and post-processing for you.
:::

## Batch loading

<PropertyInfo
    handler="BatchLoader"
    source="packages/core/src/loading/batch/BatchLoader.ts"
/>

Each [ThermalRegistry](./thermal-registry) owns a lazy-loaded `BatchLoader` available as <code>registry.batch</code>. A **batch** is created from all requests registered within a single tick – when you request ten files in one loop, they form one batch, load in parallel, and the registry recalculates its min/max, range and histogram only once at the end.

```ts
import {
    ThermalManager,
    ThermalFileInstance,
    ThermalFileFailure
} from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "series" );

// All requests made in this tick join the same batch
[ "/files/klokan.lrc", "/files/makak.lrc" ].forEach( url => {

    registry.batch.request(
        url,
        undefined, // optional visible-spectrum image URL
        group,
        async ( result: ThermalFileInstance | ThermalFileFailure ) => {
            if ( result instanceof ThermalFileInstance ) {
                const container = document.createElement( "div" );
                document.body.appendChild( container );
                result.mountToDom( container );
            } else {
                console.error( "File load failed:", result.message );
            }
        }
    );

} );
```

### How a batch executes

The batch starts automatically in the next tick after the last `request()` call, or immediately when it is closed. It then:

1. Loads every queued URL through `FilesService.loadFile()` and creates its [ThermalFileInstance](./thermal-file-instance) in the target group. Every file runs this pipeline independently in parallel, so one slow download does not delay the processing of the other files. Unexpected errors of a single file are converted to a [ThermalFileFailure](./thermal-file-failure) instead of aborting the whole batch.
2. Runs `registry.postLoadedProcessing()` once, after all files of the batch settle.
3. Fires the per-file callbacks with either the instance or the [ThermalFileFailure](./thermal-file-failure). A throwing callback does not block the remaining callbacks.
4. Fires `onBatchComplete` on the loader and `onResolve` on the batch, and removes the batch. This happens even when something fails, so the registry never stays in the loading state forever.

While any batch is loading, the observable <code>registry.loading</code> property is `true`. It turns `false` only after the last loading batch finishes.

### Methods

- `registry.batch.request( thermalUrl, visibleUrl, group, callback, id? )` – register a file request; opens a new batch when none is open. Passing an `id` targets a named batch. A request arriving after its batch started loading joins (or opens) a new batch instead.
- `registry.batch.createBatch( id? )` / `registry.batch.getBatchById( id )` – manual batch management. A batch that already started loading is sealed; `getBatchById` then creates a new batch with the same ID.
- `registry.batch.closeBatch()` – seal the currently open batch and execute it immediately instead of waiting for the next tick; subsequent requests form a new batch.
- `registry.batch.numberOfBatches`, `registry.batch.hasLoadingBatches`, `registry.batch.numLoadingBatches` – inspection getters.

### Events

- `registry.batch.onBatchComplete` – [CallbacksManager](./callbacks-manager) called with the array of all results whenever any batch finishes.
- `batch.onResolve` – [CallbacksManager](./callbacks-manager) on an individual `Batch` object (returned by `request()`), called with the batch's results when it finishes.
- `registry.loading.addListener( id, value => ... )` – observable loading state of the registry.
- `registry.onProcessingStart` / `registry.onProcessingEnd` – [CallbacksManager](./callbacks-manager)s fired around the registry post-processing.

### Example

The example below shows an implementation of <code>FilesService</code> and <code>BatchLoader</code> using the <code>@labirthermal/webcomponents</code> package. Both [file-provider](../webcomponents/providers/file-provider) elements register their URLs in the same tick, so both files load in one batch and the registry range is calculated only once – see the [context providers guide](../webcomponents/guide/hierarchy).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="files-service-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <file-provider :thermal="withBase('/files/klokan.lrc')">
                    <file-canvas></file-canvas>
                </file-provider>
                <file-provider :thermal="withBase('/files/makak.lrc')">
                    <file-canvas></file-canvas>
                </file-provider>
            </div>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="files-service-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/klokan.lrc">
                <file-canvas></file-canvas>
            </file-provider>
            <file-provider thermal="/files/makak.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::
