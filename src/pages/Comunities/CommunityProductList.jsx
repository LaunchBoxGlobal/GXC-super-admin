import PageTitle from "../../components/Common/PageTitle";
import ProductCard from "../../components/Common/ProductCard";
import SearchField from "../../components/Common/SearchField";
import MembersList from "./MembersList";

const CommunityProductList = ({ activeTab }) => {
  return (
    <div className="w-full bg-[#EAEAEA] rounded-[10px] mt-5 lg:mt-7">
      <div className="w-full flex justify-between">
        <PageTitle title={activeTab} />
        <SearchField placeholder={`Search`} />
      </div>

      {activeTab === "Products (150)" ? (
        <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      ) : (
        <div className="w-full">
          <MembersList />
        </div>
      )}
    </div>
  );
};

export default CommunityProductList;
