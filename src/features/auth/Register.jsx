import React, { useState, useContext } from "react";
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

const Register = () => {
  const { setUser } = useContext(AuthContext);
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
      .then((res) => {
        return updateProfile(res.user, {
          displayName: name,
          photoURL,
        }).then(() => {
          setUser(res.user);
          toast.success("Registration successful!");
          navigate("/");
        });
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-base-100">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-3xl font-bold text-center">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
              type="url"
              name="photoURL"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              value={formData.photoURL}
              onChange={handleChange}
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
              className="btn bg-gradient-to-r from-green-400 to-blue-500 text-white border-none w-full hover:from-green-500 hover:to-blue-600"
            >
              Register
            </button>
          </form>

          
          <SocialLogin />

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-base-200 p-6">
        <Lottie
          animationData={animationImage}
          loop
          className="max-w-md w-full"
        />
      </div>
    </div>
  );
};

export default Register;
