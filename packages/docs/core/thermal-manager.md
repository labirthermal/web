# ThermalManager

<script setup>
import { withBase } from 'vitepress'
</script>

The <code>ThermalManager</code> is the top-level context of an application. It owns shared services and settings, including the thermal palette, image smoothing and tools.

For the reactivity mechanisms used below (`addListener` and the `CallbacksManager` events), see [CallbacksManager](./callbacks-manager).

## <code>registries</code>

<PropertyInfo
    handler="RegistriesState"
    type="ThermalRegistry[]"
    source="packages/core/src/properties/lists/RegistriesState.ts"
/>

There can be multiple <code>ThermalRegistry</code> objects within one <code>ThermalManager</code>. The observable <code>manager.registries</code> property manages this collection. Each registry is identified by a unique ID within its manager. To create or retrieve a registry, use <code>manager.registries.addOrGetRegistry</code>:

```ts
import { ThermalManager } from "@labirthermal/core";

// Create the manager
const manager = new ThermalManager();

// Create two registries
const registryA = manager.registries.addOrGetRegistry( "registry-a" );
const registryB = manager.registries.addOrGetRegistry( "registry-b" );

// Get the reference on an existing registry
const registryAForTheSecondTime = manager.registries.addOrGetRegistry( "registry-a" );

// Both references point to the same object
const referencesAreEqual = registryA === registryAForTheSecondTime; // true

// Remove a registry by its ID
manager.registries.removeRegistry( "registry-a" );
```

### Reading and observing the collection

`manager.registries.value` contains the current array of registries in insertion order. Treat this array as read-only: use the collection's methods rather than mutating the array, so its ID index and change listeners stay in sync.

```ts
const registries = manager.registries.value;
console.log( "Number of registries:", registries.length );

manager.registries.addListener( "registry-list", currentRegistries => {
    console.log( "Current registries:", currentRegistries.map( registry => registry.id ) );
} );

manager.registries.addOrGetRegistry( "new-registry" );
manager.registries.removeRegistry( "new-registry" );

// Unsubscribe when the listener is no longer needed
manager.registries.removeListener( "registry-list" );
```

Listeners receive the updated array after a registry is added or removed, or the collection is reset. Adding a listener does not immediately invoke it; read `.value` for the initial state. Retrieving an existing registry or removing an unknown ID does not change the collection or notify listeners.

The optional settings passed to `addOrGetRegistry(id, options)` are applied only when a registry is created. Calling it again with the same ID returns the existing object without reconfiguring it.

### Iterating through the hierarchy

The collection provides iterators for every level below the manager:

```ts
manager.registries.forEveryRegistry( registry => {
    console.log( "Registry:", registry.id );
} );

manager.registries.forEveryGroup( group => {
    console.log( "Group:", group.label );
} );

manager.registries.forEveryInstance( instance => {
    console.log( "File:", instance.fileName );
} );

// Collect all file instances into a new array
const instances = manager.getInstances();
```

### Removing registries and cleaning up

`manager.registries.removeRegistry(id)` destroys the registry's groups and their file instances, resets its opacity and min/max limits, and removes it from the collection. Removing an unknown ID has no effect.

To destroy and remove all registries at once, use `manager.registries.reset()`. It clears the ID index and notifies collection listeners once with an empty array. The listeners remain registered.

```ts
manager.registries.reset();
console.log( manager.registries.value.length ); // 0
```

`manager.removeAllChildren()` also destroys and removes all registries, but removes them individually. `manager.reset()` resets the manager's shared settings and does not remove its registries. Use `manager.destroySelfAndBelow()` to remove all registries and reset the shared settings together.

### Setter methods

- `manager.registries.addOrGetRegistry( id, options? )` – create or retrieve a registry.
- `manager.registries.removeRegistry( id )` – destroy and remove a registry.
- `manager.registries.reset()` – destroy and remove all registries.

### Events

- `manager.registries.addListener( id, registries => ... )` – listener on the collection changes (add, remove, reset).

## <code>palette</code>

