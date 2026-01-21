import { Link, useLocation, useNavigate } from "react-router-dom";
import { PAGE_LINKS } from "../../data/pageLinks";
import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";
import { useLogoutUserMutation } from "../../services/user/authApi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLink = (link, name) => {
    navigate(link);
  };

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("adminToken");
      Cookies.remove("admin");
      navigate("/login");
    }
  };
  return (
    <div className="w-full h-full rounded-[10px] py-6 px-2 lg:px-5 flex flex-col items-start gap-y-6 bg-[#fff] custom-shadow">
      <div>
        <img
          src="/logo.svg"
          alt="logo"
          className="max-w-[144px] object-contain"
        />
      </div>
      <ul className="w-full flex flex-col gap-y-1">
        {PAGE_LINKS?.map((link, index) => {
          return (
            <li className={`w-full text-black h-[48px]`} key={index}>
              <Link
                to={link?.page}
                onClick={() => navigateToLink(link?.page, link?.title)}
                className={`text-sm flex items-center gap-x-2.5 font-medium w-full h-[48px] px-4 rounded-[12px] outline-none ${
                  location?.pathname === link?.page ||
                  location?.pathname.startsWith(link?.page + "/")
                    ? "bg-[var(--button-bg)] text-white"
                    : "bg-transparent text-black hover:bg-[var(--button-bg)] hover:text-white transition-all duration-300 group"
                }`}
              >
                <div className="min-w-5">
                  <img
                    src={link?.icon}
                    alt={link?.iconAltTag}
                    width={link?.iconWidth}
                    height={link?.iconHeight}
                    className={`... group-hover:invert group-hover:brightness-0 ${
                      location?.pathname === link?.page ||
                      location?.pathname.startsWith(link?.page + "/")
                        ? "invert brightness-0"
                        : "brightness-0 opacity-75"
                    }`}
                  />
                </div>

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
          <div className="min-w-5">
            <FiLogOut className="text-lg leading-none" />
          </div>
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
