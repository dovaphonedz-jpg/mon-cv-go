import os
from PIL import Image

public_dir = "public"
png_files = [f for f in os.listdir(public_dir) if f.endswith(".png") and "favicon" not in f and "apple-touch" not in f]

total_before = 0
total_after = 0

for file in png_files:
    png_path = os.path.join(public_dir, file)
    webp_name = os.path.splitext(file)[0] + ".webp"
    webp_path = os.path.join(public_dir, webp_name)
    
    file_size_before = os.path.getsize(png_path)
    total_before += file_size_before
    
    with Image.open(png_path) as img:
        img.save(webp_path, "WEBP", quality=80, method=6)
        
    file_size_after = os.path.getsize(webp_path)
    total_after += file_size_after
    
    print(f"Converted {file}: {file_size_before // 1024} KB -> {file_size_after // 1024} KB ({100 - (file_size_after*100//file_size_before)}% reduction)")

print(f"\nTotal payload reduction: {total_before // 1024} KB -> {total_after // 1024} KB (Saved {(total_before - total_after) // 1024} KB)")
