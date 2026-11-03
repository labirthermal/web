# ThermalRegistry

<script setup>
import { withBase } from 'vitepress'
</script>

The <code>ThermalRegistry</code> is a display context within a <code>ThermalManager</code>. It groups related thermal files and controls registry-wide visualization settings, including temperature range, min/max limits, opacity, and the temperature distribution histogram.

All registries within a single <code>ThermalManager</code> share the manager's thermal palette and services, but each registry maintains its own independent display range, opacity, and group hierarchy.

For the reactivity mechanisms used below (`addListener` and the `CallbacksManager` events), see [CallbacksManager](./callbacks-manager).

## Creating and managing registries

A registry is identified by a unique ID string within its parent <code>ThermalManager</code>. To create or obtain an existing registry, use <code>manager.registries.addOrGetRegistry</code>:

```ts
import { ThermalManager } from "@labirthermal/core";

// Create the top-level manager
const manager = new ThermalManager();

// Create or retrieve registries
const registryA = manager.registries.addOrGetRegistry( "display-set-a" );
const registryB = manager.registries.addOrGetRegistry( "display-set-b" );

// Calling addOrGetRegistry with an existing ID returns the same instance
const registryASecondRef = manager.registries.addOrGetRegistry( "display-set-a" );
console.log( registryA === registryASecondRef ); // true

// Registries can be configured with optional settings, e.g. histogram resolution
const customRegistry = manager.registries.addOrGetRegistry( "custom-set", {
    histogramResolution: 200
} );

// Remove a registry by ID (destroys the registry and all its groups and instances)
manager.registries.removeRegistry( "display-set-a" );
```

The manager's observable registry collection is available through `manager.registries.value`. Its listeners and hierarchy iterators are described in [ThermalManager](./thermal-manager#registries). Options passed to `addOrGetRegistry` configure a new registry only; retrieving an existing ID does not change its settings.

### Resetting or removing a registry

- `registry.removeAllChildren()` destroys and removes all groups and their file instances, but keeps the registry in its manager.
- `registry.reset()` also resets the registry's opacity and min/max limits. It keeps the registry in its manager and does not reset its temperature range or histogram.
- `registry.destroySelfAndBelow()` performs the same cleanup as `reset()`; it does not remove the registry from its manager.
- `registry.destroySelfInTheManager()` delegates to `manager.registries.removeRegistry(registry.id)`, performing cleanup and removing the registry from the collection.

Use `manager.registries.reset()` to destroy and remove all registries in that manager.

## <code>groups</code>

<PropertyInfo
    handler="GroupsState"
    type="ThermalGroup[]"
    source="packages/core/src/properties/lists/GroupsState.ts"
/>

Within a registry, thermal files are organized into groups represented by <code>ThermalGroup</code>. Groups are stored in the observable <code>registry.groups</code> property.

To create a new group or retrieve an existing one by ID:

```ts
import { ThermalManager, ThermalGroup } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );

// Create or retrieve a group with an optional human-readable name and description
const groupA = registry.groups.addOrGetGroup(
    "morning-series",
    "Morning Series",
    "Recordings captured during morning tests"
);

// Alternatively, instantiate ThermalGroup directly and add it
const groupB = new ThermalGroup( registry, "evening-series", "Evening Series" );
registry.groups.addExistingGroup( groupB );

// Access the list of all groups in the registry
const allGroups: ThermalGroup[] = registry.groups.value;

// Iterate through all groups or all instances across all groups
registry.groups.forEveryGroup( group => console.log( group.label ) );
registry.groups.forEveryInstance( instance => console.log( instance.thermalUrl ) );

// Remove a group by its ID (destroys its instances and clears state)
registry.groups.removeGroup( "morning-series" );

// Listen for group collection changes
registry.groups.addListener( "groups-listener", groups => {
    console.log( "Current groups count:", groups.length );
} );

// Unsubscribe when the listener is no longer needed
registry.groups.removeListener( "groups-listener" );
```

Treat `registry.groups.value` as read-only and use the collection's methods to modify it. The registry also exposes `forEveryGroup` and `forEveryInstance` for the same hierarchy traversal.

### Setter methods

- `registry.groups.addOrGetGroup( id, name?, description? )` – create or retrieve a group.
- `registry.groups.addExistingGroup( group )` – add a directly instantiated `ThermalGroup`.
- `registry.groups.removeGroup( id )` – destroy a group and its instances and remove it.
- `registry.groups.removeAllGroups()` – destroy and remove every group and its instances.

### Events

- `registry.groups.addListener( id, groups => ... )` – listener on the group collection changes.

### Example

