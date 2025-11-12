import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
  'aria-label'?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  showLabel = false,
  label,
  className = '',
  'aria-label': ariaLabel
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const isLow = percentage < 25;

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const containerClasses = [
    'w-full bg-white rounded-full overflow-hidden',
    'border border-primary-16',
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  const barClasses = [
    'h-full transition-all duration-300 ease-out',
    isLow ? 'bg-primary border-r border-primary border-dashed' : 'bg-primary'
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-caption text-text-secondary">
            {label || 'Tiến độ'}
          </span>
          <span className={`text-caption font-medium ${isLow ? 'text-primary' : 'text-text-primary'}`}>
            {Math.round(percentage)}%
            {isLow && ' - Pin thấp'}
          </span>
        </div>
      )}
      
      <div 
        className={containerClasses}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel || `${Math.round(percentage)}% hoàn thành`}
      >
        <div
          className={barClasses}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {isLow && (
        <p className="text-caption text-primary mt-1" role="alert">
          ⚠ Pin thấp
        </p>
      )}
    </div>
  );
};

export default ProgressBar;