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
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow max-w-full mx-auto px-4 py-6">
        <DynamicTitle />
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
