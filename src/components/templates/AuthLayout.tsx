import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-8/20 to-white flex flex-col overflow-x-hidden max-w-full">
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center py-8 md:py-12 overflow-x-hidden w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary-16/50 bg-white/60 backdrop-blur-sm py-6 md:py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <img 
                src="/logoride-Photoroom.png" 
                alt="RIDE X" 
                className="h-8 w-auto opacity-80"
              />
            </div>
            
            <p className="text-sm md:text-base text-text-secondary text-center">
              © 2025 RIDE X. Di chuyển xanh, tương lai bền vững.
            </p>
            
            {/* Links */}
            <div className="flex gap-6 md:gap-8">
              <button 
                onClick={() => {}}
                className="text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-200"
              >
                Điều khoản
              </button>
              <button 
                onClick={() => {}}
                className="text-sm md:text-base text-text-secondary hover:text-primary font-medium transition-colors duration-200"
              >
                Bảo mật
              </button>
              <button 
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

export default AuthLayout;