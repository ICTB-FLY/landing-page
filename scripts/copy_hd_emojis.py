from pathlib import Path
from PIL import Image
import re

src = Path(r"d:\Job\ichikiwier-terbang-bebas\src\img\2d")
out = Path(r"d:\Job\ichikiwier-terbang-bebas\public\assets\emoji-hd")
out.mkdir(parents=True, exist_ok=True)

# Manual short names from filename content (ASCII-safe)
ALIAS = {
    "cold emoji": "cold",
    "exploding face emoji": "exploding-face",
    "graduated man emoji": "graduated-man",
    "handshake emoji download iphone emojis": "handshake",
    "horse emoji free download ios emojis": "horse",
    "loudly crying emoji free download iphone emojis": "loud-cry",
    "octopus emoji free download ios emojis": "octopus",
    "party face emoji": "party-face",
    "people emoji unknown": "people",
    "star eyes emoji": "star-eyes",
    "virus emoji free download iphone emojis in png": "virus",
    "whale iphone emoji free download ios emojis": "whale",
    "alien emoji free download alien emoji in png": "alien",
    "robot emoji free download ios emojis": "robot",
}


def key(name: str) -> str:
    # strip non-ascii
    clean = re.sub(r"[^\x00-\x7F]+", " ", name)
    clean = re.sub(r"\.png$", "", clean, flags=re.I)
    clean = re.sub(r"[\[\]]", " ", clean)
    clean = re.sub(r"[^a-z0-9]+", " ", clean.lower()).strip()
    clean = re.sub(r"\s+", " ", clean)
    return clean


for p in sorted(src.iterdir()):
    if p.suffix.lower() != ".png":
        continue
    k = key(p.name)
    slug = ALIAS.get(k)
    if not slug:
        # fallback for emoji-prefixed names
        if "alien" in k:
            slug = "alien"
        elif "robot" in k:
            slug = "robot"
        else:
            slug = re.sub(r"\s+", "-", k)[:40] or "emoji"

    im = Image.open(p).convert("RGBA")
    # Keep original resolution for HD look (typically ~640)
    dest = out / f"{slug}.png"
    im.save(dest, optimize=True)
    print(f"{p.name.encode('ascii','replace').decode()} -> {dest.name} {im.size}")

print("done", out)
