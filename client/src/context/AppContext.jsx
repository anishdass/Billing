import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    loadData();
  }, []);

  const setAuthData = (data) => {
    setAuth({ token: data.token, role: data.role });
  };

  const value = { categories, setCategories, setAuthData, auth };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
