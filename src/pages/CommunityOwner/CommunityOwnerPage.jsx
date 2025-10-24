import { useEffect, useState, useCallback } from "react";
import PageTitle from "../../components/Common/PageTitle";
import { LuSearch } from "react-icons/lu";
import axios from "axios";
import { BASE_URL } from "../../data/baseUrl";
import { getToken } from "../../utils/getToken";
import PageLoader from "../../components/Loader/PageLoader";
import PageError from "../../components/Loader/PageError";
import { useNavigate, useSearchParams } from "react-router-dom";
import OwnerCommunityList from "./OwnerCommunityList";

const CommuntityOwnerPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/users?userType=community_owner&page=${page}&limit=${limit}${
          searchValue ? `&search=${searchValue}` : ""
        }`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      setUsers(response?.data?.data?.users || []);
      setPagination(response?.data?.data?.pagination || null);
      setError(null);
    } catch (error) {
      console.error("Users fetch error:", error);
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  }, [page, searchValue]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [fetchUsers]);

  useEffect(() => {
    document.title = "Users - GiveXChange";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handlePageChange = (newPage) => {
    if (!pagination || newPage < 1 || newPage > pagination.totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    navigate(`?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    if (!pagination) return null;
    const { totalPages } = pagination;
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (end - start < maxVisible - 1) {
      if (page < totalPages / 2) {
        end = Math.min(totalPages, start + maxVisible - 1);
      } else {
        start = Math.max(1, end - maxVisible + 1);
      }
    }

    // First page
    if (start > 1) {
      pages.push(
        <li key={1}>
          <button
            onClick={() => handlePageChange(1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight font-medium rounded-[12px] ${
              page === 1
                ? "text-white bg-[var(--button-bg)]"
                : "text-gray-600 hover:bg-[var(--button-bg)] hover:text-white"
            }`}
          >
            1
          </button>
        </li>
      );
      if (start > 2) {
        pages.push(
          <li key="start-ellipsis">
            <span className="px-2 text-gray-500">...</span>
          </li>
        );
      }
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            aria-current={i === page ? "page" : undefined}
            className={`flex items-center justify-center px-4 h-10 leading-tight font-medium rounded-[12px] ${
              i === page
                ? "text-white bg-[var(--button-bg)]"
                : "text-gray-600 hover:bg-[var(--button-bg)] hover:text-white"
            }`}
          >
            {i}
          </button>
        </li>
      );
    }

    // Last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(
          <li key="end-ellipsis">
            <span className="px-2 text-gray-500">...</span>
          </li>
        );
      }
      pages.push(
        <li key={totalPages}>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`flex items-center justify-center px-4 h-10 leading-tight font-medium rounded-[12px] ${
              page === totalPages
                ? "text-white bg-[var(--button-bg)]"
                : "text-gray-600 hover:bg-[var(--button-bg)] hover:text-white"
            }`}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  // ✅ Error screen
  if (error) return <PageError errorMessage={error} />;

  return (
    <div className="w-full bg-[#fff] rounded-[10px]">
      {/* Header */}

      <div className="w-full bg-white p-5 rounded-[10px] custom-shadow">
        <div className="w-full flex justify-between items-center mb-3 bg-white">
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

        {/* Table / Loader */}
        {loading ? (
          <PageLoader />
        ) : (
          <OwnerCommunityList
            users={users}
            pagination={pagination}
            fetchUsers={fetchUsers}
          />
        )}

        {/* ✅ Pagination */}
        <div className="w-full flex justify-end">
          {pagination && pagination.totalPages > 1 && (
            <nav
              aria-label="Page navigation"
              className="flex justify-end w-full max-w-[380px] mt-10"
            >
              <ul className="inline-flex items-center gap-2 px-2 text-base h-[58px] bg-[#dfdfdf] rounded-[12px]">
                {/* Previous */}
                <li>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                    className={`flex items-center justify-center px-4 h-10 leading-tight font-medium rounded-[12px] ${
                      page <= 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-[var(--button-bg)] hover:text-white"
                    }`}
                  >
                    Previous
                  </button>
                </li>

                {/* Pages */}
                {renderPageNumbers()}

                {/* Next */}
                <li>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= pagination.totalPages}
                    className={`flex items-center justify-center px-4 h-10 leading-tight font-medium rounded-[12px] ${
                      page >= pagination.totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-[var(--button-bg)] hover:text-white"
                    }`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommuntityOwnerPage;
