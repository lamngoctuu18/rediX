import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '../components/atoms';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-8/30 to-white flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-8 md:py-16 px-4">
        <div className="container mx-auto text-center">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Logo & Title */}
            <div className="space-y-8 animate-fade-in">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <img 
                  src="/logoride-Photoroom.png" 
                  alt="RIDE X" 
                  className="relative h-40 md:h-56 lg:h-64 w-auto mx-auto transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="space-y-4">
                <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary font-medium max-w-2xl mx-auto leading-relaxed">
                  Di chuyển tiện lợi, sống xanh mỗi ngày
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 py-8">
              <div className="group p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-16 hover:border-primary-40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-16 to-primary-8 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon name="clock" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">Nhanh chóng</h3>
                  <p className="text-body text-text-secondary leading-relaxed">
                    Thuê xe chỉ với 3 thao tác đơn giản
                  </p>
                </div>
              </div>
              
              <div className="group p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-16 hover:border-primary-40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-16 to-primary-8 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon name="wallet" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">Minh bạch</h3>
                  <p className="text-body text-text-secondary leading-relaxed">
                    Chi phí rõ ràng, không phí ẩn
                  </p>
                </div>
              </div>
              
              <div className="group p-6 md:p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-16 hover:border-primary-40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-16 to-primary-8 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon name="gift" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">Tích điểm</h3>
                  <p className="text-body text-text-secondary leading-relaxed">
                    Nhận điểm thưởng mỗi chuyến đi
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link to="/login" className="sm:flex-1">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:scale-105 transition-all duration-200 leading-[2]"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                
                <Link to="/register" className="sm:flex-1">
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    className="transform hover:scale-105 transition-all duration-200 leading-[2]"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </div>
              
              <p className="text-body text-text-secondary">
                Đã có tài khoản? 
                <Link 
                  to="/login" 
                  className="link-base ml-1 font-semibold text-primary hover:text-primary-80"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 py-8 md:py-12 mt-8 border-t border-primary-16/50">
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <p className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-2">50+</p>
                <p className="text-sm md:text-base text-text-secondary font-medium">Trạm xe</p>
              </div>
              
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <p className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-2">500+</p>
                <p className="text-sm md:text-base text-text-secondary font-medium">Xe đạp điện</p>
              </div>
              
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <p className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold mb-2">10K+</p>
                <p className="text-sm md:text-base text-text-secondary font-medium">Chuyến đi</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary-16/50 bg-white/60 backdrop-blur-sm py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <img 
                src="/logoride-Photoroom.png" 
                alt="RIDE X" 
                className="h-8 w-auto"
              />
              <span className="text-sm md:text-base text-text-secondary">
                © 2025 RIDE X. Di chuyển xanh, tương lai bền vững.
              </span>
            </div>
            
            {/* Links */}
            <div className="flex gap-6 md:gap-8">
              <button 
                type="button"
                onClick={() => {}}
                className="text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-200"
              >
                Điều khoản
              </button>
              <button 
                type="button"
                onClick={() => {}}
                className="text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-200"
              >
                Bảo mật
              </button>
              <button 
                type="button"
                onClick={() => {}}
                className="text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-200"
              >
                Hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;