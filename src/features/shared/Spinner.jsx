

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-t-green-500 border-r-transparent border-b-green-500 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-t-green-400 border-r-transparent border-b-green-400 border-l-transparent rounded-full animate-spin-reverse"></div>
        <div className="absolute inset-5 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Spinner;
