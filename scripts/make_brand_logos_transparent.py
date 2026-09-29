from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / "apps" / "storefront" / "static" / "assets" / "brands"
jobs = {
    "fk-irons.png": ("fk-irons-transparent.png", "dark"),
    "dynamic.webp": ("dynamic-transparent.png", "light"),
    "kwadron.png": ("kwadron-transparent.png", "light"),
    "cheyenne.png": ("cheyenne-transparent.png", "light"),
}

for source_name, (output_name, background) in jobs.items():
    source = Image.open(root / source_name).convert("RGBA")
    pixels = source.load()
    for y in range(source.height):
        for x in range(source.width):
            red, green, blue, _ = pixels[x, y]
            luminance = round(red * .2126 + green * .7152 + blue * .0722)
            alpha = luminance if background == "dark" else 255 - luminance
            alpha = 0 if alpha < 18 else min(255, round(alpha * 1.22))
            pixels[x, y] = (255, 255, 255, alpha)
    bounds = source.getbbox()
    if bounds:
        source = source.crop(bounds)
    source.thumbnail((1000, 320), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (source.width + 24, source.height + 24))
    canvas.alpha_composite(source, (12, 12))
    canvas.save(root / output_name, optimize=True)

color_jobs = {
    "bishop-source.png": ("bishop-transparent.png", "light"),
    "critical-source.jpg": ("critical-transparent.png", "dark"),
}
for source_name, (output_name, background) in color_jobs.items():
    source = Image.open(root / source_name).convert("RGBA")
    pixels = source.load()
    for y in range(source.height):
        for x in range(source.width):
            red, green, blue, _ = pixels[x, y]
            luminance = round(red * .2126 + green * .7152 + blue * .0722)
            alpha = luminance if background == "dark" else 255 - luminance
            alpha = 0 if alpha < 20 else min(255, round(alpha * 1.2))
            if background == "light" and max(red, green, blue) - min(red, green, blue) < 30 and luminance < 150:
                red = green = blue = 245
            pixels[x, y] = (red, green, blue, alpha)
    bounds = source.getbbox()
    if bounds:
        source = source.crop(bounds)
    source.thumbnail((900, 260), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (source.width + 24, source.height + 24))
    canvas.alpha_composite(source, (12, 12))
    canvas.save(root / output_name, optimize=True)

intenze = Image.open(root / "intenze-source.png").convert("RGBA")
bounds = intenze.getbbox()
if bounds:
    intenze = intenze.crop(bounds)
intenze.save(root / "intenze-transparent.png", optimize=True)
