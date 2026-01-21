import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Loader from "../../components/Loader/Loader";
import { FaStar } from "react-icons/fa";
import { useUpdateUserStatusMutation } from "../../services/users/usersApi";
import { handleApiError } from "../../utils/handleApiError";

const UserHeader = ({ user, setShowModal }) => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(user?.status);

  const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation();

  // keep local state in sync with cache updates
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
    } catch (error) {
      handleApiError(error, navigate);
    }
  };

  return (
    <div className="w-full bg-white custom-shadow p-5 rounded-[15px] flex items-center justify-between gap-5 flex-wrap mt-5">
      <div className="flex flex-row items-start md:items-center gap-4">
        <img
          src={user?.profilePictureUrl || "/profile-icon.png"}
          alt="user profile"
          className="lg:h-[116px] lg:w-[116px] h-[55px] w-[55px] rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold text-[20px] lg:text-[32px]">
            {user?.fullName}
          </h2>

          <div className="flex items-center gap-1.5">
            <FaStar className="text-[var(--rating-yellow)] text-lg" />
            <p className="text-base font-semibold">{user?.averageRating}</p>
            <button
              type="button"
              disabled={user?.totalReviews <= 0}
              onClick={() => setShowModal(true)}
              className="text-sm underline"
            >
              {user?.totalReviews} Reviews
            </button>
          </div>

          <div className="mt-3 flex gap-4 flex-wrap text-sm">
            {user?.email && <p>{user.email}</p>}
            {user?.phone && <p>{user.phone}</p>}
            {user?.address && (
              <p>
                {user.address.length > 30
                  ? `${user.address.slice(0, 30)}...`
                  : user.address}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-[140px]">
        <button
          type="button"
          onClick={blockUser}
          disabled={isLoading}
          className="button lg:min-w-[120px]"
        >
          {isLoading ? (
            <Loader />
          ) : userStatus === "active" ? (
            "Suspend"
          ) : (
            "Unblock"
          )}
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
