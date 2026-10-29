"""
Independent reference values for the FLIR fixtures in `<repo>/public/flir`,
computed with the Python library flyr (`pip install flyr`).

    python generate_reference.py ../../../../../public/flir > flyr.json

`reference.json` was assembled from this output plus two values compared
against the TypeScript decoder:
- `timestamp` (UTC ms) and `timezoneOffset` from the FLIR CameraInfo record,
  accepted only when `timestamp - timezoneOffset` equals `exifLocalTime`;
- `flyrMaxAbsDiff`, the maximum absolute difference in °C between all pixels
  decoded by flyr and by `FlirParser`.
"""
import json, os, sys
import flyr

src = sys.argv[1]
out = {}
for name in sorted(n for n in os.listdir(src) if n.lower().endswith(".jpg")):
    path = os.path.join(src, name)
    t = flyr.unpack(path)
    c = t.celsius
    h, w = c.shape
    xs = [round(i * (w - 1) / 7) for i in range(8)]
    ys = [round(i * (h - 1) / 7) for i in range(8)]
    out[name] = {
        "width": w,
        "height": h,
        "exifLocalTime": str(t.camera_metadata.date_time),
        "emissivity": t.metadata["emissivity"],
        "reflectedKelvins": t.metadata["reflected_apparent_temperature"],
        "min": float(c.min()),
        "max": float(c.max()),
        "mean": float(c.mean()),
        "samples": [[x, y, float(c[y, x])] for y in ys for x in xs],
        "bytesize": os.path.getsize(path),
    }
json.dump(out, sys.stdout, indent=1)
