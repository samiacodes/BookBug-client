import { Outlet } from "react-router-dom";
import Navbar from "../features/shared/Navbar";
import Footer from "../features/shared/Footer";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import Spinner from "../features/shared/Spinner";
import { useContext } from "react";
import DynamicTitle from "../features/shared/DynamicTitle";
const RootLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return <Spinner />;
  return (
    <div className="flex flex-col bg-base-200 min-h-screen text-base-content transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="max-w-7xl w-full min-h-[calc(100vh-277px)] my-8 mx-auto px-4 lg:px-6">
        <DynamicTitle />
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
