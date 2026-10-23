# Load multiple files

<script setup>
import { withBase } from 'vitepress'
</script>

You can load multiple files at once into a single group. This page demonstrates, how to do it in two ways:
- a) manually **in TypeScript**
- b) **using webcomponents** who do the exact TypeScript work for you

## In TypeScript

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

## Using webcomponents

A similar thing can be done using webcomponents directly in the client.

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

In the result, you see that the files in one <code>ThermalRegistry</code> (resp. in one <code>registry-provider</code>) share their display properties. We will learn how to control display properties later. 

<manager-provider manager-slug="demo-manager">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/sequence.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
            <file-provider :thermal="withBase('/files/klokan.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
            <file-provider :thermal="withBase('/files/makak.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>