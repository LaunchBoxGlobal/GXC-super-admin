import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="w-full overflow-x-auto relative bg-white rounded-[10px] min-h-screen">
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 light-green-bg whitespace-nowrap">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-l-[8px]"
              >
                Transaction ID
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
                Amount
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Date
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions?.map((transaction, i) => (
                <tr
                  key={i}
                  className="bg-white border-b border-gray-400 whitespace-nowrap"
                >
                  <td className="px-6 py-4 border-b text-sm">
                    {transaction?.transaction?.id}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    <div className="flex items-center gap-2">
                      <LazyLoadImage
                        src={
                          transaction?.product?.image
                            ? transaction?.product?.image
                            : "/product-image-placeholder.png"
                        }
                        effect="blur"
                        alt="user profile picture"
                        className="min-w-[43px] min-h-[43px] max-w-[43px] max-h-[43px] object-cover rounded-full"
                      />
                      <Link
                        to={`/products/${transaction?.product?.id}`}
                        className="text-sm font-normal"
                      >
                        {transaction?.product?.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <LazyLoadImage
                        src={
                          transaction?.seller?.image
                            ? transaction?.seller?.image
                            : "/profile-icon.png"
                        }
                        effect="blur"
                        alt="user profile picture"
                        className="min-w-[43px] min-h-[43px] max-w-[43px] max-h-[43px] object-cover rounded-full"
                      />
                      <Link
                        to={`/users/details/${transaction?.seller?.name}/${transaction?.seller?.id}`}
                        className="text-sm font-normal"
                      >
                        {transaction?.seller?.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <LazyLoadImage
                        src={
                          transaction?.buyer?.image
                            ? transaction?.buyer?.image
                            : "/profile-icon.png"
                        }
                        effect="blur"
                        alt="user profile picture"
                        className="min-w-[43px] min-h-[43px] max-w-[43px] max-h-[43px] object-cover rounded-full"
                      />
                      <Link
                        to={`/users/details/${transaction?.buyer?.name}/${transaction?.buyer?.id}`}
                        className="text-sm font-normal"
                      >
                        {transaction?.buyer?.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    ${transaction?.transaction?.admin?.amount}
                  </td>
                  <td className="px-6 py-4 border-b text-sm">
                    {formatDate(transaction?.order?.createdAt)}
                  </td>
                  <td className={`px-6 py-4 border-b`}>
                    <span className="text-green-500 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
                      {transaction?.order?.paymentStatus
                        .charAt(0)
                        .toUpperCase() +
                        transaction?.order?.paymentStatus.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
