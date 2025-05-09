// src/components/sections/CallToAction.jsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  BarChart4, 
  Phone, 
  Mail, 
  Calendar, 
  Sparkles, 
  HeartPulse, 
  CheckCircle2 
} from 'lucide-react';

// ============================
// Hooks
// ============================
/**
 * Custom hook for intersection observer
 * @param {Object} options - Intersection observer options
 * @returns {Array} - Reference and intersection status
 */
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && options.unobserveOnIntersect) {
          observer.unobserve(entry.target);
        }
      },
      options
    );

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

// ============================
// Sub-Components
// ============================
/**
 * Animated contact option card
 */
const ContactOption = memo(({ icon: Icon, label, value, delay = 0 }) => {
  return (
    <motion.div 
      className="cta-contact__card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20, 
        delay: 0.3 + (delay * 0.1) 
      }}
      whileHover={{ 
        scale: 1.03, 
        transition: { duration: 0.2 } 
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="cta-contact__icon-container"
        whileHover={{ 
          scale: 1.1,
          backgroundColor: "rgba(79, 70, 229, 0.3)" 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Icon size={22} className="cta-contact__icon" />
      </motion.div>
      <div className="cta-contact__content">
        <p className="cta-contact__label">{label}</p>
        <p className="cta-contact__value">{value}</p>
      </div>
    </motion.div>
  );
});

/**
 * Animated stat card component
 */
const StatCard = memo(({ value, label, index }) => (
  <motion.div 
    className="cta-stat__card"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
    whileHover={{ 
      backgroundColor: "rgba(99, 102, 241, 0.2)", 
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" 
    }}
  >
    <motion.div 
      className="cta-stat__value"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: 0.6 + (index * 0.1), 
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }}
    >
      {value}
    </motion.div>
    <div className="cta-stat__label">{label}</div>
  </motion.div>
));

/**
 * Feature card component
 */
const FeatureCard = memo(({ icon: Icon, title, description, index }) => (
  <motion.div
    className="cta-feature__card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ 
      delay: 0.6 + (index * 0.1), 
      duration: 0.5 
    }}
    whileHover={{ 
      y: -5,
      transition: { duration: 0.2 } 
    }}
  >
    <div className="cta-feature__content">
      <div className="cta-feature__icon-container">
        <Icon size={20} className="cta-feature__icon" />
      </div>
      <div className="cta-feature__text">
        <h3 className="cta-feature__title">{title}</h3>
        <p className="cta-feature__description">{description}</p>
      </div>
    </div>
  </motion.div>
));

/**
 * Background decorative elements
 */
const BackgroundElements = memo(() => (
  <div className="cta-background">
    {/* Background grid pattern */}
    <div className="cta-background__grid">
      <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
    
    {/* Animated background blobs */}
    <div className="cta-background__blob cta-background__blob--primary"></div>
    <div className="cta-background__blob cta-background__blob--secondary animation-delay-2000"></div>
    <div className="cta-background__blob cta-background__blob--tertiary animation-delay-4000"></div>
  </div>
));

/**
 * Call to Action primary button
 */
const CtaButton = memo(() => (
  <motion.div
    className="cta-button__container"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7, duration: 0.5 }}
  >
    <motion.a 
      href="#contact" 
      className="cta-button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Button background animation */}
      <span className="cta-button__bg"></span>
      
      {/* Button text */}
      <span className="cta-button__text">
        Get in Touch
        <motion.span 
          className="cta-button__icon"
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowRight size={20} />
        </motion.span>
      </span>
    </motion.a>
  </motion.div>
));

/**
 * Main CallToAction component
 */
