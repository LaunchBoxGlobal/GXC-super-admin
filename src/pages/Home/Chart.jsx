import { LineChart } from "@mui/x-charts/LineChart";

const Chart = () => {
  return (
    <div className="w-full bg-white custom-shadow p-5 rounded-[12px] mt-5">
      <div className="w-full flex items-start md:items-center justify-between">
        <h2 className="font-semibold text-[23px] tracking-tight">Revenue</h2>

        <div className="flex items-center justify-center md:justify-end gap-3">
          <div className="flex items-center gap-1.5">
            <input type="radio" name="timeline" id="timeline" />
            <label
              htmlFor=""
              className={`text-xs text-[var(--secondary-color)]`}
            >
              Weekly
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            <input type="radio" name="timeline" id="timeline" />
            <label
              htmlFor=""
              className={`text-xs text-[var(--secondary-color)]`}
            >
              Monthly
            </label>
          </div>
          <div className="flex items-center gap-1.5">
            <input type="radio" name="timeline" id="timeline" />
            <label
              htmlFor=""
              className={`text-xs text-[var(--secondary-color)]`}
            >
              Yearly
            </label>
          </div>
        </div>
      </div>

      <div className="w-full border mb-4 mt-2" />
      <LineChart
        xAxis={[
          {
            scaleType: "point",
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        ]}
        series={[
          {
            color: "black",
            data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default Chart;
