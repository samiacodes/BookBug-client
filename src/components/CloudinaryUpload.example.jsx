import React, { useState } from 'react';
import CloudinaryUpload from './CloudinaryUpload';

// Example component showing how to use CloudinaryUpload
const CloudinaryUploadExample = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (url) => {
    setImageUrl(url);
    console.log('Upload successful:', url);
  };

  const handleUploadError = (error) => {
    console.error('Upload error:', error);
  };

  const handleUploading = (uploading) => {
    setIsUploading(uploading);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cloudinary Upload Example</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Upload Book Cover</h2>
        <CloudinaryUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          onUploading={handleUploading}
          className="mb-4"
        />
      </div>

      {isUploading && (
        <div className="alert alert-info mb-4">
          <span>Uploading image to Cloudinary...</span>
        </div>
      )}

      {imageUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Uploaded Image</h2>
          <div className="border rounded-lg p-4">
            <img 
              src={imageUrl} 
              alt="Uploaded preview" 
              className="max-w-full h-auto rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm text-gray-600 break-all">{imageUrl}</p>
          </div>
        </div>
      )}

      <div className="mt-8 prose">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`<CloudinaryUpload
  onUploadSuccess={(url) => console.log('Success:', url)}
  onUploadError={(error) => console.error('Error:', error)}
  onUploading={(uploading) => console.log('Uploading:', uploading)}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default CloudinaryUploadExample;