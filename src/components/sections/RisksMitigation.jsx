// src/components/sections/RisksMitigation.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, ChevronRight, AlertCircle, CheckCircle, Lock, Zap, Sparkles } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { risksData } from '../../constants/risks';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && options.unobserveOnIntersect) {
          observer.unobserve(entry.target);
        }
      },
      options
    );

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

// Badge component
const Badge = memo(({ children, color = "amber" }) => {
  const colorClasses = {
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  };
  
  return (
    <motion.span 
      className={`inline-flex px-5 py-2 rounded-full text-sm font-medium ${colorClasses[color]} shadow-sm border`}
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.span>
  );
});

// Animated Risk Row component
const RiskRow = memo(({ item, index }) => {
  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 border-b border-slate-200 group ${
        index === risksData.length - 1 ? 'border-b-0' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.8)" }}
    >
      <div className="p-5 md:p-6 md:border-r border-slate-200 relative overflow-hidden">
        {/* Subtle pattern for risk */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="risk-pattern" patternUnits="userSpaceOnUse" width="40" height="40">
                <path d="M0 20 L40 20 M20 0 L20 40" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1,3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#risk-pattern)"/>
          </svg>
        </div>
        
        <div className="flex relative z-10">
          <motion.div 
            className="w-8 h-8 rounded-lg bg-amber-50 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 shadow-sm border border-amber-100"
            whileHover={{ scale: 1.1, backgroundColor: "#fef3c7" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <AlertCircle size={16} className="text-amber-600" />
          </motion.div>
          <div>
            <p className="text-slate-700 font-medium">{item.risk}</p>
            {item.riskImpact && (
              <motion.p 
                className="mt-2 text-sm text-slate-500"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="font-medium text-amber-700">Impact:</span> {item.riskImpact}
              </motion.p>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-5 md:p-6 bg-white relative overflow-hidden">
        {/* Subtle pattern for mitigation */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mitigation-pattern" patternUnits="userSpaceOnUse" width="40" height="40">
                <circle cx="20" cy="20" r="1" fill="#10b981"/>
                <circle cx="0" cy="0" r="1" fill="#10b981"/>
                <circle cx="0" cy="40" r="1" fill="#10b981"/>
                <circle cx="40" cy="0" r="1" fill="#10b981"/>
                <circle cx="40" cy="40" r="1" fill="#10b981"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mitigation-pattern)"/>
          </svg>
        </div>
        
        <div className="flex relative z-10">
          <motion.div 
            className="w-8 h-8 rounded-lg bg-emerald-50 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 shadow-sm border border-emerald-100"
            whileHover={{ scale: 1.1, backgroundColor: "#ecfdf5" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CheckCircle size={16} className="text-emerald-600" />
          </motion.div>
          <div>
            <p className="text-slate-700 font-medium">{item.mitigation}</p>
            {item.mitigationStrategy && (
              <motion.p 
                className="mt-2 text-sm text-slate-500"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <span className="font-medium text-emerald-700">Strategy:</span> {item.mitigationStrategy}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const RisksMitigation = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    unobserveOnIntersect: true 
  });

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
      aria-labelledby="risks-mitigation-title"
    >
      {/* Enhanced background elements with animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_top_left,rgba(251,191,36,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(5,150,105,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-50 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-50 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge color="amber" className="mb-4">
            <span className="flex items-center gap-2">
              <Sparkles size={15} className="text-amber-500" />
              Risk Assessment & Mitigation Plan
            </span>
          </Badge>
          
          <SectionTitle 
            id="risks-mitigation-title"
            title="Risks & Mitigations" 
            subtitle="We've identified key risks and developed comprehensive strategies to address each challenge"
          />
        </motion.div>

        <motion.div
          className="rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-5 md:p-6 flex items-center relative overflow-hidden">
              {/* Animated pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="risk-header-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#risk-header-pattern)" />
                </svg>
              </div>
              
              <motion.div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mr-4 shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <AlertTriangle size={20} className="text-white" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-bold text-white relative z-10">Potential Risks</h3>
            </div>
            
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-5 md:p-6 flex items-center relative overflow-hidden">
              {/* Animated pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="mitigation-header-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="5" cy="5" r="1" fill="white" opacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#mitigation-header-pattern)" />
                </svg>
              </div>
              
              <motion.div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mr-4 shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Shield size={20} className="text-white" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-bold text-white relative z-10">Our Mitigations</h3>
            </div>
          </div>

          {/* Content rows */}
          <div className="bg-slate-50/80 backdrop-blur-sm">
            {risksData.map((item, index) => (
              <RiskRow 
                key={item.id} 
                item={item} 
                index={index}
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm hover:shadow transition-shadow duration-300">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Lock size={16} />
            </div>
            <span className="text-base md:text-lg font-semibold text-slate-700">
              Comprehensive risk assessment updated quarterly
            </span>
          </div>
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
          animation: blob 30s infinite alternate;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default RisksMitigation;