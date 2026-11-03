# ThermalGroup

<script setup>
import { withBase } from 'vitepress'
</script>

The <code>ThermalGroup</code> is a container of thermal files ([ThermalFileInstance](./thermal-file-instance)) within a <code>ThermalRegistry</code>. It represents a logical grouping of thermograms, such as a time series, a set of related camera captures, or an inspection batch.

Each group belongs to exactly one <code>ThermalRegistry</code>, from which it inherits the shared thermal palette, display range, and worker pool.

For the reactivity mechanisms used below (`addListener` and the `CallbacksManager` events), see [CallbacksManager](./callbacks-manager).

## Creating and managing groups

A group is identified by its ID string within its parent registry. You can also specify an optional human-readable name and description.

To create or retrieve a group, use <code>registry.groups.addOrGetGroup</code>:

```ts
import { ThermalManager, ThermalGroup } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );

// Create or retrieve a group
const group = registry.groups.addOrGetGroup(
    "morning-series",
    "Morning Series",
    "IR recordings taken in the morning"
);

// Calling addOrGetGroup with an existing ID returns the same group instance
const sameGroup = registry.groups.addOrGetGroup( "morning-series" );
console.log( group === sameGroup ); // true

// Human-readable label (resolves name, id, or internal hash)
console.log( group.label ); // "Morning Series"

// Groups can also be created directly and added to the registry
const customGroup = new ThermalGroup( registry, "evening-series", "Evening Series" );
registry.groups.addExistingGroup( customGroup );

// Access parent hierarchy
console.log( group.registry === registry ); // true
console.log( group.registry.manager === manager ); // true

// Remove a group and its instances from the registry
registry.groups.removeGroup( "morning-series" );
```

### Example

The example below shows an implementation of <code>ThermalGroup</code> using the <code>@labirthermal/webcomponents</code> package. A [group-provider](../webcomponents/providers/group-provider) creates or retrieves one group identified by its `group-slug` attribute; the nested [file-provider](../webcomponents/providers/file-provider) elements load files into it – see the [context providers guide](../webcomponents/guide/hierarchy).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="group-creation-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="morning-series">
            <strong>Group: Morning Series</strong>
            <div style="display: flex; gap: 10px; margin-top: 8px;">
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
<manager-provider manager-slug="group-creation-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="morning-series">
            <strong>Group: Morning Series</strong>
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

## <code>files</code>

<PropertyInfo
    handler="FilesState"
    type="ThermalFileInstance[]"
    source="packages/core/src/properties/lists/filesState.ts"
/>

The <code>group.files</code> property manages all thermal file instances belonging to this group.

### Managing group files

- **Ordered by timestamp**: the instances are automatically sorted chronologically (`group.files.sortedFiles`).
- **Loading files**: files should be loaded via the registry's batch loader with this group as target: `registry.batch.request(thermalUrl, visibleUrl, group, callback)` – see [FilesService & batches](./files-service).
- **Direct operations**:
  - `group.files.value` or `group.getInstances()` returns an array of `ThermalFileInstance`.
  - `group.files.removeFile(urlOrInstance)` unmounts and removes a file.
  - `group.files.removeAllInstances()` destroys all instances in the group.
  - `group.files.downloadAllFiles()` packages all original files in this group into a `.zip` archive and triggers browser download.
  - `group.files.forEveryInstance(fn)` iterates through every instance; `group.forEveryInstance(fn)` provides the same traversal.

Treat `group.files.value` as read-only and use the collection's methods to modify it.

### Setter methods

- `group.files.addFile( instance )` – register an existing [ThermalFileInstance](./thermal-file-instance) (called automatically by the loading pipeline).
- `group.files.removeFile( urlOrInstance )` – unmount and remove a file.
- `group.files.removeAllInstances()` – destroy all instances in the group.

### Events

- `group.files.addListener( id, files => ... )` – listener on the membership changes.

```ts
import {
    ThermalManager,
    ThermalFileInstance,
    ThermalFileFailure
} from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "series" );

// Load a file into the group via batch
registry.batch.request(
    "/files/klokan.lrc",
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

// Iterate through loaded files in this group
group.files.forEveryInstance( instance => {
    console.log( "File:", instance.fileName, instance.timestamp );
} );

// Download all original files in this group as a zip archive
// group.files.downloadAllFiles();

// Remove a specific file from the group
group.files.removeFile( "/files/klokan.lrc" );
```

