const PageError = ({ errorMessage }) => {
  return (
    <div className="w-full bg-white min-h-[80vh] flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <p className="text-sm">{errorMessage || "Something went wrong."}</p>
      </div>
    </div>
  );
};

export default PageError;