<PropertyInfo
    handler="PaletteDrive"
    type="AvailableThermalPalette"
    source="packages/core/src/properties/scale/PaletteDrive.ts"
/>

The thermal palette used to colour the IR images. The palette is shared across all registries, groups and instances within one manager. The value is the string key of the current palette; the full palette definition is available through <code>manager.palette.currentPalette</code>.

```ts
// Object containing all available pallettes and their data
import { ThermalManager, ThermalPalettes } from "@labirthermal/core";

// Type containing all available palette keys that can be used in setPalette
import type { AvailableThermalPalette } from "@labirthermal/core";

const manager = new ThermalManager();

// Access the current value
const keyOfTheCurrentPalette = manager.palette.value;
const currentPaletteObject = manager.palette.currentPalette;
const availablePaletteKeys = Object.keys( ThermalPalettes );

// Set a palette and redraw the files managed by this manager
manager.palette.setPalette( "lava" );

// Listen to palette value change
manager.palette.addListener(
    "id-of-the-listener",
    ( value: AvailableThermalPalette ) => {
        console.log( "The palette has changed", value );
    }
);

```

Available thermal palette keys:

- <code>iron</code>
- <code>jet</code>
- <code>white_hot</code>
- <code>black_hot</code>
- <code>lava</code>
- <code>arctic</code>
- <code>rainbow</code>
- <code>rainbow_hc</code>

### Setter methods

- `manager.palette.setPalette( key )` – set the palette and redraw all files of this manager.

### Events

- `manager.palette.addListener( id, key => ... )` – listener on the palette key changes.

### Example

The example below shows an implementation of <code>PaletteDrive</code> using the <code>@labirthermal/webcomponents</code> package. The default palette is set through the `palette` attribute of [manager-provider](../webcomponents/providers/manager-provider) and the user switches palettes with the `manager-palette-buttons` control. See also the [thermal palette guide](../webcomponents/guide/thermal-palette).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider advanced-palettes="true" palette="lava" manager-slug="thermal-palette-demo">
    <manager-palette-buttons></manager-palette-buttons>
    <registry-provider>
        <group-provider>
            <file-provider :thermal="withBase('/files/klokan.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider advanced-palettes="true" palette="lava">
    <manager-palette-buttons></manager-palette-buttons>
    <registry-provider>
        <group-provider>
            <file-provider thermal="/files/klokan.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>smooth</code>

<PropertyInfo
    handler="SmoothDrive"
    type="boolean"
    source="packages/core/src/properties/display/SmoothDrive.ts"
/>

Controls whether IR images are rendered smoothly or with pixelated edges.

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();

// Access the current value
const currentValue: boolean = manager.smooth.value;
const newValue: boolean = false;

// Set image smoothing
manager.smooth.setSmooth( newValue );

// Listen for changes
manager.smooth.addListener(
    "id-of-the-listener",
    ( value: boolean ) => {
        console.log( "The image smoothing has changed", value );
    }
);

