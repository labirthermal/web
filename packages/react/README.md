# @labirthermal/react

React integration for `@labirthermal/webcomponents`. The package exports
`LabirProvider` and React wrappers for every element in the webcomponents catalog.
Raw custom-element JSX declarations are not implemented yet.

Requires React and React DOM 19.3.1 or later within React 19.

## Provider

```tsx
'use client';

import { LabirProvider } from '@labirthermal/react';

export function ThermalPanel() {
  return (
    <LabirProvider fallback={<p>Loading thermal tools...</p>}>
      <p>LabIR is ready.</p>
    </LabirProvider>
  );
}
```

The server and the first client render show the same `fallback` (default: `null`).
After mounting, the provider dynamically imports the webcomponents, waits for
their existing i18n initialization, adds global styles, attaches a document-level
Lit `ContextRoot`, and registers the custom elements before rendering children.
No IIFE script or `next/dynamic` is required.

Initialization is shared by all providers, including Strict Mode remounts.
Global styles, translations, registrations and the Lit context stay available
after unmounting. Existing registrations from a different runtime cause an error;
do not combine this integration with an independently loaded IIFE.
The provider does not replace the manager/registry/group/file provider hierarchy.
It does not upload files or add a server-side thermal processing service.

## Components

All wrappers are exported from `@labirthermal/react`, grouped in the source files
`components/ui.tsx`, `apps.tsx`, `manager.tsx`, `registry.tsx`, `group.tsx` and
`file.tsx`. Their props and refs are inferred from the corresponding catalog
classes using `@lit/react`. React wrappers must be rendered inside `LabirProvider`;
using them outside it throws an explicit error.

The shared wrapper factory imports element types only. It creates the actual
Lit/React wrapper from the provider's loaded runtime, so importing the React
package does not evaluate browser-only webcomponent modules on the server.
Properties, refs, native events and named slots are forwarded by `@lit/react`.
Custom DOM events do not yet have explicit React callback mappings.

```tsx
import {
  LabirProvider, ManagerProvider, RegistryProvider, GroupProvider,
  FileProvider, FileCanvas, FileTimeline, RegistryRangeSlider,
} from '@labirthermal/react';

export function Viewer() {
  return (
    <LabirProvider fallback={<p>Loading...</p>}>
      <ManagerProvider>
        <RegistryProvider>
          <RegistryRangeSlider />
          <GroupProvider>
            <FileProvider thermal="/lrc/sequence_uint16_small_short.lrc">
              <FileCanvas />
              <FileTimeline />
            </FileProvider>
          </GroupProvider>
        </RegistryProvider>
      </ManagerProvider>
    </LabirProvider>
  );
}
```

Core classes and types are not re-exported. Import them directly from
`@labirthermal/core` for now.

By default, initialization errors are thrown during rendering so an application
error boundary can handle them. To render an explicit local error message, pass
`errorFallback={(error) => <p role="alert">{error.message}</p>}` from a client
component. A failed initialization can be attempted again by remounting the
provider; successful initialization is reused.

## Development

Run these commands from the repository root:

```sh
pnpm --filter @labirthermal/react dev
pnpm --filter @labirthermal/react typecheck
pnpm --filter @labirthermal/react build
```

The development command starts a Vite server for the React playground. It is not
a production server and is not required by applications consuming the library.
The playground resolves `@labirthermal/react` to the local source entry.
It serves the repository's `public` directory and demonstrates a static LRC and
an LRC sequence with shared registry/group controls, palettes, analyses, playback
and downloads.

## Library build

`tsdown.config.ts` builds the source entry into ESM, CommonJS, source maps and
TypeScript declarations in `dist/lib`. React, React DOM, Lit's React adapter and
LabIR dependencies stay external. No IIFE build is needed for this package.

`tsconfig.json` checks source, playground and build configurations.
`tsconfig.lib.json` limits declaration generation to library source.
`vite.config.dev.ts` configures only the playground, not the library build.

The library build adds a `'use client'` directive for Next.js. This directive
does not disable server prerendering: browser-only webcomponent imports must
still be deferred until client mounting, as implemented by `LabirProvider`.
