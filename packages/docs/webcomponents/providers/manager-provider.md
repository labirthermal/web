# manager-provider

<script setup>
import { withBase } from 'vitepress'
</script>

<ComponentInfo tag="manager-provider" category="Provider">

Provides manager-level context, including the global manager, display palette and temperature unit. No provider is required above it. See the [context hierarchy](../guide/hierarchy.md) for its place among the providers and [Thermal palette](../guide/thermal-palette.md) for palette behavior.

</ComponentInfo>

## Available controls

These webcomponents read the context of the enclosing `manager-provider` and are intended for direct use in your markup. Place them inside the manager provider, outside its registry providers.

<Hierarchy>
    <HierarchyManager :watch="{ palette: 'jet', 'advanced-palettes': false, 'smooth-thermograms': false, 'smooth-graph': false, tool: 'inspect' }">
        <WebcomponentTable components="manager-palette-dropdown, manager-palette-buttons, manager-advanced-palette-switch, manager-unit-switch, manager-image-smooth-switch, manager-graph-smooth-switch, manager-tool-bar" />
        <HierarchyRegistry>
            <HierarchyGroup>
                <HierarchyFile watch="thermal, analysis1" :thermal="withBase('/files/husy.lrc')" analysis1="Rectangle 0;rectangle;color:Blue;top:54;left:64;width:64;height:47;avg">
                    <file-canvas></file-canvas>
                    <file-analysis-graph></file-analysis-graph>
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## Attributes

Only public HTML attributes are listed here. `managerController`, `managerObject` and other implementation properties are JavaScript properties, not attributes.

<ComponentAttribute name="manager-slug" type="string">

Identifies the manager used by this provider. If omitted, the component checks `slug`; if both are omitted, it generates an ID. Providers with the same manager slug reuse the same manager from the global manager registry. If both `manager-slug` and `slug` are set, `manager-slug` takes precedence. This attribute does not reflect property changes back to the HTML attribute.

<ComponentExample>

```html
<manager-provider manager-slug="dashboard">
    <manager-palette-dropdown></manager-palette-dropdown>
</manager-provider>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="slug" type="string">

Alternative public identifier for the manager. It is used only when `manager-slug` is omitted. With neither attribute set, the component generates an ID. Prefer `manager-slug` when describing the manager identity explicitly.

<ComponentExample>

```html
<manager-provider slug="dashboard">
    <manager-palette-dropdown></manager-palette-dropdown>
</manager-provider>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="palette" type="'iron' | 'jet' | 'white_hot' | 'black_hot' | 'lava' | 'arctic' | 'rainbow' | 'rainbow_hc'" default="jet">

Sets the manager's display palette. Empty or invalid values fall back to `jet`. See [Thermal palette](../guide/thermal-palette.md) for the available choices.

<ComponentExample>

```html
<manager-provider palette="lava">
    <manager-palette-dropdown></manager-palette-dropdown>
</manager-provider>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="advanced-palettes" type="boolean" default="false" tag="manager-provider">

When `advanced-palettes` is present, the palette controls offer the extended palette choices. Set it when `palette` is one of the advanced choices.

<ComponentExample>

```html
<manager-provider advanced-palettes>
    <manager-palette-dropdown></manager-palette-dropdown>
    <manager-advanced-palette-switch></manager-advanced-palette-switch>
</manager-provider>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="unit" type="'C' | 'F' | 'K'" default="C">