The example below shows an implementation of <code>GroupsState</code> using the <code>@labirthermal/webcomponents</code> package. Each [group-provider](../webcomponents/providers/group-provider) placed inside a [registry-provider](../webcomponents/providers/registry-provider) creates or retrieves one group of the registry – see the [context providers guide](../webcomponents/guide/hierarchy).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="registry-groups-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-range-display></registry-range-display>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <group-provider group-slug="group-1">
                <strong>Group 1:</strong>
                <file-provider :thermal="withBase('/files/klokan.lrc')">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
            <group-provider group-slug="group-2">
                <strong>Group 2:</strong>
                <file-provider :thermal="withBase('/files/makak.lrc')">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </div>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="registry-groups-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-range-display></registry-range-display>
        <group-provider group-slug="group-1">
            <strong>Group 1:</strong>
            <file-provider thermal="/files/klokan.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
        <group-provider group-slug="group-2">
            <strong>Group 2:</strong>
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
    handler="MinmaxRegistryProperty"
    type="ThermalMinmaxOrUndefined"
    source="packages/core/src/properties/scale/MinmaxRegistryState.ts"
/>

The <code>registry.minmax</code> property represents the absolute minimum and maximum temperature bounds across all images in the entire registry.

### How minmax is calculated

- **Calculated automatically after all groups and files are loaded**: during batch post-processing (`registry.postLoadedProcessing()`), every group first recalculates its own min/max limits from its instances (`group.minmax.recalculateFromInstances()`).
- Then, the registry calculates its global min/max by aggregating values across all groups (`registry.minmax.recalculateFromGroups()`).
- The property is read-only. Its value is either `{ min: number, max: number }` in degrees Celsius or `undefined` if no files are loaded.

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );

// Read current minmax values
const minmax = registry.minmax.value;

if ( minmax ) {
    console.log( `Registry min: ${minmax.min} °C, max: ${minmax.max} °C` );
    console.log( `Temperature span: ${registry.minmax.distanceInCelsius} °C` );
}

// Listen for minmax updates
registry.minmax.addListener( "minmax-listener", value => {
    if ( value ) {
        console.log( "New minmax bounds:", value.min, value.max );
    }
} );
```

### Setter methods

The property is read-only in normal use; it recalculates itself during the batch post-processing.

- `registry.minmax.recalculateFromGroups()` – recalculate the bounds from the current groups (called automatically by `postLoadedProcessing()`).

### Events

- `registry.minmax.addListener( id, value => ... )` – listener on the bounds changes.

### Example

The example below shows an implementation of <code>MinmaxRegistryProperty</code> using the <code>@labirthermal/webcomponents</code> package. The `registry-ticks-bar` and `registry-range-display` controls visualize the registry's min/max bounds, and `registry-range-full-button` resets the active range to them – see the [thermal range guide](../webcomponents/guide/thermal-range-and-units#thermal-range).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="registry-minmax-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-ticks-bar placement="top"></registry-ticks-bar>
        <registry-range-display></registry-range-display>
        <registry-range-full-button></registry-range-full-button>
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/klokan.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="registry-minmax-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-ticks-bar placement="top"></registry-ticks-bar>
        <registry-range-display></registry-range-display>
        <registry-range-full-button></registry-range-full-button>
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/klokan.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>range</code>

<PropertyInfo
    handler="RangeDriver"
    type="ThermalRangeOrUndefined"
    source="packages/core/src/properties/scale/RangeDriver.ts"
/>

The <code>registry.range</code> property controls the active temperature window (`{ from: number, to: number }`) used to colorize thermograms in the registry. Pixels at or below `from` are mapped to the coldest color of the palette, while pixels at or above `to` are mapped to the hottest color.

### How range works

- **Manual control via `imposeRange`**: you can assign an explicit temperature range at any time using `registry.range.imposeRange({ from, to })`.
- **Automatic initialization**: when files finish loading in `postLoadedProcessing()`, if `range.value` is `undefined`, it is automatically set to the full span `{ from: minmax.min, to: minmax.max }`.
- **Clamping**: any imposed range is validated and clamped to stay within `[minmax.min, minmax.max]`. If new files expand or narrow the registry minmax, the active range is clamped accordingly.
- **Preset helpers**:
  - `registry.range.applyMinmax()` sets the active range to the full min/max limits.
  - `registry.range.applyAuto()` sets an optimal range calculated from the histogram by discarding temperatures with low frequency (bins with relative height < 10%).

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );

// Manually set a custom temperature range
registry.range.imposeRange({ from: 24.0, to: 36.5 });

// Apply the entire minmax span
registry.range.applyMinmax();

// Apply the automatically calculated histogram-based range
registry.range.applyAuto();

// Access current range
const currentRange = registry.range.currentRange; // or registry.range.value

// Listen for range changes
registry.range.addListener( "range-listener", range => {
    if ( range ) {
        console.log( `Range updated: from ${range.from} °C to ${range.to} °C` );
    }
} );
```

