import { useParams, useSearchParams } from "react-router-dom";
import CommunityCard from "../../components/Common/CommunityCard";
import PageLoader from "../../components/Loader/PageLoader";
import SearchField from "../../components/Common/SearchField";
import { useGetUserCommunitiesQuery } from "../../services/communityApi/communityApi";

const CommunitiesList = () => {
  const { ownerId } = useParams();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";

  const { data, isLoading, isFetching, isError, error } =
    useGetUserCommunitiesQuery(
      {
        ownerId,
        search: searchValue,
        status: "active",
      },
      {
        skip: !ownerId,
        refetchOnMountOrArgChange: true,
      }
    );

  const communities = data?.data || [];
  const displayCount = communities.length;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="w-full bg-white mt-8">
      <div className="w-full flex items-center justify-between gap-5 flex-wrap">
        <h3 className="text-[24px] lg:text-[32px] font-semibold leading-none flex items-center gap-2">
          Communities ({displayCount})
        </h3>
        <SearchField placeholder="Search community" />
      </div>

      {isFetching && (
        <div className="w-full mt-5 text-center min-h-[50vh] pt-20">
          <span className="text-[var(--secondary-color)] font-medium text-sm">
            Searching...
          </span>
        </div>
      )}

      {communities.length > 0 ? (
        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((community) => (
            <CommunityCard
              key={community?.id || community?.slug || community?.name}
              community={community}
            />
          ))}
        </div>
      ) : isError ? (
        <div className="w-full mt-5 text-center min-h-[50vh] pt-20">
          <p className="text-gray-500">
            {error?.data?.message ||
              error?.error ||
              "Something went wrong. Try again."}
          </p>
        </div>
      ) : (
        <div className="w-full mt-5 text-center min-h-[50vh] pt-20">
          <p className="text-[var(--secondary-color)] font-medium text-sm">
            {searchValue
              ? `No communities found matching "${searchValue}".`
              : "No communities found!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunitiesList;
