# thermal-dropdown

<ComponentInfo tag="thermal-dropdown" category="UI">

A button that opens a floating list of actions. Click the button again or click outside the list to close it. No context providers are required.

</ComponentInfo>

## Attributes

<ComponentAttribute name="interactive" type="'on' | 'off'" default="on">

Set to `"off"` to disable the invoker. This uses `"on"` and `"off"`, not `"true"` and `"false"`. Only the exact value `"off"` prevents toggling; use the documented values rather than an empty attribute.

This does not close an already open list or prevent JavaScript from calling `setOpen()`.

<ComponentExample>

```html
<thermal-dropdown interactive="off">
    <span slot="invoker">Unavailable</span>
    <div slot="option"><thermal-btn>First action</thermal-btn></div>
</thermal-dropdown>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="variant" type="'primary' | 'foreground' | 'background' | 'default' | 'breadcrumb' | 'text'">

Appearance of the invoker button, not the options. Without this attribute, the button uses its standard light appearance. `"default"` and `"breadcrumb"` also use the base appearance; `"text"` is supported by the button's CSS and removes its background, border and padding.

<ComponentExample>

```html
<thermal-dropdown variant="primary">
    <span slot="invoker">Primary actions</span>
    <div slot="option"><thermal-btn>First action</thermal-btn></div>
</thermal-dropdown>
<thermal-dropdown variant="foreground">
    <span slot="invoker">Foreground actions</span>
    <div slot="option"><thermal-btn>First action</thermal-btn></div>
</thermal-dropdown>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="size" type="'sm' | 'md' | 'lg' | 'xl'">

Size of the invoker button. Omitted and `"md"` use the base button size. Options keep their own sizes.

<ComponentExample>

```html
<thermal-dropdown size="sm">
    <span slot="invoker">Small</span>
    <div slot="option"><thermal-btn>First action</thermal-btn></div>
</thermal-dropdown>
<thermal-dropdown size="lg">
    <span slot="invoker">Large</span>
    <div slot="option"><thermal-btn>First action</thermal-btn></div>
</thermal-dropdown>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="tooltip" type="string">

Tooltip displayed when the invoker is hovered or focused. Omitted or empty values show no tooltip. Tooltips for individual options must be set on their buttons separately.

<ComponentExample>

```html
<thermal-dropdown tooltip="Choose a file action">
    <span slot="invoker">File actions</span>
    <div slot="option"><thermal-btn>First action</thermal-btn></div>
</thermal-dropdown>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="icon + iconstyle">

An icon displayed before the invoker label. The two attributes work together:

- `icon` (`string`) – name of a built-in icon. Unknown names are ignored.
- `iconstyle` (`'outline' | 'solid' | 'mini' | 'micro'`, default `outline`) – style of that icon. It has no effect without `icon`.

Not every icon exists in every style; an unavailable combination renders no icon. The dropdown arrow is shown independently of the icon.

See [Icons](../icons.md) for the complete catalog with previews and usage across components.

<ComponentExample>

```html
<thermal-dropdown icon="download">
    <span slot="invoker">Outline (default)</span>
    <div slot="option"><thermal-btn>Download image</thermal-btn></div>
</thermal-dropdown>
<thermal-dropdown icon="download" iconstyle="micro">
    <span slot="invoker">Micro</span>
    <div slot="option"><thermal-btn>Download image</thermal-btn></div>
</thermal-dropdown>
```

</ComponentExample>

</ComponentAttribute>

There are no additional component-specific attributes inherited from the base class. Standard global HTML attributes such as `id`, `class` and `style` are not listed here. A `label` attribute does not set the invoker text: use the `invoker` slot.

## Slots

- `invoker` replaces the default text "Dropdown" inside the built-in button. Use text content in a `span`, or other non-interactive content. Unlike [thermal-dialog](./thermal-dialog.md), this does not replace the entire invoker: avoid nesting another button or link inside it.
- `option` supplies the list entries. Use a separate `div slot="option"` containing a button for each action, as shown below.

<ComponentExample>

