const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full mt-7">
      <div className="w-full md:w-[422px] h-[60px] bg-white p-1.5 rounded-[8px] grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("Products (150)")}
          className={`${
            activeTab === "Products (150)"
              ? "bg-black text-white"
              : "bg-white text-black"
          } rounded-[8px] text-lg font-medium`}
        >
          Products
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("Members (450)")}
          className={`${
            activeTab === "Members (450)"
              ? "bg-black text-white"
              : "bg-white text-black"
          } rounded-[8px] text-lg font-medium`}
        >
          Members
        </button>
      </div>
    </div>
  );
};

export default Tabs;
