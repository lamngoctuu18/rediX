import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon } from '../components/atoms';
import { FormField, Card } from '../components/molecules';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Vui lòng nhập số điện thoại hoặc CCCD';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const success = await login(formData.identifier, formData.password);
      
      if (success) {
        showToast('Đăng nhập thành công! Chào mừng bạn quay trở lại.', 'success');
        navigate('/dashboard', { replace: true });
      } else {
        showToast('Thông tin đăng nhập không chính xác. Vui lòng thử lại.', 'error');
        setErrors({
          general: 'Thông tin đăng nhập không chính xác. Vui lòng thử lại.'
        });
      }
    } catch (error) {
      showToast('Có lỗi xảy ra. Vui lòng thử lại sau.', 'error');
      setErrors({
        general: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-h1-lg text-primary font-semibold mb-2">
            Đăng nhập
          </h1>
          <p className="text-body text-text-secondary">
            Chào mừng bạn trở lại với EcoBike
          </p>
        </div>
      </div>

      {/* Login Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="flex items-start gap-2 p-4 bg-primary-8 border border-primary border-dashed rounded-card">
              <Icon name="warning" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-body text-primary">{errors.general}</p>
            </div>
          )}

          {/* Identifier Field */}
          <FormField
            label="Số điện thoại hoặc CCCD"
            type="text"
            placeholder="Nhập số điện thoại hoặc số CCCD"
            value={formData.identifier}
            onChange={handleChange('identifier')}
            error={errors.identifier}
            required
            disabled={loading}
          />

          {/* Password Field */}
          <FormField
            label="Mật khẩu"
            type="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
            required
            disabled={loading}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="link-base text-body"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            Đăng nhập
          </Button>
        </form>
      </Card>

      {/* Register Link */}
      <div className="text-center">
        <p className="text-body text-text-secondary">
          Chưa có tài khoản?{' '}
          <Link
            to="/register"
            className="link-base font-medium"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;