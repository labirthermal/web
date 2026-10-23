# Styling and CSS variables

All `@labirthermal/webcomponents` elements share one theme defined by CSS custom properties (variables) prefixed with `--thermal-`. The components render inside Shadow DOM, so page CSS cannot target their internal elements. Custom properties, however, inherit through Shadow DOM boundaries: set a variable on a component or any of its ancestors and every component inside uses the new value.

## How the defaults are installed

When the IIFE bundle runs, it appends `<style>` elements to the end of the document `<head>`. They contain:

- default values of all theme variables on `:root`,
- responsive overrides of spacing and corner radius,
- the `body.thermal-dark-mode` colour overrides,
- the preset `skin`, `corners` and `lines` attribute selectors.

Because these rules are appended **after** your own stylesheets and use the `:root` selector, a plain `:root { … }` rule in your stylesheet loses to them. For page-wide overrides, use a more specific selector such as `html:root`, or set the variables on `body` or another container.

```css
html:root {
    --thermal-primary-base: #c2410c;
    --thermal-gap-base: 12px;
}
```

## Variables

### Colours

| Variable | Default | Used for |
| --- | --- | --- |
| `--thermal-foreground` | `black` | Text, icons and the background of `foreground` buttons. |
| `--thermal-background` | `white` | Surfaces of `background` buttons, dialogs and dropdowns, and contrasting text on dark buttons. |
| `--thermal-primary` | `var(--thermal-primary-base)` | Accent colour, including `primary` buttons. |
| `--thermal-primary-dark` | `var(--thermal-primary-base-dark)` | Hover state of accent elements. |
| `--thermal-primary-light` | `var(--thermal-primary-base-light)` | Light accent surfaces. |
| `--thermal-slate` | `var(--thermal-slate-base)` | Borders and neutral surfaces. |
| `--thermal-slate-light` | `var(--thermal-slate-base-light)` | Default button background and application frame background. |
| `--thermal-slate-dark` | `var(--thermal-slate-base-dark)` | Hover colours, tooltips and the default shadow. |

The accent and neutral colours are built from **base** variables. Change these on the root element to recolour the whole page while keeping light/dark variants consistent:

| Base variable | Default |
| --- | --- |
| `--thermal-primary-base` | `blue` |
| `--thermal-primary-base-dark` | `navy` |
| `--thermal-primary-base-light` | `lightblue` |
| `--thermal-slate-base` | `#8e8c8f` |
| `--thermal-slate-base-dark` | `#49474a` |
| `--thermal-slate-base-light` | `#dad7db` |

### Spacing, corners and borders

| Variable | Default | Used for |
| --- | --- | --- |
| `--thermal-gap` | Responsive, `16px`–`20px` | Padding and spacing inside components. |
| `--thermal-radius` | Responsive, `5px`–`9px` | Rounded corners. |
| `--thermal-border-width` | `1px` | Border thickness. |
| `--thermal-border-style` | `solid` | Border style, such as `dashed` or `dotted`. |
| `--thermal-shadow` | `0px 0px 5px var(--thermal-slate-dark)` | Hover shadows of buttons and shadows of floating panels. |
| `--thermal-shadow-none` | `0px 0px 0px transparent` | A "no shadow" value for transitions. |

### Typography

| Variable | Default | Used for |
| --- | --- | --- |
| `--thermal-fs` | `16px` | Base font size. Buttons use `0.8` of it. |
| `--thermal-fs-small` | `calc(var(--thermal-fs) * 0.9)` | Smaller text. |
| `--thermal-fs-large` | `calc(var(--thermal-fs) * 1.2)` | Larger text. |
| `--thermal-fs-sm` | `16px` | Credits and other fine print. |
| `--thermal-font-family` | Not set | Font of `thermal-btn`. When unset, buttons inherit the surrounding font. |
| `--thermal-line-height` | Not set | Line height of `thermal-btn`. When unset, buttons inherit it. |

### Responsive values

`--thermal-gap`, `--thermal-radius` and `--thermal-fs` switch between size steps at viewport breakpoints. The steps are themselves variables:

| Viewport width | Gap | Radius | Font size |
| --- | --- | --- | --- |
| Below `640px` | `--thermal-gap-base` (`16px`) | `--thermal-radius-base` (`5px`) | `--thermal-fs-base` (`16px`) |
| From `640px` | `--thermal-gap-sm` (`17px`) | `--thermal-radius-sm` (`6px`) | `--thermal-fs-sm` (`16px`) |
| From `960px` | `--thermal-gap-md` (`18px`) | `--thermal-radius-md` (`7px`) | `--thermal-fs-md` (`16px`) |
| From `1250px` | `--thermal-gap-lg` (`19px`) | `--thermal-radius-lg` (`8px`) | `--thermal-fs-lg` (`16px`) |
| From `1440px` | `--thermal-gap-xl` (`20px`) | `--thermal-radius-xl` (`9px`) | `--thermal-fs-xl` (`16px`) |

