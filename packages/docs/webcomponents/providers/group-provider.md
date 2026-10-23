# group-provider

<script setup>
import { withBase } from 'vitepress'
</script>

<ComponentInfo tag="group-provider" category="Provider" :requires="['manager-provider', 'registry-provider']">

Coordinates cursor position between nested files. See the [provider hierarchy](../hierarchy.md).

</ComponentInfo>

## Available controls

These webcomponents read the context of the enclosing `group-provider` and are intended for direct use in your markup. Place them inside the group provider, outside its file providers; file-level controls belong inside the corresponding `file-provider`.

<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry>
            <HierarchyGroup>
                <WebcomponentTable components="group-timeline, group-analysis-sync-button, group-range-propagator, group-download-dropdown, group-download-buttons, group-chart" />
                <div class="stack">
                    <HierarchyFile watch="thermal, analysis1, analysis2"
                        :thermal="withBase('/files/nosorozec_01.lrc')"
                        analysis1="Rectangle 0;rectangle;color:Blue;top:54;left:64;width:64;height:47;avg"
                        analysis2="Rectangle 1;rectangle;color:Red;top:12;left:16;width:48;height:52;min"
                    >
                        <file-label></file-label>
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal, analysis1, analysis2"
                        :thermal="withBase('/files/nosorozec_02.lrc')"
                        analysis1="Rectangle 0;rectangle;color:Blue;top:54;left:64;width:64;height:47;avg"
                        analysis2="Rectangle 1;rectangle;color:Red;top:12;left:16;width:48;height:52;min"
                    >
                        <file-label></file-label>
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## Attributes

<ComponentAttribute name="group-slug" type="string" default="generated UUID">

Names the group within its registry. If omitted, a UUID is generated. Group providers with the same slug under the same registry share a `ThermalGroup`; use a stable slug when those nested files should share a group.

</ComponentAttribute>

## Examples

### One group with multiple files

The group holds both files. Group-level consumers, such as the timeline and analysis synchronisation control, operate on the files in this group.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider>
        <registry-provider>
            <group-provider group-slug="inspection-series">
                <group-timeline></group-timeline>
                <group-analysis-sync-button></group-analysis-sync-button>
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

### Sharing a group context

Two groups with the same `group-slug` under the same registry reuse one group. Files in either branch belong to that group, so group-level consumers in both branches act on the same collection.

<ComponentExample>

```html
<div class="hierarchy">
    <manager-provider>
        <registry-provider>
            <group-provider group-slug="shared-files">
                <group-timeline></group-timeline>
                <file-provider thermal="/labir/files/makak.lrc">
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
            <group-provider group-slug="shared-files">
                <group-analysis-sync-button></group-analysis-sync-button>
                <div class="stack">
                    <file-provider thermal="/labir/files/klokan.lrc">
                        <file-canvas></file-canvas>
                    </file-provider>
                    <file-provider thermal="/labir/files/husy.lrc">
                        <file-canvas></file-canvas>
                    </file-provider>
                </div>
            </group-provider>
        </registry-provider>
    </manager-provider>
</div>
```

</ComponentExample>
