# thermal-group-app

<script setup>
import { withBase } from 'vitepress'

const animals = `thermal~${withBase('/files/makak.lrc')}|label~Macaque;thermal~${withBase('/files/klokan.lrc')}|label~Kangaroo;thermal~${withBase('/files/husy.lrc')}|label~Geese`
const rhinos = `thermal~${withBase('/files/nosorozec_01.lrc')};thermal~${withBase('/files/nosorozec_02.lrc')}`
const forest = `thermal~${withBase('/files/les_thermal.lrc')}|visible~${withBase('/files/les_visual.png')}|label~Forest`
const single = `thermal~${withBase('/files/klokan.lrc')}|label~Kangaroo`
</script>

<style scoped>
.thermal-group-example {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 16px 0 24px;
    padding: 20px 24px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    background-color: var(--vp-code-block-bg);
}
</style>

<ComponentInfo tag="thermal-group-app" category="Application">

A self-contained viewer of a group of thermal files loaded from URLs. It creates its own manager, registry, group and file context, so no provider elements are needed around it.

The files are displayed as cards ordered by the time of acquisition (oldest first). Each card shows the thermogram, its timeline, a compact analysis table with a graph and buttons to download the file, to apply the file's range to the whole group and to open the file in a detail. The application bar contains the analysis tool bar, a palette dropdown, the thermal range form, histogram and slider, a switch between grid and table layout and a slider for the number of columns. All files share one palette and one thermal range.

The detail view shows one file with the full analysis table and graph. The *Back* button returns to the list; the group itself is not changed by opening or closing a detail. Users cannot add or remove files in this application – use [`thermal-dropin-app`](./thermal-dropin-app.md) for that.

</ComponentInfo>

## Attributes

Only public HTML attributes are listed here. Controllers, loaded objects and the reflected `is-loading` state are internal and are not meant to be set from HTML.

Each example shows plain HTML first, followed by a live preview. The previews use VitePress `withBase()` to resolve asset URLs under the documentation base path; in your own HTML, use URLs pointing to your files.

<ComponentAttribute name="group-files" type="string">

The list of files to display. The value is a compact string without JSON:

- files are separated by `;`,
- the parts of one file are separated by `|`,
- each part is a `key~value` pair.

| Key | Required | Meaning |
| --- | --- | --- |
| `thermal` | yes | URL of the thermal file (LRC). Records without it are ignored. |
| `visible` | no | URL of a visible (optical) image of the same scene, displayed below the thermogram. |
| `label` | no | Label of the file. |

```text
thermal~<url>[|visible~<url>][|label~<text>];thermal~<url>[|label~<text>]
```

All files are loaded in parallel whenever the attribute is set or changed; a new value replaces the whole group. Removing the attribute or setting it to an empty value removes all files and displays a short message that the group is empty. Files that fail to load are reported as alerts above the list; the remaining files are displayed normally. Changes made inside the application are **not** written back to the attribute.

Because `;`, `|` and `~` are separators, they cannot appear in URLs or labels.

```html
<thermal-group-app
    label="Animals"
    style="width: 100%"
    group-files="thermal~/files/makak.lrc|label~Macaque;thermal~/files/klokan.lrc|label~Kangaroo;thermal~/files/husy.lrc|label~Geese"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Animals"
        style="width: 100%"
        :group-files="animals"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="label" type="string" default="LabIR Web Analyser">

Title displayed in the application bar. When omitted, `LabIR Web Analyser` is displayed.

The `author` and `license` attributes inherited from the common application class are accepted but are not displayed by this application.

```html
<thermal-group-app
    label="Rhinoceros"
    style="width: 100%"
    group-files="thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Rhinoceros"
        style="width: 100%"
        :group-files="rhinos"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="show-fullscreen" type="'true' | 'false'" default="false">

Shows the fullscreen toggle in the application bar. Only `"true"` shows the button; omitted, empty, `"false"` and other values keep it hidden.

```html
<thermal-group-app
    label="Rhinoceros"
    style="width: 100%"
    group-files="thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc"
    show-fullscreen="true"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Rhinoceros"
        style="width: 100%"
        :group-files="rhinos"
        show-fullscreen="true"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="palette + advanced-palettes">

These two attributes configure the initial palette of all files and which palette choices are offered in the palette dropdown:

- `palette` (`'iron' | 'jet' | 'white_hot' | 'black_hot' | 'lava' | 'arctic' | 'rainbow' | 'rainbow_hc'`, default `jet`) sets the initial palette. Empty or invalid values convert to `iron`.
- `advanced-palettes` (`'true' | 'false'`, default `false`) enables the extended palette choices. Only the exact string `"true"` is true.

See [Thermal palette](../guide/thermal-palette.md) for the available choices.

```html
<thermal-group-app
    label="Rhinoceros"
    style="width: 100%"
    group-files="thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc"
    palette="lava"
    advanced-palettes="true"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Rhinoceros"
        style="width: 100%"
        :group-files="rhinos"
        palette="lava"
        advanced-palettes="true"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="tool" type="'inspect' | 'add-point' | 'add-rect' | 'add-ellipsis' | 'edit'" default="inspect">

