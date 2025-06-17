import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BorrowModal from "../../components/BorrowModal";
const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    axios
      .get(`https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Failed to load book:", err));
  }, [id]);

  if (!book) {
    return <p className="text-center mt-10 text-lg">Loading book details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-80 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{book.name}</h2>
      <p className="text-gray-600 mt-1">Author: {book.author}</p>
      <p className="mt-1">Category: {book.category}</p>
      <p className="mt-1">Rating: ⭐ {book.rating}</p>
      <p className="my-4 text-justify">{book.description}</p>
      <p className="mb-4">
        Available Quantity: <strong>{book.quantity}</strong>
      </p>

      <button
        disabled={book.quantity === 0}
        onClick={() => setShowModal(true)}
        className={`btn ${
          book.quantity === 0 ? "btn-disabled bg-gray-400" : "btn-primary"
        }`}
      >
        {book.quantity === 0 ? "Out of Stock" : "Borrow"}
      </button>

      {showModal && (
        <BorrowModal
          book={book}
          onClose={() => setShowModal(false)}
          onBorrowSuccess={() => {
            setBook((prev) => ({
              ...prev,
              quantity: prev.quantity - 1,
            }));
          }}
        />
      )}
    </div>
  );
};

export default BookDetails;
