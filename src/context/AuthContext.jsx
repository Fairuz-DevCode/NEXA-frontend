import React, { createContext, useState, useCallback, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get('/users/me');
        setCurrentUser(response.data.user);
      } catch (error) {
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);

  // =============================================
  //   CEK ROLE 
  // =============================================
  const isAdmin = currentUser?.role === 'admin';
  const isUser = currentUser?.role === 'user';
  const isGuest = currentUser === null;

  // =============================================
  //   LOGIN 
  // =============================================
  const loginUser = useCallback(async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      const user = response.data.user;
      setCurrentUser(user);
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'login gagal coba lagi';
      throw new Error(message);
    }
  }, []);

  // =============================================
  //   REGISTER 
  // =============================================
  const registerUser = useCallback(async (name, email, password) => {
    try {
      const response = await API.post('/auth/register', { name, email, password });
      const user = response.data.user
      setCurrentUser(user);
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'Registrasi gagal.';
      throw Error(message);
    }
  }, []);

  // =============================================
  //   LOGOUT
  // =============================================
  const logout = useCallback(async () => {
    try {
      await API.post('/auth/logout');
    } catch (error) {
      console.error('error :', error);
    }
    setCurrentUser(null);
  }, []);

  // =============================================
  //   UPDATE PROFILE USER
  // =============================================

  const updateProfile = useCallback(async (updatedData) => {
    try {
      const response = await API.put("/users/me", updatedData);
      const updateUser = response.data.user;
      setCurrentUser(updateUser);
      return response.data;
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        registerUser,
        logout,
        updateProfile,
        currentUser,
        isAdmin,
        isUser,
        isGuest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
