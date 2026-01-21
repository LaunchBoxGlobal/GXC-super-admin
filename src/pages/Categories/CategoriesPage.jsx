import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import CategoriesList from "./CategoriesList";
import AddCategoryModal from "./AddCategoryModal";
import CategoryAddedSuccessModal from "./CategoryAddedSuccessModal";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import SearchField from "../../components/Common/SearchField";
import { useGetCategoriesQuery } from "../../services/categoriesApi/categoriesApi";

const CategoriesPage = () => {
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [categoryAdded, setCategoryAdded] = useState(false);

  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const LIMIT = 1000;

  const { data, isLoading, isError, error, refetch } = useGetCategoriesQuery(
    {
      limit: LIMIT,
      search: searchValue,
    },
    {
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const categories = data?.data?.categories || [];

  useEffect(() => {
    document.title = "Categories - giveXchange";
  }, []);

  if (isError) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-gray-500 font-medium">
          {error?.data?.message || error?.error || "Something went wrong"}
        </p>
      </div>
    );
  }
  return (
    <div className="w-full bg-[#fff] rounded-[10px]">
      <div className="w-full bg-white p-5 rounded-[10px] min-h-[80vh] custom-shadow">
        <div className="w-full flex justify-between items-center mb-3 bg-white flex-wrap gap-5">
          <PageTitle title="Categories" />
          <div className="w-full flex items-center justify-end flex-wrap gap-3">
            <SearchField placeholder={`Search`} />
            <button
              type="button"
              onClick={() => setOpenAddCategoryModal(true)}
              className="px-5 bg-[var(--button-bg)] h-[41px] text-white rounded-[12px] text-sm font-medium"
            >
              Add New
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full bg-[#fff] rounded-[10px]">
            <div className="w-full flex items-center justify-center min-h-[60vh]">
              <Loader />
            </div>
          </div>
        ) : (
          <>
            {categories && categories?.length > 0 ? (
              <CategoriesList
                categories={categories}
                fetchCategories={refetch}
              />
            ) : (
              <div className="w-full min-h-[80vh] flex items-center text-center justify-center">
                <p className="text-sm text-gray-500 font-medium">
                  No categories found!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <AddCategoryModal
        openAddCategoryModal={openAddCategoryModal}
        setOpenAddCategoryModal={setOpenAddCategoryModal}
        setCategoryAdded={setCategoryAdded}
        fetchCategories={refetch}
      />

      <CategoryAddedSuccessModal
        categoryAdded={categoryAdded}
        setCategoryAdded={setCategoryAdded}
        // fetchCategories={refetch}
        isEditable={false}
      />
    </div>
  );
};

export default CategoriesPage;
