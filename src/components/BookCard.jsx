import { Link } from "react-router-dom";
import Title from "./Title";

const BookCard = ({ book }) => {
  return (
    <div className="card shadow-md p-6 bg-white rounded">
      <img
        src={book.image}
        alt={book.name}
        className="h-48 object-cover rounded mb-2"
      />
      <Title text={book.name} level={3} />
      <Link to={`/books/${book._id}`}>
        <button className="btn btn-sm bg-green-600 text-white w-full mt-2">
          Details
        </button>
      </Link>
    </div>
  );
};

export default BookCard;
