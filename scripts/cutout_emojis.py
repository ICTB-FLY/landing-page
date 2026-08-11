from pathlib import Path
from PIL import Image
import numpy as np

src_dir = Path(r"d:\Job\ichikiwier-terbang-bebas\public\family\home")
out_dir = Path(r"d:\Job\ichikiwier-terbang-bebas\public\family\home\cutout")
out_dir.mkdir(exist_ok=True)

THRESH = 28

for p in sorted(src_dir.glob("emoji-*.png")):
    im = Image.open(p).convert("RGBA")
    arr = np.array(im)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    black = (r.astype(np.int16) + g.astype(np.int16) + b.astype(np.int16)) < THRESH * 3
    arr[black, 3] = 0
    lum = (r.astype(np.float32) + g.astype(np.float32) + b.astype(np.float32)) / 3
    fringe = (~black) & (lum < 55)
    arr[fringe, 3] = np.clip((lum[fringe] / 55.0) * 255, 0, 255).astype(np.uint8)
    out = out_dir / p.name
    Image.fromarray(arr).save(out, optimize=True)
    print(out.name, arr.shape)

print("done")
