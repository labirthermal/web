# thermal-file-app

<script setup>
import { withBase } from 'vitepress'
</script>

<style scoped>
.thermal-file-example {
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

<ComponentInfo tag="thermal-file-app" category="Application">

A self-contained viewer and editor of one thermal file loaded from a URL. It creates its own manager, registry, group and file context, so no provider elements are needed around it.

The application contains a palette dropdown, thermal range form and slider, histogram, opacity slider, download and file info buttons, the analysis tool bar, the thermal canvas with a timeline and the analysis table with a graph.

</ComponentInfo>

## Attributes

Only public HTML attributes are listed here. Controllers, loaded objects and the reflected `is-loading` state are internal and are not meant to be set from HTML.

Each example shows plain HTML first, followed by a live preview. The previews use VitePress `withBase()` to resolve asset URLs under the documentation base path; in your own HTML, use URLs pointing to your files.

<ComponentAttribute name="thermal" type="string">

URL of the thermal file (LRC) to display. The file is loaded whenever this attribute is set or changed; setting a new URL replaces the previously loaded file. Without `thermal`, the application stays empty.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/soustruh.lrc"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/soustruh.lrc')"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="visible" type="string">

URL of a visible (optical) image of the same scene. The image is placed below the thermogram. Use [`opacity`](#opacity) or the opacity slider in the application bar to blend between the thermal and the visible image.

The visible image is read together with the thermal file, so set `visible` before or together with `thermal`. Changing only `visible` later does not reload the file.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/les_thermal.lrc"
    visible="/files/les_visual.png"
    opacity="0.5"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/les_thermal.lrc')"
        :visible="withBase('/files/les_visual.png')"
        opacity="0.5"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="opacity" type="number" default="1">

Initial opacity of the thermogram, from `0` (fully transparent) to `1` (fully opaque). Values outside this range are clamped; an invalid number falls back to `1`. The thermogram becomes transparent only when the file has a [`visible`](#visible) image; without it, the opacity has no visible effect.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/les_thermal.lrc"
    visible="/files/les_visual.png"
    opacity="0.2"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/les_thermal.lrc')"
        :visible="withBase('/files/les_visual.png')"
        opacity="0.2"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="label + author + license">

Texts displayed in the application bar:

- `label` (`string`) – title of the application.
- `author` (`string`) – author credit.
- `license` (`string`) – license credit.

Each attribute is optional; omitted texts are not displayed.

```html
<thermal-file-app
    style="width: 100%"
    thermal="/files/klokan.lrc"
    label="Kangaroo"
    author="LabIR Team"
    license="CC BY 4.0"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        style="width: 100%"
        :thermal="withBase('/files/klokan.lrc')"
        label="Kangaroo"
        author="LabIR Team"
        license="CC BY 4.0"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="show-fullscreen" type="'true' | 'false'" default="false">

Shows the fullscreen toggle in the application bar. Only `"true"` shows the button; omitted, empty, `"false"` and other values keep it hidden.

```html
<thermal-file-app
    style="width: 100%"
    thermal="/files/husy.lrc"
    label="Geese"
    show-fullscreen="true"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        style="width: 100%"
        :thermal="withBase('/files/husy.lrc')"
        label="Geese"
        show-fullscreen="true"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="palette + advanced-palettes">

These two attributes configure the initial palette and which palette choices are offered in the palette dropdown:

- `palette` (`'iron' | 'jet' | 'white_hot' | 'black_hot' | 'lava' | 'arctic' | 'rainbow' | 'rainbow_hc'`, default `jet`) sets the initial palette. Empty or invalid values convert to `iron`.
- `advanced-palettes` (`'true' | 'false'`, default `false`) enables the extended palette choices. Only the exact string `"true"` is true.

See [Thermal palette](../guide/thermal-palette.md) for the available choices.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/makak.lrc"
    palette="lava"
    advanced-palettes="true"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/makak.lrc')"
        palette="lava"
        advanced-palettes="true"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="from + to">

Initial thermal range in °C:

- `from` (`number`) – lower bound of the range.
- `to` (`number`) – upper bound of the range.

The range is applied only when both attributes are set; if either is missing, the full range of the file is used. The user can change the range later with the range form, slider or histogram. See [Thermal range](../guide/thermal-range.md).

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/klokan.lrc"
    from="20"
    to="30"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/klokan.lrc')"
        from="20"
        to="30"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="tool" type="'inspect' | 'add-point' | 'add-rect' | 'add-ellipsis' | 'edit'" default="inspect">

Initially selected analysis tool in the tool bar. An unsupported value falls back to `inspect`.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/husy.lrc"
    tool="add-rect"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/husy.lrc')"
        tool="add-rect"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="analysis1 … analysis7" type="string">

Up to seven analyses created on the loaded file. Each attribute holds one serialized analysis: semicolon-separated segments starting with the **name** and the **type**, followed by the parameters:

- type `rectangle` or `ellipsis`: `top`, `left`, `width`, `height` in pixels of the thermal image;
- type `point`: `top` and `left`;
- `color:<CSS colour>` sets the colour;
- the flags `avg`, `min` and `max` (area) or `avg` (point) turn the corresponding curve on in the graph.

The attributes are synchronised in both directions: editing, adding or removing an analysis in the application updates the attributes, and changing an attribute updates the analysis. Removing the attribute removes the analysis.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/klokan.lrc"
    analysis1="Body;rectangle;color:Blue;top:153;left:200;width:431;height:179;avg;max"
    analysis2="Head;ellipsis;color:Red;top:212;left:439;width:352;height:222;max"
    analysis3="Spot;point;color:Lime;top:100;left:100;avg"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/klokan.lrc')"
        analysis1="Body;rectangle;color:Blue;top:153;left:200;width:431;height:179;avg;max"
        analysis2="Head;ellipsis;color:Red;top:212;left:439;width:352;height:222;max"
        analysis3="Spot;point;color:Lime;top:100;left:100;avg"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="interactiveanalysis" type="'true' | 'false'" default="true">

Enables selecting, editing and removing analyses in the analysis table. With `interactiveanalysis="false"`, the table only displays the analyses. An omitted or empty attribute means `true`; only the exact string `"true"` is true otherwise.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/klokan.lrc"
    interactiveanalysis="false"
    analysis1="Body;rectangle;color:Blue;top:153;left:200;width:431;height:179;avg"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/klokan.lrc')"
        interactiveanalysis="false"
        analysis1="Body;rectangle;color:Blue;top:153;left:200;width:431;height:179;avg"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="ms + speed">

Playback settings of sequences (files with more frames). They have no effect on single-frame images.

- `ms` (`number`, default `0`) – initial position in the sequence in milliseconds. The value is clamped to the duration of the sequence and is updated while the sequence plays.
- `speed` (`0.5 | 1 | 2 | 3 | 5 | 10`, default `1`) – initial playback speed multiplier.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/sequence.lrc"
    ms="2000"
    speed="2"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/sequence.lrc')"
        ms="2000"
        speed="2"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="smooth-thermograms + smooth-graph">

Initial smoothing settings:

- `smooth-thermograms` (`'true' | 'false'`, default `false`) smooths the rendering of the thermal image.
- `smooth-graph` (`'true' | 'false'`, default `false`) smooths the lines of the analysis graph.

Only `"true"` is true; omitted, empty, `"false"` and other values are false.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/husy.lrc"
    smooth-thermograms="true"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/husy.lrc')"
        smooth-thermograms="true"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="locale" type="'en' | 'cs' | 'de' | 'fr' | 'cy'">

Language of the user interface. Regional variants such as `en_GB`, `cs_CZ` or `de_AT` are accepted as well; an unknown value falls back to `en`. When omitted, the current language of the page is kept. The language is shared by all webcomponents on the page, so changing it in one application also changes it in the others.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/husy.lrc"
    locale="cs"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/husy.lrc')"
        locale="cs"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="autohighlight" type="boolean" default="false">

When present, the temperature range of the loaded file is highlighted on the histogram and range slider. Use the attribute without a value; note that `autohighlight="false"` is also treated as present.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/makak.lrc"
    autohighlight
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/makak.lrc')"
        autohighlight
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="manager-slug + registry-slug + group-slug">

Identifiers of the internal manager, registry and group. If omitted, the generic `slug` attribute is used; without either of them, a unique identifier is generated, so every application is independent by default.

Two applications with the same `manager-slug` share the palette, tool and smoothing settings. Applications sharing a manager **and** the same `registry-slug` also share the thermal range and opacity. See [Context providers and consumers](../guide/hierarchy.md).

Because `slug` is used as a fallback by all three identifiers, setting only `slug` on two applications makes them share everything, including the group.

```html
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/makak.lrc"
    manager-slug="shared-file-apps"
></thermal-file-app>
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/klokan.lrc"
    manager-slug="shared-file-apps"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/makak.lrc')"
        manager-slug="shared-file-apps"
    ></thermal-file-app>
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/klokan.lrc')"
        manager-slug="shared-file-apps"
    ></thermal-file-app>
</div>

</ComponentAttribute>

<ComponentAttribute name="autoclear-group" type="'true' | 'false'" default="true">

Removes the internal group (and its file) when the application is removed from the page. Set `autoclear-group="false"` only when the group is shared with other elements by [`group-slug`](#manager-slug-registry-slug-group-slug) and should survive the removal of this application.

</ComponentAttribute>

## Examples

### Thermal image with a visible image

The visible image is displayed below the thermogram. Drag the opacity slider in the application bar to blend the two images.

```html
<thermal-file-app
    style="width: 100%"
    label="Forest"
    thermal="/files/les_thermal.lrc"
    visible="/files/les_visual.png"
    opacity="0.6"
    palette="iron"
    analysis1="Trunk;rectangle;color:Red;top:30;left:60;width:30;height:60;avg;max"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-file-app
        style="width: 100%"
        label="Forest"
        :thermal="withBase('/files/les_thermal.lrc')"
        :visible="withBase('/files/les_visual.png')"
        opacity="0.6"
        palette="iron"
        analysis1="Trunk;rectangle;color:Red;top:30;left:60;width:30;height:60;avg;max"
    ></thermal-file-app>
</div>

### Replace the displayed file

Changing the `thermal` attribute loads another file into the same application.

```html
<thermal-btn onclick="this.parentElement.querySelector('thermal-file-app').setAttribute('thermal', '/files/makak.lrc')">
    Show macaque
</thermal-btn>
<thermal-btn onclick="this.parentElement.querySelector('thermal-file-app').setAttribute('thermal', '/files/klokan.lrc')">
    Show kangaroo
</thermal-btn>
<thermal-file-app
    label="Example"
    style="width: 100%"
    thermal="/files/makak.lrc"
></thermal-file-app>
```

<div class="thermal-file-example">
    <thermal-btn @click="$event.currentTarget.parentElement.querySelector('thermal-file-app').setAttribute('thermal', withBase('/files/makak.lrc'))">
        Show macaque
    </thermal-btn>
    <thermal-btn @click="$event.currentTarget.parentElement.querySelector('thermal-file-app').setAttribute('thermal', withBase('/files/klokan.lrc'))">
        Show kangaroo
    </thermal-btn>
    <thermal-file-app
        label="Example"
        style="width: 100%"
        :thermal="withBase('/files/makak.lrc')"
    ></thermal-file-app>
</div>

### Complete HTML document

This document loads the webcomponents IIFE bundle and prints the analysis whenever the user edits it in the application. Place the bundle (`labirthermal.iife.js`) and your files next to the HTML file, or adjust the URLs.

The setup script deliberately appears **before** the application:

1. `DOMContentLoaded` waits until the application and the output exist in the DOM. It also waits for the deferred bundle in the document head.
2. `customElements.whenDefined('thermal-file-app')` waits for the webcomponent to be registered.
3. Only then does the script observe the application.

Neither wait means that the file is loaded; the file is fetched asynchronously afterwards. The `analysis1` attribute is updated by the application itself, so a `MutationObserver` reports the changes.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thermal file application</title>
    <script defer src="./lib/labirthermal.iife.js"></script>
</head>
<body>
    <script>
        function showAnalysis(app) {
            document.getElementById('analysis-result').textContent =
                app.getAttribute('analysis1') ?? 'The analysis was removed.';
        }

        document.addEventListener('DOMContentLoaded', async () => {
            await customElements.whenDefined('thermal-file-app');

            const app = document.getElementById('example-app');
            const observer = new MutationObserver(() => showAnalysis(app));
            observer.observe(app, { attributes: true, attributeFilter: ['analysis1'] });
            showAnalysis(app);
        });
    </script>

    <thermal-file-app
        id="example-app"
        label="Forest"
        thermal="./files/les_thermal.lrc"
        visible="./files/les_visual.png"
        opacity="0.6"
        analysis1="Trunk;rectangle;color:Red;top:30;left:60;width:30;height:60;avg"
    ></thermal-file-app>
    <output id="analysis-result" aria-live="polite"></output>
</body>
</html>
```

Move or resize the rectangle on the image to see the serialized analysis change. This is a complete standalone document: copy it into your own HTML file and serve it over HTTP (files loaded from `file://` URLs are blocked by browsers).
