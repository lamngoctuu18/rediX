import React from 'react';

interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  children,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        <div className={`
          w-5 h-5 min-w-[20px] rounded border-2 transition-all duration-200 cursor-pointer
          ${checked || defaultChecked 
            ? 'bg-primary border-primary' 
            : 'bg-white border-primary-40 hover:border-primary'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
          {(checked || defaultChecked) && (
            <svg
              className="w-3 h-3 text-white m-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden={true}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      
      {children && (
        <label 
          htmlFor={checkboxId}
          className={`text-body text-text-primary cursor-pointer select-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {children}
        </label>
      )}
    </div>
  );
};

export default Checkbox;