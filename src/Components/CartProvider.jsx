import React, { useState, createContext, useContext } from "react";

const CartContext = createContext();
export function useCart() {
  return useContext(CartContext);
}

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { id, quantity: 1 }];
      }
    });
  };

  const decrement = (id) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Let's alias addToCart as increment for use inside the cart
  const increment = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
