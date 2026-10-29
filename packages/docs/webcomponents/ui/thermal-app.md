# thermal-app

<ComponentInfo tag="thermal-app" category="UI">

An application frame with a sticky header, responsive toolbar, optional fullscreen control and credits. Put ordinary HTML or other webcomponents into its slots. The frame itself does not load thermal files and does not require a context provider.

</ComponentInfo>

## Attributes

HTML attribute names are lowercase. Standard HTML attributes such as `id`, `class` and `style` work as usual and are not listed individually.

<ComponentAttribute name="label" type="string">

Text of the built-in title button. Without a label, no title button is rendered. The button is non-interactive unless the JavaScript callback `onlabel` is assigned. Content in the `label` slot replaces this button entirely.

<ComponentExample>

```html
<thermal-app label="Inspection">
    <p>Main application content.</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="labelicon + labeliconstyle">

An icon before the built-in title:

- `labelicon` (`string`) selects an icon from the built-in catalog.
- `labeliconstyle` (`'outline' | 'solid' | 'mini' | 'micro'`) selects its style. The title button defaults to `outline`; this attribute has no effect without an icon.

Both require `label` and have no effect on a custom `label` slot. Unknown names or unavailable name/style combinations render no icon. See [Icons](../icons.md) for the complete catalog with previews.

<ComponentExample>

```html
<thermal-app label="Inspection" labelicon="image">
    <p>A title with the default outline icon.</p>
</thermal-app>
<thermal-app label="Information" labelicon="info" labeliconstyle="solid">
    <p>A title with a solid icon.</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="labeltooltip" type="string">

Tooltip of the built-in title button. Requires `label`; does not affect a custom title slot.

<ComponentExample>

```html
<thermal-app label="Inspection" labeltooltip="Inspection of the north wall">
    <p>Hover over the title.</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="labelvariant" type="'primary' | 'foreground' | 'background' | 'default' | 'breadcrumb'" default="foreground">

Visual variant of the built-in title button, using the same values as [`thermal-btn`](./thermal-btn.md#variant). Requires `label`; does not affect a custom title slot. `breadcrumb` has no dedicated colour rule, so its colours use the button's base styling.

<ComponentExample>

```html
<thermal-app label="Primary" labelvariant="primary"><p>Primary title.</p></thermal-app>
<thermal-app label="Foreground" labelvariant="foreground"><p>Default title.</p></thermal-app>
<thermal-app label="Background" labelvariant="background"><p>Background title.</p></thermal-app>
<thermal-app label="Default" labelvariant="default"><p>Base button styling.</p></thermal-app>
<thermal-app label="Breadcrumb" labelvariant="breadcrumb"><p>Base button colours.</p></thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="show-fullscreen" type="boolean" default="false" tag="thermal-app">

When `show-fullscreen` is present, the built-in fullscreen toggle is shown in the header. This only controls the button's visibility; it does not enter fullscreen by itself.

<ComponentExample>

```html
<thermal-app label="Fullscreen demo" show-fullscreen>
    <p>Use the expand icon in the header to enter fullscreen.</p>
    <p>Use the same control or the browser's Escape key to leave it.</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="fullscreen" type="'on' | 'off'" default="off">

State of native browser fullscreen, managed by the component. The component sets it to `on` or `off` whenever the browser enters or leaves fullscreen, including when the user presses Escape, so you can use `[fullscreen="on"]` as a CSS state selector.

Writing the attribute also controls fullscreen: `on` requests fullscreen for this frame and `off` exits it if this frame is the current fullscreen element. Use these exact values, not `true` or `false`.

Do not use it as an initial configuration value. Browsers require a user action, so `fullscreen="on"` in the initial markup is rejected and the attribute returns to `off`. The browser must support and permit the Fullscreen API; an iframe also needs fullscreen permission. Rejected requests are logged and the attribute is synchronized with the actual fullscreen state. For your own controls, prefer [`toggleFullscreen()`](#custom-fullscreen-control); to show the built-in control, use [`show-fullscreen`](#show-fullscreen).

<ComponentExample>

```html
<style>
    thermal-app.fullscreen-state-demo[fullscreen="on"] {
        background: var(--thermal-background);
    }
