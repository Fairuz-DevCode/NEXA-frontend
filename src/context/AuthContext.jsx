import React, { createContext, useState, useCallback, useEffect } from 'react';
import API, { setAccessToken } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const refreshRes = await API.post("/auth/refresh");
        const token = refreshRes.data.payload.accessToken;

        setAccessToken(token);

        const userRes = await API.get('/users/me');
        const user = userRes.data.payload.user || userRes.data.payload;

        if (isMounted) {
          setCurrentUser(user);
        }
      } catch (error) {
        if (isMounted) {
          setAccessToken(null);
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    initializeAuth();
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
      setAccessToken(response.data.payload.accessToken);
      setCurrentUser(response.data.payload.user);
      return response.data.payload.user;
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
      setAccessToken(response.data.payload.accessToken);
      setCurrentUser(response.data.payload.user);
      return response.data.payload.user;
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
    setAccessToken(null);
    setCurrentUser(null);
  }, []);

  // =============================================
  //   UPDATE PROFILE USER
  // =============================================

  const updateProfile = useCallback(async (updatedData) => {
    try {
      const response = await API.put("/users/me", updatedData);
      const user = response.data.payload.user || response.data.payload;
      setCurrentUser(user);
      return user;
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
        loading,
        isAdmin,
        isUser,
        isGuest
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
