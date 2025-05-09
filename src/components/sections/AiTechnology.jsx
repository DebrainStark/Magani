// src/components/sections/AiTechnology.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Database, Wifi, Globe, ShieldCheck, Cpu, MapPin } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';

// Custom BentoBox component using the Card component
const BentoBox = ({ className, children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add small delay for staggered animation
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(boxRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Card
      ref={boxRef}
      className={`transition-all duration-500 overflow-hidden ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`
      }}
      elevation="md"
      hover={true}
      border={true}
      padding="none"
    >
      {children}
    </Card>
  );
};

// Reusable feature item component
const FeatureItem = ({ icon: Icon, text }) => (
  <div className="flex items-start">
    <div className="w-6 h-6 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
      <Icon size={14} className="text-slate-700" />
    </div>
    <span className="text-slate-700 text-sm">{text}</span>
  </div>
);

// Reusable metric box component
const MetricBox = ({ value, label }) => (
  <div className="text-center p-4 rounded-lg bg-slate-100 border border-slate-200">
    <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{value}</div>
    <div className="text-slate-600 font-medium text-sm">{label}</div>
  </div>
);

const AiTechnology = () => {
  return (
    <section className="py-20 md:py-24 px-4 sm:px-6 bg-slate-50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply opacity-70 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply opacity-70 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-6 py-2 bg-slate-100 rounded-full text-slate-700 font-medium mb-4 shadow-sm border border-slate-200">
            Powered by Advanced AI
          </div>
          <SectionTitle 
            title="AI Technology" 
            subtitle="Our custom DeepSeek LLM model delivers intelligent healthcare insights optimized for Nigeria's unique environment"
          />
        </div>
        
        {/* Improved Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Main Feature: DeepSeek LLM */}
          <BentoBox className="col-span-12 lg:col-span-6" delay={100}>
            <div className="h-full flex flex-col md:flex-row">
              <div className="bg-slate-800 text-white p-6 md:p-8 md:w-2/5 flex flex-col justify-center">
                <Brain size={40} className="mb-5 text-slate-300" />
                <h3 className="text-xl md:text-2xl font-bold mb-3">DeepSeek LLM Model</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  State-of-the-art AI specifically fine-tuned for Nigerian healthcare
                </p>
              </div>
              <div className="p-6 md:p-8 md:w-3/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 h-full">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                      <Database size={18} className="text-slate-700" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-slate-700">7B Parameters</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                      <Cpu size={18} className="text-slate-700" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-slate-700">Mobile Optimized</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                      <ShieldCheck size={18} className="text-slate-700" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-slate-700">Privacy-Focused</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                      <Zap size={18} className="text-slate-700" />
                    </div>
                    <span className="font-medium text-sm md:text-base text-slate-700">Low Latency</span>
                  </div>
                </div>
              </div>
            </div>
          </BentoBox>
          
          {/* Data Security */}
          <BentoBox className="col-span-12 lg:col-span-6" delay={200}>
            <div className="h-full bg-slate-700 text-white p-6 md:p-8 flex flex-col justify-between">
              <div>
                <ShieldCheck size={36} className="mb-5 text-slate-300" />
                <h3 className="text-xl md:text-2xl font-bold mb-3">Data Security</h3>
                <p className="text-slate-300 text-sm md:text-base mb-5">
                  Enterprise-grade protection for all healthcare data with robust security measures
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                  <span className="text-white text-sm">On-device processing</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                  <span className="text-white text-sm">HIPAA-compliant</span>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                    <ShieldCheck size={14} className="text-white" />
                  </div>
                  <span className="text-white text-sm">End-to-end encryption</span>
                </div>
              </div>
            </div>
          </BentoBox>
          
          {/* Nigeria-Specific Data */}
          <BentoBox className="col-span-12 md:col-span-6 lg:col-span-4" delay={300}>
            <div className="h-full flex flex-col p-5 md:p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center mr-3 md:mr-4">
                  <Globe size={20} className="text-slate-700" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">Nigeria-Specific Data</h3>
              </div>
              <div className="space-y-3 md:space-y-4 mt-2 flex-grow">
                <FeatureItem 
                  icon={MapPin} 
                  text="Trained on unique Nigerian healthcare data" 
                />
                <FeatureItem 
                  icon={MapPin} 
                  text="Not generic internet-scraped data" 
                />
                <FeatureItem 
                  icon={MapPin} 
                  text="Understands local medical terminology" 
                />
                <FeatureItem 
                  icon={MapPin} 
                  text="Tailored to regional healthcare practices" 
                />
              </div>
            </div>
          </BentoBox>
          
          {/* Offline Capability */}
          <BentoBox className="col-span-12 md:col-span-6 lg:col-span-4" delay={400}>
            <div className="h-full flex flex-col p-5 md:p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center mr-3 md:mr-4">
                  <Wifi size={20} className="text-slate-700" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">Offline Capable</h3>
              </div>
              <div className="space-y-3 md:space-y-4 mt-2 flex-grow">
                <FeatureItem 
                  icon={Zap} 
                  text="Works without internet connection" 
                />
                <FeatureItem 
                  icon={Zap} 
                  text="Runs locally on PC or smartphone" 
                />
                <FeatureItem 
                  icon={Zap} 
                  text="Perfect for areas with limited connectivity" 
                />
                <FeatureItem 
                  icon={Zap} 
                  text="No disruption during network outages" 
                />
              </div>
            </div>
          </BentoBox>
          
          {/* Performance */}
          <BentoBox className="col-span-12 md:col-span-6 lg:col-span-4" delay={500}>
            <div className="h-full flex flex-col p-5 md:p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center mr-3 md:mr-4">
                  <Zap size={20} className="text-slate-700" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800">High Performance</h3>
              </div>
              <div className="space-y-3 md:space-y-4 mt-2 flex-grow">
                <FeatureItem 
                  icon={Zap} 
                  text="Optimized for low-resource environments" 
                />
                <FeatureItem 
                  icon={Zap} 
                  text="Quick response times even on older devices" 
                />
                <FeatureItem 
                  icon={Zap} 
                  text="Minimal battery consumption" 
                />
                <FeatureItem 
                  icon={Zap} 
                  text="Efficient memory usage" 
                />
              </div>
            </div>
          </BentoBox>
          
          {/* Performance Metrics - Full width box */}
          <BentoBox className="col-span-12" delay={600}>
            <div className="flex flex-col md:flex-row items-center p-6 md:p-8">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">Performance Metrics</h3>
                <p className="text-slate-600 text-sm md:text-base">
                  Our AI outperforms traditional systems across all key metrics, delivering measurable benefits for healthcare providers
                </p>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <MetricBox value="97%" label="Accuracy" />
                <MetricBox value="85%" label="Time Savings" />
                <MetricBox value="43%" label="Cost Reduction" />
              </div>
            </div>
          </BentoBox>
        </div>
      </div>
    </section>
  );
};

export default AiTechnology;