# Thermal range and units

<script setup>
import { withBase } from 'vitepress'
</script>

Thermal range and temperature units together define how temperatures are presented to the user:

- **Thermal range** indicates the minimal and maximal temperature, to which is applied the [thermal palette](./thermal-palette.md). It is bound to the registry level and backed by the core class [RangeDriver](../../core/thermal-registry#range).
- **Temperature unit** selects whether temperatures are displayed in Celsius (`C`), Fahrenheit (`F`) or Kelvin (`K`). It is bound to the manager level and backed by the core class [UnitDrive](../../core/thermal-manager#unit).

The two settings cooperate: range controls use the manager's current unit for user-facing values and input, while all internal values and calculations stay in Celsius.

## Thermal range

The thermal range is handled by the core class [RangeDriver](../../core/thermal-registry#range). It is bound to the `ThermalRegistry` provider and its value is synchronised to all its files.

Range controls use the manager's current unit for user-facing values and input. The range display, tick labels, slider tooltip and accessible values, and range-button tooltips follow the selected unit. Changing units does not change the underlying range or highlight: calculations, interactions and registry contexts remain in Celsius. See [Temperature units](#temperature-units).

Analysis tables and graphs also display values in their manager's current unit. The video export preview uses an isolated copy: it starts in the unit of the original file's manager, and its own unit switch can change it independently.

### Overview of related elements

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

### Constraints

Thermal range value is limited to minimal and maximal temperatures of files included in the registry (see the [registry minmax property](../../core/thermal-registry#minmax)).

This implies a functional limitation to the entire `@labirthermal` functionality - **the thermal range can never be outside the temperatures that are actually displayed in the registry**.

### Setting default temperature range via attributes

If you want to have a default temperature range, you can provide the attributes `from` and `to` to the `registry-provider`. Their values use the current unit selected by the enclosing `manager-provider`'s [`unit`](../providers/manager-provider.md#unit) attribute (Celsius when no other unit is selected). The webcomponent converts them to Celsius for the internal range and contexts; changing the unit updates the public attributes without changing the thermal range.

```html
<registry-provider from="0" to="100"></registry-provider>
```

These attributes are also supported by the following applications and use their `unit` attribute's current unit:

```html
<thermal-file-app from="0" to="100"></thermal-file-app>
<thermal-group-app from="0" to="100"></thermal-group-app>
```

Example - set the default temperature range `from` 25 `to` 30 °C (the default unit):

<thermal-file-app label="Example of default range" from="25" to="30" :thermal="withBase('/files/makak.lrc')"></thermal-file-app>

## Temperature units

The temperature unit is handled by the core class [UnitDrive](../../core/thermal-manager#unit). It is a **manager-level setting**: it is owned by the `ThermalManager` and shared by everything under one [manager-provider](../providers/manager-provider.md). There is no per-registry or per-file unit.

### The principle

1. **All internal values stay in Celsius.** The core objects, the context values (range, min/max, highlight, cursor temperatures) and all calculations always use Celsius, regardless of the selected unit.
2. **The unit affects only the display and user input.** Rendered temperatures, tooltips, tick labels, analysis tables and graphs, and the values the user types into forms follow the current unit.
3. **Public range attributes follow the current unit.** The [`from`](../providers/registry-provider.md#from) and [`to`](../providers/registry-provider.md#to) attributes of a `registry-provider` are written and read in the current unit. When the unit changes, these attributes are rewritten to the equivalent values in the new unit while the underlying range stays the same.

### Where the unit is set

#### The `unit` attribute

Set the initial unit with the [`unit`](../providers/manager-provider.md#unit) attribute of `manager-provider`. The applications [thermal-file-app](../applications/thermal-file-app.md#unit) and [thermal-group-app](../applications/thermal-group-app.md#unit) expose the same attribute and pass it to their internal manager.

```html
<manager-provider unit="F">
    <!-- everything below displays Fahrenheit -->
</manager-provider>

<thermal-file-app unit="K" thermal="/files/makak.lrc"></thermal-file-app>
```

The value is case-insensitive (`f` and `F` are the same). An unrecognized value is treated like an omitted attribute:

- a **new manager** starts in Celsius,
- a **reused manager** (shared through [`manager-slug`](../providers/manager-provider.md#manager-slug)) keeps its current unit, while an explicit valid `unit` sets the shared unit for all providers of that manager.

#### The `manager-unit-switch` control

Place the `manager-unit-switch` consumer anywhere inside the provider to let the user change the unit at runtime. The reflected `unit` attribute of the provider updates accordingly.

#### JavaScript

For imperative integrations, use the manager provider's `managerController`:

```js
const provider = document.querySelector("manager-provider");
provider.managerController.setUnit("F");

// Conversion helpers of the same controller:
provider.managerController.toCurrentUnit(25);   // Celsius → current unit
provider.managerController.fromCurrentUnit(77); // current unit → Celsius
provider.managerController.formatSingle(77);    // formatted with the unit symbol
```

`setUnit()` normalizes the value case-insensitively; a missing or invalid value falls back to Celsius. It updates the core manager, the context and the host attribute together.

### What follows the unit

- The range controls: `registry-range-form` inputs, `registry-range-display`, `registry-ticks-bar` labels, `registry-range-slider` tooltips and accessible values, and range-button tooltips.
- Analysis tables and graphs display values in their manager's current unit.
- The video export preview uses an isolated copy of the hierarchy: it starts in the unit of the original file's manager and its own unit switch changes it independently.
- The `from`/`to` attributes of `registry-provider` (see [Thermal range](#thermal-range)).

### Live example

Switch the unit and watch the `unit` attribute of the manager and the `from`/`to` attributes of the registry change, while the displayed range stays physically the same.

<Hierarchy>
    <HierarchyManager watch="unit">
        <WebcomponentTable components="manager-unit-switch" />
        <HierarchyRegistry watch="from, to" from="20" to="35">
            <WebcomponentTable components="registry-range-form,registry-range-slider, registry-ticks-bar" />
            <HierarchyGroup>
                <HierarchyFile watch="thermal" :thermal="withBase('/files/makak.lrc')">
                    <file-canvas></file-canvas>
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>
