import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, TrendingUp, Clock } from 'lucide-react';
import Button from '../common/Button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('payers');
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeIn = (delay) => `transition-all duration-700 ease-out ${
    isVisible ? `opacity-100 translate-y-0 delay-[${delay}ms]` : 'opacity-0 translate-y-4'
  }`;

  const tabData = {
    payers: {
      title: "Control MLR",
      description: "Reduce MLRs from 140% to profitable levels with AI-powered verification, fraud prevention, and forecasting.",
      stat: "80% MLR Improvement",
      icon: <TrendingUp size={20} />,
      color: "blue",
      centerValue: "140→60"
    },
    providers: {
      title: "Prevent Payment Denials",
      description: "Keep expenses within capitation limits and prevent claim denials with instant eligibility verification.",
      stat: "99% Verification Accuracy",
      icon: <CheckCircle size={20} />,
      color: "green",
      centerValue: "99%"
    },
    patients: {
      title: "Instant Verification",
      description: "Eliminate long wait times and unexpected out-of-pocket payments with real-time coverage verification.",
      stat: "Hours → Seconds",
      icon: <Clock size={20} />,
      color: "amber",
      centerValue: "24/7"
    }
  };

  const features = [
    { value: "140%", label: "Current MLR", color: "blue" },
    { value: "80%", label: "MLR Improvement", color: "green" },
    { value: "99%", label: "Accuracy Rate", color: "indigo" },
    { value: "24/7", label: "Availability", color: "amber" }
  ];

  const nigeriaFeatures = [
    "Works Offline",
    "Power-Efficient",
    "₦40-100K Devices",
    "Nigeria-Specific Data",
    "WhatsApp-like UI"
  ];

  return (
    <section 
      ref={heroRef}
      id="healthcare-hero"
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 to-white overflow-hidden font-sans pt-40 md:pt-48"
    >
      {/* Optimized background with priority loading */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/hero.jpeg" 
            alt="Healthcare professionals discussing"
            className="absolute w-full h-full object-cover object-center"
            loading="eager"
            fetchpriority="high"
          />
          
          {/* Enhanced gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-white/90 z-10"></div>
          <div className="absolute inset-0 bg-slate-50/40 z-10"></div>
        </div>
        
        {/* Animated color accents */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-100 rounded-full opacity-40 blur-3xl z-20 mix-blend-multiply animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100 rounded-full opacity-30 blur-3xl z-20 mix-blend-multiply animate-float-delay"></div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="space-y-12">
          {/* Header with improved semantics */}
          <header className="text-center space-y-6">
            <div className={fadeIn(100)}>
              <span className="inline-block py-1.5 px-4 text-sm font-medium text-blue-700 bg-blue-50 rounded-full shadow-sm">
                AI-Powered Healthcare Admin
              </span>
            </div>
            
            <div className={fadeIn(200)}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                <span className="text-blue-600">Revolutionizing Health Administration</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-700 max-w-3xl mx-auto">
                Making Healthcare Profitable in Nigeria
              </p>
            </div>
            
            <div className={fadeIn(300)}>
              <p className="max-w-2xl mx-auto text-slate-600 text-base md:text-lg leading-relaxed">
                Our AI platform transforms 140% Medical Loss Ratios into profitable operations,
                connecting providers, payers, and patients—even without internet.
              </p>
            </div>
          </header>
          
          {/* Tab component with extracted data */}
          <div className={fadeIn(400)}>
            <div className="bg-white max-w-3xl mx-auto rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex border-b">
                {Object.keys(tabData).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-2 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? `bg-${tabData[tab].color}-50 text-${tabData[tab].color}-700 border-b-2 border-${tabData[tab].color}-500`
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    aria-label={`Show ${tab} content`}
                  >
                    For {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {tabData[activeTab].title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {tabData[activeTab].description}
                    </p>
                    <div className="mt-6 flex justify-center md:justify-start">
                      <span className={`flex items-center gap-2 text-lg font-bold text-${tabData[activeTab].color}-600`}>
                        {tabData[activeTab].icon}
                        {tabData[activeTab].stat}
                      </span>
                    </div>
                  </div>
                  <div className={`flex-shrink-0 w-32 h-32 bg-${tabData[activeTab].color}-50 rounded-full flex items-center justify-center`}>
                    <div className={`w-20 h-20 bg-${tabData[activeTab].color}-100 rounded-full flex items-center justify-center`}>
                      <div className={`text-2xl font-bold text-${tabData[activeTab].color}-700`}>
                        {tabData[activeTab].centerValue}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Button 
                      variant="primary" 
                      size="md"
                      icon={<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                      iconPosition="right"
                      className="group"
                    >
                      Schedule Demo
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="md" 
                      className="group hover:bg-slate-100 transition-colors"
                    >
                      <span>Works Offline</span>
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full ml-2">
                        No Internet
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features grid with extracted data */}
          <div className={fadeIn(500)}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-4 border border-slate-100 text-center shadow-xs hover:shadow-sm transition-shadow"
                >
                  <div className={`inline-flex h-10 w-10 rounded-full bg-${feature.color}-50 items-center justify-center mx-auto`}>
                    <span className={`text-${feature.color}-700 font-bold text-sm`}>
                      {feature.value}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {feature.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Nigeria-specific features */}
          <div className={fadeIn(600)}>
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                Designed for Nigeria
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {nigeriaFeatures.map((feature, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          {/* Visual connection element */}
          <div className={fadeIn(700)}>
            <div className="relative h-24 mb-6 mt-8">
              <div className="absolute left-0 right-0 flex justify-between items-center">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 shadow-md hover:scale-105 transition-transform">
                  HMO
                </div>
                <div className="h-0.5 flex-grow bg-gradient-to-r from-blue-600 via-slate-300 to-teal-600 mx-2"></div>
                <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 shadow-md hover:scale-105 transition-transform">
                  Provider
                </div>
                <div className="h-0.5 flex-grow bg-gradient-to-r from-teal-600 via-slate-300 to-amber-600 mx-2"></div>
                <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 shadow-md hover:scale-105 transition-transform">
                  Patient
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center shadow-xl z-20 hover:scale-105 transition-transform">
                <span className="text-slate-900 font-bold">Magani</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 8s ease-in-out 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;