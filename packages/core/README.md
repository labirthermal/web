# Thermal imaging in TS

Clinet side classes for work with thermal images.

## Core functionality

- reading files using web-workers
- displaying files in a canvas element
- control of user interaction with the canvas element
- setting of thermal display parameters
- handling analyses and playback

## Pixel updates and WebGL playback

Use `setPixels()` to publish pixel changes, including changes to a reused array.
The read-only `pixelsVersion` advances on each call before update side effects run.
The WebGL renderer currently uploads the latest pixels before every draw.
The version guard is temporarily commented out to diagnose playback updates;
palette and range redraws also upload the pixel texture in this mode. This does
not add draw calls or change playback timing, but can increase upload work.

Web components import this package from `dist/index.mjs`, not directly from
its source. After core changes, run `pnpm --dir packages/core build` from the
repository root and reload the embedding application to use the updated code.

## Framework agnostic

This package is intentionally written independently on any frontend framework. It might be implemented in any one. So far, we have been working on those integrations:

- React: `@labir/react-bridge` (work in progress)
- Vue 3: `@labir/vue` (experimental)
- Web components: `@labir/embed`
- Wordpress plugin built on top of `@labir/embed`