Override the step variables on the root element to change responsive sizes. Override the resolved `--thermal-gap`, `--thermal-radius` or `--thermal-fs` on an element to use a fixed value there at every viewport width.

### Where variables take effect

Variables that refer to other variables — such as `--thermal-primary`, `--thermal-gap` or `--thermal-fs-small` — are resolved on the root element. Changing `--thermal-primary-base` or `--thermal-gap-md` on a nested element therefore has **no effect**. Follow this rule:

- On the root element (`html:root`), override base variables, size steps or resolved variables.
- On any other element, override only resolved variables: `--thermal-primary`, `--thermal-slate-light`, `--thermal-gap`, `--thermal-radius` and so on.

## Theme one part of the page

Set resolved variables on a component, or on a container to theme everything inside it.

<ComponentExample>

```html
<div style="
    display: flex;
    gap: 8px;
    --thermal-foreground: #172554;
    --thermal-background: #ffffff;
    --thermal-primary: #c2410c;
    --thermal-primary-dark: #7c2d12;
    --thermal-slate: #fdba74;
    --thermal-slate-light: #ffedd5;
    --thermal-slate-dark: #9a3412;
">
    <thermal-btn variant="primary">Primary</thermal-btn>
    <thermal-btn variant="foreground">Foreground</thermal-btn>
    <thermal-btn variant="background">Background</thermal-btn>
    <thermal-btn>Default</thermal-btn>
</div>
```

</ComponentExample>

### Shape, borders and typography

<ComponentExample>

```html
<thermal-btn>Default</thermal-btn>
<thermal-btn style="--thermal-radius: 0px">Square</thermal-btn>
<thermal-btn style="--thermal-radius: 999px">Pill</thermal-btn>
<thermal-btn style="--thermal-border-width: 3px">Thick border</thermal-btn>
<thermal-btn style="--thermal-border-style: dashed">Dashed border</thermal-btn>
<thermal-btn style="--thermal-fs: 24px">Large text</thermal-btn>
<thermal-btn style="--thermal-font-family: Georgia, serif">Serif font</thermal-btn>
<thermal-btn style="--thermal-shadow: 0 0 12px #c2410c">Hover me</thermal-btn>
```

</ComponentExample>

## Preset skins

The bundle defines attribute selectors that set groups of variables. They work on **any element**, including a plain `<div>`, and apply to everything inside it.

| Attribute | Values | Effect |
| --- | --- | --- |
| `skin` | `dark` | White text on a dark grey neutral palette with an aqua accent. |
| | `solarized` | Teal and cyan colours on a dark blue background. |
| | `system` | Browser system colours (`ButtonFace`, `ButtonText`, `AccentColor` and others). |
| | `darkhc` | Black text on white and light grey surfaces with a blue accent. Despite its name, this is currently a light palette. |
| `corners` | `narrow` | Sets `--thermal-radius` to `0px`. |
| `lines` | `big` | Sets `--thermal-border-width` to `3px`. |

Omit the attribute to return to the inherited theme; there is no `skin="light"`. Variables set in the element's own `style` attribute override the preset.

<ComponentExample>

```html
<div skin="dark" style="display: flex; gap: 8px; padding: 12px; background: black">
    <thermal-btn variant="primary">Dark</thermal-btn>
    <thermal-btn>Default</thermal-btn>
</div>
<div skin="solarized" style="display: flex; gap: 8px; padding: 12px; background: #1d5766">
    <thermal-btn variant="primary">Solarized</thermal-btn>
    <thermal-btn>Default</thermal-btn>
</div>
<div corners="narrow" lines="big" style="display: flex; gap: 8px; padding: 12px">
    <thermal-btn variant="primary">Narrow corners</thermal-btn>
    <thermal-btn>Big lines</thermal-btn>
</div>
```

</ComponentExample>

