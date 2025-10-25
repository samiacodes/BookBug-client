import React, { useEffect, useState } from "react";
import axios from "axios";

const TestBookImages = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${baseURL}/books`);
        console.log("Books data:", response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [baseURL]);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div>
      <h2>Book Images Test</h2>
      <div>
        {books.map((book) => (
          <div key={book._id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Image URL: {book.image || "No image URL"}</p>
            {book.image ? (
              <div>
                <img 
                  src={book.image} 
                  alt={book.title} 
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                  onError={(e) => {
                    console.log("Image failed to load:", book.image);
                    e.target.src = "/placeholder.jpg";
                  }}
                />
              </div>
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestBookImages;