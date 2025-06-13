import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/lotties/signin.json";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { auth, signInWithEmailAndPassword } from "../../firebase/firebase.init";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import SocialLogin from "../shared/SocialLogin";

const Login = () => {
  const { setUser } = useContext(AuthContext);
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
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-100">
      {/* Left */}
      <div className="flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-3xl font-bold text-center">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="btn bg-gradient-to-r from-green-400 to-green-900 text-white border-none w-full hover:from-green-900 hover:to-green-500"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <SocialLogin />

          <p className="text-sm text-center mt-2">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center bg-base-200 p-6">
        <Lottie
          animationData={loginAnimation}
          loop
          className="max-w-md w-full"
        />
      </div>
    </div>
  );
};

export default Login;
