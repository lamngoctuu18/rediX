import React from 'react';

interface AvatarProps {
  name?: string;
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name = '',
  src,
  alt,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-body',
    md: 'w-14 h-14 text-body-lg',
    lg: 'w-16 h-16 text-h2',
    xl: 'w-24 h-24 text-h1-lg'
  };

  const getInitials = (name: string): string => {
    const words = name.trim().split(' ').filter(Boolean);
    if (words.length === 0) return '?';
    
    // Chỉ lấy chữ cái đầu của tên (chữ cuối)
    const lastName = words[words.length - 1];
    return lastName.charAt(0).toUpperCase();
  };

  const classes = [
    sizeClasses[size],
    'rounded-full flex items-center justify-center font-medium',
    'bg-primary-16 text-primary border border-primary-24',
    className
  ].filter(Boolean).join(' ');

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={`${classes} object-cover`}
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          if (target.nextSibling) {
            (target.nextSibling as HTMLElement).style.display = 'flex';
          }
        }}
      />
    );
  }

  return (
    <div className={classes} role="img" aria-label={name || 'User avatar'}>
      {getInitials(name) || '?'}
    </div>
  );
};

export default Avatar;