import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { get } = useApi();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userData = await get("/users");
        setUsers(userData);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [get]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error text-error-content p-4 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-base-content">User Management</h1>
        <p className="text-base-content/70">Manage registered users and their permissions</p>
      </div>

      <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img 
                          src={user.photoURL || "/default-avatar.png"} 
                          alt={user.displayName || user.email} 
                          onError={(e) => {
                            e.target.src = "/default-avatar.png";
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{user.displayName || "No name"}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === "admin" ? "badge-accent" : "badge-primary"}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`badge ${user.disabled ? "badge-warning" : "badge-success"}`}>
                    {user.disabled ? "Disabled" : "Active"}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.lastSignInAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="text-center py-8">
            <p className="text-base-content/70">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;