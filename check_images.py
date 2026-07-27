import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

images = ['public/logo.png', 'public/logo-header.png', 'public/logo-premium.png', 'public/logo-brutal.png']
for img_path in images:
    if os.path.exists(img_path):
        try:
            with Image.open(img_path) as img:
                print(f'{img_path}: {img.format}, {img.size}, {img.mode}')
        except Exception as e:
            print(f'Error opening {img_path}: {e}')
    else:
        print(f'{img_path} not found.')
