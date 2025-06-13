import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
// import Home from "../pages/Home/Home";
// import AllBooks from "../pages/AllBooks/AllBooks";
import AddBook from "../features/pages/AddBook";
// import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
    //   {
    //     index: true,
    //     element: <Home />,
    //   },
    //   {
    //     path: "all-books",
    //     element: <AllBooks />,
    //   },
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
    //   {
    //     path: "borrowed-books",
    //     element: (
    //       <PrivateRoute>
    //         <BorrowedBooks />
    //       </PrivateRoute>
    //     ),
    //   },
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
