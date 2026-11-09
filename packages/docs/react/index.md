# @labirthermal/react

React wrappers for `@labirthermal/webcomponents`. The thermal UI and its
runtime are initialized in the browser; every React component must be rendered
inside [`LabirthermalProvider`](./labirthermal-provider).

## Usage

Install [`@labirthermal/react` from npm](https://www.npmjs.com/package/@labirthermal/react) in a React 19 application:

```sh
npm install @labirthermal/react
```

Render a self-contained thermal viewer:

```tsx
import {
  LabirthermalProvider,
  ThermalFileApp,
} from '@labirthermal/react';

export function ThermalViewer() {
  return (
    <LabirthermalProvider fallback={<p>Loading viewer...</p>}>
      <ThermalFileApp thermal="/thermal/recording.lrc" />
    </LabirthermalProvider>
  );
}
```

## Sections

- [LabirthermalProvider](./labirthermal-provider) initializes the browser
  runtime and supplies it to the React wrappers.
- [Components](./components) lists the available wrappers and explains their
  props.
- [Next.js and SSR](./nextjs) shows how to load the package without evaluating
  it during server rendering.

For component behavior and configuration, see the
[`@labirthermal/webcomponents` reference](../webcomponents/).
