import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryResponse = await fetchCategories();
        const itemResponse = await fetchItems();
        setCategories(categoryResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    loadData();
  }, []);

  const setAuthData = (data) => {
    setAuth({ token: data.token, role: data.role });
  };

  const value = {
    categories,
    items,
    setCategories,
    setItems,
    setAuthData,
    auth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
