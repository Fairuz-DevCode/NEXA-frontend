import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Hook helper supaya gak perlu import AuthContext di mana-mana
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth harus dipakai di dalam AuthProvider');
  }

  return context;
};
