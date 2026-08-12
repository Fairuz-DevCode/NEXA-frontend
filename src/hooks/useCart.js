import { useContext } from 'react';
import { cartContext } from '../context/CartContext'; 

export const useCart = () => {
  const context = useContext(cartContext);
  
  if (!context) {
    throw new Error('useCart harus digunakan di dalam CartProvider ya');
  }
  
  return context;
};