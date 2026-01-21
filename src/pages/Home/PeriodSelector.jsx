const PeriodSelector = ({ chartType, setChartType }) => {
  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name="timeline"
          value="weekly"
          checked={chartType === "weekly"}
          onChange={() => setChartType("weekly")}
        />
        <span className="text-xs font-medium">Weekly</span>
      </label>

      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name="timeline"
          value="monthly"
          checked={chartType === "monthly"}
          onChange={() => setChartType("monthly")}
        />
        <span className="text-xs font-medium">Monthly</span>
      </label>

      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="radio"
          name="timeline"
          value="yearly"
          checked={chartType === "yearly"}
          onChange={() => setChartType("yearly")}
        />
        <span className="text-xs font-medium">Yearly</span>
      </label>
    </div>
  );
};

export default PeriodSelector;
