const UserTypeTabs = ({ setUserType, userType }) => {
  return (
    <div className="w-full mt-5 min-w-[200px] max-w-[200px] h-[41px] bg-white custom-shadow rounded-lg p-1 grid grid-cols-2">
      <button
        type="button"
        onClick={() => {
          setUserType("regular_user");
          const params = new URLSearchParams(searchParams);
          params.set("userType", "regular_user");

          params.set("page", 1);
          setSearchParams(params);
        }}
        className={`${
          userType === "regular_user"
            ? "bg-black text-white"
            : "bg-white text-black"
        } font-medium text-sm rounded-lg w-full h-full`}
      >
        Users
      </button>
      <button
        type="button"
        onClick={() => {
          setUserType("community_owner");
          const params = new URLSearchParams(searchParams);
          params.set("userType", "community_owner");

          params.set("page", 1);
          setSearchParams(params);
        }}
        className={`${
          userType === "community_owner"
            ? "bg-black text-white"
            : "bg-white text-black"
        } font-medium text-sm rounded-lg w-full h-full`}
      >
        Owners
      </button>
    </div>
  );
};

export default UserTypeTabs;
