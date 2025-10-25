import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Reusable BookCard Component
 * Displays book information in a consistent, modern card layout
 * Used across All Books, Home, Category pages
 */
const BookCard = ({ book, actionButton }) => {
  // Add null/undefined checks for all book properties
  const title = book?.title || book?.name || "Untitled Book";
  const author = book?.author || "Unknown Author";
  const category = book?.category || "Uncategorized";
  const image = book?.image || "/placeholder.jpg";
  const quantity = book?.quantity !== undefined ? book.quantity : null;
  const rating = book?.rating !== undefined ? book.rating : null;

  return (
    <div className="card-modern overflow-hidden group hover:-translate-y-1 transition-all duration-300">
      {/* Book Image */}
      <figure className="overflow-hidden h-56 bg-base-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
        />
      </figure>

      {/* Card Content */}
      <div className="p-5 space-y-4">
        {/* Book Title */}
        <h3 className="text-xl font-bold text-base-content line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>

        {/* Book Metadata */}
        <div className="space-y-2 text-sm text-base-content/70">
          <div className="flex items-center gap-2">
            <span className="font-medium">Author:</span>
            <span className="truncate">{author}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Category:</span>
            <span className="badge badge-primary badge-sm">{category}</span>
          </div>

          {quantity !== null && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Stock:</span>
              <span className={`badge badge-sm ${
                quantity > 0 ? 'badge-accent' : 'badge-primary opacity-50'
              }`}>
                {quantity > 0 ? `${quantity} available` : 'Out of stock'}
              </span>
            </div>
          )}

          {rating !== null && (
            <div className="flex items-center gap-2">
              <span className="font-medium">Rating:</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < rating ? 'text-accent' : 'text-base-300'
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
    title: PropTypes.string,
    name: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number,
    rating: PropTypes.number,
  }).isRequired,
  actionButton: PropTypes.node,
};

export default BookCard;