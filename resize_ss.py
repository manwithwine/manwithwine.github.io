from PIL import Image
import os
import sys
import glob

def resize_screenshot(input_path, output_path):
    try:
        # Проверяем существование файла
        if not os.path.exists(input_path):
            raise FileNotFoundError(f"Файл не найден: {input_path}")

        # Проверяем, является ли файл изображением
        if not input_path.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            raise ValueError("Файл должен быть изображением (PNG/JPG/JPEG/WEBP)")

        # Открываем изображение с проверкой
        try:
            img = Image.open(input_path)
        except Exception as e:
            raise ValueError(f"Не удалось открыть изображение: {e}")

        # Оптимальные параметры
        max_width = 800
        quality = 80

        # Пропорциональное масштабирование
        width_percent = max_width / float(img.size[0])
        new_height = int(float(img.size[1]) * float(width_percent))

        # Изменяем размер с использованием LANCZOS (высококачественное масштабирование)
        resized_img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)

        # Создаём папку для результата, если её нет
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # Сохраняем в формате JPEG (можно изменить на WEBP)
        resized_img.save(output_path, 'JPEG', quality=quality, optimize=True)
        print(f"✔ Успешно: {output_path} ({max_width}x{new_height}px)")

    except Exception as e:
        print(f"❌ Ошибка: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Использование: python resize_screenshot.py <входной_файл> <выходной_файл>")
        print("Пример: python resize_screenshot.py input.jpg output.jpg")
        sys.exit(1)

    resize_screenshot(sys.argv[1], sys.argv[2])

    for img_path in glob.glob("images/*.jpg"):
        output_path = f"optimized/{os.path.basename(img_path)}"
        resize_screenshot(img_path, output_path)