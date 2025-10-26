import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Banner from "../shared/Banner";
import Title from "../../components/Title";
import BookCard from "../../components/BookCard";
import CategoryCard from "../../components/CategoryCard";
import SmartSearch from "../../components/SmartSearch";
import ReviewList from "../../components/ReviewList";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent books
        const booksRes = await axios.get(`${baseURL}/dashboard/recent-books?limit=8`);
        setBooks(booksRes.data);

        // Fetch categories
        const categoriesRes = await axios.get(`${baseURL}/categories`);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  return (
    <div className="space-y-16">
      {/* Smart Search Section */}
      <section className="max-w-4xl mx-auto items-center px-4 pb-16">
        <div className="text-center mb-8">
          <Title text="Find Your Next Read" level={2} />
          <p className="text-base-content/60 mt-2">
            Search through our vast collection of books
          </p>
        </div>
          <SmartSearch />

      </section>
      {/* Hero Banner */}
      <Banner />

      {/* Recent Books Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Title text="Recent Books" level={2} />
          <p className="text-base-content/60 mt-2">
            Discover our latest additions to the library
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/all-books" className="btn btn-primary rounded-full px-8">
            View All Books
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 bg-base-100 py-16 rounded-2xl">
        <div className="text-center mb-12">
          <Title text="Browse Categories" level={2} />
          <p className="text-base-content/60 mt-2">
            Explore books by your favorite genres
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/all-books" className="btn btn-primary rounded-full px-8">
            View All Categories
          </Link>
        </div>
      </section>

      <ReviewList />
    </div>
  );
};

export default Home;