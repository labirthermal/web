# Standalone usage

<script setup>
import { withBase } from 'vitepress'
</script>

The <code>@labirthermal/core</code> package can be used directly from TypeScript or through <code>@labirthermal/webcomponents</code>.

## Load a single file

The simpliest possible thing you can do with <code>@labirthermal/core</code> is to load a single file.

:::tabs
== using @labirthermal/core
```ts

import {
    ThermalManager,
    ThermalFileInstance,
    ThermalFileFailure
} from "@labirthermal/core";

// Create the necessary hierarchy
const manager = new ThermalManager();
const registry = manager.addOrGetRegistry( "demo-registry" );
const group = registry.groups.addOrGetGroup( "demo-group" );

// load the file asynchronously
registry.batch.request(
    
    // The URL of the IR image
    "/files/sequence.lrc",

    // An optional URL of the visible file
    undefined, 

    // A group to which the file will be added
    group, 

    // What to do when the file is OK
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
```
== using @labirthermal/webcomponents
The same thing can be done using webcomponents directly in the client
```html
<manager-provider manager-slug="demo-manager">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/sequence.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
:::



## Load multiple files

You can load multiple files at once into a single group.

:::tabs
== using @labirthermal/core
```ts

import {
    ThermalManager,
    ThermalFileInstance,
    ThermalFileFailure
} from "@labirthermal/core";

// Create the necessary hierarchy
const manager = new ThermalManager();
const registry = manager.addOrGetRegistry( "demo-registry" );
const group = registry.groups.addOrGetGroup( "demo-group" );

// Callback for all files - mount the instance into a div
const loadCallback = async (
    result: ThermalFileInstance | ThermalFileFailure 
) => {

    const div = document.createElement( "div" );
    document.body.appendChild( div );

    if ( result instanceof ThermalFileInstance ) {
        result.mountToDom( div );
    } else {
        console.error( `The file was not loaded: ${result.message}` );
    }

}

// URLS to load
const files = [
    "/files/sequence.lrc",
    "/files/klokan.lrc",
    "/files/makak.lrc"
];

// Create a batch object
const batch = registry.batch.createBatch();

// Iterate the files and register them into the batch
for ( const file of files ) {

    batch.request(
        file,
        undefined,
        group, 
        loadCallback
    );

}


// In the next tick, the batch object will fetch files

// After all files are fetched, the callback is triggered

```
== using @labirthermal/webcomponents
The same thing can be done using webcomponents directly in the client
```html
<manager-provider manager-slug="demo-manager">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/sequence.lrc">
                <file-canvas></file-canvas>
            </file-provider>
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

## Control internal properties

You can create any sort of GUI for controlling internal properties of the <code>@labirthermal/core</code>. The example below shows how to load a file and create a dropdown that switches the thermal palette.

:::tabs
== using @labirthermal/core
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

// Load the file asynchronously
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

for ( const palette of Object.values( ThermalPalettes ) ) {
    const button = document.createElement("button");
    document.body.appendChild( button );
    button.textContent = palette.name;
    button.addEventListener( "click", () => {
        manager.palette.setPalette( palette.slug );
    } );
}


```
== using @labirthermal/webcomponents
The same thing can be done using webcomponents directly in the client
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
:::

