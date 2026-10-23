---
name: embed-lit-update-lifecycle
description: "Use for the embed package (@labirthermal/webcomponents) in packages/embed when diagnosing Lit change-in-update warnings about updates scheduled after an update, reviewing reactive property or @state assignments in Lit lifecycle methods, or deciding between willUpdate and updated."
---

# Embed Lit Update Lifecycle Review Workflow

This workflow targets components in `packages/embed` (`@labirthermal/webcomponents`). Trace relevant callbacks and dependencies as needed, but do not apply embed-specific recommendations to other packages. The `embed-` prefix identifies the intended package; it does not impose a technical path filter.

Use this workflow to explain or review Lit update-cycle issues one component at a time. Do not edit files unless the user explicitly asks for implementation; when the user is making the changes, give focused recommendations and review each revision.

## Review procedure

1. Read the component and the relevant call sites. Identify its reactive `@property` and `@state` fields and every place they are assigned, especially in `willUpdate`, `updated`, `firstUpdated`, and callbacks registered by the component.
2. Trace the warning to the exact assignment or operation. A reactive property/state write in `updated()` can schedule another update after the current one completed, which is the usual cause of Lit's “change-in-update” warning. Do not assume the file named in the warning is the only possible source; follow callback and subscription paths where relevant.
3. Distinguish derived render state from side effects:
   - Use `willUpdate(changedProperties)` to synchronously derive reactive values needed by the render for the current update. The incoming properties already hold their new values; `changedProperties` contains the previous values. Lit incorporates reactive writes made during this hook into the current update.
   - Use `updated()` for work that requires the rendered DOM to be updated. A reactive write there may intentionally schedule another update; do not move it blindly if the work depends on the DOM or on completion of rendering.
   - Keep event-driven or externally-triggered state changes in their event/callback paths when appropriate; they are not inherently lifecycle mistakes.
4. For subscriptions or observers keyed by a reactive input, preserve lifecycle correctness when that input changes: remove the old registration using the previous input from `changedProperties`, register against the current input, and ensure callbacks update the intended state. Consider connection/disconnection and repeated updates as appropriate to the existing component pattern.
5. Recommend the smallest safe change, explain why it avoids or preserves a subsequent update, and mention any behavior that should be verified. Do not claim the warning is fixed solely because an assignment moved; check that rendering and subscription behavior remain correct.
6. When implementing a requested lifecycle change, add a concise explanatory code comment immediately before each block that reacts to a changed property (for example, an `if (changedProperties.has("analysis"))` block). For a block in `willUpdate()`, use the exact comment convention `Side effect of <property/change> - <what the block does>` (for example, `Side effect of analysis changing - derive the displayed name before rendering`). For a block in `updated()`, explain its purpose freely, including why the work belongs after rendering. If separate blocks handle the same property in different lifecycle hooks, comment each block according to its distinct responsibility. Do not add such comments when only reviewing or explaining code without editing it.

## Guidance

- Do not treat every assignment in `updated()` as a bug. The concern is a reactive write that schedules another update, and whether that second update is necessary.
- Do not move DOM-dependent effects into `willUpdate()`: the DOM has not yet been updated there.
- Prefer using actual Lit lifecycle semantics and the component's existing patterns; avoid prescribing a universal lifecycle placement for all side effects.
