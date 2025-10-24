import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import CommunityProductList from "./CommunityPRoductList";
import CommunityInfo from "./CommunityInfo";
import Tabs from "./Tabs";

const CommunityDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Products (150)");

  useEffect(() => {
    document.title = "Community Details - GiveXChange";
  }, []);

  return (
    <div className="w-full bg-[#EAEAEA] rounded-[10px] p-5">
      <PageTitle title={`Community Details`} />

      <CommunityInfo />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <CommunityProductList activeTab={activeTab} />
    </div>
  );
};

export default CommunityDetailsPage;
