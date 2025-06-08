import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart, saveCart } from "../context/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getCart());

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  const addToCart = (newItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, number: item.number + newItem.number }
            : item
        );
      } else {
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, number: newQuantity } : item
      )
    );
  };
  
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
    value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}
  >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
