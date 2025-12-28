import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../../components/Icon";
import Button from "../../components/Button";
import BookForm from "./BookForm";
import useApi from "../../hooks/useApi";

const BooksManagement = () => {
  const { delete: del } = useApi();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com'}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await del(`/books/${id}`);
        fetchBooks(); // Refresh the list
      } catch (error) {
        console.error("Error deleting book:", error);
        // Show error message to user
        alert("Failed to delete book: " + (error.response?.data?.error || error.message));
      }
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingBook(null);
    fetchBooks(); // Refresh the list
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Manage Books</h1>
          <p className="text-base-content/70">Add, edit, or remove books from the library</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(true)}>
          <Icon name="plus" className="mr-2" />
          Add Book
        </Button>
      </div>

      {showForm && (
        <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
          <BookForm book={editingBook} onClose={handleFormClose} />
        </div>
      )}

      <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-base-200">
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={book.image || "/placeholder.jpg"} alt={book.title} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-medium">{book.title}</div>
                    </td>
                    <td>{book.author || "N/A"}</td>
                    <td>
                      <span className="badge badge-primary badge-sm">{book.category}</span>
                    </td>
                    <td>{book.quantity}</td>
                    <td>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                          <Icon name="edit" size="sm" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(book._id)}>
                          <Icon name="trash" size="sm" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksManagement;