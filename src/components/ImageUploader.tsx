import React, { useRef } from 'react';
import { Button } from './ui/button';
import useImageUpload from '../hooks/useImageUpload';
import { registrationConfig } from '../config/registration.config';

interface ImageUploaderProps {
  onImageUploaded?: (imageUrl: string) => void;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUploaded,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isUploading,
    uploadedImage,
    error,
    handleFileChange,
    handleDrop,
    handleDragOver,
    resetUpload
  } = useImageUpload();

  const { maxSizeMB, acceptedFormats } = registrationConfig.imageUploadConfig;
  
  // Call the callback when an image is successfully uploaded
  React.useEffect(() => {
    if (uploadedImage && onImageUploaded) {
      onImageUploaded(uploadedImage);
    }
  }, [uploadedImage, onImageUploaded]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Create a readable format list for the UI
  const formatsList = acceptedFormats
    .map(format => format.replace('image/', '').toUpperCase())
    .join(', ');

  return (
    <div className={`w-full ${className}`}>
      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 
            ${error ? 'border-red-500 bg-red-50/10' : 'border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10'} 
            transition-colors duration-200 cursor-pointer text-center`}
          onClick={handleButtonClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={acceptedFormats.join(',')}
            onChange={handleFileChange}
          />
          
          {isUploading ? (
            <div className="py-4 flex flex-col items-center">
              <div className="w-10 h-10 border-t-2 border-amber-500 rounded-full animate-spin mb-3"></div>
              <p className="text-white/70">Uploading image...</p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-white font-medium mb-1">
                Drag & drop an image here or click to browse
              </p>
              <p className="text-white/60 text-sm">
                Supported formats: {formatsList}. Max size: {maxSizeMB}MB
              </p>
              
              {error && (
                <div className="mt-4 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-200 text-sm">
                  {error}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={uploadedImage} 
            alt="Uploaded image" 
            className="w-full h-auto rounded-lg" 
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Button 
              variant="destructive"
              onClick={resetUpload}
              className="bg-red-500 hover:bg-red-600"
            >
              Remove Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 