import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../components/Icon";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { handleLogout } from "../../helpers/authHelper";
import ThemeToggle from "../../components/ThemeToggle";
import SmartSearch from "../../components/SmartSearch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { user, role } = useContext(AuthContext);

  const linkClass =
    "flex items-center gap-2 font-medium text-base-content hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-base-200";

  const commonLinks = (
    <>
      <li>
        <Link to="/" className={linkClass}>
          <Icon name="home" /> Home
        </Link>
      </li>
      <li>
        <Link to="/all-books" className={linkClass}>
          <Icon name="books" /> All Books
        </Link>
      </li>
      <li>
        <Link to="/add-book" className={linkClass}>
          <Icon name="plus" /> Add Book
        </Link>
      </li>
      <li>
        <Link to="/borrowed-books" className={linkClass}>
          <Icon name="clipboardList" /> Borrowed
        </Link>
      </li>
      {role === "admin" && (
        <li>
          <Link to="/admin" className={linkClass}>
            <Icon name="settings" /> Admin Dashboard
          </Link>
        </li>
      )}
    </>
  );

  const authLinks = !user ? (
    <>
      <li>
        <Link
          to="/login"
          className="btn btn-sm btn-primary text-primary-content border-none flex gap-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Icon name="login" /> Login
        </Link>
      </li>
      <li>
        <Link
          to="/register"
          className="btn btn-sm btn-outline btn-primary flex items-center gap-2 rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200"
        >
          <Icon name="userAdd" /> Register
        </Link>
      </li>
    </>
  ) : (
    <>
      <li className="relative group flex items-center">
        <Link to="/profile" className="self-center overflow-hidden ring-2 ring-primary ring-offset-2 rounded-full hover:ring-accent transition-all duration-300">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName || "User"}
            className="object-cover rounded-full w-10 h-10"
          />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 top-[115%] opacity-0 group-hover:opacity-100 bg-base-100 text-base-content text-sm px-3 py-2 rounded-lg shadow-lg transition-all duration-200 whitespace-nowrap z-50 border border-base-300">
          {user.displayName || "Anonymous"}
        </div>
      </li>
      <li>
        <button
          onClick={() => handleLogout(navigate)}
          className="btn btn-sm btn-accent border-none flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Icon name="logout" /> Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="navbar max-w-7xl mx-auto px-6 lg:px-8 py-3">
        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="group flex items-center text-2xl font-bold gap-2">
            <Icon name="bookOpen" className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
            <span className="text-2xl font-playfair text-primary group-hover:text-accent transition-colors duration-300">
              BookBug
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex flex-col">
          {/* Navigation Links */}
          <ul className="menu menu-horizontal items-center gap-2">
            {commonLinks}
          </ul>
          {/* Search Bar on its own line */}
          <div className="mb-2 w-full max-w-2xl">
            <SmartSearch />
          </div>
        </div>

        {/* Right Side - Theme Toggle & Auth */}
        <div className="navbar-end flex items-center gap-3">
          <ThemeToggle />
          
          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-2">
            <ul className="menu menu-horizontal items-center gap-2">
              {authLinks}
            </ul>
          </div>
          
          {/* Mobile Hamburger */}
          <button onClick={toggleMenu} className="btn btn-ghost lg:hidden hover:bg-base-200 rounded-lg">
            {isOpen ? <Icon name="x" size="lg" className="text-base-content" /> : <Icon name="menu" size="lg" className="text-base-content" />}
          </button>
        </div>

        {/* Mobile Slide-out Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={toggleMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed top-0 right-0 w-72 h-full bg-base-100 shadow-2xl z-50 p-6 lg:hidden border-l border-base-300"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-base-300">
                  <span className="text-lg font-semibold text-primary">
                    Menu
                  </span>
                  <button onClick={toggleMenu} className="btn btn-ghost btn-circle hover:bg-base-200">
                    <Icon name="x" size="lg" />
                  </button>
                </div>
                
                {/* Search in Mobile Menu */}
                <div className="mb-4 pb-4 border-b border-base-200">
                  <SmartSearch isMobile={true} />
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