# ThermalFileInstance

<script setup>
import { withBase } from 'vitepress'
</script>

The <code>ThermalFileInstance</code> is **one displayed IR image**. It owns the DOM, renders the canvas, handles playback of sequences, cursor interaction, analyses and recording.

<PropertyInfo
    handler="ThermalFileInstance"
    source="packages/core/src/file/ThermalFileInstance.ts"
/>

Every instance belongs to exactly one [ThermalGroup](./thermal-group) and is based on a shared [ThermalFileReader](./thermal-file-reader) that holds the file's binary data. The same file loaded into several groups produces several instances backed by one reader.

## Creating an instance

Instances are never constructed directly. They are created by the loading pipeline – see [FilesService & batches](./files-service):

```ts
import {
    ThermalManager,
    ThermalFileInstance,
    ThermalFileFailure
} from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "series" );

registry.batch.request(
    "/files/sequence.lrc",
    undefined,
    group,
    async ( result: ThermalFileInstance | ThermalFileFailure ) => {

        if ( result instanceof ThermalFileInstance ) {
            const container = document.createElement( "div" );
            document.body.appendChild( container );
            result.mountToDom( container );
        }

    }
);
```

Alternatively, `reader.createInstance( group )` creates an instance from an existing [ThermalFileReader](./thermal-file-reader).

## Identity and hierarchy

- `id` – unique ID composed of the group ID and the thermal URL. The same file has different IDs in different groups.
- `fileName` – the file name derived from the URL.
- `thermalUrl` – the full URL of the thermal file.
- `visibleUrl` – optional URL of the accompanying visible-spectrum photograph.
- `group` – the owning [ThermalGroup](./thermal-group).
- `registry` / `manager` – aliases to the group's [ThermalRegistry](./thermal-registry) and [ThermalManager](./thermal-manager).
- `reader` – the shared [ThermalFileReader](./thermal-file-reader) providing the file's data.
- `pool` – alias to the manager's worker pool.

## Mounting to DOM and rendering

The instance renders itself into a container element you provide. Mounting builds a layered DOM structure (visible image, thermal canvas, cursor layer, listener layer) and attaches all mouse interaction.

### Methods

- `mountToDom( container: HTMLDivElement )` – build the DOM inside the container, create the renderer and activate listeners. Re-mounting replaces any previous binding.
- `unmountFromDom()` – destroy the renderer and remove the entire DOM structure.
- `draw()` – redraw the canvas using the current pixels, palette and range. Called automatically on every relevant change.
- `destroySelfAndBelow()` / `removeAllChildren()` – remove the entire DOM structure.
- `setPreferWebGl( value )` – choose the renderer type **before** calling `mountToDom()`: `true` prefers WebGL (default, with CPU fallback), `false` forces the CPU renderer.
- `switchToCPURenderer()` – switch an already mounted instance to the CPU renderer.
- `removeVisibleFile()` – forget the visible-spectrum image URL.

### State

- `dom` – the DOM binding object, `undefined` before mounting.
- `hover` – `true` while the pointer is above the image.

### Events

- `onMount` – [CallbacksManager](./callbacks-manager) called after the instance is mounted to DOM.
- `onUnmount` – [CallbacksManager](./callbacks-manager) called after the instance is unmounted.

## Temperature data

The current frame's temperatures are stored as an array of numbers (°C), one per pixel, row by row.

- `pixels` – the current temperature array.
- `pixelsVersion` – increments whenever pixels are supplied, including reused arrays.
- `setPixels( value )` – replace the pixels and trigger redraw and recalculation of cursor and analysis values. Called internally by the playback and filters; you rarely need it yourself.
- `getTemperatureAtPoint( x, y )` – temperature at the given coordinate.
- `getColorAtPoint( x, y )` – the display color of the given coordinate within the current palette and range.

```ts
const temperature = instance.getTemperatureAtPoint( 10, 20 );
console.log( `Pixel [10, 20] has ${ temperature } °C` );
```

