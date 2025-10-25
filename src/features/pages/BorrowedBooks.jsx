import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import Title from "../../components/Title";
import Button from "../../components/Button";
import useApi from "../../hooks/useApi";

const BorrowedBooks = () => {
  const { user } = useAuth();
  const { get, delete: del } = useApi();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      if (!user?.email) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const res = await get(`/borrowed?email=${user.email}`);
        // Ensure we have an array, even if the response is null/undefined
        setBorrowedBooks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
        setError("Failed to load borrowed books");
        setBorrowedBooks([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, [user, get]);

  const handleReturn = async (id) => {
    try {
      await del(`/borrowed/${id}`);
      setBorrowedBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Error returning book:", err);
      // Optionally show an error message to the user
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="bg-base-100 rounded-xl p-12 shadow-sm border border-base-300">
            <p className="text-error mb-4">Error: {error}</p>
            <p className="text-base-content/60">Please try refreshing the page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Title text="My Borrowed Books" level={2} />
        <p className="text-base-content/60 mt-2">Manage your borrowed books collection</p>
      </div>
      
      {borrowedBooks && borrowedBooks.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-base-100 rounded-xl p-12 shadow-sm border border-base-300">
            <p className="text-base-content/60 text-lg">You haven't borrowed any books yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks && borrowedBooks.map((entry) => (
            <div key={entry._id} className="card-modern overflow-hidden">
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-base-content mb-2">
                    {entry.bookId?.name || entry.bookId?.title || "Unknown Book"}
                  </h3>
                  <div className="h-1 w-16 bg-primary rounded"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-base-content/70">Category:</span>
                    <span className="badge badge-primary">
                      {entry.bookId?.category || "Unknown"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-base-content/70">Borrowed:</span>
                    <span className="text-base-content">
                      {entry.borrowedDate ? new Date(entry.borrowedDate).toLocaleDateString() : "Unknown"}
                    </span>
                  </div>
                  
                  {entry.returnDate && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-base-content/70">Return by:</span>
                      <span className="text-accent font-semibold">
                        {new Date(entry.returnDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => handleReturn(entry._id)}
                >
                  Return Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;