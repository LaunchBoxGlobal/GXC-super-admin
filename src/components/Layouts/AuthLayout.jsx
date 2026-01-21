const AuthLayout = ({ children }) => {
  return (
    <main className="w-full min-h-screen relative grid grid-cols-1 lg:grid-cols-2 p-4 auth-bg">
      <div className="w-full h-full bg-transparent hidden lg:block">
        <img
          src="/login-mockup.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full py-12 flex items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
