from PIL import Image
import glob
import os

def convert_images_to_bmp(input_folder, output_folder):
    image_files = glob.glob(os.path.join(input_folder, '*.*'))

    for image_file in image_files:
        image = Image.open(image_file)
        bmp_image = image.convert("RGB")
        file_name = os.path.splitext(os.path.basename(image_file))[0]
        output_path = os.path.join(output_folder, f"{file_name}.bmp")
        bmp_image.save(output_path, "BMP")
        print(f"Converted {image_file} to BMP format.")

convert_images_to_bmp("input", "output")
