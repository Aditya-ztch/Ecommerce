
import React, { createContext, useState,useEffect } from 'react'
export const CartContext=createContext();


const CartProvider = ({children}) => {

    const [CartItems,setCartItems]=useState([]);
    const addToCart=(product)=>{
        // console.log(product);
        setCartItems((prev)=>[...prev,product]);
    };
  
  return (
   <CartContext.Provider value={{CartItems,setCartItems,addToCart}}>
    {children}
   </CartContext.Provider>
  )
}

export default CartProvider;
