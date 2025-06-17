import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const BorrowModal = ({ book, onClose, onBorrowSuccess }) => {
  const { user } = useAuth();
  const [returnDate, setReturnDate] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    if (!returnDate) {
      setMessage("Please select a return date");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Check if the user has already borrowed this book
      const idToken = await user.getIdToken();

      const borrowedCheckRes = await axios.get(
        `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/borrowed?email=${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const alreadyBorrowed = borrowedCheckRes.data.find(
        (borrowedBook) => borrowedBook.bookId._id === book._id
      );

      if (alreadyBorrowed) {
        setMessage("You have already borrowed this book!");
        setLoading(false);
        return;
      }

      // Step 2: Add to Borrowed list and decrease book quantity
      const res = await axios.post(
        `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/borrow`,
        {
          userName: user.displayName,
          userEmail: user.email,
          returnDate,
          bookId: book._id,
          bookName: book.name,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      setMessage(res.data.message || "Book borrowed successfully!");

      if (onBorrowSuccess) {
        onBorrowSuccess();
      }

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setMessage("Failed to borrow the book. Please try again.");
      console.error("Error while borrowing: ", err);
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

        {/* Display user info */}
        <input
          type="text"
          value={user.displayName}
          disabled
          className="input input-bordered w-full my-2"
        />
        <input
          type="email"
          value={user.email}
          disabled
          className="input input-bordered w-full mb-2"
        />

        {/* Return Date Picker */}
        <input
          type="date"
          required
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="input input-bordered w-full mb-2"
        />

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

        {message && <p className="mt-3 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default BorrowModal;
