# ThermalFileReader

The <code>ThermalFileReader</code> represents **one successfully loaded file**. It stores the file's binary content (`ArrayBuffer`), knows which parser understands it, and provides all the data needed to create and drive [ThermalFileInstance](./thermal-file-instance) objects.

<PropertyInfo
    handler="ThermalFileReader"
    source="packages/core/src/loading/workers/ThermalFileReader.ts"
/>

Readers are produced by the loading pipeline described in [FilesService & batches](./files-service) and are **cached by URL** within one [ThermalManager](./thermal-manager). You normally do not construct a reader yourself – you receive it from `manager.service.loadFile()` or, indirectly, through the batch loader.

## Readers vs. instances

One reader may serve many instances. When the same file is displayed in several groups, every [ThermalFileInstance](./thermal-file-instance) refers to the same shared reader through <code>instance.reader</code>:

- the **reader** owns the data: the binary buffer, the parser and the parsed metadata,
- the **instance** owns the presentation: the DOM, the canvas, the playback state and the analyses.

Whenever an instance needs data – a frame of a sequence, analysis values for a rectangle – it asks its reader, which delegates the work to the parser (often inside a worker pool).

## Result interface

Both `ThermalFileReader` and [ThermalFileFailure](./thermal-file-failure) are results of `FilesService.loadFile()` and share a common interface:

- `isSuccess()` – returns `true` on a reader, `false` on a failure. Use it (or `instanceof`) to tell the two apart.
- `thermalUrl` – the URL the file was loaded from.
- `visibleUrl` – optional URL of the accompanying visible-spectrum photograph.

```ts
import { ThermalFileReader } from "@labirthermal/core";

const result = await manager.service.loadFile( "/files/klokan.lrc" );

if ( result instanceof ThermalFileReader ) {
    const info = await result.baseInfo();
    console.log( info.width, info.height, info.frameCount );
}
```

## Relation to the parser

Every reader holds a reference to the parser that recognised the file (<code>reader.parser</code>). All data-reading methods below are thin wrappers that pass the reader's buffer to the corresponding parser method – expensive calls run in the manager's worker pool. See [Writing a custom parser](./supported-files/custom-parser) for the parser interface.

The reader keeps up to two buffers:

- `buffer` – the *working buffer* passed to all parser methods. For formats with a preparation step (FLIR JPEG) this is the decoded binary form.
- `fileBuffer` – the original file content exactly as downloaded, used for downloads and exports. For formats without a preparation step it is identical to `buffer`.
- `fileMimeType` – MIME type of the original file, derived from the parser's extension definition.

## Reading data

- `baseInfo()` – read the fundamental metadata of the file: dimensions, timestamps, min/max temperatures, frame timeline, emissivity and more. See [baseInfo caching](#baseinfo) below.
- `frameData( index )` – read the temperature pixels of a given frame of the sequence.
- `pointAnalysisData( x, y )` – temperature history of a single point across all frames.
- `rectAnalysisData( x, y, width, height )` – min/max/avg history of a rectangular area across all frames.
- `ellipsisAnalysisData( x, y, width, height )` – min/max/avg history of an elliptical area across all frames.

### baseInfo caching {#baseinfo}

Parsing the base info may be expensive for large files. Because the result is always the same for a given buffer, the reader caches the first `baseInfo()` result in memory and returns the cached object on every subsequent call. Together with the URL cache in [FilesService](./files-service#caching), this means a file is downloaded once and its metadata is parsed once, no matter how many instances display it.

## Creating instances

- `createInstance( group, doAdd = true )` – read the base info and the first frame, create a [ThermalFileInstance](./thermal-file-instance) bound to the given [ThermalGroup](./thermal-group) and (unless `doAdd` is `false`) register it in `group.files`.

```ts
import { ThermalManager, ThermalFileReader } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "series" );

const result = await manager.service.loadFile( "/files/klokan.lrc" );

if ( result instanceof ThermalFileReader ) {

    const instance = await result.createInstance( group );

    const container = document.createElement( "div" );
    document.body.appendChild( container );
    instance.mountToDom( container );

}
```

::: tip Use the batch loader
`createInstance()` does not trigger the registry post-processing (min/max, range, histogram). When loading through `registry.batch.request()`, both the instance creation and the post-processing happen automatically – see [FilesService & batches](./files-service#batch-loading).
:::

## Other members

- `fileName` – the file name derived from `thermalUrl`.
- `service` – the owning [FilesService](./files-service).
- `applyFilters( filters )` – recalculate the working buffer using the provided filters (experimental, part of the unfinished filter system).
