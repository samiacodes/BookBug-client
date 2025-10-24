import React, { useState } from "react";
import Icon from "../../components/Icon";
import Button from "../../components/Button";

const UsersManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active", joinDate: "2023-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", joinDate: "2023-02-20" },
    { id: 3, name: "Admin User", email: "admin@example.com", role: "admin", status: "active", joinDate: "2023-01-01" },
    { id: 4, name: "Robert Brown", email: "robert@example.com", role: "user", status: "suspended", joinDate: "2023-03-10" },
  ]);

  const handleSuspendUser = (id) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === "active" ? "suspended" : "active" }
        : user
    ));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img src="/default-avatar.png" alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
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
                  <span className={`badge ${user.status === "active" ? "badge-success" : "badge-warning"}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSuspendUser(user.id)}
                    >
                      {user.status === "active" ? (
                        <>
                          <Icon name="ban" className="mr-1" size="sm" /> Suspend
                        </>
                      ) : (
                        <>Activate</>
                      )}
                    </Button>
                    {user.role !== "admin" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Icon name="trash" size="sm" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;