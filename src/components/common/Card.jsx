// src/components/common/Card.jsx
import React from 'react';

const Card = ({
  children,
  className = "",
  elevation = "md",
  hover = false,
  border = false,
  rounded = "lg",
  padding = "md",
  ...props
}) => {
  // Base classes
  const baseClasses = "bg-white overflow-hidden";
  
  // Elevation variants
  const elevationClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-md",
    xl: "shadow-lg"
  };
  
  // Border variants
  const borderClasses = border 
    ? "border border-slate-200" 
    : "";
  
  // Rounded variants
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-3xl"
  };
  
  // Padding variants
  const paddingClasses = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
    xl: "p-8"
  };
  
  // Hover effect
  const hoverClasses = hover 
    ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1" 
    : "";
  
  return (
    <div 
      className={`
        ${baseClasses}
        ${elevationClasses[elevation] || elevationClasses.md}
        ${borderClasses}
        ${roundedClasses[rounded] || roundedClasses.lg}
        ${paddingClasses[padding] || paddingClasses.md}
        ${hoverClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;