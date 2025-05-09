// src/components/sections/Products.jsx
import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shield, Clock, BarChart, Activity, Database, ArrowRight, Check, Star } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { productsData } from '../../constants/products';

// Custom hook for intersection observer with options
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && options.unobserveOnIntersect) {
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.root, options.rootMargin, options.unobserveOnIntersect]);

  return [ref, isIntersecting];
};

// Enhanced Card component with motion
const Card = memo(({ children, className = "", elevation = "md", hover = false, onClick, ...props }) => {
  const elevationClasses = {
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl",
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl overflow-hidden ${elevationClasses[elevation]} 
                  ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''} 
                  ${onClick ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
});

// Badge component
const Badge = ({ children, color = "indigo", className = "" }) => {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    teal: "bg-teal-50 text-teal-700 border-teal-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  };
  
  return (
    <span className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${colorClasses[color]} shadow-sm border ${className}`}>
      {children}
    </span>
  );
};

// Feature card component
const FeatureCard = memo(({ feature, index, iconType }) => {
  // Create an array of icon components
  const icons = {
    Shield: <Shield size={16} className="text-indigo-600" />,
    Clock: <Clock size={16} className="text-indigo-600" />,
    BarChart: <BarChart size={16} className="text-indigo-600" />,
    Activity: <Activity size={16} className="text-indigo-600" />,
    Database: <Database size={16} className="text-indigo-600" />,
  };

  // Pick an icon based on the type or index
  const IconComponent = iconType ? icons[iconType] : icons[Object.keys(icons)[index % Object.keys(icons).length]];

  return (
    <motion.div 
      className="flex items-start p-4 rounded-xl border border-slate-100 bg-white hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)"
      }}
    >
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center mr-4">
        {IconComponent}
      </div>
      <div>
        <p className="text-slate-700 font-medium">{feature}</p>
      </div>
    </motion.div>
  );
});

// Benefit card component
const BenefitCard = memo(({ benefit, index }) => {
  const colors = ['from-indigo-500 to-blue-500', 'from-blue-500 to-teal-500', 'from-teal-500 to-indigo-500'];
  const bgColor = colors[index % colors.length];
  
  return (
    <motion.div 
      className="p-5 rounded-xl border border-slate-100 bg-white relative overflow-hidden group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
    >
      {/* Gradient line at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${bgColor} transform origin-left transition-transform duration-300 group-hover:scale-x-100`}></div>
      
      <div className="flex items-center gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r ${bgColor} flex items-center justify-center shadow-md`}>
          <Check className="text-white" size={15} />
        </div>
        <p className="text-slate-700 font-medium">{benefit}</p>
      </div>
    </motion.div>
  );
});

// Product tab component
const ProductTab = memo(({ product, isActive, onClick }) => {
  return (
    <motion.button
      className={`px-5 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-white text-indigo-700 shadow-md' 
          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
      }`}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`View ${product.title} details`}
      whileHover={{ scale: isActive ? 1 : 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="flex items-center gap-2">
        <img 
          src={product.icon} 
          alt="" 
          className="w-5 h-5 opacity-80" 
          aria-hidden="true"
        />
        {product.title}
      </span>
    </motion.button>
  );
});

// Mobile product card component
const MobileProductCard = memo(({ product, isActive, onClick }) => {
  return (
    <motion.div
      className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'border-indigo-200 bg-indigo-50/50' 
          : 'border-slate-100 bg-white hover:border-indigo-100 hover:bg-indigo-50/30'
      }`}
      whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-50 flex items-center justify-center">
          <img 
            src={product.icon} 
            alt="" 
            className="w-5 h-5" 
            aria-hidden="true"
          />
        </div>
        <div className="flex-grow">
          <h5 className="font-medium text-slate-800">{product.title}</h5>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{product.shortDescription || "Optimize your healthcare operations"}</p>
        </div>
        <motion.div 
          className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-indigo-500' : 'bg-slate-100'}`}
          animate={{ rotate: isActive ? 90 : 0 }}
        >
          <ChevronRight size={14} className={isActive ? 'text-white' : 'text-slate-400'} />
        </motion.div>
      </div>
    </motion.div>
  );
});

