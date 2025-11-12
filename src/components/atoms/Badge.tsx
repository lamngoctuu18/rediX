import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'filled';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-caption min-h-[20px]',
    md: 'px-3 py-1.5 text-body min-h-[24px]'
  };

  const variantClasses = {
    default: 'bg-primary-16 text-primary border border-primary-24',
    outline: 'bg-white text-primary border border-primary',
    filled: 'bg-primary text-white border border-primary'
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;