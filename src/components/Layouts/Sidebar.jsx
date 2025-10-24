import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PAGE_LINKS } from "../../data/pageLinks";
import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";
import { BASE_URL } from "../../data/baseUrl";
import { getToken } from "../../utils/getToken";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  const navigateToLink = (link, name) => {
    navigate(link);
    setActiveLink(name);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}")}`,
          },
        }
      );

      if (res?.data?.success) {
        // console.log("Logout successful");
        Cookies.remove("adminToken");
        Cookies.remove("admin");
        navigate("/login");
      }
    } catch (error) {
      console.log("Logout error >>>", error?.response?.data || error.message);
      handleApiError(error, navigate);
    } finally {
      Cookies.remove("adminToken");
      Cookies.remove("admin");
      navigate("/login");
    }
  };
  return (
    <div className="w-full h-full rounded-[10px] py-6 px-2 lg:px-5 flex flex-col items-start gap-y-6 bg-[#fff] custom-shadow">
      <div>
        <h1 className="text-[35px] font-semibold tracking-tight">Logo</h1>
      </div>
      <ul className="w-full flex flex-col gap-y-2">
        {PAGE_LINKS?.map((link, index) => {
          const Icon = link?.icon;
          return (
            <li className={`w-full text-black h-[49px]`} key={index}>
              <Link
                to={link?.page}
                // onClick={() => navigateToLink(link?.page, link?.title)}
                className={`text-sm flex items-center gap-x-2.5 font-medium w-full h-[49px] px-4 rounded-[12px] outline-none ${
                  location?.pathname === link?.page ||
                  location?.pathname.startsWith(link?.page + "/")
                    ? "bg-[var(--button-bg)] text-white"
                    : "bg-transparent text-black hover:bg-[var(--button-bg)] hover:text-white transition-all duration-300 group"
                }`}
              >
                <Icon className="text-xl leading-none" />

                <span className="">{link?.title}</span>
              </Link>
            </li>
          );
        })}

        <button
          type="button"
          onClick={() => handleLogout()}
          className={`text-sm flex items-center gap-x-2.5 font-medium w-full h-[49px] px-4 rounded-[12px] outline-none 
                    bg-transparent text-black hover:bg-[var(--button-bg)] hover:text-white transition-all duration-300 group"
                }`}
        >
          <FiLogOut className="text-xl leading-none" />
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
