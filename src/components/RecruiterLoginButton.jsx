import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import Button from "./Button";

const RecruiterLoginButton = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRecruiterLogin = async () => {
    try {
      // Hardcoded admin credentials for testing
      const email = "admin@bookbug.com";
      const password = "Admin123!";
      
      // Use the existing signInUser function with hardcoded credentials
      const userCredential = await signInUser(email, password);
      
      // Check if the logged in user is admin
      if (userCredential.user.email === email) {
        toast.success("Admin login successful!");
        navigate("/admin");
      } else {
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message || "Admin login failed");
    }
  };

  return (
    <div className="form-control mt-4">
      <Button
        variant="accent"
        onClick={handleRecruiterLogin}
        fullWidth
      >
        Recruiter Access
      </Button>
    </div>
  );
};

export default RecruiterLoginButton;