</style>
<thermal-app class="fullscreen-state-demo" label="Fullscreen state">
    <thermal-btn
        slot="bar-pre"
        onclick="this.closest('thermal-app').setAttribute('fullscreen', 'on')"
    >Enter fullscreen</thermal-btn>
    <p>The button writes fullscreen="on" from a click. Press Escape to leave; the component sets fullscreen="off".</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="author" type="string">

Author credit below the main content and `post` slot. Omitted, empty or whitespace-only values produce no field.

<ComponentExample>

```html
<thermal-app label="Inspection" author="LabIR Team">
    <p>Inspection results.</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="recorded" type="string">

Recording date or other recording-time text. Displayed as supplied, without date parsing or formatting. Omitted, empty or whitespace-only values produce no field.

<ComponentExample>

```html
<thermal-app label="Inspection" recorded="21 October 2026, 10:30">
    <p>Inspection results.</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="license" type="string">

License credit, rendered as plain text rather than a link. Omitted, empty or whitespace-only values produce no field.

<ComponentExample>

```html
<thermal-app label="Inspection" license="CC BY 4.0">
    <p>Inspection results.</p>
</thermal-app>
```

</ComponentExample>

When combined, credits appear in the order **recorded, author, license**.

</ComponentAttribute>

<ComponentAttribute name="skin" type="'dark' | 'solarized' | 'system' | 'darkhc'">

A predefined colour scheme for the frame and everything inside it. Omit the attribute for the default colours; there is no `skin="light"`.

- `dark` – white text on a dark grey palette with an aqua accent.
- `solarized` – teal and cyan colours on a dark blue background.
- `system` – browser system colours.
- `darkhc` – black text on white and light grey surfaces with a blue accent. Despite its name, this is currently a light palette.

The attribute is a global styling hook provided by the bundle's stylesheet, not a property of the component, so changing it in JavaScript requires `setAttribute`. See [Styling and CSS variables](../guide/styling.md) for custom colours.

<ComponentExample>

```html
<thermal-app label="Default" style="width: 100%"><p>Default colours.</p></thermal-app>
<thermal-app label="Dark" skin="dark" style="width: 100%"><p>Dark colours.</p></thermal-app>
<thermal-app label="Solarized" skin="solarized" style="width: 100%"><p>Solarized colours.</p></thermal-app>
<thermal-app label="System" skin="system" style="width: 100%"><p>Browser system colours.</p></thermal-app>
<thermal-app label="High contrast" skin="darkhc" style="width: 100%"><p>Currently a light high-contrast palette.</p></thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="corners" type="'narrow'">

`narrow` removes rounded corners from the frame and the controls inside it. Omit the attribute for normal corners. Like `skin`, this is a global styling hook.

<ComponentExample>

```html
<thermal-app label="Square corners" corners="narrow" style="width: 100%">
    <thermal-btn slot="bar-pre">Square button</thermal-btn>
    <p>No rounded corners.</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="lines" type="'big'">

`big` makes the borders of the frame and the controls inside it 3 pixels thick. Omit the attribute for normal borders. Like `skin`, this is a global styling hook.

<ComponentExample>

```html
<thermal-app label="Thick borders" lines="big" style="width: 100%">
    <thermal-btn slot="bar-pre">Thick button</thermal-btn>
    <p>Three-pixel borders.</p>
</thermal-app>
<thermal-app label="Combined" skin="dark" corners="narrow" lines="big" style="width: 100%">
    <p>Skin, corners and lines can be combined.</p>
</thermal-app>
```

</ComponentExample>

</ComponentAttribute>

## Slots

Set `slot` on a **direct child** of the frame. Use a wrapper if several elements should form one slot item. Unlike the default slot, named slots do not receive children without an explicit `slot` attribute.

