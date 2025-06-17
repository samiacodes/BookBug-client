import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../../components/BookCard";
import CategoryCard from "../../components/CategoryCard";
import Banner from "../shared/Banner";
import { motion } from "framer-motion";

const Home = () => {
  const [books, setBooks] = useState([]);
  const categories = ["Sci-Fi", "Thriller", "History", "Drama"];

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Book loading error:", err));
  }, []);

  return (
    <div className="space-y-12">
      <Banner />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-4">📚 Book Categories</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={i} category={cat} />
          ))}
        </div>
      </section>

      {/* Book List */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-4">🔥 Popular Books</h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </motion.div>
      </section>

      {/* Extra Section 1 */}
      <section className="bg-gray-100 py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Why Reading is Important?</h3>
          <p>
            Reading strengthens your brain, reduces stress, and builds your
            vocabulary. It makes you a better thinker and speaker.
          </p>
        </div>
      </section>

      {/* Extra Section 2 */}
      <section className="bg-gray-200 py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Newly Added Genres</h3>
          <ul className="list-disc pl-6">
            <li>Modern Romance</li>
            <li>Philosophical Fiction</li>
            <li>Young Adult (YA)</li>
            <li>Autobiographies</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
