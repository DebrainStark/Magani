import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const SCROLL_THRESHOLD = 20;
const NAVBAR_HIDE_THRESHOLD = 300;
const SECTION_OFFSET = 100;
const NAVBAR_HEIGHT = 80;

const navLinks = [
  { id: 1, title: 'Problems', url: '#problem' },
  { id: 2, title: 'Stakeholders', url: '#stakeholder' },
  { id: 3, title: 'Products', url: '#product' },
  { id: 4, title: 'AI', url: '#ai' },
  { id: 5, title: 'Risks', url: '#risks' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Throttle scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Check if scrolled past threshold
    const isScrolled = currentScrollY > SCROLL_THRESHOLD;
    setScrolled(isScrolled);
    
    // Handle scroll direction for show/hide effects
    if (currentScrollY > lastScrollY && currentScrollY > NAVBAR_HIDE_THRESHOLD) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    
    // Update active section based on scroll position
    const sections = document.querySelectorAll('section[id]');
    let newActiveSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + currentScrollY - SECTION_OFFSET;
      const sectionHeight = section.offsetHeight;
      
      if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
        newActiveSection = `#${section.id}`;
      }
    });
    
    setActiveSection(newActiveSection);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Close mobile menu when clicking outside
  const handleClickOutside = useCallback((event) => {
    if (
      navRef.current && 
      !navRef.current.contains(event.target) &&
      (!mobileMenuRef.current || !mobileMenuRef.current.contains(event.target))
    ) {
      setMobileMenuOpen(false);
    }
  }, []);

  // Handle smooth scrolling for in-page links
  const handleLinkClick = useCallback((e, url) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetId = url.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - NAVBAR_HEIGHT,
        behavior: 'smooth'
      });
      
      // Update URL without page reload
      if (history.pushState) {
        history.pushState(null, '', url);
      } else {
        window.location.hash = url;
      }
    }
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleScroll, handleClickOutside]);

  // Focus management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }
    }
  }, [mobileMenuOpen]);

  return (
    <header 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled ? 'py-1' : 'py-5'}`}
      aria-hidden={isHidden}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <nav 
          className={`relative transition-all duration-500 ${
            scrolled 
              ? 'backdrop-blur-lg bg-white/90 shadow-lg rounded-xl border border-white/20' 
              : 'bg-transparent'
          }`}
          aria-label="Main navigation"
        >
          <div className="px-4 py-3 flex justify-between items-center">
            {/* Logo */}
            <a 
              href="/" 
              className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
              aria-label="Home"
            >
              <span className={`h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-primary-500 to-secondary-600 transition-all duration-500 ${
                scrolled ? 'scale-90 rotate-6' : 'scale-100 rotate-0'
              } group-hover:scale-105 group-hover:shadow-md`}>
                <span className="text-white text-xl font-bold">M</span>
              </span>
              <span className={`text-2xl font-bold transition-all duration-300 ${
                scrolled ? 'text-slate-800' : 'text-slate-900'
              }`}>
                Magani
              </span>
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    onClick={(e) => handleLinkClick(e, link.url)}
                    className={`relative px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      activeSection === link.url 
                        ? 'text-primary-600' 
                        : 'text-slate-700 hover:text-primary-600'
                    }`}
                    aria-current={activeSection === link.url ? 'page' : undefined}
                  >
                    <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      activeSection === link.url 
                        ? 'bg-primary-50' 
                        : 'bg-slate-100/0 group-hover:bg-slate-100/80'
                    }`}></span>
                    <span className="relative z-10">{link.title}</span>
                    {activeSection === link.url && (
                      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Button */}
            <a 
              href="#contact" 
              onClick={(e) => handleLinkClick(e, '#contact')}
              className={`hidden lg:flex items-center px-5 py-2 text-white font-medium text-base rounded-lg shadow-sm transition-all duration-500 overflow-hidden relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                scrolled ? 'from-primary-600 to-secondary-600' : 'from-primary-500 to-secondary-500'
              }`}
              style={{
                backgroundImage: 'linear-gradient(to right, var(--tw-gradient-stops))'
              }}
            >
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
              <span className="relative z-10">Contact Us</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white/30 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100 ${
                scrolled ? 'opacity-100' : 'opacity-50'
              }`}></span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-slate-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className={`bg-white rounded-xl shadow-lg border border-slate-100 transition-all duration-500 transform ${
            mobileMenuOpen ? 'scale-100' : 'scale-95'
          }`}>
            <ul className="p-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    onClick={(e) => handleLinkClick(e, link.url)}
                    className={`block py-3 px-4 rounded-lg font-medium text-base mb-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      activeSection === link.url 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                    aria-current={activeSection === link.url ? 'page' : undefined}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="block mt-3 py-3 px-4 text-center text-white font-medium rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 shadow-sm hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

// Throttle function to limit scroll event frequency
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default Navbar;