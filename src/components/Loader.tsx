const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="relative flex justify-center items-center">
        <div className="w-14 h-14 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

        <div className="absolute w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default Loader;
