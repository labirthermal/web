# FLIR files

`@labirthermal/core` reads **radiometric JPEG images** saved by FLIR cameras and by cameras built on a FLIR core. These images look like ordinary JPEGs, but they also contain the raw detector data and the camera calibration. The library computes the temperatures from them.

## Devices

The parser is known to work with images from these devices:

| Manufacturer | Devices |
|---|---|
| [Teledyne FLIR](https://www.flir.com) | C5, E8-XT, E60, T630sc, FLIR ONE Pro, Vue Pro R 640 |
| [DJI](https://www.dji.com) | Zenmuse XT, Zenmuse XT2 |

Other cameras that save the same data structure should work as well.

## Supported variants

| Variant | Support |
|---|---|
| Raw data stored as a 16-bit PNG (newer cameras) | yes |
| Raw data stored as uncompressed 16-bit values (older cameras, DJI) | yes |
| Big-endian and little-endian data | yes, detected automatically |
| Single images | yes |
| Sequences and videos (`.seq`, `.csq`) | no |
| Ordinary JPEGs without thermal data | no |
| Images re-saved outside of FLIR software | no, the thermal data are usually lost |

## How the file is read

1. **Detection.** The file is recognised by the FLIR segments embedded in the JPEG, regardless of the file extension.
2. **Extraction.** The FLIR segments are joined into one container holding the raw detector data and the camera calibration.
3. **Raw data.** The detector values are decoded from the PNG or from the uncompressed data.
4. **Temperatures.** Every value is converted to °C using the calibration stored in the image: the Planck constants, emissivity, reflected and atmospheric temperature, object distance, relative humidity and the IR window.

The image is decoded only once, while loading. All later reads (frames, analyses, histogram) work with the computed temperatures. The original JPEG is kept unchanged, so it can still be downloaded.

The capture time is read from the camera data together with its time zone.

If the file is recognised but cannot be decoded, for example because it is damaged or its calibration is not valid, loading results in a `ThermalFileFailure` with the code `PARSING_ERROR`.

## Acknowledgement

The FLIR implementation is inspired by the Python library [flyr](https://pypi.org/project/flyr/). We are grateful to its authors for making the structure of FLIR files openly available.

The temperatures computed by `@labirthermal/core` are tested against reference values produced by flyr. The differences are below 0.0001 °C.
