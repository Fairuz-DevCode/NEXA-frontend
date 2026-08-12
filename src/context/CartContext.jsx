import React, { createContext, useState } from 'react';

export const cartContext = createContext(); //membuat context (ruang kosong) untuk menimpan data 


export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]); //data di cartItems setCartitems alat untuk mengubahnya

  // =======================================
  //   fungsi menambahkan data ke cart
  // =======================================
  const addToCart = (product) => { //butuh product utuh 
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item.id === product.id ); // cek apa ada yang sama 

      if(isExist){
        return prevItems.map(
          (item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        ); // logika nya a = b ? yes : no
      }

      return [...prevItems, {...product, quantity : 1 }]; // jika nggak ada maka tambahkan ke array yang baru
    });
  };

  // =======================================
  //   fungsi mengedit quantity di cart 
  // =======================================

  const increaseQuantity = (productId) => { //hanya butuh id nya saja 
    setCartItems((prevItems) => {

      return prevItems.map(
        (item) => item.id === productId ? {...item, quantity : item.quantity + 1} : item
      );
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const targetItems = prevItems.find((item) => item.id === productId);

      if(targetItems && targetItems.quantity > 1){
        return prevItems.map(
          (item) => item.id === productId? {...item, quantity : item.quantity - 1} : item
        );
      }
      return prevItems;
    });
  };

  // =======================================
  //            total items
  // =======================================
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // =======================================
  //            total items price
  // =======================================
  const getPriceCount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // =======================================
  //          delete item tetentu
  // =======================================
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  // =======================================
  //              delete all
  // =======================================
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <cartContext.Provider value= {{ 
      cartItems, 
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      getCartCount,
      getPriceCount,
      removeFromCart,
      clearCart
      }}>
      {children}
    </cartContext.Provider>
  );
};




