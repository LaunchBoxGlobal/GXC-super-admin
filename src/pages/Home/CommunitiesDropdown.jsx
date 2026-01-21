import React, { useState, useRef, useEffect } from "react";

const CommunitiesDropdown = ({
  communities = [],
  selectedCommunities,
  setSelectedCommunities,
}) => {
  const [open, setOpen] = useState(false);

  const toggleRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (toggleRef.current && !toggleRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle selecting communities
  const handleSelect = (id) => {
    setSelectedCommunities(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // uncheck
          : [...prev, id] // check
    );
  };

  return (
    <div className="relative w-48" ref={toggleRef}>
      {/* Dropdown Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 border border-gray-100 rounded-lg text-xs font-medium bg-white text-left"
      >
        {selectedCommunities.length > 0
          ? `${selectedCommunities.length} selected`
          : "Select Communities"}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white custom-shadow rounded-lg z-10">
          <div className="max-h-[250px] overflow-y-auto p-2">
            {communities.length === 0 ? (
              <p className="text-sm text-gray-500 p-2">No communities found</p>
            ) : (
              communities.map((community) => (
                <label
                  key={community.id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedCommunities.includes(community.id)}
                    onChange={() => handleSelect(community.id)}
                  />
                  <span className="text-xs">{community?.name}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunitiesDropdown;
