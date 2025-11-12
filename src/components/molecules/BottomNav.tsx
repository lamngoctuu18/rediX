import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '../atoms';
import { useAuth } from '../../hooks/useAuth';

interface BottomNavItem {
  label: string;
  path: string;
  icon: string;
}

const navItems: BottomNavItem[] = [
  { label: 'Trang chủ', path: '/dashboard', icon: 'home' },
  { label: 'Hoạt động', path: '/activity', icon: 'clock' },
  { label: 'Điểm', path: '/points', icon: 'gift' },
  { label: 'Ví', path: '/wallet', icon: 'wallet' },
  { label: 'Hỗ trợ', path: '/support', icon: 'support' }
];

const adminNavItems: BottomNavItem[] = [
  { label: 'Trạm', path: '/admin/stations', icon: 'location' },
  { label: 'Xe', path: '/admin/bikes', icon: 'bike' },
  { label: 'Thuê', path: '/admin/rentals', icon: 'clock' },
  { label: 'Thống kê', path: '/admin/analytics', icon: 'settings' },
  { label: 'Hỗ trợ', path: '/admin/support', icon: 'support' }
];

interface BottomNavProps {
  className?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ className = '' }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.segment === 'admin';
  const currentNavItems = isAdmin ? adminNavItems : navItems;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-primary-16 shadow-lg md:hidden ${className}`}>
      <div className="flex">
        {currentNavItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors duration-200 ${
                isActive
                  ? 'text-white bg-primary'
                  : 'text-text-secondary hover:text-primary hover:bg-primary-8'
              }`}
            >
              <Icon 
                name={item.icon} 
                size={20} 
                className={isActive ? 'text-white' : ''} 
              />
              <span className={`text-caption mt-1 ${isActive ? 'text-white font-medium' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;