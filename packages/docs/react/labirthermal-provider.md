# LabirthermalProvider

Every component exported by `@labirthermal/react` must be rendered inside
`LabirthermalProvider`. It is a client-side initialization boundary: on mount,
it loads the webcomponents runtime, waits for translations, installs global
styles and Lit context, and registers the custom elements. Its children render
once initialization succeeds.

The provider initializes the runtime; it does not replace the hierarchy
providers used to compose a custom interface. For example, `ManagerProvider`,
`RegistryProvider`, `GroupProvider` and `FileProvider` still provide their
respective thermal contexts. Self-contained app components such as
`ThermalFileApp` manage that hierarchy internally.

| Prop | Description |
| --- | --- |
| `children` | React components rendered after initialization. |
| `fallback` | Content rendered while initializing. Defaults to `null`. |
| `errorFallback` | Optional function that renders initialization errors. Without it, errors are thrown for an application error boundary to handle. |

```tsx
<LabirthermalProvider
  fallback={<p>Loading thermal tools...</p>}
  errorFallback={(error) => <p role="alert">{error.message}</p>}
>
  <ThermalFileApp thermal="/thermal/recording.lrc" />
</LabirthermalProvider>
```

Initialization happens in an effect, so the provider's fallback is rendered
during server rendering and the initial client render. See
[Next.js and SSR](./nextjs) for the required client-only loading pattern.
