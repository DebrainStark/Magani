// src/components/common/Button.jsx
import React from 'react';

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 text-white",
  secondary: "bg-white hover:bg-slate-50 focus:ring-slate-300 text-slate-800 border border-slate-200",
  outline: "bg-transparent hover:bg-blue-50 border border-blue-500 text-blue-600 hover:text-blue-700",
  danger: "bg-red-600 hover:bg-red-700 focus:ring-red-300 text-white",
  success: "bg-green-600 hover:bg-green-700 focus:ring-green-300 text-white"
};

const sizes = {
  sm: "py-1 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg"
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  iconPosition = "right",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 shadow-sm";
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === "left" && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === "right" && !isLoading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;