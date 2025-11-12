import React, { forwardRef } from 'react';
import { InputProps } from '../../types';

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error = false,
  required = false,
  className = '',
  id,
  name,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  const baseClasses = 'input-base';
  const errorClasses = error ? 'input-error' : '';
  
  const classes = [
    baseClasses,
    errorClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      required={required}
      className={classes}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-invalid={error}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;