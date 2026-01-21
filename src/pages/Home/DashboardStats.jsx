const DashboardStats = ({ stats }) => {
  return (
    stats && (
      <div className="w-full relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        <div className="light-green-bg p-5 rounded-[20px] flex items-start justify-between flex-col md:flex-row md:items-center gap-y-4">
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-[var(--secondary-color)] font-medium leading-none">
              Total Communities
            </h3>
            <p className="font-semibold text-[24px] leading-none">
              {stats?.totalCommunities}
            </p>
          </div>

          <div className="w-[67px] h-[67px] bg-[var(--button-bg)] rounded-[15px] flex items-center justify-center">
            <img
              src={"/communities-icon.png"}
              alt={` icon`}
              width={34}
              height={34}
            />
          </div>
        </div>
        <div className="light-green-bg p-5 rounded-[20px] flex items-start justify-between flex-col md:flex-row md:items-center gap-y-4">
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-[var(--secondary-color)] font-medium leading-none">
              Total Users
            </h3>
            <p className="font-semibold text-[24px] leading-none">
              {stats?.totalUsers}
            </p>
          </div>

          <div className="w-[67px] h-[67px] bg-[var(--button-bg)] rounded-[15px] flex items-center justify-center">
            <img
              src={"/total-users-icon.png"}
              alt={` icon`}
              width={24}
              height={30}
            />
          </div>
        </div>
        <div className="light-green-bg p-5 rounded-[20px] flex items-start justify-between flex-col md:flex-row md:items-center gap-y-4">
          <div className="flex flex-col items-start gap-3">
            <h3 className="text-[var(--secondary-color)] font-medium leading-none">
              Total Products
            </h3>
            <p className="font-semibold text-[24px] leading-none">
              {stats?.totalProducts}
            </p>
          </div>

          <div className="w-[67px] h-[67px] bg-[var(--button-bg)] rounded-[15px] flex items-center justify-center">
            <img
              src={"/total-products-icon.png"}
              alt={` icon`}
              width={34}
              height={34}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default DashboardStats;
