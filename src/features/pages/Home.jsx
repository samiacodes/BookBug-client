import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard";
import CategoryCard from "../../components/CategoryCard";
import ReviewList from "../../components/ReviewList";
import Banner from "../shared/Banner";
import { motion } from "framer-motion";
import Title from "../../components/Title";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    // Fetch books
    axios
      .get(`${baseURL}/books`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Book loading error:", err));
    
    // Fetch categories
    axios
      .get(`${baseURL}/categories`)
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Category loading error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <Banner />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <Title text="Book Categories" level={2} />
          <p className="text-base-content/60 mt-2">Explore our diverse collection</p>
        </div>
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category.name} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-base-content/60">No categories available yet.</p>
          </div>
        )}
      </section>

      {/* Book List */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <Title text="Popular Books" level={2} />
          <p className="text-base-content/60 mt-2">Discover trending titles</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {books.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </motion.div>
      </section>


      {/* Community Reviews Section - DYNAMIC */}
      <section className="max-w-7xl mx-auto px-4">
        <ReviewList />
      </section>

      {/* Extra Section 2 */}
      <section className="bg-base-100 py-12 px-6 rounded-2xl max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-base-content">Newly Added Genres</h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <li className="flex items-center gap-2 text-base-content/80"><span className="w-2 h-2 bg-accent rounded-full"></span>Modern Romance</li>
            <li className="flex items-center gap-2 text-base-content/80"><span className="w-2 h-2 bg-accent rounded-full"></span>Philosophical Fiction</li>
            <li className="flex items-center gap-2 text-base-content/80"><span className="w-2 h-2 bg-accent rounded-full"></span>Young Adult (YA)</li>
            <li className="flex items-center gap-2 text-base-content/80"><span className="w-2 h-2 bg-accent rounded-full"></span>Autobiographies</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;