# Drop-in application

The *drop-in* webcomponent enables the user to analyze his own LRC files. It is a full-featured editor.

**Tag**: <code>thermal-dropin-app</code>

**Class**: <code>ThermalDropinApp</code>

**Example**

```html
<thermal-dropin-app
  palette="iron"
  advanced-palettes="true"
  tool="edit"
></thermal-dropin-app>
```
<thermal-dropin-app></thermal-dropin-app>

## palette and advanced-palettes

The `palette` and `advanced-palettes` attributes specify the initial palette and the palette choices offered in the dropdown. Empty or invalid palette values fall back to `jet`. See [Thermal palette](../guide/thermal-palette.md) for details.

## unit

The `unit` attribute selects the temperature unit used for displayed values and user-entered temperatures: `C`, `F` or `K` (case-insensitive). On initial connection, an unrecognized value is treated like an omitted attribute: a new manager starts in `C`, while a shared manager keeps its current unit. An explicit valid value sets the shared unit. Internal temperatures remain in Celsius. The application also provides a unit switch.

```html
<thermal-dropin-app unit="F"></thermal-dropin-app>
```

## tool
