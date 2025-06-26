import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/CategoryService";
import { fetchItems } from "../service/ItemService";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const deleteFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (localStorage.getItem("token") && localStorage.getItem("role")) {
          setAuthData(
            localStorage.getItem("token"),
            localStorage.getItem("role")
          );
        }
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
    addToCart,
    cartItems,
    deleteFromCart,
    updateQuantity,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
