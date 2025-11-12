import React from 'react';
import { NavBar, BottomNav } from '../molecules';
import { Footer } from '../organisms';
import { useAuth } from '../../hooks/useAuth';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const isAdmin = user?.segment === 'admin';

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0 overflow-x-hidden max-w-full">
      {/* Header - Desktop & Mobile */}
      <NavBar variant="header" />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden w-full">
        <div className="container mx-auto py-6 px-4">
          {children}
        </div>
      </main>

      {/* Footer - Full Width */}
      <Footer />

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />

      {/* Admin Notice */}
      {isAdmin && (
        <div className="hidden md:block fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-button text-caption z-50">
          Chế độ quản trị viên
        </div>
      )}
    </div>
  );
};

export default AppLayout;