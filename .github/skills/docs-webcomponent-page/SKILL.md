---
name: docs-webcomponent-page
description: "Use only for documentation in packages/docs when creating or updating a webcomponent reference page from a component in packages/embed (@labirthermal/webcomponents). Inspect HTML attributes, inherited properties, converters and provider requirements, then document them with ComponentInfo, ComponentAttribute and ComponentExample following thermal-btn.md. Includes simple HTML click examples and a complete standalone HTML document with correct script loading and addEventListener timing. Not for implementing or refactoring webcomponents."
argument-hint: "Webcomponent tag, class or source path to document"
---

# Document a webcomponent

## Scope

- Create or update documentation, not the webcomponent implementation.
- Accept a custom-element tag, class name or source path. If no component is identifiable from the request or selected file, ask which component to document.
- Read source files in `packages/embed` as evidence only. Do not change their APIs, decorators, styles, tests, generated bundles or dependencies.
- Limit edits to the relevant page in `packages/docs/webcomponents`, its navigation/overview links and necessary VitePress configuration. Do not redesign the documentation components.
- Preserve existing user edits. If source behaviour appears broken, describe the limitation and report it rather than fixing it as part of documentation.
- Write page content in English, matching the existing documentation.

Paths below are relative to this skill directory.

## 1. Read the reference and rendering components

Read these before authoring a page:

- [Canonical page: thermal-btn](../../../packages/docs/webcomponents/ui/thermal-btn.md).
- [ComponentInfo](../../../packages/docs/.vitepress/theme/ComponentInfo.vue).
- [ComponentAttribute](../../../packages/docs/.vitepress/theme/ComponentAttribute.vue).
- [ComponentExample](../../../packages/docs/.vitepress/theme/ComponentExample.vue).
- [Theme registration](../../../packages/docs/.vitepress/theme/index.ts).
- [VitePress configuration](../../../packages/docs/.vitepress/config.mts).

Reuse these components as they exist. The canonical page supplies the presentation and level of detail, not proof of another component's API. Recheck every behaviour against the target's source.

## 2. Resolve the component and inspect its API

1. Resolve the tag and implementation using [iifeCatalog.ts](../../../packages/embed/src/iifeCatalog.ts). Do not infer a tag from a class name or filename. Follow its imports and registration path when necessary.
2. Read the component, relevant base classes, property types, converters, controllers and render/styles needed to establish its public behaviour.
3. Collect each public HTML attribute, including relevant inherited component-specific attributes. For each, establish:
   - Exact HTML name: explicit `attribute: "..."`, otherwise Lit's lowercased property name.
   - Whether it is actually exposed as an attribute. Exclude `attribute: false`, `@state`, private state and context/controller internals.
   - Accepted HTML values and conversion rules, not merely the TypeScript property type.
   - Initial value and effective default, including differences between omitted, empty and explicit values.
   - Visible effect, dependencies, limitations and at least one meaningful example.
4. Follow custom converters. Do not assume every boolean accepts an empty attribute or that `disabled="false"` is false for Lit's standard Boolean converter.
5. Distinguish a property initializer from a CSS/render fallback. Omit `default` when no reliable default exists; explain differing defaults where needed.
6. Check actual rendering and CSS selectors. A declared union does not prove every value works, and a JavaScript property may not affect attribute-based styles.
7. Identify required context providers, slot placement and real DOM events. Use the actual provider nesting and event payloads. Do not invent a custom event.
8. Account for all discovered attributes. Include relevant inherited attributes once; note deliberate exclusions of standard global HTML attributes rather than generating a catalogue of all HTMLElement properties.

Keep an internal attribute inventory while working so no attribute is accidentally skipped. Do not create a tracking file in the repository.

## 3. Create the page

Update an existing page when present. Otherwise use the matching category under `packages/docs/webcomponents` (for example `ui/<tag>.md` or `applications/<tag>.md`). Follow neighbouring pages and existing routes.

Use this structure:

````md
# actual-element-tag

<ComponentInfo tag="actual-element-tag" category="UI">

A short, practical explanation of the component.

</ComponentInfo>

## Attributes

<ComponentAttribute name="actual-attribute" type="string" default="verified value">

What this attribute changes, accepted values and any important limitations.

<ComponentExample>

```html
<actual-element-tag actual-attribute="verified value">
    Example content
</actual-element-tag>
```

</ComponentExample>

</ComponentAttribute>

## Examples

