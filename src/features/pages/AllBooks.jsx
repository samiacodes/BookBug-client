import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../shared/Spinner";
import BookCard from "../../components/BookCard";
import Button from "../../components/Button";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const [viewType, setViewType] = useState("card");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); 

      try {
        let url =
          "https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books";
        
        // Add search query if present
        if (searchQuery) {
          url += `?search=${encodeURIComponent(searchQuery)}`;
        } else if (showAvailable) {
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
  }, [showAvailable, searchQuery]);

  return (
    <div className="my-6 px-4">
      <section className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">All Books</h1>
          {searchQuery ? (
            <p className="text-base-content/60">Search results for: "{searchQuery}"</p>
          ) : (
            <p className="text-base-content/60">Browse our complete collection</p>
          )}
        </div>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-base-100 p-4 rounded-xl shadow-sm border border-base-300">
          <Button
            variant="primary"
            onClick={() => setShowAvailable(!showAvailable)}
          >
            {showAvailable ? "Show All Books" : "Show Available Books"}
          </Button>

          <select
            className="select select-bordered rounded-lg w-full sm:w-auto focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="text-center py-16">
            <Spinner/>
          </div>
        ) : (
          <>
            {viewType === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    actionButton={
                      <Link to={`/update-book/${book._id}`}>
                        <Button variant="outline" size="sm" fullWidth>
                          Update Book
                        </Button>
                      </Link>
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto bg-base-100 rounded-xl shadow-sm border border-base-300">
                <table className="table table-zebra">
                  <thead className="bg-base-200">
                    <tr>
                      <th className="text-base-content">Name</th>
                      <th className="text-base-content">Author</th>
                      <th className="text-base-content">Category</th>
                      <th className="text-base-content">Stock</th>
                      <th className="text-base-content">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book._id} className="hover">
                        <td className="font-medium">{book.name}</td>
                        <td>{book.author}</td>
                        <td>
                          <span className="badge badge-primary badge-sm">{book.category}</span>
                        </td>
                        <td>
                          <span className={`badge badge-sm ${
                            book.quantity > 0 ? 'badge-accent' : 'badge-primary opacity-50'
                          }`}>
                            {book.quantity > 0 ? `${book.quantity} available` : 'Out of stock'}
                          </span>
                        </td>
                        <td>
                          <Link to={`/update-book/${book._id}`}>
                            <Button variant="ghost" size="sm">
                              Update
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default AllBooks;