| Slot | Position and behaviour |
| --- | --- |
| `label` | Replaces the built-in title button. Can contain a link, image, text wrapper or custom button. Title attributes and `onlabel` do not configure this replacement. |
| `bar-header` | In the top row, immediately after the title and before the responsive tools. Not moved into overflow. Hidden when it has no assigned elements. |
| `bar-pre` | Toolbar items before the flexible spacer. Items can move into overflow when space runs out. |
| `bar-post` | Toolbar items after the flexible spacer, toward the right. Items can move into overflow when space runs out. |
| `close` | After the responsive tools, before the built-in header controls. Only a placement slot: clicking its contents does not automatically close or remove the frame. |
| `pre` | A row below the toolbar, inside the sticky header. Hidden when it has no assigned elements. |
| `pre-bar` | Another row after `pre`, still inside the sticky header. Uses a horizontal flex layout; hidden when it has no assigned elements. |
| `pre-bar-wrap` | After `pre-bar`, still inside the sticky header. Rendered directly without the horizontal flex wrapper used by `pre-bar`. |
| Default (no `slot`) | Main content below the sticky header. Exposed for styling as `::part(app-content)`. |
| `post` | After the main content, before the credits. |
| `content` | Additional content **after the credits**, not the main content area. Gets top spacing when assigned elements are present. |
| `bar-overflow` | Reserved for toolbar items moved automatically from `bar-pre` and `bar-post`. Do not assign your own items here. |

Use elements rather than bare text for `bar-header`, `pre`, `pre-bar` and `content`: their presence checks count assigned elements, not text nodes.

### A layout with named slots

The order below follows the visual layout. The custom title link replaces `label`; the close-slot button only updates the status, because closing behaviour belongs to your application.

<ComponentExample>

```html
<thermal-app label="Replaced title" show-fullscreen author="LabIR Team">
    <a slot="label" href="#slots" style="white-space: nowrap">Inspection</a>
    <span slot="bar-header">Draft</span>
    <thermal-btn slot="bar-pre" onclick="this.closest('thermal-app').querySelector('output').textContent = 'Saved.'">Save</thermal-btn>
    <thermal-btn slot="bar-post" icon="info" tooltip="Inspection information">Info</thermal-btn>
    <thermal-btn slot="close" onclick="this.closest('thermal-app').querySelector('output').textContent = 'Close requested.'">Close</thermal-btn>
    <div slot="pre">North wall / first floor</div>
    <div slot="pre-bar">Review the measurements before saving.</div>
    <div slot="pre-bar-wrap">Additional header content outside the horizontal toolbar row.</div>
    <section style="padding: 16px; line-height: 1.5">
        <h4>Main content</h4>
        <output aria-live="polite">Waiting for an action.</output>
    </section>
    <div slot="post">End of measurements.</div>
    <div slot="content">Additional notes appear after the author credit.</div>
</thermal-app>
```

</ComponentExample>

### Responsive toolbar

The toolbar measures available space and moves items from the end of the combined `bar-pre`, then `bar-post` sequence into a collapsible overflow panel. Earlier items are kept first, so put essential actions first. A wrapper counts as one item and moves as a whole.

The component changes each moved child's `slot` to `bar-overflow` and remembers its original slot in `data-original-slot`. When the frame grows again, the items return to their original slots. Avoid overwriting these while overflow is active.

Drag the example's right edge to resize it, then use the options icon to reveal tools that no longer fit. The title, `bar-header`, `close` and built-in header controls stay in the top row; they are not moved into overflow. Keep these fixed areas compact to leave room for tools.

<ComponentExample>

```html
<div style="width: 100%; max-width: 600px; min-width: 280px; resize: horizontal; overflow: auto; padding: 4px">
    <thermal-app label="Tools">
        <thermal-btn slot="bar-pre">Open inspection</thermal-btn>
        <thermal-btn slot="bar-pre">Save changes</thermal-btn>
        <thermal-btn slot="bar-pre">Compare images</thermal-btn>
        <thermal-btn slot="bar-post">Export report</thermal-btn>
        <p>Resize this frame to move tools into and out of the options panel.</p>
    </thermal-app>
</div>
```

