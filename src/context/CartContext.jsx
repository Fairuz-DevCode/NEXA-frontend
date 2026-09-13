import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getCart, addCartItem, updateCartItem, removeCartItem } from '../api/carts.js';
import { useAuth } from '../hooks/useAuth.js';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartData, setCartData] = useState({ id: null, items: [], total_price: 0 });
  const [cartLoading, setCartLoading] = useState(false);

  // =============================================
  //   FETCH CART DARI BACKEND
  // =============================================
  const fetchCart = useCallback(async () => {
    if (!currentUser) {
      setCartData({ id: null, items: [], total_price: 0 });
      return;
    }
    try {
      setCartLoading(true);
      const data = await getCart();
      setCartData(data || { id: null, items: [], total_price: 0 });
    } catch {
      setCartData({ id: null, items: [], total_price: 0 });
    } finally {
      setCartLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // =============================================
  //   TAMBAH ITEM
  // =============================================
  const addToCart = useCallback(async (product_id, product_variant_id, quantity = 1) => {
    await addCartItem({ product_id, product_variant_id, quantity });
    await fetchCart();
  }, [fetchCart]);

  // =============================================
  //   UPDATE QUANTITY
  // =============================================
  const updateQuantity = useCallback(async (itemId, quantity) => {
    await updateCartItem(itemId, quantity);
    await fetchCart();
  }, [fetchCart]);

  // =============================================
  //   HAPUS ITEM
  // =============================================
  const removeItem = useCallback(async (itemId) => {
    await removeCartItem(itemId);
    await fetchCart();
  }, [fetchCart]);

  // =============================================
  //   CLEAR CART (local reset setelah checkout)
  // =============================================
  const clearCart = useCallback(() => {
    setCartData({ id: null, items: [], total_price: 0 });
  }, []);

  const getCartCount = () =>
    cartData.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartLoading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