### Example

The example below shows an implementation of <code>FilesState</code> using the <code>@labirthermal/webcomponents</code> package. The files are loaded into the group by [file-provider](../webcomponents/providers/file-provider) elements and the `group-download-dropdown` control downloads the original files, PNGs or analysis CSV of the whole group.

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="group-files-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <div style="margin-bottom: 8px;">
                <group-download-dropdown></group-download-dropdown>
            </div>
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
<manager-provider manager-slug="group-files-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <group-download-dropdown></group-download-dropdown>
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

## <code>minmax</code>

<PropertyInfo
    handler="MinmaxGroupProperty"
    type="ThermalMinmaxOrUndefined"
    source="packages/core/src/properties/scale/MinmaxGroupProperty.ts"
/>

The <code>group.minmax</code> property computes temperature limits specifically for files in this group.

### How group minmax works

- **Calculated from group instances**: whenever files are processed, `group.minmax.recalculateFromInstances()` computes the lowest minimum and highest maximum temperatures across files in this group alone.
- **Distinction from registry minmax**: while `registry.minmax` spans all groups in the registry, `group.minmax` is scoped exclusively to this group.
- **Range propagation**: using the <code>group-range-propagator</code> control, a user can hover to highlight this group's temperature window on the registry scale, or click to impose this group's min/max range across the entire registry.

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "series" );

// Read this group's temperature limits
const groupMinmax = group.minmax.value;

if ( groupMinmax ) {
    console.log( `Group min: ${groupMinmax.min} °C, max: ${groupMinmax.max} °C` );

    // Propagate this group's minmax to the registry range
    registry.range.imposeRange({
        from: groupMinmax.min,
        to: groupMinmax.max
    });
}

// Listen for group minmax changes
group.minmax.addListener( "group-minmax-listener", value => {
    console.log( "Group minmax updated:", value );
} );
```

### Setter methods

The property is read-only in normal use; it recalculates itself during the batch post-processing.

- `group.minmax.recalculateFromInstances()` – recalculate the bounds from the group's instances (called automatically by `registry.postLoadedProcessing()`).

### Events

- `group.minmax.addListener( id, value => ... )` – listener on the bounds changes.

### Example

The example below shows an implementation of <code>MinmaxGroupProperty</code> using the <code>@labirthermal/webcomponents</code> package. Each group contains a `group-range-propagator` control: hovering it highlights the group's temperature window on the registry scale and clicking it imposes the group's min/max as the registry range – see the [thermal range guide](../webcomponents/guide/thermal-range-and-units#thermal-range).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="group-minmax-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-range-slider></registry-range-slider>
        <registry-range-display></registry-range-display>
        <div style="display: flex; gap: 20px; margin-top: 10px;">
            <group-provider group-slug="group-a">
                <div style="margin-bottom: 4px;">
                    <strong>Group A:</strong>
                    <group-range-propagator></group-range-propagator>
                </div>
                <file-provider :thermal="withBase('/files/klokan.lrc')">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
            <group-provider group-slug="group-b">
                <div style="margin-bottom: 4px;">
                    <strong>Group B:</strong>
                    <group-range-propagator></group-range-propagator>
                </div>
                <file-provider :thermal="withBase('/files/soustruh.lrc')">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </div>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="group-minmax-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-range-slider></registry-range-slider>
        <registry-range-display></registry-range-display>
        <group-provider group-slug="group-a">
            <group-range-propagator></group-range-propagator>
            <file-provider thermal="/files/klokan.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
        <group-provider group-slug="group-b">
            <group-range-propagator></group-range-propagator>
            <file-provider thermal="/files/soustruh.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>analysisSync</code>

<PropertyInfo
    handler="AnalysisSyncDrive"
    type="boolean"
    source="packages/core/src/properties/analysis/sync/analysisSync.ts"
/>

The <code>group.analysisSync</code> property allows points, rectangles, and ellipses created for one image to be automatically mirrored across all images within the group.

### How analysis sync works

- **Turn on synchronization**: `group.analysisSync.turnOn( sourceInstance )` enables synchronization. Any analysis created, modified, or moved on one image will immediately replicate on the others.
- **Turn off synchronization**: `group.analysisSync.turnOff()`.
- **Value**: `group.analysisSync.value: boolean` indicates whether sync is currently active.
- **Data export helpers**:
  - `group.analysisSync.csv.downloadAsCsv()` downloads a tabulated CSV of analysis values across all files.
  - `group.analysisSync.png.downloadPng(...)` exports a multi-image composite PNG of all group images with rendered analysis layers.

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "series" );

const firstInstance = group.files.value[0];

if ( firstInstance ) {
    // Turn on analysis synchronization using the first file as the basis
    group.analysisSync.turnOn( firstInstance );
}

// Turn off analysis synchronization
group.analysisSync.turnOff();

// Listen for sync status changes
group.analysisSync.addListener( "sync-listener", ( isSynced: boolean ) => {
    console.log( "Analysis synchronization:", isSynced );
} );
```

