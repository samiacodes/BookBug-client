import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "../../components/Icon";
import Title from "../../components/Title";
import Button from "../../components/Button";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    borrowedBooks: 0,
    categories: 0,
    totalBanners: 0
  });
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_URL || 'https://book-bug-server.onrender.com';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard statistics
        const statsRes = await axios.get(`${baseURL}/dashboard/stats`);
        setStats(statsRes.data);

        // Fetch recent books
        const booksRes = await axios.get(`${baseURL}/dashboard/recent-books?limit=5`);
        setRecentBooks(booksRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  // Dashboard stats cards
  const statCards = [
    {
      title: "Total Books",
      value: stats.totalBooks,
      icon: <Icon name="books" className="text-primary" />,
      color: "bg-primary/10",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Icon name="users" className="text-secondary" />,
      color: "bg-secondary/10",
    },
    {
      title: "Borrowed Books",
      value: stats.borrowedBooks,
      icon: <Icon name="categories" className="text-accent" />,
      color: "bg-accent/10",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: <Icon name="categories" className="text-info" />,
      color: "bg-info/10",
    },
    {
      title: "Banners",
      value: stats.totalBanners,
      icon: <Icon name="bookOpen" className="text-success" />,
      color: "bg-success/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-base-content">Admin Dashboard</h1>
        <p className="text-base-content/70 mt-2">
          Welcome back! Here's what's happening with your library today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70 text-sm">{card.title}</p>
                <h3 className="text-2xl font-bold text-base-content mt-1">
                  {card.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-lg ${card.color} flex items-center justify-center`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Books Section */}
      <div className="bg-base-100 rounded-xl border border-base-300 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-base-content">Recent Books</h2>
          <Link to="/admin/books">
            <Button variant="outline">View All Books</Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead className="bg-base-200">
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Category</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {recentBooks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No books found
                  </td>
                </tr>
              ) : (
                recentBooks.map((book) => {
                  // Add null/undefined checks for all book properties
                  const title = book?.title || book?.name || "Untitled Book";
                  const author = book?.author || "Unknown Author";
                  const category = book?.category || "Uncategorized";
                  const quantity = book?.quantity !== undefined ? book.quantity : 0;
                  
                  return (
                    <tr key={book._id}>
                      <td>
                        <div className="font-medium">{title}</div>
                      </td>
                      <td>{author}</td>
                      <td>
                        <span className="badge badge-primary badge-sm">
                          {category}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge badge-sm ${
                            quantity > 0 ? "badge-accent" : "badge-primary opacity-50"
                          }`}
                        >
                          {quantity > 0 ? `${quantity} available` : "Out of stock"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;