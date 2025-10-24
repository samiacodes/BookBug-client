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
    <footer className="bg-base-100 border-t border-base-300 mt-16 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-8">
        {/* Logo + Name */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FaBookOpen className="text-primary text-3xl" />
            <span className="text-2xl font-bold font-playfair text-primary">
              BookBug
            </span>
          </div>
          <p className="text-base-content/60 text-sm max-w-sm">
            Your gateway to endless stories and knowledge. Discover, borrow, and share books with our community.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-base-content mb-4">Quick Links</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-base-content/70 text-sm font-medium">
            {footerLinks.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2 hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-base-300 py-4">
        <div className="text-center text-sm text-base-content/60">
          © {new Date().getFullYear()} BookBug. All rights reserved. Built with Passion for book lovers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
