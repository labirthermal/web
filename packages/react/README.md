# @labirthermal/react

**A fully client-side React package for viewing and analyzing thermal images and
sequences.** It wraps `@labirthermal/webcomponents` with typed React components.
File loading, parsing, rendering, analysis and playback run in the browser; no
LabIR backend or server-side thermal processing is required.

**Render all LabIR components inside `LabirthermalProvider`.** The provider
initializes the browser runtime before mounting its children.

## Installation

```sh
npm install @labirthermal/react
```

Requires React and React DOM `^19.3.1` in the host application. Core,
webcomponents and Lit dependencies are installed automatically. No IIFE script
or separate stylesheet import is needed.

## Applications

Start with the self-contained applications. Each creates its own manager,
registry, group and file contexts; only `LabirthermalProvider` is needed around
it.

### Single thermal file

```tsx
import { LabirthermalProvider, ThermalFileApp } from '@labirthermal/react';

export function ThermalViewer() {
  return (
    <LabirthermalProvider fallback={<p>Loading thermal tools...</p>}>
      <ThermalFileApp
        label="Recording"
        thermal="/thermal/recording.lrc"
        style={{ width: '100%' }}
      />
    </LabirthermalProvider>
  );
}
```

See the [thermal-file-app reference](https://labirthermal.github.io/web/webcomponents/applications/thermal-file-app)
for configuration, visible-image overlays, analysis and playback options.

### A group of thermal files

```tsx
import { LabirthermalProvider, ThermalGroupApp } from '@labirthermal/react';

export function ThermalCollection() {
  return (
    <LabirthermalProvider fallback={<p>Loading thermal tools...</p>}>
      <ThermalGroupApp
        filesString={
          'thermal~/thermal/before.lrc|label~Before;' +
          'thermal~/thermal/after.lrc|label~After'
        }
      />
    </LabirthermalProvider>
  );
}
```

`filesString` is the JavaScript property corresponding to the `group-files`
attribute. See the [thermal-group-app reference](https://labirthermal.github.io/web/webcomponents/applications/thermal-group-app)
for file-list syntax, layout and shared controls.

### Local files and drag-and-drop

```tsx
import { LabirthermalProvider, ThermalDropinApp } from '@labirthermal/react';

export function ThermalWorkspace() {
  return (
    <LabirthermalProvider fallback={<p>Loading thermal tools...</p>}>
      <ThermalDropinApp />
    </LabirthermalProvider>
  );
}
```

Users select or drop local files for in-browser processing. See the
[thermal-dropin-app reference](https://labirthermal.github.io/web/webcomponents/applications/thermal-dropin-app).

For URL-based examples, serve the files from your application's static assets
or another HTTP server. Cross-origin URLs require suitable CORS headers.

## Component API

**React component parameters are the same as the underlying webcomponents'
JavaScript properties.** Use camelCase property names rather than HTML attribute
names: for example, `filesString`, `managerSlug`, `showFullscreen` and
`prefersGpu`. Pass booleans, arrays and objects as JavaScript values.

The [webcomponents reference](https://labirthermal.github.io/web/webcomponents/)
documents the underlying behavior, provider requirements, slots and configuration.
Props and refs are typed from the original element classes through `@lit/react`.
Use the exported React components rather than raw custom-element JSX tags.

Standard React DOM handlers such as `onClick` are supported. Custom DOM events
are not automatically mapped to React callback props; subscribe with
`addEventListener` through the element ref and remove listeners on cleanup.
Named slots use the usual `slot` prop on the child.

## LabirthermalProvider

`LabirthermalProvider` is the initialization boundary for every LabIR React
component. It:

1. Renders `fallback` during the initial render while initialization is pending.
2. Dynamically imports the webcomponents runtime after mounting in the browser.
3. Waits for the existing i18n initialization, inserts global styles and attaches
   a document-level Lit `ContextRoot`.
4. Registers **all** custom elements from the catalog, including dependencies
   used internally by the applications.
5. Provides the loaded runtime to React wrappers and mounts its children.

Initialization is shared across provider instances and React Strict Mode
remounts. Styles, translations, custom-element registrations and the Lit context
remain available after unmounting. Do not combine this integration with an
independently loaded IIFE: conflicting element registrations are rejected.

| Prop | Meaning |
| --- | --- |
| `children` | LabIR components and application content, mounted after initialization. |
| `fallback` | Content shown while initializing. Defaults to `null`. |
| `errorFallback` | Optional `(error: Error) => ReactNode` renderer for initialization failures. |

```tsx
<LabirthermalProvider
  fallback={<p>Loading thermal tools...</p>}
  errorFallback={(error) => <p role="alert">{error.message}</p>}
>
  <ThermalDropinApp />
</LabirthermalProvider>
```

Without `errorFallback`, initialization errors are thrown during rendering for
an application error boundary to handle. Remounting allows another initialization
attempt after a failure; successful initialization is reused. Readiness means
the runtime is initialized, not that every file has finished loading.

Wrappers rendered outside `LabirthermalProvider` throw an explicit error. The
global registration of HTML tags does not replace the React provider context.

## Next.js

The package can be embedded in a server-rendered application, but its main entry
must be loaded **only in the browser**. Its core runtime reexports access
`window` during module evaluation. `'use client'` alone is not sufficient:
Next.js also prerenders Client Components on the server.

In the App Router, define the viewer in its own client module:

```tsx
// app/components/ThermalViewer.tsx
'use client';

import { LabirthermalProvider, ThermalFileApp } from '@labirthermal/react';

export default function ThermalViewer({ thermal }: { thermal: string }) {
  return (
    <LabirthermalProvider fallback={<p>Loading thermal tools...</p>}>
      <ThermalFileApp thermal={thermal} />
    </LabirthermalProvider>
  );
}
```

Load that module through a separate Client Component with SSR disabled:

```tsx
// app/components/ClientThermalViewer.tsx
'use client';

import dynamic from 'next/dynamic';

const ThermalViewer = dynamic(() => import('./ThermalViewer'), {
  ssr: false,
  loading: () => <p>Loading thermal viewer...</p>,
});

export default ThermalViewer;
```

The loader module must not statically import values from `@labirthermal/react`.
`ssr: false` must be declared in a Client Component, not a Server Component.
Render the loader from the server page:

```tsx
// app/page.tsx
import ClientThermalViewer from './components/ClientThermalViewer';

export default function Page() {
  return <ClientThermalViewer thermal="/thermal/recording.lrc" />;
}
```

Place the example file at `public/thermal/recording.lrc`. Pass serializable props
across the server/client boundary; define callbacks and instantiate thermal
objects on the client.

The dynamic loader supplies the server-rendered loading placeholder.
`LabirthermalProvider` then handles webcomponent initialization after the viewer
mounts in the browser. Neither the thermal UI nor its internal shadow DOM is
server-rendered. No `next/script` or IIFE loading is needed.

## Composing a custom interface

For a custom UI, use the hierarchy providers instead of a self-contained
application:

```tsx
import {
  LabirthermalProvider,
  ManagerProvider,
  RegistryProvider,
  GroupProvider,
  FileProvider,
  FileCanvas,
  FileTimeline,
  RegistryRangeSlider,
} from '@labirthermal/react';

export function CustomViewer() {
  return (
    <LabirthermalProvider fallback={<p>Loading thermal tools...</p>}>
      <ManagerProvider>
        <RegistryProvider>
          <RegistryRangeSlider />
          <GroupProvider>
            <FileProvider thermal="/thermal/recording.lrc">
              <FileCanvas />
              <FileTimeline />
            </FileProvider>
          </GroupProvider>
        </RegistryProvider>
      </ManagerProvider>
    </LabirthermalProvider>
  );
}
```

`ManagerProvider` shares palettes, units and tools; `RegistryProvider` shares the
temperature range; `GroupProvider` groups files; `FileProvider` loads a file and
provides its state to canvas, analysis and playback components.
`LabirthermalProvider` initializes the runtime but does not replace this hierarchy.

## Complete component list

All components below are exported from `@labirthermal/react`.

### Applications

`ThermalFileApp`, `ThermalGroupApp`, `ThermalDropinApp`, `ThermalSlottedApp`,
`AatApp`.

### UI

`ThermalApp`, `ThermalBar`, `ThermalBtn`, `ThermalBtnGroup`, `ThermalDialog`,
`ThermalDropdown`, `ThermalDropin`, `ThermalExpandable`, `ThermalField`,
`ThermalIcon`, `ThermalLoading`, `ThermalRadio`, `ThermalSlot`, `ThermalSpinner`,
`ThermalTip`.

### Manager

`ManagerProvider`, `ManagerGraphSmoothSwitch`, `ManagerImageSmoothSwitch`,
`ManagerPaletteButtons`, `ManagerPaletteDropdown`, `ManagerToolBar`,
`ManagerAdvancedPaletteSwitch`, `ManagerUnitSwitch`, `ManagerExportPanel`
(deprecated; prefer file download and video export controls).

### Registry

`RegistryProvider`, `RegistryHistogram`, `RegistryOpacitySlider`,
`RegistryRangeAutoButton`, `RegistryRangeFullButton`, `RegistryRangeDisplay`,
`RegistryRangeForm`, `RegistryRangeSlider`, `RegistryTicksBar`.

### Group

`GroupProvider`, `GroupAnalysisSyncButton`, `GroupChart`, `GroupDownloadButtons`,
`GroupDownloadDropdown`, `GroupDropin`, `GroupDropinInput`, `GroupRangePropagator`,
`GroupTimeline`.

### File

`FileProvider`, `FileCopy`, `FileCanvas`, `FileDownloadButton`, `FileInfoButton`,
`FilePlaybackSpeedDropdown`, `FileTimeline`, `FileVideoExportButton`,
`FileVideoExportPanel`, `FileLabel`, `FileButton`, `FileDropdown`, `FileLrcButton`,
`FilePngButton`, `FileRangePropagator`, `FileAnalysisComplex`,
`FileAnalysisDisplay`, `FileAnalysisEditDialog`, `FileAnalysisGraph`,
`FileAnalysisRow`, `FileAnalysisTable`, `AnalysisColorDropdown`,
`AnalysisNameInput`, `AreaEditTable`, `EditpointTable`, `ThermalChart`,
`FileDetail`, `FileThumbnail`.

## Development

From the monorepo root:

```sh
pnpm --filter @labirthermal/react dev
pnpm --filter @labirthermal/react typecheck
pnpm --filter @labirthermal/react lint
pnpm --filter @labirthermal/react test
pnpm --filter @labirthermal/react build
```

Vite serves a local React playground with thermal samples from the repository's
`public` directory. This is a development server, not a production dependency.
The library build uses tsdown to produce ESM, CommonJS, source maps and TypeScript
declarations in `dist/lib`. React and LabIR dependencies remain external.
