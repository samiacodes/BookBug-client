import { useState, useContext } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Icon from "./Icon";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";

const ReviewForm = ({ onSubmit, onCancel, initialData, isEditing }) => {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    rating: initialData?.rating || 5,
    category: initialData?.category || "Review",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate content length
    if (formData.content.trim().length < 10) {
      alert("Content must be at least 10 characters long");
      return;
    }
    
    const reviewData = {
      ...formData,
      author: {
        name: user?.displayName || "Anonymous",
        email: user?.email || "",
        photoURL: user?.photoURL || "",
      },
    };

    onSubmit(reviewData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Title</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter review title"
          className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Category</span>
        </label>
        <select
          name="category"
          className="select select-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Review">Review</option>
          <option value="Blog">Blog</option>
          <option value="Recommendation">Recommendation</option>
        </select>
      </div>

      {/* Rating */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Rating</span>
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingChange(star)}
              className="transition-transform hover:scale-110"
            >
              <Icon
                name="star"
                className={`w-8 h-8 ${
                  star <= formData.rating
                    ? "text-accent"
                    : "text-base-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-base-content/60">
            {formData.rating} / 5
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Content</span>
        </label>
        <textarea
          name="content"
          placeholder="Write your review or blog post here..."
          className="textarea textarea-bordered h-32 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          value={formData.content}
          onChange={handleChange}
          minLength={10}
          required
        />
        <label className="label">
          <span className="label-text-alt text-base-content/60">
            Minimum 10 characters
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {isEditing ? "Update Review" : "Submit Review"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    rating: PropTypes.number,
    category: PropTypes.string,
  }),
  isEditing: PropTypes.bool,
};

export default ReviewForm;