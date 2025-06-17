import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import bookAnimation from "../../assets/lotties/addBook.json";

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
      await axios.post("http://localhost:3000/books", book);
      toast.success("Book added successfully!");
      navigate("/all-books");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book.");
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white shadow rounded-lg grid md:grid-cols-2 gap-8">
      {/* Lottie Section */}
      <div className="flex items-center justify-center">
        
        <div className="text-center">
          
        <Lottie animationData={bookAnimation} loop={true} />

        </div>
      </div>

      {/* Form Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              required
              value={book.image}
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div>
            <label className="font-semibold">Book Title</label>
            <input
              type="text"
              name="name"
              required
              value={book.title}
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="Book Name"
            />
          </div>

          <div>
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              required
              value={book.quantity}
              onChange={handleChange}
              className="w-full input input-bordered"
            />
          </div>

          <div>
            <label className="font-semibold">Author Name</label>
            <input
              type="text"
              name="author"
              required
              value={book.author}
              onChange={handleChange}
              className="w-full input input-bordered"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="font-semibold">Category</label>
            <select
              name="category"
              required
              value={book.category}
              onChange={handleChange}
              className="w-full select select-bordered"
            >
              <option value="">Select a category</option>
              <option value="Novel">Novel</option>
              <option value="Thriller">Thriller</option>
              <option value="History">History</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Short Description</label>
            <textarea
              name="description"
              required
              value={book.description}
              onChange={handleChange}
              className="w-full textarea textarea-bordered"
              placeholder="Brief description of the book"
            ></textarea>
          </div>

          <div>
            <label className="font-semibold">Rating (1–5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              required
              value={book.rating}
              onChange={handleChange}
              className="w-full input input-bordered"
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 text-white w-full"
            >
              Add Book
            </button>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-600 border-t pt-4">
          <strong>Note:</strong> Please ensure all data is valid. The book will
          appear in the All Books page after saving.
        </div>
      </div>
    </div>
  );
};

export default AddBook;
