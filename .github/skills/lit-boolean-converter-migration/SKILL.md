---
name: lit-boolean-converter-migration
description: 'Use in any package of this monorepo when analyzing or migrating booleanConverter attributes of one Lit web component to standard presence/absence boolean attributes. Inspect registration, inheritance, JavaScript, CSS, defaults and naming; propose each attribute separately, then edit only after approval. Do not migrate component call sites or process multiple components.'
argument-hint: 'Path or class/tag name of one Lit web component'
---

# Migrate one Lit component away from booleanConverter

## Scope and approval

This workflow is shared by **all packages**, not just the webcomponents package.
Read the instructions applicable to the selected package before editing.
Respond in the user's language.

Work on exactly one user-supplied component. If no unambiguous component is
provided, ask for its file, class or tag. If several are provided, ask which one
to process first.

There are two phases:

1. Inspect and propose changes, presenting each attribute separately.
2. Only after explicit user approval, implement the approved changes inside the
   component and its directly related styles and focused tests.

Do not treat invocation of this skill as approval of a particular API change.
Do not change consumers, application markup, stories, examples or documentation
call sites. The user will migrate and test those manually after this workflow
finishes. Report those follow-up requirements rather than applying them.
Do not delete or change the shared converter, perform a repository-wide
migration, or automatically continue to another component.

## Verified Lit semantics

Use these rules when proposing and testing the migration:

```ts
@property({ type: Boolean })
disabled = false;
```

```ts
html`<some-element ?disabled=${isDisabled}></some-element>`;
html`<some-element .disabled=${isDisabled}></some-element>`;
```

- `?disabled=${value}` adds the attribute for a truthy value and removes it for
  a falsy value. Pass actual booleans; the string `"false"` is truthy.
- With Lit's standard `type: Boolean` converter, any present attribute,
  including `disabled="false"`, means `true`. Removing it converts to `false`.
- In static HTML, `<some-element disabled>` and
  `<some-element disabled="">` both express presence. Omit it for `false`.
- `disabled=${false}` is a string attribute binding, not a boolean binding.
- `.disabled=${false}` assigns the JavaScript property directly.
- Attribute-to-property conversion does not require `reflect: true`.
  Property-to-attribute synchronization does. With Boolean reflection, truthy
  values produce an empty attribute and falsy values remove it.
- These semantics do not depend on development versus production builds.
  Bare attributes and empty-valued attributes are equivalent HTML
  representations; a build need not rewrite one into the other.
- **Mandatory rule: every migrated boolean attribute defaults to `false`.**
  Never propose or implement a `true` initializer, constructor default or
  inherited default. A property initialized to `true` cannot be set to
  `false` by initially omitting its attribute. When the existing effective
  behavior defaults to `true`, invert the attribute to a negative opt-out
  name such as `disabled` or `hidden` so that absence (`false`) preserves the
  default behavior while presence opts out.
- Do not apply presence semantics to string-valued enumerated attributes or
  ARIA attributes such as `aria-expanded="false"`.
- Do not add a custom converter, lifecycle workaround or unverified
  `useDefault` setting to emulate the old string-boolean API.

