// src/components/sections/Products.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Shield, Clock, BarChart, Activity, Database } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import Button from '../common/Button';
import { productsData } from '../../constants/products';

// Icon mapping object for better performance
const ICONS = {
  Shield, Clock, BarChart, Activity, Database
};

const Products = () => {
  const [activeProductId, setActiveProductId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const detailsRef = useRef(null);
  
  // Set initial active product and observe section visibility
  useEffect(() => {
    // Set first product as active initially
    if (productsData.length > 0) {
      setActiveProductId(productsData[0].id);
    }
    
    // Visibility observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // Smooth transition when changing products
  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.style.opacity = '0';
      detailsRef.current.style.transform = 'translateY(10px)';
      
      const timer = setTimeout(() => {
        if (detailsRef.current) {
          detailsRef.current.style.opacity = '1';
          detailsRef.current.style.transform = 'translateY(0)';
        }
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [activeProductId]);
  
  // Get active product data
  const activeProduct = productsData.find(p => p.id === activeProductId) || productsData[0];
  
  // Animation class generator
  const getAnimationClass = (delay = 0) => {
    return `transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
      aria-labelledby="products-section-title"
    >
      {/* Enhanced background elements with subtle gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_bottom_left,rgba(165,243,252,0.15),transparent_60%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent_60%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply blur-3xl opacity-50"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${getAnimationClass()}`} style={{transitionDelay: '100ms'}}>
          <div className="inline-block px-5 py-1.5 sm:px-6 sm:py-2 bg-indigo-50 rounded-full text-indigo-700 font-medium mb-4 shadow-sm border border-indigo-100">
            Innovative Healthcare Solutions
          </div>
          <SectionTitle 
            title="Our Products" 
            id="products-section-title"
            subtitle="Powerful technologies designed to address critical healthcare challenges and optimize operations" 
          />
        </div>
        
        {/* Main Products Content */}
        <div className={`${getAnimationClass()}`} style={{transitionDelay: '200ms'}}>
          {/* Tabs Navigation */}
          <div className="mb-8 md:mb-12 flex items-center justify-center">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-xl">
              {productsData.map((product) => (
                <button
                  key={product.id}
                  className={`px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                    activeProductId === product.id 
                      ? 'bg-white text-indigo-700 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  onClick={() => setActiveProductId(product.id)}
                  aria-pressed={activeProductId === product.id}
                  aria-label={`View ${product.title} details`}
                >
                  {product.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details Card */}
          <Card
            ref={detailsRef}
            className="overflow-hidden transition-all duration-500"
            elevation="lg"
            border={true}
            padding="none"
            style={{ opacity: 0, transform: 'translateY(10px)' }}
          >
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 h-16 sm:h-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_70%)]"></div>
              
              {/* Product Icon in Circle */}
              <div className="absolute -bottom-8 left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                <img 
                  src={activeProduct?.icon} 
                  alt={activeProduct?.title + " icon"} 
                  className="w-8 h-8 sm:w-10 sm:h-10" 
                />
              </div>
            </div>
            
            {/* Product Content */}
            <div className="p-6 sm:p-8 pt-10 sm:pt-12">
              {/* Product Title and Description */}
              <div className="mb-8 sm:mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
                  {activeProduct?.title}
                </h3>
                <p className="text-slate-600">
                  {activeProduct?.description || `Our innovative ${activeProduct?.title} delivers exceptional value by optimizing healthcare operations and improving outcomes for all stakeholders.`}
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                    <ChevronRight size={14} />
                  </span>
                  Key Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeProduct?.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex items-start p-4 rounded-lg border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors duration-200"
                      style={{ 
                        animation: 'fadeIn 0.4s forwards',
                        animationDelay: `${index * 50}ms`,
                        opacity: 0
                      }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <ShieldIcon index={index} />
                      </div>
                      <div>
                        <p className="text-slate-700">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Benefits Section */}
              <div className="mb-8 border-t border-slate-100 pt-8">
                <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                    <ChevronRight size={14} />
                  </span>
                  Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Reduce costs by up to 25%', 'Improve efficiency by 40%', 'Enhance patient satisfaction'].map((benefit, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <p className="text-slate-700 font-medium">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-end border-t border-slate-100 pt-6">
                <Button 
                  variant="outline"
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                  View Documentation
                </Button>
                <Button 
                  variant="primary"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Product Cards for Mobile - Alternative View */}
          <div className="mt-10 md:hidden space-y-4">
            <h4 className="text-lg font-medium text-slate-700 mb-4">More Solutions</h4>
            {productsData
              .filter(product => product.id !== activeProductId)
              .slice(0, 2)
              .map((product) => (
                <Card 
                  key={product.id}
                  className="cursor-pointer"
                  elevation="sm"
                  hover={true}
                  onClick={() => setActiveProductId(product.id)}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <img 
                        src={product.icon} 
                        alt={product.title + " icon"} 
                        className="w-5 h-5" 
                      />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-800">{product.title}</h5>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className={`mt-16 sm:mt-20 text-center ${getAnimationClass()}`} style={{transitionDelay: '300ms'}}>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 shadow-sm">
            <span className="text-lg font-semibold text-indigo-700">Ready to transform your healthcare operations?</span>
          </div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Our suite of products works seamlessly together to create an integrated solution that addresses your organization's unique challenges.
          </p>
          
          <Button 
            variant="primary" 
            size="lg"
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
          >
            Request a Demo
          </Button>
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

// Generate different icons for features based on index
function ShieldIcon({ index }) {
  // Array of icon components
  const icons = [
    <Shield size={16} key="shield" className="text-indigo-600" />,
    <Clock size={16} key="clock" className="text-indigo-600" />,
    <BarChart size={16} key="chart" className="text-indigo-600" />,
    <Activity size={16} key="activity" className="text-indigo-600" />,
    <Database size={16} key="database" className="text-indigo-600" />
  ];
  
  // Return icon based on index, cycling through available icons
  return icons[index % icons.length];
}

export default Products;