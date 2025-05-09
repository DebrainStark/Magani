// src/components/sections/CallToAction.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart4, Phone, Mail, Calendar } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-12 md:p-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/30 rounded-full text-blue-200 text-sm font-medium mb-6">
            <BarChart4 size={16} className="text-blue-300" />
            <span>Reduce Your MLR Today</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your <span className="text-blue-300">Healthcare Profitability</span>?
          </h2>
          
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Our AI-powered solution helps Nigerian healthcare providers optimize operations, reduce costs, and improve profitability with measurable results.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center bg-white/10 px-6 py-4 rounded-xl border border-white/20">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                <Phone size={20} className="text-blue-300" />
              </div>
              <div className="text-left">
                <p className="text-sm text-blue-200 mb-1">Call Us</p>
                <p className="text-lg font-medium text-white">+234 701 234 5678</p>
              </div>
            </div>
            
            <div className="flex items-center bg-white/10 px-6 py-4 rounded-xl border border-white/20">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                <Mail size={20} className="text-blue-300" />
              </div>
              <div className="text-left">
                <p className="text-sm text-blue-200 mb-1">Email Us</p>
                <p className="text-lg font-medium text-white">contact@healthcareai.ng</p>
              </div>
            </div>
            
            <div className="flex items-center bg-white/10 px-6 py-4 rounded-xl border border-white/20">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                <Calendar size={20} className="text-blue-300" />
              </div>
              <div className="text-left">
                <p className="text-sm text-blue-200 mb-1">Book a Demo</p>
                <p className="text-lg font-medium text-white">Schedule Now</p>
              </div>
            </div>
          </div>
          
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl text-lg"
          >
            <span>Get in Touch</span>
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;