import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import { LuSearch } from "react-icons/lu";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import { useSearchParams } from "react-router-dom";
import OwnerCommunityList from "./OwnerCommunityList";
import Pagination from "../Users/Pagination";
import { useGetUsersQuery } from "../../services/users/usersApi";

const CommuntityOwnerPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data, isLoading, isError, error, refetch } = useGetUsersQuery(
    {
      page,
      userType: "community_owner",
      limit,
      search: debouncedSearch,
    },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const users = data?.data?.users || [];
  const pagination = data?.data?.pagination || null;

  useEffect(() => {
    document.title = "Community Owners - giveXchange";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

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
    <div className="w-full bg-[#fff] rounded-[10px]">
      <div className="w-full bg-white p-5 rounded-[10px] custom-shadow">
        {/* Header */}
        <div className="w-full flex justify-between items-center flex-wrap gap-4 mb-3">
          <PageTitle title="Community Owners" />

          <div className="w-full h-[41px] max-w-[252px] bg-white custom-shadow flex items-center gap-2 px-3 rounded-[8px]">
            <LuSearch className="text-xl text-[var(--secondary-color)]" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="w-full bg-white placeholder:text-[var(--secondary-color)] text-[var(--secondary-color)] text-sm outline-none"
            />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <PageLoader />
        ) : (
          <OwnerCommunityList users={users} fetchUsers={refetch} />
        )}

        {/* Shared Pagination */}
        <Pagination page={page} pagination={pagination} />
      </div>
    </div>
  );
};

export default CommuntityOwnerPage;