### Setter methods

- `group.analysisSync.turnOn( sourceInstance )` – enable synchronization using the given instance as the source.
- `group.analysisSync.turnOff()` – disable synchronization.
- `group.analysisSync.copyOneSlotToAllInstances( instance, slot )` – copy one analysis slot from an instance to all other instances.
- `group.analysisSync.copyAllSlotsToAllInstances( instance )` – copy all analysis slots from an instance to all other instances.

### Events

- `group.analysisSync.addListener( id, isSynced => ... )` – listener on the sync status changes.
- `group.analysisSync.onSlotSync` – [CallbacksManager](./callbacks-manager) called with the serialised analysis and the slot number whenever a slot synchronizes.

### Example

The example below shows an implementation of <code>AnalysisSyncDrive</code> using the <code>@labirthermal/webcomponents</code> package. The `group-analysis-sync-button` control toggles the synchronization; the tools for drawing analyses are selected with the `manager-tool-bar` control.

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider advanced-palettes="true" palette="lava" manager-slug="group-analysis-sync-demo">
    <div style="margin-bottom: 8px; display: flex; gap: 12px; align-items: center;">
        <manager-tool-bar horizontal="true"></manager-tool-bar>
    </div>
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="sync-group">
            <div style="margin-bottom: 8px;">
                <group-analysis-sync-button on="true"></group-analysis-sync-button>
                <span style="font-size: 0.85em; margin-left: 8px;">Select a tool and draw on either image — the analysis synchronizes across both.</span>
            </div>
            <div style="display: flex; gap: 10px;">
                <file-provider :thermal="withBase('/files/nosorozec_01.lrc')">
                    <file-canvas></file-canvas>
                </file-provider>
                <file-provider :thermal="withBase('/files/nosorozec_02.lrc')">
                    <file-canvas></file-canvas>
                </file-provider>
            </div>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider advanced-palettes="true" palette="lava" manager-slug="group-analysis-sync-demo">
    <manager-tool-bar horizontal="true"></manager-tool-bar>
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="sync-group">
            <group-analysis-sync-button on="true"></group-analysis-sync-button>
            <file-provider thermal="/files/nosorozec_01.lrc">
                <file-canvas></file-canvas>
            </file-provider>
            <file-provider thermal="/files/nosorozec_02.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>cursorPosition</code>

<PropertyInfo
    handler="CursorPositionDrive"
    type="ThermalCursorPositionOrUndefined"
    source="packages/core/src/properties/cursor/CursorPositionDrive.ts"
/>

The <code>group.cursorPosition</code> property mirrors hover coordinates across all images in the group. When hovering over one image, the cursor position `[x, y]` is broadcast to the other instances, highlighting the exact same spatial pixel across every image. Every instance then calculates its own temperature under the cursor – see [instance.cursorValue](./thermal-file-instance#cursorvalue).

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "series" );

// Current cursor coordinates: { x: number, y: number } | undefined
const cursor = group.cursorPosition.value;

// Programmatically broadcast a cursor position
group.cursorPosition.recieveCursorPosition({ x: 120, y: 80 });

// Clear the cursor hover
group.cursorPosition.recieveCursorPosition( undefined );

