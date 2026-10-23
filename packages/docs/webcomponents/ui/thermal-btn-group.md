# thermal-btn-group

<ComponentInfo tag="thermal-btn-group" category="UI">

Joins several [`thermal-btn`](./thermal-btn.md) elements into a single horizontal row. Inner corners are squared and the borders between neighbouring buttons are merged, so the buttons look like one segmented control. Typical uses are switches between a few options or toolbars of related actions.

</ComponentInfo>

## Attributes

`thermal-btn-group` has no component-specific attributes. All appearance and behaviour is configured on the individual [`thermal-btn`](./thermal-btn.md#attributes) elements inside it. Standard global HTML attributes such as `id`, `class` or `style` work as on any other element.

## Slots

The group has a single default slot. Place `thermal-btn` elements directly inside it:

<ComponentExample>

```html
<thermal-btn-group>
    <thermal-btn>First</thermal-btn>
    <thermal-btn>Second</thermal-btn>
    <thermal-btn>Third</thermal-btn>
</thermal-btn-group>
```

</ComponentExample>

Keep the following layout rules in mind:

- Only `thermal-btn` elements that are **direct children** of the group are joined. Buttons wrapped in another element, or other elements in the slot, are displayed without the joined corners and borders.
- The first and last positions are determined by element order. If another element comes before the first button or after the last one, that button does not get the rounded outer corners.
- Use at least two buttons. A group with a single button displays it with square left corners and no right border.
- The buttons are laid out in one row and never wrap. Keep the number of buttons and their labels short enough for the available width.
- The group itself is a block element, so it starts on a new line and takes the full available width.

## Examples

After loading the webcomponents bundle as described in [Usage in the browser](../usage.md), paste these examples directly into your HTML body.

### Combine button attributes

Each button in the group keeps its own attributes, such as `variant`, [`icon + iconstyle`](./thermal-btn.md#icon-iconstyle) or `tooltip`. See [Icons](../icons.md) for the available icon names and styles.

<ComponentExample>

```html
<thermal-btn-group>
    <thermal-btn icon="download" tooltip="Download the file">Download</thermal-btn>
    <thermal-btn icon="info" tooltip="Show file details">Info</thermal-btn>
    <thermal-btn icon="image" variant="primary" tooltip="Open the image">Open</thermal-btn>
</thermal-btn-group>
```

</ComponentExample>

### Switch between options

Highlight the selected button by changing its `variant`. A single `onclick` on the group handles clicks on all of its buttons, because button clicks bubble up to the group.

<ComponentExample>

```html
<thermal-btn-group
    onclick="
        const button = event.target.closest('thermal-btn');
        if (!button) return;
        for (const item of this.children) {
            item.setAttribute('variant', item === button ? 'primary' : 'default');
        }
        this.nextElementSibling.textContent = 'Selected: ' + button.textContent.trim();
    "
>
    <thermal-btn variant="primary">Iron</thermal-btn>
    <thermal-btn>Jet</thermal-btn>
    <thermal-btn>Grayscale</thermal-btn>
    <thermal-btn disabled="true">Unavailable</thermal-btn>
</thermal-btn-group>
<output aria-live="polite">Selected: Iron</output>
```

</ComponentExample>

A `thermal-btn` with `disabled="true"` stops its click event, so clicks on it never reach the group handler.

### Complete HTML document

This example loads the webcomponents IIFE bundle and attaches a named function to the group with `addEventListener`. Replace the placeholder script URL with your own.

The setup script deliberately appears **before** the group:

1. `DOMContentLoaded` waits until the group, its buttons and the output exist in the DOM. It also waits for the deferred bundle in the document head.
2. `customElements.whenDefined('thermal-btn-group')` and `customElements.whenDefined('thermal-btn')` wait for both webcomponents to be registered.
3. Only then does the script attach the click listener.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Button group example</title>
    <script defer src="/path-to-your-script/labirthermal.iife.js"></script>
</head>
<body>
    <script>
        function selectOption(event) {
            const button = event.target.closest('thermal-btn');

            if (!button) {
                return;
            }

            for (const item of event.currentTarget.children) {
                item.setAttribute('variant', item === button ? 'primary' : 'default');
            }

            document.getElementById('selected-option').textContent =
                'Selected: ' + button.textContent.trim();
        }

        document.addEventListener('DOMContentLoaded', async () => {
            await Promise.all([
                customElements.whenDefined('thermal-btn-group'),
                customElements.whenDefined('thermal-btn'),
            ]);

            const group = document.getElementById('palette-switch');
            group.addEventListener('click', selectOption);
        });
    </script>

    <thermal-btn-group id="palette-switch">
        <thermal-btn variant="primary">Iron</thermal-btn>
        <thermal-btn>Jet</thermal-btn>
        <thermal-btn>Grayscale</thermal-btn>
        <thermal-btn disabled="true">Unavailable</thermal-btn>
    </thermal-btn-group>
    <output id="selected-option" aria-live="polite">Selected: Iron</output>
</body>
</html>
```

The buttons can also be activated with Enter or Space when focused, which triggers the same click handler. This is a complete standalone document: copy it into your own HTML file to run it.
