# thermal-dialog

<ComponentInfo tag="thermal-dialog" category="UI">

A modal dialog with a title, a close icon and a footer with a close button. The dialog opens when an element in its `invoker` slot is clicked. While it is open, the rest of the page is blurred and cannot be scrolled.

</ComponentInfo>

## Attributes

<ComponentAttribute name="label" type="string">

Title displayed in the header of the dialog. When omitted, the header shows only the close icon.

<ComponentExample>

```html
<thermal-dialog label="Image details">
    <thermal-btn slot="invoker">Open dialog</thermal-btn>
    <div slot="content">The dialog title is set by the label attribute.</div>
</thermal-dialog>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="button" type="string">

Text of the close button in the footer. When omitted, the text is a translation of "Close" in the current language of the webcomponents.

<ComponentExample>

```html
<thermal-dialog label="Information" button="Got it">
    <thermal-btn slot="invoker">Open dialog</thermal-btn>
    <div slot="content">The footer button says "Got it".</div>
</thermal-dialog>
```

</ComponentExample>

</ComponentAttribute>

<ComponentAttribute name="is-fullscreen" type="'true' | 'false'" default="false">

When set to `"true"`, the open dialog fills the whole window and its content scrolls when it is too long. Any other value, including an empty attribute, keeps the regular size.

<ComponentExample>

```html
<thermal-dialog label="Fullscreen dialog" is-fullscreen="true">
    <thermal-btn slot="invoker">Open fullscreen</thermal-btn>
    <div slot="content">This dialog fills the whole window.</div>
</thermal-dialog>
```

</ComponentExample>

</ComponentAttribute>

The component also sets an `open` attribute while the dialog is open. It only reflects the state: adding or removing it in HTML does not open or close the dialog. Standard global HTML attributes such as `id` or `class` work as on any other element.

## Slots

<ComponentExample>

```html
<thermal-dialog label="All slots">
    <thermal-btn slot="invoker">Open dialog</thermal-btn>
    <div slot="content">The main content of the dialog.</div>
    <thermal-btn slot="button" variant="primary">Extra button</thermal-btn>
</thermal-dialog>
```

</ComponentExample>

- `invoker` – the element that opens the dialog when clicked, usually a `thermal-btn`. It stays in the page where the dialog is placed. A `thermal-btn` with `disabled="true"` does not open the dialog.
- `content` – the body of the dialog. It is displayed only while the dialog is open.
- `button` – additional buttons in the footer, displayed before the close button. Clicking them does **not** close the dialog.

The dialog closes with the close icon in the header or the close button in the footer. The component does not handle closing with the Escape key.

## JavaScript API

These members are available on the element once `thermal-dialog` is defined:

- `open` – read-only, `true` while the dialog is open.
- `setOpen()` – opens the dialog.
- `closeFromTheOutside()` – closes the dialog. If `beforeClose` is set, the dialog closes only when it resolves to `true`.
- `beforeClose` – an optional async function returning `true` or `false`. It is checked by the footer close button and by `closeFromTheOutside()`, but not by the close icon in the header.
- `onCloseEveryTime` – an optional function called every time the dialog closes.

`beforeClose` and `onCloseEveryTime` are functions, so they can be set only from JavaScript, not as HTML attributes.

## Examples

After loading the webcomponents bundle as described in [Usage in the browser](../usage.md), paste these examples directly into your HTML body.

### Use a link as the invoker

Any HTML element can be placed in the `invoker` slot, not just a `thermal-btn`. This link opens the dialog; `preventDefault()` prevents navigation without stopping the click from reaching the slot. Prefer an interactive element such as a link or button so it can also be used with a keyboard.

<ComponentExample>

```html
<thermal-dialog label="Image details">
    <a slot="invoker" href="#" onclick="event.preventDefault()">Show image details</a>
    <div slot="content">This dialog was opened by an ordinary HTML link.</div>
</thermal-dialog>
```

</ComponentExample>

### Confirm an action

A button in the `button` slot handles its click with the standard HTML `onclick` attribute. It writes the result next to the dialog and then closes the dialog.

<ComponentExample>

```html
<thermal-dialog label="Delete the file?" button="Cancel">
    <thermal-btn slot="invoker">Delete file</thermal-btn>
    <div slot="content">This action cannot be undone.</div>
    <thermal-btn
        slot="button"
        variant="primary"
        onclick="
            const dialog = this.closest('thermal-dialog');
            dialog.nextElementSibling.textContent = 'File deleted.';
            dialog.closeFromTheOutside();
        "
    >
        Delete
    </thermal-btn>
</thermal-dialog>
<output aria-live="polite">Nothing deleted yet.</output>
```

</ComponentExample>

### Complete HTML document

This example loads the webcomponents IIFE bundle and attaches a named function with `addEventListener`. Replace the placeholder script URL with your own.

The setup script deliberately appears **before** the dialog:

1. `DOMContentLoaded` waits until the dialog, its buttons and the output exist in the DOM. It also waits for the deferred bundle in the document head.
2. `customElements.whenDefined('thermal-dialog')` and `customElements.whenDefined('thermal-btn')` wait for both webcomponents to be registered, so `closeFromTheOutside()` is available.
3. Only then does the script attach the click listener.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dialog example</title>
    <script defer src="/path-to-your-script/labirthermal.iife.js"></script>
</head>
<body>
    <script>
        function confirmDelete() {
            document.getElementById('delete-result').textContent = 'File deleted.';
            document.getElementById('delete-dialog').closeFromTheOutside();
        }

        document.addEventListener('DOMContentLoaded', async () => {
            await Promise.all([
                customElements.whenDefined('thermal-dialog'),
                customElements.whenDefined('thermal-btn'),
            ]);

            const confirmButton = document.getElementById('confirm-delete');
            confirmButton.addEventListener('click', confirmDelete);
        });
    </script>

    <thermal-dialog id="delete-dialog" label="Delete the file?" button="Cancel">
        <thermal-btn slot="invoker">Delete file</thermal-btn>
        <div slot="content">This action cannot be undone.</div>
        <thermal-btn id="confirm-delete" slot="button" variant="primary">
            Delete
        </thermal-btn>
    </thermal-dialog>
    <output id="delete-result" aria-live="polite">Nothing deleted yet.</output>
</body>
</html>
```

The buttons can also be activated with Enter or Space when focused. This is a complete standalone document: copy it into your own HTML file to run it.
