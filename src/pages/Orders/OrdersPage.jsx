import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import OrdersTable from "./OrdersTable";

const OrdersPage = () => {
  useEffect(() => {
    document.title = "Order Management - GiveXChange";
  }, []);
  return (
    <div className="w-full bg-[#EAEAEA] rounded-[10px] p-5">
      <div className="w-full flex justify-between">
        <PageTitle title={`Order Management`} />
        <SearchField placeholder={`Search`} />
      </div>

      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
