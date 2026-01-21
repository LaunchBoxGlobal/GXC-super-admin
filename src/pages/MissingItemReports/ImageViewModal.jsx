import { IoClose } from "react-icons/io5";
import ImageSlider from "../Reports/ImageSlider";

const ImageViewModal = ({
  images,
  showImageModal,
  setShowImageModal,
  initialSlide,
}) => {
  return (
    showImageModal && (
      <div className="w-full h-screen fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center px-4">
        <button
          type="button"
          onClick={() => setShowImageModal(false)}
          className="absolute top-5 right-5 text-white text-3xl font-bold z-50"
        >
          <IoClose />
        </button>

        <div className="max-w-[1200px] w-full h-[90vh] flex items-center justify-center">
          <ImageSlider images={images} initialSlide={initialSlide} />
        </div>
      </div>
    )
  );
};

export default ImageViewModal;
