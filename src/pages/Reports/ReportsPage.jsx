import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import ReportsTable from "./ReportsTable";

const ReportsPage = () => {
  useEffect(() => {
    document.title = "Reports - GiveXChange";
  }, []);
  return (
    <div className="w-full bg-[#EAEAEA] rounded-[10px] p-5">
      <div className="w-full flex justify-between">
        <PageTitle title={`Report`} />
        <SearchField placeholder={`Search`} />
      </div>

      <ReportsTable />
    </div>
  );
};

export default ReportsPage;
