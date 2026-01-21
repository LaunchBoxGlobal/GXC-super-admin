import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PageTitle from "../../components/Common/PageTitle";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import Header from "./Header";
import CommunitiesList from "./CommunitiesList";
import { useGetUserProfileQuery } from "../../services/users/usersApi";

const CommunityOwnerDetailsPage = () => {
  const { ownerId } = useParams();

  const { data, isLoading, isError, error, refetch } = useGetUserProfileQuery(
    ownerId,
    {
      skip: !ownerId,
      refetchOnMountOrArgChange: true,
    }
  );

  const user = data?.data?.user;

  useEffect(() => {
    document.title = "Community Owner Details - giveXchange";
  }, []);

  if (isError) {
    return (
      <PageError
        errorMessage={
          error?.data?.message || error?.error || "Something went wrong!"
        }
      />
    );
  }

  return (
    <div className="w-full relative bg-white rounded-[10px]">
      <div className="w-full bg-white custom-shadow p-5 rounded-[10px] min-h-screen">
        <PageTitle title="Community Owner Details" />

        {isLoading ? <PageLoader /> : <Header user={user} refetch={refetch} />}

        <CommunitiesList />
      </div>
    </div>
  );
};

export default CommunityOwnerDetailsPage;
