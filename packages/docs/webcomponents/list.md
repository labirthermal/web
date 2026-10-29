# List of all webcomponents

This is a brief, but complete list of all webcomponents included in `@labirthermal/webcomponents` package.


<script setup>
import { withBase } from 'vitepress'
</script>

## Building blocks

### UI elements

The following components can be used anywhere. See the guide on [UI components](./ui/overview.md) for more details.

<table class="components-table">
    <thead>
        <tr>
            <th>HTML tag</th>
            <th>Preview</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>thermal-btn</code></td>
            <td><thermal-btn>A button</thermal-btn></td>
        </tr>
        <tr>
            <td><code text-wrap="nowrap">thermal-btn-group</code></td>
            <td>
                <thermal-btn-group>
                    <thermal-btn>A button</thermal-btn>
                    <thermal-btn>Another one</thermal-btn>
                </thermal-btn-group>
            </td>
        </tr>
        <tr>
            <td><a :href="withBase('/webcomponents/ui/thermal-dropdown')"><code text-wrap="nowrap">thermal-dropdown</code></a></td>
            <td>
                <thermal-dropdown>
                    <thermal-btn slot="option">An option</thermal-btn>
                    <thermal-btn slot="option">Another option</thermal-btn>
                </thermal-dropdown>
            </td>
        </tr>
        <tr>
            <td><code>thermal-dialog</code></td>
            <td>
                <thermal-dialog label="The dialog label">
                    <thermal-btn slot="invoker" tooltip="Click me to open a dialogue">A dialog trigger</thermal-btn>
                    <div slot="content">
                        Some content
                    </div>
                </thermal-dialog>
            </td>
        </tr>
        <tr>
            <td><a :href="withBase('/webcomponents/ui/thermal-app')"><code>thermal-app</code></a></td>
            <td colspan="2">
                <thermal-app 
                    label="A label"
                    author="LabIR Team"
                >
                    <thermal-btn slot="bar-pre">A slotted element</thermal-btn>
                    <p>This is a very powerful element that can be used to build complex interfaces.</p>
                </thermal-app>
            </td>
        </tr>
    </tbody>
</table>


### Context-aware elements

The following components need to be used in the given hierarchy. See [context providers](./guide/hierarchy.md) for more details.


<Hierarchy>
    <HierarchyManager watch="palette,advanced-palettes,smooth-thermograms,smooth-graph,tool">
        <WebcomponentTable components="manager-palette-dropdown, manager-palette-buttons, manager-advanced-palette-switch, manager-image-smooth-switch, manager-graph-smooth-switch, manager-tool-bar" />
        <HierarchyRegistry watch="opacity,from,to">
            <WebcomponentTable components="registry-opacity-slider,registry-histogram,registry-range-slider,registry-ticks-bar,registry-range-full-button,registry-range-auto-button" />
            <HierarchyGroup>
                <WebcomponentTable components="group-download-dropdown, group-analysis-sync-button" />
                <HierarchyFile
                    watch="thermal,visible,ms,analysis1,analysis2,analysis3,analysis4,analysis5,analysis6,analysis7"
                    :thermal="withBase('/files/sequence.lrc')"
                    analysis1="Rectangle 2;rectangle;color:Lightblue;top:16;left:24;width:79;height:46;avg"
                    analysis2="Ellipsis 3;ellipsis;color:Green;top:42;left:61;width:67;height:48;min"
                    ms="10000"
                >
                    <WebcomponentTable components="file-label,file-info-button,file-download-dropdown,file-canvas,file-timeline,file-analysis-table,file-analysis-graph,file-analysis-complex" />
                </HierarchyFile>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## Applications

Applications are self-contained editors that do not need any context providers. See the [overview of applications](./applications/index.md) for more details.

### [`thermal-dropin-app`](./applications/thermal-dropin-app.md)

Lets users drop and analyze their own LRC files.

<thermal-dropin-app
    palette="iron"
    advanced-palettes="true"
    tool="edit"
    style="width: 100%"
></thermal-dropin-app>

### [`thermal-file-app`](./applications/thermal-file-app.md)

Displays and analyzes one thermal file loaded from a URL.

<thermal-file-app
    label="Kangaroo"
    author="LabIR Team"
    style="width: 100%"
    :thermal="withBase('/files/klokan.lrc')"
></thermal-file-app>
