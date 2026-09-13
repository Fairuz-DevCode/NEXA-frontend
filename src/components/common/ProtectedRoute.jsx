import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * ProtectedRoute — Guard komponen untuk proteksi halaman berdasarkan role.
 *
 * Props:
 * - allowedRoles: array of string — role yang diizinkan, contoh: ['admin'] atau ['user', 'admin']
 * - redirectPath: string — ke mana redirect jika tidak punya akses (default: '/login')
 * - children: komponen yang dilindungi
 *
 * Contoh pemakaian:
 * <ProtectedRoute allowedRoles={['admin']}>
 *   <Dashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({
  children,
  allowedRoles = [],
  redirectPath = '/login',
}) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading ...</div>;
  }

  // Belum login (guest) → redirect ke login
  if (!currentUser) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Sudah login tapi role tidak sesuai → redirect ke halaman utama role-nya
  const userRole = currentUser.role || 'user';
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    const fallback = userRole === 'admin' ? '/admin/dashboard' : '/';
    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default ProtectedRoute;
