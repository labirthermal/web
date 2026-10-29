# Hierarchy of components

<script setup>
import { withBase } from 'vitepress'
</script>

<blockquote>This guide helps you build your own interface from scratch.</blockquote>

The main purpose of the `@labirthermal/webcomponents` library is to work with multiple files at once. For that reason, there is an obligatory hierarchy of webcomponents.

- a) **context providers** <u>expose</u> internal control objects
- b) **context consumers** <u>inherit</u> the controls from their parents

## Context providers

When building an interface from scratch, you will need to use **all the following context provider elements**:

- `manager-provider`
- `registry-provider`
- `group-provider`
- `file-provider`

See the [manager-provider](../providers/manager-provider), [registry-provider](../providers/registry-provider), [group-provider](../providers/group-provider), and [file-provider](../providers/file-provider) references for details about each provider.

The following schema explains their roles:

<Hierarchy>
    <HierarchyManager>
        <p>The <code>manager-provider</code> handles the global cache and also some display properties such as the <a href="./thermal-palette">palette property</a>.</p>
        <HierarchyRegistry>
            <p>The <code>registry-provider</code> handles file loading, <a href="./thermal-range">thermal range</a> and histogram.</p>
            <HierarchyGroup>
                <p>The <code>group-provider</code> synchronises the cursor position between the nested files.</p>
                <div class="stack">
                    <HierarchyFile watch="thermal"
                            :thermal="withBase('/files/husy.lrc')"
                    >
                        <p>The <code>file-provider</code>executes the file load and exposes its properties in as context.</p>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/kudlanka.lrc')"
                    >
                        <p>The <code>file-provider</code>executes the file load and exposes its properties in as context.</p>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

If the context providers are missing or composed incorrectly, the context consumers won't work.

### Internal hierarchy

Every context provider is bound internally to an object within the hierarchy of `@labirthermal/core`:

<table>
    <thead>
        <tr>
            <th>context provider webcomponent</th>
            <th>corresponding `@labirthermal/core` class</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>manager-provider</code></td>
            <td><code>ThermalManager</code></td>
        </tr>
        <tr>
            <td><code>registry-provider</code></td>
            <td><code>ThermalRegistry</code></td>
        </tr>
        <tr>
            <td><code>group-provider</code></td>
            <td><code>ThermalGroup</code></td>
        </tr>
        <tr>
            <td><code>file-provider</code></td>
            <td><code>ThermalFileInstance</code></td>
        </tr>
    </tbody>
</table>

Therefore, the hierarchy of context providers will create a tree of `@labirthermal/core` internal objects.

<div class="split">

```html
<manager-provider>
    <registry-provider>
        <group-provider>
            <file-provider></file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```

```
ThermalManager
⮑ ThermalRegistry
    ⮑ ThermalGroup
        ⮑ ThermalFileInstance
```
</div>

