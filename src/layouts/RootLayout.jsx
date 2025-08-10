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
    <div className="flex flex-col bg-green-50 min-h-screen text-base-content">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="max-w-7xl min-h-[calc(100vh-277px)] my-6 mx-auto">
        <DynamicTitle />
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RootLayout;