Initially selected analysis tool in the tool bar. The tool applies to all files, so analyses can be drawn directly on the cards as well as in the detail. An unsupported value falls back to `inspect`.

```html
<thermal-group-app
    label="Rhinoceros"
    style="width: 100%"
    group-files="thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc"
    tool="add-rect"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Rhinoceros"
        style="width: 100%"
        :group-files="rhinos"
        tool="add-rect"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="opacity" type="number" default="1">

Opacity of all thermograms, from `0` (fully transparent) to `1` (fully opaque). Values outside this range are clamped; an invalid number falls back to `1`. The thermogram becomes transparent only for files with a `visible` image in [`group-files`](#group-files). This application has no opacity slider, so the value can be changed only through the attribute.

```html
<thermal-group-app
    label="Forest"
    style="width: 100%"
    group-files="thermal~/files/les_thermal.lrc|visible~/files/les_visual.png|label~Forest"
    opacity="0.3"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Forest"
        style="width: 100%"
        :group-files="forest"
        opacity="0.3"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="from + to">

Thermal range in °C shared by all files:

- `from` (`number`) – lower bound of the range.
- `to` (`number`) – upper bound of the range.

::: warning Limitation
After the files from [`group-files`](#group-files) are loaded, the application sets the range to the full range of all loaded files. An initial `from` and `to` is therefore overwritten. Use the range form, slider, histogram or the range button on a card to change the range afterwards. See [Thermal range](../guide/thermal-range.md).
:::

</ComponentAttribute>

<ComponentAttribute name="smooth-thermograms + smooth-graph">

Initial smoothing settings:

- `smooth-thermograms` (`'true' | 'false'`, default `false`) smooths the rendering of the thermal images.
- `smooth-graph` (`'true' | 'false'`, default `false`) smooths the lines of the analysis graphs.

Only `"true"` is true; omitted, empty, `"false"` and other values are false.

```html
<thermal-group-app
    label="Rhinoceros"
    style="width: 100%"
    group-files="thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc"
    smooth-thermograms="true"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Rhinoceros"
        style="width: 100%"
        :group-files="rhinos"
        smooth-thermograms="true"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="locale" type="'en' | 'cs' | 'de' | 'fr' | 'cy'">

Language of the user interface. Regional variants such as `en_GB`, `cs_CZ` or `de_AT` are accepted as well; an unknown value falls back to `en`. When omitted, the current language of the page is kept. The language is shared by all webcomponents on the page, so changing it in one application also changes it in the others.

Some texts of the file list and the detail header (for example the file count, *Back* and the empty-group message) are currently in Czech regardless of the language.

```html
<thermal-group-app
    label="Rhinoceros"
    style="width: 100%"
    group-files="thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc"
    locale="de"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Rhinoceros"
        style="width: 100%"
        :group-files="rhinos"
        locale="de"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="analysis1 … analysis7 + ms + speed">

State of the file opened in the detail. These attributes are **not** initial settings for the group: opening a detail overwrites them with the analyses, the current time and the playback speed of the opened file.

- `analysis1` … `analysis7` (`string`) – serialized analyses of the opened file, in the same format as in [`thermal-file-app`](./thermal-file-app.md#analysis1-analysis7). While a detail is open, they are synchronised in both directions: editing an analysis updates the attribute and setting an attribute updates the analysis of the opened file.
- `ms` (`number`) – current position in the opened sequence in milliseconds.
- `speed` (`0.5 | 1 | 2 | 3 | 5 | 10`) – playback speed of the opened sequence.

After returning to the list, the attributes keep the last values of the detail, and the analyses stay on the file.

</ComponentAttribute>

<ComponentAttribute name="manager-slug + registry-slug + group-slug">

Identifiers of the internal manager, registry and group. If omitted, the generic `slug` attribute is used; without either of them, a unique identifier is generated, so every application is independent by default.

Two applications with the same `manager-slug` share the palette, tool and smoothing settings. Applications sharing a manager **and** the same `registry-slug` also share the thermal range and opacity. See [Context providers and consumers](../guide/hierarchy.md).

Because `slug` is used as a fallback by all three identifiers, setting only `slug` on two applications makes them share everything, including the group – and both would then load their `group-files` into the same group.

```html
<thermal-group-app
    label="Animals"
    style="width: 100%"
    group-files="thermal~/files/makak.lrc|label~Macaque;thermal~/files/klokan.lrc|label~Kangaroo;thermal~/files/husy.lrc|label~Geese"
    manager-slug="shared-group-apps"
></thermal-group-app>
<thermal-group-app
    label="Rhinoceros"
    style="width: 100%"
    group-files="thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc"
    manager-slug="shared-group-apps"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-group-app
        label="Animals"
        style="width: 100%"
        :group-files="animals"
        manager-slug="shared-group-apps"
    ></thermal-group-app>
    <thermal-group-app
        label="Rhinoceros"
        style="width: 100%"
        :group-files="rhinos"
        manager-slug="shared-group-apps"
    ></thermal-group-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="autoclear-group" type="'true' | 'false'" default="true">

Removes the internal group (and its files) when the application is removed from the page. Set `autoclear-group="false"` only when the group is shared with other elements by [`group-slug`](#manager-slug-registry-slug-group-slug) and should survive the removal of this application.

</ComponentAttribute>

### Other attributes

- `author` and `license` are accepted but not displayed (see [`label`](#label)).
- `autohighlight` is inherited from the file context but has no effect in this application. Hovering a card always highlights the file's range on the histogram and range slider.
- The order of the files cannot be set from HTML; files are always ordered by the time of acquisition, oldest first.

## Examples

### Replace the displayed group

Changing the `group-files` attribute loads another set of files into the same application.

```html
<thermal-btn onclick="this.parentElement.querySelector('thermal-group-app').setAttribute('group-files', 'thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc')">
    Show rhinoceros
</thermal-btn>
<thermal-btn onclick="this.parentElement.querySelector('thermal-group-app').setAttribute('group-files', 'thermal~/files/klokan.lrc|label~Kangaroo')">
    Show kangaroo
</thermal-btn>
<thermal-group-app
    label="Example"
    style="width: 100%"
    group-files="thermal~/files/nosorozec_01.lrc;thermal~/files/nosorozec_02.lrc"
></thermal-group-app>
```

<div class="thermal-group-example">
    <thermal-btn @click="$event.currentTarget.parentElement.querySelector('thermal-group-app').setAttribute('group-files', rhinos)">
        Show rhinoceros
    </thermal-btn>
    <thermal-btn @click="$event.currentTarget.parentElement.querySelector('thermal-group-app').setAttribute('group-files', single)">
        Show kangaroo
    </thermal-btn>
    <thermal-group-app
        label="Example"
        style="width: 100%"
        :group-files="rhinos"
    ></thermal-group-app>
</div>

### Complete HTML document

This document loads the webcomponents IIFE bundle and lets the user switch between two groups of files. Place the bundle (`labirthermal.iife.js`) and your files next to the HTML file, or adjust the URLs.

The setup script deliberately appears **before** the application:

1. `DOMContentLoaded` waits until the buttons, the application and the output exist in the DOM. It also waits for the deferred bundle in the document head.
2. `customElements.whenDefined('thermal-group-app')` waits for the webcomponent to be registered.
3. Only then does the script register the click listeners.

Neither wait means that the files are loaded; they are fetched asynchronously after `group-files` is set.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thermal group application</title>
    <script defer src="./lib/labirthermal.iife.js"></script>
</head>
<body>
    <script>
        const groups = {
            rhinos: 'thermal~./files/nosorozec_01.lrc|label~Rhino 1;thermal~./files/nosorozec_02.lrc|label~Rhino 2',
            animals: 'thermal~./files/makak.lrc|label~Macaque;thermal~./files/klokan.lrc|label~Kangaroo'
        };

        function showGroup(event) {
            const name = event.currentTarget.dataset.group;
            document.getElementById('example-app').setAttribute('group-files', groups[name]);
            document.getElementById('group-result').textContent = `Displaying: ${name}`;
        }

        document.addEventListener('DOMContentLoaded', async () => {
            await customElements.whenDefined('thermal-group-app');

            document.querySelectorAll('button[data-group]').forEach(button => {
                button.addEventListener('click', showGroup);
            });
        });
    </script>

    <button type="button" data-group="rhinos">Rhinoceros</button>
    <button type="button" data-group="animals">Animals</button>
    <output id="group-result" aria-live="polite">Displaying: rhinos</output>

    <thermal-group-app
        id="example-app"
        label="Zoo"
        palette="iron"
        group-files="thermal~./files/nosorozec_01.lrc|label~Rhino 1;thermal~./files/nosorozec_02.lrc|label~Rhino 2"
    ></thermal-group-app>
</body>
</html>
```

This is a complete standalone document: copy it into your own HTML file and serve it over HTTP (files loaded from `file://` URLs are blocked by browsers).
