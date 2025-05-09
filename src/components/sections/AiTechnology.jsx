// src/components/sections/AiTechnology.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Database, Wifi, Globe, ShieldCheck, Cpu, MapPin, CheckCircle2, BarChart2, Lock, Sparkles } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

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

// Enhanced BentoBox component with Framer Motion
const BentoBox = memo(({ className = "", children, delay = 0, hover = true }) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: "easeOut" }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
    >
      {children}
    </motion.div>
  );
});

// Reusable feature item component
const FeatureItem = memo(({ icon: Icon, text, dark = false }) => (
  <div className="flex items-start group">
    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 transition-colors duration-200 ${
      dark ? 'bg-white/20 group-hover:bg-white/30' : 'bg-indigo-100 group-hover:bg-indigo-200'
    }`}>
      <Icon size={14} className={dark ? "text-white" : "text-indigo-700"} />
    </div>
    <span className={`${dark ? 'text-white' : 'text-slate-700'} text-sm`}>{text}</span>
  </div>
));

// Reusable metric box component with animation
const MetricBox = memo(({ value, label, color = "indigo" }) => {
  const colors = {
    indigo: "from-indigo-500 to-indigo-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
  };
  
  return (
    <motion.div 
      className="text-center p-5 rounded-xl bg-white border border-slate-200 shadow-md relative overflow-hidden"
      whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Gradient overlay at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors[color]}`}></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
      >
        <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{value}</div>
        <div className="text-slate-600 font-medium text-sm">{label}</div>
      </motion.div>
    </motion.div>
  );
});

