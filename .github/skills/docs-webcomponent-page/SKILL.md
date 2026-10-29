---
name: docs-webcomponent-page
description: "Use only for documentation in packages/docs when creating, updating or auditing a webcomponent reference page against packages/webcomponents (@labirthermal/webcomponents). Distinguish public inputs from internal state; inspect inherited properties, boolean attributes (with the automatic note), attribute grouping, converters and provider requirements. Use ComponentInfo, ComponentAttribute and ComponentExample following thermal-btn.md. Audit mode reports API differences, whether attributes are purely internal or component-managed state, and invalid grouping, then waits for approval before editing. Includes HTML click examples and a complete standalone document with correct script loading and addEventListener timing. Not for implementing or refactoring webcomponents."
argument-hint: "Webcomponent tag, class or source path to document"
---

# Document a webcomponent

## Scope

- Create or update documentation, not the webcomponent implementation.
- Accept a custom-element tag, class name or source path. If no component is identifiable from the request or selected file, ask which component to document.
- Read source files in `packages/webcomponents/src` as evidence only. Do not change their APIs, decorators, styles, tests, generated bundles or dependencies.
- Limit edits to the relevant page in `packages/docs/webcomponents`, its navigation/overview links and necessary VitePress configuration. Do not redesign the documentation components.
- Preserve existing user edits. If source behaviour appears broken, describe the limitation and report it rather than fixing it as part of documentation.
- Write page content in English, matching the existing documentation.

Paths below are relative to this skill directory.

## 1. Read the reference and rendering components

Read these before authoring a page:

- [Canonical page: thermal-btn](../../../packages/docs/webcomponents/ui/thermal-btn.md).
- [ComponentInfo](../../../packages/docs/.vitepress/theme/ComponentInfo.vue).
- [ComponentAttribute](../../../packages/docs/.vitepress/theme/ComponentAttribute.vue).
- [ComponentBooleanAttribute](../../../packages/docs/.vitepress/theme/ComponentBooleanAttribute.vue), rendered automatically by `ComponentAttribute` for boolean attributes.
- [ComponentExample](../../../packages/docs/.vitepress/theme/ComponentExample.vue).
- [Theme registration](../../../packages/docs/.vitepress/theme/index.ts).
- [VitePress configuration](../../../packages/docs/.vitepress/config.mts).

