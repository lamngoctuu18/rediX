import React from 'react';
import { CardProps } from '../../types';

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  shadow = false,
  padding = 'md',
  onClick
}) => {
  const baseClasses = shadow ? 'card-shadow' : 'card-base';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const classes = [
    baseClasses,
    paddingClasses[padding],
    onClick ? 'cursor-pointer hover:bg-primary-8 transition-colors duration-200' : '',
    className
  ].filter(Boolean).join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component 
      className={classes}
      onClick={onClick}
      {...(onClick && { type: 'button', role: 'button' })}
    >
      {children}
    </Component>
  );
};

export default Card;