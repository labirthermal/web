---
name: embed-tag-name-map
description: "Use in any package of the monorepo when adding, checking, fixing or auditing the HTMLElementTagNameMap declare global declaration of a Lit web component file: first verifying that the file is really a web component, resolving its custom element tag name from the package iifeCatalog.ts or its @customElement decorator, declaring the tag under the component class, or finding components whose tag declaration is missing or wrong."
---

# HTMLElementTagNameMap Declaration Workflow

This workflow keeps the global `HTMLElementTagNameMap` declarations of web components in sync with their registration. It works in every package of the monorepo (for example `packages/webcomponents`, `packages/client`).

The declaration makes `document.querySelector("registry-opacity-slider")` resolve to the component class instead of `Element`. It is a DOM-level type only; it is intentionally framework neutral and does **not** declare React JSX props. Do not add `React.JSX.IntrinsicElements` augmentations, React prop interfaces, or any React import to component files.

Tag names come from, in this order:

1. the `src/iifeCatalog.ts` of the file's package (when the package has one),
2. the `@customElement("tag")` decorator of the class,
3. `customElements.define("tag", Class)` in the same file.

## 1. Verify the file is a web component

Run the helper from anywhere in the repository with the file path before editing anything:

```bash
node .github/skills/embed-tag-name-map/scripts/tagNameMap.mjs <file>
```

The helper finds the file's package (nearest `package.json`) and reports every class in the file that is registered as a custom element.

- Exit code `2` and `NOT A WEB COMPONENT` - no class in the file is catalogued, decorated with `@customElement` or passed to `customElements.define`. Tell the user the file is not a web component (mention any `unregistered class` lines, which are classes extending something without a tag) and **stop; do not edit the file**. A class without any tag is not registered: ask the user whether it should be registered first, and never add a declaration for a guessed name.
- Exit code `0` - continue with the listed components.

When several files are given, verify each one separately and skip the ones that are not web components.

## 2. Resolve the tag name

The registration is the source of truth for the tag name. Never invent a tag name from the class name.

Other modes of [the helper script](./scripts/tagNameMap.mjs):

| Command | Purpose |
|---|---|
| `node .../tagNameMap.mjs <file>` | Verify a file and list its components with declaration status |
| `node .../tagNameMap.mjs <tag or class>` | Look up one catalog entry |
| `node .../tagNameMap.mjs` | List every catalog entry of the current package with a summary count |
| `node .../tagNameMap.mjs --missing` | List only catalogued components whose declaration is missing or unresolved |
| `node .../tagNameMap.mjs <query> --json` | Machine readable output, including the absolute file path |
| `node .../tagNameMap.mjs ... --package <dir>` | Force the package directory |

Without a package-local catalog, run the list modes from a package that has `src/iifeCatalog.ts` or from the repository root (all catalogs are then consulted).

Statuses:

- `OK` - the file already declares exactly this tag.
- `MISSING` - the file resolves but the tag is not declared there.
- `UNKNOWN` - the catalog import specifier could not be resolved to a file; inspect the catalog entry manually.

Act on the script's notes as well:

- *`@customElement("...")` differs from the catalog tag* - the element is registered twice under different names. Report this to the user and ask which tag is authoritative before editing; do not silently pick one.
- *the class is not exported from that file* - resolve the real definition file before editing, for example a re-export or a renamed class.
- *the class is abstract* - do not declare it.
- *declares "..." which no class in this file registers* - a stale or wrong entry; correct it per section 3.

## 3. Inspect the component file

Before editing, read the actual end of the component file, not only the class body, and check for an existing `declare global` block. Treat these cases distinctly:

- **Declaration already correct** - report it and make no change. Do not duplicate the block.
- **Declaration missing** - add it per section 4.
- **Declaration exists but is not at the end of the file** - move the complete block to the end of the file. Do not leave code, exports, declarations or comments after it.
- **Declaration present but the tag string differs from the registered tag** - correct the string rather than adding a second entry, and tell the user which tag was replaced.
- **Declaration maps the tag to a different class** - fix the class reference and verify the class is the one that is registered.
- **File defines several registered components** - declare each tag, keeping one shared `declare global` block with one entry per tag.

## 4. Write the declaration

> **CRITICAL - the declaration must be the final content of the file:**
>
> Place a single `declare global` block at the **absolute end of the file**, after every class, function, export and other declaration. The closing `}` of this block must be the file's final non-whitespace character; only a trailing newline may follow it.
>
> Before editing, inspect the file's final lines. Append the block after the existing final line rather than anchoring the edit to a class-closing `}` that may also occur earlier in the file. After editing, read the final lines again and confirm that no source content follows the block.

Match the existing convention in the package (for example `packages/webcomponents/src/controls/registry/RegistryOpacitySlider.ts`):

```ts
declare global {
    interface HTMLElementTagNameMap {
        "registry-opacity-slider": RegistryOpacitySlider;
    }
}
```

Rules:

- Use the exact registered tag string, double quoted.
- Map it to the exact class identifier that is registered, not a base class and not an interface.
- The class must be exported from that file so the declaration references a real type.
- Use the package's 4-space indentation and keep the block separated from the class by one blank line.
- Add no JSDoc, no comment and no extra properties to the block; keep the diff limited to the declaration.
- Never place the block inside the class, inside a `namespace`, or above the class definition.
- Never insert the block after an intermediate `}` selected only by matching context. Append it at the actual end of the document.
- Do not add declarations for abstract base classes, mixins or test-only elements; declare only registered, concrete custom elements.

For a file hosting several elements:

```ts
declare global {
    interface HTMLElementTagNameMap {
        "file-analysis-table": FileAnalysisTableElement;
        "file-analysis-table-row": FileAnalysisRowElement;
    }
}
```

## 5. Verify

- Re-read the final lines of every edited file and confirm the `declare global` block is the final source construct. There must be no code, export, declaration or comment after its closing `}`.
- Re-run the helper for the edited file and confirm the status is `OK`.
- Lint the changed files with the package's own ESLint, for example `pnpm --filter <package name from package.json> exec eslint <changed-source-paths>`.
- A type-check is optional and must be interpreted carefully. Packages may have a large pre-existing error baseline, so never read a non-zero exit as a regression; compare the error count before and after the change instead:

  ```bash
  cd packages/<package> && node node_modules/typescript/bin/tsc -p tsconfig.lib.json --noEmit 2>&1 | grep -c "error TS"
  ```

  Call the binary through `node node_modules/typescript/bin/tsc`. A `tsc` dependency can shadow the real compiler, so `pnpm exec tsc` may fail with an unrelated message. Use the tsconfig the package actually has.
- Run tests only when the component's behavior was touched; a pure type declaration needs no test run.
- Do not run or commit builds for a declaration-only change.

## 6. Report

Tell the user, per file: whether it is a web component, the tag name, the resolved class, whether the declaration was added, corrected or already present, and any registration inconsistency found. When several components were processed, summarize the remaining `MISSING` count from the script.

## Batch mode

When the user asks for an audit or a bulk fix, work from `--missing` output, process files one by one, and keep each file's diff limited to its `declare global` block. Confirm the scope with the user before editing a large number of files.
