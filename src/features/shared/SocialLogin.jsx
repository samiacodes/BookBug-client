import { use } from "react";
import { AuthContext } from "../../contexts/AuthContexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SocialLogin = ({ from }) => {
  const navigate = useNavigate();
  const { signInWithGoogle } = use(AuthContext);
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const token = await result.user.getIdToken();
        localStorage.setItem("token", token);
        toast.success("Login successful!");
        navigate(from || "/");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Google Sign In clicked");
  };
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      {/* Divider */}
      <div className="flex items-center mb-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 font-semibold">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-success text-white w-full flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24px"
          height="24px"
          fill="none"
        >
          <path
            fill="#fbbc05"
            d="M43.611 20.083h-1.649v-.05H24v7.834h11.521c-1.26 3.777-5.06 6.494-11.521 6.494-6.978 0-12.673-5.695-12.673-12.674 0-6.978 5.695-12.674 12.673-12.674 3.147 0 5.9 1.19 7.994 3.13l5.652-5.652C34.878 7.074 29.83 5 24 5 12.954 5 4 13.954 4 25s8.954 20 20 20 20-8.954 20-20c0-1.33-.133-2.628-.389-3.83z"
          />
          <path
            fill="#ea4335"
            d="M6.306 14.691l6.566 4.82C14.09 16.1 18.745 13 24 13c3.147 0 5.9 1.19 7.994 3.13l5.652-5.652C34.878 7.074 29.83 5 24 5 16.615 5 10.044 9.868 6.306 14.691z"
          />
          <path
            fill="#34a853"
            d="M24 43c6.162 0 11.332-3.946 13.236-9.468h-12.98v-7.8h20.041c.238 1.437.36 2.924.36 4.468 0 11.046-8.954 20-20 20-9.847 0-18.062-6.672-19.829-15.738z"
          />
          <path
            fill="#4285f4"
            d="M43.611 20.083H24v7.834h11.521c-.495 1.47-1.248 2.8-2.28 3.79l5.652 5.652c3.303-3.049 5.38-7.645 5.38-13.003 0-1.33-.133-2.628-.389-3.83z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
