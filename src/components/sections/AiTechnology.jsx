import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Database, Wifi, Globe, ShieldCheck, Cpu, CheckCircle2, X, Plus, ArrowDown } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';


// Optimized useMediaQuery hook
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches); // Set initial value immediately
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]); // Only depend on query

  return matches;
};

// Shared IntersectionObserver hook
const useIntersectionObserver = () => {
  const observerRef = useRef(null);
  
  if (!observerRef.current && typeof window !== 'undefined') {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.dataset.delay || 0;
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
            observerRef.current.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );
  }
  
  return observerRef.current;
};

// SVG Patterns Component
const SvgPatterns = memo(() => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
      </pattern>
      <pattern id="security-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.5" />
      </pattern>
    </defs>
  </svg>
));

// Feature icon component
const FeatureIcon = memo(({ icon: IconComponent, size, className }) => (
  <IconComponent size={size || 20} className={className} />
));

// CheckItem component for feature lists
const CheckItem = memo(({ text, bgColor = "primary" }) => (
  <div className="flex items-start">
    <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 bg-${bgColor}-100`}>
      <CheckCircle2 size={14} className={`text-${bgColor}-700`} />
    </div>
    <span className="text-slate-700 text-sm">{text}</span>
  </div>
));

// Desktop Bento Box Component - optimized
const BentoBox = memo(({ className, children, delay = 0 }) => {
  const ref = useRef(null);
  const observer = useIntersectionObserver();
  
  useEffect(() => {
    if (ref.current && observer) {
      ref.current.dataset.delay = delay;
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current && observer) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, observer]);
  
  return (
    <div
      ref={ref}
      className={`bento-box bg-white rounded-2xl shadow-lg overflow-hidden opacity-0 transform translate-y-5 transition-all duration-500 ${className}`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  );
});

// MetricCard component for reuse
const MetricCard = memo(({ value, label, color }) => (
  <div className="text-center p-5 rounded-xl bg-white relative">
    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${color}-500 to-${color}-600`}></div>
    <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">{value}</div>
    <div className="text-slate-600 font-medium text-sm">{label}</div>
  </div>
));

