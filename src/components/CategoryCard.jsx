import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Title from "./Title";

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-md p-6 rounded-lg text-center"
    >
      <Title text={category} level={2} />

      <Link to={`/category/${category}`}>
        <button className="btn btn-sm bg-green-600 text-white mt-2">
          View Books
        </button>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
