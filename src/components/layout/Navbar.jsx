import { useState, useEffect, useRef } from 'react';
import { navLinks } from '../../constants/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  const dropdownContent = {
    solutions: [
      { title: "Healthcare", url: "/solutions/healthcare", description: "Solutions for medical professionals" },
      { title: "Finance", url: "/solutions/finance", description: "Financial technology solutions" },
      { title: "Education", url: "/solutions/education", description: "Learning management systems" }
    ],
    resources: [
      { title: "Blog", url: "/blog", description: "Latest articles and updates" },
      { title: "Documentation", url: "/docs", description: "Guides and references" },
      { title: "Support", url: "/support", description: "Get help when you need it" }
    ]
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <header 
      className="fixed w-full top-0 z-50 flex justify-center px-4 md:px-8 pt-5 text-slate-800"
      ref={navRef}
    >
      <div className={`w-full max-w-7xl transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>

        {/* Main Navbar with glass effect */}
        <nav className={`
          relative backdrop-blur-md border rounded-xl shadow-lg transition-all duration-300
          ${scrolled ? 'bg-white/90' : 'bg-white/70'} border-white/20
        `}>
          <div className="px-6 md:px-8 py-4 md:py-5 flex justify-between items-center">

            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 group">
              <span className="h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 transition-transform duration-300 group-hover:rotate-6">
                <span className="text-white text-2xl font-bold">M</span>
              </span>
              <span className="text-2xl md:text-3xl font-bold text-slate-800">
                Magani
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.id} className="relative group">
                    <button
                      onClick={() => toggleDropdown(link.id)}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors
                        hover:bg-slate-100
                        ${activeDropdown === link.id ? 'bg-slate-100 text-teal-600' : ''}`}
                    >
                      {link.title}
                      <ChevronDown size={18} className="ml-1" />
                    </button>
                    
                    {activeDropdown === link.id && (
                      <div className="absolute left-0 top-full mt-1 w-72 rounded-lg shadow-xl overflow-hidden z-20 
                        bg-white border border-slate-100">
                        <div className="p-4">
                          <p className="text-sm font-semibold mb-2 text-slate-500">
                            {link.id.toUpperCase()}
                          </p>
                          {dropdownContent[link.id]?.map((item) => (
                            <a 
                              key={item.title} 
                              href={item.url}
                              className="block px-4 py-3 rounded-md mb-1 transition-colors hover:bg-slate-50"
                            >
                              <div className="font-medium text-slate-800">{item.title}</div>
                              <div className="text-sm text-slate-500">{item.description}</div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.id}
                    href={link.url}
                    className="px-4 py-3 rounded-lg text-base font-medium transition-colors
                      hover:bg-slate-100 text-slate-700 hover:text-teal-600"
                  >
                    {link.title}
                  </a>
                )
              ))}
            </div>

            {/* Right side actions */}
            <div className="flex items-center">    
                        
              {/* Contact Button */}
              <a 
                href="#contact" 
                className="hidden md:flex ml-2 px-6 py-3 text-white font-medium text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-200
                  bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
              >
                Contact Us
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 ml-4 rounded-lg transition-colors hover:bg-slate-100"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Slide In from right */}
        <div className={`lg:hidden fixed inset-y-0 right-0 w-full max-w-sm z-50 transition-transform duration-300 transform
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          bg-white text-slate-800 shadow-2xl`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile menu header */}
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
              <a href="/" className="flex items-center space-x-2">
                <span className="h-10 w-10 rounded-lg flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600">
                  <span className="text-white text-2xl font-bold">M</span>
                </span>
                <span className="text-xl font-bold">Magani</span>
              </a>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Mobile menu links */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.id} className="mb-2">
                    <button
                      onClick={() => toggleDropdown(link.id)}
                      className="flex items-center justify-between w-full py-4 px-3 text-left rounded-lg
                        hover:bg-slate-100"
                    >
                      <span className="font-medium text-lg">{link.title}</span>
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform ${activeDropdown === link.id ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {activeDropdown === link.id && (
                      <div className="mt-1 mb-3 rounded-lg overflow-hidden bg-slate-50">
                        {dropdownContent[link.id]?.map((item) => (
                          <a 
                            key={item.title} 
                            href={item.url}
                            className="block px-5 py-3 border-b last:border-0 border-slate-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-slate-500">{item.description}</div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.id}
                    href={link.url}
                    className="block py-4 px-3 hover:bg-slate-100 rounded-lg font-medium text-lg mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.title}
                  </a>
                )
              ))}
            </div>
            
            {/* Mobile menu footer */}
            <div className="p-6 border-t border-slate-200">
              <a 
                href="#contact" 
                className="block py-4 px-5 text-center text-white font-medium text-lg rounded-lg shadow-sm 
                  bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;