# @labirthermal/webcomponents

Framework-independent webcomponents for displaying and analysing thermal images in the browser. They are built with [Lit](https://lit.dev) on top of [@labirthermal/core](../core/).

## Usage

Load the IIFE build with a single `<script>` tag and use the elements anywhere in your HTML – see [Usage in the browser](./usage).

```html
<script src="/lib/embed.iife.js"></script>

<thermal-file-app thermal="/files/sequence.lrc"></thermal-file-app>
```

For a visual list of all elements, see the [Overview of webcomponents](./list).

## Sections

### Guide

- [Context providers and consumers](./guide/hierarchy) – the hierarchy of elements needed to build your own interface.
- [Thermal palette](./guide/thermal-palette) – choose and share colour palettes.
- [Thermal range](./guide/thermal-range) – set and share the displayed temperature range.
- [Styling and CSS variables](./guide/styling) – adapt the look of the components.

### App components

Self-contained editors that do not need any context providers. See the [overview of app components](./applications/).

- [thermal-dropin-app](./applications/thermal-dropin-app) – lets users drop and analyse their own LRC files.
- [thermal-file-app](./applications/thermal-file-app) – viewer and editor of one thermal file loaded from a URL.
- [thermal-group-app](./applications/thermal-group-app) – viewer of a group of thermal files loaded from URLs.

### UI components

General-purpose elements usable anywhere in the DOM. See the [overview of UI components](./ui/overview).

- [Icons](./icons)
- [thermal-btn](./ui/thermal-btn)
- [thermal-btn-group](./ui/thermal-btn-group)
- [thermal-dialog](./ui/thermal-dialog)
- [thermal-dropdown](./ui/thermal-dropdown)
- [thermal-app](./ui/thermal-app)

### Context providers

Elements exposing the [core classes](../core/#key-concepts) to nested context consumers. See [Context providers and consumers](./guide/hierarchy).

- [manager-provider](./providers/manager-provider) – `ThermalManager`
- [registry-provider](./providers/registry-provider) – `ThermalRegistry`
- [group-provider](./providers/group-provider) – `ThermalGroup`
- [file-provider](./providers/file-provider) – `ThermalFileInstance`
