import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books/${id}`)
      .then((res) => {
        setBook(res.data);
        console.log("Loaded book:", res.data); // Log the loaded book data
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book || !book.name || !book.author || !book.category) {
      toast.error("Please fill in all required fields.");
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

  if (!book) return <p className="text-center py-10">Loading book data...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            required
            value={book.image}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Book Name</label>
          <input
            type="text"
            name="name"
            required
            value={book.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Author Name</label>
          <input
            type="text"
            name="author"
            required
            value={book.author}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={book.category}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select category</option>
            <option value="Novel">Novel</option>
            <option value="Thriller">Thriller</option>
            <option value="History">History</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>

        <div>
          <label>Rating (1–5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            required
            value={book.rating}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-success w-full">
          Submit Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
