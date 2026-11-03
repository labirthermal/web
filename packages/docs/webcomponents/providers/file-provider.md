# file-provider

<script setup>
import { withBase } from 'vitepress'
</script>

<ComponentInfo
    tag="file-provider"
    category="Provider"
    :requires="['manager-provider', 'registry-provider', 'group-provider']"
>

Loads a thermal file into the current group and exposes its loaded file context to nested consumers. See the [provider hierarchy](../guide/hierarchy.md).

</ComponentInfo>

## Attributes

<ComponentAttribute name="thermal" type="string">

URL or path of the thermal LRC file to load into the current group.

```html
<file-provider thermal="/path/to/thermal-file.lrc"></file-provider>
```

</ComponentAttribute>

<ComponentAttribute name="visible" type="string">

Optional URL or path of a visible-spectrum image (for example a JPG or PNG photo) belonging to the thermal file. The LRC file is loaded together with the provided image and displayed in `file-canvas`. 

The pair is loaded when [`thermal`](#thermal) is set or changed; changing `visible` alone does not reload the file.

The opacity itself is controlled by the `ThermalRegistry` — see the registry's [`opacity`](./registry-provider.md#opacity) attribute.

```html
<manager-provider>
    <registry-provider>
        <group-provider>
            <file-provider
                thermal="/files/makak.lrc"
                visible="/files/kitten.jpg"
            >
                <registry-opacity-slider></registry-opacity-slider>
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry watch="opacity" opacity="0.5">
            <HierarchyGroup>
                <HierarchyFile watch="thermal, visible"
                    :thermal="withBase('/files/makak.lrc')"
                    :visible="withBase('/files/kitten.jpg')"
                >
                    <registry-opacity-slider></registry-opacity-slider>
                    <file-canvas></file-canvas>
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

</ComponentAttribute>


<ComponentAttribute name="ms" type="number">

If the provided LRC file is a sequence, you can indicate the initial time by the `ms` attribute.

Value is in milliseconds. This value is translated to nearest earlier frame in the sequence.

During the playback, the `ms` attribute is updated by the current internal value.

```html
<manager-provider>
    <registry-provider>
        <group-provider>
            <file-provider
                thermal="/files/sequence.lrc"
                ms="500000"
            >
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry>
            <HierarchyGroup>
                <HierarchyFile watch="thermal, ms"
                    :thermal="withBase('/files/sequence.lrc')"
                    ms="50000"
                >
                    <file-canvas></file-canvas>
                    <file-timeline></file-timeline>
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

</ComponentAttribute>

<ComponentAttribute name="speed" type="number" default="1">

Playback speed of a sequence. Supported values are `0.5`, `1`, `2`, `3`, `5` and `10`.

The speed applies only when the loaded LRC file is a sequence — single-frame files ignore it, as does [`ms`](#ms). The `file-playback-speed-dropdown` consumer changes the same value, and the change is reflected back to this attribute.

```html
<manager-provider>
    <registry-provider>
        <group-provider>
            <file-provider
                thermal="/files/sequence.lrc"
                speed="2"
            >
                <file-playback-speed-dropdown></file-playback-speed-dropdown>
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry>
            <HierarchyGroup>
                <HierarchyFile watch="thermal, speed"
                    :thermal="withBase('/files/sequence.lrc')"
                    speed="2"
                >
                    <file-playback-speed-dropdown></file-playback-speed-dropdown>
                    <file-canvas></file-canvas>
                    <file-timeline></file-timeline>
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

</ComponentAttribute>

<ComponentAttribute name="analysis1 … analysis7" type="string">

Each file has seven analysis slots. Every slot is bound to one attribute, `analysis1` to `analysis7`. Writing an analysis definition into an attribute creates the analysis as soon as the file is displayed.

The binding works both ways:

- **Attribute to analysis:** changing the attribute moves, resizes, renames or recolours the analysis. Removing the attribute removes the analysis.
- **Analysis to attribute:** when the user edits an analysis in the canvas, the attribute is updated with its new definition. An analysis drawn with the `add-point`, `add-rect` or `add-ellipsis` tool takes the next free slot and appears in its attribute.

#### Syntax

The definition is a list of segments separated by semicolons (`;`):

```
name;type;key:value;key:value;…;flag;flag
```

| Segment | Required | Description |
| --- | --- | --- |
| `name` | yes | The first segment. Label of the analysis, displayed in the canvas, tables and graphs. |
| `type` | yes | The second segment. One of `rectangle`, `ellipsis` or `point`. |
| `top:<px>` | yes | Distance of the top edge (or of the point) from the top of the image, in thermogram pixels. |
| `left:<px>` | yes | Distance of the left edge (or of the point) from the left of the image, in thermogram pixels. |
| `width:<px>` | for `rectangle` and `ellipsis` | Width of the area in thermogram pixels. |
| `height:<px>` | for `rectangle` and `ellipsis` | Height of the area in thermogram pixels. |
| `color:<color>` | no | Colour of the analysis, e.g. `red`, `Blue` or `#ff8800`. If omitted, the next colour from the built-in sequence is used. |
| `avg` | no | Show the average temperature in the analysis graph. |
| `min` | no | Show the minimum temperature in the graph. Areas only. |
| `max` | no | Show the maximum temperature in the graph. Areas only. |

All segments after the type can be written in any order.

- **Coordinates:** pixel values are non-negative integers counted from the top-left corner of the thermogram. Values outside the image are clamped to its edges.
- **Invalid definitions:** a definition with no name, an unknown type or a missing required coordinate is ignored and no analysis is created.
- **Serialised form:** the provider writes the definition back in its own normalised order, e.g. `Spot;point;top:40;left:60;color:red;avg`.

```html
<file-provider
    thermal="/files/sequence.lrc"
    analysis1="Body;rectangle;color:Blue;top:54;left:64;width:64;height:47;avg;max"
    analysis2="Head;ellipsis;color:Red;top:12;left:16;width:48;height:52;min"
    analysis3="Spot;point;color:Green;top:100;left:150;avg"
>
    <file-canvas></file-canvas>
    <file-analysis-table></file-analysis-table>
    <file-analysis-graph></file-analysis-graph>
</file-provider>
```

The labels below show the attributes live. Drag or resize an analysis in the canvas and watch its attribute update, or click a value in the label to edit the definition in place.

<Hierarchy>
    <HierarchyManager watch="tool">
        <manager-tool-bar></manager-tool-bar>
        <HierarchyRegistry>
            <HierarchyGroup>
                <HierarchyFile :watch="{ analysis1: null, analysis2: null, analysis3: null, analysis4: '(empty)' }"
                    thermal="/files/sequence.lrc"
                    analysis1="Body;rectangle;color:Blue;top:54;left:64;width:64;height:47;avg;max"
                    analysis2="Head;ellipsis;color:Red;top:12;left:16;width:48;height:52;min"
                    analysis3="Spot;point;color:Green;top:100;left:150;avg"
                >
                    <file-canvas></file-canvas>
                    <file-analysis-table></file-analysis-table>
                    <file-analysis-graph></file-analysis-graph>
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

To share the same analyses among all files of a group, use `group-analysis-sync-button` in the enclosing `group-provider`.

</ComponentAttribute>

<ComponentAttribute name="autohighlight" type="boolean" default="false" tag="file-provider">

When `autohighlight` is present, hovering or focusing the provider highlights the file's minimum–maximum span on the enclosing registry's thermal scale (for example in `registry-range-slider` and `registry-ticks-bar`). Leaving or blurring the element removes the highlight again.

While the highlight is active, the component sets its own `is-highlight` attribute. That attribute is managed entirely by the component — do not set it yourself — but it may be used as a CSS styling hook, e.g. `file-provider[is-highlight] { outline: 2px solid currentColor; }`.

```html
<manager-provider>
    <registry-provider>
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>
        <group-provider>
            <div class="stack">
                <file-provider thermal="/files/makak.lrc" autohighlight>
                    <file-canvas></file-canvas>
                </file-provider>
                <file-provider thermal="/files/klokan.lrc" autohighlight>
                    <file-canvas></file-canvas>
                </file-provider>
            </div>
        </group-provider>
    </registry-provider>
</manager-provider>
```
<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry>
            <registry-range-slider></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
            <HierarchyGroup>
                <div class="stack">
                    <HierarchyFile watch="thermal" :thermal="withBase('/files/makak.lrc')" autohighlight>
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal" :thermal="withBase('/files/klokan.lrc')" autohighlight>
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

</ComponentAttribute>

## Available controls

These webcomponents starting on `file-*` read the context of the enclosing `file-provider` and are intended for direct use in your markup.

<Hierarchy>
    <HierarchyManager
        :watch="{
            'advanced-palettes': 'true',
            palette: 'lava',
        }"
    >
        <HierarchyRegistry watch="from, to" from="20" to="35">
            <HierarchyGroup>
                <HierarchyFile 
                    :watch="{ thermal: null, ms: 0, speed: 1, analysis1: null, analysis2: null }"
                    thermal="/files/sequence.lrc" 
                    analysis1="Rectangle 0;rectangle;color:Blue;top:54;left:64;width:64;height:47;avg" analysis2="Rectangle 1;rectangle;color:Red;top:12;left:16;width:48;height:52;min">
                    <WebcomponentTable components="file-label, file-canvas, file-timeline, file-playback-speed-dropdown, file-info-button, file-range-propagator, file-download-dropdown, file-video-export-button, file-analysis-table, file-analysis-graph, file-analysis-complex" />
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## Examples

### Thermal file with a visible image

The `visible` attribute pairs a visible-spectrum image with the thermal file. Move the opacity slider to blend the thermogram with the image and watch the `opacity` attribute of the registry change.

```html
<manager-provider>
    <registry-provider>
        <registry-opacity-slider></registry-opacity-slider>
        <group-provider>
            <file-provider
                thermal="/files/les_thermal.lrc"
                visible="/files/les_visual.png"
            >
                <file-label></file-label>
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```
<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry :watch="{ opacity: 1 }">
            <registry-opacity-slider></registry-opacity-slider>
            <HierarchyGroup>
                <HierarchyFile watch="thermal, visible"
                    thermal="/files/les_thermal.lrc"
                    visible="/files/les_visual.png"
                >
                    <file-label></file-label>
                    <file-canvas></file-canvas>
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

### Load multiple files in a group

Each file provider adds one file to its enclosing group. Each nested file consumer reads the context of its own file. The registry range is shared by both files: its `from` and `to` attributes follow the range computed from all loaded files.

```html
<manager-provider>
    <registry-provider>
        <group-provider>
            <group-timeline></group-timeline>
            <div class="stack">
                <file-provider thermal="/files/makak.lrc">
                    <file-label></file-label>
                    <file-canvas></file-canvas>
                    <file-info-button></file-info-button>
                </file-provider>
                <file-provider thermal="/files/klokan.lrc">
                    <file-label></file-label>
                    <file-canvas></file-canvas>
                    <file-info-button></file-info-button>
                </file-provider>
            </div>
        </group-provider>
    </registry-provider>
</manager-provider>
```
<Hierarchy>
    <HierarchyManager>
        <HierarchyRegistry watch="from, to">
            <HierarchyGroup>
                <group-timeline></group-timeline>
                <div class="stack">
                    <HierarchyFile watch="thermal" :thermal="withBase('/files/makak.lrc')">
                        <file-label></file-label>
                        <file-canvas></file-canvas>
                        <file-info-button></file-info-button>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal" :thermal="withBase('/files/klokan.lrc')">
                        <file-label></file-label>
                        <file-canvas></file-canvas>
                        <file-info-button></file-info-button>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## No context sharing

Unlike other context providers, the `file-provider` does not have any `file-slug` attribute. This means that two context providers can not share one internal context.