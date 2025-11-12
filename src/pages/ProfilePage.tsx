import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Avatar } from '../components/atoms';
import { Card, FormField } from '../components/molecules';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.profile.name || '',
    email: user?.profile.email || '',
    phone: user?.profile.phone || '',
    address: 'Chưa cập nhật',
    dateOfBirth: user?.profile.dateOfBirth || '',
  });

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      showToast('Cập nhật thông tin thành công!', 'success');
    }, 1000);
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
      showToast('Đã đăng xuất thành công', 'success');
      // Đợi một chút để logout hoàn tất trước khi navigate
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 100);
    }
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1-lg text-primary font-semibold">
            Hồ sơ cá nhân
          </h1>
          <p className="text-body text-text-secondary">
            Quản lý thông tin tài khoản của bạn
          </p>
        </div>
        
        {!isEditing && (
          <Button 
            variant="secondary" 
            onClick={() => setIsEditing(true)}
          >
            <Icon name="edit" size={18} />
            Chỉnh sửa
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <Card>
        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-primary-16">
            <Avatar 
              name={user?.profile.name} 
              size="xl"
              className="ring-4 ring-primary-8"
            />
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-h2 text-primary font-semibold mb-1">
                {user?.profile.name}
              </h2>
              <p className="text-body text-text-secondary mb-3">
                {user?.profile.email}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-8 rounded-full">
                  <Icon name="wallet" size={16} className="text-primary" />
                  <span className="text-body-sm font-medium text-primary">
                    Số dư: {user?.walletBalance?.toLocaleString()}đ
                  </span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-8 rounded-full">
                  <Icon name="gift" size={16} className="text-primary" />
                  <span className="text-body-sm font-medium text-primary">
                    Điểm: {user?.points?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-h3 text-primary font-semibold">
              Thông tin cá nhân
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Họ và tên"
                value={formData.name}
                onChange={handleChange('name')}
                disabled={!isEditing}
                required
              />
              
              <FormField
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                disabled={!isEditing}
                required
              />
              
              <FormField
                label="Số điện thoại"
                type="tel"
                value={formData.phone}
                onChange={handleChange('phone')}
                disabled={!isEditing}
                placeholder="0123456789"
              />
              
              <FormField
                label="Ngày sinh"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange('dateOfBirth')}
                disabled={!isEditing}
              />
              
              <div className="md:col-span-2">
                <FormField
                  label="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange('address')}
                  disabled={!isEditing}
                  placeholder="Nhập địa chỉ của bạn"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons for Edit Mode */}
          {isEditing && (
            <div className="flex gap-3 pt-4 border-t border-primary-16">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user?.profile.name || '',
                    email: user?.profile.email || '',
                    phone: user?.profile.phone || '',
                    address: 'Chưa cập nhật',
                    dateOfBirth: user?.profile.dateOfBirth || '',
                  });
                }}
              >
                Hủy
              </Button>
              
              <Button
                variant="primary"
                fullWidth
                loading={loading}
                onClick={handleSave}
              >
                Lưu thay đổi
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Account Settings */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-h3 text-primary font-semibold">
            Cài đặt tài khoản
          </h3>
          
          <div className="space-y-3">
            {/* Change Password */}
            <button
              onClick={handleChangePassword}
              className="w-full flex items-center justify-between p-4 rounded-card border-2 border-primary-16 hover:border-primary-40 hover:bg-primary-8 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-16 rounded-full flex items-center justify-center">
                  <Icon name="lock" size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-body font-medium text-primary">
                    Đổi mật khẩu
                  </p>
                  <p className="text-caption text-text-secondary">
                    Cập nhật mật khẩu của bạn
                  </p>
                </div>
              </div>
              <Icon name="chevron-right" size={20} className="text-text-secondary" />
            </button>

            {/* Notification Settings */}
            <button
              onClick={() => showToast('Tính năng đang phát triển', 'info')}
              className="w-full flex items-center justify-between p-4 rounded-card border-2 border-primary-16 hover:border-primary-40 hover:bg-primary-8 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-16 rounded-full flex items-center justify-center">
                  <Icon name="bell" size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-body font-medium text-primary">
                    Thông báo
                  </p>
                  <p className="text-caption text-text-secondary">
                    Cài đặt thông báo và cảnh báo
                  </p>
                </div>
              </div>
              <Icon name="chevron-right" size={20} className="text-text-secondary" />
            </button>

            {/* Privacy */}
            <button
              onClick={() => showToast('Tính năng đang phát triển', 'info')}
              className="w-full flex items-center justify-between p-4 rounded-card border-2 border-primary-16 hover:border-primary-40 hover:bg-primary-8 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-16 rounded-full flex items-center justify-center">
                  <Icon name="shield" size={20} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-body font-medium text-primary">
                    Quyền riêng tư
                  </p>
                  <p className="text-caption text-text-secondary">
                    Quản lý dữ liệu cá nhân
                  </p>
                </div>
              </div>
              <Icon name="chevron-right" size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </Card>

      {/* Logout Button */}
      <Card className="border-2 border-red-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 rounded-card hover:bg-red-50 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Icon name="log-out" size={20} className="text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-body font-semibold text-red-600">
                Đăng xuất
              </p>
              <p className="text-caption text-red-400">
                Thoát khỏi tài khoản của bạn
              </p>
            </div>
          </div>
          <Icon name="chevron-right" size={20} className="text-red-400" />
        </button>
      </Card>

      {/* Account Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary-16 rounded-full flex items-center justify-center mx-auto">
              <Icon name="route" size={26} className="text-primary" />
            </div>
            <p className="text-h2 text-primary font-semibold">23</p>
            <p className="text-caption text-text-secondary">Chuyến đi</p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary-16 rounded-full flex items-center justify-center mx-auto">
              <Icon name="clock" size={26} className="text-primary" />
            </div>
            <p className="text-h2 text-primary font-semibold">5.2h</p>
            <p className="text-caption text-text-secondary">Tổng thời gian</p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary-16 rounded-full flex items-center justify-center mx-auto">
              <Icon name="location" size={26} className="text-primary" />
            </div>
            <p className="text-h2 text-primary font-semibold">12.5km</p>
            <p className="text-caption text-text-secondary">Quãng đường</p>
          </div>
        </Card>

        <Card className="text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">🌱</span>
            </div>
            <p className="text-h2 text-primary font-semibold">2.3kg</p>
            <p className="text-caption text-text-secondary">CO₂ tiết kiệm</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
