import { motion } from "framer-motion";

const book1 = "https://i.ibb.co/mVbpbGGH/book1.jpg";
const book2 = "https://i.ibb.co/DPhkRrQ0/book-2.jpg";
const book3 = "https://i.ibb.co/k2ynP3Kr/juliano-chaves-qokwv-CWJPv0-unsplash.jpg";

const Banner = () => {
  return (
    <div className="min-h-[80vh] max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-10">
      
      {/* Left: Animated Text */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 text-center md:text-left space-y-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-base-content">
          Discover Your Next <span className="text-primary">Adventure</span>
        </h1>
        <p className="text-lg md:text-xl text-base-content/70">
          Dive into stories that move your heart, mind, and soul.
        </p>
        <button className="btn btn-primary rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300">
          Explore Now
        </button>
      </motion.div>

      {/* Right: Dancing Images */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[book1, book2, book3].map((img, idx) => (
          <motion.div
            key={idx}
            className="rounded-2xl overflow-hidden shadow-xl ring-2 ring-base-300 hover:ring-primary transition-all duration-300"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 2 + idx,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={img}
              alt={`Book ${idx + 1}`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