The [`thermal-app` skin attributes](./ui/thermal-app.md#skin) show all presets on an application frame.

## Dark mode

Add the `thermal-dark-mode` class to `<body>` to switch the whole page to the dark colours. The bundle does not add this class automatically; toggle it yourself, for example based on the user's preference:

```js
const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
document.body.classList.toggle('thermal-dark-mode', darkMode.matches);
```

To make only part of the page dark, use `skin="dark"` on that part instead.

## Styling thermal-app

`thermal-app` reads these variables:

| Variable | Effect on the frame |
| --- | --- |
| `--thermal-slate-light` | Frame background and sticky header gradient. |
| `--thermal-slate` | Frame border and overflow panel background. |
| `--thermal-foreground` | Frame text. |
| `--thermal-gap` | Outer padding (`gap / 3`), toolbar spacing (`gap / 2`) and credit spacing. Gaps between toolbar items are fixed at `5px`. |
| `--thermal-radius` | Outer corners. |
| `--thermal-border-width`, `--thermal-border-style` | Outer border. |
| `--thermal-fs` | Base font size. |
| `--thermal-fs-sm` | Credits use `0.8` of it. |

The frame itself sets `font-family: sans-serif` and `line-height: 1em`; override them on the element if needed.

<ComponentExample>

```html
<thermal-app
    label="Custom theme"
    labelvariant="primary"
    author="LabIR Team"
    style="
        width: 100%;
        box-sizing: border-box;
        --thermal-foreground: #172554;
        --thermal-background: #ffffff;
        --thermal-slate-light: #eff6ff;
        --thermal-slate: #93c5fd;
        --thermal-slate-dark: #1e40af;
        --thermal-primary: #1d4ed8;
        --thermal-primary-dark: #1e3a8a;
        --thermal-gap: 24px;
        --thermal-radius: 12px;
        --thermal-border-width: 2px;
        --thermal-border-style: dashed;
        --thermal-fs: 18px;
        --thermal-fs-sm: 14px;
        font-family: Georgia, serif;
        line-height: 1.5;
    "
>
    <thermal-btn slot="bar-pre" variant="primary">Save</thermal-btn>
    <div style="padding: 16px">Colours, spacing, borders and typography are local to this frame.</div>
</thermal-app>
```

</ComponentExample>

### The app-content part

The wrapper of the default slot is exposed as `::part(app-content)`. It does not include the named `content` slot, the header or the credits; those have no exposed part. Style your own slotted elements with ordinary selectors.

For a scrolling frame, set a height or max-height and `overflow: auto` on the element. The header stays sticky inside the scrolling area.

In fullscreen, the frame fills the viewport and drops its border, padding and rounded corners. Custom `max-width` or `max-height` rules still apply, so limit them to `:not([fullscreen="on"])`.

<ComponentExample>

```html
<style>
    thermal-app.app-styling-demo:not([fullscreen="on"]) {
        width: 100%;
        max-height: 240px;
        overflow: auto;
        box-sizing: border-box;
        box-shadow: 0 4px 12px #0002;
    }

    thermal-app.app-styling-demo::part(app-content) {
        padding: 16px;
        background: var(--thermal-background);
        border-radius: var(--thermal-radius);
    }

    .app-styling-demo .inspection-body {
        min-height: 280px;
        line-height: 1.6;
    }
</style>
<thermal-app class="app-styling-demo" label="Scrollable frame" show-fullscreen="true">
    <div slot="pre">This row stays with the sticky header.</div>
    <section class="inspection-body">Scroll inside this frame to see the sticky header.</section>
    <div slot="content">These notes are outside the app-content part.</div>
</thermal-app>
```

</ComponentExample>

## Complete HTML document

This document sets a page-wide accent colour and smaller spacing, and themes one application frame locally. Replace the placeholder script URL with your own. No JavaScript is required: variables apply as soon as the components are rendered.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Styling example</title>
    <script defer src="/path-to-your-script/labirthermal.iife.js"></script>
    <style>
        html:root {
            --thermal-primary-base: #c2410c;
            --thermal-primary-base-dark: #7c2d12;
            --thermal-primary-base-light: #ffedd5;
            --thermal-gap-base: 12px;
            --thermal-gap-sm: 12px;
            --thermal-gap-md: 14px;
            --thermal-gap-lg: 14px;
            --thermal-gap-xl: 16px;
        }

        #themed-app {
            --thermal-slate-light: #fff7ed;
            --thermal-slate: #fdba74;
            --thermal-radius: 0px;
        }

        #themed-app::part(app-content) {
            padding: 16px;
        }
    </style>
</head>
<body>
    <thermal-btn variant="primary">Page-wide accent</thermal-btn>

    <thermal-app id="themed-app" label="Themed frame">
        <thermal-btn slot="bar-pre" variant="primary">Save</thermal-btn>
        <p>This frame has its own neutral colours and square corners.</p>
    </thermal-app>

    <div skin="dark" style="padding: 16px; background: black">
        <thermal-app label="Dark section">
            <p>Everything inside uses the dark skin.</p>
        </thermal-app>
    </div>
</body>
</html>
```
