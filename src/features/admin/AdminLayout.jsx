import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import Icon from "../../components/Icon";
import Button from "../../components/Button";

const AdminLayout = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOutUser();
            navigate("/login");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const menuItems = [
        { icon: <Icon name="home" />, label: "Dashboard", path: "/admin" },
        { icon: <Icon name="books" />, label: "Manage Books", path: "/admin/books" },
        { icon: <Icon name="categories" />, label: "Categories", path: "/admin/categories" },
        { icon: <Icon name="users" />, label: "Users", path: "/admin/users" },
        { icon: <Icon name="settings" />, label: "Banner", path: "/admin/banner" },
    ];

    return (
        <div className="flex h-screen bg-base-100">
            {/* Sidebar */}
            <div className="w-64 bg-base-200 border-r border-base-300 flex flex-col">
                <div
                    className="p-4 border-b border-base-300 cursor-pointer flex items-center gap-2 hover:bg-base-300 transition-colors"
                    onClick={() => navigate("/")}
                >
                    <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-primary-content font-bold text-sm">BB</span>
                    </div>
                    <h1 className="text-xl font-bold text-primary">BookBug Admin</h1>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.path}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300 transition-colors"
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-base-300">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || "/default-avatar.png"} alt="Admin" />
                            </div>
                        </div>
                        <div>
                            <p className="font-medium">{user?.displayName || "Admin"}</p>
                            <p className="text-sm text-base-content/70">Administrator</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2"
                    >
                        <Icon name="logout" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;