## <code>meta</code>

<PropertyInfo
    handler="FileMeta"
    type="ParsedFileBaseInfo"
    source="packages/core/src/file/utils/FileMeta.ts"
/>

The file metadata parsed from the file: dimensions, timestamps, temperature bounds and the frame timeline. The values may change in time (for example when filters modify the data), therefore they are observable.

Read the current values through `instance.meta.current`:

```ts
const { width, height, timestamp, duration, min, max, fps, frameCount } = instance.meta.current;
```

Shortcut getters `instance.meta.width` and `instance.meta.height` are available. The direct getters on the instance (`instance.width`, `instance.min`, ...) are **deprecated** – use `meta` instead.

### Setter methods

- `meta.set( value )` – replace the metadata (used internally by filters).

### Events

- `meta.onChange` – [CallbacksManager](./callbacks-manager) called with the new `ParsedFileBaseInfo` whenever the metadata changes.

## <code>label</code>

<PropertyInfo
    handler="ThermalFileInstance"
    type="string | undefined"
    source="packages/core/src/file/ThermalFileInstance.ts"
/>

An optional human-readable label of the instance. It does not change the file name or the source URL. Labels belong to individual instances, so the same source file can have different labels in different groups.

### Setter methods

- `setLabel( label: string | undefined )` – set or clear the label.

### Events

- `onLabelChange` – [CallbacksManager](./callbacks-manager) called with the new label.

## <code>timeline</code>

<PropertyInfo
    handler="TimelineDrive"
    type="number"
    source="packages/core/src/properties/time/playback/TimelineDrive.ts"
/>

Playback of multi-frame sequences. The value is the current relative time in milliseconds from the start of the sequence. For single-frame files the timeline exists but stays at `0`.

Reading the state:

- `timeline.isSequence` – `true` when the file has more than one frame.
- `timeline.isPlaying` – `true` while playing.
- `timeline.currentStep` – the current frame descriptor (`index`, `absolute`, `relative`, `offset`).
- `timeline.currentMs` / `timeline.currentPercentage` / `timeline.currentFrameIndex` / `timeline.currentTime` – the current position in various forms.
- `timeline.duration` / `timeline.frameCount` – the sequence length.
- `timeline.playbackSpeed` – the current playback speed (`0.5`, `1`, `2`, `3`, `5` or `10`).

### Setter methods

- `timeline.play()` – start the playback.
- `timeline.pause()` – pause at the current position.
- `timeline.stop()` – pause and rewind to the start.
- `timeline.setRelativeTime( ms )` – jump to a relative time in milliseconds.
- `timeline.setValueByPercent( percent )` – jump to a position given in percent of the duration.
- `timeline.next()` / `timeline.prev()` – step one frame forward / backward.
- `timeline.playbackSpeed = 2` – change the playback speed.

### Events

- `timeline.addListener( id, ms => ... )` – listener on the value (relative time) changes.
- `timeline.onFrame` – [CallbacksManager](./callbacks-manager) called with the current frame descriptor on every value change.
- `timeline.callbacksChangeFrame` – [CallbacksManager](./callbacks-manager) called whenever the displayed frame actually changes.
- `timeline.callbacksPlay` – [CallbacksManager](./callbacks-manager) called when the playback starts.
- `timeline.callbacksPause` – [CallbacksManager](./callbacks-manager) called when the playback pauses.
- `timeline.callbacksStop` – [CallbacksManager](./callbacks-manager) called when the playback stops.
- `timeline.callbacksEnd` – [CallbacksManager](./callbacks-manager) called when the playback reaches the end of the sequence.
- `timeline.callbackdPlaybackSpeed` – [CallbacksManager](./callbacks-manager) called when the playback speed changes.

### Example

The example below shows an implementation of <code>TimelineDrive</code> using the <code>@labirthermal/webcomponents</code> package. The `file-timeline` control drives the playback of the instance loaded by its [file-provider](../webcomponents/providers/file-provider).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="instance-timeline-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/sequence.lrc')">
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="instance-timeline-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/sequence.lrc">
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>cursorValue</code>

