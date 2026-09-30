"""Recreate the local 1200x630 social card with Python and Pillow."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
image = Image.new("RGB", (1200, 630), "#080b10")
draw = ImageDraw.Draw(image)
fonts = Path("C:/Windows/Fonts")


def font(size, bold=False, mono=False):
    candidates = [fonts / ("consola.ttf" if mono else "segoeuib.ttf" if bold else "segoeui.ttf")]
    candidates += [Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default(size=size)


for x in range(100, 1200, 100):
    draw.line([(x, 0), (x, 630)], fill="#19232e")
for y in range(105, 630, 105):
    draw.line([(0, y), (1200, y)], fill="#19232e")
draw.rounded_rectangle((44, 44, 1156, 586), radius=24, fill="#080b10", outline="#27313b")
draw.ellipse((77, 90, 87, 100), fill="#82f5bb")
draw.text((100, 82), "SOFTWARE ENGINEER", font=font(18, mono=True), fill="#82f5bb")
draw.text((78, 167), "Ravi Kumar", font=font(87, bold=True), fill="#eaf1f7")
name_width = draw.textlength("Ravi Kumar", font=font(87, bold=True))
draw.text((78 + name_width, 167), ".", font=font(87, bold=True), fill="#82f5bb")
draw.text((82, 300), "Java & Spring Boot. Built for scale.", font=font(29), fill="#b0becb")
draw.text((82, 432), "Distributed systems · Real-time applications · AI / RAG", font=font(18), fill="#b0becb")
draw.line([(82, 490), (1118, 490)], fill="#27313b")
draw.text((82, 523), "RECALL / BIDLY / SHOPMESH", font=font(17, mono=True), fill="#b0becb")
points = [(945, 180), (850, 270), (970, 375), (1095, 260)]
draw.line(points + [points[0]], fill="#426a5c", width=2)
draw.line([points[1], points[3]], fill="#426a5c", width=2)
draw.line([points[0], points[2]], fill="#426a5c", width=2)
for x, y in points:
    draw.ellipse((x - 17, y - 17, x + 17, y + 17), fill="#10261d", outline="#82f5bb", width=2)
    draw.ellipse((x - 5, y - 5, x + 5, y + 5), fill="#82f5bb")
image.save(ROOT / "public/social-preview.png", optimize=True)
print("Created public/social-preview.png (1200 x 630)")
