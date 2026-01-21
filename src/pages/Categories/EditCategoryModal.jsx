import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEditCategoryMutation } from "../../services/categoriesApi/categoriesApi";
import { handleApiError } from "../../utils/handleApiError";
import Loader from "../../components/Loader/Loader";

const EditCategoryModal = ({
  openEditCategoryModal,
  setOpenEditCategoryModal,
  setCategoryAdded,
  editable,
}) => {
  const navigate = useNavigate();
  const [editCategory, { isLoading }] = useEditCategoryMutation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Category name is required")
      .min(3, "Category name must be at least 3 characters")
      .max(20, "Category name must be at most 20 characters")
      .matches(
        /^[A-Za-z\s]+$/,
        "Only letters are allowed (no numbers or symbols)"
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: editable?.name || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const trimmedName = values.name.trim();

        await editCategory({
          categoryId: editable?.id,
          name: trimmedName,
        }).unwrap();

        setCategoryAdded(true);
        resetForm();
        setOpenEditCategoryModal(false);
      } catch (error) {
        handleApiError(error, navigate);
      }
    },
  });

  const handleChange = (e) => {
    const value = e.target.value.replace(/[0-9]/g, "");
    formik.setFieldValue("name", value);
  };

  if (!openEditCategoryModal) return null;

  return (
    <div className="w-full h-screen bg-[rgba(0,0,0,0.5)] fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-[471px] rounded-[18px] p-5">
        <div className="w-full flex items-center justify-between gap-4">
          <h2 className="font-semibold text-[24px] leading-none">
            Edit Category
          </h2>
          <button type="button" onClick={() => setOpenEditCategoryModal(false)}>
            <img src="/close-icon.png" alt="close" width={20} height={20} />
          </button>
        </div>

        <div className="w-full border my-5" />

        <form onSubmit={formik.handleSubmit} className="w-full space-y-3">
          <div className="w-full">
            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              className={`w-full h-[49px] bg-[#F5F5F5] rounded-[12px] px-4 outline-none ${
                formik.touched.name && formik.errors.name
                  ? "border border-red-500"
                  : "border border-transparent"
              }`}
              value={formik.values.name}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[49px] bg-[var(--button-bg)] text-white rounded-[12px] text-center font-medium"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
