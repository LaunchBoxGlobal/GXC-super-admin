const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full mt-7">
      <div className="w-full md:w-[422px] h-[60px] bg-white custom-shadow p-1.5 rounded-[8px] grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("Products")}
          className={`${
            activeTab === "Products"
              ? "bg-[var(--button-bg)] text-white"
              : "bg-white text-black"
          } rounded-[8px] text-lg font-medium`}
        >
          Products
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("Members")}
          className={`${
            activeTab === "Members"
              ? "bg-[var(--button-bg)] text-white"
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
