import React, { useState, useEffect, useRef, memo } from 'react';
import { AlertTriangle, BarChart4, PieChart, DollarSign, TrendingDown, ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

const PROBLEM_CARDS = [
  { 
    id: 1, 
    title: "High Utilization", 
    description: "Excessive healthcare service usage without proper controls",
    icon: BarChart4,
    color: "primary",
    number: "01"
  },
  { 
    id: 2, 
    title: "Increased Costs", 
    description: "Rising medical expenses for payers",
    icon: DollarSign,
    color: "secondary",
    number: "02"
  },
  { 
    id: 3, 
    title: "Elevated MLR", 
    description: "Medical Loss Ratio above 100-140%",
    icon: PieChart,
    color: "purple",
    number: "03"
  },
  { 
    id: 4, 
    title: "Low Profitability", 
    description: "Unsustainable business model",
    icon: TrendingDown,
    color: "red",
    number: "04"
  }
];

// Custom hook for intersection observation - unchanged
const useIntersectionObserver = (options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      options
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [options]);

  return [elementRef, isIntersecting];
};

// Memoized ProblemCard component with consistent height
const ProblemCard = memo(({ card, isActive, onActivate, isVisible, delay, flowDirection }) => {
  const { id, title, description, icon: Icon, color, number } = card;

  // Consistent color mapping function
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return {
          bg: isActive ? "bg-primary-50" : "bg-white",
          hoverBg: "hover:bg-primary-50/50",
          iconBg: isActive ? "bg-primary-100" : "bg-primary-50",
          iconColor: "text-primary-600",
          numberBg: "bg-primary-500"
        };
      case 'secondary':
        return {
          bg: isActive ? "bg-secondary-50" : "bg-white",
          hoverBg: "hover:bg-secondary-50/50",
          iconBg: isActive ? "bg-secondary-100" : "bg-secondary-50",
          iconColor: "text-secondary-600",
          numberBg: "bg-secondary-500"
        };
      case 'purple':
        return {
          bg: isActive ? "bg-purple-50" : "bg-white",
          hoverBg: "hover:bg-purple-50/50",
          iconBg: isActive ? "bg-purple-100" : "bg-purple-50",
          iconColor: "text-purple-600",
          numberBg: "bg-purple-500"
        };
      case 'red':
        return {
          bg: isActive ? "bg-red-50" : "bg-white",
          hoverBg: "hover:bg-red-50/50",
          iconBg: isActive ? "bg-red-100" : "bg-red-50",
          iconColor: "text-red-600",
          numberBg: "bg-red-500"
        };
      default:
        return {
          bg: isActive ? "bg-slate-50" : "bg-white",
          hoverBg: "hover:bg-slate-50/50",
          iconBg: isActive ? "bg-slate-100" : "bg-slate-50",
          iconColor: "text-slate-600",
          numberBg: "bg-slate-500"
        };
    }
  };

  const classes = getColorClasses();

  // Enhanced keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate(id);
    }
  };

  return (
    <div 
      className={`group relative w-full h-full sm:h-auto sm:w-36 md:w-52 lg:w-64 ${classes.bg} ${classes.hoverBg} p-2 md:p-4 rounded-xl ${isActive ? 'shadow-2xl scale-105 z-10' : 'shadow-lg'} cursor-pointer outline-none flex flex-col justify-between`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
        transitionDelay: `${150 + (delay * 100)}ms`
      }}
      onClick={() => onActivate(id)}
      onMouseEnter={() => onActivate(id)}
      tabIndex="0"
      onKeyDown={handleKeyDown}
      role="button"
      aria-pressed={isActive}
      aria-label={`Problem: ${title} - ${description}`}
    >
      {/* Number badge */}
      <div 
        className={`absolute -top-3 -left-3 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white rounded-full font-bold text-lg shadow-lg z-10 ${classes.numberBg}`}
        aria-hidden="true"
      >
        {number.substring(1)}
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Icon with static display - no animations */}
        <div 
          className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center ${classes.iconBg} ${classes.iconColor} rounded-full mb-2 md:mb-4 lg:mb-6 shadow-md ${isActive ? 'scale-110' : ''}`}
          style={{
            transition: "none"
          }}
          aria-hidden="true"
        >
          <Icon size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
        </div>
        
        {/* Content */}
        <h3 className={`text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-slate-800 mb-1 md:mb-2`}>
          {title}
        </h3>
        <p className={`text-xs md:text-sm lg:text-base text-slate-600 line-clamp-2 sm:line-clamp-none`}>
          {description}
        </p>
      </div>
      
        {/* Active indicator line with explicit animation properties */}
    
    </div>
  );
});

// Memoized Arrow connector component
const ConnectorArrow = memo(({ isVisible, delay, isReverse = false }) => (
  <div 
    className={`flex flex-col items-center ${isReverse ? 'transform rotate-180' : ''}`}
    style={{ 
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease',
      transitionDelay: `${delay}ms`
    }}
    aria-hidden="true"
  >
    <ArrowRight size={24} className="md:w-8 md:h-8 lg:w-9 lg:h-9 text-slate-400" />
    <span className={`text-xs text-slate-500 mt-1 transform ${isReverse ? '-rotate-180' : 'rotate-0'}`}>
      {isReverse ? 'results in' : 'leads to'}
    </span>
  </div>
));

// Memoized mobile problem card component - CONSISTENT HEIGHT
const MobileProblemCard = memo(({ card, isActive, onActivate, isVisible, delay, isLast }) => {
  const { id, title, description, icon: Icon, color } = card;
  
  // Consistent color mapping function
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return {
          bg: isActive ? "bg-primary-50" : "bg-white",
          hoverBg: "hover:bg-primary-50/50",
          text: "text-primary-600",
          active: "bg-primary-100",
          badgeBg: "bg-primary-500"
        };
      case 'secondary':
        return {
          bg: isActive ? "bg-secondary-50" : "bg-white",
          hoverBg: "hover:bg-secondary-50/50",
          text: "text-secondary-600",
          active: "bg-secondary-100",
          badgeBg: "bg-secondary-500"
        };
      case 'purple':
        return {
          bg: isActive ? "bg-purple-50" : "bg-white",
          hoverBg: "hover:bg-purple-50/50",
          text: "text-purple-600",
          active: "bg-purple-100",
          badgeBg: "bg-purple-500"
        };
      case 'red':
        return {
          bg: isActive ? "bg-red-50" : "bg-white",
          hoverBg: "hover:bg-red-50/50",
          text: "text-red-600",
          active: "bg-red-100",
          badgeBg: "bg-red-500"
        };
      default:
        return {
          bg: isActive ? "bg-slate-50" : "bg-white",
          hoverBg: "hover:bg-slate-50/50",
          text: "text-slate-600",
          active: "bg-slate-100",
          badgeBg: "bg-slate-500"
        };
    }
  };
  
  const classes = getColorClasses();
  
  // Enhanced keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate(id);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div 
        className={`relative rounded-xl h-24 ${classes.bg} ${classes.hoverBg} ${isActive ? 'shadow-lg' : 'shadow-md'} outline-none flex-grow`}
        style={{ 
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          transitionDelay: `${delay * 100}ms`
        }}
        onClick={() => onActivate(id)}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-pressed={isActive}
        aria-label={`Problem: ${title} - ${description}`}
      >
        <div className={`flex items-center p-2 rounded-lg h-full`}>
          <div className="relative flex-shrink-0">
            <div 
              className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow-sm ${classes.text} ${isActive ? classes.active : ''}`}
              aria-hidden="true"
            >
              <Icon size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div 
              className={`absolute -top-1 -left-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-white rounded-full font-bold text-xs shadow-sm z-10 ${classes.badgeBg}`}
              aria-hidden="true"
            >
              {id}
            </div>
          </div>
          
          <div className={`ml-3 sm:ml-4 flex-grow`}>
            <h3 className={`text-base sm:text-lg font-bold text-slate-800`}>{title}</h3>
            <p className={`text-xs sm:text-sm text-slate-600`}>{description}</p>
          </div>
          
          <ArrowRight 
            size={18} 
            className={`flex-shrink-0 ${isActive ? 'rotate-90 text-slate-700' : 'text-slate-400'}`}
            style={{ transition: "none" }}
            aria-hidden="true" 
          />
        </div>
      </div>
        
      
      {/* Connector between cards - except last card */}
      {!isLast && (
        <div className={`flex justify-center py-1`}>
          <div className="h-6 border-l-2 border-dashed border-slate-300" aria-hidden="true"></div>
        </div>
      )}
    </div>
  );
});

