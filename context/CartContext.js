"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  // Load initial state from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedAddress = localStorage.getItem("shippingAddress");
    const storedPayment = localStorage.getItem("paymentMethod");

    if (storedCart) setCartItems(JSON.parse(storedCart));
    if (storedAddress) setShippingAddress(JSON.parse(storedAddress));
    if (storedPayment) setPaymentMethod(JSON.parse(storedPayment));
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const existItem = cartItems.find((x) => x.product === item.product && x.variantId === item.variantId);

    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x.product === existItem.product && x.variantId === existItem.variantId ? item : x
        )
      );
      addToast(`${item.name} quantity updated in cart`, "success");
    } else {
      setCartItems([...cartItems, item]);
      addToast(`${item.name} added to cart`, "success");
    }
  };

  const removeFromCart = (productId, variantId) => {
    const itemToRemove = cartItems.find(x => x.product === productId && x.variantId === variantId);
    setCartItems(cartItems.filter((x) => !(x.product === productId && x.variantId === variantId)));
    if (itemToRemove) {
      addToast(`${itemToRemove.name} removed from cart`, "info");
    }
  };

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

  const savePaymentMethod = (data) => {
    setPaymentMethod(data);
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        shippingAddress,
        saveShippingAddress,
        paymentMethod,
        savePaymentMethod,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
