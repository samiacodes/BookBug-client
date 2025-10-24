import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard";

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://b11a11-server-side2-mdp-arvezsarkar.vercel.app/books?category=${categoryName}`
      )
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error loading books", err));
  }, [categoryName]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-base-content mb-2">
          {categoryName}
        </h2>
        <div className="h-1 w-20 bg-primary rounded"></div>
        <p className="text-base-content/60 mt-2">Browse books in this category</p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-base-100 rounded-xl p-12 shadow-sm border border-base-300">
            <p className="text-base-content/60 text-lg">No books found in this category.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryBooks;
