// src/components/sections/RisksMitigation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Shield, ChevronRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Card from '../common/Card';
import { risksData } from '../../constants/risks';

// Animated Risk Row component
const RiskRow = ({ item, index, isVisible }) => {
  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-2 border-b border-slate-200 hover:bg-slate-50 transition-all duration-500 ${
        index === risksData.length - 1 ? 'border-b-0' : ''
      }`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`
      }}
    >
      <div className="p-5 md:p-6 md:border-r border-slate-200">
        <div className="flex">
          <div className="w-6 h-6 rounded-full bg-amber-50 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
            <ChevronRight size={14} className="text-amber-600" />
          </div>
          <div>
            <p className="text-slate-700">{item.risk}</p>
            {item.riskImpact && (
              <p className="mt-2 text-sm text-slate-500">
                <span className="font-medium">Impact:</span> {item.riskImpact}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="p-5 md:p-6 bg-white">
        <div className="flex">
          <div className="w-6 h-6 rounded-full bg-emerald-50 flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
            <Shield size={14} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-slate-700">{item.mitigation}</p>
            {item.mitigationStrategy && (
              <p className="mt-2 text-sm text-slate-500">
                <span className="font-medium">Strategy:</span> {item.mitigationStrategy}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RisksMitigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
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

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 bg-slate-50 relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply opacity-70 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-100 rounded-full mix-blend-multiply opacity-70 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div 
          className="text-center mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <div className="inline-block px-6 py-2 bg-amber-50 rounded-full text-amber-700 font-medium mb-4 shadow-sm border border-amber-100">
            Risk Assessment & Mitigation Plan
          </div>
          <SectionTitle 
            title="Risks & Mitigations" 
            subtitle="We've identified key risks and developed comprehensive strategies to address each challenge"
          />
        </div>

        <Card
          className="overflow-hidden transition-all duration-700"
          elevation="lg"
          padding="none"
          border={true}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '200ms'
          }}
        >
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-slate-200">
            <div className="bg-slate-800 p-4 md:p-5 flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <AlertTriangle size={18} className="text-amber-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Potential Risks</h3>
            </div>
            <div className="bg-slate-800 p-4 md:p-5 flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                <Shield size={18} className="text-emerald-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Our Mitigations</h3>
            </div>
          </div>

          {/* Content rows */}
          {risksData.map((item, index) => (
            <RiskRow 
              key={item.id} 
              item={item} 
              index={index} 
              isVisible={isVisible} 
            />
          ))}
        </Card>

        <div 
          className="mt-10 md:mt-12 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms'
          }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 rounded-xl border border-slate-200">
            <span className="text-base md:text-lg font-semibold text-slate-700">
              Comprehensive risk assessment updated quarterly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RisksMitigation;