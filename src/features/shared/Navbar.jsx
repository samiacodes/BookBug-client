import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiHome,
  HiBookOpen,
  HiPlus,
  HiClipboardList,
  HiLogin,
  HiUserAdd,
  HiLogout,
} from "react-icons/hi";
import { useState, useContext } from "react";
import { FaBookOpen } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { handleLogout } from "../../helpers/authHelper"; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  console.log(motion)
  const { user } = useContext(AuthContext);

  const linkClass =
    "flex items-center gap-2 font-medium text-green-700 hover:text-green-900 transition-colors";

  const commonLinks = (
    <>
      <li>
        <Link to="/" className={linkClass}>
          <HiHome /> Home
        </Link>
      </li>
      <li>
        <Link to="/all-books" className={linkClass}>
          <HiBookOpen /> All Books
        </Link>
      </li>
      <li>
        <Link to="/add-book" className={linkClass}>
          <HiPlus /> Add Book
        </Link>
      </li>
      <li>
        <Link to="/borrowed-books" className={linkClass}>
          <HiClipboardList /> Borrowed
        </Link>
      </li>
    </>
  );

  const authLinks = !user ? (
    <>
      <li>
        <Link
          to="/login"
          className="btn btn-sm bg-green-700 hover:bg-green-800 text-white border-none flex gap-2"
        >
          <HiLogin /> Login
        </Link>
      </li>
      <li>
        <Link
          to="/register"
          className="btn btn-sm border-green-700 text-green-700 bg-white hover:bg-green-100 flex items-center gap-2"
        >
          <HiUserAdd /> Register
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className="relative group flex items-center">
        <div className="self-center overflow-hidden">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName || "User"}
            className="object-cover rounded-full w-12 h-12"
          />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[115%] opacity-0 group-hover:opacity-100 bg-white text-green-700 text-sm px-2 py-1 rounded shadow transition-opacity whitespace-nowrap z-50">
          {user.displayName || "Anonymous"}
        </div>
      </li>
      <li>
        <button
          onClick={() => handleLogout(navigate)}
          className="btn btn-sm bg-red-600 text-white hover:bg-red-700 border-none flex items-center gap-2"
        >
          <HiLogout /> Logout
        </button>
      </li>
    </>
  );
  


  return (
    <div className="bg-white shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="group flex items-center text-2xl font-bold">
            <FaBookOpen className="size-10 mr-2 text-green-700" />
            <span className="text-3xl text-green-900 font-playfair">
              BookNest
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-4">
            {commonLinks}
            {authLinks}
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <div className="navbar-end lg:hidden">
          <button onClick={toggleMenu} className="btn btn-ghost">
            {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Mobile Slide-out Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={toggleMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 p-4"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-green-700">
                    Menu
                  </span>
                  <button onClick={toggleMenu}>
                    <HiOutlineX size={24} />
                  </button>
                </div>
                <ul className="menu menu-vertical gap-2">
                  {commonLinks}
                  {authLinks}
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
