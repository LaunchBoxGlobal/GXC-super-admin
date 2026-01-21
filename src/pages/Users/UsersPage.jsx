import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import UsersTable from "./UsersTable";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import Pagination from "./Pagination";
import { LuSearch } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { useGetUsersQuery } from "../../services/users/usersApi";

const UsersPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data, isLoading, isError, error } = useGetUsersQuery(
    {
      page,
      limit,
      userType: "regular_user",
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
    document.title = "Users - giveXchange";
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
    <div className="w-full bg-[#fff] rounded-[10px] min-h-screen">
      <div className="w-full bg-white p-5 rounded-[10px] custom-shadow">
        <div className="w-full flex justify-between items-center mb-3 bg-white flex-wrap gap-y-4">
          <PageTitle title="Users" />

          <div className="w-full h-[41px] rounded-[8px] max-w-[252px] bg-white custom-shadow flex items-center gap-2 px-3">
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

        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <UsersTable
              users={users}
              pagination={pagination}
              // fetchUsers={refetch}
            />

            <Pagination page={page} pagination={pagination} />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
