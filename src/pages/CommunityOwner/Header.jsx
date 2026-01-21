import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../../utils/handleApiError";
import Loader from "../../components/Loader/Loader";
import { enqueueSnackbar } from "notistack";
import { useUpdateUserStatusMutation } from "../../services/users/usersApi";

const Header = ({ user, refetch }) => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(user?.status);

  const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation();

  useEffect(() => {
    if (user?.status) {
      setUserStatus(user.status);
    }
  }, [user?.status]);

  const blockUser = async () => {
    const newStatus = userStatus === "active" ? "suspended" : "active";

    try {
      await updateUserStatus({
        userId: user.id,
        status: newStatus,
      }).unwrap();

      enqueueSnackbar(
        `User ${
          newStatus === "active" ? "unblocked" : "suspended"
        } successfully`,
        { variant: "success" }
      );
      refetch();
    } catch (error) {
      handleApiError(error, navigate);
    }
  };
  return (
    <div className="w-full bg-white custom-shadow p-5 rounded-[15px] flex items-center justify-between gap-5 flex-wrap mt-5">
      <div className="flex md:flex-row items-start md:items-center gap-4">
        <img
          src={
            user?.profilePictureUrl
              ? user?.profilePictureUrl
              : "/profile-icon.png"
          }
          alt="user profile picture"
          className="max-w-[116px] min-w-[55px] h-[55px] lg:h-[116px] rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-[20px] lg:text-[32px] leading-none tracking-tight">
            {user && user?.fullName}
          </h2>
          <div className="mt-3 flex items-center gap-4 flex-wrap">
            {user && user?.email && (
              <p className="text-sm font-normal leading-none">
                {user && user?.email}
              </p>
            )}
            {user && user?.phone && (
              <p className="text-sm font-normal leading-none">
                {user && user?.phone}
              </p>
            )}
            {user && user?.address && (
              <p className="text-sm font-normal leading-none">
                {user && user?.address?.length > 30
                  ? `${user?.address?.slice(0, 30)}...`
                  : user?.address}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full max-w-[140px] lg:w-auto flex items-center gap-4">
        {userStatus && userStatus === "active" ? (
          <button
            type="button"
            onClick={() => blockUser()}
            disabled={isLoading}
            className="button lg:min-w-[120px]"
          >
            {isLoading ? <Loader /> : "Suspend"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => blockUser()}
            disabled={isLoading}
            className="button lg:min-w-[120px]"
          >
            {isLoading ? <Loader /> : "Active"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
