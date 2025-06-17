import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const BookCard = ({ book }) => {
  return (
    <div className="card shadow-md p-4 bg-white rounded">
      <img
        src={book.image}
        alt={book.title}
        className="h-48 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-bold">{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <p>Quantity: {book.quantity}</p>
      <ReactStars value={book.rating} edit={false} size={20} />
      <Link to={`/books/${book._id}`}>
        <button className="btn btn-sm bg-green-600 text-white w-full mt-2">
          Details
        </button>
      </Link>
    </div>
  );
};

export default BookCard;