const CallToAction = () => {
  // Hooks for intersection observer and animation controls
  const [sectionRef, isVisible] = useIntersectionObserver({ 
    threshold: 0.1, 
    unobserveOnIntersect: true 
  });
  
  const controls = useAnimation();
  
  // Trigger animations when section is visible
  useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    }
  }, [isVisible, controls]);
  
  // Data for different sections
  const stats = [
    { value: '97%', label: 'Accuracy' },
    { value: '40%', label: 'Cost Reduction' },
    { value: '85%', label: 'Time Savings' }
  ];
  
  const contactOptions = [
    { icon: Phone, label: "Call Us", value: "+234 701 234 5678" },
    { icon: Mail, label: "Email Us", value: "contact@healthcareai.ng" },
    { icon: Calendar, label: "Book a Demo", value: "Schedule Now" }
  ];
  
  const features = [
    { 
      icon: HeartPulse, 
      title: "Better Patient Care", 
      description: "Improve healthcare delivery while reducing costs" 
    },
    { 
      icon: BarChart4, 
      title: "Increased Profitability", 
      description: "Achieve sustainable business growth and stability" 
    },
    { 
      icon: CheckCircle2, 
      title: "Simple Implementation", 
      description: "Easy setup with minimal technical requirements" 
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="cta-section"
      aria-labelledby="call-to-action-title"
    >
      {/* Background elements */}
      <BackgroundElements />
      
      <div className="cta-container">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="cta-wrapper"
        >
          {/* Main CTA card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
            }}
            className="cta-card"
          >
            {/* Decorative elements */}
            <div className="cta-card__accent cta-card__accent--top-right"></div>
            <div className="cta-card__accent cta-card__accent--bottom-left"></div>
            <div className="cta-card__border"></div>
            
            {/* Header badge */}
            <motion.div 
              className="cta-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.3)" }}
            >
              <Sparkles size={16} className="cta-badge__icon" />
              <span>Reduce Your MLR Today</span>
            </motion.div>
            
            {/* Title with animated text */}
            <motion.h2 
              id="call-to-action-title"
              className="cta-title"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.6 } }
              }}
            >
              Ready to Transform Your{" "}
              <motion.span 
                className="cta-title__highlight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Healthcare Profitability
                <motion.div 
                  className="cta-title__underline"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                ></motion.div>
              </motion.span>?
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              className="cta-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Our AI-powered solution helps Nigerian healthcare providers optimize operations, reduce costs, and improve profitability with measurable results.
            </motion.p>
            
            {/* Stats section */}
            <motion.div 
              className="cta-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <StatCard 
                  key={index}
                  value={stat.value} 
                  label={stat.label} 
                  index={index} 
                />
              ))}
            </motion.div>
            
            {/* Contact options */}
            <div className="cta-contact">
              {contactOptions.map((option, index) => (
                <ContactOption 
                  key={index}
                  icon={option.icon} 
                  label={option.label} 
                  value={option.value} 
                  delay={index}
                />
              ))}
            </div>
            
            {/* CTA Button */}
            <CtaButton />
          </motion.div>
        </motion.div>
        
        {/* Feature cards */}
        <div className="cta-features">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* CSS for animations and component styling */}
      <style jsx>{`
        /* Section styles */
        .cta-section {
          padding: 6rem 1.5rem;
          padding-top: 6rem;
          padding-bottom: 8rem;
          background-image: linear-gradient(to bottom right, rgb(15, 23, 42), rgb(49, 46, 129), rgb(15, 23, 42));
          position: relative;
          overflow: hidden;
        }
        
        @media (min-width: 768px) {
          .cta-section {
            padding-top: 8rem;
            padding-bottom: 10rem;
          }
        }
        
        /* Container and wrapper */
        .cta-container {
          max-width: 72rem;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 10;
        }
        
        .cta-wrapper {
          position: relative;
        }
        
        /* Main card styles */
        .cta-card {
          background-image: linear-gradient(to bottom right, rgba(67, 56, 202, 0.6), rgba(15, 23, 42, 0.6));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          padding: 3rem;
          z-index: 10;
          position: relative;
          overflow: hidden;
        }
        
        @media (min-width: 768px) {
          .cta-card {
            padding: 4rem;
          }
        }
        
        /* Card accents */
        .cta-card__accent {
          position: absolute;
          border-radius: 9999px;
          opacity: 0.2;
          filter: blur(24px);
        }
        
        .cta-card__accent--top-right {
          width: 10rem;
          height: 10rem;
          background-color: rgb(99, 102, 241);
          top: -2.5rem;
          right: -2.5rem;
        }
        
        .cta-card__accent--bottom-left {
          width: 10rem;
          height: 10rem;
          background-color: rgb(59, 130, 246);
          bottom: -2.5rem;
          left: -2.5rem;
        }
        
        .cta-card__border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-image: linear-gradient(to right, rgb(99, 102, 241), rgb(59, 130, 246), rgb(99, 102, 241));
        }
        
        /* Badge styles */
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: rgba(99, 102, 241, 0.2);
          border-radius: 9999px;
          color: rgb(203, 213, 225);
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 2rem;
        }
        
        .cta-badge__icon {
          color: rgb(165, 180, 252);
        }
        
        /* Title styles */
        .cta-title {
          font-size: 1.875rem;
          line-height: 1.25;
          font-weight: 700;
          color: white;
          margin-bottom: 2rem;
        }
        
        @media (min-width: 768px) {
          .cta-title {
            font-size: 2.25rem;
          }
        }
        
        @media (min-width: 1024px) {
          .cta-title {
            font-size: 3rem;
          }
        }
        
        .cta-title__highlight {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, rgb(165, 180, 252), rgb(147, 197, 253));
          position: relative;
          display: inline-block;
        }
        
        .cta-title__underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-image: linear-gradient(to right, rgb(165, 180, 252), rgb(147, 197, 253));
          border-radius: 9999px;
        }
        
        /* Description styles */
        .cta-description {
          font-size: 1.125rem;
          color: rgb(219, 234, 254);
          margin-bottom: 3rem;
          max-width: 32rem;
          margin-left: auto;
          margin-right: auto;
        }
        
        /* Stats section styles */
        .cta-stats {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        @media (min-width: 768px) {
          .cta-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .cta-stat__card {
          background-color: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 0.75rem;
          padding: 1rem;
          text-align: center;
        }
        
        .cta-stat__value {
          font-size: 1.875rem;
          font-weight: 700;
          color: rgb(147, 197, 253);
          margin-bottom: 0.25rem;
        }
        
        .cta-stat__label {
          color: rgb(199, 210, 254);
          font-size: 0.875rem;
        }
        
        /* Contact options styles */
        .cta-contact {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        @media (min-width: 768px) {
          .cta-contact {
            flex-direction: row;
            gap: 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .cta-contact {
            gap: 2rem;
          }
        }
        
        .cta-contact__card {
          display: flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.1);
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
        }
        
        .cta-contact__card:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transition-property: background-color;
          transition-duration: 300ms;
        }
        
        .cta-contact__icon-container {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          background-image: linear-gradient(to bottom right, rgba(99, 102, 241, 0.3), rgba(59, 130, 246, 0.3));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .cta-contact__icon {
          color: rgb(147, 197, 253);
        }
        
        .cta-contact__content {
          text-align: left;
        }
        
        .cta-contact__label {
          font-size: 0.875rem;
          color: rgb(147, 197, 253);
          margin-bottom: 0.25rem;
        }
        
        .cta-contact__value {
          font-size: 1.125rem;
          font-weight: 500;
          color: white;
        }
        
        /* Button styles */
        .cta-button__container {
          text-align: center;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background-image: linear-gradient(to right, rgb(79, 70, 229), rgb(59, 130, 246));
          color: white;
          font-weight: 500;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(79, 70, 229, 0.3);
          transition-property: all;
          transition-duration: 300ms;
          font-size: 1.125rem;
          position: relative;
          overflow: hidden;
        }
        
        .cta-button:hover {
          background-image: linear-gradient(to right, rgb(67, 56, 202), rgb(37, 99, 235));
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.4);
        }
        
        .cta-button__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(to right, rgb(79, 70, 229), rgb(59, 130, 246));
          opacity: 0;
          transition-property: opacity;
          transition-duration: 300ms;
        }
        
        .cta-button:hover .cta-button__bg {
          opacity: 1;
        }
        
        .cta-button__text {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .cta-button__icon {
          margin-left: 0.5rem;
        }
        
        /* Feature cards */
        .cta-features {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-top: 2.5rem;
        }
        
        @media (min-width: 768px) {
          .cta-features {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .cta-feature__card {
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 1.25rem;
        }
        
        .cta-feature__card:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transition-property: background-color;
          transition-duration: 300ms;
        }
        
        .cta-feature__content {
          display: flex;
          align-items: flex-start;
        }
        
        .cta-feature__icon-container {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          background-image: linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          margin-top: 0.25rem;
        }
        
        .cta-feature__icon {
          color: rgb(147, 197, 253);
        }
        
        .cta-feature__text {
          flex: 1;
        }
        
        .cta-feature__title {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .cta-feature__description {
          color: rgba(191, 219, 254, 0.8);
          font-size: 0.875rem;
        }
        
        /* Background elements */
        .cta-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .cta-background__grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
        }
        
        .cta-background__blob {
          position: absolute;
          border-radius: 9999px;
          opacity: 0.1;
          filter: blur(24px);
        }
        
        .cta-background__blob--primary {
          width: 24rem;
          height: 24rem;
          background-color: rgb(79, 70, 229);
          top: 25%;
          right: 25%;
          animation: blob 25s infinite alternate;
        }
        
        .cta-background__blob--secondary {
          width: 24rem;
          height: 24rem;
          background-color: rgb(59, 130, 246);
          bottom: 25%;
          left: 25%;
          animation: blob 25s infinite alternate;
        }
        
        .cta-background__blob--tertiary {
          width: 16rem;
          height: 16rem;
          background-color: rgb(124, 58, 237);
          top: 75%;
          left: 66.666667%;
          animation: blob 25s infinite alternate;
        }
        
        /* Animations */
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;