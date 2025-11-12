import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../components/atoms';
import { Card, FormField } from '../components/molecules';
import { useToast } from '../contexts/ToastContext';

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showToast('Đổi mật khẩu thành công!', 'success');
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/profile')}
          className="p-2"
        >
          <Icon name="arrow-left" size={24} />
        </Button>
        
        <div>
          <h1 className="text-h1-lg text-primary font-semibold">
            Đổi mật khẩu
          </h1>
          <p className="text-body text-text-secondary">
            Cập nhật mật khẩu để bảo vệ tài khoản
          </p>
        </div>
      </div>

      {/* Security Tips */}
      <Card className="bg-primary-8 border-primary">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="shield" size={20} className="text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-body-md font-semibold text-primary mb-2">
              Mẹo bảo mật
            </h3>
            <ul className="text-body-sm text-text-secondary space-y-1">
              <li>• Sử dụng ít nhất 8 ký tự</li>
              <li>• Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
              <li>• Không sử dụng thông tin cá nhân dễ đoán</li>
              <li>• Thay đổi mật khẩu định kỳ</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Change Password Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormField
              label="Mật khẩu hiện tại"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange('currentPassword')}
              error={errors.currentPassword}
              required
              placeholder="Nhập mật khẩu hiện tại"
            />

            <FormField
              label="Mật khẩu mới"
              type="password"
              value={formData.newPassword}
              onChange={handleChange('newPassword')}
              error={errors.newPassword}
              required
              placeholder="Nhập mật khẩu mới"
            />

            <FormField
              label="Xác nhận mật khẩu mới"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              required
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-primary-16">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => navigate('/profile')}
            >
              Hủy
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
            >
              Đổi mật khẩu
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
