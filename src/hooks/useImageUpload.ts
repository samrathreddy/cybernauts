import { useState, useCallback } from 'react';
import { uploadImage } from '../lib/imageUpload';
import { registrationConfig } from '../config/registration.config';

interface ImageUploadState {
  isUploading: boolean;
  uploadedImage: string | null;
  error: string | null;
}

const useImageUpload = () => {
  const [state, setState] = useState<ImageUploadState>({
    isUploading: false,
    uploadedImage: null,
    error: null,
  });

  const { maxSizeMB, acceptedFormats, uploadEndpoint } = registrationConfig.imageUploadConfig;

  const resetUpload = useCallback(() => {
    setState({
      isUploading: false,
      uploadedImage: null,
      error: null,
    });
  }, []);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!registrationConfig.imageUploadEnabled) {
      setState({
        isUploading: false,
        uploadedImage: null,
        error: 'Image upload is disabled.',
      });
      return;
    }

    setState(prev => ({ ...prev, isUploading: true, error: null }));

    try {
      const result = await uploadImage(
        file,
        maxSizeMB,
        acceptedFormats,
        uploadEndpoint
      );

      if (result.success && result.url) {
        setState({
          isUploading: false,
          uploadedImage: result.url,
          error: null,
        });
      } else {
        setState({
          isUploading: false,
          uploadedImage: null,
          error: result.error || 'Failed to upload image.',
        });
      }
    } catch (error) {
      setState({
        isUploading: false,
        uploadedImage: null,
        error: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    }
  }, [maxSizeMB, acceptedFormats, uploadEndpoint]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  }, [handleImageUpload]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return {
    ...state,
    handleFileChange,
    handleDrop,
    handleDragOver,
    resetUpload,
  };
};

export default useImageUpload; 