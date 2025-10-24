import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../data/baseUrl";
import { getToken } from "../../utils/getToken";
import { handleApiError } from "../../utils/handleApiError";
import Loader from "../../components/Loader/Loader";
import { enqueueSnackbar } from "notistack";

const Header = ({ user, fetchUser }) => {
  const [loading, setLoading] = useState(null);
  const [userStatus, setUserStatus] = useState(user ? user?.status : null);
  const navigate = useNavigate();

  const blockUser = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/users/${user?.id}/status`,
        { status: userStatus === "active" ? "suspended" : "active" },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (response?.data?.success) {
        enqueueSnackbar(response?.data?.message, {
          variant: "success",
        });
        fetchUser();
      }
    } catch (error) {
      handleApiError(error, navigate);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-white custom-shadow p-5 rounded-[15px] flex items-center justify-between gap-5 flex-wrap mt-5">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {user && user?.profilePictureUrl ? (
          <img
            src={user?.profilePictureUrl}
            alt="user profile picture"
            className="max-w-[116px] min-w-[85px] min-h-[85px] max-h-[116px] rounded-full object-cover"
          />
        ) : (
          <img
            src="/profile-icon.png"
            alt="user profile picture"
            className="max-w-[116px] min-w-[85px] min-h-[85px] max-h-[116px] rounded-full"
          />
        )}
        <div>
          <h2 className="font-semibold text-[32px] leading-none tracking-tight">
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
      <div className="w-full lg:w-auto flex items-center gap-4">
        <Link
          to={`/users/details/revenue/${user?.fullName}/${user?.id}`}
          className="outlined-button lg:min-w-[150px] flex items-center justify-center"
        >
          View Revenue
        </Link>

        {userStatus && userStatus === "active" ? (
          <button
            type="button"
            onClick={() => blockUser()}
            disabled={loading}
            className="button lg:min-w-[120px]"
          >
            {loading ? <Loader /> : "Block"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => blockUser()}
            disabled={loading}
            className="button lg:min-w-[120px]"
          >
            {loading ? <Loader /> : "Unblock"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
