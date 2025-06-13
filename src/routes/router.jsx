import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../features/layouts/RootLayout";
// import Home from "../pages/Home/Home";
// import AllBooks from "../pages/AllBooks/AllBooks";
// import AddBook from "../pages/AddBook/AddBook";
// import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
// import Register from "../pages/Register/Register";
// import SignIn from "../pages/SignIn/SignIn";
// import PrivateRoute from "./PrivateRoute";

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
    //   {
    //     path: "add-book",
    //     element: (
    //       <PrivateRoute>
    //         <AddBook />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: "borrowed-books",
    //     element: (
    //       <PrivateRoute>
    //         <BorrowedBooks />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: "register",
    //     element: <Register />,
    //   },
    //   {
    //     path: "signin",
    //     element: <SignIn />,
    //   },
    ],
  },
]);

export default router;