Sources:
- [Lit boolean template bindings](https://lit.dev/docs/templates/expressions/#boolean-attribute-expressions)
- [Lit default converter](https://lit.dev/docs/components/properties/#conversion-type)
- [Lit boolean defaults and naming](https://lit.dev/docs/components/properties/#boolean-attributes)
- [Lit attribute reflection](https://lit.dev/docs/components/properties/#reflected-attributes)
- [HTML boolean attributes](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/HTML)

## Phase 1: inspect without editing

### 1. Verify the target

Read the component and the relevant inheritance chain. Verify it is a Lit web
component, not merely a controller, utility, options object or non-element
class. Resolve its tag through the actual package catalog, `@customElement`,
or `customElements.define`, following imported/re-exported classes as needed.
Do not assume the class name determines the tag.

If it is an abstract/unregistered base, explain that it is not itself a
registered component and ask the user to select a concrete component or
explicitly approve analysis of the shared base. Do not silently broaden scope.
If it is not a web component, explain the evidence and stop.

### 2. Find converter-backed attributes

Inspect decorators, static `properties`, spread/composed declarations,
inherited declarations, custom accessors, constructor defaults and relevant
mixins/controllers. Resolve imports and aliases of `booleanConverter`, as well
as wrappers delegating to it (for example `optionalBooleanConverter`).
Read the actual converter implementation; do not assume what its argument,
missing attribute, empty string, `"true"` or `"false"` mean.

For each effective public attribute, record:

- JavaScript property and its declaring class/file.
- Exact HTML attribute name, including explicit mappings or Lit's lowercase
  default; exclude `attribute: false` properties from the attribute migration
  and report them separately if they use the converter.
- Type, initializer/constructor default, converter arguments and reflection.
- Any intentional distinction between `undefined`, `false` and `true`.

If no effective attribute uses the converter, state this and stop without
changes. A converter import alone is not evidence of an affected attribute.

### 3. Trace behavior inside the component

For every affected attribute, inspect:

- Property reads/writes, getters/setters, handlers, lifecycle methods, boolean
  negations, string comparisons, `hasAttribute`, `getAttribute`,
  `setAttribute`, `toggleAttribute` and `removeAttribute`.
- Its effects on rendering, interactions, events, public methods and values
  forwarded to child components, controllers or providers.
- Internal template bindings: distinguish `?attribute`, `.property`, string
  interpolation and string-valued ARIA attributes.
- Inline, imported, shared and inherited styles. Look for positive and
  negative value selectors such as `[expanded="true"]`,
  `[expanded="false"]`, `:not(...)`, compound selectors and host selectors.
  Read enough surrounding CSS to preserve cascade and specificity.

Keep the trace bounded to the selected component and its behavior. Shared
base/style changes may affect other components: identify that boundary and
ask before expanding editable scope. Do not inspect or rewrite every consumer
in the repository. State external risks as follow-up obligations, not as
claims that all consumers have been audited.

### 4. Present one proposal per attribute

For each attribute, present a separate numbered section containing:

1. **Current contract:** property/attribute names, default, converter behavior,
   reflection and actual JS/CSS uses, with file/symbol links.
2. **Proposed contract:** names, `type: Boolean`, the `false` initializer,
   reflection and whether the meaning is preserved or inverted.
3. **Naming rationale:** presence always represents a state that is off by
   default, because the default is always `false`. Keep a positive name when
   the current effective default is already `false`. For default-true
   behavior, the attribute must be inverted: propose a negative opt-out name
   and compare naming alternatives, preferring established platform names
   (`disabled`, not `disable`) when apt. Do not mechanically prefix every
   name with `no` or `disable`.
4. **Internal changes:** exact JS conditions, assignments, child bindings and
   CSS selectors to change. Explain inversion in all of them. Preserve
   existing visual/interactive defaults and legitimate ARIA string values.
5. **Compatibility and consequences:** explain initial state, toggling,
   programmatic assignment, reflection, styling, events, inherited behavior
   and externally observable API changes. State which behavior changes are
   unavoidable or intentional rather than promising complete compatibility.
6. **Consumer migration examples:** show old versus new static HTML and Lit
   bindings for both enabled and disabled states, plus property binding if
   the property is renamed. These are instructions only; do not edit callers.
7. **Verification:** specify focused tests for the proposed contract.

Typically `[flag="true"]` becomes `[flag]` and `[flag="false"]` becomes
`:not([flag])`, but only after checking defaults and selector context. A
renamed/inverted flag needs the corresponding inverse selectors and JS logic.
Do not assume those replacements are always equivalent.

For optional/tri-state attributes, explain the loss of the unspecified state.
If absence means "inherit from provider", a plain boolean cannot preserve all
three states. Stop that attribute's migration until the user chooses an
explicit contract; do not silently coerce `undefined` to `false`. Any chosen
boolean contract must still default to `false`.

After presenting the attributes, use the question tool to obtain approval of
the concrete naming, defaults, behavior changes and implementation scope.
Allow approval of a subset or analysis only. Resolve any shared-file scope
question before editing. If approval is declined, finish with the proposals.

## Phase 2: implement only approved changes

1. Recheck the relevant worktree changes and preserve existing user edits.
2. Remove approved converter options; set `type: Boolean` even where the old
   declaration used `String`. Initialize every migrated boolean to `false`.
   Apply the approved names, reflection, JS logic, internal templates and
   styles as one coherent change.
3. Preserve reflection where CSS or public DOM state depends on it. If adding
   reflection is necessary, explain the new observable behavior. Never leave
   host CSS dependent on an attribute that property updates no longer update.
4. Remove converter imports only when unused in that file. Keep the shared
   converter and any still-needed optional wrapper intact.
5. Update directly related API comments/JSDoc in edited component files.
   Do not migrate external reference pages or usage examples in this phase.
6. Add/update focused tests using existing package tooling. Verify:
   - Initial absence and presence (bare/empty attribute) and actual default UI.
   - Present `"false"` means true under the new contract, not the old meaning.
   - Attribute addition/removal after rendering.
   - Property assignment in both directions and reflected presence/absence,
     including `getAttribute(...) === ""` for reflected true.
   - Actual CSS-dependent behavior where supported, plus JS/interaction
     behavior, inverted naming and retained provider/tri-state behavior.
   - Internal child bindings deliver booleans; ARIA retains string semantics.
   Await Lit updates before asserting asynchronous reflection/rendering.
7. Run the smallest relevant tests and configured type/build validation.
   Do not install tooling merely to validate this workflow. If CSS cannot be
   validated by the available DOM test environment, use an existing browser
   test setup if available, or explicitly report the manual validation gap.
8. Review the diff for stale value selectors, old names, unused imports and
   accidental caller edits. Report validation failures honestly; do not
   present untested behavior as verified.

## Finish and stop

Summarize approved changes attribute by attribute, validation results and
breaking changes. Give the user a concise manual migration checklist covering
static HTML, Lit templates, JavaScript property access and external CSS/DOM
selectors for this component. Explicitly state that external call sites were
left untouched and end the workflow. Do not select the next component.
