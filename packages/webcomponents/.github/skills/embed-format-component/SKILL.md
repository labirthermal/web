---
name: embed-format-component
description: "Use for the embed package (@labirthermal/webcomponents) in packages/embed when formatting, documenting, or refactoring a Lit web component or class with JSDoc, custom method documentation, controller property exclusions, and clean readable code."
---

# Embed Component & Class Formatter Workflow

This workflow standardizes documentation, code structure, and readability for Lit web components and TypeScript classes in `packages/embed` (`@labirthermal/webcomponents`).

---

## 1. Scope & Package Guard

> **CRITICAL - Embed Package Only:**
> This skill is strictly scoped to `packages/embed`.
>
> **Verification Step:**
> Check the target file path. If the file is **NOT** located under `packages/embed/`:
> 1. Inform the user: *"Tento skill (`embed-format-component`) je určen pouze pro balíček `packages/embed`. Zadaný soubor leží mimo tento balíček, operace byla zastavena."*
> 2. Stop execution immediately. Do not format or modify files outside `packages/embed`.

---

## 2. Formatting & Documentation Rules

### A. Class-Level JSDoc
- Every component and class must have a comprehensive JSDoc header describing:
  - High-level purpose and architectural role in `@labirthermal/webcomponents`.
  - `@element <tag-name>` tag if annotated with `@customElement(...)`.
  - `@deprecated` tag: If the class is marked or intended as deprecated, always add `@deprecated` including an explanation of why and what alternative should be used.
  - References (`@see`) to associated controllers, contexts, or base classes where relevant.

### B. Custom Properties vs. Controller Properties
- **Document Custom Properties:**
  - Add JSDoc comments to all component-specific `@property()`, `@state()`, and standard class fields/getters/setters.
  - Describe the expected values, reflection behavior, and default values.
- **EXCLUDE Controller-Prescribed Properties:**
  - Reactive controllers define host properties via dedicated interfaces (e.g., `IAppWithThermalDisplayController`, `IBaseElement`, etc.).
  - **Rule:** Do NOT duplicate property documentation in the host class for properties prescribed by controllers (e.g. `palette`, `advancedPalettes`, `smoothThermograms`, `opacity`, `from`, `to`).
  - Documentation for these properties belongs exclusively in the controller or in the controller's interface. In the component, either omit the doc comment or provide a minimal `@see` reference pointing to the controller interface.

> #### *Extension Skeleton: Known Controller Interfaces to Exclude*
> Add new controller interfaces here as they are introduced:
> - `IAppWithThermalDisplayController` (from `controllers/AppDisplayController.ts`)
> - `IBaseElement` (from `controllers/IBaseElement.ts`)
> - `ISingleVideoExportElement` (from `controls/file/video/ISingleVideoExportElement.ts`)
> - *(Add custom controller interfaces here...)*

### C. Custom Methods vs. Lit Lifecycle Methods
- **Skip Standard Lit Lifecycle Methods:**
  - Standard Lit lifecycle methods must **NOT** receive custom method documentation. Keep them focused and clean.
  - Standard methods to exclude from custom JSDoc:
    - `connectedCallback`
    - `disconnectedCallback`
    - `adoptedCallback`
    - `attributeChangedCallback`
    - `willUpdate`
    - `update`
    - `render`
    - `firstUpdated`
    - `updated`
    - `shouldUpdate`
    - `performUpdate`
    - `scheduleUpdate`
    - `createRenderRoot`
  *(Note: If a lifecycle hook contains complex reactive logic, follow [embed-lit-update-lifecycle](../embed-lit-update-lifecycle/SKILL.md) for inline side-effect comments, but do not add redundant method-level JSDoc.)*
- **Document All Custom Methods:**
  - Every non-lifecycle / custom method (public, protected, or private) must have valid JSDoc:
    - Purpose and behavior description.
    - `@param <name>` with descriptive explanation for each parameter.
    - `@returns` explaining the return value (omit or document as `void` if nothing is returned).
    - `@throws` if specific exceptions can be thrown.