// Mobile Feature Card Component - optimized with memo
const MobileFeatureCard = memo(({ feature, index, expanded, toggleExpand }) => {
  const IconComponent = feature.icon;
  const isExpanded = expanded === index;
  
  return (
    <motion.div 
      className={`rounded-2xl overflow-hidden mb-4 shadow-lg relative ${
        isExpanded ? "bg-white" : `bg-gradient-to-br ${feature.color}`
      }`}
      layoutId={`card-container-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header always visible */}
      <motion.div 
        className={`p-4 flex items-center justify-between ${
          isExpanded ? "border-b border-slate-100" : ""
        }`}
        layoutId={`card-header-${index}`}
        onClick={() => toggleExpand(index)}
      >
        <div className="flex items-center">
          <motion.div
            layoutId={`card-icon-${index}`}
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isExpanded ? `bg-${feature.bgColor}-100` : "bg-white/20"
            }`}
          >
            <IconComponent size={20} className={isExpanded ? `text-${feature.bgColor}-600` : "text-white"} />
          </motion.div>
          <motion.div
            layoutId={`card-title-${index}`}
            className={isExpanded ? "text-slate-800 font-bold" : "text-white font-bold"}
          >
            {feature.title}
          </motion.div>
        </div>
        
        <motion.div
          className={`rounded-full w-7 h-7 flex items-center justify-center ${
            isExpanded ? "bg-slate-100 text-slate-500" : "bg-white/20 text-white"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {isExpanded ? <X size={14} /> : <Plus size={14} />}
        </motion.div>
      </motion.div>
      
      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-2">
              <p className="text-slate-600 text-sm mb-4">
                {feature.description}
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {feature.features.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full bg-${feature.bgColor}-50 flex items-center justify-center mr-3`}>
                      <CheckCircle2 size={14} className={`text-${feature.bgColor}-500`} />
                    </div>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Mobile Metrics Stack - optimized
const MobileMetricStack = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const metrics = [
    { value: "97%", label: "Accuracy", color: "primary" },
    { value: "85%", label: "Time Savings", color: "secondary" },
    { value: "43%", label: "Cost Reduction", color: "purple" }
  ];
  
  const cycleMetric = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % metrics.length);
  }, [metrics.length]);
  
  return (
    <div className="relative h-40 mb-8">
      {metrics.map((metric, index) => {
        const isActive = index === activeIndex;
        const isNext = (index === (activeIndex + 1) % metrics.length);
        const isAfterNext = (index === (activeIndex + 2) % metrics.length);
        
        let position = {};
        let zIndex = 0;
        
        if (isActive) {
          position = { top: "0%", left: "0%", right: "0%" };
          zIndex = 30;
        } else if (isNext) {
          position = { top: "10%", left: "5%", right: "5%" };
          zIndex = 20;
        } else if (isAfterNext) {
          position = { top: "20%", left: "10%", right: "10%" };
          zIndex = 10;
        }
        
        return (
          <motion.div
            key={index}
            className="absolute text-center p-5 pt-4 rounded-xl bg-white border border-slate-200 shadow-lg"
            style={{ 
              ...position, 
              zIndex,
              opacity: isAfterNext ? 0.5 : 1,
              pointerEvents: isActive ? "auto" : "none"
            }}
            initial={false}
            animate={{ 
              top: position.top, 
              left: position.left, 
              right: position.right,
              opacity: isAfterNext ? 0.5 : 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={cycleMetric}
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600`}></div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{metric.value}</div>
            <div className="text-slate-600 font-medium text-sm">{metric.label}</div>
            
            {isActive && (
              <motion.div 
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-slate-400"
                initial={{ y: 0 }}
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowDown size={16} />
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
});

// Feature data - moved outside component to avoid recreating on each render
const FEATURES = [
  {
    icon: Brain,
    title: "DeepSeek LLM Model",
    color: "from-primary-700 to-primary-900",
    bgColor: "primary",
    iconColor: "text-primary-200",
    description: "State-of-the-art AI specifically fine-tuned for Nigerian healthcare with 7B parameters",
    features: [
      "7B parameters optimized model",
      "Mobile-first architecture",
      "Designed for low-latency",
      "Privacy-focused design"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    color: "from-secondary-700 to-primary-800",
    bgColor: "secondary",
    iconColor: "text-secondary-200",
    description: "End-to-end encrypted data protection with HIPAA-compliance for all healthcare information",
    features: [
      "End-to-end encryption",
      "HIPAA-compliant",
      "On-device processing",
      "Zero data retention"
    ]
  },
  {
    icon: Globe,
    title: "Nigeria-Specific",
    color: "from-green-700 to-green-800",
    bgColor: "green",
    iconColor: "text-green-200",
    description: "Trained specifically on Nigerian healthcare data with localized medical terminology",
    features: [
      "Nigerian medical terminology",
      "Local healthcare protocols",
      "Regional disease profiles",
      "Cultural context awareness"
    ]
  },
  {
    icon: Wifi,
    title: "Offline Capable",
    color: "from-blue-700 to-blue-900",
    bgColor: "blue",
    iconColor: "text-blue-200",
    description: "Works without internet connection - perfect for areas with limited connectivity",
    features: [
      "Zero internet requirement",
      "Works during network outages",
      "Minimal data transfer needed",
      "Reliable in remote areas"
    ]
  }
];

// Metrics data - constants to avoid recreation
const METRICS = [
  { value: "97%", label: "Accuracy", color: "primary" },
  { value: "85%", label: "Time Savings", color: "secondary" },
  { value: "43%", label: "Cost Reduction", color: "purple" }
];

// Main AI Technology Component - optimized
const AiTechnology = () => {
  // Detect mobile vs desktop - only rendering what's needed
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [expandedCard, setExpandedCard] = useState(null);
  
  // Memoized toggle function to avoid recreation
  const toggleExpand = useCallback((index) => {
    setExpandedCard(prevExpanded => prevExpanded === index ? null : index);
  }, []);
  
  // Memoized desktop renderer
  const renderDesktop = useCallback(() => (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Main Feature: DeepSeek LLM - Large card */}
      <BentoBox className="col-span-12 lg:col-span-6" delay={0}>
        <div className="h-full flex flex-col md:flex-row">
          <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white p-6 md:p-8 md:w-2/5 flex flex-col justify-center relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative">
              <Brain size={40} className="mb-5 text-primary-200" />
              <h3 className="text-xl md:text-2xl font-bold mb-3">DeepSeek LLM Model</h3>
              <p className="text-primary-100 text-sm md:text-base">
                State-of-the-art AI specifically fine-tuned for Nigerian healthcare
              </p>
            </div>
          </div>
          
          <div className="p-6 md:p-8 md:w-3/5 bg-white">
            <div className="grid grid-cols-2 gap-y-6 h-full">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mr-3 shadow-sm">
                  <Database size={18} className="text-primary-700" />
                </div>
                <span className="font-medium text-sm md:text-base text-slate-800">7B Parameters</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mr-3 shadow-sm">
                  <Cpu size={18} className="text-primary-700" />
                </div>
                <span className="font-medium text-sm md:text-base text-slate-800">Mobile Optimized</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mr-3 shadow-sm">
                  <ShieldCheck size={18} className="text-primary-700" />
                </div>
                <span className="font-medium text-sm md:text-base text-slate-800">Privacy-Focused</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mr-3 shadow-sm">
                  <Zap size={18} className="text-primary-700" />
                </div>
                <span className="font-medium text-sm md:text-base text-slate-800">Low Latency</span>
              </div>
            </div>
          </div>
        </div>
      </BentoBox>
      
      {/* Security */}
      <BentoBox className="col-span-12 lg:col-span-6" delay={1}>
        <div className="h-full bg-gradient-to-br from-secondary-700 to-primary-800 text-white p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect width="100" height="100" fill="url(#security-grid)" />
            </svg>
          </div>
          
          <div className="relative">
            <ShieldCheck size={36} className="mb-5 text-secondary-200" />
            <h3 className="text-xl md:text-2xl font-bold mb-3">Enterprise Security</h3>
            <p className="text-secondary-100 text-sm md:text-base mb-6">
              Enterprise-grade protection for all healthcare data with robust security measures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-start group">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 bg-white/20 group-hover:bg-white/30">
                <ShieldCheck size={14} className="text-white" />
              </div>
              <span className="text-white text-sm">End-to-end encryption</span>
            </div>
            
            <div className="flex items-start group">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 bg-white/20 group-hover:bg-white/30">
                <ShieldCheck size={14} className="text-white" />
              </div>
              <span className="text-white text-sm">HIPAA-compliant</span>
            </div>
            
            <div className="flex items-start group">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 bg-white/20 group-hover:bg-white/30">
                <ShieldCheck size={14} className="text-white" />
              </div>
              <span className="text-white text-sm">On-device processing</span>
            </div>
          </div>
        </div>
      </BentoBox>
      
      {/* Performance Metrics - Row of 3 */}
      {METRICS.map((metric, index) => (
        <BentoBox key={metric.label} className="col-span-4" delay={index + 2}>
          <MetricCard value={metric.value} label={metric.label} color={metric.color} />
        </BentoBox>
      ))}
      
      {/* Nigeria-Specific Data */}
      <BentoBox className="col-span-6" delay={5}>
        <div className="h-full flex flex-col p-6 md:p-7 relative overflow-hidden">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center mr-4 shadow-md">
              <Globe size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Nigeria-Specific Data</h3>
          </div>
          
          <div className="space-y-3 mt-2">
            <CheckItem text="Local medical terminology" />
            <CheckItem text="Regional healthcare practices" />
          </div>
        </div>
      </BentoBox>
      
      {/* Offline Capability */}
      <BentoBox className="col-span-6" delay={6}>
        <div className="h-full flex flex-col p-6 md:p-7 relative overflow-hidden">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center mr-4 shadow-md">
              <Wifi size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Offline Capable</h3>
          </div>
          
          <div className="space-y-3 mt-2">
            <CheckItem text="Works without internet" />
            <CheckItem text="Perfect for limited connectivity" />
          </div>
        </div>
      </BentoBox>
    </div>
  ), []);
  
  // Memoized mobile renderer
  const renderMobile = useCallback(() => (
    <div className="px-1">
      {/* Interactive 3D Stack for metrics */}
      <MobileMetricStack />
      
      {/* Expandable Feature Cards */}
      <div className="mb-8">
        {FEATURES.map((feature, index) => (
          <MobileFeatureCard
            key={index}
            feature={feature}
            index={index}
            expanded={expandedCard}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>
    </div>
  ), [expandedCard, toggleExpand]);
  
  return (
    <section 
      id="ai"
      className="py-14 md:py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Only render SVG patterns once */}
      <SvgPatterns />
      
      {/* Optimized background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_top_right,rgba(22,163,74,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(37,99,235,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary-50 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <div className="mb-4">
            <motion.span 
              className="inline-flex px-5 py-2 rounded-full text-sm font-medium bg-primary-50 text-primary-700 border-primary-100 shadow-sm border"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="flex items-center gap-2">
                <Zap size={15} className="text-primary-500" />
                AI-Powered Healthcare
              </span>
            </motion.span>
          </div>
          
          <SectionTitle 
            id="ai-technology-title"
            title="AI Technology" 
            subtitle={isMobile ? "Our DeepSeek LLM model for Nigerian healthcare" : "Our custom DeepSeek LLM model delivers intelligent healthcare insights optimized for Nigeria's unique environment"}
          />
        </div>
        
        {isMobile ? renderMobile() : renderDesktop()}
      </div>


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

      .bento-box {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease-out, transform 0.5s ease-out;
      }

      @media (prefers-reduced-motion: reduce) {
        .animate-blob {
        animation: none;
      }
  
      .bento-box {
        transition: none;
      }
    }   
      `}</style>
    </section>

    
  );
};

export default AiTechnology;      