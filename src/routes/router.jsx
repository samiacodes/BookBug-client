import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../features/pages/Home";
import AllBooks from "../features/pages/AllBooks";
import AddBook from "../features/pages/AddBook";
import BorrowedBooks from "../features/pages/BorrowedBooks";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../features/pages/NotFound";
import UpdateBook from "../features/pages/UpdateBook";
import BookDetails from "../features/pages/BookDetails";
import CategoryBooks from "../features/pages/CategoryBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-books",
        element: <AllBooks />,
      },
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: "books/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "category/:categoryName",
        element: <CategoryBooks />,
      },
      {
        path: "borrowed-books",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
