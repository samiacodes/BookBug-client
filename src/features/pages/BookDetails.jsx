import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BorrowModal from "../../components/BorrowModal";
import BookReviews from "../../components/BookReviews";
import Title from "../../components/Title";
import Spinner from "../shared/Spinner";
import Button from "../../components/Button";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com'}/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error("Failed to load book:", err));
  }, [id]);

  if (!book) {
    return <Spinner/>;
  }

  // Add null/undefined checks for all book properties
  const title = book?.title || book?.name || "Untitled Book";
  const author = book?.author || "Unknown Author";
  const category = book?.category || "Uncategorized";
  const image = book?.image ? book.updatedAt ? `${book.image}${book.image.includes('?') ? '&' : '?'}t=${new Date(book.updatedAt).getTime()}` : book.image : "/placeholder.jpg";
  const quantity = book?.quantity !== undefined ? book.quantity : 0;
  const rating = book?.rating !== undefined ? book.rating : 0;
  const description = book?.description || "No description available.";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Left: Book Image */}
          <div className="flex items-center justify-center bg-base-200 rounded-xl p-6">
            <div className="w-full max-w-md">
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-contain rounded-lg shadow-lg max-h-[500px]"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-base-content mb-2">{title}</h1>
              <div className="h-1 w-20 bg-primary rounded"></div>
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-base-content/70 min-w-[100px]">Author:</span>
                <span className="text-base-content text-lg">{author}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-base-content/70 min-w-[100px]">Category:</span>
                <span className="badge badge-primary badge-lg">{category}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-base-content/70 min-w-[100px]">Rating:</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < (book?.averageRating || 0) ? 'text-accent' : 'text-base-300'}`}>
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-base-content/70">
                    ({book?.averageRating !== undefined ? book.averageRating.toFixed(1) : '0.0'}/5) from {book?.reviewCount || 0} reviews
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-base-content/70 min-w-[100px]">Available:</span>
                <span className={`badge badge-lg ${
                  quantity > 0 ? 'badge-accent' : 'badge-primary opacity-50'
                }`}>
                  {quantity > 0 ? `${quantity} in stock` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-base-300">
              <h3 className="text-xl font-semibold text-base-content mb-3">Description</h3>
              <p className="text-base-content/80 leading-relaxed">{description}</p>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Button
                variant="primary"
                disabled={quantity === 0}
                onClick={() => setShowModal(true)}
                className="w-full lg:w-auto px-8"
              >
                {quantity === 0 ? "Out of Stock" : "Borrow This Book"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="pt-8 border-t border-base-300 mt-8">
        <BookReviews bookId={id} />
      </div>

      {/* Modal */}
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