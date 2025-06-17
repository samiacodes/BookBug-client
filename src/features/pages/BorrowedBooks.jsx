import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth"; 

const BorrowedBooks = () => {
  const { user } = useAuth(); 
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/borrowed?email=${user.email}`
      )
      .then((res) => {
        setBorrowedBooks(res.data);
      });
  }, [user]);

  const handleReturn = async (id) => {
    await axios.delete(
      `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/borrowed/${id}`
    );
    setBorrowedBooks((prev) => prev.filter((book) => book._id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Borrowed Books</h1>
      {borrowedBooks.map((entry) => (
        <div key={entry._id} className="bg-white p-4 shadow rounded mb-4">
          <img
            src={entry.bookId.image}
            alt={entry.bookId.name}
            className="w-32 h-40 object-cover rounded"
          />
          <h2 className="text-xl font-bold">{entry.bookId.name}</h2>
          <p>Category: {entry.bookId.category}</p>
          <p>
            Borrowed Date: {new Date(entry.borrowedDate).toLocaleDateString()}
          </p>
          <button
            onClick={() => handleReturn(entry._id)}
            className="btn btn-sm bg-red-500 text-white mt-2"
          >
            Return
          </button>
        </div>
      ))}
    </div>
  );
};

export default BorrowedBooks;