### Setter methods

- `registry.range.imposeRange( { from, to } )` – set an explicit range (clamped to the minmax bounds).
- `registry.range.applyMinmax()` – set the range to the full min/max limits.
- `registry.range.applyAuto()` – set the histogram-based automatic range.

### Events

- `registry.range.addListener( id, range => ... )` – listener on the active range changes.
- `registry.range.onAutoValueChanged` – [CallbacksManager](./callbacks-manager) called when the calculated automatic range changes.

### Example

The example below shows an implementation of <code>RangeDriver</code> using the <code>@labirthermal/webcomponents</code> package. The `registry-range-slider` manipulates the registry's range interactively, while `registry-range-auto-button` and `registry-range-full-button` call `applyAuto()` and `applyMinmax()`. The initial range can be set through the `from` and `to` attributes of [registry-provider](../webcomponents/providers/registry-provider) – see the [thermal range guide](../webcomponents/guide/thermal-range-and-units#thermal-range).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="registry-range-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-range-slider></registry-range-slider>
        <div style="margin: 8px 0; display: flex; gap: 8px; align-items: center;">
            <registry-range-display></registry-range-display>
            <registry-range-auto-button></registry-range-auto-button>
            <registry-range-full-button></registry-range-full-button>
        </div>
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/soustruh.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="registry-range-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-range-slider></registry-range-slider>
        <registry-range-display></registry-range-display>
        <registry-range-auto-button></registry-range-auto-button>
        <registry-range-full-button></registry-range-full-button>
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/soustruh.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>histogram</code>

<PropertyInfo
    handler="HistogramState"
    type="ThermalStatistics[]"
    source="packages/core/src/properties/states/HistogramState.ts"
/>

The <code>registry.histogram</code> property contains the statistical distribution of temperatures across **all files and all groups** in the registry.

### How the histogram is calculated

- **Calculated after all groups are loaded**: during batch post-processing, `histogram.recalculateHistogramBufferInWorker()` runs asynchronously in a Web Worker thread.
- **Aggregated from all registry files**: the worker parses thermal data buffers from every instance in every group belonging to this registry, generating a consolidated temperature histogram.
- **Performance & caching**: histogram calculations are cached via `histogramResultCache` to avoid redundant worker processing when file readers are reused.
- The histogram data is used by `registry.range.applyAuto()` to determine optimal temperature limits.
- The property value is an array of <code>ThermalStatistics</code>:
  ```ts
  type ThermalStatistics = {
      from: number;        // Interval start in °C
      to: number;          // Interval end in °C
      percentage: number;  // Percentage of pixels in this bin
      count: number;       // Pixel count in this bin
      height: number;      // Normalized height for display (0-100)
  };
  ```

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );

// Access histogram bins
const bins = registry.histogram.value;

// Listen for histogram updates
registry.histogram.addListener( "hist-listener", data => {
    console.log( "Histogram recalculated with", data.length, "bins" );
} );
```

### Setter methods

- `registry.histogram.setResolution( value )` – change the number of histogram bins and recalculate.
- `registry.histogram.recalculateHistogramBufferInWorker()` – recalculate the histogram in a Web Worker (called automatically by `postLoadedProcessing()`).

### Events

- `registry.histogram.addListener( id, bins => ... )` – listener on the histogram data changes.
- `registry.histogram.onCalculationStart` – [CallbacksManager](./callbacks-manager) called when a recalculation starts.
- `registry.histogram.onCalculationEnd` – [CallbacksManager](./callbacks-manager) called with a success flag when a recalculation finishes.

### Example

The example below shows an implementation of <code>HistogramState</code> using the <code>@labirthermal/webcomponents</code> package. The `registry-histogram` control renders the registry's histogram bins and lets the user expand them into a detailed view.

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="registry-histogram-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-histogram height="80px" expandable="true"></registry-histogram>
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/klokan.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="registry-histogram-demo">
    <registry-provider registry-slug="demo-registry">
        <registry-histogram height="80px" expandable="true"></registry-histogram>
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/klokan.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>opacity</code>

<PropertyInfo
    handler="OpacityDrive"
    type="number"
    source="packages/core/src/properties/display/OpacityDrive.ts"
/>

The <code>registry.opacity</code> property controls the opacity of thermal canvas layers for all instances in this registry. This is especially useful for dual-spectrum cameras where an IR thermogram is overlaid onto a visible-spectrum photograph.

The opacity value is constrained between `0` (completely transparent IR image) and `1` (completely opaque IR image).

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );

// Set opacity and propagate to all instances
registry.opacity.imposeOpacity( 0.6 );

// Access current opacity
const currentOpacity: number = registry.opacity.value;

// Listen for opacity changes
registry.opacity.addListener( "opacity-listener", ( value: number ) => {
    console.log( "Opacity changed:", value );
} );
```

### Setter methods

- `registry.opacity.imposeOpacity( value )` – set the opacity (0–1) and propagate it to all instances.

### Events

- `registry.opacity.addListener( id, value => ... )` – listener on the opacity changes.

### Example

The example below shows an implementation of <code>OpacityDrive</code> using the <code>@labirthermal/webcomponents</code> package. The initial opacity is set through the `opacity` attribute of [registry-provider](../webcomponents/providers/registry-provider) and the user changes it with the `registry-opacity-slider` control.

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider manager-slug="registry-opacity-demo">
    <registry-provider registry-slug="demo-registry" opacity="0.7">
        <registry-opacity-slider></registry-opacity-slider>
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/soustruh.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider manager-slug="registry-opacity-demo">
    <registry-provider registry-slug="demo-registry" opacity="0.7">
        <registry-opacity-slider></registry-opacity-slider>
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/soustruh.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>batch</code>

<PropertyInfo
    handler="BatchLoader"
    source="packages/core/src/loading/batch/BatchLoader.ts"
/>

Files should be loaded through the registry's <code>batch</code> loader, which groups file requests registered within one tick and automatically executes `postLoadedProcessing()` when requests finish. The whole loading pipeline – batching, caching and parser determination – is described in [FilesService & batches](./files-service).

```ts
import {
    ThermalManager,
    ThermalFileInstance,
    ThermalFileFailure
} from "@labirthermal/core";

const manager = new ThermalManager();
const registry = manager.registries.addOrGetRegistry( "display-set" );
const group = registry.groups.addOrGetGroup( "series" );

// Request files to be loaded into a specific group
registry.batch.request(
    "/files/sequence.lrc",
    undefined, // Optional visible light image URL
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
```

### Instance labels

Assign an optional human-readable label to a loaded instance with `result.setLabel("Measurement A")` in a successful batch callback. Read it through `result.label`; it does not change the file name or the source URL.

The deprecated full-load methods, `loadFullOneFile` and `loadFullMultipleFiles`, also accept an optional `label` in each file request and apply it to the created instance. Labels belong to individual instances, so the same source file can have different labels in different groups. For new loading code, prefer the batch loader shown above.

### Setter methods

- `registry.batch.request( thermalUrl, visibleUrl, group, callback, id? )` – register a file request in the current (or a new) batch.
- `registry.batch.closeBatch()` – close the currently open batch.

### Events

- `registry.batch.onBatchComplete` – [CallbacksManager](./callbacks-manager) called with all results whenever a batch finishes.
- `batch.onResolve` – [CallbacksManager](./callbacks-manager) on the `Batch` object returned by `request()`, called with the batch's results.
- `registry.onProcessingStart` / `registry.onProcessingEnd` – [CallbacksManager](./callbacks-manager)s fired around `postLoadedProcessing()`.

## <code>loading</code>

<PropertyInfo
    handler="LoadingState"
    type="boolean"
    source="packages/core/src/properties/states/LoadingState.ts"
/>

Indicates whether the registry is currently loading files. The value is `true` from the first batch request until the last batch finishes.

### Setter methods

- `registry.loading.markAsLoading()` / `registry.loading.markAsLoaded()` – managed automatically by the batch loader; call them only when implementing a custom loading flow.

### Events

- `registry.loading.addListener( id, isLoading => ... )` – listener on the loading state changes.

## Summary of registry controls

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Provider attribute</th>
            <th>Control elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Groups</td>
            <td><code>ThermalGroup[]</code></td>
            <td>–</td>
            <td><code>group-provider</code></td>
        </tr>
        <tr>
            <td>Minmax</td>
            <td><code>{ min, max } | undefined</code></td>
            <td>– (computed)</td>
            <td><code>registry-range-display</code>, <code>registry-ticks-bar</code></td>
        </tr>
        <tr>
            <td>Range</td>
            <td><code>{ from, to } | undefined</code></td>
            <td><code>registry-provider from="20" to="40"</code></td>
            <td><code>registry-range-slider</code>, <code>registry-range-auto-button</code>, <code>registry-range-full-button</code>, <code>registry-range-form</code></td>
        </tr>
        <tr>
            <td>Histogram</td>
            <td><code>ThermalStatistics[]</code></td>
            <td>– (computed)</td>
            <td><code>registry-histogram</code></td>
        </tr>
        <tr>
            <td>Opacity</td>
            <td><code>number (0–1)</code></td>
            <td><code>registry-provider opacity="0.5"</code></td>
            <td><code>registry-opacity-slider</code></td>
        </tr>
    </tbody>
</table>