<PropertyInfo
    handler="CursorValueDrive"
    type="number | undefined"
    source="packages/core/src/properties/cursor/CursorValueDrive.ts"
/>

The temperature under the cursor, or `undefined` when the cursor is not above any image of the group. The cursor position itself is synchronized on the group level ([group.cursorPosition](./thermal-group#cursorposition)) – hovering over one image projects the cursor to all images of the group, and every instance calculates its own `cursorValue` from its own pixels.

### Setter methods

- `cursorValue.recalculateFromCursor( position )` – recalculate the value from a cursor position. Called automatically whenever the group's cursor position or the instance's pixels change.
- `recieveCursorPosition( position )` – instance method that projects a cursor position to the cursor layer label and recalculates `cursorValue`.

### Events

- `cursorValue.addListener( id, value => ... )` – listener on the temperature value changes.

## <code>analysis</code>

<PropertyInfo
    handler="AnalysisDrive"
    type="AbstractAnalysis[]"
    source="packages/core/src/properties/analysis/analysis/AnalysisDrive.ts"
/>

The analyses (points, rectangles and ellipses) drawn on this image. The value is the current array of analyses. The actual storage and manipulation lives in <code>analysis.layers</code> (`AnalysisLayersStorage`), which the drive mirrors.

### Setter methods

- `analysis.layers.createPointAt( top, left )` – create a point analysis.
- `analysis.layers.placePointAt( name, top, left, color? )` – place a named point analysis.
- `analysis.layers.createRectFrom( top, left )` – start drawing a rectangle analysis.
- `analysis.layers.placeRectAt( name, top, left, bottom, right, color? )` – place a named rectangle analysis.
- `analysis.layers.createEllipsisFrom( top, left )` – start drawing an ellipsis analysis.
- `analysis.layers.placeEllipsisAt( name, top, left, bottom, right, color? )` – place a named ellipsis analysis.
- `analysis.layers.removeAnalysis( key )` – remove one analysis by its key.
- `analysis.layers.removeAllAnalyses()` – remove all analyses.
- `analysis.layers.selectAll()` / `analysis.layers.deselectAll()` – change the selection.

### Events

- `analysis.layers.onAdd` – [CallbacksManager](./callbacks-manager) called when an analysis is added.
- `analysis.layers.onRemove` – [CallbacksManager](./callbacks-manager) called when an analysis is removed.
- `analysis.layers.onSelectionChange` – [CallbacksManager](./callbacks-manager) called when the selection changes.
- `analysis.layers.onAnySerializableChange` – [CallbacksManager](./callbacks-manager) called on any serialisable change of any analysis (moved, resized, renamed, recolored).
- `analysis.addListener( id, analyses => ... )` – listener on the mirrored array value.

### Example

The example below shows an implementation of <code>AnalysisDrive</code> using the <code>@labirthermal/webcomponents</code> package. The `manager-tool-bar` control selects the drawing tool and the `file-analysis-table` control lists all analyses of the instance with their values.

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="instance-analysis-demo">
    <manager-tool-bar horizontal="true"></manager-tool-bar>
    <span>Select a tool and draw on the image.</span>
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/soustruh.lrc')">
                <file-canvas></file-canvas>
                <file-analysis-table></file-analysis-table>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="instance-analysis-demo">
    <manager-tool-bar horizontal="true"></manager-tool-bar>
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/soustruh.lrc">
                <file-canvas></file-canvas>
                <file-analysis-table></file-analysis-table>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>analysisData</code>

<PropertyInfo
    handler="AnalysisDataState"
    type="AnalysisDataStateValue"
    source="packages/core/src/properties/analysis/data/AnalysisDataState.ts"
/>

Time-series data of the analyses across the frames of a sequence, used by graphs and exports. The value holds the graph data of all analyses with active graphs.

### Setter methods

- `analysisData.refreshAllAnalysesValues()` – recalculate the current values of all analyses (synchronous, current frame only).
- `analysisData.downloadData()` – download the analysis data as a CSV file.

### Events

- `analysisData.onGraphsPresence` – [CallbacksManager](./callbacks-manager) called when the presence of active graphs changes.
- `analysisData.addListener( id, value => ... )` – listener on the graph data changes.

## <code>slots</code>

<PropertyInfo
    handler="AnalysisSlotsState"
    type="AnalysisSlotsMap"
    source="packages/core/src/properties/analysis/slots/AnalysisSlotsDrive.ts"
/>

Up to seven numbered slots to which analyses may be assigned. Slots provide a stable addressing of analyses – useful for URL serialisation and for synchronisation across files in a group.

### Setter methods

- `slots.assignAnalysisToSlot( analysis, slot )` – assign an analysis to a slot number.
- `slots.unassignAnalysisFromItsSlot( analysis )` – remove the analysis from its slot.
- `slots.removeSlotAndAnalysis( slot )` – remove the slot including its analysis.
- `slots.createAnalysisFromSerialized( serialized, slot )` – create an analysis from its serialised string form.

Reading: `slots.getSlot( number )`, `slots.hasSlot( number )`, `slots.getSlotValue( number )` (serialised string), `slots.getNextFreeSlotNumber()`, `slots.forEveryExistingSlot( fn )`.

### Events

- `slots.onAnySlotChanged` – [CallbacksManager](./callbacks-manager) called on any slot change.
- `slots.onSlot1Assignement` … `slots.onSlot7Assignement` – [CallbacksManager](./callbacks-manager)s called when the given slot is assigned or cleared.
- `slots.onSlot1Serialize` … `slots.onSlot7Serialize` – [CallbacksManager](./callbacks-manager)s called with the serialised value of the given slot.
- `slots.addListener( id, map => ... )` – listener on the slots map changes.

## <code>recording</code>

<PropertyInfo
    handler="RecordingDrive"
    type="boolean"
    source="packages/core/src/properties/time/recording/RecordingDrive.ts"
/>

Video recording of the instance's canvas. Captures the canvas stream with `MediaRecorder` and downloads the result as a `webm`/`mp4` file once the recording ends. The value indicates whether a recording is in progress. The instance must be mounted to DOM.

### Setter methods

- `recording.start()` – start recording the canvas.
- `recording.end()` – stop the recording and download the file.
- `recording.recordEntireFile()` – rewind the sequence to the start, play it to the end and record the whole playback. While this runs, `recording.mayStop` is `false`.

### Events

- `recording.callbackMayStop` – [CallbacksManager](./callbacks-manager) called when the possibility to stop manually changes (used while recording the entire file).
- `recording.addListener( id, isRecording => ... )` – listener on the recording state.

## <code>export</code>

<PropertyInfo
    handler="FilePngExport"
    source="packages/core/src/file/utils/FilePngExport.ts"
/>

Lazy-loaded PNG export of the instance – renders the thermal image including analyses and scale into a downloadable PNG. The object is created on the first access of `instance.export`.

```ts
instance.export.downloadPng();
```

## <code>filters</code>

<PropertyInfo
    handler="FilterContainer"
    type="AbstractFilter[]"
    source="packages/core/src/filters/FilterContainer.ts"
/>

::: warning Experimental
The filter system is not finished yet and its API may change.
:::

Container of data filters applied on the instance level. Filters exist on every level of the hierarchy (manager, registry, group, file) and the instance combines them all:

### Setter methods

- `filters.addFilter( filter )` / `filters.removeFilter( filter )` – manage the instance-level filters.
- `applyAllAvailableFilters()` – instance method that re-reads the base info and the current frame from the reader and re-renders.
- `getAllApplicableFilters()` – collect active filters from the manager, registry, group and this instance.

### Events

- `filters.onLayers` – [CallbacksManager](./callbacks-manager) called with the current array of filters when it changes.
