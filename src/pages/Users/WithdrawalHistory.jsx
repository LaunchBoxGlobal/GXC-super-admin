import { Link } from "react-router-dom";

const WithdrawalHistory = () => {
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
                Account Number
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Withdrawal Amount
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Transfer Method
              </th>
              <th scope="col" className="px-6 py-4 text-sm font-medium">
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-sm font-medium rounded-r-[8px]"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((_, i) => (
              <tr key={i} className="bg-white border-b border-gray-400">
                <td className="px-6 py-4 border-b text-sm">174839294375</td>
                <td className="px-6 py-4 border-b text-sm">
                  **** **** ****499
                </td>
                <td className="px-6 py-4 border-b text-sm">$12500</td>
                <td className="px-6 py-4 border-b text-sm">Bank Transfer</td>
                <td className="px-6 py-4 border-b text-sm">20 Jan, 2025</td>
                <td className="px-6 py-4 border-b text-sm">Pending</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
