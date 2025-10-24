import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { AuthContext } from "../context/AuthContext";
import { handleLogout } from "../helpers/authHelper";
import { navigationData } from "../constants/navigation";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Locks scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filtering links based on auth
  const filteredLinks = navigationData.filter((item) => {
    return !item.private || user;
  });

  // Rendering navigation links
  const links = filteredLinks.map((route) => (
    <li key={route.id}>
      <NavLink
        to={route.path}
        className={({ isActive }) =>
          isActive
            ? scrolled
              ? "text-primary-content font-semibold"
              : "text-primary font-semibold"
            : scrolled
            ? "hover:text-accent text-primary-content"
            : "hover:text-accent text-base-content"
        }
      >
        {route.name}
      </NavLink>
    </li>
  ));

  return (
    <div
      className={`navbar sticky top-0 px-4 lg:px-10 z-50 shadow-md transition-colors duration-300 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      {/* Left: Logo */}
      <div className="navbar-start flex items-center">
        <Link
          to="/"
          className={`text-xl ml-2 font-semibold transition-colors duration-300 ${
            scrolled ? "text-primary-content" : "text-primary"
          }`}
        >
          🌿The Garden Hub
        </Link>
        {/* Mobile Menu */}
        <ul
          className={`absolute top-16 right-4 z-40 w-52 bg-base-100 shadow-md px-6 py-4 space-y-2 rounded-md transition-transform duration-300 ease-in-out lg:hidden ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-20 opacity-0 pointer-events-none"
          }`}
        >
          {links}
          {!user ? (
            <li>
              <Link
                to="/login"
                className="text-primary font-semibold"
                onClick={() => setOpen(false)}
              >
                Login / SignUp
              </Link>
            </li>
          ) : (
            <li className="relative">
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="w-full text-left flex items-center gap-2"
              >
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt={user?.displayName || "Guest"}
                  className="w-10 h-10 rounded-full"
                />
                <span>{user.displayName || "Guest"}</span>
              </button>
              {showLogout && (
                <button
                  onClick={() => {
                    handleLogout(navigate);
                    setShowLogout(false);
                    setOpen(false);
                  }}
                  className="text-accent mt-2 block"
                >
                  Logout
                </button>
              )}
            </li>
          )}
        </ul>
      </div>

      {/* Center: Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5">{links}</ul>
      </div>

      {/* Right: User Avatar & Logout & Hamburger */}
      <div className="navbar-end relative items-center space-x-2 flex">
        <div
          className={`lg:hidden ${scrolled ? "text-primary-content" : "text-primary"}`}
        >
          <Hamburger toggled={open} toggle={setOpen} size={20} />
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div
              className="group relative cursor-pointer"
              onClick={() => setShowLogout((prev) => !prev)}
            >
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt={user?.displayName || "Guest"}
                className="w-12 h-12 rounded-full border border-primary"
              />
              <div className="absolute left-1/2 -translate-x-1/2 -mt-6 px-2 py-1 rounded bg-base-100 text-sm text-primary shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-40">
                {user.displayName || "Guest"}
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline transition-colors"
            >
              Login / Register
            </Link>
          )}

          {showLogout && (
            <div className="absolute top-full right-0 mt-2 bg-base-100 px-4 py-2 rounded shadow z-50">
              <button
                onClick={() => {
                  handleLogout(navigate);
                  setShowLogout(false);
                }}
                className="text-accent text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
