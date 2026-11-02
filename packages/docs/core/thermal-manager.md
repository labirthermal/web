# ThermalManager

<script setup>
import { withBase } from 'vitepress'
</script>

The <code>ThermalManager</code> is the top-level context of an application. It owns shared services and settings, including the thermal palette, image smoothing and tools.

## Nested registries

There can be multiple <code>ThermalRegistry</code> objects within one <code>ThermalManager</code>. The observable <code>manager.registries</code> property (`RegistriesState`) manages this collection. Each registry is identified by a unique ID within its manager. To create or retrieve a registry, use <code>manager.registries.addOrGetRegistry</code>:

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

## Thermal palette property

Palette is a property of <code>ThermalManager</code> and is shared across all registries, groups and instances within one manager.

The manager's <code>PaletteDrive</code> exposes the current key and palette definition:

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

Webcomponents example below shows how <code>@labirthermal/webcomponents</code> implements the functionality related to.

:::tabs
== Interactive demo
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
<!-- See how the default palette is set in manager provider -->
<manager-provider advanced-palettes="true" palette="lava">
    <!-- Display the buttons -->
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

## IR image smoothing property

The <code>smooth</code> property controls whether IR images are rendered smoothly or with pixelated edges.

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

Webcomponents example below shows how <code>@labirthermal/webcomponents</code> implements the related functionality.

:::tabs
== Interactive demo
<manager-provider advanced-palettes="true" palette="lava" manager-slug="manager-demo">
    <!-- Display the buttons -->
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
<!-- See how the default palette is set in manager provider -->
<manager-provider advanced-palettes="true" palette="lava">
    <!-- Display the buttons -->
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


## Tool property

To work with thermal images, we need tools. The current tool setting is shared across the entire context.

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

:::tabs
== Interactive demo
<!-- See how the default palette is set in manager provider -->
<manager-provider advanced-palettes="true" palette="lava" manager-slug="tool-demo">
    <!-- Display the buttons -->
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
<!-- See how the default palette is set in manager provider -->
<manager-provider advanced-palettes="true" palette="lava">
    <!-- Display the buttons -->
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

## Internal objects

### pool

The worker pool used for asynchronous file processing.

### registries

The observable registry collection (`RegistriesState`). Read its current array through `manager.registries.value`; use its creation, removal, iteration and listener methods as described in [Nested registries](#nested-registries).

### service

The service used to load and cache files.

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Core scope</th>
            <th>Sets via provider atribute</th>
            <th>Control elements</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Thermal palette</td>
            <td><code>ThermalManager</code></td>
            <td><code>manager-provider palette="iron"</code></td>
            <td><code>manager-palette-dropdown</code> or <code>manager-palette-buttons</code></td>
        </tr>
        <tr>
            <td>IR image smoothing</td>
            <td><code>ThermalManager</code></td>
            <td><code>manager-provider smooth-thermograms="true"</code></td>
            <td><code>manager-image-smooth-switch</code></td>
        </tr>
        <tr>
            <td>Active tool</td>
            <td><code>ThermalManager</code></td>
            <td><code>manager-provider tool="inspect"</code></td>
            <td><code>manager-tool-bar</code></td>
        </tr>
    </tbody>
</table>
