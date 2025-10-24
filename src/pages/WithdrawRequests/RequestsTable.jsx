import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";

const RequestsTable = () => {
  return (
    <div className="w-full overflow-x-auto relative bg-white rounded-[10px] p-3 mt-5">
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border-separate border-spacing-0 rounded-[8px] overflow-hidden">
          <thead className="text-xs text-gray-700 bg-[#504F4E1A]">
            <tr>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Transaction ID
              </th>

              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Account Number
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Withdrawal Amount
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Transfer Method
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
                <td className="px-6 py-4 border-b text-sm">ID44884745</td>
                <td className="px-6 py-4 border-b text-sm">
                  **** **** ****499
                </td>

                <td className="px-6 py-4 border-b text-sm">$12500</td>
                <td className="px-6 py-4 border-b text-sm">Bank Transfer</td>
                <td className="pl-6 py-4 border-b text-sm">$50</td>
                <td className="px-6 py-4 border-b text-sm">20 Sep, 2025</td>
                <td className="px-6 py-4 border-b text-sm">Pending</td>
                <td className="px-6 py-4 border-b text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-[31px] h-[31px] bg-[var(--page-bg)] flex items-center justify-center rounded-[10px]"
                    >
                      <IoClose className="text-gray-600 text-2xl" />
                    </button>
                    <button
                      type="button"
                      className="w-[31px] h-[31px] bg-black flex items-center justify-center rounded-[10px]"
                    >
                      <IoMdCheckmark className="text-gray-100 text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestsTable;
