import { useState } from "react";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Loader from "../../components/Loader/Loader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useUpdateUserStatusMutation } from "../../services/users/usersApi";

const UsersTable = ({ users }) => {
  const [updating, setUpdating] = useState(null);
  const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation();

  const handleStatusToggle = async (user) => {
    if (updating) return;

    const newStatus = user.status === "active" ? "suspended" : "active";
    setUpdating(user.id);

    try {
      await updateUserStatus({
        userId: user.id,
        status: newStatus,
      }).unwrap();

      enqueueSnackbar(`User ${newStatus} successfully`, {
        variant: "success",
      });
    } catch (error) {
    } finally {
      setUpdating(null);
    }
  };
  return (
    <div className="w-full overflow-x-auto relative bg-white min-h-[80vh] custom-shadow rounded-[10px] p-3 mt-5">
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 light-green-bg whitespace-nowrap">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-l-[8px]"
              >
                #
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Name
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Email Address
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Location
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-r-[8px]"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users && users?.length > 0 ? (
              users?.map((user, i) => (
                <tr
                  key={i}
                  className="bg-white border-b border-gray-400 whitespace-nowrap"
                >
                  <td className="px-6 py-4 border-b text-sm">{user?.id}</td>
                  <td className="px-6 py-4 border-b text-sm">
                    <div className="flex items-center gap-2">
                      <LazyLoadImage
                        src={
                          user?.profilePictureUrl
                            ? user?.profilePictureUrl
                            : "/profile-icon.png"
                        }
                        effect="blur"
                        alt="user profile picture"
                        className="min-w-[43px] min-h-[43px] max-w-[43px] max-h-[43px] object-cover rounded-full"
                      />
                      <span className="text-sm font-normal">
                        {user?.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b text-sm whitespace-nowrap">
                    {user?.email
                      ? user?.email?.length > 20
                        ? `${user?.email?.slice(0, 20)}...`
                        : user?.email
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {user?.phone
                      ? user.phone.startsWith("+1")
                        ? user.phone
                        : `+1${user.phone}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {user?.address
                      ? user?.address?.length > 20
                        ? `${user?.address?.slice(0, 20)}...`
                        : user?.address
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.status === "active"}
                        onChange={() => handleStatusToggle(user)}
                        disabled={updating === user.id}
                        className="sr-only peer"
                      />
                      <div
                        className={`relative w-11 h-6 rounded-full transition-all ${
                          user.status === "active"
                            ? "bg-[var(--button-bg)]"
                            : "bg-gray-300"
                        } after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                          user.status === "active"
                            ? "peer-checked:after:translate-x-full"
                            : ""
                        }`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <Link
                      to={`/users/details/${user?.fullName}/${user?.id}`}
                      className="text-sm underline font-medium leading-none tracking-tight text-[var(--primary-color)]"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>

        {users && users?.length <= 0 && (
          <div className="w-full min-h-[80vh] flex items-center text-center justify-center">
            <p className="text-gray-600 font-normal text-center mx-auto">
              No users found!
            </p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="w-full h-screen fixed z-50 inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default UsersTable;
