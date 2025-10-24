import PropTypes from "prop-types";
import { HiUser, HiCalendar, HiStar } from "react-icons/hi";
import { motion } from "framer-motion";

const ReviewCard = ({ review, onEdit, onDelete, currentUserEmail }) => {
  const { _id, title, content, author, rating, category, createdAt } = review;

  const isAuthor = currentUserEmail === author.email;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-300 rounded-xl"
    >
      <div className="card-body p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-base-content mb-2">
              {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-base-content/60">
              <span className={`badge badge-sm ${
                category === "Blog" ? "badge-primary" : "badge-accent"
              }`}>
                {category}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? "text-accent" : "text-base-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-base-content/80 leading-relaxed line-clamp-3">
          {content}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between pt-4 border-t border-base-300">
          <div className="flex items-center gap-3">
            {author.photoURL ? (
              <img
                src={author.photoURL}
                alt={author.name}
                className="w-10 h-10 rounded-full border-2 border-primary/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <HiUser className="w-5 h-5 text-primary" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-base-content">
                {author.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-base-content/60">
                <HiCalendar className="w-3 h-3" />
                <span>{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Only show for author */}
          {isAuthor && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit?.(review)}
                className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(_id)}
                className="btn btn-sm btn-ghost text-primary opacity-70 hover:bg-primary/10"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photoURL: PropTypes.string,
    }).isRequired,
    rating: PropTypes.number,
    category: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  currentUserEmail: PropTypes.string,
};

export default ReviewCard;
