import { useSearchParams } from "react-router-dom";

const ORDER_FILTERS = [
  {
    title: "Pending",
    status: "pending",
  },
  {
    title: "In Progress",
    status: "in_progress",
  },
  {
    title: "Ready",
    status: "ready",
  },

  {
    title: "Completed",
    status: "completed",
  },
];

const OrderFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentStatus = searchParams.get("status") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
      params.set("page", 1);
    } else {
      params.delete("status");
    }

    setSearchParams(params);
  };

  return (
    <div className="relative">
      <select
        name="orderType"
        id="orderType"
        value={currentStatus}
        onChange={handleChange}
        className="bg-transparent outline-none"
      >
        <option value="">Status</option>
        <option value="">All</option>
        {ORDER_FILTERS.map((filter) => (
          <option key={filter.status} value={filter.status}>
            {filter.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderFilter;
