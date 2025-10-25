import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import CloudinaryUpload from "../../components/CloudinaryUpload";

const BookForm = ({ book, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    quantity: 0,
    image: "",
    author: ""
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        description: book.description || "",
        category: book.category || "",
        quantity: book.quantity || 0,
        image: book.image || "",
        author: book.author || ""
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({
      ...prev,
      image: url
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (uploading) {
      toast.warn("Please wait for the image to finish uploading");
      return;
    }
    
    try {
      if (book) {
        // Update existing book
        await axios.put(`https://book-bug-server.onrender.com/books/${book._id}`, formData);
        toast.success("Book updated successfully!");
      } else {
        // Create new book
        await axios.post("https://book-bug-server.onrender.com/books", formData);
        toast.success("Book added successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{book ? "Edit Book" : "Add New Book"}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Book title"
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Author</span>
            </label>
            <input
              type="text"
              name="author"
              placeholder="Author name"
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <input
              type="text"
              name="category"
              placeholder="Book category"
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Quantity</span>
            </label>
            <input
              type="number"
              name="quantity"
              placeholder="Number of copies"
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
            />
          </div>
          
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Image</span>
            </label>
            <CloudinaryUpload
              onUploadSuccess={handleImageUpload}
              onUploading={setUploading}
              previewUrl={formData.image}
            />
            <input
              type="hidden"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Book description"
              className="textarea textarea-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : (book ? "Update Book" : "Add Book")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;