### A simple practical task

A short explanation followed by a working example.

### Complete HTML document

Explain where to put the bundle and how initialization is ordered.
````

- Add `:requires="['actual-provider-tag']"` to `ComponentInfo` only when required, in the correct outer-to-inner order.
- Repeat `ComponentAttribute` for each attribute. Its `name` is the HTML attribute name, not the JavaScript property name.
- Keep descriptions and examples inside the corresponding attribute component.
- Omit optional `type`, `default`, `category` or `requires` when unsupported rather than guessing.
- Keep blank lines around Markdown inside components so VitePress processes it.
- Use `##` for major sections. `ComponentAttribute` already renders an `h3` and anchor; do not add a duplicate heading.
- Keep h3 anchors unique across attribute names and example headings.
- Add a concise Slots section only if needed to explain actual named/default slots. Do not invent another documentation component.

## 4. Keep examples simple and HTML-first

- Prefer one visible behaviour per example and a few practical examples, not a complex application or toolbar unrelated to the component's purpose.
- Use `ComponentExample` with a single fenced `html` block for fragment previews. Code appears above the live preview, with the existing preview background and border.
- Include required providers, slots, assets and attributes even in small examples. Use existing documentation assets and base-aware URLs when needed.
- For simple interactions, a short HTML `onclick` is sufficient. Ensure it does not perform an action when the component is disabled; verify how this particular component blocks events and guard the handler when needed.
- Do not add Vue/Lit event tutorials, Vue `<script setup>` handlers, `#preview` slots, tabs, or custom-event wrappers for ordinary clicks.
- Do not put JavaScript-dependent examples in a live preview unless the current preview implementation actually runs them.
- `ComponentExample` inserts HTML via `v-html`: inline handlers work, but inserted `<script>` tags do not execute. Never present an inert script example as a working live preview.

## 5. Include a complete standalone HTML document

Provide one plain fenced `html` block, **outside `ComponentExample`**, containing the entire runnable document without ellipses or omitted setup:

1. `<!doctype html>`, `<html lang="en">`, a head with charset, viewport and title.
2. In the head, a classic `<script defer src="./lib/labirthermal.iife.js"></script>` loading the IIFE build. Verify the bundle's name against the current documentation assets; explain that the reader must place the actual bundle there or adjust the URL. Do not invent a CDN URL or confuse an ESM build with an IIFE build.
3. At the beginning of the body, a complete script defining a named handler and registering initialization with `document.addEventListener('DOMContentLoaded', async () => { ... })`.
4. Inside initialization, await `customElements.whenDefined('actual-element-tag')`, obtain the now-parsed element and call `addEventListener` with the named handler. Await definitions of other elements too if the example directly relies on their APIs.
5. After the script, place the actual component, any required providers and an accessible visible output such as `<output aria-live="polite">`.

Explain the two distinct waits: `DOMContentLoaded` ensures the body exists and deferred scripts have run; `whenDefined` ensures the tag is registered. Neither promises data fetching or every component-specific asynchronous operation is complete.

For components with asynchronous readiness requirements, follow their real readiness API as well. Do not claim `whenDefined` alone means images or context data are ready.

Use a real event and a small observable action. Check disabled/cancelled-event behaviour against the implementation, including listener registration order; `preventDefault()` alone does not stop other listeners on the same element.

## 6. Integrate and verify

- Add the page to the appropriate existing sidebar group and update a directly related overview link when needed. Do not reorganize unrelated navigation.
- Ensure `themeConfig.outline` includes `[2, 3]` and the new page does not override it incompatibly.
- If a custom tag is used directly in Markdown/Vue markup, add it to `isCustomElement` when missing. Fenced code and `v-html` previews alone do not require this.
- Verify every attribute against the inventory, accepted HTML values, defaults and source behaviour. Check relative links and asset paths.
- Build from the repository root with `npm --prefix packages/docs run docs:build`.
- When browser tools are available, check representative live attribute examples and interactions, and confirm h3 attributes appear nested under Attributes in the right outline.
- Test the standalone HTML as a real separate document using the actual IIFE bundle, not by injecting it with `innerHTML`. Confirm registration, rendering, the visible click result and any promised keyboard/disabled behaviour.
- Do not claim runtime verification when only the Markdown build was checked. Report any verification limitations.
- Summarize the created/updated page, relevant configuration changes and verification results. Do not commit or rebuild webcomponent distribution files unless separately requested.