// Badge component
const Badge = memo(({ children, color = "indigo" }) => {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
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

const AiTechnology = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    unobserveOnIntersect: true 
  });

  return (
    <section 
      ref={sectionRef} 
      className="py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
      aria-labelledby="ai-technology-title"
    >
      {/* Enhanced background elements with animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_top_right,rgba(79,70,229,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(165,243,252,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Badge color="indigo" className="mb-4">
            <span className="flex items-center gap-2">
              <Sparkles size={15} className="text-indigo-500" />
              Powered by Advanced AI
            </span>
          </Badge>
          
          <SectionTitle 
            id="ai-technology-title"
            title="AI Technology" 
            subtitle="Our custom DeepSeek LLM model delivers intelligent healthcare insights optimized for Nigeria's unique environment"
          />
        </motion.div>
        
        {/* Improved Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Main Feature: DeepSeek LLM */}
          <BentoBox className="col-span-12 lg:col-span-6" delay={0}>
            <div className="h-full flex flex-col md:flex-row">
              <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 text-white p-6 md:p-8 md:w-2/5 flex flex-col justify-center relative overflow-hidden">
                {/* Animated pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="relative">
                    <Brain size={40} className="mb-5 text-indigo-200" />
                    <h3 className="text-xl md:text-2xl font-bold mb-3">DeepSeek LLM Model</h3>
                    <p className="text-indigo-100 text-sm md:text-base">
                      State-of-the-art AI specifically fine-tuned for Nigerian healthcare
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="p-6 md:p-8 md:w-3/5 bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 h-full">
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mr-3 shadow-sm">
                      <Database size={18} className="text-indigo-700" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-slate-800">7B Parameters</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mr-3 shadow-sm">
                      <Cpu size={18} className="text-indigo-700" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-slate-800">Mobile Optimized</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mr-3 shadow-sm">
                      <ShieldCheck size={18} className="text-indigo-700" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-slate-800">Privacy-Focused</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mr-3 shadow-sm">
                      <Zap size={18} className="text-indigo-700" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-slate-800">Low Latency</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </BentoBox>
          
          {/* Data Security */}
          <BentoBox className="col-span-12 lg:col-span-6" delay={1}>
            <div className="h-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
              {/* Animated security pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="security-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#security-grid)" />
                </svg>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <Lock size={36} className="mb-5 text-blue-200" />
                  <h3 className="text-xl md:text-2xl font-bold mb-3">Data Security</h3>
                  <p className="text-blue-100 text-sm md:text-base mb-6">
                    Enterprise-grade protection for all healthcare data with robust security measures
                  </p>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <FeatureItem 
                    icon={ShieldCheck} 
                    text="On-device processing" 
                    dark={true}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <FeatureItem 
                    icon={ShieldCheck} 
                    text="HIPAA-compliant" 
                    dark={true}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <FeatureItem 
                    icon={ShieldCheck} 
                    text="End-to-end encryption" 
                    dark={true}
                  />
                </motion.div>
              </div>
            </div>
          </BentoBox>
          
          {/* Nigeria-Specific Data */}
          <BentoBox className="col-span-12 md:col-span-6 lg:col-span-4" delay={2}>
            <div className="h-full flex flex-col p-6 md:p-7 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="nigeria-pattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
                      <rect width="100%" height="100%" fill="none"/>
                      <path d="M0 20 L40 20" stroke="#4338ca" strokeWidth="1" strokeDasharray="1,3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#nigeria-pattern)"/>
                </svg>
              </div>
            
              <motion.div 
                className="flex items-center mb-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center mr-4 shadow-md">
                  <Globe size={20} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">Nigeria-Specific Data</h3>
              </motion.div>
              
              <div className="space-y-4 mt-3 flex-grow">
                {[
                  "Trained on unique Nigerian healthcare data",
                  "Not generic internet-scraped data",
                  "Understands local medical terminology",
                  "Tailored to regional healthcare practices"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                  >
                    <FeatureItem 
                      icon={CheckCircle2} 
                      text={text} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoBox>
          
          {/* Offline Capability */}
          <BentoBox className="col-span-12 md:col-span-6 lg:col-span-4" delay={3}>
            <div className="h-full flex flex-col p-6 md:p-7 relative overflow-hidden">
              {/* Subtle wifi pattern background */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="wifi-pattern" patternUnits="userSpaceOnUse" width="60" height="60">
                      <path d="M0 30 A 30 30 0 0 1 60 30" fill="none" stroke="#4338ca" strokeWidth="1" strokeDasharray="2,4"/>
                      <path d="M15 30 A 15 15 0 0 1 45 30" fill="none" stroke="#4338ca" strokeWidth="1" strokeDasharray="2,4"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#wifi-pattern)"/>
                </svg>
              </div>
            
              <motion.div 
                className="flex items-center mb-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mr-4 shadow-md">
                  <Wifi size={20} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">Offline Capable</h3>
              </motion.div>
              
              <div className="space-y-4 mt-3 flex-grow">
                {[
                  "Works without internet connection",
                  "Runs locally on PC or smartphone",
                  "Perfect for areas with limited connectivity",
                  "No disruption during network outages"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                  >
                    <FeatureItem 
                      icon={CheckCircle2} 
                      text={text} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoBox>
          
          {/* Performance */}
          <BentoBox className="col-span-12 md:col-span-6 lg:col-span-4" delay={4}>
            <div className="h-full flex flex-col p-6 md:p-7 relative overflow-hidden">
              {/* Subtle zap pattern background */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="performance-pattern" patternUnits="userSpaceOnUse" width="40" height="40">
                      <path d="M20 0 L25 20 L40 25 L25 30 L20 50 L15 30 L0 25 L15 20 Z" fill="none" stroke="#4338ca" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#performance-pattern)"/>
                </svg>
              </div>
            
              <motion.div 
                className="flex items-center mb-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mr-4 shadow-md">
                  <Zap size={20} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">High Performance</h3>
              </motion.div>
              
              <div className="space-y-4 mt-3 flex-grow">
                {[
                  "Optimized for low-resource environments",
                  "Quick response times even on older devices",
                  "Minimal battery consumption",
                  "Efficient memory usage"
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                  >
                    <FeatureItem 
                      icon={CheckCircle2} 
                      text={text} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoBox>
          
          {/* Performance Metrics - Full width box */}
          <BentoBox className="col-span-12" delay={5} hover={false}>
            <div className="flex flex-col md:flex-row items-center p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white">
              <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">Performance Metrics</h3>
                  <p className="text-slate-600 text-sm md:text-base">
                    Our AI outperforms traditional systems across all key metrics, delivering measurable benefits for healthcare providers
                  </p>
                </motion.div>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <MetricBox value="97%" label="Accuracy" color="indigo" />
                <MetricBox value="85%" label="Time Savings" color="blue" />
                <MetricBox value="43%" label="Cost Reduction" color="purple" />
              </div>
            </div>
          </BentoBox>
        </div>
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
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default AiTechnology;