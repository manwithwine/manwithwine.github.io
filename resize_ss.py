from PIL import Image
import os
import sys
import glob


def resize_screenshot(input_path, output_path):
    try:
        if not os.path.exists(input_path):
            raise FileNotFoundError(f"File not found: {input_path}")

        if not input_path.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            raise ValueError("File must be an image (PNG/JPG/JPEG/WEBP)")

        try:
            img = Image.open(input_path)
        except Exception as e:
            raise ValueError(f"Failed to open image: {e}")

        # Mobile-first approach
        max_width_desktop = 800
        max_width_mobile = 400  # Smaller size for mobile
        quality = 75  # Slightly lower quality for smaller file size

        # Create multiple sizes for responsive images
        sizes = [
            (max_width_mobile, "mobile"),
            (max_width_desktop, "desktop")
        ]

        for size, suffix in sizes:
            width_percent = size / float(img.size[0])
            new_height = int(float(img.size[1]) * float(width_percent))

            resized_img = img.resize((size, new_height), Image.Resampling.LANCZOS)

            # Add suffix to output filename
            base, ext = os.path.splitext(output_path)
            sized_output = f"{base}_{suffix}{ext}"

            os.makedirs(os.path.dirname(sized_output), exist_ok=True)

            # Use WebP for better compression
            if ext.lower() in ('.jpg', '.jpeg', '.png'):
                sized_output = sized_output.rsplit('.', 1)[0] + '.webp'
                resized_img.save(sized_output, 'WEBP', quality=quality)
            else:
                resized_img.save(sized_output, quality=quality)

            print(f"✔ Success: {sized_output} ({size}x{new_height}px)")

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python resize_screenshot.py <input_file> <output_file>")
        print("Example: python resize_screenshot.py input.jpg output.jpg")
        sys.exit(1)

    resize_screenshot(sys.argv[1], sys.argv[2])

    # Process all images in the images directory
    for img_path in glob.glob("images/*.*"):
        if img_path.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            output_path = f"optimized/{os.path.basename(img_path)}"
            resize_screenshot(img_path, output_path)