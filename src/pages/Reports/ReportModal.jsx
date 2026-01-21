import { IoClose } from "react-icons/io5";
import { formatDate } from "../../utils/formatDate";
import ImageSlider from "./ImageSlider";
import { useState } from "react";

const ReportModal = ({ showPopup, togglePopup, report }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  return (
    showPopup && (
      <div className="w-full h-screen flex items-center justify-center px-6 fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white w-full max-h-[80vh] overflow-y-auto max-w-[461px] p-5 lg:p-7 rounded-[16px]">
          <div className="w-full flex items-center justify-between">
            <h2 className="font-bold text-[24px] leading-none tracking-tight">
              User Report
            </h2>
            <button type="button" onClick={togglePopup}>
              <IoClose className="text-2xl text-gray-600" />
            </button>
          </div>

          <div className="w-full mt-5 flex items-center justify-start gap-x-14 gap-4">
            <div className="w-1/2 border-r">
              <p className="text-sm text-[var(--secondary-color)]">Reporter</p>
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={
                    report?.reporter?.profilePictureUrl
                      ? report?.reporter?.profilePictureUrl
                      : "/profile-icon.png"
                  }
                  alt={`${report?.reporter?.name} profile picture`}
                  className="w-[35px] h-[35px] object-cover rounded-full"
                />
                <span className="text-sm font-normal">
                  {report?.reporter?.name}
                </span>
              </div>
            </div>
            <div className="w-1/2">
              <p className="text-sm text-[var(--secondary-color)]">
                Reported Date
              </p>

              <p className="text-sm font-normal mt-2">
                {formatDate(report?.createdAt)}
              </p>
            </div>
          </div>

          <div className="w-full border mb-3 mt-5" />

          <div className="w-full">
            <p className="text-base font-medium mt-2">Description</p>
            <div className="w-full max-h-[200px] overflow-y-auto">
              <p className="text-sm font-normal leading-[1.2] mt-3 text-gray-500">
                {report?.description}
              </p>
            </div>
          </div>

          {report?.images && report?.images?.length > 0 && (
            <>
              <div className="w-full border mb-3 mt-5" />
              <p className="text-base font-medium">Images</p>
              <div className="w-full flex items-center gap-2 mt-2 flex-wrap">
                {report?.images?.map((img, index) => {
                  return (
                    <img
                      src={img}
                      alt=""
                      key={index}
                      onClick={() => {
                        setShowImageModal(true);
                        setInitialSlide(index);
                      }}
                      className="w-[50px] h-[50px] object-cover rounded-lg cursor-pointer"
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>

        <ImageViewModal
          reportDetails={report}
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          initialSlide={initialSlide}
        />
      </div>
    )
  );
};

export default ReportModal;

export const ImageViewModal = ({
  reportDetails,
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
          <ImageSlider
            images={reportDetails?.images}
            initialSlide={initialSlide}
          />
        </div>
      </div>
    )
  );
};
