import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import UserHeader from "./UserHeader";
import UserCommunities from "./UserCommunities";
import UserProductList from "./UserProductList";
import UserReviewsModal from "./UserReviewsModal";
import { useGetUserProfileQuery } from "../../services/users/usersApi";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError, error } = useGetUserProfileQuery(userId, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const user = data?.data?.user;

  useEffect(() => {
    document.title = "User Details - giveXchange";
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
      <div className="w-full bg-white min-h-[80vh] custom-shadow p-5 rounded-[10px]">
        <PageTitle title="Member Details" />

        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <UserHeader user={user} setShowModal={setShowModal} />

            {user?.products && user.products.length > 0 ? (
              <UserProductList
                products={user.products}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                loading={isLoading}
              />
            ) : (
              <div className="w-full mt-10 text-center pt-32">
                <p className="text-sm font-medium text-gray-500">
                  No products found!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {showModal && (
        <UserReviewsModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default UserDetailsPage;
