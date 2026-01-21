import { useEffect, useState } from "react";
import DashboardStats from "./DashboardStats";
import Chart from "./Chart";
import { useAppContext } from "../../context/AppContext";
import Loader from "../../components/Loader/Loader";
import {
  useGetDashboardStatsQuery,
  useGetCommunitiesQuery,
} from "../../services/dashboardApi/dashboardApi";

const DashboardPage = () => {
  const { user } = useAppContext();

  const [selectedCommunities, setSelectedCommunities] = useState([]);

  const {
    data: statsData,
    isLoading: loadingStats,
    isError: statsError,
    error: statsErrorObj,
  } = useGetDashboardStatsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: communitiesData,
    isLoading: loadingCommunities,
    isError: communitiesError,
    error: communitiesErrorObj,
  } = useGetCommunitiesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const loading = loadingStats || loadingCommunities;
  const error = statsError || communitiesError;

  useEffect(() => {
    document.title = "Dashboard - giveXchange";
  }, []);

  return (
    <div className="w-full p-5 bg-[#fff] custom-shadow rounded-[10px] min-h-screen">
      {user && (
        <p className="text-[var(--secondary-color)] font-medium">
          Hello {user?.fullName},
        </p>
      )}

      <h2 className="font-semibold text-[24px] lg:text-[32px] leading-[1] tracking-tight mt-2">
        Welcome to giveXchange
      </h2>

      {loading ? (
        <div className="w-full flex items-center justify-center min-h-[70vh]">
          <Loader />
        </div>
      ) : (
        <>
          <DashboardStats stats={statsData?.data} />
          <Chart
            communities={communitiesData?.data}
            selectedCommunities={selectedCommunities}
            setSelectedCommunities={setSelectedCommunities}
          />
        </>
      )}

      {error && (
        <div className="w-full flex items-center justify-center text-center min-h-[70vh]">
          <p className="text-sm text-gray-500">
            {statsErrorObj?.data?.message ||
              communitiesErrorObj?.data?.message ||
              "Something went wrong."}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
