# Creating controls

<script setup>
import { withBase } from 'vitepress'
</script>

The <code>@labirthermal/core</code> package and its classes contain lots of various properties, that you can use to build complex interfaces. All of them are integrated as webcomponents in <code>@labirthermal/webcomponents</code>. 

If you want to create your own GUI, here is a simple showcase for building buttons that switch the palette of displayed images.

## In TypeScript

```ts

import {
    ThermalManager,
    ThermalFileInstance,
    ThermalFileFailure,
    ThermalPalettes
} from "@labirthermal/core";

// Create the necessary hierarchy
const manager = new ThermalManager();
const registry = manager.addOrGetRegistry( "demo-registry" );
const group = registry.groups.addOrGetGroup( "demo-group" );

// load the file asynchronously
registry.batch.request(
    "/files/sequence.lrc",
    undefined, 
    group, 
    async ( result: ThermalFileInstance | ThermalFileFailure ) => {

        const div = document.createElement( "div" );
        document.body.appendChild( div );

        if ( result instanceof ThermalFileInstance ) {
            result.mountToDom( div );
        } else if ( result instanceof ThermalFileFailure ) {
            console.error( "The file was not loaded", result.message );
        }

    }
);

// Build the buttons to control the thermal palette
for ( const palette of Object.values( ThermalPalettes ) ) {
    const button = document.createElement("button");
    document.body.appendChild( button );
    button.textContent = palette.name;
    button.addEventListener( "click", () => {
        manager.palette.setPalette( palette.slug );
    } );
}

```

## Using webcomponents

```html
<manager-provider manager-slug="demo-manager">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/sequence.lrc">
                <manager-palette-dropdown></manager-palette-dropdown>
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```

See the result:

<manager-provider manager-slug="demo-manager">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/makak.lrc')">
                <manager-palette-buttons></manager-palette-buttons>
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>

## A complex example

The following webcomponents example shows more internal properties of <code>@labirthermal/core</code> controlled by <code>@labirthermal/webcomponents</code>.

Before the example, here are two commonly used controls:

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
            <td>Opacity of IR images</td>
            <td><code>ThermalRegistry</code></td>
            <td><code>registry-provider opacity="0.2"</code></td>
            <td><code>registry-opacity-slider</code></td>
        </tr>
    </tbody>
</table>

```html
<manager-provider manager-slug="demo-manager">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/sequence.lrc">
                
                <code>manager-palette-dropdown</code>
                <manager-palette-dropdown></manager-palette-dropdown>

                <code>manager-palette-buttons</code>
                <manager-palette-buttons></manager-palette-buttons>

                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```