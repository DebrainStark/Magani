// src/components/common/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({
  title,
  subtitle,
  align = "center",
  size = "default",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  id,
  badge,
  badgeText
}) => {
  // Alignment variants
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };
  
  // Size variants (for the title)
  const titleSizeClasses = {
    small: "text-2xl md:text-3xl",
    default: "text-3xl md:text-4xl lg:text-5xl",
    large: "text-4xl md:text-5xl lg:text-6xl"
  };
  
  // Size variants (for the subtitle)
  const subtitleSizeClasses = {
    small: "text-base",
    default: "text-lg md:text-xl",
    large: "text-xl md:text-2xl"
  };
  
  const alignment = alignmentClasses[align] || alignmentClasses.center;
  const titleSize = titleSizeClasses[size] || titleSizeClasses.default;
  const subtitleSize = subtitleSizeClasses[size] || subtitleSizeClasses.default;

  return (
    <div className={`w-full ${alignment} mb-8 md:mb-12 ${className}`}>
      {/* Optional badge */}
      {badge && badgeText && (
        <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-4">
          {badgeText}
        </div>
      )}
      
      {/* Title */}
      <h2 
        id={id} 
        className={`font-bold text-slate-900 leading-tight tracking-tight ${titleSize} ${titleClassName}`}
      >
        {title}
      </h2>
      
      {/* Optional subtitle */}
      {subtitle && (
        <p className={`mt-4 max-w-3xl mx-auto text-slate-600 leading-relaxed ${subtitleSize} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;