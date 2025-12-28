import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Title from "./Title";
import Icon from "./Icon";

const CategoryCard = ({ category }) => {
  // Handle both string and object formats
  const categoryName = typeof category === 'string' ? category : category?.name || 'Unknown';
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="card-modern text-center group bg-base-100 hover:bg-base-200"
    >
      <div className="p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl font-bold text-primary-content">{categoryName.charAt(0)}</span>
        </div>
        <Title text={categoryName} level={3} />

        <Link to={`/category/${categoryName}`} className="mt-4 block">
          <button className="btn btn-primary btn-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 mx-auto group">
            View
            <Icon name="arrowRight" className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;