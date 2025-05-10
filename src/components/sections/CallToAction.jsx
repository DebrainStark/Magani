import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Custom hook for intersection observer
 */
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && options.unobserveOnIntersect) {
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.root, options.rootMargin, options.unobserveOnIntersect]);

  return [ref, isIntersecting];
};

/**
 * Main CallToAction component
 */
const CallToAction = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    unobserveOnIntersect: true,
  });

  return (
    <section
      ref={sectionRef}
      className="py-20 py:md-28 bg-gradient-to-br from-slate-900 to-primary-900 relative overflow-hidden"
    >
      {/* Subtle background blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center">
          {/* Main heading */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your{" "}
            <span className="text-primary-300">Healthcare Operations</span>?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the growing number of healthcare providers in Nigeria who are reducing 
            costs and improving efficiency with our solution.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#schedule-demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg shadow-primary-900/30 transition-all duration-300"
            >
              <span className="flex items-center text-lg">
                Schedule a Demo
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;