import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon, Checkbox } from '../components/atoms';
import { FormField, Card } from '../components/molecules';
import { useAuth } from '../hooks/useAuth';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cccd: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing/changing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    // CCCD validation
    if (!formData.cccd.trim()) {
      newErrors.cccd = 'Vui lòng nhập số CCCD';
    } else if (!/^[0-9]{12}$/.test(formData.cccd.replace(/\D/g, ''))) {
      newErrors.cccd = 'CCCD phải có 12 chữ số';
    }
    
    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Vui lòng nhập ngày sinh';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 16) {
        newErrors.dateOfBirth = 'Bạn phải từ 16 tuổi trở lên';
      }
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp';
    }
    
    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const success = await register(formData);
      
      if (success) {
        navigate('/dashboard', { replace: true });
      } else {
        setErrors({
          general: 'Đăng ký không thành công. Vui lòng thử lại.'
        });
      }
    } catch (error) {
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
            Đăng ký tài khoản
          </h1>
          <p className="text-body text-text-secondary">
            Tham gia cộng đồng xe đạp điện xanh
          </p>
        </div>
      </div>

      {/* Register Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="flex items-start gap-2 p-4 bg-primary-8 border border-primary border-dashed rounded-card">
              <Icon name="warning" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-body text-primary">{errors.general}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-body-md font-medium text-primary border-b border-primary-16 pb-2">
              Thông tin cơ bản
            </h3>
            
            <FormField
              label="Họ và tên"
              type="text"
              placeholder="Nhập họ và tên đầy đủ"
              value={formData.name}
              onChange={handleChange('name')}
              error={errors.name}
              required
              disabled={loading}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Số điện thoại"
                type="tel"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleChange('phone')}
                error={errors.phone}
                required
                disabled={loading}
              />

              <FormField
                label="Số CCCD"
                type="text"
                placeholder="Nhập số CCCD"
                value={formData.cccd}
                onChange={handleChange('cccd')}
                error={errors.cccd}
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Ngày sinh"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange('dateOfBirth')}
                error={errors.dateOfBirth}
                required
                disabled={loading}
              />

              <FormField
                label="Email"
                type="email"
                placeholder="Nhập địa chỉ email"
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h3 className="text-body-md font-medium text-primary border-b border-primary-16 pb-2">
              Bảo mật tài khoản
            </h3>
            
            <FormField
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
              value={formData.password}
              onChange={handleChange('password')}
              error={errors.password}
              required
              disabled={loading}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              helper="Mật khẩu phải có ít nhất 6 ký tự"
            />

            <FormField
              label="Nhập lại mật khẩu"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              required
              disabled={loading}
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          {/* Optional */}
          <div className="space-y-4">
            <h3 className="text-body-md font-medium text-primary border-b border-primary-16 pb-2">
              Tùy chọn
            </h3>
            
            <FormField
              label="Mã giới thiệu"
              type="text"
              placeholder="Nhập mã giới thiệu (không bắt buộc)"
              value={formData.referralCode}
              onChange={handleChange('referralCode')}
              disabled={loading}
              helper="Nhập mã giới thiệu để nhận điểm thưởng"
            />
          </div>

          {/* Terms Agreement */}
          <div className="space-y-4">
            <Checkbox
              checked={formData.agreeTerms}
              onChange={handleChange('agreeTerms')}
              disabled={loading}
            >
              <span className="text-body">
                Tôi đồng ý với{' '}
                <button type="button" onClick={() => {}} className="link-base">Điều khoản sử dụng</button>
                {' '}và{' '}
                <button type="button" onClick={() => {}} className="link-base">Chính sách bảo mật</button>
                <span className="text-primary ml-1">(bắt buộc)</span>
              </span>
            </Checkbox>
            
            {errors.agreeTerms && (
              <div className="flex items-start gap-2 text-caption text-primary">
                <Icon name="warning" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Lỗi: {errors.agreeTerms}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading || !formData.agreeTerms}
          >
            Đăng ký tài khoản
          </Button>
        </form>
      </Card>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-body text-text-secondary">
          Đã có tài khoản?{' '}
          <Link
            to="/login"
            className="link-base font-medium"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;