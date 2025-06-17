import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={book.image}
              alt={book.name}
              className="h-60 w-full object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{book.name}</h3>
              <p className="text-sm text-gray-700">Author: {book.author}</p>
              <p className="text-sm text-gray-600">Category: {book.category}</p>
              <p className="text-sm">Rating: ⭐ {book.rating}/5</p>

              <Link to={`/update-book/${book._id}`}>
                <button className="btn btn-outline btn-sm mt-2 w-full">
                  Update
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
