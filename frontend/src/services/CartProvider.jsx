import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);
  const [quant, setquant] = useState(0);

  const fetchCartQuantity = () => {
    const token = sessionStorage.getItem('Token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const uid = payload.userId;

    axios
      .get(`http://localhost:3000/api/display-cart/${uid}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const totalQuantity = response.data.products.reduce((total, item) => {
          return total + item.quantity;
        }, 0);

        setquant(totalQuantity);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCartQuantity();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        quant,
        setquant,
        cart,
        setcart,
        fetchCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;