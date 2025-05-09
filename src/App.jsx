import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy load all section components
const Hero = lazy(() => import('./components/sections/Hero'));
const ProblemStatement = lazy(() => import('./components/sections/ProblemStatement'));
const Stakeholders = lazy(() => import('./components/sections/Stakeholders'));
const Products = lazy(() => import('./components/sections/Products'));
const AiTechnology = lazy(() => import('./components/sections/AiTechnology'));
const RisksMitigation = lazy(() => import('./components/sections/RisksMitigation'));
const CallToAction = lazy(() => import('./components/sections/CallToAction'));

// Full Page Loader Component
const PageLoader = () => (
  <div className="fixed inset-0 bg-white z-50 flex flex-col justify-center items-center">
    <div className="w-24 h-24 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-8"></div>
    <div className="text-indigo-800 text-xl font-medium">Loading your experience...</div>
    <div className="text-slate-500 mt-2">Please wait while we prepare the content</div>
  </div>
);

// Main content component wrapped in suspense
const MainContent = () => (
  <>
    <Hero />
    <ProblemStatement />
    <Stakeholders />
    <Products />
    <AiTechnology />
    <RisksMitigation />
    <CallToAction />
  </>
);

function App() {

  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);

  }, []);

  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <MainContent />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
      
    
      {!isLoaded && (
        <div 
          className="fixed inset-0 bg-white z-40 pointer-events-none"
          style={{ 
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      )}
    </div>
  );
}

export default App;