// Main Products component
const Products = () => {
  const [activeProductId, setActiveProductId] = useState(null);
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    unobserveOnIntersect: true 
  });
  
  // Set first product as active initially
  useEffect(() => {
    if (productsData.length > 0 && !activeProductId) {
      setActiveProductId(productsData[0].id);
    }
  }, [activeProductId]);
  
  // Get active product data
  const activeProduct = productsData.find(p => p.id === activeProductId) || productsData[0];
  
  // Handle product selection with memoization
  const handleProductSelect = useCallback((id) => {
    setActiveProductId(id);
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
      aria-labelledby="products-section-title"
    >
      {/* Enhanced background elements with animated gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(165,243,252,0.15),transparent_50%)]"></div>
        <div className="absolute top-40 -right-40 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-50 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Badge color="indigo" className="mb-4">
            <span className="flex items-center gap-1.5">
              <Star size={12} className="text-indigo-500" />
              Innovative Healthcare Solutions
            </span>
          </Badge>
          
          <SectionTitle 
            title="Our Products" 
            id="products-section-title"
            subtitle="Powerful technologies designed to address critical healthcare challenges and optimize operations" 
          />
        </motion.div>
        
        {/* Main Products Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {/* Tabs Navigation - Desktop */}
          <div className="mb-8 md:mb-12 hidden md:flex items-center justify-center">
            <div className="p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-xl inline-flex shadow-inner">
              {productsData.map((product) => (
                <ProductTab
                  key={product.id}
                  product={product}
                  isActive={activeProductId === product.id}
                  onClick={() => handleProductSelect(product.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Mobile Tabs */}
          <div className="md:hidden mb-6 space-y-2">
            {productsData.map((product) => (
              <MobileProductCard
                key={product.id}
                product={product}
                isActive={activeProductId === product.id}
                onClick={() => handleProductSelect(product.id)}
              />
            ))}
          </div>
          
          {/* Product Details Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProductId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
            >
              {/* Top Banner */}
              <div className="h-20 sm:h-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600">
                  {/* Animated pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <defs>
                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                  </div>
                </div>
                
                {/* Product Badge */}
                <div className="absolute -bottom-10 left-8 w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white transform -rotate-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white"></div>
                  <img 
                    src={activeProduct?.icon} 
                    alt="" 
                    className="w-10 h-10 sm:w-12 sm:h-12 relative z-10" 
                    aria-hidden="true"
                  />
                </div>
                
                {/* Product type badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  Healthcare AI
                </div>
              </div>
              
              {/* Product Content */}
              <div className="p-6 sm:p-8 pt-12 sm:pt-14">
                {/* Product Title and Description */}
                <div className="mb-8 sm:mb-10">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
                      {activeProduct?.title}
                    </h3>
                    <Badge color="indigo" className="text-xs">New</Badge>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {activeProduct?.description || `Our innovative ${activeProduct?.title} delivers exceptional value by optimizing healthcare operations and improving outcomes for all stakeholders.`}
                  </p>
                </div>
                
                {/* Features Grid */}
                <div className="mb-10">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                      <ChevronRight size={14} />
                    </span>
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeProduct?.features.map((feature, index) => (
                      <FeatureCard 
                        key={index} 
                        feature={feature} 
                        index={index} 
                      />
                    ))}
                  </div>
                </div>
                
                {/* Benefits Section */}
                <div className="mb-10 border-t border-slate-100 pt-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                      <ChevronRight size={14} />
                    </span>
                    Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Reduce costs by up to 25%', 'Improve efficiency by 40%', 'Enhance patient satisfaction'].map((benefit, i) => (
                      <BenefitCard key={i} benefit={benefit} index={i} />
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-end border-t border-slate-100 pt-6">
                  <Button 
                    variant="outline"
                    className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 transition-colors duration-200"
                  >
                    <span className="flex items-center gap-1.5">
                      View Documentation
                    </span>
                  </Button>
                  <Button 
                    variant="primary"
                    className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all duration-200"
                  >
                    <span className="flex items-center gap-1.5">
                      Get Started
                      <ArrowRight size={16} />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Call to Action */}
          <motion.div 
            className="mt-16 sm:mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 shadow-sm">
              <span className="text-lg font-semibold text-indigo-700">Ready to transform your healthcare operations?</span>
            </div>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Our suite of products works seamlessly together to create an integrated solution that addresses your organization's unique challenges.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block mt-8"
            >
              <Button 
                variant="primary" 
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-200/50 transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  Request a Demo
                  <ArrowRight size={18} />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 25s infinite alternate;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Products;