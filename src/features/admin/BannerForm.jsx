import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import CloudinaryUpload from "../../components/CloudinaryUpload";

const BannerForm = ({ banner, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    active: false
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title || "",
        subtitle: banner.subtitle || "",
        imageUrl: banner.imageUrl || "",
        active: banner.active || false
      });
    }
  }, [banner]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Please enter a banner title");
      return;
    }
    
    if (!formData.imageUrl) {
      toast.error("Please upload an image");
      return;
    }
    
    if (uploading) {
      toast.error("Please wait for the image to finish uploading");
      return;
    }
    
    onSave(formData);
  };

  return (
    <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">{banner ? "Edit Banner" : "Add New Banner"}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Banner title"
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Subtitle</span>
            </label>
            <input
              type="text"
              name="subtitle"
              placeholder="Banner subtitle"
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={formData.subtitle}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Image</span>
            </label>
            <CloudinaryUpload
              onUploadSuccess={handleImageUpload}
              onUploading={setUploading}
              previewUrl={formData.imageUrl}
            />
            <input
              type="hidden"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-medium">Active</span>
              <input
                type="checkbox"
                name="active"
                className="checkbox checkbox-primary"
                checked={formData.active}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={uploading}
          >
            {uploading ? "Uploading..." : (banner ? "Update Banner" : "Add Banner")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BannerForm;