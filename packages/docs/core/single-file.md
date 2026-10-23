# Load a single file

<script setup>
import { withBase } from 'vitepress'
</script>

The simpliest possible thing you can do with <code>@labirthermal/core</code> is to load a single file. This page demonstrates, how to do it in two ways:
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

// Load the file asynchronously
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

## Using webcomponents

The similar functionality can be achieved using <code>@labirthermal/webcomponents</code>.

```html
<manager-provider manager-slug="demo-manager">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider thermal="/files/makak.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```

The result:


<manager-provider manager-slug="demo-manager">
    <registry-provider registry-slug="demo-registry">
        <group-provider group-slug="demo-group">
            <file-provider :thermal="withBase('/files/makak.lrc')">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>