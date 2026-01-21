import Pagination from "../Users/Pagination";
import ReportsTable from "./ReportsTable";

const AppReportsPage = ({ reports, pagination, page, userType }) => {
  return (
    <>
      {reports.length > 0 ? (
        <ReportsTable reports={reports} userType={userType} />
      ) : (
        <div className="w-full min-h-[70vh] flex items-center justify-center">
          <p className="text-sm text-gray-500 font-medium">No reports found!</p>
        </div>
      )}

      <Pagination pagination={pagination} page={page} />
    </>
  );
};

export default AppReportsPage;
