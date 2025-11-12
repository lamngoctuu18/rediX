import React, { useEffect, useState } from 'react';
import { Icon } from '../atoms';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 4000,
  onClose,
  visible = true
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 200);
  };

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check';
      case 'error':
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const getStyles = () => {
    const baseClasses = 'relative flex items-center gap-3 p-4 rounded-card border backdrop-blur-sm';
    
    switch (type) {
      case 'success':
        return `${baseClasses} bg-white/95 border-primary text-primary shadow-lg shadow-primary/20`;
      case 'error':
      case 'warning':
        return `${baseClasses} bg-white/95 border-primary border-dashed text-primary shadow-lg shadow-primary/20`;
      case 'info':
      default:
        return `${baseClasses} bg-primary-8/95 border-primary-16 text-primary shadow-lg shadow-primary/10`;
    }
  };

  const getProgressBarColor = () => {
    switch (type) {
      case 'success':
        return 'bg-primary';
      case 'error':
      case 'warning':
        return 'bg-primary';
      case 'info':
      default:
        return 'bg-primary';
    }
  };

  if (!isVisible && !visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-out transform ${
        isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className={`${getStyles()} max-w-md min-w-[320px] overflow-hidden`}>
        {/* Progress bar */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
            <div 
              className={`h-full ${getProgressBarColor()} transition-all ease-linear`}
              style={{
                width: '100%',
                animation: isVisible && !isLeaving ? `shrink ${duration}ms linear forwards` : 'none'
              }}
            />
          </div>
        )}

        {/* Icon with enhanced styling */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          type === 'success' ? 'bg-primary/10' :
          type === 'error' || type === 'warning' ? 'bg-primary/10' :
          'bg-primary/20'
        }`}>
          <Icon 
            name={getIcon()} 
            size={18} 
            className="flex-shrink-0" 
            aria-hidden={true}
          />
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-body leading-relaxed break-words">{message}</p>
        </div>
        
        {/* Close button */}
        {onClose && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-2 -m-2 ml-2 hover:bg-primary/10 rounded-full transition-colors duration-200 group"
            aria-label="Đóng thông báo"
          >
            <Icon 
              name="x" 
              size={16} 
              className="group-hover:scale-110 transition-transform duration-200" 
            />
          </button>
        )}
      </div>
    </div>
  );
};

// Toast Container for managing multiple toasts
interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemoveToast: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts, 
  onRemoveToast 
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto transition-all duration-300 ease-out transform"
          style={{ 
            transform: `translateY(${index * 8}px)`,
            zIndex: 1000 - index 
          }}
        >
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => onRemoveToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Toast;