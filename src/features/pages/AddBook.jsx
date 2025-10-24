import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import bookAnimation from "../../assets/lotties/addBook.json";
import Title from "../../components/Title";
import Button from "../../components/Button";

const AddBook = () => {
  const [book, setBook] = useState({
    image: "",
    name: "",
    quantity: 1,
    author: "",
    category: "",
    description: "",
    rating: 1,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBook((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books",
        book
      );
      toast.success("Book added successfully!");
      navigate("/all-books");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book.");
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
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Image URL</span>
            </label>
            <input
              type="text"
              name="image"
              required
              value={book.image}
              onChange={handleChange}
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Book Title</span>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Quantity</span>
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
              required
              value={book.category}
              onChange={handleChange}
              className="select select-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            >
              <option value="">Select a category</option>
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Dystopian">Dystopian</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Short Description</span>
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

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
            >
              Add Book
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
