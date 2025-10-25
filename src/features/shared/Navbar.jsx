import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import Icon from "../../components/Icon";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser();
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home", icon: "home" },
    { path: "/all-books", label: "All Books", icon: "books" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-300 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Icon name="menu" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${isActive ? "active" : ""}`
                  }
                >
                  <Icon name={link.icon} />
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <div className="flex items-center gap-3">
            <Icon name="bookOpen" className="text-primary text-3xl" />
            <span className="text-2xl font-bold font-playfair text-primary">
              BookBug
            </span>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 ${isActive ? "active" : ""}`
                }
              >
                <Icon name={link.icon} />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt="User"
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <div className="font-semibold truncate max-w-[180px]">
                  {user.displayName || user.email}
                </div>
              </li>
              <li className="border-t border-base-300 my-1"></li>
              {user.email === "admin@bookbug.com" && (
                <li>
                  <Link to="/admin" className="flex items-center gap-2">
                    <Icon name="chart" />
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link to="/borrowed" className="flex items-center gap-2">
                  <Icon name="categories" />
                  Borrowed
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-error"
                >
                  <Icon name="logout" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost">
              <Icon name="login" />
              Login
            </Link>
            <Link to="/register" className="btn btn-ghost">
              <Icon name="userAdd" />
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;