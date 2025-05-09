// src/App.jsx (updated)
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import ProblemStatement from './components/sections/ProblemStatement';
import Stakeholders from './components/sections/Stakeholders';
import Products from './components/sections/Products';
import AiTechnology from './components/sections/AiTechnology';
import RisksMitigation from './components/sections/RisksMitigation';
import CallToAction from './components/sections/CallToAction';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        <Hero />
        <ProblemStatement />
        <Stakeholders />
        <Products />
        <AiTechnology />
        <RisksMitigation />
        <CallToAction />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;