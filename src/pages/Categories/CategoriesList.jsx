import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import CategoryAddedSuccessModal from "./CategoryAddedSuccessModal";
import { HiPencil } from "react-icons/hi2";

const CategoriesList = ({ categories, fetchCategories }) => {
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [openDeleteCategoryModal, setOpenDeleteCategoryModal] = useState(false);
  const [editable, setEditable] = useState(null);
  const [categoryAdded, setCategoryAdded] = useState(false);

  return (
    <div className="w-full overflow-x-auto relative bg-white custom-shadow rounded-[10px] px-3 pt-3 mt-5">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead className="text-xs text-gray-700 light-green-bg whitespace-nowrap rounded-r-lg">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium whitespace-nowrap text-start rounded-l-lg"
              >
                Category Name
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium text-start"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium text-end rounded-r-lg"
              >
                Edit
              </th>
            </tr>
          </thead>
          {categories?.map((c, i) => {
            return (
              <tr
                key={i}
                className="bg-white border-b border-gray-400 whitespace-nowrap"
              >
                <td className="px-6 py-4 border-b text-sm">
                  <h2 className="text-sm font-medium text-gray-500">
                    {c?.name}
                  </h2>
                </td>
                <td className="px-6 py-4 border-b text-sm">
                  <h2 className="text-sm font-medium text-gray-500">
                    {formatDate(c?.created_at)}
                  </h2>
                </td>
                <td className="px-6 py-4 border-b text-sm whitespace-nowrap text-end flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setEditable(c);
                      setOpenEditCategoryModal(true);
                    }}
                    className="bg-[var(--button-bg)] w-[31px] h-[31px] rounded-[6px] flex items-center justify-center"
                  >
                    <HiPencil className="text-white" />
                  </button>
                </td>
              </tr>
              // <div
              //   key={c?.id}
              //   className={`w-full flex items-center justify-between py-3 px-5 ${
              //     !isLast ? "border-b border-gray-300" : ""
              //   }`}
              // >
              //   <div className="w-[70%] flex items-center">
              //     <div className="w-1/2 lg:w-[30%]">
              //       <h2 className="text-sm font-medium text-gray-500">
              //         {c?.name}
              //       </h2>
              //     </div>
              //     <div>
              //       <h2 className="text-sm font-medium text-gray-500">
              //         {formatDate(c?.created_at)}
              //       </h2>
              //     </div>
              //   </div>
              //   <div className="w-[30%] flex justify-end pr-2 space-x-2">
              //     <button
              //       type="button"
              //       onClick={() => {
              //         setEditable(c);
              //         setOpenEditCategoryModal(true);
              //       }}
              //       className="bg-[var(--button-bg)] w-[31px] h-[31px] rounded-[6px] flex items-center justify-center"
              //     >
              //       <HiPencil className="text-white" />
              //     </button>
              //   </div>
              // </div>
            );
          })}
        </table>
      </div>

      <EditCategoryModal
        openEditCategoryModal={openEditCategoryModal}
        setOpenEditCategoryModal={setOpenEditCategoryModal}
        editable={editable}
        setCategoryAdded={setCategoryAdded}
        fetchCategories={fetchCategories}
      />

      <DeleteCategoryModal
        openDeleteCategoryModal={openDeleteCategoryModal}
        setOpenDeleteCategoryModal={setOpenDeleteCategoryModal}
      />

      <CategoryAddedSuccessModal
        categoryAdded={categoryAdded}
        setCategoryAdded={setCategoryAdded}
        isEditable={true}
        fetchCategories={fetchCategories}
      />
    </div>
  );
};

export default CategoriesList;
