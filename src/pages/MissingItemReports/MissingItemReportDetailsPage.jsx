import { useEffect, useState } from "react";
import PageTitle from "../../components/Common/PageTitle";
import { useParams } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import MissingItemOrderDetails from "./MissingItemOrderDetails";
import MissingItemDetails from "./MissingItemDetails";
import SellerDetails from "./SellerDetails";
import BuyerDetails from "./BuyerDetails";
import OrderSummary from "./OrderSummary";
import CancellationReason from "./CancellationReason";
import PickupAddress from "./PickupAddress";
import Error from "./Error";
import ImageViewModal from "./ImageViewModal";
import { useGetMissingItemReportDetailsQuery } from "../../services/reportsApi/reportsApi";

const MissingItemReportDetailsPage = () => {
  const { reportId } = useParams();

  const [showImageModal, setShowImageModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const { data, isLoading, error, refetch } =
    useGetMissingItemReportDetailsQuery(reportId, {
      skip: !reportId,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const reportData = data?.data;

  useEffect(() => {
    document.title = "Report Details - giveXchange";
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  if (!reportId) {
    return <Error error={`Something went wrong.`} />;
  }

  return (
    <div className="w-full bg-[#fff] custom-shadow rounded-[10px] p-5">
      <PageTitle title={`Report Details`} />
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="w-full mt-7 flex flex-col lg:flex-row items-start justify-between gap-x-2 gap-y-5">
          <div className="bg-white custom-shadow p-5 lg:p-8 w-full lg:w-[70%] rounded-[10px] lg:rounded-[18px]">
            <MissingItemOrderDetails data={reportData} />

            {/* missing item report description & images */}
            <div className="w-full border my-4" />
            <div className="w-full">
              <p className="font-semibold leading-none">Description</p>
              <p className="text-sm leading-none mt-2">
                {reportData?.report?.description}
              </p>
              {/* report images */}
              {reportData?.report?.images?.length > 0 && (
                <div className="w-full mt-3 flex items-center justify-start gap-2">
                  {reportData?.report?.images?.map((img, index) => {
                    return (
                      <LazyLoadImage
                        src={img}
                        key={index}
                        onClick={() => {
                          setShowImageModal(true);
                          setInitialSlide(index);
                        }}
                        effect="blur"
                        alt="user profile picture"
                        className="w-[50px] h-[50px] object-cover rounded-lg cursor-pointer"
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pickup address */}
            <PickupAddress data={reportData} />

            {/* Product details */}
            <MissingItemDetails data={reportData} />

            {/* Seller details */}
            <SellerDetails data={reportData} />
            {/* buyer details */}
            <BuyerDetails data={reportData} />
          </div>

          {/* summary */}
          <div className="w-full relative lg:w-[29%]">
            <OrderSummary data={reportData} fetchOrder={refetch} />

            {reportData?.overallStatus === "cancelled" ||
              (reportData?.cancellationReason && (
                <CancellationReason data={reportData} />
              ))}
          </div>
        </div>
      )}

      <ImageViewModal
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        initialSlide={initialSlide}
        images={reportData?.report?.images}
      />
    </div>
  );
};

export default MissingItemReportDetailsPage;
