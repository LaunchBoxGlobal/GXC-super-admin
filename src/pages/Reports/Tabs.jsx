const Tabs = ({ setReportType, reportType }) => {
  return (
    <div className="w-full min-w-[300px] max-w-[350px] h-[41px] bg-white custom-shadow rounded-lg p-1 grid grid-cols-2">
      <button
        type="button"
        onClick={() => {
          setReportType("app_reports");
          const params = new URLSearchParams(searchParams);
          params.set("report_type", "app_report");

          params.set("page", 1);
          setSearchParams(params);
        }}
        className={`${
          reportType === "app_reports"
            ? "bg-black text-white"
            : "bg-white text-black"
        } font-medium text-sm rounded-lg w-full h-full`}
      >
        App Reports
      </button>
      <button
        type="button"
        onClick={() => {
          setReportType("product_reports");

          const params = new URLSearchParams();
          params.set("report_type", "product_reports");
          params.set("page", 1);

          setSearchParams(params, { replace: true });
        }}
        className={`${
          reportType === "product_reports"
            ? "bg-black text-white"
            : "bg-white text-black"
        } font-medium text-sm rounded-lg w-full h-full`}
      >
        Product Reports
      </button>
    </div>
  );
};

export default Tabs;
