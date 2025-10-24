import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../data/baseUrl";
import { getToken } from "../../utils/getToken";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import Loader from "../../components/Loader/Loader";

const OwnersTable = ({ users, fetchUsers }) => {
  const [updating, setUpdating] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStatusToggle = async (user) => {
    if (updating) return;
    setUpdating(user.id);
    setLoading(true);

    const newStatus = user.status === "active" ? "suspended" : "active";

    try {
      await axios.put(
        `${BASE_URL}/admin/users/${user?.id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      enqueueSnackbar(`User ${newStatus} successfully`, { variant: "success" });
      fetchUsers();
    } catch (error) {
      console.error("Status update failed:", error);
      enqueueSnackbar("Failed to update user status", { variant: "error" });
    } finally {
      setUpdating(null);
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-auto relative bg-white custom-shadow rounded-[10px] p-3 mt-5">
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 bg-[#504F4E1A]">
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
            {users &&
              users?.map((user, i) => (
                <tr key={i} className="bg-white border-b border-gray-400">
                  <td className="px-6 py-4 border-b text-sm">{user?.id}</td>
                  <td className="px-6 py-4 border-b text-sm">
                    <div className="flex items-center gap-2">
                      {user?.profilePictureUrl ? (
                        <img
                          src={user?.profilePictureUrl}
                          alt="user profile picture"
                          className="w-[43px] h-[43px] object-cover rounded-full"
                        />
                      ) : (
                        <img
                          src="/profile-icon.png"
                          alt="user profile picture"
                          className="w-[43px] h-[43px] object-cover"
                        />
                      )}
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
                    {user?.phone ? user?.phone : "N/A"}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {user?.address
                      ? user?.address?.length > 30
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
                      className="text-xs underline font-medium leading-none tracking-tight text-black"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="w-full h-screen fixed z-50 inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default OwnersTable;
