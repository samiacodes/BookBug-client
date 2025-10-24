import React, { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../../components/Icon";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    borrowedBooks: 0,
    categories: 0,
    totalBanners: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentBooks, setRecentBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch books
        const booksRes = await axios.get(`${import.meta.env.VITE_API_URL || 'https://b11a11-server-side2-mdp-arvezsarkar.vercel.app'}/books`);
        const books = booksRes.data;
        
        // Fetch banners
        const bannersRes = await axios.get(`${import.meta.env.VITE_API_URL || 'https://b11a11-server-side2-mdp-arvezsarkar.vercel.app'}/banners`);
        const banners = bannersRes.data;
        
        // For now, we'll simulate user and borrowed book counts
        // In a real implementation, you would have endpoints for these
        setStats({
          totalBooks: books.length,
          totalUsers: 120, // Simulated
          borrowedBooks: 45, // Simulated
          categories: [...new Set(books.map(book => book.category).filter(Boolean))].length,
          totalBanners: banners.length
        });
        
        // Get recent books (first 3)
        setRecentBooks(books.slice(0, 3));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Books",
      value: stats.totalBooks,
      icon: <Icon name="books" className="text-primary" />,
      color: "bg-primary/10"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Icon name="users" className="text-accent" />,
      color: "bg-accent/10"
    },
    {
      title: "Borrowed Books",
      value: stats.borrowedBooks,
      icon: <Icon name="clipboardList" className="text-secondary" />,
      color: "bg-secondary/10"
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: <Icon name="chart" className="text-info" />,
      color: "bg-info/10"
    },
    {
      title: "Banners",
      value: stats.totalBanners,
      icon: <Icon name="chart" className="text-warning" />,
      color: "bg-warning/10"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Dashboard</h1>
          <p className="text-base-content/70">Welcome to the BookBug Admin Dashboard</p>
        </div>
        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70">{card.title}</p>
                {loading ? (
                  <div className="h-8 w-12 bg-base-300 rounded-lg animate-pulse mt-2"></div>
                ) : (
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                )}
              </div>
              <div className={`p-3 rounded-lg ${card.color}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Books</h2>
          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-3">
                  <div className="bg-base-300 border-2 border-dashed rounded-xl w-16 h-16 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-base-300 rounded animate-pulse"></div>
                    <div className="h-3 bg-base-300 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : recentBooks.length > 0 ? (
              recentBooks.map((book) => (
                <div key={book._id} className="flex items-center gap-4 p-3 hover:bg-base-200 rounded-lg transition-colors">
                  <div className="bg-base-300 border-2 border-dashed rounded-xl w-16 h-16">
                    {book.image && (
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-xl" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-base-content/70">{book.author || "Unknown Author"}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-base-content/70 text-center py-4">No books found</p>
            )}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="primary" fullWidth onClick={() => navigate("/admin/books/new")}>
              <Icon name="plus" className="mr-2" />
              Add Book
            </Button>
            <Button variant="outline" fullWidth onClick={() => navigate("/admin/users")}>
              <Icon name="users" className="mr-2" />
              View Users
            </Button>
            <Button variant="outline" fullWidth onClick={() => navigate("/admin/categories")}>
              <Icon name="categories" className="mr-2" />
              Manage Categories
            </Button>
            <Button variant="outline" fullWidth onClick={() => navigate("/admin/banner")}>
              <Icon name="chart" className="mr-2" />
              Update Banner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;