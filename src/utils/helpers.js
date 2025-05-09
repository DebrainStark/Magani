/**
 * Capitalize the first letter of each word in a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
export const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  /**
   * Format a number as a percentage
   * @param {number} number - The number to format
   * @param {number} decimals - Number of decimal places
   * @returns {string} The formatted percentage
   */
  export const formatPercentage = (number, decimals = 0) => {
    return `${number.toFixed(decimals)}%`;
  };
  
  /**
   * Check if current viewport is mobile
   * @returns {boolean} True if viewport width is less than 768px
   */
  export const isMobile = () => {
    return window.innerWidth < 768;
  };