</ComponentExample>

## JavaScript API

| JavaScript API | Purpose |
| --- | --- |
| `toggleFullscreen()` | Toggles native fullscreen by switching the `fullscreen` attribute between `on` and `off`. Call from a user action. |
| `fullscreen` | String property synchronized with the `fullscreen` attribute. The component updates it from the browser's fullscreen state. |
| `showFullscreen` | Boolean property corresponding to `show-fullscreen`. |
| `labelIcon`, `labelIconStyle`, `labelTooltip`, `labelVariant` | Camel-cased properties corresponding to lowercase HTML attributes. |
| `onlabel` | Function called on a click on the built-in title button. Assign a function in JavaScript; do not use an HTML `onlabel` string. |

Although `onlabel` is declared as an Object property, an HTML value is not executable callback code. Set it only after the element is registered by waiting for `customElements.whenDefined('thermal-app')`. Assigning it makes the built-in title interactive. Listen to standard `click` events on your own slotted controls; the frame does not emit a custom save or close event.

## Styling

Use the `skin`, `corners` and `lines` attributes above for predefined looks. For custom colours, spacing, typography and the `::part(app-content)` selector, see [Styling and CSS variables](../guide/styling.md#styling-thermal-app).

Use the [`fullscreen`](#fullscreen) state selector `[fullscreen="on"]` for fullscreen-specific styles.

## Examples

### Custom fullscreen control

Call `toggleFullscreen()` from a user action. The browser must support and permit the Fullscreen API; an iframe also needs fullscreen permission. Rejected requests are logged and the [`fullscreen`](#fullscreen) attribute is synchronized with the browser.

In fullscreen, the frame fills the viewport, scrolls internally and removes its outer border and rounded corners. The header stays sticky. Use the control again or Escape to leave fullscreen.

<ComponentExample>

```html
<thermal-app label="Custom fullscreen control">
    <thermal-btn
        slot="bar-pre"
        onclick="this.closest('thermal-app').toggleFullscreen()"
    >Toggle fullscreen</thermal-btn>
    <p>Use the custom button to enter or leave fullscreen.</p>
</thermal-app>
```

</ComponentExample>

### Custom editor

A simple editor for three files. The providers are nested in the order manager → registry → group, so all controls and files share one palette, analysis tool and temperature range. The palette and the toolbar are in `bar-pre`, the range form in `pre`, the range slider in `pre-bar-wrap` and the [file providers](../providers/file-provider.md) in the default slot.

<ComponentExample>

```html
<style>
    .custom-editor {
        display: block;
        width: 100%;
    }

    .custom-editor__files {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
        gap: 16px;
        padding: 16px;
    }

    .custom-editor__files > file-provider {
        display: block;
        min-width: 0;
    }
</style>

<manager-provider class="custom-editor" palette="iron">
    <registry-provider>
        <group-provider>
            <thermal-app label="Custom editor" show-fullscreen>

                <manager-palette-dropdown slot="bar-pre"></manager-palette-dropdown>
                <manager-tool-bar slot="bar-pre" horizontal="true"></manager-tool-bar>

                <registry-range-form slot="pre"></registry-range-form>

                <div slot="pre-bar-wrap">
                    <registry-range-slider></registry-range-slider>
                    <registry-ticks-bar></registry-ticks-bar>
                </div>

                <div class="custom-editor__files">
                    <file-provider thermal="../../files/makak.lrc">
                        <file-canvas></file-canvas>
                        <file-analysis-table></file-analysis-table>
                    </file-provider>

                    <file-provider thermal="../../files/klokan.lrc">
                        <file-canvas></file-canvas>
                        <file-analysis-table></file-analysis-table>
                    </file-provider>

                    <file-provider thermal="../../files/husy.lrc">
                        <file-canvas></file-canvas>
                        <file-analysis-table></file-analysis-table>
                    </file-provider>
                </div>

            </thermal-app>
        </group-provider>
    </registry-provider>
</manager-provider>
```

</ComponentExample>
