import React, { useState } from "react";
import { toast } from "react-toastify";

const CloudinaryUpload = ({ 
  onUploadSuccess, 
  onUploadError, 
  onUploading,
  previewUrl,
  className = "",
  accept = "image/*"
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(previewUrl || "");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      if (onUploadError) onUploadError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      if (onUploadError) onUploadError("File size exceeds 5MB limit");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    setUploading(true);
    if (onUploading) onUploading(true);

    try {
      // Check if environment variables are set
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      
      if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing. Please check your environment variables.");
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', 'bookbug'); 

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      
      if (onUploadSuccess) onUploadSuccess(data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage = error.message || "Failed to upload image";
      toast.error(errorMessage);
      if (onUploadError) onUploadError(errorMessage);
    } finally {
      setUploading(false);
      if (onUploading) onUploading(false);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      
      {uploading && (
        <div className="flex items-center gap-2">
          <span className="loading loading-spinner loading-sm"></span>
          <span>Uploading...</span>
        </div>
      )}
      
      {preview && (
        <div className="mt-2">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border border-base-300"
          />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;