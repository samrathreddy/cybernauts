interface ImageUploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

interface ImageValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates an image file based on configuration
 * @param file The file to validate
 * @param maxSizeMB Maximum file size in MB
 * @param acceptedFormats Array of accepted MIME types
 * @returns Validation result object
 */
export const validateImage = (
  file: File,
  maxSizeMB: number,
  acceptedFormats: string[]
): ImageValidationResult => {
  // Check if the file is an image
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'The selected file is not an image.' };
  }

  // Check file format
  if (!acceptedFormats.includes(file.type)) {
    return { 
      valid: false, 
      error: `Invalid file format. Accepted formats: ${acceptedFormats.map(format => format.replace('image/', '')).join(', ')}` 
    };
  }

  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    return { 
      valid: false, 
      error: `File size exceeds the maximum allowed size (${maxSizeMB}MB).` 
    };
  }

  return { valid: true };
};

/**
 * Compresses an image file using the browser's Canvas API
 * @param file The image file to compress
 * @param maxSizeMB Maximum size in MB
 * @returns Promise resolving to a compressed Blob
 */
export const compressImage = async (
  file: File,
  maxSizeMB: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate the size ratio for resizing if needed
        const maxDimension = 1200; // Max width or height for large images
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get the target quality
        let quality = 0.9; // Start with 90% quality
        
        // Convert to blob and resolve
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

/**
 * Uploads an image file to the server or external service
 * @param file Image file to upload
 * @param endpoint API endpoint for uploading
 * @returns Promise resolving to upload response
 */
export const uploadImage = async (
  file: File,
  maxSizeMB: number,
  acceptedFormats: string[],
  endpoint?: string
): Promise<ImageUploadResponse> => {
  try {
    // Validate the image
    const validation = validateImage(file, maxSizeMB, acceptedFormats);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    
    // Compress the image
    const compressedBlob = await compressImage(file, maxSizeMB);
    
    // If no endpoint is provided, return a local object URL
    // This is useful for development/preview without a server
    if (!endpoint) {
      const localUrl = URL.createObjectURL(compressedBlob);
      return { success: true, url: localUrl };
    }
    
    // Create form data for upload
    const formData = new FormData();
    formData.append('image', compressedBlob, file.name);
    
    // Upload to server
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return { success: true, url: data.url };
  } catch (error) {
    console.error('Image upload error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred during image upload' 
    };
  }
};

/**
 * Creates a File object from a data URL
 * @param dataUrl The data URL (e.g., from canvas.toDataURL())
 * @param filename The desired filename
 * @param mimeType The MIME type of the file
 * @returns A File object
 */
export const dataUrlToFile = (
  dataUrl: string, 
  filename: string,
  mimeType: string = 'image/jpeg'
): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || mimeType;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
}; 