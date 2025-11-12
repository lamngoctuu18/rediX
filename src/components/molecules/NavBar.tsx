import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon, Avatar } from '../atoms';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', path: '/dashboard', icon: 'home' },
  { label: 'Hoạt động', path: '/activity', icon: 'clock' },
  { label: 'Điểm thưởng', path: '/points', icon: 'gift' },
  { label: 'Ví tiền', path: '/wallet', icon: 'wallet' },
  { label: 'Hỗ trợ', path: '/support', icon: 'support' }
];

const adminNavItems: NavItem[] = [
  { label: 'Trạm xe', path: '/admin/stations', icon: 'location', adminOnly: true },
  { label: 'Xe đạp', path: '/admin/bikes', icon: 'bike', adminOnly: true },
  { label: 'Thuê xe', path: '/admin/rentals', icon: 'clock', adminOnly: true },
  { label: 'Thống kê', path: '/admin/analytics', icon: 'settings', adminOnly: true },
  { label: 'Hỗ trợ', path: '/admin/support', icon: 'support', adminOnly: true }
];

interface NavBarProps {
  variant?: 'header' | 'sidebar';
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ variant = 'header', className = '' }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.segment === 'admin';
  const currentNavItems = isAdmin ? adminNavItems : navItems;

  if (variant === 'sidebar') {
    return (
      <nav className={`w-64 bg-white border-r border-primary-16 p-6 ${className}`}>
        {/* User Profile */}
        <div className="mb-8 pb-6 border-b border-primary-16">
          <div className="flex items-center gap-3 mb-4">
            <Avatar name={user?.profile.name} size="lg" />
            <div>
              <h3 className="text-body-md font-medium text-text-primary">
                {user?.profile.name}
              </h3>
              <p className="text-caption text-text-secondary">
                {isAdmin ? 'Quản trị viên' : 'Khách hàng'}
              </p>
            </div>
          </div>
          
          {!isAdmin && (
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-h2 text-primary font-semibold">
                  {user?.points?.toLocaleString() || 0}
                </p>
                <p className="text-caption text-text-secondary">Điểm</p>
              </div>
              <div>
                <p className="text-h2 text-primary font-semibold">
                  {user?.walletBalance?.toLocaleString() || 0}đ
                </p>
                <p className="text-caption text-text-secondary">Ví</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <ul className="space-y-2">
          {currentNavItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-button transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-16 text-primary'
                      : 'text-text-secondary hover:bg-primary-8 hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="text-body-md">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="mt-8 pt-6 border-t border-primary-16">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-button text-text-secondary hover:bg-primary-8 hover:text-primary transition-colors duration-200 w-full"
          >
            <Icon name="log-out" size={20} />
            <span className="text-body-md">Đăng xuất</span>
          </button>
        </div>
      </nav>
    );
  }

  // Header variant
  return (
    <header className={`sticky top-0 z-40 bg-white border-b border-primary-16 shadow-sm ${className}`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <img 
            src="/logoride-Photoroom.png" 
            alt="RIDE X" 
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {currentNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-button transition-colors duration-200 ${
                  isActive
                    ? 'text-primary bg-primary-8'
                    : 'text-text-secondary hover:text-primary hover:bg-primary-8'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="text-body">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <Link to="/profile" className="flex items-center gap-2 hover:bg-primary-8 px-3 py-2 rounded-button transition-colors duration-200">
            <Avatar name={user?.profile.name} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
