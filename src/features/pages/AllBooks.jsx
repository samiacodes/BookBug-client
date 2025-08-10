// src/pages/AllBooks.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../shared/Spinner";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [viewType, setViewType] = useState("card");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); 

      try {
        let url =
          "https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books";
        if (showAvailable) {
          url += "?available=true";
        }

        const res = await axios.get(url);
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchBooks();
  }, [showAvailable]);

  return (
    <div className="my-6">
      <section className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setShowAvailable(!showAvailable)}
          >
            {showAvailable ? "Show All Books" : "Show Available Books"}
          </button>

          <select
            className="border px-3 py-2 rounded"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center py-10">
            <Spinner/>
          </div>
        ) : (
          <>
            {viewType === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.map((book) => (
                  <div
                    key={book._id}
                    className="max-w-full border rounded p-4 shadow bg-white"
                  >
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <h2 className="text-xl font-bold">{book.name}</h2>
                    <p className="text-sm text-gray-700">
                      Author: {book.author}
                    </p>
                    <p className="text-sm text-gray-700">
                      Category: {book.category}
                    </p>
                    <p className="text-sm text-gray-700">
                      Quantity: {book.quantity ?? 0}
                    </p>
                    <Link to={`/update-book/${book._id}`}>
                      <button className="btn btn-outline btn-sm mt-2 w-full">
                        Update
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <table className="max-w-full table-auto border mt-4">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2">Name</th>
                    <th className="p-2">Author</th>
                    <th className="p-2">Category</th>
                    <th className="p-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id} className="border-b">
                      <td className="p-2">{book.name}</td>
                      <td className="p-2">{book.author}</td>
                      <td className="p-2">{book.category}</td>
                      <td className="p-2">{book.quantity ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default AllBooks;
