import React, { useState } from "react";
import Lottie from "lottie-react";
import animationImage from "../../assets/lotties/register.json";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../firebase/firebase.init";
import SocialLogin from "../shared/SocialLogin";
import Title from "../../components/Title";
import Button from "../../components/Button";

const Register = () => {
  // const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        await updateProfile(res.user, { displayName: name, photoURL });
        const token = await res.user.getIdToken();
        localStorage.setItem("token", token);
        toast.success("Registration successful!");
        navigate("/"); // Redirect to Home page
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-200">
      {/* Left - Form Section */}
      <div className="flex flex-col justify-center items-center p-10 bg-base-100">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-base-content">
              Create an Account
            </h2>
            <p className="text-base-content/60">Join our reading community</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="url"
                name="photoURL"
                placeholder="Enter photo URL (optional)"
                className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                value={formData.photoURL}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Min 8 chars, 1 uppercase, 1 lowercase, 1 special character
                </span>
              </label>
            </div>
            
            {error && (
              <div className="alert bg-primary/10 border border-primary rounded-lg shadow-sm">
                <span className="text-sm text-base-content">{error}</span>
              </div>
            )}
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
            >
              Register
            </Button>
          </form>

          <SocialLogin />

          <p className="text-sm text-center text-base-content/70">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="hidden md:flex items-center justify-center bg-base-200 p-6">
        <Lottie
          animationData={animationImage}
          loop
          className="w-full max-w-lg"
        />
      </div>
    </div>
  );
};

export default Register;
