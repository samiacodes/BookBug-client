import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth"; 
import Title from "../../components/Title";

const BorrowedBooks = () => {
  const { user } = useAuth(); 
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/borrowed?email=${user.email}`
      )
      .then((res) => {
        setBorrowedBooks(res.data);
      });
  }, [user]);

  const handleReturn = async (id) => {
    await axios.delete(
      `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/borrowed/${id}`
    );
    setBorrowedBooks((prev) => prev.filter((book) => book._id !== id));
  };

  return (
    <div className="">
      <div className="min-w-7xl">
        <Title text="My Borrowed Books" level={2} />
        <div className="flex flex-wrap text-center gap-6">
          {borrowedBooks.map((entry) => (
            <div key={entry._id} className="bg-white p-4 flex-1 shadow-2xl rounded">
              <div className="">
              </div>
              <div className="">
                <Title text={entry.bookId.name} level={2} />
                <p>Category: {entry.bookId.category}</p>
                <p>Category: {entry.bookId.des}</p>
                <p>
                  Borrowed Date:{" "}
                  {new Date(entry.borrowedDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleReturn(entry._id)}
                  className="btn btn-sm bg-green-500 text-white mt-2"
                >
                  Return
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooks;
