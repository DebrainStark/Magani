import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Company Info */}
          <div className="max-w-md">
            <div className="flex items-center mb-4">
              <img 
                src="/images/logo.svg" 
                alt="Magani Logo" 
                className="h-8 w-auto" 
              />
              <span className="ml-3 text-xl font-bold text-white">Magani</span>
            </div>
            <p className="text-slate-300 text-sm">
              Transforming healthcare administration in Nigeria with AI-powered solutions that reduce Medical Loss Ratio and improve profitability.
            </p>
          </div>
          
          {/* Contact Information - Simplified */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="flex-shrink-0 h-4 w-4 text-primary-400 mr-2" />
                <span className="text-slate-300 text-sm">
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 h-4 w-4 text-primary-400 mr-2" />
                <a href="tel:+2347012345678" className="text-slate-300 text-sm hover:text-primary-400 transition-colors">
                  +234 701 234 5678
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 h-4 w-4 text-primary-400 mr-2" />
                <a href="mailto:info@magani.health" className="text-slate-300 text-sm hover:text-primary-400 transition-colors">
                  info@magani.health
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright - Simplified */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center md:text-left">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} Magani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;