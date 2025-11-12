import React from 'react';
import { NavBar } from '../molecules';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden md:block">
          <NavBar variant="sidebar" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header - Mobile */}
          <div className="md:hidden">
            <NavBar variant="header" />
          </div>

          {/* Admin Header */}
          <div className="bg-primary-8 border-b border-primary-16 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-h2 text-primary font-semibold">
                  Bảng điều khiển quản trị
                </h1>
                <p className="text-body text-text-secondary">
                  Xin chào, {user?.profile.name}
                </p>
              </div>
              
              <div className="hidden md:flex items-center gap-4 text-center">
                <div>
                  <p className="text-body-lg text-primary font-medium">24/7</p>
                  <p className="text-caption text-text-secondary">Hoạt động</p>
                </div>
                <div className="w-px h-8 bg-primary-16"></div>
                <div>
                  <p className="text-body-lg text-primary font-medium">Real-time</p>
                  <p className="text-caption text-text-secondary">Giám sát</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-16">
          {/* Admin mobile nav items will be handled by BottomNav component */}
        </nav>
      </div>
    </div>
  );
};

export default AdminLayout;