// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'primary': {
          50: '#f0fdf6',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        'secondary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      // New spacing system - using consistent increments
      spacing: {
        // Base spacing unit: 4px (0.25rem)
        'base': '0.25rem',
        
        // Main spacing increments
        '1x': '0.25rem',  // 4px
        '2x': '0.5rem',   // 8px
        '3x': '0.75rem',  // 12px
        '4x': '1rem',     // 16px
        '5x': '1.25rem',  // 20px
        '6x': '1.5rem',   // 24px
        '8x': '2rem',     // 32px
        '10x': '2.5rem',  // 40px
        '12x': '3rem',    // 48px
        '16x': '4rem',    // 64px
        '20x': '5rem',    // 80px
        '24x': '6rem',    // 96px
        '32x': '8rem',    // 128px
        '40x': '10rem',   // 160px
        '48x': '12rem',   // 192px
        '64x': '16rem',   // 256px
      },
      // Standardized line heights
      lineHeight: {
        'tight': 1.2,
        'base': 1.5,
        'relaxed': 1.75,
      },
      // Consistent border radius
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        'full': '9999px',
      },
      // Enhanced box shadows
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 6px 10px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },
    },
  },
  plugins: [],
}