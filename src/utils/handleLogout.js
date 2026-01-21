import Cookies from "js-cookie";

export const handleLogout = () => {
  Cookies.remove("adminToken");
  Cookies.remove("admin");
};
