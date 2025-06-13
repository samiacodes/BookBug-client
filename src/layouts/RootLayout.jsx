import { Outlet } from "react-router-dom";
import Navbar from "../features/shared/Navbar";
import Footer from "../features/shared/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-200 text-base-content">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
        <Footer/>
    </div>
  );
};

export default RootLayout;
