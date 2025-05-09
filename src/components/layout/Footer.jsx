// src/components/layout/Footer.jsx
import React from 'react';
import { navLinks } from '../../constants/navigation';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="/images/logo.svg" 
                alt="Magani Logo" 
                className="h-9 w-auto" 
              />
              <span className="ml-3 text-xl font-bold text-white">Magani</span>
            </div>
            <p className="text-slate-300 mb-6">
              Transforming healthcare administration in Nigeria with AI-powered solutions that reduce Medical Loss Ratio and improve profitability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Our Solutions */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Solutions</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Verification Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Data Analytics
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  AI Forecasting
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  Data Exchange
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  For Providers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors">
                  For Payers
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                <span className="text-slate-300">
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 h-5 w-5 text-blue-400 mr-3" />
                <a href="tel:+2341234567890" className="text-slate-300 hover:text-blue-400 transition-colors">
                +234 701 234 5678
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 h-5 w-5 text-blue-400 mr-3" />
                <a href="mailto:info@magani.health" className="text-slate-300 hover:text-blue-400 transition-colors">
                  info@magani.health
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} Magani. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;