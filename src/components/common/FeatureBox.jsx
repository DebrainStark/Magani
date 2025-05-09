const FeatureBox = ({ title, icon, features }) => {
    return (
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        <div className="bg-blue-500 py-3 px-4">
          <h3 className="text-xl font-semibold text-white text-center">
            {title}
          </h3>
        </div>
        
        <div className="p-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <img src={icon} alt={title} className="w-8 h-8" />
          </div>
          
          <ul className="space-y-2 text-gray-600 w-full">
            {features.map((feature, index) => (
              <li key={index} className="text-center">{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default FeatureBox;