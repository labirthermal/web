# thermal-btn

<ComponentInfo tag="thermal-btn" category="UI">

A generic button used across all labir UI elements.

</ComponentInfo>

## Attributes

<ComponentAttribute name="variant" type="'primary' | 'foreground' | 'background' | 'default' | 'breadcrumb'">

Visual variant of the button.

<ComponentExample>

```html
<thermal-btn variant="primary">Primary</thermal-btn>
<thermal-btn variant="foreground">Foreground</thermal-btn>
<thermal-btn variant="background">Background</thermal-btn>
<thermal-btn variant="default">Default</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="size" type="'sm' | 'md' | 'lg' | 'xl'">

Size of the button.

<ComponentExample>

```html
<thermal-btn size="sm">Small</thermal-btn>
<thermal-btn size="md">Medium</thermal-btn>
<thermal-btn size="lg">Large</thermal-btn>
<thermal-btn size="xl">Extra large</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="disabled" type="boolean" default="false" tag="thermal-btn">

When `disabled` is present, the button is dimmed, ignores Enter and Space, and stops its click event before any of your listeners run.

<ComponentExample>

```html
<thermal-btn disabled>Disabled</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="icon + iconstyle">

An icon displayed before the label. The two attributes work together:

- `icon` (`string`) – name of a built-in icon. Unknown names are ignored.
- `iconstyle` (`'outline' | 'solid' | 'mini' | 'micro'`, default `outline`) – style of that icon. It has no effect without `icon`.

Not every icon exists in every style; an unavailable combination renders no icon. A button with an icon and no text shows only the icon.

See [Icons](../icons.md) for the complete catalog with previews and usage across components.

<ComponentExample>

```html
<thermal-btn icon="settings">Outline (default)</thermal-btn>
<thermal-btn icon="settings" iconstyle="solid">Solid</thermal-btn>
<thermal-btn icon="info" iconstyle="mini">Mini</thermal-btn>
<thermal-btn icon="trash" iconstyle="micro">Micro</thermal-btn>
<thermal-btn icon="download"></thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="pre" type="string">

Prefix text displayed before the label.

<ComponentExample>

```html
<thermal-btn pre="Palette:">Iron</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="tooltip" type="string">

Text of a tooltip displayed when the button is hovered.

<ComponentExample>

```html
<thermal-btn tooltip="I am a tooltip">Hover me</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="tooltip-placement" type="'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | …" default="top">

Preferred position of the tooltip. Accepts any [Floating UI placement](https://floating-ui.com/docs/computePosition#placement). The tooltip flips automatically when there is not enough space.

<ComponentExample>

```html
<thermal-btn tooltip="Top" tooltip-placement="top">Top</thermal-btn>
<thermal-btn tooltip="Bottom" tooltip-placement="bottom">Bottom</thermal-btn>
<thermal-btn tooltip="Left" tooltip-placement="left">Left</thermal-btn>
<thermal-btn tooltip="Right" tooltip-placement="right">Right</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="non-interactive" type="boolean" default="false" tag="thermal-btn">

When `non-interactive` is present, the button is rendered as a static label without hover and focus feedback. Useful for buttons that only display information. When omitted, the button is interactive.

<ComponentExample>

```html
<thermal-btn>Interactive</thermal-btn>
<thermal-btn non-interactive>Not interactive</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="plain" type="boolean" default="false" tag="thermal-btn">

When `plain` is present, the button has no border.

<ComponentExample>

```html
<thermal-btn>With border</thermal-btn>
<thermal-btn plain>Plain</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="badge" type="CSS color">

Displays a small dot in the top right corner of the button in the given colour.

<ComponentExample>

```html
<thermal-btn badge="red">Notifications</thermal-btn>
<thermal-btn badge="limegreen">Online</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="align" type="'center' | 'left'" default="center">

Horizontal alignment of the content. The difference is visible only when the button is wider than its content.

<ComponentExample>

```html
<thermal-btn align="center" style="width: 200px">Center</thermal-btn>
<thermal-btn align="left" style="width: 200px">Left</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>

## Examples

After loading the webcomponents bundle as described in [Usage in the browser](../usage.md), paste these examples directly into your HTML body. Each button handles its click with the standard HTML `onclick` attribute.

### Show a message

Click the button to change the text next to it.

<ComponentExample>

```html
<thermal-btn
    variant="primary"
    onclick="this.nextElementSibling.textContent = 'Button clicked!'"
>
    Click me
</thermal-btn>
<output aria-live="polite">Waiting for a click.</output>
```

</ComponentExample>

### Count clicks

Each click increases the counter by one.

<ComponentExample>

```html
<thermal-btn
    onclick="
        const counter = this.nextElementSibling;
        counter.value = Number(counter.value) + 1;
    "
>
    Count clicks
</thermal-btn>
<output aria-live="polite">0</output>
```

</ComponentExample>

### Complete HTML document

This example loads the webcomponents IIFE bundle and attaches a named function with `addEventListener`. Replace the placeholder script URL with your own.

The setup script deliberately appears **before** the button:

1. `DOMContentLoaded` waits until the button and output exist in the DOM. It also waits for the deferred bundle in the document head.
2. `customElements.whenDefined('thermal-btn')` waits for the webcomponent to be registered.
3. Only then does the script attach the click listener.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webcomponent click example</title>
    <script defer src="/path-to-your-script/labirthermal.iife.js"></script>
</head>
<body>
    <script>
        function showMessage() {
            document.getElementById('click-result').textContent = 'Button clicked!';
        }

        document.addEventListener('DOMContentLoaded', async () => {
            await customElements.whenDefined('thermal-btn');

            const button = document.getElementById('example-button');
            button.addEventListener('click', showMessage);
        });
    </script>

    <thermal-btn id="example-button" variant="primary">
        Click me
    </thermal-btn>
    <output id="click-result" aria-live="polite">Waiting for a click.</output>
</body>
</html>
```

The click handler also works when the focused button is activated with Enter or Space. If you add the `disabled` attribute to the button, the handler is never called, so it needs no disabled check of its own. This is a complete standalone document: copy it into your own HTML file to run it.
