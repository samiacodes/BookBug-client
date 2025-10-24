import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../shared/Spinner";
import Title from "../../components/Title";
import Button from "../../components/Button";
import CloudinaryUpload from "../../components/CloudinaryUpload";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books/${id}`)
      .then((res) => {
        setBook(res.data);
        console.log("Loaded book:", res.data); 
      })
      .catch((err) => {
        console.error("Failed to fetch book", err);
        toast.error("Failed to load book.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: name === "rating" ? parseInt(value) : value });
  };

  const handleImageUpload = (url) => {
    setBook(prev => ({
      ...prev,
      image: url
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book || !book.name || !book.author || !book.category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (uploading) {
      toast.error("Please wait for the image to finish uploading.");
      return;
    }

    try {
      await axios.put(
        `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books/${id}`,
        book
      );
      toast.success("Book updated successfully!");
      navigate("/all-books");
    } catch (error) {
      console.error("Axios error:", error.response || error);
      console.error("Error during book update:", error);
      toast.error("Failed to update book.");
    }
  };

  if (!book) return <Spinner/>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-base-100 p-8 shadow-xl rounded-2xl border border-base-300">
        <div className="mb-6">
          <Title text="Update Book" level={2} />
          <p className="text-base-content/60 mt-2">Edit book information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Image</span>
            </label>
            <CloudinaryUpload
              onUploadSuccess={handleImageUpload}
              onUploading={setUploading}
              previewUrl={book.image}
            />
            <input
              type="hidden"
              name="image"
              value={book.image}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Book Name</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={book.name}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="Enter book name"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Author Name</span>
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

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              name="category"
              value={book.category}
              onChange={handleChange}
              className="select select-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            >
              <option value="">Select category</option>
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Rating (1–5)</span>
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              required
              value={book.rating}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Update Book"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;