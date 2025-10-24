import React, {  useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lotties/signin.json";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, signInWithEmailAndPassword } from "../../firebase/firebase.init";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import SocialLogin from "../shared/SocialLogin";
import Button from "../../components/Button";

const Login = () => {
  // const { setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const token = await res.user.getIdToken();
        localStorage.setItem("token", token);
        toast.success("Login successful!");
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
              Welcome Back
            </h2>
            <p className="text-base-content/60">Login to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                value={formData.password}
                onChange={handleChange}
                required
              />
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
              Login
            </Button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          <p className="text-sm text-center text-base-content/70">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="hidden md:flex items-center justify-center bg-base-200 p-6">
        <Lottie
          animationData={loginAnimation}
          loop
          className="w-full max-w-lg"
        />
      </div>
    </div>
  );
};

export default Login;