```html
<thermal-dropdown>
    <span slot="invoker">Actions</span>
    <div slot="option"><thermal-btn>First action</thermal-btn></div>
    <div slot="option"><thermal-btn>Second action</thermal-btn></div>
</thermal-dropdown>
```

</ComponentExample>

**Automatic closing:** the component attaches close listeners to the child nodes of each `option` element during its first render. With the wrapper structure above, clicking the button closes the list. A button placed directly in `slot="option"` does not automatically close it. Options inserted later do not receive these automatic close listeners; call `setClose()` in their handlers if needed.

The list opens below the invoker and can flip or shift to fit the viewport. Its position is recalculated when `isOpen` changes, not continuously during scrolling or resizing.

## JavaScript API

- `isOpen` is the string `"open"` or `"close"`, reflected to `isopen`.
- `setOpen()` opens the list, even with `interactive="off"`.
- `setClose()` closes the list.
- `toggle()` toggles the list unless `interactive="off"`.

Before opening programmatically for the first time, await `customElements.whenDefined('thermal-dropdown')`, obtain the element and await its Lit `updateComplete` promise. Registration alone does not mean its internal button and option container have rendered.

The component does not emit a custom selection event. Handle the standard `click` event on each option button.

## Examples

Load the webcomponents bundle as described in [Usage in the browser](../usage.md) before using these examples.

### Choose an action

Each option updates the output with an HTML `onclick` handler. The wrapper structure makes the list close automatically. The handler checks `disabled` because listeners on the button itself still run for disabled buttons. Clicking a disabled option may still close the list, but does not update the output.

<ComponentExample>

```html
<thermal-dropdown>
    <span slot="invoker">Choose an action</span>
    <div slot="option">
        <thermal-btn onclick="
            if (event.defaultPrevented || this.getAttribute('disabled') === 'true') return;
            this.closest('thermal-dropdown').nextElementSibling.textContent = 'Download selected.';
        ">Download</thermal-btn>
    </div>
    <div slot="option">
        <thermal-btn disabled="true" onclick="
            if (event.defaultPrevented || this.getAttribute('disabled') === 'true') return;
            this.closest('thermal-dropdown').nextElementSibling.textContent = 'Delete selected.';
        ">Delete (unavailable)</thermal-btn>
    </div>
</thermal-dropdown>
<output aria-live="polite">No action selected.</output>
```

</ComponentExample>

### Complete HTML document

This example loads the webcomponents IIFE bundle and attaches a named click handler. Replace the placeholder script URL with your own.

`DOMContentLoaded` waits for the body to be parsed and the deferred bundle to run. `customElements.whenDefined()` waits for the tags to be registered; it does not wait for rendering, images or data fetching. Here the list opens only after the user clicks its invoker.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dropdown example</title>
    <script defer src="/path-to-your-script/labirthermal.iife.js"></script>
</head>
<body>
    <script>
        function selectAction(event) {
            const button = event.currentTarget;
            if (
                event.defaultPrevented ||
                button.getAttribute('disabled') === 'true'
            ) {
                return;
            }

            document.getElementById('action-result').textContent =
                'Selected: ' + button.textContent.trim();
        }

        document.addEventListener('DOMContentLoaded', async () => {
            await Promise.all([
                customElements.whenDefined('thermal-dropdown'),
                customElements.whenDefined('thermal-btn'),
            ]);

            const dropdown = document.getElementById('file-actions');
            for (const button of dropdown.querySelectorAll('[slot="option"] > thermal-btn')) {
                button.addEventListener('click', selectAction);
            }
        });
    </script>

    <thermal-dropdown id="file-actions" icon="download">
        <span slot="invoker">File actions</span>
        <div slot="option"><thermal-btn>Download</thermal-btn></div>
        <div slot="option"><thermal-btn>Show details</thermal-btn></div>
        <div slot="option"><thermal-btn disabled="true">Delete</thermal-btn></div>
    </thermal-dropdown>
    <output id="action-result" aria-live="polite">No action selected.</output>
</body>
</html>
```

The invoker and option buttons can be focused with Tab and activated with Enter or Space. This is not a native select: no arrow-key navigation or Escape handler is implemented.
