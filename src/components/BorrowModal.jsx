import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const BorrowModal = ({ book, onClose, onBorrowSuccess }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/borrow", {
        userEmail: user.email,
        bookId: book._id,
      });

      setMessage(res.data.message || "Book borrowed!");

      
      if (onBorrowSuccess) {
        onBorrowSuccess();
      }

      
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setMessage("Failed to borrow book");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[320px]">
        <h2 className="text-xl font-bold mb-2">{book.name}</h2>
        <p>Author: {book.author}</p>
        <p>Category: {book.category}</p>

        <div className="mt-4 flex flex-col gap-2">
          <button
            className="btn bg-blue-600 text-white"
            onClick={handleBorrow}
            disabled={loading}
          >
            {loading ? "Borrowing..." : "Confirm Borrow"}
          </button>
          <button
            className="btn bg-gray-400 text-white"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>

        {message && (
          <p className="mt-3 text-center text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default BorrowModal;
