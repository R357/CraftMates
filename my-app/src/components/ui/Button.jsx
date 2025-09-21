import React from 'react';

const Button = ({ 
  children, 
  variant = 'default', 
  disabled = false, 
  className = '', 
  onClick,
  type = 'button',
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props 
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 focus:ring-orange-500',
    secondary: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      className={`${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;