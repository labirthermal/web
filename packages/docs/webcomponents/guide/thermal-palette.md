# Thermal palette

<script setup>
import { withBase } from 'vitepress'
</script>

Thermal palette is a key component of displaying IR images. 

Thermal range is bound to `ThermalManager` provider and its value is synchronised to all its files.

## Overview of related elements

<Hierarchy>
    <HierarchyManager :watch="{palette: null, ['advanced-palettes']:null}">
        <p>The thermal palette is controlled on the level of <code>ThermalManager</code>.</p>
            <table>
                <tbody>
                    <tr>
                        <td>manager-palette-dropdown</td>
                        <td><manager-palette-dropdown></manager-palette-dropdown></td>
                    </tr>
                    <tr>
                        <td>manager-palette-buttons</td>
                        <td><manager-palette-buttons></manager-palette-buttons></td>
                    </tr>
                    <tr>
                        <td>manager-advanced-palette-switch</td>                            
                        <td><manager-advanced-palette-switch></manager-advanced-palette-switch></td>
                    </tr>
                </tbody>
            </table>
        <HierarchyRegistry>
            <div class="stack">
            <HierarchyGroup>
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/makak.lrc')"
                    >
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/klokan.lrc')"
                    >
                        <file-canvas></file-canvas>
                    </HierarchyFile>
            </HierarchyGroup>
            <div style="display: flex; flex-direction: column; gap: 2em;">
            <HierarchyGroup>
                <div class="stack">
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/husy.lrc')"
                    >
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
            <HierarchyGroup>
                <div class="stack">
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/kudlanka.lrc')"
                    >
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
            </div>
            </div>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## Constraints

In sake of simplicity, the thermal palettes shown by default are only the most used ones:

- `iron`
- `jet`
- `white_hot`
- `black_hot`

After the `advanced-palettes` attribute is set to `true`, the following palettes becomes available:

- `arctic`
- `lava`
- `rainbow`
- `rainbow_hc`

## Setting default palette via attributes

If you want to have a particular setting by default, you can provide `palette` and/or `advanced-palettes` attribute to the `manager-provider`.

```html
<manager-provider palette="lava" advanced-palettes="true"></manager-provider>
```

These attributes are also supported by the following applications:

```html
<thermal-file-app palette="..."></thermal-file-app>
<thermal-group-app palette="..."></thermal-group-app>
<thermal-dropin-app palette="..."></thermal-dropin-app>
```

Example - a `thermal-file-app` with `lava` as default palette;

<thermal-file-app label="Example of default palette" palette="lava" advanced-palettes="true" :thermal="withBase('/files/makak.lrc')"></thermal-file-app>