import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const admin = Cookies.get("admin") ? JSON.parse(Cookies.get("admin")) : null;
  const [user, setUser] = useState(admin);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