```

### Setter methods

- `manager.smooth.setSmooth( value )` – turn the image smoothing on or off.

### Events

- `manager.smooth.addListener( id, value => ... )` – listener on the smoothing changes.

### Example

The example below shows an implementation of <code>SmoothDrive</code> using the <code>@labirthermal/webcomponents</code> package. The `manager-image-smooth-switch` control toggles the manager's `smooth` property; the initial value can be set through the `smooth-thermograms` attribute of [manager-provider](../webcomponents/providers/manager-provider).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider advanced-palettes="true" palette="lava" manager-slug="manager-demo">
    <manager-image-smooth-switch></manager-image-smooth-switch>
    <span>Use the buttons to change image smoothing</span>
    <registry-provider>
        <group-provider>
            <file-provider :thermal="withBase('/files/soustruh.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider advanced-palettes="true" palette="lava">
    <manager-image-smooth-switch></manager-image-smooth-switch>
    <span>Use the buttons to change image smoothing</span>
    <registry-provider> 
        <group-provider>
            <file-provider thermal="/files/soustruh.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::


## <code>graphSmooth</code>

<PropertyInfo
    handler="GraphSmoothDrive"
    type="boolean"
    source="packages/core/src/properties/display/GraphSmoothDrive.ts"
/>

Controls whether analysis graphs are drawn with smooth curves or with straight line segments.

### Setter methods

- `manager.graphSmooth.setGraphSmooth( value )` – turn the graph smoothing on or off.

### Events

- `manager.graphSmooth.addListener( id, value => ... )` – listener on the graph smoothing changes.

## <code>tool</code>

<PropertyInfo
    handler="ToolDrive"
    type="ThermalTool"
    source="packages/core/src/properties/analysis/tool/ToolDrive.ts"
/>

To work with thermal images, we need tools. The current tool setting is shared across the entire context. The value is the current tool object; tools are selected by their key (`inspect`, `edit`, `add-point`, `add-rect`, `add-ellipsis`).

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();

// The current tool is a tool object; select a tool by its key
const currentTool = manager.tool.value;
const newTool: keyof typeof manager.tool.tools = "inspect";

manager.tool.selectTool( newTool );

// Listen for tool changes
manager.tool.addListener(
    "id-of-the-listener",
    value => {
        console.log( "The tool has changed", value.key );
    }
);

```

### Setter methods

- `manager.tool.selectTool( keyOrTool )` – select the active tool.

### Events

- `manager.tool.addListener( id, tool => ... )` – listener on the active tool changes.

### Example

The example below shows an implementation of <code>ToolDrive</code> using the <code>@labirthermal/webcomponents</code> package. The `manager-tool-bar` control selects the manager's active tool; the initial tool can be set through the `tool` attribute of [manager-provider](../webcomponents/providers/manager-provider).

:::tabs
== @labirthermal/webcomponents implementation
<manager-provider advanced-palettes="true" palette="lava" manager-slug="tool-demo">
    <manager-tool-bar horizontal="true"></manager-tool-bar>
    <span>Use the buttons to change the tool and interact with the image.</span>
    <registry-provider> 
        <group-provider>
            <file-provider :thermal="withBase('/files/soustruh.lrc')">
                <file-canvas></file-canvas>
                <file-analysis-table></file-analysis-table>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
== HTML source
```html
<manager-provider advanced-palettes="true" palette="lava">
    <manager-tool-bar horizontal="true"></manager-tool-bar>
    <span>Use the buttons to change the tool and interact with the image.</span>
    <registry-provider> 
        <group-provider>
            <file-provider thermal="/files/soustruh.lrc">
                <file-canvas></file-canvas>
                <file-analysis-table></file-analysis-table>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::

## <code>unit</code>

<PropertyInfo
    handler="UnitDrive"
    type="ThermalUnit"
    source="packages/core/src/properties/scale/UnitDrive.ts"
/>

The temperature unit used for display and formatting. Internally, all temperatures are stored in degrees Celsius; the unit drive converts values for display.

```ts
import { ThermalManager, ThermalUnit } from "@labirthermal/core";

const manager = new ThermalManager();

// Access the current unit
const currentUnit: ThermalUnit = manager.unit.value;

// Format a value (stored in °C) in the current unit
const formatted = manager.unit.formatSingle( 36.6 );

// Convert between Celsius and the current unit
const inCurrentUnit = manager.unit.celsiusToCurrent( 36.6 );
const backInCelsius = manager.unit.currentToCelsius( inCurrentUnit );
```

### Setter methods

- `manager.unit.set( key )` – set the unit by its key.
- `manager.unit.setCelsius()` / `manager.unit.setFahrenheit()` / `manager.unit.setKelvin()` – set a concrete unit.

### Events

- `manager.unit.addListener( id, unit => ... )` – listener on the unit changes.

## Internal objects

### <code>pool</code>

The worker pool used for asynchronous file processing. All parsing jobs of the manager's files run through this pool.

### <code>service</code>

The [FilesService](./files-service) used to load, parse and cache files. One instance per manager; the cache of loaded files is shared by all registries and groups of this manager.

### <code>filters</code>

The manager-level `FilterContainer` of the experimental filter system.
