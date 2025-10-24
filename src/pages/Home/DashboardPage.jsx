import { useEffect } from "react";
import DashboardStats from "./DashboardStats";
import Chart from "./Chart";

const DashboardPage = () => {
  useEffect(() => {
    document.title = "Dashboard - GiveXChange";
  }, []);
  return (
    <div className="w-full p-5 bg-[#fff] custom-shadow rounded-[10px]">
      <p className="text-[var(--secondary-color)] font-medium">
        Hello John Doe,
      </p>
      <h2 className="font-semibold text-[32px] leading-[1] tracking-tight mt-2">
        Welcome to Give X Changes
      </h2>

      <DashboardStats />
      <Chart />
    </div>
  );
};

export default DashboardPage;
