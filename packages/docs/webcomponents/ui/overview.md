# Overview

<script setup>
import { withBase } from 'vitepress'
</script>

The `@labirthermal/webcomponents` comes with a set of standardised UI elements. These elements are independent of [the hierarchy](../guide/hierarchy.md) and can be used anywhere in the DOM tree.

These UI elements are mostly used internally - in [context consumer elements](../guide/hierarchy.md#context-consumers), but you can use them for your own purposes.

See [Icons](../icons.md) for the built-in icon catalog and icon presentation attributes, and [Styling and CSS variables](../guide/styling.md) for theming.

For a complete HTML document showing script loading and click listener registration, see the [standalone button example](../ui/thermal-btn.md#complete-html-document).

## Overview

<table class="components-table">
    <thead>
        <tr>
            <th>HTML tag</th>
            <th>Preview</th>
            <th>Exmples</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>thermal-btn</code></td>
            <td><thermal-btn>A button</thermal-btn></td>
            <td>
                <thermal-btn variant="foreground" size="xl">Large</thermal-btn>
                <thermal-btn variant="primary" size="sm">Small</thermal-btn>
                <thermal-btn disabled="true">Disabled</thermal-btn>
                <thermal-btn icon="trash" iconStyle="micro"></thermal-btn>
                <thermal-btn tooltip="This is a button tooltip!">With a tooltip</thermal-btn>
            </td>
        </tr>
        <tr>
            <td><code text-wrap="nowrap">thermal-btn-group</code></td>
            <td>
                <thermal-btn-group>
                    <thermal-btn>A button</thermal-btn>
                    <thermal-btn>Another one</thermal-btn>
                </thermal-btn-group>
            </td>
            <td>
                <thermal-btn-group>
                    <thermal-btn icon="trash" iconStyle="micro" variant="background" tooltip="The first button">A button</thermal-btn>
                    <thermal-btn icon="image" iconStyle="micro" variant="primary" tooltip="The second button">Another one</thermal-btn>
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
            <td>
                <thermal-dropdown
                    tooltip="This is a tooltip"
                    label="Custom label"
                    variant="foreground"
                    icon="download"
                    iconStyle="micro"
                >
                    <span slot="invoker">A custom label and tooltip</span>
                    <thermal-btn slot="option" tooltip="Also a tooltip">An option</thermal-btn>
                    <thermal-btn slot="option" tooltip="And yet another tooltip">Another option</thermal-btn>
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
            <td>
                <thermal-dialog label="The dialog label">
                    <thermal-btn slot="invoker" variant="primary" icon="info" iconStyle="solid">A customised dialogue trigger</thermal-btn>
                    <div slot="content">
                        The trigger of the dialog can be customised.
                    </div>
                    <thermal-btn slot="button" variant="primary">An action</thermal-btn>
                </thermal-dialog>
                <thermal-dialog label="The dialog label">
                    <a slot="invoker">Any HTMLelement can be used as trigger</a>
                    <div slot="content">
                        This dialog was triggered by a custom invoker - an <code>a</code> element.
                    </div>
                    <thermal-btn slot="button" variant="primary">An action</thermal-btn>
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

## Building complex interfaces

In combination with [the context providers](../guide/hierarchy.md), UI elements can help you build complex interfaces.

Below is an example of a complex application displaying one file:

:::tabs

== Interactive demo

<manager-provider palette="white_hot" advanced-palettes="true" tool="edit">
    <registry-provider from="10" to="25">
        <group-provider>
            <file-provider 
                :thermal="withBase('/files/klokan.lrc')"
                analysis1="Rectangle 0;rectangle;color:Blue;top:153;left:200;width:431;height:179"
                analysis2="Ellipsis 1;ellipsis;color:Red;top:212;left:439;width:352;height:222"
            >
                <thermal-app 
                    label="Example integration"
                    author="An example author"
                    license="An example license"
                    recorded="An example recorded time"
                >
                    <manager-palette-dropdown slot="bar-pre"></manager-palette-dropdown>
                    <manager-tool-bar slot="bar-pre" horizontal="true"></manager-tool-bar>
                    <file-download-dropdown slot="bar-pre"></file-download-dropdown>
                    <registry-histogram slot="pre"></registry-histogram>
                    <registry-range-slider slot="pre"></registry-range-slider>
                    <registry-ticks-bar slot="pre"></registry-ticks-bar>
                    <file-canvas></file-canvas>
                    <file-analysis-table></file-analysis-table>
                </thermal-app>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>

== HTML source

```html
<manager-provider palette="white_hot" advanced-palettes="true">
    <registry-provider from="10" to="25">
        <group-provider>
            <file-provider 
                thermal="/files/klokan.lrc"
                analysis1="Rectangle 0;rectangle;color:Blue;top:153;left:200;width:431;height:179"
                analysis2="Ellipsis 1;ellipsis;color:Red;top:212;left:439;width:352;height:222"
            >
                <thermal-app 
                    label="Example integration"
                    author="An example author"
                    license="An example license"
                    recorded="An example recorded time"
                >

                    <!--Some controls in the "bar-pre" slot-->
                    <manager-palette-dropdown slot="bar-pre"></manager-palette-dropdown>
                    <manager-tool-bar slot="bar-pre" horizontal="true"></manager-tool-bar>
                    <file-download-dropdown slot="bar-pre"></file-download-dropdown>
                
                    <!--Some other controls in the "pre" slot-->
                    <registry-histogram slot="pre"></registry-histogram>
                    <registry-range-slider slot="pre"></registry-range-slider>
                    <registry-ticks-bar slot="pre"></registry-ticks-bar>
                    
                    <!--The rest goes into the default slot-->
                    <file-canvas></file-canvas>
                    <file-analysis-table></file-analysis-table>

                </thermal-app>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```

:::