import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

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

  const value = { categories, setCategories };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
