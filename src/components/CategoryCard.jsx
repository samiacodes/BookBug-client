import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-md p-6 rounded-lg text-center"
    >
      <h2 className="text-xl font-semibold mb-2">{category}</h2>
      <Link to={`/category/${category}`}>
        <button className="btn btn-sm bg-blue-600 text-white mt-2">
          View Books
        </button>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
