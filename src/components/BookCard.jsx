import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Reusable BookCard Component
 * Displays book information in a consistent, modern card layout
 * Used across All Books, Home, Category pages
 */
const BookCard = ({ book, actionButton }) => {
  return (
    <div className="card-modern overflow-hidden group hover:-translate-y-1 transition-all duration-300">
      {/* Book Image */}
      <figure className="overflow-hidden h-56 bg-base-200">
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </figure>

      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* Book Title */}
        <h3 className="text-xl font-bold text-base-content line-clamp-2 min-h-[3.5rem]">
          {book.name}
        </h3>

        {/* Book Metadata */}
        <div className="space-y-2 text-sm text-base-content/70">
          <div className="flex items-center gap-2">
            <span className="font-medium">Author:</span>
            <span className="truncate">{book.author}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Category:</span>
            <span className="badge badge-primary badge-sm">{book.category}</span>
          </div>

          {book.quantity !== undefined && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Stock:</span>
              <span className={`badge badge-sm ${
                book.quantity > 0 ? 'badge-accent' : 'badge-primary opacity-50'
              }`}>
                {book.quantity > 0 ? `${book.quantity} available` : 'Out of stock'}
              </span>
            </div>
          )}

          {book.rating !== undefined && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Rating:</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < book.rating ? 'text-accent' : 'text-base-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {actionButton || (
            <Link to={`/books/${book._id}`}>
              <button className="btn btn-primary btn-sm w-full rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                View Details
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number,
    rating: PropTypes.number,
  }).isRequired,
  actionButton: PropTypes.node,
};

export default BookCard;
