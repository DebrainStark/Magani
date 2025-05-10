import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, TrendingUp, Clock } from "lucide-react";
import Button from "../common/Button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("payers");
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-50px 0px" }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeIn = (delay) =>
    `transition-all duration-700 ease-out ${
      isVisible
        ? `opacity-100 translate-y-0 delay-[${delay}ms]`
        : "opacity-0 translate-y-4"
    }`;

  // Updated tabData with primary/secondary colors from our scheme
  const tabData = {
    payers: {
      title: "Control MLR",
      description:
        "Reduce MLRs from 140% to profitable levels using automation for verification, fraud prevention, and forecasting.",
      stat: "80% MLR Improvement",
      icon: <TrendingUp size={20} />,
      color: "primary",
      centerValue: "140→60",
    },
    providers: {
      title: "Prevent Payment Denials",
      description:
        "Keep expenses within capitation limits and prevent claim denials with instant eligibility verification.",
      stat: "99% Verification Accuracy",
      icon: <CheckCircle size={20} />,
      color: "primary",
      centerValue: "99%",
    },
    patients: {
      title: "Instant Verification",
      description:
        "Eliminate long wait times and unexpected out-of-pocket payments with real-time coverage verification.",
      stat: "Hours → Seconds",
      icon: <Clock size={20} />,
      color: "primary",
      centerValue: "24/7",
    },
  };

  // Function to safely get color classes
  const getColorClasses = (tab) => {
    const color = tabData[tab].color;
    if (color === 'amber') {
      return {
        bg50: 'bg-amber-50',
        bg100: 'bg-amber-100', 
        text600: 'text-amber-600',
        text700: 'text-amber-700',
        border500: 'border-amber-500'
      };
    } else if (color === 'primary') {
      return {
        bg50: 'bg-primary-50',
        bg100: 'bg-primary-100',
        text600: 'text-primary-600',
        text700: 'text-primary-700',
        border500: 'border-primary-500'
      };
    } else {
      return {
        bg50: 'bg-secondary-50',
        bg100: 'bg-secondary-100',
        text600: 'text-secondary-600',
        text700: 'text-secondary-700',
        border500: 'border-secondary-500'
      };
    }
  };

  return (
    <section
      ref={heroRef}
      id="healthcare-hero"
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 to-white overflow-hidden font-sans pt-16 md:pt-20"
    >
      {/* Background with priority loading */}
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

        {/* Animated color accents - using Tailwind's animate utilities */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary-100 rounded-full opacity-40 blur-3xl z-20 mix-blend-multiply animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-100 rounded-full opacity-30 blur-3xl z-20 mix-blend-multiply animate-[float_8s_ease-in-out_2s_infinite]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl relative z-10">
        <div className="space-y-8">
          {/* Header with improved semantics */}
          <header className="text-center mb-6">
            <div className={fadeIn(200)}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight mt-12">
                <span className="text-blue-600">
                  Automating Healthcare Administration
                </span>
            </h1>
            </div>

            <div className={`${fadeIn(300)} mt-4`}>
              <p className="max-w-2xl mx-auto text-slate-600 text-base md:text-lg leading-relaxed">
                Harnessing technology to cut costs and streamline health
                insurance in Nigeria, making it more efficient, accessible, and
                sustainable
              </p>
            </div>
          </header>

          {/* Tab component with extracted data */}
          <div className={fadeIn(400)}>
            <div className="bg-white max-w-3xl mx-auto rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="flex border-b">
                {Object.keys(tabData).map((tab) => {
                  const colorClasses = getColorClasses(tab);
                  
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-1 text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? `${colorClasses.bg50} ${colorClasses.text700} border-b-2 ${colorClasses.border500}`
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                      aria-label={`Show ${tab} content`}
                    >
                      For {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  );
                })}
              </div>

              <div className="p-4">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {tabData[activeTab].title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {tabData[activeTab].description}
                    </p>
                    <div className="mt-4 flex justify-center md:justify-start">
                      <span
                        className={`flex items-center gap-1 text-lg font-bold ${getColorClasses(activeTab).text600}`}
                      >
                        {tabData[activeTab].icon}
                        {tabData[activeTab].stat}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex-shrink-0 w-32 h-32 ${getColorClasses(activeTab).bg50} rounded-full flex items-center justify-center`}
                  >
                    <div
                      className={`w-20 h-20 ${getColorClasses(activeTab).bg100} rounded-full flex items-center justify-center`}
                    >
                      <div
                        className={`text-2xl font-bold ${getColorClasses(activeTab).text700}`}
                      >
                        {tabData[activeTab].centerValue}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Button
                      variant="primary"
                      size="default"
                      icon={
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      }
                      iconPosition="right"
                      className="group"
                    >
                      Schedule Demo
                    </Button>
                    <Button
                      variant="secondary"
                      size="default"
                      className="group hover:bg-slate-100 transition-colors"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nigeria-specific features */}
          <div className={fadeIn(600)}>
            <div className="text-center mb-2">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                Designed for Nigeria
              </span>
            </div>
          </div>

          {/* Visual connection element */}
          <div className={fadeIn(700)}>
            <div className="relative h-24 mb-4 mt-6">
              <div className="absolute left-0 right-0 flex justify-between items-center">
                <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 shadow-md hover:scale-105 transition-transform">
                  HMO
                </div>
                <div className="h-0.5 flex-grow bg-gradient-to-r from-primary-600 via-slate-300 to-secondary-600 mx-2"></div>
                <div className="w-14 h-14 bg-secondary-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 shadow-md hover:scale-105 transition-transform">
                  Provider
                </div>
                <div className="h-0.5 flex-grow bg-gradient-to-r from-secondary-600 via-slate-300 to-amber-600 mx-2"></div>
                <div className="w-14 h-14 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 shadow-md hover:scale-105 transition-transform">
                  Patient
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;