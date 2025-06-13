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
} from "react-icons/hi";
import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  console.log(motion)
  const linkClass =
    "flex items-center gap-2 font-medium text-green-700 hover:text-green-900 transition-colors";

  const menuItems = (
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
      <li>
        <Link
          to="/signin"
          className="btn btn-sm bg-green-700 hover:bg-green-800 text-white border-none flex items-center gap-2"
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
          <ul className="menu menu-horizontal gap-4">{menuItems}</ul>
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
                <ul className="menu menu-vertical gap-2">{menuItems}</ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
