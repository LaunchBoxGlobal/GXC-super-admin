import { useState } from "react";
import { Link } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Loader from "../../components/Loader/Loader";
import { useUpdateUserStatusMutation } from "../../services/usersApi/usersApi";

const OwnersTable = ({ users, fetchUsers }) => {
  const [updating, setUpdating] = useState(null);
  const [loading, setLoading] = useState(false);

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleStatusToggle = async (user) => {
    if (updating) return;

    setUpdating(user.id);
    setLoading(true);

    const newStatus = user.status === "active" ? "suspended" : "active";

    try {
      await updateUserStatus({
        userId: user.id,
        status: newStatus,
      }).unwrap();

      enqueueSnackbar(`User ${newStatus} successfully`, {
        variant: "success",
      });

      // keep existing behavior
      fetchUsers();
    } catch (error) {
      enqueueSnackbar(
        error?.data?.message || error?.error || "Failed to update user status",
        { variant: "error" }
      );
    } finally {
      setUpdating(null);
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-auto relative bg-white min-h-[80vh] custom-shadow rounded-[10px] p-3 mt-5">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 light-green-bg whitespace-nowrap">
            <tr>
              <th className="px-6 py-4 text-sm font-medium rounded-l-[8px]">
                #
              </th>
              <th className="px-6 py-4 text-sm font-medium">Name</th>
              <th className="px-6 py-4 text-sm font-medium">Email Address</th>
              <th className="px-6 py-4 text-sm font-medium">Phone Number</th>
              <th className="px-6 py-4 text-sm font-medium">Location</th>
              <th className="px-6 py-4 text-sm font-medium">Status</th>
              <th className="px-6 py-4 text-sm font-medium rounded-r-[8px]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user, i) => (
              <tr
                key={i}
                className="bg-white border-b border-gray-400 whitespace-nowrap"
              >
                <td className="px-6 py-4 text-sm">{user.id}</td>

                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.profilePictureUrl || "/profile-icon.png"}
                      alt="user profile"
                      className="w-[43px] h-[43px] object-cover rounded-full"
                    />
                    <span>{user.fullName}</span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm">
                  {user.email
                    ? user.email.length > 20
                      ? `${user.email.slice(0, 20)}...`
                      : user.email
                    : "N/A"}
                </td>

                <td className="px-6 py-4 text-sm">{user.phone || "N/A"}</td>

                <td className="px-6 py-4 text-sm">
                  {user.address
                    ? user.address.length > 30
                      ? `${user.address.slice(0, 20)}...`
                      : user.address
                    : "N/A"}
                </td>

                <td className="px-6 py-4 text-sm">
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
                      } after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                        after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:after:translate-x-full`}
                    />
                  </label>
                </td>

                <td className="px-6 py-4 text-sm">
                  <Link
                    to={`/users/details/${user.fullName}/${user.id}`}
                    className="text-sm underline font-medium text-[var(--primary-color)]"
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
        <div className="w-full h-screen fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)]">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default OwnersTable;
