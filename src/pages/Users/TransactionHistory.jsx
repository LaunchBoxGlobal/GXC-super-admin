const TransactionHistory = () => {
  return (
    <div className="w-full overflow-x-auto relative bg-white rounded-[10px] mt-5">
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 bg-[#504F4E1A]">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-l-[8px]"
              >
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Product Name
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                User Name
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Product Amount
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Community Share
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-r-[8px]"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((_, i) => (
              <tr key={i} className="bg-white border-b border-gray-400">
                <td className="px-6 py-4 border-b text-sm">175738293957</td>
                <td className="px-6 py-4 border-b text-sm">
                  <div className="flex items-center gap-2">
                    <img
                      src="/product-image-placeholder.png"
                      alt="user profile picture"
                      className="w-[36px] h-[36px] object-cover"
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
                <td className="px-6 py-4 border-b text-sm">$12500</td>
                <td className="px-6 py-4 border-b text-sm">$50</td>
                <td className="px-6 py-4 border-b text-sm">20 Jan, 2025</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
