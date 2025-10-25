import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import useApi from "../hooks/useApi";

const BorrowModal = ({ book, onClose, onBorrowSuccess }) => {
  const { user } = useAuth();
  const { get, post } = useApi();
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
      const borrowedCheckRes = await get(`/borrowed?email=${user.email}`);

      const alreadyBorrowed = borrowedCheckRes.data.find(
        (borrowedBook) => borrowedBook.bookId._id === book._id
      );

      if (alreadyBorrowed) {
        setMessage("You have already borrowed this book!");
        setLoading(false);
        return;
      }

      // Step 2: Add to Borrowed list and decrease book quantity
      const res = await post(`/borrow`, {
        userName: user.displayName,
        userEmail: user.email,
        returnDate,
        bookId: book._id,
        bookName: book.name,
      });

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-base-100 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-base-300">
        <h2 className="text-2xl font-bold mb-4 text-base-content">{book.name}</h2>
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-medium text-base-content/70">Author:</span>
            <span className="text-base-content">{book.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-base-content/70">Category:</span>
            <span className="badge badge-primary">{book.category}</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Display user info */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Your Name</span>
            </label>
            <input
              type="text"
              value={user.displayName}
              disabled
              className="input input-bordered w-full bg-base-200 rounded-lg"
            />
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Your Email</span>
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="input input-bordered w-full bg-base-200 rounded-lg"
            />
          </div>

          {/* Return Date Picker */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Return Date</span>
            </label>
            <input
              type="date"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            variant="primary"
            fullWidth
            loading={loading}
            onClick={handleBorrow}
          >
            Confirm Borrow
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>

        {message && (
          <div className={`mt-4 alert rounded-lg shadow-sm border ${
            message.includes("success") 
              ? "bg-accent/10 border-accent text-accent-content" 
              : "bg-primary/10 border-primary text-primary-content"
          }`}>
            <span className="text-sm">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowModal;