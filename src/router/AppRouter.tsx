import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout components
import AuthLayout from '../components/templates/AuthLayout';
import AppLayout from '../components/templates/AppLayout';
import AdminLayout from '../components/templates/AdminLayout';

// Context Providers
import { ToastProvider } from '../contexts/ToastContext';

// Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import ActivityPage from '../pages/ActivityPage';
import RatingPage from '../pages/RatingPage';
import RentStartPage from '../pages/RentStartPage';
import JourneyStartPage from '../pages/JourneyStartPage';
import RentActivePage from '../pages/RentActivePage';
import RentSummaryPage from '../pages/RentSummaryPage';
import WalletPage from '../pages/WalletPage';
import PointsPage from '../pages/PointsPage';
import ReferralPage from '../pages/ReferralPage';
import ProfilePage from '../pages/ProfilePage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import SupportPage from '../pages/SupportPage';

// Admin pages
import AdminStationsPage from '../pages/admin/AdminStationsPage';
import AdminBikesPage from '../pages/admin/AdminBikesPage';
import AdminRentalsPage from '../pages/admin/AdminRentalsPage';
import AdminAnalyticsPage from '../pages/admin/AdminAnalyticsPage';
import AdminSupportPage from '../pages/admin/AdminSupportPage';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user?.segment !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } 
        />
        
        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/forgot-password" 
          element={
            <PublicRoute>
              <AuthLayout>
                <ForgotPasswordPage />
              </AuthLayout>
            </PublicRoute>
          } 
        />
        
        {/* Protected User Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/activity" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <ActivityPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/rental/rate/:rentalId" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <RatingPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/rent/start" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <RentStartPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/journey/start" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <JourneyStartPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/rent/active" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <RentActivePage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/rent/summary/:id" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <RentSummaryPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/wallet" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <WalletPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/points" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <PointsPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/referral" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <ReferralPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/change-password" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <ChangePasswordPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/support" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <SupportPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly>
              <Navigate to="/admin/stations" replace />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/stations" 
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout>
                <AdminStationsPage />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/bikes" 
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout>
                <AdminBikesPage />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/rentals" 
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout>
                <AdminRentalsPage />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/analytics" 
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout>
                <AdminAnalyticsPage />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/support" 
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout>
                <AdminSupportPage />
              </AdminLayout>
            </ProtectedRoute>
          } 
        />
        
        {/* Catch all route - 404 */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <div className="text-center">
                <h1 className="text-h1 text-primary mb-4">404</h1>
                <p className="text-body text-text-secondary mb-6">
                  Trang bạn tìm kiếm không tồn tại
                </p>
                <a 
                  href="/" 
                  className="btn-primary"
                >
                  Về trang chủ
                </a>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
    </ToastProvider>
  );
};

export default AppRouter;