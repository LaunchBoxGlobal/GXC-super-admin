import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import OrderFilter from "./OrderFilter";

const OrdersTable = ({ orders, orderType }) => {
  return (
    <div className="w-full overflow-x-auto relative bg-white custom-shadow rounded-[10px] p-3 mt-5 min-h-[90vh]">
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 light-green-bg whitespace-nowrap">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium whitespace-nowrap"
              >
                Order ID
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Product
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Seller
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Buyer
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Price
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                <OrderFilter />
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-r-[8px]"
              >
                Action
              </th>
            </tr>
          </thead>
          {orders?.length > 0 ? (
            <tbody>
              {orders?.map((order, i) => (
                <tr
                  key={i}
                  className="bg-white border-b border-gray-400 whitespace-nowrap"
                >
                  <td className="px-6 py-4 border-b text-sm">
                    {order?.orderNumber?.slice(-3)}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <div className="flex items-center gap-2">
                      <LazyLoadImage
                        src={
                          order?.product?.image
                            ? order?.product?.image
                            : "/Image.png"
                        }
                        effect="blur"
                        alt="user profile picture"
                        className="min-w-[43px] min-h-[43px] max-w-[43px] max-h-[43px] object-cover rounded-full"
                      />
                      <span className="text-sm font-normal">
                        {order?.product?.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <LazyLoadImage
                        src={
                          order?.seller?.profilePictureUrl
                            ? order?.seller?.profilePictureUrl
                            : "/profile-icon.png"
                        }
                        effect="blur"
                        alt="user profile picture"
                        className="min-w-[43px] min-h-[43px] max-w-[43px] max-h-[43px] object-cover rounded-full"
                      />
                      <span className="text-sm font-normal">
                        {order?.seller?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <div className="flex items-center gap-2">
                      <LazyLoadImage
                        src={
                          order?.buyer?.profilePictureUrl
                            ? order?.buyer?.profilePictureUrl
                            : "/profile-icon.png"
                        }
                        effect="blur"
                        alt="user profile picture"
                        className="min-w-[43px] min-h-[43px] max-w-[43px] max-h-[43px] object-cover rounded-full"
                      />
                      <span className="text-sm font-normal">
                        {order?.buyer?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    ${order?.price.toFixed(2)}
                  </td>
                  <td className={`px-6 py-4 border-b font-medium`}>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order?.overallStatus == "in_progress"
                          ? "text-[var(--progress)] bg-orange-100"
                          : order?.overallStatus == "completed"
                          ? "text-[var(--success)] bg-green-100"
                          : order?.overallStatus === "ready"
                          ? "text-[var(--rating-yellow)] bg-yellow-100"
                          : order?.overallStatus === "cancelled"
                          ? "text-[var(--cancelled)] bg-red-100"
                          : "text-[var(--secondary-bg)] bg-gray-100"
                      }`}
                    >
                      {order?.overallStatus
                        ?.replace(/[_-]/g, " ")
                        .toLowerCase()
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </span>
                    {order?.report?.submitted &&
                      order?.overallStatus !== "completed" && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order?.report?.status === "pending"
                              ? "text-[var(--progress)] bg-orange-100"
                              : order?.report?.status === "resolved"
                              ? "text-[var(--success)] bg-green-100"
                              : order?.report?.status === "rejected"
                              ? "text-[var(--cancelled)] bg-red-100"
                              : "text-gray-500 bg-gray-100"
                          }`}
                        >
                          {order?.report?.status !== "pending" ? (
                            <>
                              {order?.report?.status.charAt(0).toUpperCase() +
                                order?.report?.status.slice(1)}
                            </>
                          ) : (
                            "Missing"
                          )}
                        </span>
                      )}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <Link
                      to={`/order-management/${order?.orderNumber}?itemId=${order?.id}`}
                      className="text-xs lg:text-sm underline font-medium text-[var(--primary-color)]"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="w-full flex justify-center text-center pt-40 min-h-[80vh]">
              <p className="text-sm text-gray-500 font-medium text-center">
                No orders found!
              </p>
            </div>
          )}
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
