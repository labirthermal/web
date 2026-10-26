---
name: embed-tag-name-map
description: "Use for the embed package (@labirthermal/webcomponents) in packages/embed when adding, checking, fixing or auditing the HTMLElementTagNameMap declare global declaration of a Lit web component: resolving its custom element tag name from iifeCatalog.ts, declaring the tag under the component class, or finding components whose tag declaration is missing or wrong."
---

# Embed HTMLElementTagNameMap Declaration Workflow

This workflow keeps the global `HTMLElementTagNameMap` declarations of `packages/embed` (`@labirthermal/webcomponents`) in sync with the element registry in [`src/iifeCatalog.ts`](../../../src/iifeCatalog.ts).

The declaration makes `document.querySelector("registry-opacity-slider")` resolve to the component class instead of `Element`. It is a DOM-level type only; it is intentionally framework neutral and does **not** declare React JSX props. Do not add `React.JSX.IntrinsicElements` augmentations, React prop interfaces, or any React import to component files in this package.

## 1. Scope & package guard

> **CRITICAL - Embed package only:**
> This skill is strictly scoped to `packages/embed`.
>
> **Verification step:**
> Check the target file path. If the file is **NOT** located under `packages/embed/`:
> 1. Inform the user: *"Tento skill (`embed-tag-name-map`) je určen pouze pro balíček `packages/embed`. Zadaný soubor leží mimo tento balíček, operace byla zastavena."*
> 2. Stop execution immediately. Do not modify files outside `packages/embed`.

## 2. Resolve the tag name from the catalog

The catalog is the source of truth for the tag name. Never invent a tag name from the class name.

Run the helper from the repository root; it accepts a tag, a class name, a file name or an absolute file path:

```bash
node packages/embed/.github/skills/embed-tag-name-map/scripts/tagNameMap.mjs <query>
```

Other modes of [the helper script](./scripts/tagNameMap.mjs):

| Command | Purpose |
|---|---|
| `node .../tagNameMap.mjs` | List every catalog entry with its declaration status and a summary count |
| `node .../tagNameMap.mjs --missing` | List only catalogued components whose declaration is missing or unresolved |
| `node .../tagNameMap.mjs <query> --json` | Machine readable output, including the absolute file path |

Statuses reported per entry:

- `OK` - the file already declares exactly this tag.
- `MISSING` - the file resolves but the tag is not declared there.
- `UNKNOWN` - the import specifier could not be resolved to a file; inspect the catalog entry manually.

Act on the script's notes as well:

- *`@customElement("...")` differs from the catalog tag* - the element is registered twice under different names. Report this to the user and ask which tag is authoritative before editing; do not silently pick one.
- *the class is not exported from that file under this name* - resolve the real definition file before editing, for example a re-export or a renamed class.

If the component is **not** in the catalog, the script exits with code 1. Then fall back to the `@customElement("tag-name")` decorator in the component file. If neither source defines a tag, the component is not registered: ask the user whether it should be catalogued first, and do not add a declaration for a guessed name.

## 3. Inspect the component file

Before editing, read the actual end of the component file, not only the class body, and check for an existing `declare global` block. Treat these cases distinctly:

- **Declaration already correct** - report it and make no change. Do not duplicate the block.
- **Declaration missing** - add it per section 4.
- **Declaration exists but is not at the end of the file** - move the complete block to the end of the file. Do not leave code, exports, declarations or comments after it.
- **Declaration present but the tag string differs from the catalog tag** - correct the string rather than adding a second entry, and tell the user which tag was replaced.
- **Declaration maps the tag to a different class** - fix the class reference and verify the class is the one the catalog registers.
- **File defines several catalogued components** - declare each tag, keeping one shared `declare global` block with one entry per tag.

## 4. Write the declaration

> **CRITICAL - the declaration must be the final content of the file:**
>
> Place a single `declare global` block at the **absolute end of the file**, after every class, function, export and other declaration. The closing `}` of this block must be the file's final non-whitespace character; only a trailing newline may follow it.
>
> Before editing, inspect the file's final lines. Append the block after the existing final line rather than anchoring the edit to a class-closing `}` that may also occur earlier in the file. After editing, read the final lines again and confirm that no source content follows the block.

Match the existing convention in the package (for example in [`RegistryOpacitySlider.ts`](../../../src/controls/registry/RegistryOpacitySlider.ts)):

```ts
declare global {
    interface HTMLElementTagNameMap {
        "registry-opacity-slider": RegistryOpacitySlider;
    }
}
```

Rules:

- Use the exact tag string from the catalog, double quoted.
- Map it to the exact class identifier the catalog registers, not a base class and not an interface.
- The class must be exported from that file so the declaration references a real type.
- Use the package's 4-space indentation and keep the block separated from the class by one blank line.
- Add no JSDoc, no comment and no extra properties to the block; keep the diff limited to the declaration.
- Never place the block inside the class, inside a `namespace`, or above the class definition.
- Never insert the block after an intermediate `}` selected only by matching context. Append it at the actual end of the document.
- Do not add declarations for abstract base classes, mixins or test-only elements; declare only catalogued, concrete custom elements.

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
- Re-run the helper for the edited component and confirm the status is `OK`.
- Lint the changed files with `pnpm --filter @labirthermal/webcomponents exec eslint <changed-source-paths>`.
- A type-check is optional and must be interpreted carefully. The package has a large pre-existing error baseline, so never read a non-zero exit as a regression; compare the error count before and after the change instead:

  ```bash
  cd packages/embed && node node_modules/typescript/bin/tsc -p tsconfig.lib.json --noEmit 2>&1 | grep -c "error TS"
  ```

  Call the binary through `node node_modules/typescript/bin/tsc`. The package's `tsc` dependency shadows the real compiler, so `pnpm exec tsc` fails with an unrelated message.
- Run tests only when the component's behavior was touched; a pure type declaration needs no test run.
- Do not run or commit builds for a declaration-only change. The declaration reaches consumers through the `tsdown` declaration build of `src/index.export.ts`, which already re-exports the catalog.

## 6. Report

Tell the user, per file: the tag name, the resolved class, whether the declaration was added, corrected or already present, and any catalog inconsistency found. When several components were processed, summarize the remaining `MISSING` count from the script.

## Batch mode

When the user asks for an audit or a bulk fix, work from `--missing` output, process files one by one, and keep each file's diff limited to its `declare global` block. Confirm the scope with the user before editing a large number of files.
