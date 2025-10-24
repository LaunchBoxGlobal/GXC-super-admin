import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import RequestsTable from "./RequestsTable";

const WithdrawRequests = () => {
  useEffect(() => {
    document.title = "Withdrawal Requests - GiveXChange";
  }, []);
  return (
    <div className="w-full bg-[#EAEAEA] rounded-[10px] p-5">
      <div className="w-full flex justify-between">
        <PageTitle title={`Withdraw Requests`} />
        <SearchField placeholder={`Search`} />
      </div>

      <RequestsTable />
    </div>
  );
};

export default WithdrawRequests;
