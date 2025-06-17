import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books?category=${categoryName}`
      )
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error loading books", err));
  }, [categoryName]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Books in category: {categoryName}
      </h2>

      {books.length === 0 ? (
        <p>No books found in this category.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md p-4 rounded hover:shadow-xl"
            >
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-52 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-3">{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Rating: ⭐ {book.rating}</p>
              <p>Quantity: {book.quantity}</p>
              <Link
                to={`/books/${book._id}`}
                className="btn btn-sm btn-primary mt-3"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBooks;
