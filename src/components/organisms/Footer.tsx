import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../atoms';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-emerald-600 via-primary to-teal-700 text-white mt-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
                <img 
                  src="/logoride-Photoroom.png" 
                  alt="RIDE X" 
                  className="h-23 w-auto object-contain"
                />
            </div>
            <p className="text-body-sm text-white/90 leading-relaxed max-w-xs">
              Giải pháp di chuyển xanh, thông minh và tiết kiệm cho mọi người. 
              <span className="block mt-1 text-emerald-200 font-medium">Cùng nhau bảo vệ môi trường! 🌱</span>
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-11 h-11 bg-white/10 backdrop-blur-sm hover:bg-white hover:scale-110 rounded-xl flex items-center justify-center transition-all duration-300 ring-1 ring-white/20"
              >
                <Icon name="facebook" size={20} className="text-white group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-11 h-11 bg-white/10 backdrop-blur-sm hover:bg-white hover:scale-110 rounded-xl flex items-center justify-center transition-all duration-300 ring-1 ring-white/20"
              >
                <Icon name="twitter" size={20} className="text-white group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-11 h-11 bg-white/10 backdrop-blur-sm hover:bg-white hover:scale-110 rounded-xl flex items-center justify-center transition-all duration-300 ring-1 ring-white/20"
              >
                <Icon name="instagram" size={20} className="text-white group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-300 rounded-full" />
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/activity" 
                  className="text-body-sm text-white/90 hover:text-white hover:translate-x-2 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                    <Icon name="clock" size={16} className="text-white" />
                  </div>
                  <span>Hoạt động</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/wallet" 
                  className="text-body-sm text-white/90 hover:text-white hover:translate-x-2 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                    <Icon name="wallet" size={16} className="text-white" />
                  </div>
                  <span>Nạp tiền</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/points" 
                  className="text-body-sm text-white/90 hover:text-white hover:translate-x-2 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                    <Icon name="gift" size={16} className="text-white" />
                  </div>
                  <span>Điểm thưởng</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="text-body-sm text-white/90 hover:text-white hover:translate-x-2 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                    <Icon name="user" size={16} className="text-white" />
                  </div>
                  <span>Hồ sơ cá nhân</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-300 rounded-full" />
              Hỗ trợ
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/support" 
                  className="text-body-sm text-white/90 hover:text-white hover:translate-x-2 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                    <Icon name="support" size={16} className="text-white" />
                  </div>
                  <span>Trung tâm hỗ trợ</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-body-sm text-white/90 hover:text-white hover:translate-x-2 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                    <Icon name="circle-help" size={16} className="text-white" />
                  </div>
                  <span>Câu hỏi thường gặp</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-body-sm text-white/90 hover:text-white hover:translate-x-2 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                    <Icon name="file-text" size={16} className="text-white" />
                  </div>
                  <span>Điều khoản sử dụng</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-body-sm text-white/90 hover:text-white hover:translate-x-2 transition-all flex items-center gap-3 group"
                >
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
                    <Icon name="shield" size={16} className="text-white" />
                  </div>
                  <span>Chính sách bảo mật</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-300 rounded-full" />
              Liên hệ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-400 transition-colors">
                  <Icon name="location" size={18} className="text-white" />
                </div>
                <div className="pt-1">
                  <p className="text-body-sm text-white/90 leading-relaxed">
                    Đại học Đại Nam, Hà Nội
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-400 transition-colors">
                  <Icon name="phone" size={18} className="text-white" />
                </div>
                <div className="pt-1">
                  <a href="tel:1900123456" className="text-body-sm text-white/90 hover:text-white transition-colors font-medium">
                    1900 123 456
                  </a>
                  <p className="text-xs text-white/70 mt-0.5">Hỗ trợ 24/7</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-400 transition-colors">
                  <Icon name="mail" size={18} className="text-white" />
                </div>
                <div className="pt-1">
                  <a href="mailto:support@ridex.vn" className="text-body-sm text-white/90 hover:text-white transition-colors font-medium break-all">
                    support@ridex.vn
                  </a>
                  <p className="text-xs text-white/70 mt-0.5">Phản hồi nhanh</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-body-sm text-white/80 flex items-center gap-2">
                <span className="text-emerald-300">©</span>
                <span>{currentYear} RIDE X. Tất cả quyền được bảo lưu.</span>
              </p>
              <div className="flex items-center gap-6">
                <Link to="/support" className="text-body-sm text-white/80 hover:text-white transition-colors hover:underline">
                  Điều khoản
                </Link>
                <span className="text-white/40">•</span>
                <Link to="/support" className="text-body-sm text-white/80 hover:text-white transition-colors hover:underline">
                  Quyền riêng tư
                </Link>
                <span className="text-white/40">•</span>
                <Link to="/support" className="text-body-sm text-white/80 hover:text-white transition-colors hover:underline">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient line at bottom */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-300 via-green-200 to-teal-300" />
    </footer>
  );
};

export default Footer;
