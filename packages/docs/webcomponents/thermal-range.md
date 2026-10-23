# Thermal range

<script setup>
import { withBase } from 'vitepress'
</script>

Thermal range is a key part of displaying IR images. It indicates the minimal and maximal temperature, to which is appliad the [thermal palette](./thermal-palette.md).

Thermal range is bound to `ThermalRegistry` provider and its value is synchronised to all its files.

## Overview of related elements

<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry :watch="{from: null, to: null}">
            <p>The thermal scale is controlled on the level of <code>ThermalRegistry</code>.</p>
            <table>
                <tbody>
                    <tr>
                        <td>registry-range-form</td>
                        <td><registry-range-form></registry-range-form></td>
                    </tr>
                    <tr>
                        <td>registry-histogram</td>
                        <td><registry-histogram></registry-histogram></td>
                    </tr>
                    <tr>
                        <td>registry-range-slider</td>                            
                        <td><registry-range-slider></registry-range-slider></td>
                    </tr>
                    <tr>
                        <td>registry-ticks-bar</td>
                        <td><registry-ticks-bar></registry-ticks-bar></td>
                    </tr>
                    <tr>
                        <td>registry-range-button-full</td>
                        <td><registry-range-full-button></registry-range-full-button></td>
                    </tr>
                    <tr>
                        <td>registry-range-button-auto</td>
                        <td><registry-range-auto-button></registry-range-auto-button></td>
                    </tr>
                </tbody>
            </table>
            <div class="stack">
            <HierarchyGroup>
                <table>
                    <tbody>
                        <tr>
                            <td>group-range-propagator</td>
                            <td><group-range-propagator></group-range-propagator></td>
                        </tr>
                    </tbody>
                </table>
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/makak.lrc')"
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>file-range-propagator</td>
                                    <td><file-range-propagator></file-range-propagator></td>
                                </tr>
                            </tbody>
                        </table>
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/klokan.lrc')"
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>file-range-propagator</td>
                                    <td><file-range-propagator></file-range-propagator></td>
                                </tr>
                            </tbody>
                        </table>
                        <file-canvas></file-canvas>
                    </HierarchyFile>
            </HierarchyGroup>
            <HierarchyGroup>
                <table>
                    <tbody>
                        <tr>
                            <td>group-range-propagator</td>
                            <td><group-range-propagator></group-range-propagator></td>
                        </tr>
                    </tbody>
                </table>
                <div class="stack">
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/husy.lrc')"
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>file-range-propagator</td>
                                    <td><file-range-propagator></file-range-propagator></td>
                                </tr>
                            </tbody>
                        </table>
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/kudlanka.lrc')"
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>file-range-propagator</td>
                                    <td><file-range-propagator></file-range-propagator></td>
                                </tr>
                            </tbody>
                        </table>
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
            </div>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## Constraints

Thermal range value is limited to minimal and maximal temperatures of files included in the registry (see `ThermalRegistry.minmax` object).

This implies a functional limitation to the entire `@labirthermal` functionality - **the thermal range can never be outside the temperatures that are actually displayed in the registry**.

## Setting default temperature range via attributes

If you want to have a default temperature range, you can provide the attributes `from` and `to` to the `registry-provider`.

```html
<registry-provider from="0" to="100"></registry-provider>
```

These attributes are also supported by the following applications:

```html
<thermal-file-app from="0" to="100"></thermal-file-app>
<thermal-group-app from="0" to="100"></thermal-group-app>
```

Example - set the default temperature range `from` 25 `to` 30 °C;

<thermal-file-app label="Example of default range" from="25" to="30" :thermal="withBase('/files/makak.lrc')"></thermal-file-app>