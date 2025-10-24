import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";

const PrivateAdminRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateAdminRoute;