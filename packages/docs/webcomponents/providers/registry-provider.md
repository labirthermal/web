# registry-provider

<script setup>
import { withBase } from 'vitepress'
</script>

<ComponentInfo tag="registry-provider" category="Provider" :requires="['manager-provider']">

Provides a registry scope for its descendants. A `registry-provider` must be inside a `manager-provider`; the registry is scoped to that parent manager. See the [hierarchy overview](../guide/hierarchy.md) and [thermal range guide](../guide/thermal-range.md).

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

Sets the lower bound of the thermal range. Apply a range only when both `from` and `to` are set; if either is unset, the range is cleared.

</ComponentAttribute>

<ComponentAttribute name="to" type="number">

Sets the upper bound of the thermal range. Apply a range only when both `from` and `to` are set; if either is unset, the range is cleared.

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
                    <file-provider thermal="/labir/files/makak.lrc">
                        <file-canvas></file-canvas>
                    </file-provider>
                    <file-provider thermal="/labir/files/klokan.lrc">
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
                    <file-provider thermal="/labir/files/makak.lrc">
                        <file-canvas></file-canvas>
                    </file-provider>
                    <file-provider thermal="/labir/files/klokan.lrc">
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
