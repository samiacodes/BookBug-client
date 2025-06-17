import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {

    if (location.pathname === "/") {
      document.title = "Home - Book Nest";
    } else if (location.pathname === "/all-books") {
      document.title = "All Books - Book Nest";
    } else if (location.pathname === "/add-book") {
      document.title = "Add Book - Book Nest";
    } else if (location.pathname === "/borrowed-books") {
      document.title = "Borrowed Books - Book Nest";
    } else {
      document.title = "Book Nest"; 
    }
  }, [location]);

  return null;
};

export default DynamicTitle;
