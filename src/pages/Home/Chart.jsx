import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CommunitiesDropdown from "./CommunitiesDropdown";
import PeriodSelector from "./PeriodSelector";
import { useGetRevenueStatsQuery } from "../../services/dashboardApi/dashboardApi";

const Chart = ({
  communities,
  selectedCommunities,
  setSelectedCommunities,
}) => {
  const [chartType, setChartType] = useState("monthly");

  const { data, isError, error } = useGetRevenueStatsQuery(
    { communities: selectedCommunities },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const weekly = data?.data?.weekly || [];
  const monthly = data?.data?.monthly || [];
  const yearly = data?.data?.yearly || [];

  const getChartData = () => {
    if (chartType === "weekly") {
      return weekly.map((d) => ({
        label: d.day_name,
        revenue: Number(d.revenue),
        users: d.total_members,
        transactions: d.total_transactions,
      }));
    }

    if (chartType === "monthly") {
      return monthly.map((d) => ({
        label: new Date(d.date).getDate(),
        revenue: Number(d.revenue),
        users: d.total_members,
        transactions: d.total_transactions,
      }));
    }

    if (chartType === "yearly") {
      return yearly.map((d) => ({
        label: d.month_name,
        revenue: Number(d.revenue),
        users: d.total_members,
        transactions: d.total_transactions,
      }));
    }

    return [];
  };

  const chartData = getChartData();

  useEffect(() => {
    if (weekly.length >= 2) setChartType("weekly");
    else if (monthly.length >= 2) setChartType("monthly");
    else if (yearly.length >= 2) setChartType("yearly");
    else setChartType("monthly");
  }, [weekly, monthly, yearly]);

  if (isError) {
    return (
      <div className="w-full bg-white custom-shadow p-5 rounded-[12px] mt-8 min-h-[50vh] flex items-center justify-center">
        <p className="text-sm font-medium text-gray-500 text-center">
          {error?.data?.message || error?.error || "Something went wrong."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white custom-shadow p-5 rounded-[12px] mt-8">
      <div className="w-full flex items-center justify-between flex-wrap">
        <h2 className="font-semibold text-[23px] tracking-tight">Revenue</h2>

        <div className="flex items-center gap-4 flex-wrap">
          <PeriodSelector chartType={chartType} setChartType={setChartType} />

          <CommunitiesDropdown
            communities={communities}
            selectedCommunities={selectedCommunities}
            setSelectedCommunities={setSelectedCommunities}
          />
        </div>
      </div>

      <div className="w-full border my-3" />

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 20, right: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />

            <YAxis
              yAxisId="left"
              tick={false}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Revenue",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tick={false}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Users / Transactions",
                angle: -90,
                position: "insideRight",
              }}
            />

            <Tooltip />
            <Legend />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#000"
              strokeWidth={2}
              dot
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="users"
              stroke="#1E90FF"
              strokeWidth={2}
              dot
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="transactions"
              stroke="#FF5733"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
