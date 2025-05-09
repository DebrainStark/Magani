// src/components/layout/Footer.jsx
import { navLinks } from '../../constants/navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 w-10 h-10 rounded flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="font-bold text-xl text-gray-800">Magani</span>
            </div>
            <p className="text-gray-600">
              Automating healthcare admin to reduce medical loss ratio.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Verification Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Analytics Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Data Exchange</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.id}>
                  <a href={link.url} className="text-gray-600 hover:text-blue-500">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Lagos, Nigeria</li>
              <li>contact@magani.com</li>
              <li>+234 123 456 7890</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-300 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          © {currentYear} Magani - Automating healthcare admin
        </div>
      </div>
    </footer>
  );
};

export default Footer;