const ProblemStatement = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.15, 
    rootMargin: "0px 0px -100px 0px" 
  });

  // Set card 1 as active after animations complete
  useEffect(() => {
    let timeout;
    if (isVisible) {
      timeout = setTimeout(() => setActiveCard(1), 1200);
    }
    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      id="problem"
      className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden"
      aria-labelledby="healthcare-problem-title"
    >
      {/* Improved background elements with subtle animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-primary-50 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-[float_15s_ease-in-out_infinite]"
        ></div>
        <div 
          className="absolute bottom-0 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-secondary-50 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-[float_17s_ease-in-out_infinite_reverse]"
        ></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl">
        <div 
          className={`text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          {/* Badge styled similar to the example */}
          <div className="mb-4 inline-block">
            <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-200">
              <span className="flex items-center gap-2 text-sm font-medium">
                <AlertTriangle size={18} className="text-red-500" />
                Critical Industry Challenge
              </span>
            </div>
          </div>
          
          <SectionTitle 
            title="The Healthcare Problem"
            id="healthcare-problem-title"
            subtitle="Healthcare providers in Nigeria face a critical profitability challenge due to escalating Medical Loss Ratios (MLR)"
          />
        </div>
        
        {/* Responsive problem chain with improved accessibility */}
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-5xl mx-auto">
          {/* First row - hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex sm:justify-center sm:items-stretch gap-1 md:gap-3 lg:gap-6 mb-6 md:mb-12" role="list" aria-label="Healthcare problem flow: first phase">
            <div className="flex-1 max-w-xs">
              <ProblemCard 
                card={PROBLEM_CARDS[0]}
                isActive={activeCard === 1}
                onActivate={setActiveCard}
                isVisible={isVisible}
                delay={1}
                flowDirection="right"
              />
            </div>
            
            <ConnectorArrow isVisible={isVisible} delay={600} />
            
            <div className="flex-1 max-w-xs">
              <ProblemCard 
                card={PROBLEM_CARDS[1]}
                isActive={activeCard === 2}
                onActivate={setActiveCard}
                isVisible={isVisible}
                delay={2}
                flowDirection="right"
              />
            </div>
          </div>
          
          {/* Second row - hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex sm:justify-center sm:items-stretch gap-1 md:gap-3 lg:gap-6" role="list" aria-label="Healthcare problem flow: second phase">
            <div className="flex-1 max-w-xs">
              <ProblemCard 
                card={PROBLEM_CARDS[3]}
                isActive={activeCard === 4}
                onActivate={setActiveCard}
                isVisible={isVisible}
                delay={4}
                flowDirection="left"
              />
            </div>
            
            <ConnectorArrow isVisible={isVisible} delay={800} isReverse={true} />
            
            <div className="flex-1 max-w-xs">
              <ProblemCard 
                card={PROBLEM_CARDS[2]}
                isActive={activeCard === 3}
                onActivate={setActiveCard}
                isVisible={isVisible}
                delay={3}
                flowDirection="left"
              />
            </div>
          </div>
          
          {/* Improved mobile-optimized grid layout with fixed heights */}
          <div className="sm:hidden grid grid-cols-1 gap-3 max-w-sm mx-auto" role="list" aria-label="Healthcare problem sequence">
            {PROBLEM_CARDS.map((card, index) => (
              <MobileProblemCard 
                key={card.id}
                card={card}
                isActive={activeCard === card.id}
                onActivate={setActiveCard}
                isVisible={isVisible}
                delay={index + 1}
                isLast={index === PROBLEM_CARDS.length - 1}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced bottom alert section with improved animations */}
        <div 
          className="mt-8 sm:mt-12 md:mt-16 text-center transition-all duration-1000"
          style={{ 
            transitionDelay: '0.9s',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(8px)'
          }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-3 sm:py-4 bg-red-100 rounded-xl shadow-md">
            <AlertTriangle size={18} className="text-red-500 sm:mr-1" aria-hidden="true" />
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-red-700 text-center">Most HMOs in Nigeria have MLRs above 100-140%</span>
          </div>
          
          {/* Enhanced responsive explanation card with animated stats */}
          <div 
            className="mt-4 sm:mt-6 p-2 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 max-w-3xl mx-auto"
            style={{
              animation: isVisible ? 'fadeIn 0.5s ease-out 1.2s forwards' : 'none',
              opacity: 0,
            }}
          >
            <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-slate-700">
              When Medical Loss Ratios exceed 100%, healthcare providers are paying out more in claims than they receive in premiums, creating an unsustainable business model that threatens the entire healthcare ecosystem.
            </p>
            
            {/* Improved mobile-friendly stats with animations */}
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <div 
                className="flex flex-col items-center p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300"
                style={{
                  animation: isVisible ? 'slideUp 0.5s ease-out 1.4s forwards' : 'none',
                  opacity: 0,
                  transform: 'translateY(10px)'
                }}
              >
                <div className="text-red-600 font-bold text-lg sm:text-xl md:text-2xl">140%</div>
                <div className="text-slate-600 text-xs sm:text-sm">Average MLR</div>
              </div>
              <div 
                className="flex flex-col items-center p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300"
                style={{
                  animation: isVisible ? 'slideUp 0.5s ease-out 1.6s forwards' : 'none',
                  opacity: 0,
                  transform: 'translateY(10px)'
                }}
              >
                <div className="text-red-600 font-bold text-lg sm:text-xl md:text-2xl">-40%</div>
                <div className="text-slate-600 text-xs sm:text-sm">Revenue Gap</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add global keyframe animations and remove all focus outlines */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Disable ALL hover animations and transitions */
        div:hover {
          transition: none !important;
          animation: none !important;
          outline: none !important;
          border-color: transparent !important;
        }
        
        /* Force remove any transitions on hover */
        *:hover {
          transition-property: none !important;
          transform: none !important;
          animation: none !important;
          outline: none !important;
          border-color: transparent !important;
        }
        
        /* Target any SVG strokes */
        svg, svg * {
          stroke-dasharray: none !important;
          stroke-dashoffset: 0 !important;
          transition: none !important;
          animation: none !important;
        }
        
        /* Target Lucide icons specifically */
        [data-lucide], [data-lucide] * {
          stroke-dasharray: none !important;
          stroke-dashoffset: 0 !important;
          transition: none !important;
          animation: none !important;
        }
      `}</style>
    </section>
  );
};

export default ProblemStatement;