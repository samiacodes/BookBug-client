import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BorrowModal from "../../components/BorrowModal";
import Title from "../../components/Title";
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
    <div className="hero">
      <div className="hero-content max-w-full flex-col lg:flex-row">
        <div className="mx-auto ">
          <img
            src={book.image}
            alt={book.name}
            className="max-w-sm rounded-lg shadow-2xl"
          />
        </div>
        <div>
          <Title text={book.name} level={2} />
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
              book.quantity === 0
                ? "btn-disabled bg-gray-400"
                : "btn-outline bg-green-500"
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
      </div>
    </div>
  );
};

export default BookDetails;
