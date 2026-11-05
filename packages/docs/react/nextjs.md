# Next.js and SSR

The `@labirthermal/react` entry point is browser-only and must not be evaluated
during server rendering. In the App Router, `'use client'` alone is not enough:
Next.js can still prerender Client Components on the server. Load the component
that imports the package through `next/dynamic` with `ssr: false`.

Define the viewer in a client module:

```tsx
// app/components/ThermalViewer.tsx
'use client';

import {
  LabirthermalProvider,
  ThermalFileApp,
} from '@labirthermal/react';

export default function ThermalViewer({ thermal }: { thermal: string }) {
  return (
    <LabirthermalProvider fallback={<p>Loading viewer...</p>}>
      <ThermalFileApp thermal={thermal} />
    </LabirthermalProvider>
  );
}
```

Import it dynamically from a separate client module:

```tsx
// app/components/ClientThermalViewer.tsx
'use client';

import dynamic from 'next/dynamic';

const ClientThermalViewer = dynamic(
  () => import('./ThermalViewer'),
  {
    ssr: false,
    loading: () => <p>Loading viewer...</p>,
  },
);

export default ClientThermalViewer;
```

Render the loader from a server page and pass serializable props across the
server/client boundary:

```tsx
// app/page.tsx
import ClientThermalViewer from './components/ClientThermalViewer';

export default function Page() {
  return <ClientThermalViewer thermal="/thermal/recording.lrc" />;
}
```

Place the example recording at `public/thermal/recording.lrc`. Keep the dynamic
loader separate from the viewer module: it must not statically import values
from `@labirthermal/react`. `ssr: false` must be declared in a Client Component.
The loader's placeholder is rendered on the server; `LabirthermalProvider`
initializes the webcomponents after the viewer mounts in the browser.
