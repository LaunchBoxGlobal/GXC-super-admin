import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useUpdateUserStatusMutation } from "../../services/users/usersApi";

const MemberCard = ({ member, i, fetchCommunityMembers }) => {
  const [isPending, setIsPending] = useState(false);

  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleBlockUser = async () => {
    setIsPending(true);

    const newStatus = member?.status === "active" ? "suspended" : "active";

    try {
      const res = await updateUserStatus({
        userId: member?.userId,
        status: newStatus,
      }).unwrap();

      enqueueSnackbar(
        res?.message ||
          (newStatus === "active"
            ? "Member unbanned successfully!"
            : "Member banned successfully!"),
        { variant: "success" }
      );

      // Optional: keep for backward compatibility
      fetchCommunityMembers?.();
    } catch (error) {
      enqueueSnackbar(
        error?.data?.message || "Failed to update member status",
        { variant: "error" }
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className={`w-full py-4 ${
        i === 0 && "pt-0"
      } flex items-center justify-between ${i !== 9 && "border-b"}`}
    >
      <div className="flex items-center gap-2">
        <img
          src={
            member?.profilePictureUrl
              ? member?.profilePictureUrl
              : "/profile-icon.png"
          }
          alt="user profile placeholder"
          className="w-[37px] h-[37px] object-cover rounded-full"
        />

        <div>
          <p className="font-medium text-sm leading-none">{member?.fullName}</p>

          {member?.email && (
            <p className="font-normal text-sm text-[var(--secondary-color)] leading-none mt-1">
              {member?.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={member?.status === "active"}
            onChange={handleBlockUser}
            disabled={isPending}
            className="sr-only peer"
          />
          <div
            className={`relative w-11 h-6 rounded-full transition ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            } 
              bg-gray-200 peer-checked:bg-black
              after:content-[''] after:absolute after:top-[2px] after:start-[2px]
              after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-all
              peer-checked:after:translate-x-full`}
          />
        </label>
      </div>
    </div>
  );
};

export default MemberCard;
