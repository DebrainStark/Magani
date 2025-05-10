import React, { useState, useEffect, useRef, memo } from 'react';
import { AlertTriangle, BarChart4, PieChart, DollarSign, TrendingDown, ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

const PROBLEM_CARDS = [
  { 
    id: 1, 
    title: "High Utilization", 
    description: "Excessive healthcare service usage without proper controls",
    icon: BarChart4,
    color: "primary", // Changed from teal to primary
    number: "01"
  },
  { 
    id: 2, 
    title: "Increased Costs", 
    description: "Rising medical expenses for payers",
    icon: DollarSign,
    color: "secondary", // Changed from blue to secondary
    number: "02"
  },
  { 
    id: 3, 
    title: "Elevated MLR", 
    description: "Medical Loss Ratio above 100-140%",
    icon: PieChart,
    color: "purple", // Kept as is
    number: "03"
  },
  { 
    id: 4, 
    title: "Low Profitability", 
    description: "Unsustainable business model",
    icon: TrendingDown,
    color: "red", // Kept as is
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

// Memoized ProblemCard component with direct Tailwind classes
const ProblemCard = memo(({ card, isActive, onActivate, isVisible, delay, flowDirection }) => {
  const { id, title, description, icon: Icon, color, number } = card;

  // Consistent color mapping function
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return {
          border: isActive ? "border-primary-400" : "border-slate-200 hover:border-primary-200",
          iconBg: isActive ? "bg-primary-100" : "bg-primary-50",
          iconColor: "text-primary-600",
          numberBg: "bg-primary-500",
          indicator: "bg-primary-400"
        };
      case 'secondary':
        return {
          border: isActive ? "border-secondary-400" : "border-slate-200 hover:border-secondary-200",
          iconBg: isActive ? "bg-secondary-100" : "bg-secondary-50",
          iconColor: "text-secondary-600",
          numberBg: "bg-secondary-500",
          indicator: "bg-secondary-400"
        };
      case 'purple':
        return {
          border: isActive ? "border-purple-400" : "border-slate-200 hover:border-purple-200",
          iconBg: isActive ? "bg-purple-100" : "bg-purple-50",
          iconColor: "text-purple-600",
          numberBg: "bg-purple-500",
          indicator: "bg-purple-400"
        };
      case 'red':
        return {
          border: isActive ? "border-red-400" : "border-slate-200 hover:border-red-200",
          iconBg: isActive ? "bg-red-100" : "bg-red-50",
          iconColor: "text-red-600",
          numberBg: "bg-red-500",
          indicator: "bg-red-400"
        };
      default:
        return {
          border: isActive ? "border-slate-400" : "border-slate-200 hover:border-slate-300",
          iconBg: isActive ? "bg-slate-100" : "bg-slate-50",
          iconColor: "text-slate-600",
          numberBg: "bg-slate-500",
          indicator: "bg-slate-400"
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
      className={`group relative w-32 md:w-56 lg:w-64 bg-white p-2 md:p-4 rounded-xl border-2 ${classes.border} transition-all duration-300 ${isActive ? 'shadow-2xl scale-105 z-10' : 'shadow-lg hover:shadow-xl'} cursor-pointer`}
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.4s ease-out',
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
        className={`absolute -top-3 -left-3 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white rounded-full font-bold text-lg shadow-lg border-2 border-white z-10 ${classes.numberBg}`}
        aria-hidden="true"
      >
        {number.substring(1)}
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Icon with improved animation */}
        <div 
          className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center ${classes.iconBg} ${classes.iconColor} rounded-full mb-2 md:mb-4 lg:mb-6 shadow-md transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
          aria-hidden="true"
        >
          <Icon size={28} className="md:w-8 md:h-8 lg:w-10 lg:h-10" />
        </div>
        
        {/* Content */}
        <h3 className={`text-base md:text-xl lg:text-2xl font-bold text-slate-800 mb-1 md:mb-2`}>
          {title}
        </h3>
        <p className={`text-slate-600 text-xs md:text-sm lg:text-base`}>
          {description}
        </p>
      </div>
      
      {/* Active indicator line with improved animation */}
      <div 
        className={`absolute -bottom-1 inset-x-0 h-1 ${classes.indicator} rounded-b-xl transform transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0'
        } origin-${flowDirection === 'reverse' ? 'right' : 'left'}`}
        aria-hidden="true"
      ></div>
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

// Memoized mobile problem card component
const MobileProblemCard = memo(({ card, isActive, onActivate, isVisible, delay, isLast }) => {
  const { id, title, description, icon: Icon, color } = card;
  
  // Consistent color mapping function
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return {
          bg: "bg-primary-50",
          text: "text-primary-600",
          active: "bg-primary-100",
          border: "border-primary-400",
          indicator: "bg-primary-400",
          badgeBg: "bg-primary-500"
        };
      case 'secondary':
        return {
          bg: "bg-secondary-50",
          text: "text-secondary-600",
          active: "bg-secondary-100",
          border: "border-secondary-400",
          indicator: "bg-secondary-400",
          badgeBg: "bg-secondary-500"
        };
      case 'purple':
        return {
          bg: "bg-purple-50",
          text: "text-purple-600",
          active: "bg-purple-100",
          border: "border-purple-400",
          indicator: "bg-purple-400",
          badgeBg: "bg-purple-500"
        };
      case 'red':
        return {
          bg: "bg-red-50",
          text: "text-red-600",
          active: "bg-red-100",
          border: "border-red-400",
          indicator: "bg-red-400",
          badgeBg: "bg-red-500"
        };
      default:
        return {
          bg: "bg-slate-50",
          text: "text-slate-600",
          active: "bg-slate-100",
          border: "border-slate-400",
          indicator: "bg-slate-400",
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
    <div className="flex flex-col">
      <div 
        className={`relative rounded-xl border-2 transition-all duration-300 ${
          isActive ? classes.border : 'border-slate-200'
        } ${isActive ? 'shadow-lg' : 'shadow-md'}`}
        style={{ 
          transition: 'all 0.3s ease', 
          transitionDelay: `${delay * 100}ms`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
        }}
        onClick={() => onActivate(id)}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-pressed={isActive}
        aria-label={`Problem: ${title} - ${description}`}
      >
        <div className={`flex items-center p-2 bg-white rounded-lg`}>
          <div className="relative flex-shrink-0">
            <div 
              className={`w-12 h-12 flex items-center justify-center rounded-full shadow-sm ${classes.bg} ${classes.text} ${isActive ? classes.active : ''}`}
              aria-hidden="true"
            >
              <Icon size={24} />
            </div>
            <div 
              className={`absolute -top-1 -left-1 w-6 h-6 flex items-center justify-center text-white rounded-full font-bold text-xs shadow-sm border border-white z-10 ${classes.badgeBg}`}
              aria-hidden="true"
            >
              {id}
            </div>
          </div>
          
          <div className={`ml-4 flex-grow`}>
            <h3 className={`text-lg font-bold text-slate-800`}>{title}</h3>
            <p className={`text-sm text-slate-600`}>{description}</p>
          </div>
          
          <ArrowRight 
            size={20} 
            className={`flex-shrink-0 transform transition-transform duration-300 ${isActive ? 'rotate-90 text-slate-700' : 'text-slate-400'}`}
            aria-hidden="true" 
          />
        </div>
        
        {/* Active indicator with improved animation */}
        <div 
          className={`absolute -right-1 inset-y-0 w-1 ${classes.indicator} rounded-r-xl transform scale-y-0 origin-top transition-transform duration-300 ${
            isActive ? 'scale-y-100' : ''
          }`}
          aria-hidden="true"
        ></div>
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
      className="py-20 py:md-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden"
      aria-labelledby="healthcare-problem-title"
    >
      {/* Improved background elements with subtle animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary-50 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-[float_15s_ease-in-out_infinite]"
        ></div>
        <div 
          className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary-50 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-[float_17s_ease-in-out_infinite_reverse]"
        ></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl">
        <div 
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
          }`}
        >
          {/* Enhanced responsive alert badge with improved animation */}
          <div className="mt-4 sm:mt-4 inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-red-50 rounded-full text-red-600 text-sm sm:text-base font-semibold border border-red-200 mb-4 sm:mb-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-red-100 rounded-full relative">
              <AlertTriangle size={16} className="text-red-500" aria-hidden="true" />
              <span 
                className="absolute inset-0 rounded-full bg-red-400 opacity-30 animate-ping"
                style={{ animationDuration: '3s' }}
              ></span>
            </div>
            <span>Critical Industry Challenge</span>
          </div>
          
          <SectionTitle 
            title="The Healthcare Problem"
            id="healthcare-problem-title"
            subtitle="Healthcare providers in Nigeria face a critical profitability challenge due to escalating Medical Loss Ratios (MLR)"
            titleClassName="text-slate-900"
            subtitleClassName="font-medium"
          />
        </div>
        
        {/* Responsive problem chain with improved accessibility */}
        <div className="mt-8 sm:mt-12 max-w-5xl mx-auto">
          {/* First row - hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex justify-center items-center gap-2 md:gap-4 lg:gap-6 mb-8 md:mb-12" role="list" aria-label="Healthcare problem flow: first phase">
            <ProblemCard 
              card={PROBLEM_CARDS[0]}
              isActive={activeCard === 1}
              onActivate={setActiveCard}
              isVisible={isVisible}
              delay={1}
              flowDirection="right"
            />
            
            <ConnectorArrow isVisible={isVisible} delay={600} />
            
            <ProblemCard 
              card={PROBLEM_CARDS[1]}
              isActive={activeCard === 2}
              onActivate={setActiveCard}
              isVisible={isVisible}
              delay={2}
              flowDirection="right"
            />
          </div>
          
          {/* Second row - hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex justify-center items-center gap-2 md:gap-4 lg:gap-6" role="list" aria-label="Healthcare problem flow: second phase">
            <ProblemCard 
              card={PROBLEM_CARDS[3]}
              isActive={activeCard === 4}
              onActivate={setActiveCard}
              isVisible={isVisible}
              delay={4}
              flowDirection="left"
            />
            
            <ConnectorArrow isVisible={isVisible} delay={800} isReverse={true} />
            
            <ProblemCard 
              card={PROBLEM_CARDS[2]}
              isActive={activeCard === 3}
              onActivate={setActiveCard}
              isVisible={isVisible}
              delay={3}
              flowDirection="left"
            />
          </div>
          
          {/* Improved mobile-optimized accordion layout */}
          <div className="sm:hidden gap-4 max-w-sm mx-auto" role="list" aria-label="Healthcare problem sequence">
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
          className="mt-12 sm:mt-16 lg:mt-16 text-center transition-all duration-1000"
          style={{ 
            transitionDelay: '0.9s',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(8px)'
          }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 md:px-6 py-2 sm:py-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-2 border-red-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <AlertTriangle size={20} className="text-red-500 sm:mr-1" aria-hidden="true" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-red-700 text-center">Most HMOs in Nigeria have MLRs above 100-140%</span>
          </div>
          
          {/* Enhanced responsive explanation card with animated stats */}
          <div 
            className="mt-4 sm:mt-6 p-2 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-3xl mx-auto"
            style={{
              animation: isVisible ? 'fadeIn 0.5s ease-out 1.2s forwards' : 'none',
              opacity: 0,
            }}
          >
            <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
              When Medical Loss Ratios exceed 100%, healthcare providers are paying out more in claims than they receive in premiums, creating an unsustainable business model that threatens the entire healthcare ecosystem.
            </p>
            
            {/* Improved mobile-friendly stats with animations */}
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
              <div 
                className="flex flex-col items-center p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300"
                style={{
                  animation: isVisible ? 'slideUp 0.5s ease-out 1.4s forwards' : 'none',
                  opacity: 0,
                  transform: 'translateY(10px)'
                }}
              >
                <div className="text-red-600 font-bold text-xl sm:text-2xl">140%</div>
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
                <div className="text-red-600 font-bold text-xl sm:text-2xl">-40%</div>
                <div className="text-slate-600 text-xs sm:text-sm">Revenue Gap</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add global keyframe animations */}
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
      `}</style>
    </section>
  );
};

export default ProblemStatement;