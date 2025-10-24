import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import SearchField from "../../components/Common/SearchField";
import ProductsTable from "./ProductsTable";

const ProductsPage = () => {
  useEffect(() => {
    document.title = "Product Management - GiveXChange";
  }, []);
  return (
    <div className="w-full bg-[#EAEAEA] rounded-[10px] p-5">
      <div className="w-full flex justify-between">
        <PageTitle title={`Product Management`} />
        <SearchField placeholder={`Search`} />
      </div>

      <ProductsTable />
    </div>
  );
};

export default ProductsPage;
