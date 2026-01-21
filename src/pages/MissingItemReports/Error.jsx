const Error = ({ error }) => {
  return (
    <div className="w-full bg-[#fff] custom-shadow rounded-[10px] mt-5 p-5 min-h-[100vh] flex items-center justify-center">
      <p className="text-sm font-medium text-gray-500">{error}</p>
    </div>
  );
};

export default Error;
