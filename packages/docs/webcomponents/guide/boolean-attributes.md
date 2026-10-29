# Using boolean attributes

Many webcomponents from the `@labirthermal/web` bundle use attributes whose values are either `true` or `false`. 

Even trough their implementation corresponds to the [official Lit.js convention](https://lit.dev/docs/components/properties/#boolean-attributes), it can be confusing. Follow this guide to use boolean attributes correctly.

## The principle

1. Boolean attributes **every time** default to `false`.
2. The value is indicated **by the attribute presence**, not by the actual value of the attribute.

## Practically

```html

<!-- Usage of boolean attributes in HTML -->

<!-- ✅ This sets TRUE: --> <an-element an-attribute></an-element>              
<!-- ✅ This sets TRUE: --> <an-element an-attribute=""></an-element>           
<!-- ✅ This sets TRUE: --> <an-element an-attribute="true"></an-element>
<!-- ✅ This sets TRUE: --> <an-element an-attribute="false"></an-element>
<!-- ✅ This sets TRUE: --> <an-element an-attribute="anything"></an-element>

<!-- ❌ Only the following sets FALSE: --> 
 <an-element></an-element>
```

Only if the boolean attribute is *not present*, its value is set to `false`. This rule is common to both possible usages of webcomponents:
- usage in HTML (from an [IIFE build](../usage.md))
- internal usage within Lit.js templating system

## Internal definition of boolean attributes

The component from the previous example would be written in Lit.js this way:

```ts
@customElement("an-element")
export default class AnElement extends LitElement {

    @property({
        type: Boolean,
        reflect: true, // The internal value is reflected to the attribute
        attribute: "an-attribute" // Custom name of the attribute
    })
    anAttribute: boolean = false; // Defaults to false

    render(): unknown {
        return html`${this.anAttribute ? "true" : "false"}`;
    }

}
```

## Internal usage of boolean attributes

According to the Lit.js guideline, boolean attributes should be used using the following template features: `?` and `ifDefined`.

### Use with `?`

The attribute should be preceeded by `?` which prints the attribute only if its value is not `false`.

```ts

@customElement("another-element")
export default class AnotherElement extends LitElement {

    render(): unknown {

        return html`

            <an-element ?an-attribute=${true}></an-element>
        
        `;

    }

}

```

### Use wit `ifDefined`

If the value you provide into a boolean attribute can be undefined, wrap the value to the `ifDefined` directive.

```ts

@customElement("another-element")
export default class AnotherElement extends LitElement {

    // An internal property that can be undefined
    private internalState?: boolean;

    render(): unknown {

        return html`

            <an-element ?an-attribute=${ifDefined(this.internalState)}></an-element>
        
        `;

    }

}

```