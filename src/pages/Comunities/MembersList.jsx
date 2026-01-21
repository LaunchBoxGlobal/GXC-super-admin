import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import MemberCard from "./MemberCard";
import { useGetCommunityMembersQuery } from "../../services/communityApi/communityApi";

const MembersList = ({ communityId }) => {
  const LIMIT = 1000;
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";

  const { data, isLoading, isError, error, refetch } =
    useGetCommunityMembersQuery(
      {
        communityId,
        limit: LIMIT,
      },
      {
        skip: !communityId,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
      }
    );

  const members = data?.data?.members || [];

  if (isLoading) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex items-center justify-center px-5 mt-10">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-white min-h-[60vh] flex items-center justify-center px-5 mt-10">
        <p className="text-sm font-medium text-gray-500">
          {error?.data?.message || error?.error || "Something went wrong."}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white px-5 py-1 rounded-[8px] mt-7 min-h-[40vh]">
      {members.length > 0 ? (
        <>
          {members.map((member, i) => (
            <MemberCard
              key={member?.id || i}
              member={member}
              i={i}
              fetchCommunityMembers={refetch}
            />
          ))}
        </>
      ) : (
        <div className="w-full text-center h-[50vh] flex items-center justify-center px-4">
          <p className="text-sm font-medium text-gray-500">No members found</p>
        </div>
      )}
    </div>
  );
};

export default MembersList;
