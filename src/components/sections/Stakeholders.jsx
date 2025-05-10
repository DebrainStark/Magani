import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building, Briefcase, ArrowRight, CheckCircle, XCircle, Play, ChevronRight, ChevronDown, Zap } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { stakeholdersData } from '../../constants/stakeholders';

// Enhanced card component with tabbed interaction
const EnhancedCard = ({ title, icon: Icon, problem, benefits, color, delay }) => {
  const [activeTab, setActiveTab] = useState('benefits');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay setting visibility to allow smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);

  // Safely generate border class
  const getBorderClass = () => {
    switch (color.name) {
      case 'primary':
        return 'border-primary-200';
      case 'secondary':
        return 'border-secondary-200';
      case 'blue':
        return 'border-blue-200';
      case 'purple':
        return 'border-purple-200';
      case 'teal':
        return 'border-teal-200';
      default:
        return 'border-slate-200';
    }
  };

  // Safely generate tab active border
  const getActiveTabBorder = () => {
    switch (color.name) {
      case 'primary':
        return 'border-primary-500';
      case 'secondary':
        return 'border-secondary-500';
      case 'blue':
        return 'border-blue-500';
      case 'purple':
        return 'border-purple-500';
      case 'teal':
        return 'border-teal-500';
      default:
        return 'border-slate-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-2xl border-2 ${getBorderClass()} bg-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group`}
    >
      {/* Top decoration bar */}
      <div className={`h-3 w-full ${color.bg}`}></div>
      
      {/* Card header */}
      <div className="p-8 pb-5">
        <div className="flex items-center mb-6">
          <div className={`w-16 h-16 rounded-full ${color.bgLight} ${color.text} flex items-center justify-center mr-4 shadow-md group-hover:scale-110 transition-transform duration-500`}>
            <Icon size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        </div>
        
        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`flex items-center py-3 px-4 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === 'benefits' 
                ? `${color.text} ${getActiveTabBorder()}` 
                : 'text-slate-500 border-transparent hover:text-slate-700'
            }`}
          >
            <CheckCircle size={16} className="mr-2" />
            Benefits
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`flex items-center py-3 px-4 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === 'challenges' 
                ? 'text-red-600 border-red-500' 
                : 'text-slate-500 border-transparent hover:text-slate-700'
            }`}
          >
            <XCircle size={16} className="mr-2" />
            Challenges
          </button>
        </div>
      </div>
      
      {/* Card content - tab panels */}
      <div className="px-8 pb-8">
        <AnimatePresence mode="wait">
          {activeTab === 'benefits' ? (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className={`w-6 h-6 rounded-full ${color.bgLight} ${color.text} flex-shrink-0 flex items-center justify-center mr-3 mt-0.5`}>
                      <Zap size={14} />
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-5 bg-red-50 rounded-xl border border-red-100"
            >
              <div className="flex items-start">
                <XCircle size={20} className="text-red-500 mr-3 mt-1 flex-shrink-0" />
                <p className="text-slate-700">{problem}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative corner element */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${color.bgLight} rounded-full opacity-50`}></div>
    </motion.div>
  );
};

const getStakeholderIcon = (type) => {
  switch (type) {
    case 'patients':
      return Users;
    case 'providers':
      return Building;
    case 'payers':
      return Briefcase;
    default:
      return Users;
  }
};

// Updated color mapping using our design system
const getStakeholderColor = (type) => {
  switch (type) {
    case 'patients':
      return {
        name: 'secondary',
        border: 'border-secondary-200',
        bg: 'bg-secondary-500',
        bgLight: 'bg-secondary-50',
        text: 'text-secondary-600'
      };
    case 'providers':
      return {
        name: 'purple',
        border: 'border-purple-200',
        bg: 'bg-purple-500',
        bgLight: 'bg-purple-50',
        text: 'text-purple-600'
      };
    case 'payers':
      return {
        name: 'primary',
        border: 'border-primary-200',
        bg: 'bg-primary-500',
        bgLight: 'bg-primary-50',
        text: 'text-primary-600'
      };
    default:
      return {
        name: 'slate',
        border: 'border-slate-200',
        bg: 'bg-slate-500',
        bgLight: 'bg-slate-50',
        text: 'text-slate-600'
      };
  }
};

// Custom animated section heading
const AnimatedSectionHeading = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block px-6 py-2 bg-indigo-50 rounded-full text-indigo-700 font-medium mb-4 shadow-sm border border-indigo-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
            <Play size={12} className="text-indigo-700 ml-0.5" />
          </div>
          <span>Creating Value for Everyone</span>
        </div>
      </motion.div>
      
      <SectionTitle 
        title="Stakeholder Benefits" 
        accent="indigo"
        subtitle= "Our solution addresses critical pain points and delivers measurable value to all healthcare ecosystem participants"
      />
      
      
    </motion.div>
  );
};

const Stakeholders = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Function to handle mobile accordion toggling
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="stakeholder" className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-slate-100 relative overflow-hidden">
      {/* Enhanced decorative elements with animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-10 w-64 h-64 rounded-full border-8 border-secondary-100"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full border-8 border-primary-100"
        ></motion.div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-16 border-purple-100 opacity-20"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTkuNSAwaC01OUMuMiAwIDAgLjIgMCAuNXY1OWMwIC4zLjIuNS41LjVoNTljLjMgMCAuNS0uMi41LS41Vi41YzAtLjMtLjItLjUtLjUtLjV6TTEgMWg1OHY1OEgxVjF6IiBmaWxsPSIjZjFmNWY5IiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl relative z-10">
        <AnimatedSectionHeading />
        
        {/* Desktop view - grid layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {stakeholdersData.map((stakeholder, index) => (
            <EnhancedCard
              key={stakeholder.id}
              title={stakeholder.title}
              icon={getStakeholderIcon(stakeholder.type)}
              problem={stakeholder.problem}
              benefits={stakeholder.benefits}
              color={getStakeholderColor(stakeholder.type)}
              delay={index * 0.2}
            />
          ))}
        </div>
        
        {/* Mobile view - accordion layout */}
        <div className="md:hidden space-y-4">
          {stakeholdersData.map((stakeholder, index) => {
            const color = getStakeholderColor(stakeholder.type);
            const Icon = getStakeholderIcon(stakeholder.type);
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={stakeholder.id} 
                className={`rounded-xl border-2 ${color.border} bg-white overflow-hidden transition-all duration-300 shadow-md ${isActive ? 'shadow-lg' : ''}`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full ${color.bgLight} ${color.text} flex items-center justify-center mr-3`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{stakeholder.title}</h3>
                  </div>
                  <div className={`${color.text} transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 pb-6 border-t border-slate-100">
                        <div className="mb-4 p-3 bg-red-50 rounded-lg">
                          <div className="flex items-start">
                            <XCircle size={18} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-slate-700 text-sm">{stakeholder.problem}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className={`text-base font-semibold ${color.text}`}>Benefits:</h4>
                          <ul className="space-y-2">
                            {stakeholder.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start text-sm">
                                <ChevronRight size={16} className={`mr-2 mt-0.5 ${color.text} flex-shrink-0`} />
                                <span className="text-slate-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stakeholders;