# @labirthermal/core

Provides framework-agnostic TypeScript classes for work with thermal images in the browser:
- loading and reading of files
- core classes that enable processing of multiple IR images at once

## Usage

The core library can be used:
- a) **standalone** in TypeScript – see [Standalone usage](./standalone)
- b) **via webcomponents** (recommended) – see [@labirthermal/webcomponents](../webcomponents/)

## Sections

### Standalone usage

Step-by-step examples, each shown both in TypeScript and with the equivalent webcomponents:

- [Load a single file](./single-file) – load one LRC file and render it. Radiometric FLIR JPEGs (`.jpg`) are loaded the same way.
- [Load multiple files](./multiple-files) – load several files into one group.
- [Controls](./controls) – build your own GUI on top of the core classes.

### Core classes

Reference of the classes forming the [hierarchy](#key-concepts):

- [ThermalManager](./thermal-manager)
- [ThermalRegistry](./thermal-registry)
- [ThermalGroup](./thermal-group)

## Key concepts

One of the main ambitions of the `@labirthermal` packages is to work with multiple files at once. For that reason, the library works with a hierarchical structure of classes:

<ul>
    <li>
        <code>ThermalManager</code> = the global context shares the cache
        <ul style="list-style-type:'\2937'">
            <li>
                <code>ThermalRegistry</code> = one display set shares the thermal scale
                <ul style="list-style-type:'\2937'">
                    <li>
                        <code>ThermalGroup</code> = one group of files
                        <ul style="list-style-type:'\2937'">
                            <li>
                                <code>ThermalFileInstance</code> = one IR image
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

Explore the core hierarchy:

- [ThermalManager](./thermal-manager) provides the application-level context and shared settings.
- [ThermalRegistry](./thermal-registry) groups related display state and contains groups.
- [ThermalGroup](./thermal-group) organizes thermal file instances.