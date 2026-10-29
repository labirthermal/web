# LRC files

**LabIR Recording** (`.lrc`) is an open radiometric format developed by the Infrared Technologies research team at the University of West Bohemia in Pilsen. It stores single images as well as sequences.

The format specification is published on GitHub: [LRC format documentation](https://github.com/labirthermal/lrc-recording/blob/master/docs/LRC-FORMAT.md).

## Devices

- [TIMI Edu Infrared Camera](https://edu.labir.cz) by TIMI Creation, s.r.o.
- Custom measurement systems by [IRT UWB in Pilsen](https://irt.zcu.cz)

## What is supported

| Feature | Support |
|---|---|
| Single images | yes |
| Sequences | yes, every frame has its own timestamp |
| Float32 pixels | yes, temperatures are stored directly in °C |
| Uint16 pixels | yes, decoded using the minimum and maximum of each frame |
| Emissivity and reflected temperature | read from every frame |

## How the file is read

An LRC file consists of a file header followed by frames. Every frame has its own header and pixels:

- **File header**: the `LRC\0` signature, the pixel data type and the image dimensions.
- **Frame header**: the timestamp, the minimum and maximum temperature, the emissivity and the reflected temperature.
- **Pixels**: row-major, either Float32 values in °C or Uint16 values.

Uint16 pixels are mapped linearly to the temperature range of their frame:

```
temperature = min + ( max - min ) × value / 65535
```

The file is detected by the `LRC\0` signature and a complete file header, regardless of the file extension.

LRC files are read directly, without any conversion while loading. Only the requested frame is decoded, so long sequences load quickly.