Selects the temperature unit used for displayed values and user-entered temperatures. Values are case-insensitive. On initial connection, an unrecognized value is treated like an omitted attribute: a new manager starts in Celsius, while a reused manager keeps its current unit. Internally, temperatures remain in Celsius. See the [temperature units guide](../guide/thermal-range-and-units.md#temperature-units) for the full behavior.

When multiple providers share a manager through `manager-slug`, an explicit valid `unit` sets the shared unit. If `unit` is omitted, the provider uses the manager's current unit; a new manager starts in Celsius. The `manager-unit-switch` control can change the unit later.

<ComponentExample>

```html
<manager-provider manager-slug="temperature-display" unit="F">
    <manager-unit-switch></manager-unit-switch>
    <registry-provider>
        <registry-range-form></registry-range-form>
        <registry-histogram></registry-histogram>
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>
        <group-provider>
            <file-provider thermal="/files/husy.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="smooth-thermograms" type="boolean" default="false" tag="manager-provider">

When `smooth-thermograms` is present, thermal images start in the smoothed rendering mode. Descendant `manager-image-smooth-switch` controls the same manager setting.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider smooth-thermograms>
        <manager-image-smooth-switch></manager-image-smooth-switch>
        <registry-provider>
            <group-provider>
                <file-provider thermal="/files/husy.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="smooth-graph" type="boolean" default="false" tag="manager-provider">

When `smooth-graph` is present, analysis graphs start in the smoothed rendering mode. Descendant `manager-graph-smooth-switch` controls the same manager setting.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider smooth-graph>
        <manager-graph-smooth-switch></manager-graph-smooth-switch>
        <registry-provider>
            <group-provider>
                <file-provider thermal="/files/husy.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="tool" type="'inspect' | 'add-point' | 'add-rect' | 'add-ellipsis' | 'edit'" default="inspect">

Selects the manager's initial analysis tool. An unsupported value falls back to `inspect`. The `manager-tool-bar` consumer displays and changes the active tool.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider tool="add-point">
        <manager-tool-bar tooltip-placement="top" horizontal></manager-tool-bar>
        <br />
        <registry-provider>
            <group-provider>
                <file-provider thermal="/files/husy.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>

</ComponentAttribute>

## Examples

### One manager, multiple files

The palette controls are manager consumers; they read and change the context provided by the nearest `manager-provider`. The manager wraps two registries, each with a group containing multiple files.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider palette="iron">
        <manager-palette-dropdown></manager-palette-dropdown>
        <manager-palette-buttons></manager-palette-buttons>
        <br />
        <registry-provider>
            <group-provider>
                <div class="stack">
                    <file-provider thermal="/files/makak.lrc">
                        <file-canvas></file-canvas>
                    </file-provider>
                    <file-provider thermal="/files/klokan.lrc">
                        <file-canvas></file-canvas>
                    </file-provider>
                </div>
            </group-provider>
            <group-provider>
                <file-provider thermal="/files/husy.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
        <registry-provider>
            <group-provider>
                <file-provider thermal="/files/husy.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>

### Sharing a manager context

Two `manager-provider` elements with the same `manager-slug` reuse the same manager object. Palette and unit changes made by controls in either branch are reflected by the controls and files in the other branch. An explicit `unit` attribute sets the shared unit; if it is omitted, the provider keeps the manager's current unit. Each branch still has its own registry and group.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider manager-slug="shared-display-example" palette="jet">
        <manager-palette-dropdown></manager-palette-dropdown>
        <br />
        <registry-provider>
            <group-provider>
                <file-provider thermal="/files/makak.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>
    <manager-provider manager-slug="shared-display-example">
        <manager-palette-buttons></manager-palette-buttons>
        <manager-advanced-palette-switch></manager-advanced-palette-switch>
        <registry-provider>
            <group-provider>
                <file-provider thermal="/files/klokan.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>

### Direct control through the reactive manager controller

For imperative integrations, the provider exposes its `managerController` as a JavaScript property, not as an HTML attribute. Its public setters update the manager, reflected host attributes and context consumers together. This example changes the palette, advanced-palette availability, smoothing and active tool; the adjacent controls reflect those updates and remain usable.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider palette="jet">
        <manager-palette-dropdown></manager-palette-dropdown>
        <manager-palette-buttons></manager-palette-buttons>
        <manager-advanced-palette-switch></manager-advanced-palette-switch>
        <manager-image-smooth-switch></manager-image-smooth-switch>
        <manager-graph-smooth-switch></manager-graph-smooth-switch>
        <manager-tool-bar></manager-tool-bar>
        <thermal-btn
            variant="primary"
            onclick="
                const provider = this.closest('manager-provider');
                provider.managerController.setPalette('lava');
                provider.managerController.setAdvancedPalettes(true);
                provider.querySelector('output').textContent = 'Controller selected lava and enabled advanced palettes.';
            "
        >Set palette through controller</thermal-btn>
        <thermal-btn
            onclick="
                const provider = this.closest('manager-provider');
                provider.managerController.setSmoothThermograms(true);
                provider.managerController.setSmoothGraph(true);
                provider.managerController.setTool(provider.managerObject.tool.tools['add-point']);
                provider.querySelector('output').textContent = 'Controller enabled smoothing and selected the add-point tool.';
            "
        >Set smoothing and tool</thermal-btn>
        <output aria-live="polite">Use a button to update the shared manager state.</output>
        <br />
        <br />
        <registry-provider>
            <group-provider>
                <file-provider thermal="/files/husy.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>
