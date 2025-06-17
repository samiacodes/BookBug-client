import React from "react";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import ReactDOM from "react-dom/client";
import AuthProvider from "./contexts/AuthContexts/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);


