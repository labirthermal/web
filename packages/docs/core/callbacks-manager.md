# CallbacksManager

The <code>CallbacksManager</code> is the reactivity primitive of <code>@labirthermal/core</code>. It is a thin extension of the built-in `Map<string, callback>` that stores callbacks under unique string keys and triggers them all at once.

<PropertyInfo
    handler="CallbacksManager"
    type="Map&lt;string, CallbackType&gt;"
    source="packages/core/src/properties/callbacksManager.ts"
/>

Every reactive mechanism in the library is built on top of this class. Understanding it makes every other class reference easier to read.

## API

- `add( key, callback, oneShot = false )` – register a callback under a unique key. When `oneShot` is `true`, the callback removes itself after the first call.
- `set( key, callback )` – register a callback (inherited from `Map`).
- `call( ...args )` – trigger all registered callbacks with the provided value(s).
- `delete( key )` – remove a callback by its key (inherited from `Map`).
- `clear()` – remove all callbacks (inherited from `Map`).

```ts
import { CallbacksManager } from "@labirthermal/core";

const onValueChange = new CallbacksManager<( value: number ) => void>();

// Register a callback under a unique key
onValueChange.add( "my-listener", value => {
    console.log( "Value changed to", value );
} );

// Register a one-shot callback that removes itself after the first call
onValueChange.add( "init-only", value => {
    console.log( "Called exactly once with", value );
}, true );

// Trigger all registered callbacks
onValueChange.call( 42 );

// Remove a callback by its key
onValueChange.delete( "my-listener" );
```

::: warning Unique keys
The key identifies the listening object. Registering a second callback under the same key **replaces** the previous one. Always use a key that is unique for your component or feature and remove it when it is no longer needed.
:::

## Where it is used

The library uses `CallbacksManager` in two ways. Each class reference lists both of them in the **Events** section of every property.

### 1. Observable properties (`addListener`)

Most settings in the hierarchy – such as the palette, range, opacity or the file lists – are observable properties. Each of them stores its listeners in an internal `CallbacksManager` which is controlled through public methods:

- `property.value` – read the current value.
- `property.addListener( id, listener )` – register a listener on value changes.
- `property.removeListener( id )` – remove the listener by its unique ID.
- `property.clearAllListeners()` – remove all listeners.
- `property.reset()` – set the value back to its initial state.

The value itself is never assigned directly from the outside; every property exposes its own setter methods (for example `manager.palette.setPalette()` or `registry.range.imposeRange()`) which validate the value, apply side effects and notify the listeners.

```ts
import { ThermalManager } from "@labirthermal/core";

const manager = new ThermalManager();

manager.palette.addListener( "palette-logger", value => {
    console.log( "Palette changed to", value );
} );

manager.palette.setPalette( "iron" ); // ... triggers the listener

manager.palette.removeListener( "palette-logger" );
```

### 2. Public event fields (`on*` and `callbacks*`)

Classes also expose public `CallbacksManager` fields directly as events. These cover moments that are not simple value changes – mounting to DOM, batch completion, frame changes during playback and so on:

```ts
// An event on the registry's batch loader
registry.batch.onBatchComplete.add( "my-component", results => {
    console.log( "Batch finished with", results.length, "results" );
} );

// An event on a file instance
instance.onMount.add( "my-component", () => {
    console.log( "The file was mounted to DOM" );
} );

// A playback event on the instance's timeline
instance.timeline.callbacksChangeFrame.add( "my-component", frame => {
    console.log( "Current frame changed to", frame.index );
} );
```

The naming convention is `onSomething` or `callbacksSomething`. Unlike observable properties, these fields are used directly: register with `add()` / `set()` and unregister with `delete()`.
