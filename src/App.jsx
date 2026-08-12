import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// ---- Guest Pages ----
import LandingPage from './pages/Guest/LandingPage';
import Login from './pages/Guest/Login';
import ProductCatalog from './pages/Guest/ProductCatalog';
import ProductDetail from './pages/Guest/ProductDetail';
import Register from './pages/Guest/Register';

// ---- User Pages (butuh login, role: user) ----
import Cart from './pages/User/Cart';
import Checkout from './pages/User/Checkout';
import OrderHistory from './pages/User/OrderHistory';
import UserProfile from './pages/User/UserProfile';

// ---- Admin Pages (butuh login, role: admin) ----
import Dashboard from './pages/Admin/Dashboard';
import ManageOrders from './pages/Admin/ManageOrders';
import ManageProduct from './pages/Admin/ManageProduct';
import ManageUsers from './pages/Admin/ManageUsers';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className="pt-14 min-h-screen bg-parchment-DEFAULT text-parchment-100">
            <Routes>

              {/* ======================== */}
              {/*   RUTE PUBLIK (GUEST)    */}
              {/* ======================== */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* ======================== */}
              {/*   RUTE USER (login)      */}
              {/* ======================== */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />

              {/* ======================== */}
              {/*   RUTE ADMIN             */}
              {/* ======================== */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />

              {/* Fallback: halaman tidak ditemukan → redirect ke katalog */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;