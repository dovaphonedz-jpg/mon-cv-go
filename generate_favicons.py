import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

def create_favicon(size, output_path, format="PNG"):
    base = 1024
    img = Image.new("RGBA", (base, base), (0,0,0,0))
    
    shadow = Image.new("RGBA", (base, base), (0,0,0,0))
    shadow_draw = ImageDraw.Draw(shadow)
    
    box_img = Image.new("RGBA", (base, base), (0,0,0,0))
    box_draw = ImageDraw.Draw(box_img)
    
    box_size = int(base * 0.75)
    left = (base - box_size) // 2
    top = (base - box_size) // 2
    right = left + box_size
    bottom = top + box_size
    
    box_draw.rounded_rectangle([left, top, right, bottom], radius=base*0.1, fill="#facc15")
    
    # Try different fonts
    font = None
    fonts_to_try = ["arialbd.ttf", "segoeuib.ttf", "impact.ttf", "verdana.ttf", "trebucbd.ttf"]
    for f in fonts_to_try:
        try:
            font = ImageFont.truetype(f, int(base*0.45))
            break
        except:
            continue
            
    if font is None:
        font = ImageFont.load_default()
        
    text = "GO"
    bbox = box_draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    
    # Adjust y position depending on font metrics
    text_x = (base - text_w) // 2
    text_y = (base - text_h) // 2 - int(base*0.08)
    
    box_draw.text((text_x, text_y), text, font=font, fill="#0F172A")
    
    # Rotate
    rotated_box = box_img.rotate(5, resample=Image.BICUBIC, center=(base//2, base//2))
    
    # Brutalist Shadow (solid dark slate #0F172A)
    shadow_draw.rounded_rectangle([left, top, right, bottom], radius=base*0.1, fill="#0F172A")
    rotated_shadow = shadow.rotate(5, resample=Image.BICUBIC, center=(base//2, base//2))
    shadow_offset = Image.new("RGBA", (base, base), (0,0,0,0))
    
    # Offset the shadow by a small amount for the brutalist effect
    shadow_offset.paste(rotated_shadow, (int(base*0.06), int(base*0.06)))
    
    final = Image.alpha_composite(img, shadow_offset)
    final = Image.alpha_composite(final, rotated_box)
    
    final_resized = final.resize((size, size), Image.LANCZOS)
    if format == "ICO":
        # ICO needs to be saved slightly differently sometimes, but PIL handles it for single size
        final_resized.save(output_path, format="ICO", sizes=[(size, size)])
    else:
        final_resized.save(output_path, format=format)

create_favicon(180, "public/apple-touch-icon.png", "PNG")
create_favicon(48, "public/favicon.ico", "ICO")
create_favicon(32, "public/favicon-32x32.png", "PNG")
create_favicon(16, "public/favicon-16x16.png", "PNG")
print("Favicons generated successfully.")
