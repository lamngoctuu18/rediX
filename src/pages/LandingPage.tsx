import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from '../components/atoms';

const LandingPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  const bikeImages = [
    {
      src: '/xedapdien.jpg',
      alt: 'RIDE X Electric Scooter',
      label: 'Xe máy điện',
      labelColor: 'bg-primary'
    },
    {
      src: '/xedapdien2.jpg',
      alt: 'RIDE X Electric Bike',
      label: 'Xe đạp điện',
      labelColor: 'bg-primary-80'
    }
  ];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === bikeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coreValues = [
    {
      icon: 'gift',
      title: 'Bền vững',
      description: 'Giảm khí thải CO₂, bảo vệ môi trường cho thế hệ tương lai'
    },
    {
      icon: 'clock',
      title: 'Tiện lợi',
      description: 'Thuê xe nhanh chóng chỉ với 3 bước đơn giản'
    },
    {
      icon: 'shield',
      title: 'Tin cậy',
      description: 'An toàn, bảo mật và dịch vụ chất lượng cao'
    },
    {
      icon: 'users',
      title: 'Cộng đồng',
      description: 'Kết nối người dùng, xây dựng văn hóa di chuyển xanh'
    },
    {
      icon: 'settings',
      title: 'Công nghệ',
      description: 'Ứng dụng thông minh, trải nghiệm hiện đại'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/xedienbackground.jpg" 
            alt="Electric Bike" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/45 to-primary-80/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
        </div>
        
        {/* Vietnam Flag Logo - Top Right Corner */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10">
          <img 
            src="/VietNam-Photoroom.png" 
            alt="Vietnam Flag" 
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white/50"
          />
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24 relative min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            {/* Logo & Slogan */}
            <div className="text-center space-y-8 mb-16">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl animate-pulse"></div>
                <img 
                  src="/logoride-Photoroom.png" 
                  alt="RIDE X" 
                  className="relative h-40 md:h-48 lg:h-56 w-auto mx-auto transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg">
                  ĐI XANH - SỐNG CHẤT
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-white/95 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                  Giải pháp di chuyển xanh thông minh cho cuộc sống hiện đại
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto pt-6">
                <Link to="/login" className="sm:flex-1">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-200 font-bold"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                
                <Link to="/register" className="sm:flex-1">
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    className="bg-primary-80 text-white border-2 border-white hover:bg-primary transform hover:scale-105 transition-all duration-200 font-bold shadow-xl"
                  >
                    Đăng ký
                  </Button>
                </Link>
              </div>
              
              <p className="text-body text-white/90 pt-2 drop-shadow">
                Đã có tài khoản? 
                <Link 
                  to="/login" 
                  className="ml-1 font-bold text-white hover:text-white/80 underline underline-offset-2"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>

            {/* Core Values - Compact Display */}
            <div className="mt-12 md:mt-16">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
                {coreValues.map((value, index) => (
                  <div 
                    key={index}
                    className={`group relative bg-white/25 backdrop-blur-lg rounded-2xl p-4 md:p-6 border-2 border-white/60 hover:bg-white/35 hover:border-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/30 ${
                      index === 4 ? 'col-span-2 md:col-span-1' : ''
                    }`}
                  >
                    <div className="space-y-2 md:space-y-3 text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg mx-auto border-2 border-white/80">
                        <Icon name={value.icon} size={32} className="text-primary md:w-12 md:h-12" />
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-white drop-shadow-lg">
                        {value.title}
                      </h3>
                      <p className="text-xs md:text-sm text-white leading-snug drop-shadow-md hidden md:block">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

            {/* Scroll Down Indicator */}
            {showScrollIndicator && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-center transition-opacity duration-300">
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <span className="text-sm font-medium whitespace-nowrap">Khám phá thêm</span>
                  <Icon name="chevron-down" size={24} />
                </div>
              </div>
            )}
        </div>
      </section>

      {/* Core Values Section - Removed as it's now in hero */}

      {/* About Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-white via-primary-8/10 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <img 
            src="/xedienbackground.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
                Về RIDE X
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-80 mx-auto rounded-full mb-6"></div>
              <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Nền tảng chia sẻ xe đạp điện thông minh hàng đầu Việt Nam
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Image Carousel */}
              <div className="relative order-2 lg:order-1">
                {/* Carousel Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-white p-8 md:p-10">
                  {/* Label */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className={`${bikeImages[currentImageIndex].labelColor} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-500`}>
                      {bikeImages[currentImageIndex].label}
                    </div>
                  </div>
                  
                  {/* Images Container with proper aspect ratio */}
                  <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                    {bikeImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                          index === currentImageIndex 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-95 pointer-events-none'
                        }`}
                      >
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Dots */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    {bikeImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-primary w-8' 
                            : 'bg-primary/30 hover:bg-primary/50'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? bikeImages.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <Icon name="chevron-left" size={20} className="text-primary" />
                  </button>
                  
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === bikeImages.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                  >
                    <Icon name="chevron-right" size={20} className="text-primary" />
                  </button>
                </div>
              </div>

              {/* Right: Content */}
              <div className="space-y-8 order-1 lg:order-2">
                {/* Feature List */}
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-16 rounded-xl flex items-center justify-center">
                      <Icon name="check" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Di chuyển xanh</h3>
                      <p className="text-body text-text-secondary leading-relaxed">
                        RIDE X mang đến giải pháp di chuyển thân thiện với môi trường, 
                        giảm thiểu khí thải CO₂ cho thành phố xanh bền vững.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-16 rounded-xl flex items-center justify-center">
                      <Icon name="check" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Công nghệ thông minh</h3>
                      <p className="text-body text-text-secondary leading-relaxed">
                        Ứng dụng hiện đại với công nghệ AI giúp tối ưu trải nghiệm, 
                        từ tìm xe, mở khóa đến thanh toán chỉ trong vài giây.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-16 rounded-xl flex items-center justify-center">
                      <Icon name="check" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Tiết kiệm & Tiện lợi</h3>
                      <p className="text-body text-text-secondary leading-relaxed">
                        Chi phí hợp lý, không phí ẩn. Trạm xe đặt khắp nơi giúp bạn 
                        dễ dàng thuê và trả xe mọi lúc mọi nơi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA & Environmental Impact */}
                <div className="pt-4 space-y-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <Link to="/register">
                      <Button 
                        variant="primary" 
                        size="lg"
                        className="shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transform hover:scale-105 transition-all"
                      >
                        Bắt đầu ngay
                        <Icon name="arrow-right" size={20} />
                      </Button>
                    </Link>
                    
                    <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-lg">
                      <span className="text-3xl">🌱</span>
                      <div>
                        <p className="text-sm font-bold text-green-700">Giảm 2.3kg CO₂</p>
                        <p className="text-xs text-green-600">Mỗi chuyến đi 10km</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/xedienbackground.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-80 to-primary opacity-65"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                RIDE X trong con số
              </h2>
              <p className="text-lg text-white/90 drop-shadow">
                Hành trình xanh của chúng tôi
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 md:gap-12">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 transform hover:scale-105 hover:bg-white/20 transition-all duration-300 border border-white/20">
                <p className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2 drop-shadow-lg">50+</p>
                <p className="text-sm md:text-base text-white/95 font-medium drop-shadow">Trạm xe</p>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 transform hover:scale-105 hover:bg-white/20 transition-all duration-300 border border-white/20">
                <p className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2 drop-shadow-lg">500+</p>
                <p className="text-sm md:text-base text-white/95 font-medium drop-shadow">Xe đạp điện</p>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 transform hover:scale-105 hover:bg-white/20 transition-all duration-300 border border-white/20">
                <p className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-2 drop-shadow-lg">10K+</p>
                <p className="text-sm md:text-base text-white/95 font-medium drop-shadow">Chuyến đi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-16 bg-white py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <img 
                src="/logoride-Photoroom.png" 
                alt="RIDE X" 
                className="h-10 w-auto"
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