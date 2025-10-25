import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import bookAnimation from "../../assets/lotties/addBook.json";
import Title from "../../components/Title";
import Button from "../../components/Button";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import useApi from "../../hooks/useApi";

const AddBook = () => {
  const { post } = useApi();
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: "",
    quantity: 1,
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageOption, setImageOption] = useState("url"); // 'url' or 'upload'
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, [baseURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setBook((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
    
    // Handle image URL preview
    if (name === "image" && imageOption === "url") {
      setImagePreview(value);
    }
  };

  const handleImageOptionChange = (option) => {
    setImageOption(option);
    // Clear image field when switching options
    setBook(prev => ({ ...prev, image: "" }));
    setImagePreview("");
  };

  const handleUploadSuccess = (url) => {
    setBook(prev => ({ ...prev, image: url }));
    setUploading(false);
  };

  const handleUploadError = (error) => {
    console.error("Upload error:", error);
    setUploading(false);
  };

  const handleUploading = (isUploading) => {
    setUploading(isUploading);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!book.title || !book.author || !book.category || !book.description || !book.image) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (book.quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    setLoading(true);
    
    try {
      // If we're uploading a file, make sure it's done
      if (imageOption === "upload" && uploading) {
        toast.error("Please wait for image upload to complete");
        return;
      }
      
      await post(`/books`, {
        ...book,
        available: book.quantity > 0
      });
      
      toast.success("Book added successfully!");
      navigate("/all-books");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-2xl border border-base-300 grid md:grid-cols-2 gap-8">
      {/* Lottie Section */}
      <div className="flex items-center justify-center bg-base-200 rounded-xl p-6">
        <div className="text-center">
          <Lottie animationData={bookAnimation} loop={true} />
        </div>
      </div>

      {/* Form Section */}
      <div>
        <div className="mb-6">
          <Title text="Add a New Book" level={2} />
          <p className="text-base-content/60 mt-2">Fill in the details to add a new book to the collection</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */ }
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Book Title *</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={book.title}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="Enter book title"
            />
          </div>

          {/* Author */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Author Name *</span>
            </label>
            <input
              type="text"
              name="author"
              required
              value={book.author}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="Enter author name"
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category *</span>
            </label>
            <select
              name="category"
              required
              value={book.category}
              onChange={handleChange}
              className="select select-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Description *</span>
            </label>
            <textarea
              name="description"
              required
              value={book.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 h-24"
              placeholder="Brief description of the book"
            ></textarea>
          </div>

          {/* Quantity */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Quantity *</span>
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              required
              value={book.quantity}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>

          {/* Image Option Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Image *</span>
            </label>
            
            <div className="flex gap-4 mb-3">
              <button
                type="button"
                className={`btn ${imageOption === 'url' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleImageOptionChange('url')}
              >
                Image URL
              </button>
              <button
                type="button"
                className={`btn ${imageOption === 'upload' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => handleImageOptionChange('upload')}
              >
                Upload Image
              </button>
            </div>

            {/* Image URL Input */}
            {imageOption === "url" && (
              <input
                type="url"
                name="image"
                required
                value={book.image}
                onChange={handleChange}
                className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                placeholder="https://example.com/cover.jpg"
              />
            )}

            {/* Image Upload */}
            {imageOption === "upload" && (
              <CloudinaryUpload
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                onUploading={handleUploading}
                className="w-full"
              />
            )}

            {/* Image Preview */}
            {(imagePreview || (imageOption === "upload" && book.image)) && (
              <div className="mt-3">
                <p className="text-sm text-base-content/70 mb-2">Image Preview:</p>
                <img 
                  src={imagePreview || book.image} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border border-base-300"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading || uploading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Adding Book...
                </>
              ) : (
                "Add Book"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-base-200 rounded-lg border-l-4 border-accent">
          <p className="text-sm text-base-content/70">
            <strong className="text-base-content">Note:</strong> Please ensure all data is valid. The book will
            appear in the All Books page after saving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddBook;