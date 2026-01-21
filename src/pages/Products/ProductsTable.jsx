import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const ProductsTable = ({ products }) => {
  return (
    <div className="w-full overflow-x-auto relative bg-white custom-shadow rounded-[10px] p-3 mt-5 min-h-[100vh]">
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 light-green-bg whitespace-nowrap">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-l-[8px]"
              >
                #
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Product
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Seller
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Delivery Type
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-r-[8px]"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <tr
                key={i}
                className="bg-white border-b border-gray-400 whitespace-nowrap"
              >
                <td className="px-6 py-4 border-b text-sm">{product?.id}</td>
                <td className="px-6 py-4 border-b text-sm">
                  <div className="flex items-center gap-2">
                    <LazyLoadImage
                      src={product?.images[0]?.imageUrl}
                      effect="blur"
                      alt="product"
                      className="w-[43px] h-[43px] object-cover rounded-full"
                    />
                    <span className="text-sm font-normal">
                      {product?.title}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 border-b text-sm">
                  <div className="flex items-center gap-2">
                    <LazyLoadImage
                      src={
                        product?.seller?.profilePictureUrl
                          ? product?.seller?.profilePictureUrl
                          : "/profile-icon.png"
                      }
                      effect="blur"
                      alt="user profile picture"
                      className="w-[43px] h-[43px] object-cover rounded-full"
                    />
                    <span className="text-sm font-normal">
                      {product?.seller?.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 border-b text-sm">
                  {product?.deliveryMethod === "pickup"
                    ? "Pickup"
                    : product?.deliveryMethod === "delivery"
                    ? "Community Pickup"
                    : "N/A"}
                </td>
                <td className="px-6 py-4 border-b text-sm">
                  ${product?.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 border-b text-sm">
                  <Link
                    to={`/products/${product?.id}`}
                    className="text-xs lg:text-sm underline font-medium text-[var(--primary-color)]"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
