# Thermal imaging in TS

Clinet side classes for work with thermal images.

## Installation

Install [`@labirthermal/core` from npm](https://www.npmjs.com/package/@labirthermal/core):

```bash
npm install @labirthermal/core
```

## Core functionality

- reading files using web-workers
- displaying files in a canvas element
- control of user interaction with the canvas element
- setting of thermal display parameters
- handling analyses and playback

## Supported file formats

The parser is selected by the file content, not by its extension.

- **LabIR Recording (`.lrc`)** – single images and sequences.
- **FLIR radiometric JPEG (`.jpg`, `.jpeg`)** – single images from FLIR
  cameras and FLIR-core based cameras (e.g. DJI Zenmuse XT/XT2). Both raw
  encodings stored by the cameras are supported (16-bit raw and 16-bit PNG).

FLIR JPEGs are decoded once while loading: temperatures are computed from
the raw detector counts using the calibration and object parameters stored
in the file (emissivity, reflected temperature, distance, humidity…). The
original JPEG is kept untouched in `ThermalFileReader.fileBuffer` and is used
for downloads, while `ThermalFileReader.buffer` holds the decoded temperatures.
Decoding of a 640×512 image takes a few milliseconds.

Limitations of the FLIR support:

- JPEGs saved by other software lose the FLIR metadata and are rejected,
  as are plain (non-radiometric) JPEGs.
- Sequences (`.seq`, `.csq`), the embedded visible photo, MSX/PiP
  composition and measurement objects defined in the camera are not read.

## Documentation

- [Standalone usage](https://labirthermal.github.io/web/core/standalone) – load files and build a UI directly with the core API.
- [Core class reference](https://labirthermal.github.io/web/core/) – overview of the class hierarchy and links to individual classes.
- [Supported file formats](https://labirthermal.github.io/web/core/supported-files/) – format details and custom parser guidance.
- [Webcomponents documentation](https://labirthermal.github.io/web/webcomponents/) – use the core functionality through ready-made components.

## Framework agnostic

This package is framework-agnostic and can be used directly or through the
integrations maintained in this repository:

- [Web components](https://www.npmjs.com/package/@labirthermal/webcomponents)
  ([documentation](https://labirthermal.github.io/web/webcomponents/),
  [source](https://github.com/labirthermal/web/tree/main/packages/webcomponents))
- [React wrappers](https://www.npmjs.com/package/@labirthermal/react)
  ([documentation](https://labirthermal.github.io/web/react/),
  [source](https://github.com/labirthermal/web/tree/main/packages/react))

The [WordPress plugin](https://github.com/labirthermal/web/tree/main/packages/thermal-display)
is a separate integration built on the web components, not a TypeScript or npm
package. See its [README](../thermal-display/readme.txt).
