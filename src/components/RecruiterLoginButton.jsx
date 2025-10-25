import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";
import Button from "./Button";

const RecruiterLoginButton = () => {
  const { recruiterLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRecruiterLogin = async () => {
    try {
      await recruiterLogin();
      toast.success("Recruiter login successful!");
      navigate("/admin");
    } catch (err) {
      toast.error(err.message || "Recruiter login failed");
    }
  };

  // Only show in development environment
  if (!import.meta.env.DEV) {
    return null;
  }

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