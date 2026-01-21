import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { formatDate } from "../../utils/formatDate";
import { useGetUserReviewsQuery } from "../../services/users/usersApi";

const UserReviewsModal = ({ showModal, setShowModal }) => {
  const { userId } = useParams();

  const { data, isLoading } = useGetUserReviewsQuery(userId, {
    skip: !showModal,
  });

  const reviewsData = data?.data;

  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) =>
      reviewsData?.reviews?.filter(
        (review) => Math.floor(review.rating) === star
      ).length || 0
  );

  const totalReviews = reviewsData?.totalReviews || 0;

  const ratingWidths = ratingCounts.map((count) =>
    totalReviews > 0 ? `${(count / totalReviews) * 100}%` : "0%"
  );

  const renderStars = (rating, size = "20px") => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar
            key={`full-${i}`}
            className="text-[var(--rating-yellow)]"
            style={{ fontSize: size }}
          />
        ))}
        {halfStar === 1 && (
          <FaStar
            className="text-[var(--rating-yellow)]"
            style={{ fontSize: size, clipPath: "inset(0 50% 0 0)" }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar
            key={`empty-${i}`}
            className="text-gray-300"
            style={{ fontSize: size }}
          />
        ))}
      </>
    );
  };

  if (!showModal) return null;

  return (
    <div className="w-full h-screen bg-[rgba(0,0,0,0.5)] fixed inset-0 z-50 flex items-center justify-center px-5 py-5">
      <div className="w-full max-w-[583px] max-h-[90vh] bg-white rounded-[24px] lg:rounded-[32px] flex flex-col overflow-hidden">
        {isLoading || !reviewsData ? (
          <div className="w-full h-[90vh] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 lg:px-7 lg:pt-7 sticky top-0 bg-white z-10 border-b">
              <h3 className="text-[24px] font-semibold leading-none">
                Reviews{" "}
                <span className="text-[#5C5C5C] text-[16px] font-normal">
                  ({reviewsData.totalReviews})
                </span>
              </h3>
              <button type="button" onClick={() => setShowModal(false)}>
                <img src="/close-icon.png" alt="close" width={20} height={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 lg:px-7 py-5 space-y-6">
              {/* Average Rating */}
              <div>
                <div className="flex items-center gap-1">
                  {renderStars(reviewsData.averageRating)}
                  <span className="ml-2 text-sm font-medium">
                    {reviewsData.averageRating.toFixed(1)}
                  </span>
                </div>

                <div className="w-full mt-4 space-y-3">
                  {[5, 4, 3, 2, 1].map((star, index) => (
                    <div key={star} className="flex items-center gap-2">
                      <p className="text-xs w-[50px]">{star} stars</p>

                      <div className="w-full bg-[var(--secondary-bg)] rounded-full h-2">
                        <div
                          className="bg-[var(--rating-yellow)] h-2 rounded-full"
                          style={{ width: ratingWidths[index] }}
                        />
                      </div>

                      <p className="text-[10px] w-[30px] text-right">
                        {ratingCounts[index]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border" />

              {/* Reviews */}
              <div className="space-y-8 pb-6">
                {reviewsData.reviews.map((review) => (
                  <div key={review.id} className="space-y-3 border-b pb-5">
                    <div className="flex gap-1.5">
                      {renderStars(review.rating, "18px")}
                    </div>

                    <p className="text-xs">{review.comment}</p>

                    <div className="flex items-center gap-2">
                      <img
                        src="/profile-icon.png"
                        alt="profile"
                        className="w-[32px] h-[32px] rounded-full"
                      />
                      <div className="flex gap-3">
                        <p className="text-xs font-medium">
                          {review.reviewer_first_name}{" "}
                          {review.reviewer_last_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(review.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserReviewsModal;
