import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import Button from "./Button";
import Icon from "./Icon";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import { toast } from "react-toastify";
import Title from "./Title";

const ReviewList = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "https://b11a11-server-side2-mdp-arvezsarkar.vercel.app";

  // Fetch reviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle review submission
  const handleSubmit = async (reviewData) => {
    try {
      if (editingReview) {
        // Update existing review
        await axios.put(`${API_URL}/reviews/${editingReview._id}`, {
          ...reviewData,
          userEmail: user?.email,
        });
        toast.success("Review updated successfully!");
      } else {
        // Create new review
        await axios.post(`${API_URL}/reviews`, reviewData);
        toast.success("Review created successfully!");
      }
      
      setShowForm(false);
      setEditingReview(null);
      fetchReviews();
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  // Handle review deletion
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/reviews/${reviewId}`, {
        data: { userEmail: user?.email },
      });
      toast.success("Review deleted successfully!");
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error(err.response?.data?.message || "Failed to delete review");
    }
  };

  // Handle edit
  const handleEdit = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Title text="Community Reviews & Blogs" level={2} />
          <p className="text-base-content/60 mt-2">
            {user
              ? "Share your thoughts with the community"
              : "Sign in to share your thoughts"}
          </p>
        </div>
        
        {user && !showForm && (
          <Button
            variant="primary"
            onClick={() => {
              setShowForm(true);
              setEditingReview(null);
            }}
          >
            <Icon name="plus" className="inline-block w-5 h-5 mr-2" />
            Write Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showForm && user && (
        <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300">
          <h3 className="text-xl font-bold mb-4 text-base-content">
            {editingReview ? "Edit Review" : "Create New Review"}
          </h3>
          <ReviewForm
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingReview(null);
            }}
            initialData={editingReview}
            isEditing={!!editingReview}
          />
        </div>
      )}

      {/* Reviews Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="loading loading-spinner loading-lg text-primary"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-base-content/60">
            No reviews yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              currentUserEmail={user?.email}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;