Reuse these components as they exist. The canonical page supplies the presentation and level of detail, not proof of another component's API. Recheck every behaviour against the target's source. Where the canonical page conflicts with [Boolean attributes](#boolean-attributes), [Attribute grouping](#attribute-grouping) or [Excluded attributes](#excluded-attributes), those sections win.

## 2. Resolve the component and inspect its API

1. Resolve the tag and implementation using [iifeCatalog.ts](../../../packages/webcomponents/src/iifeCatalog.ts). Do not infer a tag from a class name or filename. Follow its imports and registration path when necessary.
2. Read the component, relevant base classes, property types, converters, controllers and render/styles needed to establish its public behaviour.
3. Collect each public HTML attribute, including relevant inherited component-specific attributes. For each, establish:
   - Exact HTML name: explicit `attribute: "..."`, otherwise Lit's lowercased property name.
   - Whether it is actually exposed as an attribute. Exclude `attribute: false`, `@state`, private state and context/controller internals.
   - Whether it is purely internal, a public input, a component-managed state attribute or an explicitly supported read-only output. Apply [Purely internal attributes](#purely-internal-attributes). A public TypeScript field, `@property` or `reflect: true` alone does not establish a public configuration API, and internal writes alone do not prove an attribute is internal.
   - Accepted HTML values and conversion rules, not merely the TypeScript property type.
   - Initial value and effective default, including differences between omitted, empty and explicit values.
   - Visible effect, dependencies, limitations and at least one meaningful example.
4. Follow custom converters. For `type: Boolean` properties apply [Boolean attributes](#boolean-attributes). If a legacy `booleanConverter` is still used, document its actual conversion and report it as unmigrated.
5. Distinguish a property initializer from a CSS/render fallback. Omit `default` when no reliable default exists; explain differing defaults where needed.
6. Check actual rendering and CSS selectors. A declared union does not prove every value works, and a JavaScript property may not affect attribute-based styles.
7. Identify required context providers, slot placement and real DOM events. Use the actual provider nesting and event payloads. Do not invent a custom event.
8. Account for all discovered attributes. Include relevant inherited attributes once; note deliberate exclusions of standard global HTML attributes rather than generating a catalogue of all HTMLElement properties.

Keep an internal attribute inventory while working so no attribute is accidentally skipped. Record each attribute's classification and its source evidence in that inventory. Do not create a tracking file in the repository.

## Purely internal attributes

For every attribute, ask whether it is purely internal: the component writes it for its own use and writing it from outside has no meaningful supported effect. Decide from the source, not from the name:

1. Find every write: initializers, assignments in methods, lifecycle hooks and event handlers.
2. Find every reaction to an external write: `attributeChangedCallback`, `willUpdate`/`updated`/`firstUpdated` branches on the property, setters, render output and CSS selectors such as `:host([name="…"])`.
3. Classify:
   - **Purely internal**: only the component writes it and an external write is ignored, immediately overwritten or only breaks the component. Exclude it as described in [Excluded attributes](#excluded-attributes).
   - **Component-managed state attribute**: the component keeps it in sync with some state, but an external write also triggers real behaviour. This is **not** purely internal. Document it as an attribute that describes both directions: what the component sets and when, what writing each value does, and every precondition or limitation (for example browser user activation). Say when it must not be used as an initial configuration value and point to the preferred public method or attribute. Example: `thermal-app`'s `fullscreen` is set by the component on `fullscreenchange`, but writing `on`/`off` calls `requestFullscreen()`/`exitFullscreen()` in `attributeChangedCallback`, and `toggleFullscreen()` works by switching it.
   - **Read-only output**: the component sets it for consumers (for example CSS or scripts) and external writes have no effect. Document it as read-only, not as configuration.
   - **Public input**: users set it and the component reacts. Document it normally.
4. If the classification is uncertain, or a user expects an attribute to be internal while the source shows a behavioural effect, report the evidence (file and handler) and ask before excluding or reframing it. Do not change the implementation to make an attribute internal unless the user separately asks for it.

## Boolean attributes

The components follow the Lit standard for booleans, explained in the [boolean attributes guide](../../../packages/docs/webcomponents/guide/boolean-attributes.md): **presence means `true`, absence means `false`**, and the default is always `false`.

Document every boolean attribute in its own `ComponentAttribute` with `type="boolean"`, `default="false"` and the component's tag:

````md
<ComponentAttribute name="disabled" type="boolean" default="false" tag="thermal-btn">

When `disabled` is present, the button is dimmed and ignores clicks.

<ComponentExample>

```html
<thermal-btn disabled>Disabled</thermal-btn>
```

</ComponentExample>

</ComponentAttribute>
````

- `type="boolean"` together with `tag` makes `ComponentAttribute` render `ComponentBooleanAttribute` under the heading: a small note in parentheses ("if `name` is present, its value is `true`. If it is missing, its value is `false`. More info.") linking to the guide, and a collapsed HTML-only example listing which values set `true` (bare, `=""`, `="true"`, `="false"`, any value) and that only omission sets `false`. Do not write this note, the guide link or the value table by hand, and do not add a separate guide note under `## Attributes`.
- `tag` must be the documented element's tag; the generated example uses it. Without `tag` the note is not rendered.
- Start the description with "When `name` is present, …" and describe the visible effect. Add what happens when it is omitted only when that is not obvious (typically for inverted names such as `interactive` → `non-interactive`).
- Keep the attribute's own `ComponentExample` with HTML and a live preview. Examples use the bare attribute: `<thermal-btn disabled>`. Do not write `disabled="true"` and never show `attribute="false"` as a way to disable it; if a former page did, replace it.
- Do not write `'true' | 'false'` as the type and never group a boolean attribute with other attributes.
- Reflected booleans (`reflect: true`) can be read in CSS as `[attribute]`; mention it only when useful.

## Attribute grouping

By default every attribute has its own `ComponentAttribute`, its own heading/anchor and its own example. Only these groups are allowed, each in one `ComponentAttribute` with `name` joined by ` + ` (or `…` for a numbered series):

- **Analyses**: the numbered `analysis1` … `analysisN` attributes, e.g. `name="analysis1 … analysis7"`.
- **Icon with its style**: an icon attribute and its matching style attribute, e.g. `icon + iconstyle`, `labelicon + labeliconstyle`.
- **Slugs** in an application with more than one slug attribute, e.g. `manager-slug + registry-slug + group-slug`.

Everything else is documented separately, even when the attributes are related or act together (for example `ms`, `speed`, `from`, `to`, `palette`, `advanced-palettes`, `label`, `author`, `license`, `smooth-thermograms`, `smooth-graph`). Explain the relationship in prose and link to the related attribute's anchor (`[to](#to)`) instead of grouping. An allowed group must not include any other attribute, e.g. `analysis1 … analysis7 + ms + speed` is wrong.

When reviewing a page, check its attribute structure and report every grouping that breaks these rules, as well as allowed groups that are split without reason.

## Excluded attributes

- Do not document `locale` (or its translations/context) for now. Remove existing `locale` sections, examples and attribute mentions from the page being edited.
- Exclude `attribute: false`, `@state`, context and controller internals as described above.
- Exclude purely internal attributes (see [Purely internal attributes](#purely-internal-attributes)) from `ComponentAttribute` sections, examples and the JavaScript API table, even when they are reflected or technically writable. If such an attribute is needed for a verified CSS example, mention it only as a component-managed styling hook, not as a value to set.
- Do not exclude component-managed state attributes whose external writes have an effect, nor read-only outputs; document them as classified above.

## Audit mode: update an existing page

Use this when the page exists and the source may have changed. Process **one component per run**.

1. Read the current source in the working tree, including base classes and controllers that declare attributes. Optionally use `git --no-pager log -p -- <source>` to understand renames, but the working tree is authoritative.
2. Build the attribute inventory from source (section 2) and a second inventory from the page (`ComponentAttribute` names, types, defaults, examples, prose, standalone document).
3. Report the differences to the user before editing, as a table with columns: attribute · page now · source now · proposed change. Cover renamed, removed, new and inverted attributes, boolean semantic changes, missing `tag` on boolean attributes, wrong defaults or types, invalid attribute grouping (see [Attribute grouping](#attribute-grouping)), the classification of each attribute per [Purely internal attributes](#purely-internal-attributes) (purely internal ones presented as public, and component-managed state attributes wrongly hidden or described as plain configuration), `locale` removal, outdated examples and broken links. For each purely internal or component-managed attribute, cite the source evidence (file and handler). Add a short list of other required page edits.
4. Wait for the user's approval or corrections. Then edit only that page (plus directly affected links in other pages, e.g. anchors of renamed attributes).
5. Search `packages/docs` for links to removed or renamed attribute anchors (`<page>.md#old-name`) and update them. Splitting a group also changes anchors (`#ms-speed` becomes `#ms` and `#speed`).
6. Build and verify (section 6), then summarize what changed and move on only when the user asks for the next component.

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
- Repeat `ComponentAttribute` for each attribute, grouping only as allowed in [Attribute grouping](#attribute-grouping). Its `name` is the HTML attribute name, not the JavaScript property name. Boolean attributes follow [Boolean attributes](#boolean-attributes), including the `tag` prop.
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
- Build from the repository root with `pnpm --filter @labirthermal/docs docs:build`.
- When browser tools are available, check representative live attribute examples and interactions, and confirm h3 attributes appear nested under Attributes in the right outline.
- Test the standalone HTML as a real separate document using the actual IIFE bundle, not by injecting it with `innerHTML`. Confirm registration, rendering, the visible click result and any promised keyboard/disabled behaviour.
- Do not claim runtime verification when only the Markdown build was checked. Report any verification limitations.
- Summarize the created/updated page, relevant configuration changes and verification results. Do not commit or rebuild webcomponent distribution files unless separately requested.
