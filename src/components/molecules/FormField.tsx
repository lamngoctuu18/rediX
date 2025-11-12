import React from 'react';
import { Input, Icon } from '../atoms';
import { InputProps } from '../../types';

interface FormFieldProps extends Omit<InputProps, 'error'> {
  label?: string;
  helper?: string;
  error?: string;
  required?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  helper,
  error,
  required,
  showPassword,
  onTogglePassword,
  type,
  id,
  className = '',
  ...inputProps
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = helper ? `${fieldId}-helper` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const ariaDescribedBy = [helperId, errorId].filter(Boolean).join(' ');
  
  const isPasswordField = type === 'password';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label 
          htmlFor={fieldId}
          className="block text-body-md text-text-primary font-medium"
        >
          {label}
          {required && <span className="text-primary ml-1">(bắt buộc)</span>}
        </label>
      )}
      
      <div className="relative">
        <Input
          id={fieldId}
          type={showPassword ? 'text' : type}
          error={!!error}
          aria-describedby={ariaDescribedBy || undefined}
          className={isPasswordField ? 'pr-12' : ''}
          {...inputProps}
        />
        
        {isPasswordField && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-200"
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            <Icon name={showPassword ? 'eyeOff' : 'eye'} size={20} />
          </button>
        )}
      </div>
      
      {helper && !error && (
        <p 
          id={helperId}
          className="text-caption text-text-secondary"
        >
          {helper}
        </p>
      )}
      
      {error && (
        <div 
          id={errorId}
          className="flex items-start gap-2 text-caption text-primary"
          role="alert"
        >
          <Icon name="warning" size={16} className="mt-0.5 flex-shrink-0" />
          <span>Lỗi: {error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;