### D. Function Body Readability & Block Comments
- **Readability first:** Code must be clear, transparent, and easy to follow.
- **Descriptive Variable Names:** Use descriptive, self-explanatory variable names rather than short/cryptic abbreviations.
- **Logical Spacing & Indentation:** Separate distinct functional phases with blank lines and proper indentation.
- **Inline Block Comments:** For every longer or multi-step functional block within a method body, provide a concise inline summary comment (e.g., `// Extract and validate parameters`, `// Update cache and notify subscribers`).

---

## 3. Interactive Dialogue Workflow

The formatting process must be conducted interactively with the user, rather than making sweeping unconfirmed changes.

```
[Phase 1: Analyze] ──> [Phase 2: Class & Properties Proposal] ──> [Phase 3: Method-by-Method Dialogue] ──> [Phase 4: Apply & Verify]
```

### Phase 1: Analysis & Inventory
1. Read the target file in `packages/embed`.
2. Inspect inheritance, decorators (`@customElement`), interfaces, and controllers.
3. List:
   - Deprecation status.
   - Prescribed controller properties to be excluded from docs.
   - Custom properties to be documented.
   - Lit lifecycle methods (to skip).
   - Custom methods to be documented and formatted.

### Phase 2: Class & Properties Review
1. Formulate the proposed class-level JSDoc (including `@deprecated` if applicable).
2. Present the identified controller properties (which will be excluded) and custom properties to document.
3. Ask the user for confirmation or adjustments before proceeding to the methods.

### Phase 3: Interactive Method-by-Method Dialogue
For each custom method in the class:
1. Show the method signature, proposed JSDoc, and proposed inline block comments or variable clarifications.
2. Ask the user (via `ask_user` tool or interactive prompt):
   - *"Does this JSDoc and block comment capture the purpose of `methodName()` accurately?"*
   - Offer options to confirm, adjust description, or add specific parameter details.
3. Wait for user feedback before moving to the next method.

### Phase 4: Application & Verification
1. Apply the agreed changes using surgical edits with the `edit` tool.
2. Verify linting and formatting on the file:
   ```bash
   pnpm --filter @labirthermal/webcomponents exec eslint <file-path>
   ```
3. Report the result to the user.

---

## 4. Skeleton Template & Extension Guide

Use this template as a reference when formatting or extending rules for a component:

```typescript
/**
 * [Description of component role and behavior in embed package]
 *
 * @element thermal-example-element
 * @see AppDisplayController (if controller is bound)
 * @deprecated Optional deprecation notice: [Reason and replacement]
 */
@customElement("thermal-example-element")
export class ThermalExampleElement extends LitElement implements IAppWithThermalDisplayController {

    /* =========================================================================
     * Controller-Prescribed Properties (Docs managed in controller interface)
     * ========================================================================= */
    @provide({ context: appDisplayContext })
    public thermalDisplayController: AppDisplayController = new AppDisplayController(this);

    // Host properties mandated by IAppWithThermalDisplayController (no duplicate JSDoc here):
    @property({ type: String }) palette: AvailableThermalPalette = "iron";
    @property({ type: Boolean }) advancedPalettes: boolean = false;

    /* =========================================================================
     * Custom Properties
     * ========================================================================= */
    /**
     * Custom property description.
     */
    @property({ type: String })
    public customProperty: string = "";

    /* =========================================================================
     * Lit Lifecycle Methods (Excluded from custom method JSDoc)
     * ========================================================================= */
    override willUpdate(changedProperties: PropertyValues): void {
        super.willUpdate(changedProperties);
    }

    override render() {
        return html`<div>...</div>`;
    }

    /* =========================================================================
     * Custom Methods (Documented interactively + inline block comments)
     * ========================================================================= */
    /**
     * Short summary of what this custom method does.
     *
     * @param targetIdentifier Identifier of the target entity to process.
     * @returns True if processing succeeded, false otherwise.
     */
    public processTargetData(targetIdentifier: string): boolean {
        // Step 1: Validate input parameter and check local cache
        if (!targetIdentifier || targetIdentifier.trim().length === 0) {
            return false;
        }

        // Step 2: Perform computation with clear, readable variable names
        const normalizedTargetIdentifier = targetIdentifier.trim().toLowerCase();
        const calculationResult = this.calculateTargetMetrics(normalizedTargetIdentifier);

        // Step 3: Emit update event and return status
        this.dispatchEvent(new CustomEvent("target-processed", { detail: calculationResult }));
        return true;
    }
}
```
