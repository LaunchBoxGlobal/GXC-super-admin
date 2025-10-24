import SearchField from "../../components/Common/SearchField";
import PageTitle from "../../components/Common/PageTitle";
import CommunityCard from "../../components/Common/CommunityCard";

const UserCommunities = () => {
  return (
    <div className="w-full mt-5 lg:mt-7">
      <div className="w-full flex justify-between">
        <PageTitle title={`Communities`} />
        <SearchField placeholder={`Search`} />
      </div>

      <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
    </div>
  );
};

export default UserCommunities;
