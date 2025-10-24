import axios from "axios";
import { BASE_URL } from "../../data/baseUrl";
import { getToken } from "../../utils/getToken";
import { handleApiError } from "../../utils/handleApiError";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const stats = [
  {
    title: "Total Communities",
    count: 540,
    icon: "/communities-icon.png",
    iconWidth: 34,
    iconHeight: 34,
  },
  {
    title: "Total Users",
    count: 540,
    icon: `/total-users-icon.png`,
    iconWidth: 24,
    iconHeight: 30,
  },
  {
    title: "Total Products",
    count: 540,
    icon: `/total-products-icon.png`,
    iconWidth: 34,
    iconHeight: 34,
  },
];

const DashboardStats = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/stats/super-admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      console.log(`stats response >> `, response?.data);
    } catch (error) {
      handleApiError(error, navigate);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="w-full relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
      {stats?.map((st, i) => {
        const Icon = st?.icon;
        return (
          <div
            className="bg-[#4e9d4b]/10 p-5 rounded-[20px] flex items-center justify-between"
            key={i}
          >
            <div className="flex flex-col items-start gap-3">
              <h3 className="text-[var(--secondary-color)] font-medium leading-none">
                {st?.title}
              </h3>
              <p className="font-semibold text-[24px] leading-none">
                {st?.count}
              </p>
            </div>

            <div className="w-[67px] h-[67px] bg-[var(--button-bg)] rounded-[15px] flex items-center justify-center">
              {/* <Icon className="text-3xl text-white" /> */}
              <img
                src={st?.icon}
                alt={`${st?.title} icon`}
                width={st?.iconWidth}
                height={st?.iconHeight}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
