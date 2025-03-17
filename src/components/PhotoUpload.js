import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './PhotoUpload.css';

const PhotoUpload = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/heic'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or HEIC)');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onImageSelect(file);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/heic': ['.heic']
    },
    multiple: false
  });

  return (
    <div className="photo-upload-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${preview ? 'has-preview' : ''}`}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <div className="loading">Processing image...</div>
        ) : preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <button
              className="change-photo-btn"
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
                setError(null);
              }}
            >
              Change Photo
            </button>
          </div>
        ) : (
          <div className="upload-prompt">
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <>
                <p>Drag and drop a photo here, or click to select</p>
                <p className="sub-text">Supported formats: JPEG, PNG, HEIC</p>
              </>
            )}
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PhotoUpload;
