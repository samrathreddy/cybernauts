import os
from PIL import Image
import glob

def get_file_size_mb(file_path):
    """Return the file size in megabytes"""
    return os.path.getsize(file_path) / (1024 * 1024)

def compress_images(images_folder, size_ratio=0.9, quality=95):
    """
    Resizes all images in the specified folder and its subdirectories to 90% of their original dimensions.
    
    Args:
        images_folder: Path to the folder containing images
        size_ratio: The ratio to resize images (0.9 = 90% of original size)
        quality: Quality setting for compression (1-100)
    """
    # Get all image files in the folder and its subdirectories
    image_files = []
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp',
                        '.JPG', '.JPEG', '.PNG', '.GIF', '.BMP', '.TIFF', '.WEBP')
    
    # Walk through all directories and subdirectories
    for root, dirs, files in os.walk(images_folder):
        for file in files:
            if file.lower().endswith(image_extensions):
                image_files.append(os.path.join(root, file))
    
    if not image_files:
        print(f"No image files found in {images_folder}")
        return
    
    print(f"Found {len(image_files)} image files to resize")
    
    # Process each image
    total_original_size = 0
    total_compressed_size = 0
    successful_compressions = 0
    
    for i, img_path in enumerate(image_files, 1):
        try:
            original_size = get_file_size_mb(img_path)
            total_original_size += original_size
            
            print(f"[{i}/{len(image_files)}] Processing: {img_path} (Size: {original_size:.2f} MB)")
            
            # Open the image
            img = Image.open(img_path)
            
            # Get original dimensions and format
            width, height = img.size
            img_format = img.format
            
            # Calculate new dimensions (90% of original)
            new_width = int(width * size_ratio)
            new_height = int(height * size_ratio)
            
            # Skip resizing if image is already very small (e.g., less than 200px)
            if width <= 200 or height <= 200:
                print(f"Skipping resize for small image: {img_path} ({width}x{height})")
            else:
                # Resize the image using high-quality resampling
                img = img.resize((new_width, new_height), Image.LANCZOS)
                print(f"Resized from {width}x{height} to {new_width}x{new_height}")
            
            # Save the image with high quality settings
            if img_format == 'PNG':
                # For PNG, we use optimize and high quality
                img.save(img_path, format=img_format, optimize=True)
            elif img_format in ('JPEG', 'JPG'):
                # For JPEG, we use high quality setting
                img.save(img_path, format=img_format, quality=quality, optimize=True)
            elif img_format == 'WEBP':
                # For WebP, we use high quality
                img.save(img_path, format=img_format, quality=quality)
            else:
                # For other formats, try to save with default settings
                img.save(img_path, format=img_format)
            
            compressed_size = get_file_size_mb(img_path)
            total_compressed_size += compressed_size
            successful_compressions += 1
            
            size_reduction = ((original_size - compressed_size) / original_size) * 100 if original_size > 0 else 0
            print(f"✓ Processed: {img_path} - New size: {compressed_size:.2f} MB (Reduced by {size_reduction:.1f}%)")
            
        except Exception as e:
            print(f"✕ Error processing {img_path}: {e}")
    
    # Print summary
    if successful_compressions > 0:
        overall_reduction = ((total_original_size - total_compressed_size) / total_original_size) * 100 if total_original_size > 0 else 0
        print("\n=== Processing Summary ===")
        print(f"Successfully processed: {successful_compressions}/{len(image_files)} images")
        print(f"Total original size: {total_original_size:.2f} MB")
        print(f"Total new size: {total_compressed_size:.2f} MB")
        print(f"Overall size reduction: {overall_reduction:.1f}%")

if __name__ == "__main__":
    # Path to the images folder (adjust if needed)
    images_folder = "public/images/events"
    
    # Ensure the folder exists
    if not os.path.exists(images_folder):
        print(f"Error: Images folder '{images_folder}' not found!")
    else:
        # Process all images in the folder and its subdirectories
        compress_images(images_folder, size_ratio=0.9, quality=95)
        print("\nImage processing completed!") 