// Listen for cursor position updates
group.cursorPosition.addListener( "cursor-listener", position => {
    if ( position ) {
        console.log( `Cursor at [${position.x}, ${position.y}]` );
    }
} );
```

### Setter methods

- `group.cursorPosition.recieveCursorPosition( position )` – broadcast a cursor position (`{ x, y }` or `undefined`) to all instances of the group.

### Events

- `group.cursorPosition.addListener( id, position => ... )` – listener on the cursor position changes.

## <code>playback</code>

<PropertyInfo
    handler="GroupPlayback"
    type="number"
    source="packages/core/src/properties/time/group/GroupPlayback.ts"
/>

The <code>group.playback</code> property coordinates synchronized timeline playback when images within the group are video sequences (such as recorded radiometric `.lrc` sequences). The value is the current relative playback time in milliseconds.

- **Sequence detection**: `group.playback.hasAnyPlayback` indicates if any instance contains multiple frames.
- **Playback state**: `group.playback.playing` indicates whether the sequence is currently playing.
- **Timeline tracking**: `group.playback.value` represents the current relative playback time in milliseconds.

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "sequence-group" );

// Check if any file in the group has playback sequence
console.log( "Has sequences:", group.playback.hasAnyPlayback );

// Current playback time in ms
const currentMs: number = group.playback.value;

// Listen for playback status changes
group.playback.onPlayingStatusChange.set( "playback-listener", isPlaying => {
    console.log( "Playing status:", isPlaying );
} );
```

### Setter methods

- `group.playback.play()` – start the synchronized playback of all sequences in the group.
- `group.playback.stop()` – stop the playback.
- `group.playback.setValueByPercent( percent )` – jump to a position given in percent of the duration.
- `group.playback.setValueByRelativeMs( ms )` – jump to a relative time in milliseconds.
- `group.playback.setLoopInterval( ms )` – change the interval of the playback loop timer.

### Events

- `group.playback.addListener( id, ms => ... )` – listener on the playback time changes.
- `group.playback.onPlayingStatusChange` – [CallbacksManager](./callbacks-manager) called when the playback starts or stops.
- `group.playback.onHasAnyCallback` – [CallbacksManager](./callbacks-manager) called when the presence of sequences in the group changes.
- `group.playback.onDurationChanged` – [CallbacksManager](./callbacks-manager) called when the overall duration changes.
- `group.playback.onLoopIntervalChanged` – [CallbacksManager](./callbacks-manager) called when the loop interval changes.

### Example

The example below shows an implementation of <code>GroupPlayback</code> using the <code>@labirthermal/webcomponents</code> package. The `group-timeline` control drives the synchronized playback of all sequences within its [group-provider](../webcomponents/providers/group-provider).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="group-playback-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="sequence-group">
            <group-timeline></group-timeline>
            <file-provider :thermal="withBase('/files/sequence.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="group-playback-demo">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="sequence-group">
            <group-timeline></group-timeline>
            <file-provider thermal="/files/sequence.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>analysisGraph</code>

<PropertyInfo
    handler="AnalysisGroupGraph"
    type="ThermalGraphGroupDataOrUndefined"
    source="packages/core/src/properties/analysis/group/AnalysisGroupGraph.ts"
/>

Aggregated graph data of the analyses across all sequences in the group, used by the <code>group-chart</code> component. When turned on, the property collects the time series of every analysis of every instance into one dataset.

### Setter methods

- `group.analysisGraph.turnOn()` – start collecting the graph data.
- `group.analysisGraph.turnOff()` – stop collecting and clear the data.

### Events

- `group.analysisGraph.addListener( id, data => ... )` – listener on the aggregated graph data changes.

## Summary of group controls

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
            <th>Control elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Files</td>
            <td><code>ThermalFileInstance[]</code></td>
            <td>Instances sorted chronologically</td>
            <td><code>group-download-dropdown</code>, <code>group-download-buttons</code></td>
        </tr>
        <tr>
            <td>Minmax</td>
            <td><code>{ min, max } | undefined</code></td>
            <td>Group-scoped temperature limits</td>
            <td><code>group-range-propagator</code></td>
        </tr>
        <tr>
            <td>Analysis sync</td>
            <td><code>boolean</code></td>
            <td>Mirrors ROI analyses across all group files</td>
            <td><code>group-analysis-sync-button</code></td>
        </tr>
        <tr>
            <td>Cursor position</td>
            <td><code>{ x, y } | undefined</code></td>
            <td>Mirrors cursor hover coordinates across group files</td>
            <td>– (automatic on hover)</td>
        </tr>
        <tr>
            <td>Playback</td>
            <td><code>number (ms)</code></td>
            <td>Synchronized timeline playback for sequences</td>
            <td><code>group-timeline</code></td>
        </tr>
    </tbody>
</table>
