import { FaArrowLeft, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import bookAnimation from "../../assets/lotties/nfb.json";

const NotFound = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-b from-amber-100 to-orange-50 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl px-6">
        {/* Text Section */}
        <div className="flex flex-col items-center text-center md:text-left max-w-md space-y-6">
          <FaBookOpen className="text-6xl text-green-500 mb-4 animate-bounce" />
          <h1 className="text-7xl font-bold text-gray-800">404</h1>
          <p className="text-xl text-gray-600">
            Lost in the library? This shelf doesn’t exist.
          </p>
          <Link
            to="/"
            className="btn bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full shadow-lg flex items-center gap-2 transition duration-300 ease-in-out"
          >
            <FaArrowLeft /> Return to Homepage
          </Link>
        </div>

        {/* Lottie Animation Section */}
        <div className="w-full max-w-lg">
          <Lottie
            animationData={bookAnimation}
            loop
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
