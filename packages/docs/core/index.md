# @labirthermal/core

Overview of the <code>@labirthermal/core</code> package.

## Purpose

Provides framework agnostic TS classes for work with thermal images in the browser:
- loading and reading of files
- core classes that enable processing of multiple IR images at once

## Usage

The core library can be used:
- a) standalone
- b) via web-components (recommended)

## Key concepts

One of main ambitions of the @labirthermal package is to work with multiple files at once. For that reason, the library works with a hierarchical structure of classes:

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