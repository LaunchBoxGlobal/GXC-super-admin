import { Link } from "react-router-dom";

const OrdersTable = () => {
  return (
    <div className="w-full overflow-x-auto relative bg-white rounded-[10px] p-3 mt-5">
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 bg-[#504F4E1A]">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-l-[8px]"
              >
                #
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
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
                Status
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
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((_, i) => (
              <tr key={i} className="bg-white border-b border-gray-400">
                <td className="px-6 py-4 border-b text-sm">1</td>
                <td className="px-6 py-4 border-b text-sm">1745748</td>
                <td className="px-6 py-4 border-b text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src="/product-image-placeholder.png"
                      alt="user profile picture"
                      className="w-[43px] h-[43px] object-cover"
                    />
                    <span className="text-sm font-normal">John Doe</span>
                  </div>
                </td>
                <td className="px-6 py-4 border-b text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img
                      src="/profile-icon.png"
                      alt="user profile picture"
                      className="w-[43px] h-[43px] object-cover"
                    />
                    <span className="text-sm font-normal">John Doe</span>
                  </div>
                </td>
                <td className="px-6 py-4 border-b text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src="/profile-icon.png"
                      alt="user profile picture"
                      className="w-[43px] h-[43px] object-cover"
                    />
                    <span className="text-sm font-normal">John Doe</span>
                  </div>
                </td>
                <td className="px-6 py-4 border-b text-sm">$120</td>
                <td className="px-6 py-4 border-b text-sm">In Progress</td>
                <td className="px-6 py-4 border-b text-sm">
                  <Link
                    to={`/order-management/r839r8h39rh3`}
                    className="text-sm underline font-medium leading-none tracking-tight text-black"
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

export default OrdersTable;
