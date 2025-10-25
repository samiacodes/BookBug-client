import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../features/pages/Home";
import AllBooks from "../features/pages/AllBooks";
import AddBook from "../features/pages/AddBook";
import BorrowedBooks from "../features/pages/BorrowedBooks";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import PrivateRoute from "./PrivateRoute";
import PrivateAdminRoute from "./PrivateAdminRoute";
import NotFound from "../features/pages/NotFound";
import UpdateBook from "../features/pages/UpdateBook";
import BookDetails from "../features/pages/BookDetails";
import CategoryBooks from "../features/pages/CategoryBooks";
import Profile from "../features/pages/Profile";

// Admin Components
import AdminLayout from "../features/admin/AdminLayout";
import Dashboard from "../features/admin/Dashboard";
import BooksManagement from "../features/admin/BooksManagement";
import CategoriesManagement from "../features/admin/CategoriesManagement";
import UsersManagement from "../features/admin/UsersManagement";
import BannerManagement from "../features/admin/BannerManagement";

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
        path: "borrowed",
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
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateAdminRoute>
        <AdminLayout />
      </PrivateAdminRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "books",
        element: <BooksManagement />,
      },
      {
        path: "categories",
        element: <CategoriesManagement />,
      },
      {
        path: "users",
        element: <UsersManagement />,
      },
      {
        path: "banner",
        element: <BannerManagement />,
      },
    ],
  },
]);

export default router;