What do the context providers do with their internal control objects?
- expose internal objects as [lit context](https://lit.dev/docs/data/context/) which is then consumed by [context consumers](#context-consumers)
- translate the internal state to HTML attributes 
and translate internal properties into HTML attributes. 


### Identity of internal objects

Every internal object is identified by a unique identificator. **By default, identificators are random hashes.** But you can optionally specify the internal names using `*-slug` attributes:

```html:line-numbers
<manager-provider manager-slug="default">
    
    <registry-provider registry-slug="some-id">

        <group-provider group-slug="first-group-id"></group-provider>

    </registry-provider>

</manager-provider>
```

The example above will create this internal hierarchy:

```html
ThermalManager #default
⮑ ThermalRegistry #some-id
    ⮑ ThermalGroup #first-group-id
```

### Sharing internal objects

If you use the same identificator for multiple context providers, they will share one internal object.

```html:line-numbers{3,7}
<manager-provider manager-slug="default">
    
    <registry-provider registry-slug="some-id">
        <group-provider group-slug="first-group-id"></group-provider>
    </registry-provider>

    <registry-provider registry-slug="some-id">
        <group-provider group-slug="second-group-id"></group-provider>
    </registry-provider>

</manager-provider>
```

The example above will create this internal hierarchy:

```html
ThermalManager #default
⮑ ThermalRegistry #some-id
    ⮑ ThermalGroup #first-group-id
    ⮑ ThermalGroup #second-group-id
```

This is practical if you want to display **one internal context in two branches of the DOM tree**. 

The example below shows two `registry-providers` that control one internal context. 
- The first instance of `registry-provider` contains a group and loads a file. 
- The other instance of `registry provider` contains some control elements. 

By sharing the `registry-slug` attribute, both branches in the DOM tree share one control object and therefore their internal attributes are synchronised.

:::tabs
== Interactive demo

<Hierarchy>
<HierarchyManager>
    <HierarchyRegistry watch="registry-slug" registry-slug="default">
        <HierarchyGroup>
                <div class="stack">
                    <HierarchyFile watch="thermal"
                            :thermal="withBase('/files/husy.lrc')"
                    >
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
    </HierarchyRegistry>
    <br />
    <HierarchyRegistry watch="registry-slug" registry-slug="default">
        <p>Try to play with the controls below - they will modify the thermal range also in the DOM tree above.</p>
        <registry-range-form></registry-range-form>
        <br />
        <registry-histogram></registry-histogram>
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>
    </HierarchyRegistry>
</HierarchyManager>
</Hierarchy>

== HTML source

```html:line-numbers{5,13}
<manager-provider>

    <!-- Both registries have the same ID-->

    <registry-provider registry-slug="some-id">
        <group-provider>
            <file-provider thermal="/files/husy.lrc">
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>

    <registry-provider registry-slug="some-id">

        <!-- Controls in this DOM tree will affect also the other registry provider -->
        <registry-range-form></registry-range-form>
        <registry-histogram></registry-histogram>
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>

    </registry-provider>
</manager-provider>
```

:::

**You do not need to provide identificators** - in case the `*-slug` attributes are empty, internal IDs will be random hashes.

## Context consumers

Once the main hierarchy is created, you can add **context consumer elements** inside.

The **context consumer elements** inherit the control objects from their ancestors and use it to display and modify internal states.

:::tabs

== Interactive demo

<Hierarchy>
    <HierarchyManager watch="palette">
        <manager-palette-dropdown></manager-palette-dropdown>
        <br />
        <HierarchyRegistry watch="from,to">
            <registry-range-form></registry-range-form>
            <registry-histogram></registry-histogram>
            <registry-range-slider></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
            <HierarchyGroup>
                <div class="stack">
                    <HierarchyFile watch="thermal"
                            :thermal="withBase('/files/husy.lrc')"
                    >
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                    <HierarchyFile watch="thermal"
                        :thermal="withBase('/files/kudlanka.lrc')"
                    >
                        <file-canvas></file-canvas>
                    </HierarchyFile>
                </div>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

== HTML source

```html
<manager-provider>

    <manager-palette-dropdown></manager-palette-dropdown>
    
    <registry-provider>
        
        <registry-range-form></registry-range-form>
        <registry-histogram></registry-histogram>
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>

        <group-provider>

            <div class="stack">
                
                <file-provider thermal="/files/husy.lrc" >
                        <file-canvas></file-canvas>
                </file-provider>

                <file-provider thermal="/files/kudlanka.lrc" >
                    <file-canvas></file-canvas>
                </file-provider>

            </div>

        </group-provider>
    </registry-provider>
</manager-provider>
```

:::

The context consumers may be nested anywhere in the DOM tree, but they still share the same context. The following example shows that multiple `manager-palette-dropdown` elements can be placed anywhere in the DOM tree while still controlling the same context;

<Hierarchy>
    <HierarchyManager watch="palette">
        <manager-palette-dropdown></manager-palette-dropdown>
        <br />
        <HierarchyRegistry>
            <manager-palette-dropdown></manager-palette-dropdown>
            <br />
            <HierarchyGroup>
                <manager-palette-dropdown></manager-palette-dropdown>
                <br />
                <div class="stack">
                <HierarchyFile watch="thermal"
                    :thermal="withBase('/files/husy.lrc')"
                >
                    <manager-palette-dropdown></manager-palette-dropdown>
                    <br />
                    <file-canvas></file-canvas>
                </HierarchyFile>
                <HierarchyFile watch="thermal"
                    :thermal="withBase('/files/kudlanka.lrc')"
                >
                    <manager-palette-dropdown></manager-palette-dropdown>
                    <br />
                    <file-canvas></file-canvas>
                </HierarchyFile>
                </div>
            </HierarchyGroup>
            <br />
            <HierarchyGroup>
                <manager-palette-dropdown></manager-palette-dropdown>
                <br />
                <div class="stack">
                <HierarchyFile watch="thermal"
                    :thermal="withBase('/files/husy.lrc')"
                >
                    <manager-palette-dropdown></manager-palette-dropdown>
                    <br />
                    <file-canvas></file-canvas>
                </HierarchyFile>
                <HierarchyFile watch="thermal"
                    :thermal="withBase('/files/kudlanka.lrc')"
                >
                    <manager-palette-dropdown></manager-palette-dropdown>
                    <br />
                    <file-canvas></file-canvas>
                </HierarchyFile>
                </div>
            </HierarchyGroup>
        </HierarchyRegistry>
    </HierarchyManager>
</Hierarchy>

## Applications

Applications such as [thermal-file-app](../applications/thermal-file-app.md) create their own manager, registry, group and file context. You do not need to wrap them in provider elements.

The example below loads the **same thermal file and visible image** in two independent viewers with the same initial settings:

- **Left:** each provider exposes the attributes belonging to its own context.
- **Right:** one application exposes those attributes together, on the **same HTML element**. The internal objects still follow the manager → registry → group → file hierarchy; only the HTML API is flat.

Click an attribute value in either HTML label to edit it, or use the controls and watch the values update. The viewers are independent, so changes in one do not affect the other. `thermal` loads the file together with `visible`; changing only `visible` does not reload it.

<Hierarchy>
<div class="split">
<div>
<h3>Separate providers</h3>

Create context hierarchically.

<HierarchyManager watch="palette,advanced-palettes,tool" palette="iron">
    <manager-palette-dropdown></manager-palette-dropdown>
    <HierarchyRegistry watch="from,to,opacity" from="-10" to="5" opacity="1">
        <registry-range-form></registry-range-form>
        <registry-opacity-slider></registry-opacity-slider>
        <registry-histogram></registry-histogram>
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>
        <HierarchyGroup>
            <HierarchyFile
                watch="thermal,visible"
                :visible="withBase('/files/les_visual.png')"
                :thermal="withBase('/files/les_thermal.lrc')"
            >
                <file-canvas></file-canvas>
            </HierarchyFile>
        </HierarchyGroup>
    </HierarchyRegistry>
</HierarchyManager>
</div>
<div>
<h3>All providers in one application</h3>

`*-app` webcomponents do not use context providers. Instead, they expose the entire context on their own. These webcomponents also comes with a fully-featured UI.

<HierarchyApp
    watch="palette,advanced-palettes,tool,from,to,opacity,thermal,visible"
    palette="iron"
    label="App"
    from="-10"
    to="5"
    opacity="1"
    show-fullscreen="true"
    :visible="withBase('/files/les_visual.png')"
    :thermal="withBase('/files/les_thermal.lrc')"
/>
</div>
</div>
</Hierarchy>

The essential HTML difference is:

<div class="split">

```html
<manager-provider palette="iron">
    <registry-provider from="-10" to="5" opacity="0.6">
        <group-provider>
            <file-provider
                visible="/labir/files/les_visual.png"
                thermal="/labir/files/les_thermal.lrc"
            >
                <file-canvas></file-canvas>
            </file-provider>
        </group-provider>
    </registry-provider>
</manager-provider>
```

```html
<thermal-file-app
    palette="iron"
    from="-10"
    to="5"
    opacity="0.6"
    visible="/labir/files/les_visual.png"
    thermal="/labir/files/les_thermal.lrc"
></thermal-file-app>
```

</div>

The application also supplies its own controls, canvas and analysis interface. See the [application reference](../applications/thermal-file-app.md#attributes) for all public attributes.