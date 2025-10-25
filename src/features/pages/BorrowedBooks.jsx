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

  useEffect(() => {
    get(`/borrowed?email=${user.email}`)
      .then((res) => {
        setBorrowedBooks(res);
      });
  }, [user, get]);

  const handleReturn = async (id) => {
    await del(`/borrowed/${id}`);
    setBorrowedBooks((prev) => prev.filter((book) => book._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Title text="My Borrowed Books" level={2} />
        <p className="text-base-content/60 mt-2">Manage your borrowed books collection</p>
      </div>
      
      {borrowedBooks.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-base-100 rounded-xl p-12 shadow-sm border border-base-300">
            <p className="text-base-content/60 text-lg">You haven't borrowed any books yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks.map((entry) => (
            <div key={entry._id} className="card-modern overflow-hidden">
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-base-content mb-2">{entry.bookId.name}</h3>
                  <div className="h-1 w-16 bg-primary rounded"></div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-base-content/70">Category:</span>
                    <span className="badge badge-primary">{entry.bookId.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-base-content/70">Borrowed:</span>
                    <span className="text-base-content">
                      {new Date(entry.borrowedDate).toLocaleDateString()}
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