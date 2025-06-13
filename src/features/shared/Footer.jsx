import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    { to: "/", label: "Home", },
    { to: "/all-books", label: "All Books",  },
    { to: "/add-book", label: "Add Book",  },
    { to: "/borrowed-books", label: "Borrowed", },
    { to: "/signin", label: "Login",  },
    { to: "/register", label: "Register",},
  ];

  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-6">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <FaBookOpen className="text-green-700 text-3xl" />
          <span className="text-2xl font-bold text-green-900 font-playfair">
            BookNest
          </span>
        </div>

        {/* Links */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-black text-sm font-medium">
          {footerLinks.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className="flex items-center gap-2 hover:text-green-900 transition-colors"
              >
                 {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-xs text-gray-500 pb-4">
        © {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
