# registry-provider

<script setup>
import { withBase } from 'vitepress'
</script>

<ComponentInfo tag="registry-provider" category="Provider" :requires="['manager-provider']">

Provides a registry scope for its descendants. A `registry-provider` must be inside a `manager-provider`; the registry is scoped to that parent manager. See the [hierarchy overview](../guide/hierarchy.md) and [thermal range guide](../guide/thermal-range-and-units.md#thermal-range).

</ComponentInfo>

## Available controls

These webcomponents read the context of the enclosing `registry-provider` and are intended for direct use in your markup. Place them inside the registry provider, outside its group providers.

<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry :watch="{ from: null, to: null, opacity: 1 }" from="20" to="35">
            <WebcomponentTable components="registry-range-slider, registry-histogram, registry-ticks-bar, registry-range-display, registry-range-form, registry-range-auto-button, registry-range-full-button, registry-opacity-slider" />
            <HierarchyGroup>
                <div class="stack">
                    <HierarchyFile watch="thermal" :thermal="withBase('/files/husy.lrc')">
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal" :thermal="withBase('/files/klokan.lrc')">
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## Attributes

<ComponentAttribute name="registry-slug" type="string">

Identifies the registry within its parent manager. If omitted, a UUID is generated. Providers with the same slug under the same manager share a `ThermalRegistry`.

</ComponentAttribute>

<ComponentAttribute name="from" type="number">

Sets the lower endpoint of the thermal range in the current unit selected by the enclosing `manager-provider`'s [`unit`](./manager-provider.md#unit). The range is applied only when both `from` and [`to`](#to) are set; if either is unset, the range is cleared. When the unit changes, the attribute is updated to the equivalent value in the new unit. Core values and range contexts remain in Celsius.

</ComponentAttribute>

<ComponentAttribute name="to" type="number">

Sets the upper endpoint of the thermal range in the current unit selected by the enclosing `manager-provider`'s [`unit`](./manager-provider.md#unit). The range is applied only when both [`from`](#from) and `to` are set; if either is unset, the range is cleared. When the unit changes, the attribute is updated to the equivalent value in the new unit. Core values and range contexts remain in Celsius.

</ComponentAttribute>

<ComponentAttribute name="opacity" type="number" default="1">

Blending between the thermal and visible images of all files in the registry. `0` shows only the visible images, `1` shows only the thermograms. Values are clamped to the `0`–`1` range; an invalid value falls back to `1`. Later changes, for example from `registry-opacity-slider`, are reflected back to the attribute. A visible image must be supplied by each `file-provider`'s [`visible`](./file-provider.md#visible) attribute, otherwise the thermogram is displayed regardless of the opacity.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider>
        <registry-provider opacity="0.5">
            <registry-opacity-slider></registry-opacity-slider>
            <group-provider>
                <file-provider
                    thermal="/files/makak.lrc"
                    visible="/files/kitten.jpg"
                >
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="is-loading" type="boolean" default="false">

Read-only output. The component sets `is-loading` while the registry is loading its files and removes it when loading finishes. Writing the attribute from outside has no effect — the component overwrites it with the internal loading state. Because it is reflected, it can be used as a CSS hook:

```css
registry-provider[is-loading] {
    opacity: 0.5;
}
```

</ComponentAttribute>

## Examples

### One registry with multiple files

The range controls below are consumers of the surrounding registry context. Both files share that registry's thermal range and histogram, while belonging to the same group.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider>
        <registry-provider from="20" to="35">
            <registry-range-form></registry-range-form>
            <registry-range-slider></registry-range-slider>
            <registry-range-display></registry-range-display>
            <registry-histogram></registry-histogram>
            <registry-ticks-bar></registry-ticks-bar>
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
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>

### Sharing a registry context

Two `registry-provider` elements with the same `registry-slug` under one manager share the range, opacity and histogram context. The first branch contains images; the second branch contains registry controls that change the shared context.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider>
        <registry-provider registry-slug="shared-range-example">
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
        </registry-provider>
        <registry-provider registry-slug="shared-range-example">
            <registry-range-form></registry-range-form>
            <registry-range-slider></registry-range-slider>
            <registry-range-display></registry-range-display>
            <registry-opacity-slider></registry-opacity-slider>
            <registry-histogram></registry-histogram>
            <registry-ticks-bar></registry-ticks-bar>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>
