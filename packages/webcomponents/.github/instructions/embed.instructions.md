---
description: "Use when working on the embed package (@labirthermal/webcomponents) in packages/embed: Lit web components, apps, providers, controls, controllers, public APIs, and tests."
applyTo: "packages/embed/**"
---

# Embed package instructions

## Scope and conventions

- These instructions cover `packages/embed` (`@labirthermal/webcomponents`), the browser-facing Lit web-component layer over the workspace thermal libraries. Do not apply embed-specific rules to other packages.
- Follow the [package documentation](../../README.md) and [package scripts and exports](../../package.json); update directly related documentation when behavior or public APIs change.
- Reuse existing patterns in `src/apps`, `src/hierarchy`, `src/controls`, `src/controllers`, and `src/connection`. Keep thermal-library logic in its owning package rather than duplicating it in UI components.
- Preserve custom-element names, attributes, events, exports, and documented behavior unless the task explicitly changes them. Public usage examples should normally use `thermal-file-app`, `thermal-file-analyser`, or `thermal-dropin-app`; custom provider/control compositions must follow the existing hierarchy.
- Preserve existing localization, responsive behavior, and interaction/accessibility patterns. Reuse the relevant abstractions, contexts, reactive controllers, and directives before introducing new ones.
- Keep subscription and observer registration/cleanup correct when inputs change and components connect or disconnect. Follow the component's existing lifecycle patterns; do not move DOM-dependent work before rendering.

## Task-specific skills

- For Lit `change-in-update` warnings, reactive property or `@state` assignments in lifecycle methods, or decisions between `willUpdate` and `updated`, load [embed-lit-update-lifecycle](../skills/embed-lit-update-lifecycle/SKILL.md). It can also be invoked manually as `/embed-lit-update-lifecycle`.
- Preserve that skill's distinction between review and requested implementation. Do not treat every reactive write in `updated()` as a bug or prescribe one lifecycle hook for all side effects.
- For formatting, documenting, or refactoring Lit web components or classes with JSDoc, custom method documentation, controller property exclusions, and clean readable code, load [embed-format-component](../skills/embed-format-component/SKILL.md). It can also be invoked manually as `/embed-format-component`.
- For adding, checking, fixing, or auditing a component's global `HTMLElementTagNameMap` declaration against the registered tag names (`src/iifeCatalog.ts` or `@customElement`), load [embed-tag-name-map](../../../../.github/skills/embed-tag-name-map/SKILL.md). It can also be invoked manually as `/embed-tag-name-map`. That declaration stays DOM-level and framework neutral; do not add React JSX typings to component files.

## Verification

- Run pnpm commands from the repository root. Start with the smallest validation that covers the change.
- Add or update colocated `src/**/*.test.ts` tests using the existing Vitest/JSDOM patterns. For targeted tests, use `pnpm --filter @labirthermal/webcomponents exec vitest run <test-path>`; paths are relative to `packages/embed`. Combine related test paths in one run.
- For linting, use `pnpm --filter @labirthermal/webcomponents exec eslint <changed-source-paths>` or the package-wide `pnpm --filter @labirthermal/webcomponents lint` when needed.
- When changes affect public exports or bundle output, validate the relevant builds. `pnpm --filter @labirthermal/webcomponents build` builds IIFE and the library; ESM requires `pnpm --filter @labirthermal/webcomponents build:esm`.
- JSDOM tests do not establish real-browser rendering or interaction correctness; verify affected browser behavior when relevant. Do not assume SSR support.
- Do not regenerate or commit `dist` automatically for unrelated source or instruction changes. Instruction/documentation-only changes need frontmatter, link, and diff checks, not application tests or builds.

## Organization by package

- Keep the full package instructions and workflows in `packages/<package>/.github/instructions/<package>.instructions.md` and `packages/<package>/.github/skills/<package>-<workflow>/SKILL.md`.
- For sessions opened at the repository root, keep thin discovery entry points in the root `.github/instructions/<package>.instructions.md` and `.github/skills/<package>-<workflow>/SKILL.md`. Each entry point must explicitly require reading its package-local file; do not duplicate the rules or workflow there.
- Root instruction entry points use a package-specific `applyTo` glob. The glob in this package-local file is also relative to the repository-root workspace, not to this file's directory.
- Skill entry points keep `name` matching the folder and a description identifying both the package and task triggers. Prefixes are an organizational convention, not a technical path filter; skills are not scoped by `applyTo`.
- Do not rely on custom VS Code discovery paths for Copilot Agent Host sessions: `chat.instructionsFilesLocations` and `chat.agentSkillsLocations` only configure the Local agent. See the [location migration documentation](https://code.visualstudio.com/docs/agent-customization/migrate-customizations#_move-customizations-from-configured-locations).
