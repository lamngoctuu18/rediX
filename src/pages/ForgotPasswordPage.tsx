import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon } from '../components/atoms';
import { FormField, Card } from '../components/molecules';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'phone' | 'otp' | 'reset'>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePhone = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.otp.trim()) {
      newErrors.otp = 'Vui lòng nhập mã OTP';
    } else if (!/^[0-9]{6}$/.test(formData.otp)) {
      newErrors.otp = 'Mã OTP phải có 6 chữ số';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateReset = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone()) return;
    
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start countdown
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setStep('otp');
    } catch (error) {
      setErrors({
        general: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOtp()) return;
    
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success for demo
      if (formData.otp === '123456') {
        setStep('reset');
      } else {
        setErrors({
          otp: 'Mã OTP không chính xác'
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateReset()) return;
    
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - redirect to login
      navigate('/login', { 
        state: { 
          message: 'Đặt lại mật khẩu thành công. Vui lòng đăng nhập với mật khẩu mới.' 
        } 
      });
    } catch (error) {
      setErrors({
        general: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
      });
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (countdown > 0) return;
    
    setLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Start countdown again
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setErrors({
        general: 'Có lỗi xảy ra khi gửi lại mã OTP.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStepInfo = () => {
    switch (step) {
      case 'phone':
        return {
          title: 'Quên mật khẩu',
          subtitle: 'Nhập số điện thoại để nhận mã xác thực',
          icon: 'support'
        };
      case 'otp':
        return {
          title: 'Xác thực OTP',
          subtitle: `Nhập mã OTP đã được gửi đến ${formData.phone}`,
          icon: 'check'
        };
      case 'reset':
        return {
          title: 'Đặt mật khẩu mới',
          subtitle: 'Tạo mật khẩu mới cho tài khoản của bạn',
          icon: 'settings'
        };
      default:
        return { title: '', subtitle: '', icon: '' };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
          <Icon name={stepInfo.icon as any} size={32} className="text-white" />
        </div>
        
        <div>
          <h1 className="text-h1-lg text-primary font-semibold mb-2">
            {stepInfo.title}
          </h1>
          <p className="text-body text-text-secondary">
            {stepInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="flex items-start gap-2 p-4 bg-primary-8 border border-primary border-dashed rounded-card">
                <Icon name="warning" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-body text-primary">{errors.general}</p>
              </div>
            )}

            <FormField
              label="Số điện thoại"
              type="tel"
              placeholder="Nhập số điện thoại đã đăng ký"
              value={formData.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              required
              disabled={loading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Gửi mã OTP
            </Button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="flex items-start gap-2 p-4 bg-primary-8 border border-primary border-dashed rounded-card">
                <Icon name="warning" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-body text-primary">{errors.general}</p>
              </div>
            )}

            <FormField
              label="Mã OTP"
              type="text"
              placeholder="Nhập mã OTP 6 chữ số"
              value={formData.otp}
              onChange={handleChange('otp')}
              error={errors.otp}
              required
              disabled={loading}
              helper="Vui lòng kiểm tra tin nhắn SMS"
            />

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={resendOtp}
                disabled={countdown > 0 || loading}
                className={`text-body ${countdown > 0 || loading ? 'text-text-placeholder cursor-not-allowed' : 'link-base'}`}
              >
                {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại mã OTP'}
              </button>
              
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-body text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Thay đổi số điện thoại
              </button>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Xác thực OTP
              </Button>
              
              {/* Demo Info */}
              <div className="bg-primary-8 p-3 rounded-card text-center">
                <p className="text-caption text-primary">
                  Demo: Sử dụng mã OTP <code className="bg-white px-1 rounded">123456</code>
                </p>
              </div>
            </div>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="flex items-start gap-2 p-4 bg-primary-8 border border-primary border-dashed rounded-card">
                <Icon name="warning" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-body text-primary">{errors.general}</p>
              </div>
            )}

            <FormField
              label="Mật khẩu mới"
              type="password"
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
              value={formData.newPassword}
              onChange={handleChange('newPassword')}
              error={errors.newPassword}
              required
              disabled={loading}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              helper="Mật khẩu phải có ít nhất 6 ký tự"
            />

            <FormField
              label="Nhập lại mật khẩu"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              required
              disabled={loading}
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Đặt mật khẩu mới
            </Button>
          </form>
        )}
      </Card>

      {/* Back to Login */}
      <div className="text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-body text-text-secondary hover:text-primary transition-colors duration-200"
        >
          <Icon name="chevronLeft" size={16} />
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;