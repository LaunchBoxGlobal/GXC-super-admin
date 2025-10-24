import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import TransactionHistory from "./TransactionHistory";
import WithdrawalHistory from "./WithdrawalHistory";

const UserRevenuePage = () => {
  const [activeHistory, setActiveHistory] = useState("transaction");
  useEffect(() => {
    document.title = "User Revenue - GiveXChange";
  }, []);
  return (
    <div className="w-full bg-[#EAEAEA] rounded-[10px] p-5">
      <div className="w-full flex justify-between">
        <PageTitle title={`Revenue Details`} />
      </div>

      <div className="w-full bg-white p-5 lg:p-8 rounded-[12px] mt-5 mb-7 flex items-center justify-between gap-4">
        <div className="space-y-3">
          <p className="text-[20px] font-medium text-[#A0A0A0] leading-[1]">
            Total Revenue
          </p>
          <p className="text-[40px] font-bold leading-[1] tracking-tight">
            $ 3,5362
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[20px] font-medium text-[#A0A0A0] leading-[1]">
            Available Balance
          </p>
          <p className="text-[40px] font-bold leading-[1] tracking-tight">
            $ 2,530
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between">
        <PageTitle title={`Transaction History`} />
        <SearchField placeholder={`Search`} />
      </div>

      <div className="w-full bg-white p-5 rounded-[12px] mt-5">
        <div className="w-full flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveHistory("transaction")}
            className={`border-b-2 pb-1 text-sm ${
              activeHistory === "transaction" ? "border-black" : "border-white"
            }`}
          >
            Transaction History
          </button>
          <button
            type="button"
            onClick={() => setActiveHistory("withdrawal")}
            className={`border-b-2 pb-1 text-sm ${
              activeHistory === "withdrawal" ? "border-black" : "border-white"
            }`}
          >
            Withdrawal History
          </button>
        </div>

        <div className="w-full mt-3">
          {activeHistory === "transaction" ? (
            <TransactionHistory />
          ) : (
            <WithdrawalHistory />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRevenuePage;
